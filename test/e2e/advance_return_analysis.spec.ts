import { Page, test } from '@playwright/test';
import { Login } from '@pages/login-page';
import { AdvanceReturnAnalysisPage } from '@pages/advance_return_analysis.page';
import { ReportType } from '@type/report-type';

let page: Page;
let advanceReturnAnalysisPage: AdvanceReturnAnalysisPage;

test.setTimeout(45000);
test.beforeAll(async ({browser}, testInfo)=> {
    page = await browser.newPage();
    const login = new Login(page, testInfo);
    await login.login();

    advanceReturnAnalysisPage = new AdvanceReturnAnalysisPage(page);
})

test.afterAll( async() => {
    await page.close()
})


test("Verify 'P2P' report generation", async () => {
    const schemeName = "Franklin India Corporate Debt Fund - Qtly IDCW";
    await advanceReturnAnalysisPage.open();

    // schema selection
    await advanceReturnAnalysisPage.schemaSelection.searchScheme(schemeName);
    await advanceReturnAnalysisPage.schemaSelection.selectScheme(schemeName);

    // report type selection    
    await advanceReturnAnalysisPage.reportTypeSection.selectReportType(ReportType.P2P);
    await advanceReturnAnalysisPage.reportTypeSection.selectToDate("25 Jul 2025")
    await advanceReturnAnalysisPage.reportTypeSection.selectPeriodsForP2P(["1 Day", "1 Week", "1 Month", "3 Months", "6 Months", "1 Year"]);
    await advanceReturnAnalysisPage.reportTypeSection.selectSettingSet("abs");
    //await advanceReturnAnalysisPage.reportTypeSection.checkLastDayOfMonth();
    await advanceReturnAnalysisPage.reportTypeSection.checkSchemeWithIndex();

    //show report
    await advanceReturnAnalysisPage.clickShowReport();

    //await page.waitForTimeout(30000)
    await page.waitForLoadState();
});

test("Verify 'Rolling' report generation", async () => {
    const schemeName = "Franklin India Corporate Debt Fund - Qtly IDCW";
    await advanceReturnAnalysisPage.open();

    // schema selection
    await advanceReturnAnalysisPage.schemaSelection.searchScheme(schemeName);
    await advanceReturnAnalysisPage.schemaSelection.selectScheme(schemeName);

    // report rolling type selection    
    await advanceReturnAnalysisPage.reportTypeSection.selectReportType(ReportType.Rolling);
    //await advanceReturnAnalysisPage.reportTypeSection.selectToDate("25 Jul 2025")
    await advanceReturnAnalysisPage.reportTypeSection.selectPeriodForRolling(5, "days")
    await advanceReturnAnalysisPage.reportTypeSection.selectFrequency(5, "days")
    await advanceReturnAnalysisPage.reportTypeSection.selectSettingSet("abs");
    await advanceReturnAnalysisPage.reportTypeSection.checkSinceInception();
    await advanceReturnAnalysisPage.reportTypeSection.checkFirstDayOfTheMonth()
    await advanceReturnAnalysisPage.reportTypeSection.checkWithCalculationDate();

    // other criteria
    await advanceReturnAnalysisPage.otherCriteria.search("52 Week High")
    await advanceReturnAnalysisPage.otherCriteria.select("52 Week High")
    await advanceReturnAnalysisPage.otherCriteria.checkShowMinMaxAvg();

    //show report
    await advanceReturnAnalysisPage.clickShowReport();

    //await page.waitForTimeout(29000)
    await page.waitForLoadState()
});

test("Verify 'Fixed Periodic' report generation for return type", async () => {
    const schemeName = "Franklin India Corporate Debt Fund - Qtly IDCW";
    await advanceReturnAnalysisPage.open();

    // schema selection
    await advanceReturnAnalysisPage.schemaSelection.searchScheme(schemeName);
    await advanceReturnAnalysisPage.schemaSelection.selectScheme(schemeName);

   // report FixedPeriodic type selection    
    await advanceReturnAnalysisPage.reportTypeSection.selectReportType(ReportType.FixedPeriodic);
    await advanceReturnAnalysisPage.reportTypeSection.selectPeriodsForFixed("YoY")
    await advanceReturnAnalysisPage.reportTypeSection.selectSettingSet("abs");

    // other criteria
    await advanceReturnAnalysisPage.otherCriteria.search("52 Week High")
    await advanceReturnAnalysisPage.otherCriteria.select("52 Week High")
    await advanceReturnAnalysisPage.otherCriteria.checkShowMinMaxAvg();

    await advanceReturnAnalysisPage.clickShowReport();

    //await page.waitForTimeout(29000)
    await page.waitForLoadState()
})

test("Verify 'multiple date' report generation", async () => { 
    const reportTypes = [
        { type: "Both", period: 5, periodType: "days", frequency: 5, frequencyType: "days", dateRange: "1 July 2025 - 15 July 2025" }
    ]
    const schemeName = "Franklin India Corporate Debt Fund - Qtly IDCW";
    await advanceReturnAnalysisPage.open();

    // schema selection
    await advanceReturnAnalysisPage.schemaSelection.searchScheme(schemeName);
    await advanceReturnAnalysisPage.schemaSelection.selectScheme(schemeName);

   // report FixedPeriodic type selection    
    await advanceReturnAnalysisPage.reportTypeSection.selectReportType(ReportType.MultipleDate);
    for(const report of reportTypes) {
        await advanceReturnAnalysisPage.reportTypeSection.selectReportTypeForMultiple(report.type);
        await advanceReturnAnalysisPage.reportTypeSection.periods_options_mult(report.period, report.periodType)
        await advanceReturnAnalysisPage.reportTypeSection.select_frequency_multi(report.frequency, report.frequencyType)
        await advanceReturnAnalysisPage.reportTypeSection.addReporType();
    }

    await advanceReturnAnalysisPage.reportTypeSection.selectSettingSet("abs");
    await advanceReturnAnalysisPage.reportTypeSection.checkSchemeWithIndex();
    await advanceReturnAnalysisPage.clickShowReport();

    await page.waitForLoadState()
})