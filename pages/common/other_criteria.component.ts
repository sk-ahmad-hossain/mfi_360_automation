export class OtherCriteria {
    private search_field = "#txtOtherCriteriaFilter";
    private select_all_check = "#chkOtherCriteriaAll > fieldset";
    private Show_Rank="#chkShowRank > span";
    private Show_Quartile="#chkShowQuartile > span";
    private Show_Scheme_MIn_Max_Avg_P2P="#chkMinMaxAvg > span";
    private Show_Index_Min_Max_Avg_P2P="#chkIndexMinMaxAvg > span";
    //private check_min_max_avg_std_rolling = "span[name=MinMaxAvg]"
    page: any;
    title: string;

    constructor(page: any, title: string) {
        this.page = page;
        this.title = title;
    }

    readonly selector = {
        "Index Performance Analysis" : {
            select_other_criteria: "//td[text()='%s']/parent::tr//label",
            check_scheme_min_max_avg: "span[name=ShowIndexMinMax]",
            check_index_min_max_avg: "span[name=MinMaxAvg]",
            check_min_max_avg: "span[name=MinMaxAvg]"
        },
        "Advanced Return Analysis": {
            select_other_criteria : "//a[text()='%s']/../preceding-sibling::td/label",
            check_scheme_min_max_avg: "span[name=MinMaxAvg]",
            check_index_min_max_avg: "span[name=ShowIndexMinMax]",
            check_min_max_avg: "span[name=MinMaxAvg]"
        }
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
        const indexNameLocator = this
            .selector[this.title]
            .select_other_criteria
            .replace('%s', criteria);

        await this.page.waitForSelector(indexNameLocator);
        await this.page.click(indexNameLocator);
    }

    async checkShowMinMaxAvgP2P() {
        await this.checkShowMinMaxAvg();
    }

    async checkShowMinMaxAvg() {
        const check_min_max_avg = this
            .selector[this.title]
            .check_min_max_avg;

        await this.page.waitForSelector(check_min_max_avg);
        await this.page.click(check_min_max_avg);
    }

    async checkIndexShowMinMaxAvg() {
        const check_min_max_avg = this
            .selector[this.title]
            .check_index_min_max_avg;

        await this.page.waitForSelector(check_min_max_avg);
        await this.page.click(check_min_max_avg);
    }

    async checkSchemeShowMinMaxAvg() {
        const check_min_max_avg = this
            .selector[this.title]
            .check_scheme_min_max_avg;

        await this.page.waitForSelector(check_min_max_avg);
        await this.page.click(check_min_max_avg);
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