import { test } from '@playwright/test';
import { Login } from '@pages/login-page';
import { AdvanceReturnAnalysisPage } from '@pages/advance_return_analysis.page';
import { ReportType } from '@type/report-type';

test.setTimeout(30000);
test('Verify P2P report generation', async ({ page }, testInfo) => {
    const login = new Login(page, testInfo);
    const schemeName = "Franklin India Corporate Debt Fund - Qtly IDCW";
    const advanceReturnAnalysisPage = new AdvanceReturnAnalysisPage(page);

    await login.login();

    await advanceReturnAnalysisPage.open();

    // schema selection
    await advanceReturnAnalysisPage.schemaSelection.searchScheme(schemeName);
    await advanceReturnAnalysisPage.schemaSelection.selectScheme(schemeName);

    // report type selection    
    await advanceReturnAnalysisPage.reportTypeSection.selectReportType(ReportType.P2P);
    await advanceReturnAnalysisPage.reportTypeSection.selectToDate("25 Jul 2025")
    await advanceReturnAnalysisPage.reportTypeSection.selectPeriods(["1 Day", "1 Week", "1 Month", "3 Months", "6 Months", "1 Year"]);
    await advanceReturnAnalysisPage.reportTypeSection.selectSettingSet("abs");
    await advanceReturnAnalysisPage.reportTypeSection.checkLastDayOfMonth();
    await advanceReturnAnalysisPage.reportTypeSection.checkSchemeWithIndex();

    //Other Criteria


    //show report
    await advanceReturnAnalysisPage.clickShowReport();

    //await page.waitForTimeout(30000)
});

test("Verify 'Rolling' report generation", async ({page}, testInfo) => {
    const login = new Login(page, testInfo);
    const schemeName = "Franklin India Corporate Debt Fund - Qtly IDCW";
    const advanceReturnAnalysisPage = new AdvanceReturnAnalysisPage(page);

    await login.login();

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
    await advanceReturnAnalysisPage.otherCriteria.checkShowMinMaxAvgRolling();

    //show report
    await advanceReturnAnalysisPage.clickShowReport();

    await page.waitForLoadState()
    await page.waitForTimeout(60000)
});