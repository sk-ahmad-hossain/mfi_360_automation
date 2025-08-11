import { expect } from "playwright/test";
import { SchemaSelectionComponent } from "pages/common/schema_selection.component";
import { ReportReturnType } from "@pages/common/return_type.component";
import { Index } from "@pages/common/Index.component";
import { OtherCriteria } from "@pages/common/other_criteria.component";

export class AdvanceReturnAnalysisPage {
    schemaSelection: SchemaSelectionComponent;
    reportTypeSection: ReportReturnType;
    otherCriteria: OtherCriteria;
    index : Index;
    private showReportSelector: string = "(#ShowPerformanceReturn,'Show Report')";
    page: any;

    constructor(page: any) {
        this.page = page;

        this.schemaSelection = new SchemaSelectionComponent(page);
        this.reportTypeSection = new ReportReturnType(page);
    }

    async open() {
        await this.page.goto("/SchemePerformance/Advance")
        await expect(this.page.locator('div.page-title h3')).toContainText('Advanced Return Analysis');
    }

    async clickShowReport(): Promise<void> {
        try {
            await this.page.waitForSelector(this.showReportSelector, { state: 'visible' });
            await this.page.click(this.showReportSelector);
        } catch (error) {
            console.error('Failed to click Show Report button:', error);
        }
    }
}