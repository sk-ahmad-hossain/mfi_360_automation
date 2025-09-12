import { Page, test } from '@playwright/test';
import { Login } from '@pages/login-page';
import { ReturnTRIBenchmark } from '@pages/tri_bench.page';

let page: Page;
let triBenchmark: ReturnTRIBenchmark;

test.beforeAll(async ({browser}, testInfo)=> {
    test.setTimeout(40000);
    page = await browser.newPage();
    const login = new Login(page, testInfo);
    await login.login();

    triBenchmark = new ReturnTRIBenchmark(page);
})

test("Verify report generation setting set and periods", async () => {
    const schemes = [ "Franklin India Corporate Debt Fund - Qtly IDCW" ];
    const periods = ["1 Day", "1 Week"]
    const settingSet = "abs"

    triBenchmark.open();

    for(const scheme of schemes) {
        await triBenchmark.schemeSection.searchScheme(scheme);
        await triBenchmark.schemeSection.selectScheme(scheme)
    }

    await triBenchmark.reportTypeSection.selectSettingSet(settingSet);
    await triBenchmark.selectPeriods(periods)
    
    await triBenchmark.generateReport();
});

test("Verify report generatiion with custom periods and date", async () => {
    const schemes = [ "Franklin India Corporate Debt Fund - Qtly IDCW" ];
    const periods = ["1 Day", "1 Week"]
    const settingSet = "abs"
    const date = "07 Sep 2025";

    triBenchmark.open();

    for(const scheme of schemes) {
        await triBenchmark.schemeSection.searchScheme(scheme);
        await triBenchmark.schemeSection.selectScheme(scheme)
    }

    await triBenchmark.selectDate(date);
    await triBenchmark.selectSettingSet(settingSet);
    await triBenchmark.selectPeriods(periods)

    await triBenchmark.generateReport();
});

test("Verify TRI report generation with last day of month", async () => {
    const schemes = [ "Franklin India Corporate Debt Fund - Qtly IDCW" ];
    const periods = ["1 Day", "1 Week"]
    const settingSet = "abs"

    triBenchmark.open();

    for(const scheme of schemes) {
        await triBenchmark.schemeSection.searchScheme(scheme);
        await triBenchmark.schemeSection.selectScheme(scheme)
    }

    await triBenchmark.selectSettingSet(settingSet);
    await triBenchmark.selectPeriods(periods)
    await triBenchmark.selectIndex(triBenchmark.Index.TRI)
    await triBenchmark.checkDayOfMonth();

    await triBenchmark.generateReport();
});

test("Verify TRI report generation with sebi mapping check", async () => {
    const schemes = [ "Franklin India Corporate Debt Fund - Qtly IDCW" ];
    const periods = ["1 Day", "1 Week"]
    const settingSet = "abs"

    triBenchmark.open();

    for(const scheme of schemes) {
        await triBenchmark.schemeSection.searchScheme(scheme);
        await triBenchmark.schemeSection.selectScheme(scheme)
    }

    await triBenchmark.selectSettingSet(settingSet);
    await triBenchmark.selectPeriods(periods)
    await triBenchmark.selectIndex(triBenchmark.Index.TRI)
    await triBenchmark.checkSEBIMappingNonAvailabilityIndex();

    await triBenchmark.generateReport();
});

test("Verify PRI report generation sebi mapping check", async () => {
    const schemes = [ "Franklin India Corporate Debt Fund - Qtly IDCW" ];
    const periods = ["1 Day", "1 Week"]
    const settingSet = "abs"

    triBenchmark.open();

    for(const scheme of schemes) {
        await triBenchmark.schemeSection.searchScheme(scheme);
        await triBenchmark.schemeSection.selectScheme(scheme)
    }

    await triBenchmark.selectSettingSet(settingSet);
    await triBenchmark.selectPeriods(periods)
    await triBenchmark.selectIndex(triBenchmark.Index.PRI)
    await triBenchmark.checkSEBIMappingNonAvailabilityIndex();

    await triBenchmark.generateReport();
});

test("Verify PRI report generation SEBI mapping", async () => {
    const schemes = [ "Franklin India Corporate Debt Fund - Qtly IDCW" ];
    const periods = ["1 Day", "1 Week"]
    const settingSet = "abs"

    triBenchmark.open();

    for(const scheme of schemes) {
        await triBenchmark.schemeSection.searchScheme(scheme);
        await triBenchmark.schemeSection.selectScheme(scheme)
    }

    await triBenchmark.selectSettingSet(settingSet);
    await triBenchmark.selectPeriods(periods)
    await triBenchmark.selectIndex(triBenchmark.Index.TRI)
    await triBenchmark.selectIndexOption(triBenchmark.IndexOption.SEBI_Mapping);

    await triBenchmark.generateReport();
});
