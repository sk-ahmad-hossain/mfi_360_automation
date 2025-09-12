import { Page, Locator, expect } from '@playwright/test';


export class MaturityProfilePage {
  readonly page: Page;
  readonly dropdown: Locator;
  readonly tableRows: Locator;
  // Method to get the range cell locator by index
  rangeCell(index: number, ng_model:string): Locator {
    return this.page.locator(`(//table[@class="table table-bordered"]//tbody//tr[@ng-repeat="x in MPRanModel"])[${index + 1}]//td[@ng-model="${ng_model}"]`);
  }

  minMaxCell(index: number, ng_model:string): Locator{
    return this.page.locator(`(//table[@class="table table-bordered"]//tbody//tr[@ng-repeat="x in MPRanModel"])[${index + 1}]//td//input[@ng-model="${ng_model}"]`);
  }

  constructor(page: Page) {
    this.page = page;
    this.dropdown = page.locator("//select[@ng-change='MPRanRadClick(MPRange)']");
    this.tableRows = page.locator("//table[@class='table table-bordered']//tbody//tr[@ng-repeat='x in MPRanModel']");
  }

  async verifyTableData(expectedRows: { range: string; min: string; max: string; }[]): Promise<void> {
    const rowCount = await this.tableRows.count();
    expect(rowCount).toBe(expectedRows.length);

    for(let i=0; i<rowCount; i++){
      await expect(this.rangeCell(i, "YrsCell")).toHaveText(expectedRows[i].range);
      const minValue = await this.minMaxCell(i, "x.MPRmin").getAttribute('placeholder');
      expect(minValue).toBe(expectedRows[i].min);
      const maxValue = await this.minMaxCell(i, "x.MPRmax").getAttribute('placeholder');
      expect(maxValue).toBe(expectedRows[i].max);
    }
  }

  async selectRange(range: string): Promise<void> {
    await expect(this.dropdown).toBeVisible();
    await this.dropdown.selectOption({ label: range });
    await this.page.waitForLoadState('networkidle');
    await this.page.waitForTimeout(1000);
    await expect(this.tableRows.first()).toBeVisible();
  }
}

