import { Page, Locator, expect } from '@playwright/test';

import { SchemaSelectionComponent } from "pages/common/schema_selection.component"
import { BasePage } from './common/BasePage';
import { setBorder } from 'utils/util';
//import { setBorder } from 'utils/util';

export class AdvancedPortfolioAnalysis extends BasePage {
 page: Page;
  private frequencyMonthly: Locator;
  private frequencyFortnightly: Locator;
  private periodsDropdown: Locator;
  private natureEquity: Locator;
  private natureDebt: Locator;
  private natureOthers: Locator;
  private CodeFeatureisin: Locator;
  private CodeFeatureBSE: Locator;
  private CodeFeatureNSE: Locator;
  private MarketCapSEBI: Locator;
  private lblPortCustom: Locator;
  private FundSize: Locator;
  private SelectSector: Locator;
  private longTermRating: Locator;
  private GroupCompany: Locator;
  private MarketvalueinCrs: Locator;
  private DebtDetails: Locator;
  private topHoldingDropdown: Locator;
  private groupCompanyDropdown: Locator;
  private readonly InstrumentSet: string = "//div[@id='tab_contentDetailedPortfolio']//span[text()='Instrument Set']/../fieldset";
  private RatingSet: Locator;
  //private showreport: Locator;
  private SelectPortfolioMonth: string = "//*[@id='DvAvgMat']/div/select";
  //private StockOption: string="//*[@id='DvAvgMat']/div/div/label[3]";
  //private showreport2: Locator;
  private readonly newStocks: Locator;
  private stocksExited: Locator;
  private both: Locator;
  private readonly portfolioFrequencyMonthly: Locator;
  private readonly portfolioFrequencyFortnightly: Locator;
  private portfoliomonth:Locator;
  private PortfolioMonthDropdown: Locator;
  private readonly monthlyFrequencyLabel: Locator;
  private readonly fortnightlyFrequencyLabel: Locator;

  //private quantsTab: Locator;
  //private newEntryExitTab: Locator;

  readonly schemeSelection: SchemaSelectionComponent;
  readonly new_entry_exit_show_report_button = "button#btnEntryExitSubmit[ng-click='GetEntryExitDetailsReport()']"
  readonly tab_locator = "//a[text()='%s']"


  constructor(page: Page) {
    super(page, "/PortfolioAnalysis/Advance", "Advanced Portfolio Analysis")
    this.page = page;
    this.frequencyMonthly = page.locator("(//label[@id='ChkInvestAvailable'])[1]");
    this.frequencyFortnightly = page.locator("(//label[@id='ChkInvestNotAvailable'])[1]");
    this.periodsDropdown = page.locator("div[class='col-md-4 col-sm-4 col-xs-12'] button[type='button']");  //adjust selector
    this.natureEquity = page.locator("#lblEquity");
    this.natureDebt = page.locator("#lblDebt");
    this.natureOthers = page.locator("#lblOthers");
    this.CodeFeatureisin = page.locator("#lblISIN");
    this.CodeFeatureBSE = page.locator("#lblBSE");
    this.CodeFeatureNSE = page.locator("#lblNSE");
    this.topHoldingDropdown = page.locator("#drpTopHolding"); // adjust selector
    this.MarketvalueinCrs = page.locator("#drpMarketValueIn");
    this.MarketCapSEBI = page.locator("#lblPortMFI");
    this.DebtDetails = page.locator("#drpDebtDetails");
    this.lblPortCustom = page.locator("#lblPortCustom");
    this.FundSize = page.locator("(//label[normalize-space()='Monthly Fund Size'])[1]");
    this.SelectSector = page.locator("#drpSector");
    this.longTermRating = page.locator("#drplngtrmrting"); 
    this.groupCompanyDropdown = page.locator("(//select[@id='chkGrpCompany'])[1]"); 
    //this.InstrumentSet = page.locator("//div[@id='tab_contentDetailedPortfolio']//span[text()='Instrument Set']/../fieldset");
    this.RatingSet = page.locator("//div[@id='tab_contentDetailedPortfolio']//span[text()='Rating Set']/../fieldset");
    this.portfolioFrequencyMonthly = page.locator("(//label[@id='ChkInvestAvailable'])[2]");
    this.portfolioFrequencyFortnightly = page.locator("(//label[@id='ChkInvestNotAvailable'])[2]");

    this.newStocks = this.page.locator("#DvAvgMat > div > div > label.btn.btn-success.active.focus");
    this.stocksExited = this.page.locator("(//label[normalize-space()='Stocks Exited'])[1]");
    this.both = this.page.locator("(//label[normalize-space()='Both'])[1]");
    this.portfoliomonth = this.page.locator("#divMultiAllPortDatesQuants > div > button");
    this.PortfolioMonthDropdown=this.page.locator("//*[@id='divMultiAllPortDatesQuants']/div/button");
    this.monthlyFrequencyLabel = this.page.locator("//label[normalize-space()='Monthly Portfolio']");
    this.fortnightlyFrequencyLabel = this.page.locator("//label[normalize-space()='Fortnightly Portfolio']");
    // TODO remove these
    //this.newEntryExitTab = page.locator("#NewEntryExit-tab0");
    //this.quantsTab = page.locator("#PortfolioQuants-tab");


    this.schemeSelection = new SchemaSelectionComponent(page);
  }

