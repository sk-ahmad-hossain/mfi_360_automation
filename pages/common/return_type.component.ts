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
    first_day_of_the_month = "//span[text()='First Day of Month']/preceding-sibling::fieldset";
    with_calculation_date = "//span[text()='With Calculation Date']/preceding-sibling::fieldset";
    since_inception = "//span[text()='Since Inception (Scheme)']/preceding-sibling::fieldset";

    fixed_period_dropdown = "#DrpFixedPeriod";
    periods_options_multi:string="#txtMulDateRollingPeriod";
    Select_frequency_multi: string ="#txtMulDateRollingFreq";

    reportType: ReportType;
    constructor(page: any) {
        this.page = page;
    }

    async selectReportType(reportType: ReportType) {
        this.reportType = reportType;
        await this.page.click(reportType);
    }

    async selectToDate(date: string) {
        await this.page.fill(this.return_type_date, date);
        await this.page.locator(this.return_type_date).press('Enter');
    }

    async selectPeriodsForP2P(periods: string[]) {
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
    async selectPeriodsForFixed(period: string) {
        //const dropdown = this.page.locator('#DrpFixedPeriod');
        //await dropdown.selectOption(period);

        const periodDropdown = this.page.locator("#DrpFixedPeriod_chosen");
        await periodDropdown.click();

        const option_selector = "//ul//li[text()='%s']";
        //const searchField = this.page.locator(this.period_search_field);
        //await searchField.clear();
        //await searchField.fill(period);

        const periodLocator = await this.page.locator(option_selector.replace('%s', period));
        if (await periodLocator.isVisible()) {
            await periodLocator.click();
        } else {
            console.warn(`Period ${period} not found in the dropdown.`);
        }
    }

    async selectPeriodForRolling(count: number, dayOrMonth: string) {
        console.log(await this.page);
        
        const period = await this.page.locator("#txtRollingPeriod");
        await period.fill(count.toString())
        if(dayOrMonth.toLocaleLowerCase() == "days")
            this.page.click("label[ng-class=PeriodDaysClass]")
        else {
            this.page.click("label[ng-class=PeriodMonthClass]")
        }
    }

    async selectFrequency(count: number, dayOrMonth: string) {
        await this.page.fill("#txtRollingFreq", count.toString())
        if (dayOrMonth.toLocaleLowerCase() == 'days')
            await this.page.click("label[ng-class='FreqDaysClass']");
        else
            await this.page.click("label[ng-class='FreqMonthClass']");
    }

    async selectSettingSet(settingSet: string) {
        const settingSetDropdown = this.page.locator('#DrpSettingSet_chosen');
        await settingSetDropdown.click();
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

    async checkSinceInception() {
        await this.page.click(this.since_inception);
    }

    async checkWithCalculationDate() {
        await this.page.click(this.with_calculation_date);
    }

    async checkFirstDayOfTheMonth() {
        await this.page.click(this.first_day_of_the_month)
    }

     async periods_options_mult(count: number, dayOrMonth: string) {
        console.log(await this.page);
        
        const period = await this.page.locator("#txtMulDateRollingPeriod");
        await period.fill(count.toString())
        if(dayOrMonth.toLocaleLowerCase() == "days")
            this.page.click("//div[@class='btn btn-success btn-xs active']")
        else {
            this.page.click("//div[@class='btn btn-success btn-xs active focus']")
        }
    }
    async select_frequency_multi(count: number, dayOrMonth: string) {
        await this.page.fill("#txtMulDateRollingFreq", count.toString())
        if (dayOrMonth.toLocaleLowerCase() == 'days')
            await this.page.click("//div[@class='btn btn-success btn-xs active']");
        else
            await this.page.click("//div[@class='btn btn-success btn-xs'][normalize-space()='Month']");
    }

    

    
    async addbutton(){
        await this.page.click(".btn.btn-success.pull-right.btn-xs");


    }
    
    async selectReportTypeForMultiple(type : string) {
        const dropdown = this.page.locator("[ng-model='SelectedReturnId']")
        await dropdown.selectOption('Both');
    }

    

    // get rolling() {
    //     return {
    //         selectPeriod: this.selectPeriodForRolling,
    //         selectFrequency: this.selectFrequency,
    //         selectSettingSet: this.selectSettingSet,
    //         checkLastDayOfMonth: this.checkLastDayOfMonth,
    //         firstDayOfTheMonth: this.firstDayOfTheMonth,
    //         checkWithCalculationDate: this.checkWithCalculationDate,
    //         checkSinceInception: this.checkSinceInception
    //     }
    // }
    
}

