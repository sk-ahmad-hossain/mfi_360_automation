
import { expect, Page } from '@playwright/test';
import { BasePage } from './common/BasePage';
import { SchemaSelectionComponent } from "./common/schema_selection.component";
import { setBorder } from 'utils/util';
import { MaturityProfilePage } from '@pages/common/maturity_profile.component';
import { DebtHoldingComponent } from './common/debt_holding.component';


export class YtmDuration extends BasePage {

    // component used outside class - public readonly
    readonly schemeSelection: SchemaSelectionComponent;
    readonly MaturityProfilePage: MaturityProfilePage;
    readonly debtHoldingComponent: DebtHoldingComponent;

    // constant used inside and outside class - public readonly
    readonly Range = {
        MFIRange: "MFI Range",
        CustomizedRange: "Customized Range"
    }

    // Helper to map metrics to their locators
    checkboxesTextSelector: string = "//span[text()='%s']"
    checkboxSelector: string = "//span[text()='%s']/preceding-sibling::fieldset"
    metricCheckboxes: string[] = [
        "Average Maturity",
        "Modified Duration",
        "Duration",
        "Macaulay Duration",
        "YTM",
        "MTM"
    ];

    readonly dropdownSelector: string = "//div[@class='chosen-container chosen-container-single']//a";

    constructor(page: any) {
        super(page, "/YtmDuration/Analysis", "YTM and Duration");
        this.schemeSelection = new SchemaSelectionComponent(page);
        this.MaturityProfilePage = new MaturityProfilePage(page);
        this.debtHoldingComponent = new DebtHoldingComponent(page);
    }

    async validatePortfolioQuants() {
        const normalisedLabel = this.page.locator("//label[@id='ChkInvestAvailable']");
        await expect(normalisedLabel).toBeVisible();
        const classAttr = await normalisedLabel.getAttribute("class");
        if (classAttr?.includes("active")) {
            console.log("Normalised is selected.");
        } else {
            console.log("Normalised is not selected.");
        }
    }


    async verifyPortfolioQuantsMetrics() {
        for (const metric of this.metricCheckboxes) {
            // verify checkbox is visible
            const textLocator = this.checkboxesTextSelector.replace('%s', metric);
            await setBorder(this.page, textLocator);
            await expect(this.page.locator(textLocator), `${metric} checkbox should be visible`).toBeVisible();

            // verify checkbox is checked
            const checkboxLocator = this.checkboxSelector.replace('%s', metric);
            await setBorder(this.page, checkboxLocator);
            const checkbox = this.page.locator(checkboxLocator);
            await expect(checkbox, "${metric.name} checkbox should be visible").toBeVisible();
            const classAttr = await checkbox.getAttribute("class");
            await expect(classAttr?.includes("checked"), `${metric} checkbox should be checked`).toBeTruthy();
        }
    }

    async submitbutton(): Promise<void> {
        const submitButton = this.page.locator("#showYTMDurReport");
        await expect(submitButton).toBeVisible();
        await submitButton.click();
        await this.page.waitForLoadState('networkidle');
        await this.page.waitForTimeout(1000);
    }
    //after submitting ,it will open in new page then verify that by default  Consolidated Report tab


    async verifyConsolidatedReportTab(): Promise<void> {
        // Ensure Home tab is visible and click it
        const homeTab = this.page.locator("#home-tab");
        await expect(homeTab).toBeVisible();
        await homeTab.click();

        // Wait for network to be idle and allow DOM to settle
        await this.page.waitForLoadState('networkidle');
        await this.page.waitForTimeout(1000);

        // Validate Portfolio Date
        const portfolioDateLocator = this.page.locator("//th[normalize-space()='Portfolio Date']/following-sibling::th").nth(0);
        await expect(portfolioDateLocator).toBeVisible();
        const portfolioDateText = (await portfolioDateLocator.textContent())?.trim();
        console.log("Portfolio Date:", portfolioDateText);
        if (!portfolioDateText || portfolioDateText.length === 0) {
            throw new Error("Portfolio Date is missing or empty.");
        }

        // Validate Scheme Name
        const schemeNameLocator = this.page.locator("//th[normalize-space()='Scheme Name']/following-sibling::th").nth(1);
        await expect(schemeNameLocator).toBeVisible();
        const schemeNameText = (await schemeNameLocator.textContent())?.trim();
        console.log("Scheme Name:", schemeNameText);
        if (!schemeNameText || schemeNameText.length === 0) {
            throw new Error("Scheme Name is missing or empty.");
        }

        // Optional: Add assertions if you have expected values
        // expect(portfolioDateText).toContain("2025-09-01");
        // expect(schemeNameText).toBe("XYZ Growth Fund");
    }


    //Navigate to the Maturity Profile tab
    async navigateToMaturityProfileTab(): Promise<void> {
        await expect(this.page.locator("#profile-tab")).toBeVisible();
        await (this.page.locator("#profile-tab")).click();
        await this.page.waitForLoadState('networkidle');
        await this.page.waitForTimeout(10000);

        // we need verify the scheme name  0 to 3 Yrs	3 to 6 Yrs	6 to 9 Yrs	>9 Yrs	Cash & Others	Grand Total coloum value
        const schemeNameLocator = this.page.locator("//div[@class='th-inner']");
        await expect(schemeNameLocator).toBeVisible();
        const schemeNameText = (await schemeNameLocator.textContent())?.trim();
        console.log("Scheme Name:", schemeNameText);
        if (!schemeNameText || schemeNameText.length === 0) {
            throw new Error("Scheme Name is missing or empty.");
        }

    }


    //Navigate to the Debt Holding tab
    async navigateToDebtHoldingTab(): Promise<void> {
        await expect(this.page.locator("#profile-tab2")).toBeVisible();
        await (this.page.locator("#profile-tab2")).click();
        await this.page.waitForLoadState('networkidle');
        await this.page.waitForTimeout(1000);
        // verify the scheme name ,instrument name and company name

        const schemeNameLocator = this.page.locator("//table[@id='tblDHRes']//th[@data-align='left'][normalize-space()='Scheme Name']");
        await expect(schemeNameLocator).toBeVisible();
        const schemeNameText = (await schemeNameLocator.textContent())?.trim();
        console.log("Scheme Name:", schemeNameText);    
        if (!schemeNameText || schemeNameText.length === 0) {
            throw new Error("Scheme Name is missing or empty.");
        }   
        //verify the instrument name
        const instrumentNameLocator = this.page.locator("//table[@id='tblDHRes']//th[@data-align='left'][normalize-space()='Instrument Name']");
        await expect(instrumentNameLocator).toBeVisible();
        const instrumentNameText = (await instrumentNameLocator.textContent())?.trim();
        console.log("Instrument Name:", instrumentNameText);
        if (!instrumentNameText || instrumentNameText.length === 0) {
            throw new Error("Instrument Name is missing or empty.");
        }
        //verify the company name
        const companyNameLocator = this.page.locator("//table[@id='tblDHRes']//th[@data-align='left'][normalize-space()='Company Name']");
        await expect(companyNameLocator).toBeVisible();
        const companyNameText = (await companyNameLocator.textContent())?.trim();
        console.log("Company Name:", companyNameText);
        if (!companyNameText || companyNameText.length === 0) {
            throw new Error("Company Name is missing or empty.");
        }
        
    
    }





}

