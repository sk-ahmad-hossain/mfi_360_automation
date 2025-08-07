import { expect } from "playwright/test";
import { SchemaSelectionComponent } from "pages/common/schema_selection.component";
import { ReportReturnType } from "@pages/common/return_type.component";

export class AdvanceReturnAnalysisPage {
    schemaSelection: SchemaSelectionComponent;
    reportTypeSection: ReportReturnType;
    private showReportSelector: string = "(#ShowPerformanceReturn,'Show Report')";
    page: any;

    constructor(page: any) {
        this.page = page;

        this.schemaSelection = new SchemaSelectionComponent(page);
        this.reportTypeSection = new ReportReturnType(page);
    }

    async open() {
        await this.page.goto("https://mfi360web-it2.icraanalytics.co.in:8443/SchemePerformance/Advance")
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