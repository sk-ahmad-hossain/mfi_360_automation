import { Page, Locator, expect } from '@playwright/test';

import { SchemaSelectionComponent } from "pages/common/schema_selection.component"
import { BasePage } from './common/BasePage';
import { setBorder } from 'utils/util';
//import { setBorder } from 'utils/util';

export class AdvancedPortfolioAnalysis extends BasePage{
 // private page: Page;
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
  private showreport: Locator;
  private newEntryExitTab: Locator;
  private SelectPortfolioMonth: Locator;
  private StockOption: Locator;
  private showreport2: Locator;

  readonly schemeSelection: SchemaSelectionComponent; 

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
    this.SelectSector = page.locator("#drpSector"); // adjust selector
    this.longTermRating= page.locator("#drplngtrmrting"); // adjust selector
    this.groupCompanyDropdown = page.locator("(//select[@id='chkGrpCompany'])[1]"); // adjust selector
    //this.InstrumentSet = page.locator("//div[@id='tab_contentDetailedPortfolio']//span[text()='Instrument Set']/../fieldset");
    this.RatingSet = page.locator("//div[@id='tab_contentDetailedPortfolio']//span[text()='Rating Set']/../fieldset");
    this.showreport= page.locator("#btnGetDetailedPortfolio");


    this.newEntryExitTab = page.locator("#NewEntryExit-tab0");
    this.SelectPortfolioMonth = page.locator("#DvAvgMat > div > select");
    this.StockOption = page.locator("#DvAvgMat > div > div > label.btn.btn-success.active");
    this.showreport2 = page.locator("(//button[@id='btnEntryExitSubmit'])[1]");

    this.schemeSelection = new SchemaSelectionComponent(page);
  }
  async selectDetailPortfolioTab() {
    await this.page.locator("#DetailedPortfolio-tab").click();
  }

  async selectFrequency(frequency: 'monthly' | 'fortnightly') {
    if (frequency === 'monthly') {
      await this.frequencyMonthly.click();
    } else {
      await this.frequencyFortnightly.click();
    }
  }

  // async selectPeriods(periods: string[]) {
  //   for (const period of periods) {
  //     await this.periodsDropdown.selectOption({ label: period })
  //     await this.periodsDropdown.waitFor();
  //   }
  // }


async selectPeriods(periods: string[]) {
  // Open the dropdown
  await this.periodsDropdown.click();

  for (const period of periods) {
    const optionLocator = this.page.locator(`text="${period}"`);
    await optionLocator.waitFor({ state: 'visible' });
    await optionLocator.click();
    await this.page.waitForTimeout(200); // optional delay
  }

  // Click again on the dropdown to close it
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

    await this.MarketvalueinCrs.selectOption(value );
    // const indexNameLocator = this
    //         .selector[this.title]
    //         .select_other_criteria
    //         .replace('%s', criteria);

        // await this.page.waitForSelector(indexNameLocator);
        // await this.page.click(indexNameLocator);
  }

  async selectDebtDetails(value: string) {
    await this.DebtDetails.selectOption( value );
  }

  


async validateFundSizeIsMonthly() {
  const selectedText = await this.page.locator("(//label[normalize-space()='Monthly Fund Size'])[1]").textContent();
  expect(selectedText?.trim()).toBe('Monthly Fund Size');
}


  async selectSector(value: string) {
    await this.SelectSector.selectOption(value);
  }

  async selectLongTermRating(value: string) {
    await this.longTermRating.selectOption(value );
  }

  async selectMarketCap(value:  'SEBI' | 'Custom') {
    switch (value) {
      case 'SEBI':
        await this.MarketCapSEBI.click();
        break;
      case 'Custom':
        await this.lblPortCustom.click();
        break;
    }
  }


  
// async selectGroupCompany(option: 'Yes' | 'No') {
//   await this.groupCompanyDropdown.click(); // open dropdown
//   const optionLocator = this.page.locator(`text=${option}`);
//   await optionLocator.waitFor({ state: 'visible' });
//   await optionLocator.click(); // select option
// }


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
async clickShowReport() {
  await this.showreport.click();
  await this.page.waitForLoadState('networkidle');
}


async selectNewEntryExitTab() {
  await this.newEntryExitTab.click();
}

async selectPortfolioMonth(month: string) {
  await this.SelectPortfolioMonth.selectOption({ label: month });
  const selectedText = await this.SelectPortfolioMonth.inputValue();
  expect(selectedText).toBe(month);
}

async selectStockOption(option: string) {
  await this.StockOption.selectOption({ label: option });
  const selectedText = await this.StockOption.inputValue();
  expect(selectedText).toBe(option);
}
async clickShowReport2() {
  await this.showreport2.click();
  await this.page.waitForLoadState('networkidle');
}

}
