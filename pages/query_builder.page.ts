import { expect, Page } from '@playwright/test';
import { BasePage } from './common/BasePage';
import { SchemaSelectionComponent } from "./common/schema_selection.component";

export class Querybuilder extends BasePage {
    readonly schemaSelection: SchemaSelectionComponent;
    protected page: Page;


    constructor(page: Page) {
        super(page, "Report/QueryBuilder#", "Query Builder")
        this.page = page;
        this.schemaSelection = new SchemaSelectionComponent(page);

    }

    //Navigate to "please select the scheme" button
    async open() { {
    await super.open();
    await this.page.waitForLoadState();

    // Corrected wait for visibility
    await this.page.locator("//button[normalize-space()='Please Select Schemes']").waitFor({ state: 'visible', timeout: 10000 });

    await this.page.locator("//button[normalize-space()='Please Select Schemes']").click();
    await this.page.waitForLoadState();
}

    }
    //close the popup
    async closedthepopup() {
        await this.page.locator("div[role='document'] span[aria-hidden='true']").click();
        await this.page.waitForLoadState();
    }
    //Select the section from the sidebar
    async selectSection(sectionName: string) {
        await this.page.locator(`//div[@class='accordion md-accordion ng-scope']//span[text()='${sectionName}']`).click();
        await this.page.waitForLoadState();
    }

    //add portfolio month in the input section
    async selectAndValidateOpions(sectionName: string, attrOptions: { option: string, value: string }[]) {
        await this.page.locator(`//div[@class='accordion md-accordion ng-scope']//span[text()='${sectionName}']`).click();
        await this.page.waitForLoadState();

        for (const element of attrOptions) {
            await this.page.locator(`//div[normalize-space()='${element.option}']//i[@class='fa fa-plus']`).click();
            console.log("Clicked successfully.");

            if (sectionName !== "Entry Exit Load" && sectionName !== "NAV Master" && sectionName !== "Schemes Master") {
                await this.page.locator("//input[@ng-model='y.Value']").fill(element.value);
                console.log("Filled successfully.");
            }


            const labelText = await this.page.locator("//div[@id='selected-fields']//label//b").textContent();
            console.log("Selected Attribute Name", labelText);
            console.log("Expected Attribute Name", element.option);
            expect(labelText).toContain(element.option);
        }


    }


    //select expression from the dropdown

    async selectexpression(expression: string) {
        await this.page.locator("//div[@ng-show='y.IsArithmeticRequired']//button").click();
        await this.page.locator(`//ul[@id='dropdownMenu']//li//a[@data-val='${expression}']`).click();
        await this.page.waitForLoadState();

    }

    //click on toggle button
    async togglebutton(ng_model: string) {
        await this.page.locator(`//md-switch[@ng-model='${ng_model}']//div[@class='md-thumb md-ink-ripple']`).click();
        await this.page.waitForLoadState();
    }

    // Navigate to the open side bar and add this below function:Nature of Instrument,Corpus Percent,Scheme Short Name
    async selectOutputAttributes(section: string, outputAttr: string[]) {
        for (const element of outputAttr) {
            await this.page.locator(`//span[text()='${section}']/ancestor::div[@class='card-header']/following-sibling::div//div[normalize-space()='${element}']`).click();
            console.log("Selected Output Column is:", element);
        }
    }

    async clickSearchBtn() {
        await this.page.locator("//button[@ng-click='SearchReport()']").click();
        console.log("Clicked on Search Button");



    }

    async validateOutputHeaders(outputAttr: string[]) {
        let index = 1;
        for (const element of outputAttr) {
            const headerText = (await this.page.locator(`//div[@id='Outputdiv']//table//th[${index}]`).textContent()).trim();
            console.log("Output Header Name: ", headerText);
            console.log("Selected Header Name: ", element);
            expect(headerText).toContain(element);
            index++;
        }
        await this.page.waitForLoadState();
    }

}






