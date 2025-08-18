export class SchemaSelectionComponent {
    schemaTypeDropdown: any;
    searchSchemeInput: string = "//input[contains(@placeholder,'Type Scheme Name')]";
    schemeLocator:string = "//a[text()='%s']/../preceding-sibling::td//label";
    selectAllCheck:string = "//span[@id='scheme-selection-check-all']";
    page: any;

    constructor(page: any) {
        this.page = page;
        this.schemaTypeDropdown = 'scheme-selection-directive select';
    }

    // working fine
    async selectSchemaType(schemaType: string) {
        await this.page.waitForSelector(this.schemaTypeDropdown);
        await this.page.selectOption(this.schemaTypeDropdown, schemaType);
    }

    // working fine
    async selectAllScheme() { 
        await this.page.waitForSelector(this.selectAllCheck);
        await this.page.click(this.selectAllCheck);
    }
    
    // working fine
    async searchScheme(scheme: string) {
        await this.page.fill(this.searchSchemeInput, scheme);
    }

    // working fine
    async selectScheme(scheme: string) {
        const schemeNameLocator = this.schemeNameLocator(scheme);
        await this.page.waitForSelector(schemeNameLocator);
        await this.page.click(schemeNameLocator);
    }

    schemeNameLocator(scheme: string): string {
        return this.schemeLocator.replace('%s', scheme);
    }
}