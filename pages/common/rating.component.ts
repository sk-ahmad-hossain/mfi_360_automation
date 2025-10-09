// mfiPage.ts
import { Page, Locator } from '@playwright/test';

export class MFIPage {
  readonly page: Page;
  readonly mfiratingDropdown: Locator;
  readonly instrumentDropdown: Locator;
  readonly portfoliocheckbox: Locator;
  readonly topHoldingCheckbox: Locator;
  readonly topHoldingInput: Locator;
  readonly summaryRadio: Locator;
  readonly marketValueCheckbox: Locator;



  constructor(page: Page) {
    this.page = page;
    this.mfiratingDropdown = page.locator("//button[normalize-space()='All MFI Rating']");
    this.instrumentDropdown = page.locator("//button[normalize-space()='All MFI Instrument']");
    this.portfoliocheckbox= page.locator("span[role='checkbox'][type='checkbox'][ng-model='IsPortfolioselected']")
    this.topHoldingCheckbox = page.locator("span[ng-model='IsPort_Tophold'] fieldset[role='button']");
    this.topHoldingInput = page.locator("//input[@id='Porttopholdings']");
    this.summaryRadio= page.locator('//span[@id="chkAnnDataSimple"]//span[contains(text(), "${label}")]');
    this.marketValueCheckbox = page.locator('//div[contains(@ng-style,"IsPortfolioselected")]//span[text()="${label}"]');
  
  }

  
getRadioByLabel(label: string): Locator { 
    return this.page.locator(`//span[@id="chkAnnDataSimple"]//span[contains(text(), "${label}")]`);
  }

  async selectRadioByLabel(label: string) {
    await this.getRadioByLabel(label).click();
  }

  
async selectRating(value: string) {
  await this.mfiratingDropdown.click();

  // Type in the search box if present
  const searchInput = this.page.locator('input[ng-model="input.searchFilter"]');
  if (await searchInput.isVisible()) {
    await searchInput.fill(value);
  }

  // Click the filtered option
  const optionLocator = this.page.locator(`//span[contains(@class,'angular-icheck-span') and normalize-space()='${value}']`);
  await optionLocator.waitFor({ state: 'visible', timeout: 5000 });
  await optionLocator.click();
  await this.page.mouse.click(0, 0);

}



  async selectInstrument(value: string) {
    await this.instrumentDropdown.click();

  const searchInput = this.page.locator('input[ng-model="input.searchFilter"]');
  if (await searchInput.isVisible()) {
    await searchInput.fill(value);
  }

  // Click the filtered option
  const optionLocator = this.page.locator(`//span[contains(@class,'angular-icheck-span') and normalize-space()='${value}']`);
  await optionLocator.waitFor({ state: 'visible', timeout: 5000 });
  await optionLocator.click();
  await this.page.mouse.click(0, 0);
  }


  async checkportfolio(){
    await this.portfoliocheckbox.click();
  }




  async enableTopHolding(count: number) {
    await this.topHoldingCheckbox.click();
    await this.topHoldingInput.fill(count.toString());
  }

  //there are radio button for summary and detailed view

 
async selectSummaryView(label: string) {
  const radioOption = this.page.locator(`//div[contains(@ng-style,"IsPortfolioselected")]//span[@id="chkAnnDataSimple"]//span[contains(text(), "${label}")]`);
  await radioOption.click();

}



  async toggleMarketValueCheckbox(label:string) {
    const checkbox = this.page.locator(`//div[contains(@ng-style,"IsPortfolioselected")]//span[text()="${label}"]`);
    await checkbox.click();
  }
}
