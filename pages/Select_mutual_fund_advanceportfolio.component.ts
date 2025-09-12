import { Page } from '@playwright/test';

export class MutualFundSelector {
  constructor(private page: Page) {}

  async selectMutualFund(fundName: string): Promise<void> {
    // Type into the search bar
    await this.page.fill('input[placeholder="Type Mutual Fund Name..."]', fundName);

    // Wait for the mutual fund name to appear
    await this.page.waitForSelector(`text="${fundName}"`);

    // Select the checkbox next to the mutual fund name
    const checkboxSelector = '#MFSelectionchkDirectiveIndex_MFName_63[ng-click="chkMutualFundClick($event,MutualFund.Id,MutualFund.Name,MutualFund.IsChecked);"]';
    await this.page.click(checkboxSelector);
  }
}