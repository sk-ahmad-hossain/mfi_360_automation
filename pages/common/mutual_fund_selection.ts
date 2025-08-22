import { Page } from '@playwright/test';

export class mutualfundselection {
    private selectmutualFund: string = '//select[@id="LstAMC"]';
    private mutualFundLocator: string = "//a[text()='%s']/../preceding-sibling::td//label";

    page: Page;

    constructor(page: Page) {
        this.page = page;
    }

}