

import { test, Page } from "@playwright/test";
import { Login } from "@pages/login-page";
import { YtmDuration } from "@pages/YTM_Duration.page";
import { MaturityProfilePage } from "@pages/common/maturity_profile.component";

let page: Page;
let ytmDuration: YtmDuration;

test.beforeAll(async ({browser}, testInfo)=> {
    test.setTimeout(60000);
    page = await browser.newPage();
    const login = new Login(page, testInfo);
    await login.login();

    ytmDuration = new YtmDuration(page);
})
//Test-1
//Verify UI elements and functionality of the "YTM and Duration" section
// 1. Navigate to the ""YTM and Duration"" section
// 2. Select a scheme from the Scheme Selection dropdown
// 3. Check/uncheck Portfolio Quants options
// 4. View Maturity Profile and Debt Holding tables
// 5. Click Submit and Reset buttons"

test("Verify UI elements and functionality of the YTM and Duration section", async () => {
    const schemeName = "Franklin India Corporate Debt Fund - Qtly IDCW"
    const debtTable = [
        {range: '0-3 Yrs', min: '0', max: '3'}
    ];

    const maturityTable = [
        { range: '0-3 Yrs', min: '0', max: '3' },
        { range: '3-6 Yrs', min: '3', max: '6' },
        { range: '6-9 Yrs', min: '6', max: '9' },
        { range: '>9 Yrs', min: '9', max: '' }
    ];

    await ytmDuration.open();

    await ytmDuration.schemeSelection.searchScheme(schemeName);
    await ytmDuration.schemeSelection.selectScheme(schemeName);

    await ytmDuration.validatePortfolioQuants();
    await ytmDuration.verifyPortfolioQuantsMetrics();

    await ytmDuration.MaturityProfilePage.selectRange(ytmDuration.Range.MFIRange);
    await ytmDuration.MaturityProfilePage.verifyTableData(maturityTable);

    await page.waitForLoadState();
    await ytmDuration.debtHoldingComponent.selectRange(ytmDuration.Range.MFIRange);
   await ytmDuration.debtHoldingComponent.debtHoldingTable ({ expectedRows: debtTable });
     await ytmDuration.submitbutton();
    //after click on submit button it is navigating to another page and need to verify the data on that page
    await ytmDuration.verifyConsolidatedReportTab();
    await ytmDuration.navigateToMaturityProfileTab();
    await ytmDuration.navigateToDebtHoldingTab();
});