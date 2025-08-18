import { Page } from "playwright";
import { BasePage } from "./common/BasePage";
import { Index } from "./common/Index.component";
import { ReportReturnType } from "./common/return_type.component";
import { OtherCriteria } from "./common/other_criteria.component";



export class IndexPerformanceAnalysis extends BasePage {
    readonly index: Index;
    readonly returnType: ReportReturnType;
    readonly otherCriteria: OtherCriteria;
    private readonly showReportSelector: string = "//button[text()='Show Report']";

    constructor(page: Page) {
        super(page, "/IndexPerformance/Analysis", "Index Performance Analysis");
        this.index = new Index(page);
        this.returnType = new ReportReturnType(page);
        this.otherCriteria = new OtherCriteria(page, "Index Performance Analysis");
    }

    async showReport(){
        await this.page.waitForSelector(this.showReportSelector, { state: 'visible' });
        await this.page.click(this.showReportSelector);
    }


}