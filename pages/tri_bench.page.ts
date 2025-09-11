import { Page } from "playwright";
import { BasePage } from "./common/BasePage";
import { SchemaSelectionComponent } from "./common/schema_selection.component";
import { ReportReturnType } from "./common/return_type.component";

export class ReturnTRIBenchmark extends BasePage {
    // components used from outside - public readonly
    readonly schemeSection: SchemaSelectionComponent;
    readonly reportTypeSection: ReportReturnType;

    // enums - public
    IndexOption = {
        Scheme_With_Index : "Scheme With Index",
        SEBI_Mapping: "SEBI Mapping"
    }

    Index = {
        TRI: "TRI",
        PRI: "PRI"
    }
    
    // selectors are used in inside class - private readonly
    private readonly periodsDropdownSelector: string = "#SelectPeriod button";
    private readonly indexOptionSelector:string = "//label[normalize-space()='%s']"
    private readonly useSEBIMappingCheckbox:string = "//span[normalize-space()='Use SEBI Mapping for non availability of Index Data']/preceding-sibling::fieldset"
    private readonly lastDayOfMonth: string = "//span[normalize-space()='Last Day of Month']/preceding-sibling::fieldset";
    private readonly generateReportButton: string = "//button[text()='Generate Report']"
    private readonly dateField: string = "#SingleDateSelection"


    constructor(page: Page) {
        super(page, "/SchemePerformance/ReturnTriIndex", "Return TRI Benchmarked")
        this.schemeSection = new SchemaSelectionComponent(page);
        this.reportTypeSection = new ReportReturnType(page);
    }

    async selectPeriods(periods: string[]) {
        // Open the dropdown
        const periodsDropdown = this.page.locator(this.periodsDropdownSelector);
        await periodsDropdown.click();

        for (const period of periods) {
            const optionLocator = this.page.locator(`text="${period}"`);
            await optionLocator.waitFor({ state: 'visible' });
            await optionLocator.click();
            await this.page.waitForTimeout(200); // optional delay
        }

        // Click again on the dropdown to close it
        await periodsDropdown.click();
    }

    async checkDayOfMonth() {
        await this.page.click(this.lastDayOfMonth)
    }

    async selectIndexOption(option: string) {
        const indexOption = this.indexOptionSelector.replace("%s", option)
        await this.page.click(indexOption);
    }

    async selectIndex(index: string) {
        const indexOption = this.indexOptionSelector.replace("%s", index)
        await this.page.click(indexOption);
    }

    async checkSEBIMappingNonAvailabilityIndex() {
        await this.page.click(this.useSEBIMappingCheckbox);
    }

    async generateReport() {
        await this.page.click(this.generateReportButton);
    }

    async selectDate(date: string) {
        const dField = this.page.locator(this.dateField);
        await dField.fill(date);
        await dField.press('Enter');
    }

    async selectSettingSet(setting: string) {
        await this.reportTypeSection.selectSettingSet(setting);
    }
}
