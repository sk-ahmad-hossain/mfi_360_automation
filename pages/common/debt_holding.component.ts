import { Page, Locator, expect } from '@playwright/test';
import { BasePage } from './BasePage';

export class DebtHoldingComponent extends BasePage{


  // component use from outside class - public readonly
  private readonly debtHoldingTab: Locator;
  private readonly tableRows: Locator;
  private readonly dropdown: string = "//select[@ng-model='DHRange']";
  
  // selector use inside class - private readonly
  //private readonly rangeCell: (index: number, ng_model: string) => Locator;
  //private readonly minMaxCell: (index: number, ng_model: string) => Locator;
  private readonly debtHoldingTableRow : string = "//h2[text()='Debt Holding']/../..//table/tbody/tr"

  // Method to get the cell locator by index and column ng_model
  cell(index: number, ng_model: string): Locator {
    return this.page.locator(`(//table[@class="table table-bordered"]//tbody//tr[@ng-repeat="x in DebtHoldModel"])[${index + 1}]//td[@ng-model="${ng_model}"]`);
  }

  rangeCell(index: number, ng_model:string): Locator {
    return this.page.locator(`(//table[@class="table table-bordered"]//tbody//tr[@ng-repeat="x in MPRanModel"])[${index + 1}]//td[@ng-model="${ng_model}"]`);
  }

  minMaxCell(index: number, ng_model:string): Locator{
    return this.page.locator(`(//table[@class="table table-bordered"]//tbody//tr[@ng-repeat="x in MPRanModel"])[${index + 1}]//td//input[@ng-model="${ng_model}"]`);
  }

  constructor(page: Page) {
    super(page)
    this.page = page;
    this.debtHoldingTab = page.locator("//select[@ng-change='DHRanRadClick(DHRange)']");
    this.tableRows = page.locator("//h2[text()='Debt Holding']/../..//table/tbody/tr");
  }

  // async debtHoldingTable(): Promise<void> {
  //   const rows = this.page.locator(this.debtHoldingTableRow);
  //   const count = await rows.count();

  //   for (let i = 0; i < count; ++i) {
  //     const row = await rows.nth(i);
  //     const columns = row.locator("td", { visible: true})

  //   }
  // }\


  
async debtHoldingTable({ expectedRows }: { expectedRows: { range: string; min: string; max: string; }[]; }): Promise<void> { 
  const rowCount = await this.tableRows.count();
  expect(rowCount).toBe(expectedRows.length);

  for (let i = 0; i < expectedRows.length; i++) {
    await expect(this.rangeCell(i, "YrsCell")).toHaveText(expectedRows[i].range);
    const minValue = await this.minMaxCell(i, "x.MPRmin").getAttribute('placeholder');
    expect(minValue).toBe(expectedRows[i].min);
    const maxValue = await this.minMaxCell(i, "x.MPRmax").getAttribute('placeholder');
    expect(maxValue).toBe(expectedRows[i].max);
  }
}




  // async verifyDebtTable(expectedRows: { range: string; min: string; max: string; }[]): Promise<void> {
  //   const rowCount = await this.tableRows.count();
  //   expect(rowCount).toBe(expectedRows.length);

  //   for (let i = 0; i < rowCount; i++) {
  //     await expect(this.rangeCell(i, "YrsCell")).toHaveText(expectedRows[i].range);
  //     const minValue = await this.minMaxCell(i, "x.MPRmin").getAttribute('placeholder');
  //     expect(minValue).toBe(expectedRows[i].min);
  //     const maxValue = await this.minMaxCell(i, "x.MPRmax").getAttribute('placeholder');
  //     expect(maxValue).toBe(expectedRows[i].max);
  //   }
  // }

  async selectRange(range: string): Promise<void> {
    const rangeDropdown = this.page.locator(this.dropdown);
    await expect(rangeDropdown).toBeVisible();
    await rangeDropdown.selectOption({ label: range });
    await this.page.waitForLoadState('networkidle');
    await this.page.waitForTimeout(1000);
  }


}