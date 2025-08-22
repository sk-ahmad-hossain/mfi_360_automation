import { Page } from '@playwright/test';

export class SchemaSelectionComponent {
    private schemaTypeDropdown: any;
    private searchSchemeInput: string = "//input[contains(@placeholder,'Type Scheme Name')]";
    private schemeLocator:string = "//a[text()='%s']/../preceding-sibling::td//label/span";
    private selectAllCheck:string = "//span[@id='scheme-selection-check-all']";
    private readonly page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    /**
     * Selects a schema type from the dropdown.
     * @param schemaType The schema type to select.
     */
    async selectSchemaType(schemaType: string): Promise<void> {
        await this.page.waitForSelector(this.schemaTypeDropdown);
        await this.page.selectOption(this.schemaTypeDropdown, { label: schemaType });
    }

    /**
     * Clicks the 'Select All' checkbox for schemes.
     */
    async selectAllScheme(): Promise<void> {
        await this.page.waitForSelector(this.selectAllCheck);
        await this.page.click(this.selectAllCheck);
    }

    async searchScheme(scheme: string) {
        await this.page.locator(this.searchSchemeInput).clear();
        await this.page.fill(this.searchSchemeInput, scheme);
    }

    /**
     * Selects a scheme by name.
     * @param scheme The scheme name to select.
     */
    async selectScheme(scheme: string): Promise<void> {
        const schemeNameLocator = this.schemeNameLocator(scheme);
        await this.page.waitForSelector(schemeNameLocator);
        await this.page.click(schemeNameLocator);
    }

    private schemeNameLocator(scheme: string): string {
        return this.schemeLocator.replace('%s', scheme);
    }
}