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
// //1. Navigate to the "Detailed Portfolio" tab.
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

    
    await advancedportfolioanalysis.selectDetailPortfolioTab();

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

    await advancedportfolioanalysis.selectNewEntryExitTab();

    await advancedportfolioanalysis.selectPortfolioMonth("July 2025");

   await advancedportfolioanalysis.selectStockOption("New Stocks");

   await advancedportfolioanalysis.clickShowReport2();

})