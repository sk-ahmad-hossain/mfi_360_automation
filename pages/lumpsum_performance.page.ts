import { Page } from "playwright";
import { BasePage } from "./common/BasePage";
import { SchemaSelectionComponent } from "./common/schema_selection.component";
import { Index } from "./common/Index.component";
import { expect } from "playwright/test";

export class LumpsumPerformance extends BasePage {
    readonly schemaSelection: SchemaSelectionComponent;
    readonly index : Index;
    readonly dateSelection: DateSelection;

    private readonly mapButton = "button#mapscheme";
    private readonly map_locator = "//td[text()='%s']/preceding-sibling::td//fieldset"

    constructor(page: Page) {
        super(page, "/SchemePerformance/SebiPerformanceReport", "Lumpsum Performance")
        this.schemaSelection = new SchemaSelectionComponent(page);
        this.index = new Index(page);
        this.dateSelection = new DateSelection(page);
    }

    // unmap message - Un-Mapping is successfully done.
    async createMap() {
        await this.page.click(this.mapButton);
    }

    async validCreateSuccessfullMessage() {
        // validate successfull message
        const message_locator = this.page.locator("div[ng-bind-html='msg']")
        await expect(message_locator).toHaveText("Mapping is successfully done.")

        await this.page.click("md-dialog-actions button")
    }

    async validateMapPresent(map_names: string[]) {
        for(const name of map_names) {
            const locator = this.map_locator.replace("%s", name);
            await expect(this.page.locator(locator)).toBeVisible();
        }
    }

    async unMap(map_names: string[]) {
        const dialogContent = this.page.locator("md-dialog-content");

        await this.selectMap(map_names);
        await this.page.click("//a[normalize-space()='Unmap']");

        await expect(dialogContent).toContainText("Are you sure?")
        await expect(dialogContent).toContainText("You Want to Unmap Selected Schemes.Please Confirm.")
        
        // click on ok
        await this.page.click("md-dialog-actions button")

        await this.page.waitForLoadState()
        await expect(dialogContent).toContainText("Un-Mapping is successfully done.", { timeout: 120000});
    }

    private async selectMap(map_names: string[]) {
        for(const name of map_names) {
            const locator = this.map_locator.replace("%s", name);
            await this.page.click(locator);
        }
    }

    async showReport(map_names: string[]) {
        await this.selectMap(map_names);
        await this.page.click("//button[text()='Show Report']")
    }

    async validateMapAlreadyPresentErrorMessage() {
        const dialogContent = this.page.locator("md-dialog-content");
        await expect(dialogContent).toContainText("Warning!! Selected scheme(s) is already mapped with index")
        await this.page.click("md-dialog-actions button")
    }

}

class DateSelection extends BasePage {
    private readonly date_selector: string = "#ToDateP2P"
    private readonly last_day_of_month_selector: string = "//span[text()='Last Day of Month']/preceding-sibling::fieldset";
    private readonly invested_value_selector: string = "#txtInvestmentValue";
    private readonly return_period_selector: string = "div[extra-settings='DDLamcSetting'] button";
    private readonly return_type_selector: string = "select[ng-model='SIRetselected']"
    private readonly periods_options:string = "//li//span[text()='%s']/../fieldset";
    private readonly period_search_field:string = "div.dropdown-header input";

    constructor(page: Page) {
        super(page);
    }
    

    async selectDate(date: string) {
        await this.page.fill(this.date_selector, date);
        await this.page.locator(this.date_selector).press('Enter');
    }

    async checkLastDayOfMonth() {
        await this.page.click(this.last_day_of_month_selector);
    }

    async setInvestedValue(value: string) {
        await this.page.fill(this.invested_value_selector, value);
    }

    async selectReturnPeriod(periods: string[]) {
        const periodDropdown = this.page.locator(this.return_period_selector);
        const searchField = this.page.locator(this.period_search_field);

        await periodDropdown.click();
        
        for (const period of periods) {
            await searchField.clear();
            await searchField.fill(period);

            const periodLocator = this.page.locator(this.periods_options.replace('%s', period));
            await periodLocator.click();
        }
        searchField.clear();
        await periodDropdown.click();
    }
    
    async selectReturnType(type: string) {
        await this.page.waitForSelector(this.return_type_selector, { state: 'visible' });
        const dropdown = this.page.locator(this.return_type_selector);
        await dropdown.selectOption(type);
    }
}