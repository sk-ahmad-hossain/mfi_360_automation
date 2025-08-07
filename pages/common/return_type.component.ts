//import ReportType

import { ReportType } from "@type/report-type";

export class ReportReturnType {
    private page: any;
    return_type_date:string = "#ToDateP2P";
    period_dropdown:string = "div#divMultiP2PPeriod button";
    period_search_field:string = "div.dropdown-header input";
    periods_options:string = "//li//span[text()='%s']/..";
    scheme_with_index_check = "//span[text()='Scheme with Index']/preceding-sibling::fieldset"
    last_day_of_month_check = "//span[text()='Last Day of Month']/preceding-sibling::fieldset";

    constructor(page: any) {
        this.page = page;
    }

    async selectReportType(reportType: ReportType) {
        this.page.click(reportType);
    }

    async selectToDate(date: string) {
        await this.page.fill(this.return_type_date, date);
        //await this.page.keyboard.press('Enter');
        await this.page.locator(this.return_type_date).press('Enter');
    }

    async selectPeriods(periods: string[]) {
        const periodDropdown = this.page.locator(this.period_dropdown);
        const searchField = this.page.locator(this.period_search_field);

        await periodDropdown.click();
        
        for (const period of periods) {
            await searchField.clear();
            await searchField.fill(period);

            const periodLocator = this.page.locator(this.periods_options.replace('%s', period));
            if (await periodLocator.isVisible()) {
                await periodLocator.click();
            } else {
                console.warn(`Period ${period} not found in the dropdown.`);
            }
        }
        searchField.clear();
        await periodDropdown.click();
    }

    async selectSettingSet(settingSet: string) {
        const settingSetDropdown = this.page.locator('#DrpSettingSet_chosen');
        await settingSetDropdown.click();
        const searchField = this.page.locator("(//div[@class='chosen-search']//input)[2]");
        
        //await searchField.fill(settingSet);
        //await this.page.keyboard.press('Enter');

        //await this.page.waitForTimeout(5000);
        const settingOption = this.page.locator(`//ul[@class='chosen-results']//li[normalize-space()='${settingSet}']`);
        if (await settingOption.isVisible()) {
            await settingOption.click();
        } else {
            console.warn(`Setting set ${settingSet} not found in the dropdown.`);
        }
    }

    async checkLastDayOfMonth() {
        await this.page.click(this.last_day_of_month_check);
    }
    async checkSchemeWithIndex() {
        await this.page.click(this.scheme_with_index_check);
    }
    
}

