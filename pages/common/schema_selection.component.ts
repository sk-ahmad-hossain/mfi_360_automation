
import { Page } from '@playwright/test';

export class SchemaSelectionComponent {
    private page: Page;
    private schemaTypeDropdown: string = 'scheme-selection-directive select';
    private searchSchemeInput: string = "//input[contains(@placeholder,'Type Scheme Name')]";
    private schemeLocator: string = "//a[text()='%s']/../preceding-sibling::td//label";
    private selectAllCheck: string = "//span[@id='scheme-selection-check-all']";

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

    /**
     * Searches for a scheme by name.
     * @param scheme The scheme name to search for.
     */
    async searchScheme(scheme: string): Promise<void> {
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

    /**
     * Returns the locator for a scheme name.
     * @param scheme The scheme name.
     */
    private schemeNameLocator(scheme: string): string {
        return this.schemeLocator.replace('%s', scheme);
    }
}