import { Page } from "playwright";
import { expect } from "playwright/test";

export abstract class BasePage {
    titleLocator: string = 'div.page-title h3';
    page: Page;
    path?: string = "";
    title?: string = ""

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
}