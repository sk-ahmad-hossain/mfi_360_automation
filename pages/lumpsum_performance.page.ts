import { Page } from "playwright";
import { BasePage } from "./common/BasePage";
import { SchemaSelectionComponent } from "./common/schema_selection.component";
import { Index } from "./common/Index.component";
import { expect } from "playwright/test";

export class LumpsumPerformance extends BasePage {
    readonly schemaSelection: SchemaSelectionComponent;
    readonly index : Index;

    private readonly mapButton = "button#mapscheme";
    private readonly map_locator = "//td[text()='%s']/preceding-sibling::td//fieldset"

    constructor(page: Page) {
        super(page, "/SchemePerformance/SebiPerformanceReport", "Lumpsum Performance")
        this.schemaSelection = new SchemaSelectionComponent(page);
        this.index = new Index(page);
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