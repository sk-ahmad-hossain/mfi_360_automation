import { asyncWrapProviders } from "async_hooks";

export class Index {
    Scheme_Benchmark_Suitable_Index  ="span[id='SchemePerformanceIndexSelectionchkIsSchemeIndex'] span[role='button']";
    Search_type_index_name="//input[@id='SchemePerformanceIndexSelectiontxtFilter']";
    select_all_check="span[id='SchemePerformanceIndexSelectionchkMFIndexAll'] fieldset[role='button']";
    select_other_index="//a[normalize-space()='%s']/../preceding-sibling::td/label";

    select_customize_index= "#SchemePerformanceIndexSelectionheadingTwo";
    select_all_customize_check = "//th[normalize-space()='Index (1)']";
    search_type_customize_index_name = "//a[normalize-space()='%s']/../preceding-sibling::td/label";

    select_composite_check = "#SchemePerformanceIndexSelectionheadingThree";
    search_type_composite_index_name = "//span[@id='SchemePerformanceIndexSelectionchkCompositeIndexAll']//fieldset[@role='button']";
    select_composite_index = "//a[normalize-space()='%s']/../preceding-sibling::td/label";

    page: any;

    constructor(page: any) {
        this.page = page;
    }

    async checkSchemeBenchmark(isTriCheck: boolean = false) {
        await this.page.waitForSelector(this.Scheme_Benchmark_Suitable_Index);
    }
    async searchIndex(indexName: string) {
        await this.page.fill(this.Search_type_index_name, indexName);
    }
    async selectAllIndex() {
        await this.page.waitForSelector(this.select_all_check);
        await this.page.click(this.select_all_check);
    }
    async selectIndex(indexName: string) {
        const indexNameLocator = this.select_other_index.replace('%s', indexName);
        await this.page.waitForSelector(indexNameLocator);
        await this.page.click(indexNameLocator);
    }



    async searchCustomizeIndex(indexName: string) {
        await this.page.fill(this.search_type_customize_index_name, indexName);
    }
    async selectAllCustomizeIndex() {
        await this.page.waitForSelector(this.select_all_check);
        await this.page.click(this.select_all_check);
    }
    async selectCustomizeIndex(indexName: string) {
        const indexNameLocator = this.select_customize_index.replace('%s', indexName);
        await this.page.waitForSelector(indexNameLocator);
        await this.page.click(indexNameLocator);
    }


    async searchCompositeIndex(indexName: string) {
        await this.page.fill(this.search_type_composite_index_name, indexName);
    }

    async selectAllCompositeIndex() {
        await this.page.waitForSelector(this.select_composite_check);
        await this.page.click(this.select_composite_check);
    }
    async selectCompositeIndex(indexName: string) {
        const indexNameLocator = this.select_composite_index.replace('%s', indexName);
        await this.page.waitForSelector(indexNameLocator);
        await this.page.click(indexNameLocator);
    }


}