  //todo remove
  async switchTab(tab: string) {
    const locator = this.tab_locator.replace('%s', tab);
    await this.page.click(locator);
  }

  async selectFrequency(frequency: 'monthly' | 'fortnightly') {
    if (frequency === 'monthly') {
      await this.frequencyMonthly.click();
    } else {
      await this.frequencyFortnightly.click();
    }
  }

  async selectPeriods(periods: string[]) {
    await this.periodsDropdown.click();
    for (const period of periods) {
      const optionLocator = this.page.locator(`text="${period}"`);
      await optionLocator.waitFor({ state: 'visible' });
      await optionLocator.click();
      await this.page.waitForTimeout(200);
    }
    await this.periodsDropdown.click();
    

  }
  async selectNature(nature: 'Equity' | 'Debt' | 'Others') {
    switch (nature) {
      case 'Equity':
        await this.natureEquity.click();
        break;
      case 'Debt':
        await this.natureDebt.click();
        break;
      case 'Others':
        await this.natureOthers.click();
        break;
    }
  }


  async selectCodeFeature(feature: 'ISIN Code' | 'BSE Code' | 'NSE Code') {
    switch (feature) {
      case 'ISIN Code':
        await this.CodeFeatureisin.click();
        break;
      case 'BSE Code':
        await this.CodeFeatureBSE.click();
        break;
      case 'NSE Code':
        await this.CodeFeatureNSE.check();
        break;
    }
  }

  async selectTopHolding(value: string) {
    // Select the desired option by label or value
    await this.page.selectOption('#drpTopHolding', { label: value });

    // Assert the selected value is reflected
    const selectedText = await this.page.locator('#drpTopHolding').inputValue();
    expect(selectedText).toBe(value);
  }


  async setMarketValueInCrs(value: string) {

    //await setBorder(this.page,"#drpMarketValueIn");

    //await setBorder(this.page,"#drpMarketValueIn");

    await this.MarketvalueinCrs.selectOption(value);
    // const indexNameLocator = this
    //         .selector[this.title]
    //         .select_other_criteria
    //         .replace('%s', criteria);

    // await this.page.waitForSelector(indexNameLocator);
    // await this.page.click(indexNameLocator);
  }

  async selectDebtDetails(value: string) {
    await this.DebtDetails.selectOption(value);
  }




  async validateFundSizeIsMonthly() {
    const selectedText = await this.page.locator("(//label[normalize-space()='Monthly Fund Size'])[1]").textContent();
    expect(selectedText?.trim()).toBe('Monthly Fund Size');
  }


  async selectSector(value: string) {
    await this.SelectSector.selectOption(value);
  }

  async selectLongTermRating(value: string) {
    await this.longTermRating.selectOption(value);
  }

