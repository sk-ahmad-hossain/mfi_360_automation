export class OtherCriteria {
    search_field = "#txtOtherCriteriaFilter";
    select_all_check = "#chkOtherCriteriaAll > fieldset";
    select_other_criteria = "//a[text()='%s']/../preceding-sibling::td/label"
    Show_Rank="#chkShowRank > span";
    Show_Quartile="#chkShowQuartile > span";
    Show_Scheme_MIn_Max_Avg_P2P="#chkMinMaxAvg > span";
    Show_Index_Min_Max_Avg_P2P="#chkIndexMinMaxAvg > span";
    check_min_max_avg_std_rolling = "span[name=MinMaxAvg]"


    page: any;
    constructor(page: any) {
        this.page = page;
    }

    async search(criteria: string) {
        await this.page.waitForSelector(this.search_field);
        await this.page.fill(this.search_field, criteria);
    }

    async selectAll() {
        await this.page.waitForSelector(this.select_all_check);
        await this.page.click(this.select_all_check);
    }

    async select(criteria: string) {
        const indexNameLocator = this.select_other_criteria.replace('%s', criteria);
        await this.page.waitForSelector(indexNameLocator);
        await this.page.click(indexNameLocator);
    }

    async checkShowMinMaxAvgRolling() {
        await this.page.waitForSelector(this.check_min_max_avg_std_rolling);
        await this.page.click(this.check_min_max_avg_std_rolling);
    }
    async checkShowRank() {
        await this.page.waitForSelector(this.Show_Rank);
        await this.page.click(this.Show_Rank);
    }
    async checkShowQuartile() {
        await this.page.waitForSelector(this.Show_Quartile);
        await this.page.click(this.Show_Quartile);
    }
}