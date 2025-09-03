import { Page, test } from '@playwright/test';
import { Login } from '@pages/login-page';
import { AdvancedPortfolioAnalysis } from '@pages/advanced_portfolio_analysis.page';
import { ReportType } from '@type/report-type';
import { TIMEOUT } from 'dns/promises'; 
import { expect } from '@playwright/test';

let page: Page;
let advancedportfolioanalysis: AdvancedPortfolioAnalysis;

test.beforeAll(async ({browser}, testInfo)=> {
    test.setTimeout(60000);
    page = await browser.newPage();
    const login = new Login(page, testInfo);
    await login.login();

    advancedportfolioanalysis = new AdvancedPortfolioAnalysis(page);
})
// Test-1
//1. Navigate to the "Detailed Portfolio" tab.
// 2. Select a scheme from the Scheme Selection panel (e.g., Franklin India Corporate Debt Fund).
// 3.  select detail porfolio tab
// 4. Choose Portfolio Frequency ( Monthly).
// 5. Select Portfolio Periods.
// 6. Choose Portfolio Nature (e.g., Debt).
// 7. Select Code Feature (e.g., ISIN Code).
// 8. Choose Top Holding.
// 9. Set Market Value In to Crs.
// 10. Select Debt Details as "All".
// 11. Choose Market Cap (e.g., SFI or Custom).
// 12. Select Fund Size (e.g., Monthly Fund Size).
// 13. Choose Sector (e.g., MFI sector).
// 14. Select Long Term Rating.
// 15. Choose Group Company.
// 16. Check Instrument Set and Rating Set if needed.
// 17. Choose "multiple tab" Output.
// 18. Click "Show Report"
test("Verify user can configure all filters and generate a report successfully for Detailed Portfolio (for monthly )", async() => {
    await advancedportfolioanalysis.open();
    await advancedportfolioanalysis.schemeSelection.searchScheme("Franklin India Corporate Debt Fund - Qtly IDCW");
    await advancedportfolioanalysis.schemeSelection.selectScheme("Franklin India Corporate Debt Fund - Qtly IDCW");

    
    await advancedportfolioanalysis.switchTab("Detailed Portfolio");

    // Configure filters
    //await advancedportfolioanalysis.waitForTimeout(1000);
    await advancedportfolioanalysis.selectFrequency('monthly');
    await advancedportfolioanalysis.selectPeriods(["Jun 2025","Feb 2025"]);
    await advancedportfolioanalysis.selectNature('Equity');
    await advancedportfolioanalysis.selectCodeFeature('BSE Code');
    await advancedportfolioanalysis.selectTopHolding('5');
    await advancedportfolioanalysis.setMarketValueInCrs('Million');
    await advancedportfolioanalysis.selectDebtDetails('All');
    await advancedportfolioanalysis.selectMarketCap('SEBI');
    await advancedportfolioanalysis.validateFundSizeIsMonthly();
    await advancedportfolioanalysis.selectSector('MFI sector');
    await advancedportfolioanalysis.selectLongTermRating('Long Term Rating');
    await advancedportfolioanalysis.selectGroupCompany('Yes');
    await advancedportfolioanalysis.checkInstrumentAndRatingSet(true, true);
    await advancedportfolioanalysis.clickShowReport();
  });




//Test -3
// 1. Navigate to the "New Entry/Exit" tab.
// 2. Select a scheme from the Scheme Selection panel (HDFC Arbitrage Fund - Dir - Growth,HDFC Retirement Savings Fund - Equity Plan - Reg - Growth).
// 3. Choose Portfolio Month (e.g., July 2025).
// 4. Select Stock Option (e.g., New Stocks, Stocks Exited, or Both).
// 5. Click "Show Report".
test("Verify report generation based on selected scheme, month, and stock option for  New entry/exist tab", async() => {
    await advancedportfolioanalysis.open();
    await advancedportfolioanalysis.schemeSelection.searchScheme("HDFC Retirement Savings Fund - Equity Plan - Reg - Growth");
    await page.keyboard.press('Enter');
    
    await advancedportfolioanalysis.schemeSelection.selectScheme("HDFC Retirement Savings Fund - Equity Plan - Reg - Growth");

    await advancedportfolioanalysis.switchTab("New Entry/Exit");

    await advancedportfolioanalysis.selectPortfolioMonth(["Jul 2025"]);

   await advancedportfolioanalysis.selectStockOption("New Stocks");
   //await advancedportfolioanalysis.selectStockOption("Stock Exited");
   //await advancedportfolioanalysis.selectStockOption("Both");

   await advancedportfolioanalysis.clickShowReport();
   //await advancedportfolioanalysis.clickResetFilters();
})

//test -4
//Verify that the Quants tab displays correct metrics for selected scheme across months 

// //"1. Navigate to the Quants tab.
// 2. Select the scheme HDFC Arbitrage Fund - Dir - Growth.
// 3.Select Select Portfolio Month
// 4. Choose Portfolio Frequency (Monthly or Fortnightly).
// 5. Select Normalised option (e.g., As Disclosed by AMC).
// 6. Check metrics: Average Maturity, Modified Duration, Duration, Macaulay Duration (Days/Years).
// 7. Verify Maturity Profile ranges (e.g., 0–30, 31–91, etc.).

// 8. Verify Debt Holding range (e.g., 0–30 days).
// 9. Click Show Report."

test("Verify that the Quants tab displays correct metrics for selected scheme across months", async() => {
    await advancedportfolioanalysis.open();
    await advancedportfolioanalysis.schemeSelection.searchScheme("HDFC Arbitrage Fund - Dir - Growth");
    await advancedportfolioanalysis.schemeSelection.selectScheme("HDFC Arbitrage Fund - Dir - Growth");
    await advancedportfolioanalysis.switchTab("Quants");
    await advancedportfolioanalysis.selectPortfolioMonthDropdown(["Jun 2025","Feb 2025"]);
    await advancedportfolioanalysis.selectPortfolioFrequency('monthly');
    //await advancedportfolioanalysis.selectNormalisedOption("As Disclosed by AMC");
   // await advancedportfolioanalysis.checkMetrics(["Average Maturity", "Modified Duration", "Duration", "Macaulay Duration"]);
    //await advancedportfolioanalysis.verifyMaturityProfileRanges(["0–30", "31–91"]);
    //await advancedportfolioanalysis.verifyDebtHoldingRange("0–30 days");
    await advancedportfolioanalysis.clickShowReport();
});


//Test-5

//Verify that Market Cap report is generated correctly using SEBI classification

// "1. Navigate to the Market Cap tab.
// 2. Select the scheme HDFC Arbitrage Fund - Dir - Growth.
// 3. Choose SEBI under Market Capitalization options.
// 4. Click Select Period.
// 5. Enter Range From and Range To values.
// 6. Click Show Report."

test("Verify that Market Cap report is generated correctly using SEBI classification", async() => {
    await advancedportfolioanalysis.open();
    await advancedportfolioanalysis.schemeSelection.searchScheme("HDFC Arbitrage Fund - Dir - Growth");
    await advancedportfolioanalysis.schemeSelection.selectScheme("HDFC Arbitrage Fund - Dir - Growth");
    await advancedportfolioanalysis.switchTab("Market Cap");
    //await advancedportfolioanalysis.selectMarketCap("SEBI");
    await advancedportfolioanalysis.selectPeriod(["Jan 2025", "Feb 2025"]);
    //await advancedportfolioanalysis.enterRangeValues(["100", "200"]);
    await advancedportfolioanalysis.clickShowReport();
});