  async selectMarketCap(value: 'SEBI' | 'Custom') {
    switch (value) {
      case 'SEBI':
        await this.MarketCapSEBI.click();
        break;
      case 'Custom':
        await this.lblPortCustom.click();
        break;
    }
  }
  async selectGroupCompany(option: 'Yes' | 'No') {
    const dropdownLocator = this.page.locator('#chkGrpCompany');
    await dropdownLocator.selectOption("Yes");
  }

  async checkInstrumentAndRatingSet(instrumentChecked: boolean, ratingChecked: boolean) {
    if (instrumentChecked) {
      await setBorder(this.page, this.InstrumentSet)
      await this.page.click(this.InstrumentSet);
    }

    if (ratingChecked) {
      await this.RatingSet.click();
    }
  }

  //NewentryExistTab


  // async selectNewEntryExitTab() {
    // await this.newEntryExitTab.click();
  // }


  async selectPortfolioMonth(periods: string[]) {
    const portfolioMonthDropdown = this.page.locator(this.SelectPortfolioMonth);
    await portfolioMonthDropdown.click();
    await portfolioMonthDropdown.selectOption(periods);
    await this.page.waitForTimeout(200);
  }


  readonly stock_option_selector : string = "//div[@id='DvAvgMat']//label[normalize-space()='%s']"
  async selectStockOption(option: string) {
    const locator = this.stock_option_selector.replace('%s', option);
    await this.page.click(locator)
  }

  
  async clickShowReport() {
    const showReportButton = this.page.locator("//button[text()='Show Report']").filter({ visible: true });
    await showReportButton.first().click();
  }

  async clickResetFilters() {
    const resetButton = this.page.locator("//button[text()='Reset']").filter({ visible: true });
    await resetButton.first().click();
  }

  

async selectPortfolioMonthDropdown(months: string[]) {
  await this.PortfolioMonthDropdown.click();
  await this.page.waitForTimeout(200);
  for (const month of months) {
    await this.page.locator(`text=${month}`).click();
  }
  await this.PortfolioMonthDropdown.click();
}

  // async selectPortfolioFrequency(frequency: 'monthly' | 'fortnightly') {
  //   switch (frequency) {
  //     case 'monthly':
  //       await this.page.click("//label[normalize-space()='Monthly']");
  //       break;
  //     case 'fortnightly':
  //       await this.page.click("//label[normalize-space()='Fortnightly']");
  //       break;
  //   }
  // }

  
async selectPortfolioFrequency(frequency: 'monthly' | 'fortnightly') {
  switch (frequency) {
    case 'monthly':
      await this.monthlyFrequencyLabel.waitFor({ state: 'visible' });
      await this.monthlyFrequencyLabel.click();
      break;
    case 'fortnightly':
      await this.fortnightlyFrequencyLabel.waitFor({ state: 'visible' });
      await this.fortnightlyFrequencyLabel.click();
      break;
  }
}


  async selectNormalisedOption(option: string) {
    await this.page.click("//label[normalize-space()='Normalised']");
  }

  async checkMetrics(metrics: string[]) {
    for (const metric of metrics) {
      const locator = "//label[normalize-space()='Days']".replace('Days', metric);
      await this.page.click(locator);
    }
  }

  async verifyMaturityProfileRanges(ranges: string[]) {
    for (const range of ranges) {
      const locator = "//label[normalize-space()='Days']".replace('Days', range);
      await this.page.click(locator);
    }
  }

  async verifyDebtHoldingRange(range: string) {
    const locator = "//label[normalize-space()='Days']".replace('Days', range);
    await this.page.click(locator);
  }

  async selectPeriod(periods: string[]) {
    const periodDropdown = this.page.locator("[selected-model='selectedPeriod'] button");
    await periodDropdown.click();
    const option_selector = "//ul//*[text()='%s']";
    for (const period of periods) {
      const periodLocator = await this.page.locator(option_selector.replace('%s', period));
      await periodLocator.click();
    }
  }

}
