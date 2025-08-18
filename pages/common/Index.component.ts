import { Locator } from "playwright";

export class Index {
    Scheme_Benchmark_Suitable_Index  ="span[id='SchemePerformanceIndexSelectionchkIsSchemeIndex'] span[role='button']";
    Search_type_index_name="//input[@id='SchemePerformanceIndexSelectiontxtFilter']";
    select_all_index_check="span[id='SchemePerformanceIndexSelectionchkMFIndexAll'] fieldset[role='button']";
    select_other_index="//a[normalize-space()='%s']/../preceding-sibling::td/label/..";

    // TODO remove duplicate selector, same as select_other_index
    //select_= "#SchemePerformanceIndexSelectionheadingTwo";
    select_all_customize_check = "//span[@id='SchemePerformanceIndexSelectionchkCustomIndexAll']//fieldset[@role='button']";
    search_type_customize_index_name = "#SchemePerformanceIndexSelectioncustomizedIndex input[type=text]";

    //select_composite_check = "#SchemePerformanceIndexSelectionheadingThree";
    select_all_composite_index_name = "//span[@id='SchemePerformanceIndexSelectionchkCompositeIndexAll']//fieldset[@role='button']";
    // TODO remove duplicate selector, same as select_other_index
    //select_composite_index = "//a[normalize-space()='%s']/../preceding-sibling::td/label";
    search_composite_index = "#SchemePerformanceIndexSelectioncompositeIndex input[type=text]"

    readonly page: any;
    readonly indexSectionLocator: Locator;
    readonly customizeSectionLocator: Locator;
    readonly compositeSectionLocator: Locator;

    constructor(page: any) {
        this.page = page;
        this.indexSectionLocator = page.locator("//h2[text()='Index']/following-sibling::i"); 
        this.customizeSectionLocator = page.locator("//h2[text()='Customized Index']/following-sibling::i"); 
        this.compositeSectionLocator = page.locator("//h2[text()='Composite Index']/following-sibling::i"); 
    }

    async expandSectionIndex(): Promise<void> {
        await this.indexSectionLocator.click();
    }

    async collapseSectionIndex(): Promise<void> {
        await this.indexSectionLocator.click();
    }

    async checkSchemeBenchmark(isTriCheck: boolean = false) {
        await this.page.waitForSelector(this.Scheme_Benchmark_Suitable_Index);
    }
    async searchIndex(indexName: string) {
        await this.page.fill(this.Search_type_index_name, indexName);
    }
    async selectAllIndex() {
        await this.page.waitForSelector(this.select_all_index_check);
        await this.page.click(this.select_all_index_check);
    }
    async selectIndex(indexName: string) {
        const indexNameLocator = this.select_other_index.replace('%s', indexName);
        await this.page.waitForSelector(indexNameLocator);
        await this.page.click(indexNameLocator);
    }




    async expandSectionCustomizeIndex(): Promise<void> {
        await this.customizeSectionLocator.click();
    }

    async collapseSectionCustomizeIndex(): Promise<void> {
        await this.customizeSectionLocator.click();
    }

    async searchCustomizeIndex(indexName: string) {
        await this.page.fill(this.search_type_customize_index_name, indexName);
    }
    async selectAllCustomizeIndex() {
        await this.page.waitForSelector(this.select_all_customize_check);
        await this.page.click(this.select_all_customize_check);
    }
    async selectCustomizeIndex(indexName: string) {
        const indexNameLocator = this.select_other_index.replace('%s', indexName);
        await this.page.waitForSelector(indexNameLocator);
        await this.page.click(indexNameLocator);
    }


    

    async expandSectionCompositeIndex(): Promise<void> {
        await this.compositeSectionLocator.click();
    }

    async collapseSectionCompositeIndex(): Promise<void> {
        await this.compositeSectionLocator.click();
    }

    async searchCompositeIndex(indexName: string) {
        await this.page.locator(this.search_composite_index).clear();
        await this.page.fill(this.search_composite_index, indexName);
    }

    async selectAllCompositeIndex() {
        await this.page.waitForSelector(this.select_all_composite_index_name);
        await this.page.click(this.select_all_composite_index_name);
    }
    async selectCompositeIndex(indexName: string) {
        const indexNameLocator = this.select_other_index.replace('%s', indexName);
        await this.page.waitForSelector(indexNameLocator);
        await this.page.click(indexNameLocator);
    }


}