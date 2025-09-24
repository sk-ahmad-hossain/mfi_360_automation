import { Page } from "playwright";
import { expect } from "playwright/test";

export abstract class BasePage {
    protected titleLocator: string = 'div.page-title h3';
    protected page: Page;
    protected path?: string = "";
    protected title?: string = ""

    // common in all pages
    private showReportSelector: string = "#ShowPerformanceReturn";

    async open() {
        await this.page.goto(this.path);
        await this.page.waitForLoadState()
        await expect(this.page.locator(this.titleLocator)).toContainText(this.title);
    }

    constructor(page: Page, path?: string, title?: string) {
        this.page = page;
        this.path = path;
        this.title = title;
    }

    async clickShowReport(){
        await this.page.waitForSelector(this.showReportSelector, { state: 'visible' });
        await this.page.click(this.showReportSelector);
    }
}