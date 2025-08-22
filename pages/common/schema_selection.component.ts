import { Page } from "playwright";

export class SchemaSelectionComponent {
    private schemaTypeDropdown: any;
    private searchSchemeInput: string = "//input[contains(@placeholder,'Type Scheme Name')]";
    private schemeLocator:string = "//a[text()='%s']/../preceding-sibling::td//label/span";
    private selectAllCheck:string = "//span[@id='scheme-selection-check-all']";
    private readonly page: Page;

    constructor(page: Page) {
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
        await this.page.locator(this.searchSchemeInput).clear();
        await this.page.fill(this.searchSchemeInput, scheme);
    }

    // working fine
    async selectScheme(scheme: string) {
        const schemeNameLocator = this.schemeNameLocator(scheme);
        await this.page.waitForSelector(schemeNameLocator);
        await this.page.click(schemeNameLocator);
    }

    private schemeNameLocator(scheme: string): string {
        return this.schemeLocator.replace('%s', scheme);
    }
}