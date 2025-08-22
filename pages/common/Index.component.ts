import { Locator, Page } from "playwright";

export class Index {
    private Scheme_Benchmark_Suitable_Index  ="span[id='SchemePerformanceIndexSelectionchkIsSchemeIndex'] span[role='button']";
    private Search_type_index_name="input#SchemePerformanceIndexSelectiontxtFilter";
    private search_type_input_name_2 = "input#SebiPerformanceIndexSelectiontxtFilter";

    private select_all_index_check="span[id='SchemePerformanceIndexSelectionchkMFIndexAll'] fieldset[role='button']";
    private select_other_index="//a[normalize-space()='%s']/../preceding-sibling::td/label/..";

    // TODO remove duplicate selector, same as select_other_index
    //select_= "#SchemePerformanceIndexSelectionheadingTwo";
    private select_all_customize_check = "//span[@id='SchemePerformanceIndexSelectionchkCustomIndexAll']//fieldset[@role='button']";
    private search_type_customize_index_name = "#SchemePerformanceIndexSelectioncustomizedIndex input[type=text]";
    private readonly search_type_customize_index_name_2 = "#SebiPerformanceIndexSelectioncustomizedIndex input[type=text]"

    //select_composite_check = "#SchemePerformanceIndexSelectionheadingThree";
    private select_all_composite_index_name = "//span[@id='SchemePerformanceIndexSelectionchkCompositeIndexAll']//fieldset[@role='button']";
    // TODO remove duplicate selector, same as select_other_index
    //select_composite_index = "//a[normalize-space()='%s']/../preceding-sibling::td/label";
    private readonly search_composite_index = "#SchemePerformanceIndexSelectioncompositeIndex input[type=text]"
    private readonly search_composite_index_2 = "#SebiPerformanceIndexSelectioncompositeIndex input[type=text]"

    private readonly page: Page;
    private readonly indexSectionLocator: Locator;
    private readonly customizeSectionLocator: Locator;
    private readonly compositeSectionLocator: Locator;

    constructor(page: Page) {
        this.page = page;
        this.indexSectionLocator = page.locator("//h2[text()='Index']/following-sibling::i"); 
        this.customizeSectionLocator = page.locator("(//h2[text()='Customized Index']/following-sibling::i)[1]"); 
        this.compositeSectionLocator = page.locator("(//h2[text()='Composite Index']/following-sibling::i)[1]"); 
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
        const search_field = this.page.locator(this.search_type_input_name_2)
                                    .or(this.page.locator(this.Search_type_index_name));
        await search_field.fill(indexName);
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
        const input = this.page.locator(this.search_type_customize_index_name)
            .or(this.page.locator(this.search_type_customize_index_name_2))
        await input.fill(indexName);
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
        const locator = this.page.locator(this.search_composite_index)
            .or(this.page.locator(this.search_composite_index_2))

        await locator.clear();
        await locator.fill(indexName);
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