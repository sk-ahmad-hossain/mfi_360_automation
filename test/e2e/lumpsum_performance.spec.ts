import { Page, test } from '@playwright/test';
import { Login } from '@pages/login-page';
import { LumpsumPerformance } from '@pages/lumpsum_performance.page';

let page: Page;
let lumpsumPerformance : LumpsumPerformance;

test.beforeAll(async ({browser}, testInfo)=> {
    test.setTimeout(40000);
    page = await browser.newPage();
    const login = new Login(page, testInfo);
    await login.login();

    lumpsumPerformance = new LumpsumPerformance(page);
})

test("create mapping with single scheme only", async () => {
    const scheme = "Franklin India Corporate Debt Fund - Qtly IDCW";
    await lumpsumPerformance.open();
    await page.waitForLoadState();
    await lumpsumPerformance.schemaSelection.searchScheme(scheme)
    await lumpsumPerformance.schemaSelection.selectScheme(scheme)
    await lumpsumPerformance.createMap();
    await lumpsumPerformance.validCreateSuccessfullMessage();
    await page.waitForLoadState();
    await lumpsumPerformance.validateMapPresent([scheme]);
    await lumpsumPerformance.showReport([scheme]);

    await page.waitForLoadState()
});

// done Negative
test("create mapping which is already exists", async () => {
    const scheme = "Franklin India Corporate Debt Fund - Qtly IDCW"; // already created in previous test
    await lumpsumPerformance.open();
    await page.waitForLoadState();
    await lumpsumPerformance.schemaSelection.searchScheme(scheme)
    await lumpsumPerformance.schemaSelection.selectScheme(scheme)
    await lumpsumPerformance.createMap();
    await lumpsumPerformance.validateMapAlreadyPresentErrorMessage();
    await page.waitForLoadState()
});

// done
test("create mapping with multiple scheme", async () => {
    const schemes = [
        "Franklin India Corporate Debt Fund - Qtly IDCW",
        "ICICI Prudential Floating Interest Fund - Dir -  Dly IDCW"
    ];
    await lumpsumPerformance.open();
    await page.waitForLoadState();
    for(const scheme of schemes) {
        await lumpsumPerformance.schemaSelection.searchScheme(scheme)
        await lumpsumPerformance.schemaSelection.selectScheme(scheme)
    }
    await lumpsumPerformance.createMap();
    await lumpsumPerformance.validCreateSuccessfullMessage();
    await lumpsumPerformance.validateMapPresent(schemes);
    await page.waitForLoadState()
})

// done
test("create mapping with single schema and index only", async () => {
    const scheme = "Franklin India Corporate Debt Fund - Qtly IDCW"
    await lumpsumPerformance.open();
    await page.waitForLoadState();
    await lumpsumPerformance.schemaSelection.searchScheme(scheme)
    await lumpsumPerformance.schemaSelection.selectScheme(scheme)

    await lumpsumPerformance.index.searchIndex("BSE 100");
    await lumpsumPerformance.index.selectIndex("BSE 100");

    await lumpsumPerformance.createMap();
    await lumpsumPerformance.validCreateSuccessfullMessage();
    await lumpsumPerformance.validateMapPresent([scheme]);
    await page.waitForLoadState()
})

// done
test("create mapping with scheme and customize index", async () => {
    const scheme = "Franklin India Corporate Debt Fund - Qtly IDCW"
    await lumpsumPerformance.open();
    await page.waitForLoadState();
    await lumpsumPerformance.schemaSelection.searchScheme(scheme)
    await lumpsumPerformance.schemaSelection.selectScheme(scheme)

    await lumpsumPerformance.index.expandSectionCustomizeIndex()
    await lumpsumPerformance.index.searchCustomizeIndex("Custom Index Generic");
    await lumpsumPerformance.index.selectCustomizeIndex("Custom Index Generic");

    await lumpsumPerformance.createMap();
    await lumpsumPerformance.validCreateSuccessfullMessage();
    await lumpsumPerformance.validateMapPresent([scheme]);
    await page.waitForLoadState()
})

// done
test("create mapping with scheme and composite index", async () => {
    const scheme = "ICICI Prudential Savings Fund - Reg - Dly IDCW"
    const composite_index = "Composite index 1"

    await lumpsumPerformance.open();
    await page.waitForLoadState();
    await lumpsumPerformance.schemaSelection.searchScheme(scheme)
    await lumpsumPerformance.schemaSelection.selectScheme(scheme)

    await lumpsumPerformance.index.expandSectionCompositeIndex()
    await lumpsumPerformance.index.searchCompositeIndex(composite_index);
    await lumpsumPerformance.index.selectCompositeIndex(composite_index);

    await lumpsumPerformance.createMap();
    await lumpsumPerformance.validCreateSuccessfullMessage();
    await lumpsumPerformance.validateMapPresent([scheme]);
    await page.waitForLoadState()
})

test("create mapping with index and additional index", async () => {
    const scheme = "ICICI Prudential Savings Fund - Reg - Dly IDCW"
    const composite_index = "Composite index 1"

    await lumpsumPerformance.open();
    await page.waitForLoadState();
    await lumpsumPerformance.schemaSelection.searchScheme(scheme)
    await lumpsumPerformance.schemaSelection.selectScheme(scheme)

    await lumpsumPerformance.index.expandSectionCompositeIndex()
    await lumpsumPerformance.index.searchCompositeIndex(composite_index);
    await lumpsumPerformance.index.selectCompositeIndex(composite_index);

    await lumpsumPerformance.createMap();
    await lumpsumPerformance.validCreateSuccessfullMessage();
    await lumpsumPerformance.validateMapPresent([scheme]);
    await page.waitForLoadState()
})
test("create mapping with schema, index, additioal index and additioanl index 2", async () => {
    const scheme = "ICICI Prudential Savings Fund - Reg - Dly IDCW"
    const composite_index = "Composite index 1"

    await lumpsumPerformance.open();
    await page.waitForLoadState();
    await lumpsumPerformance.schemaSelection.searchScheme(scheme)
    await lumpsumPerformance.schemaSelection.selectScheme(scheme)

    await lumpsumPerformance.index.expandSectionCompositeIndex()
    await lumpsumPerformance.index.searchCompositeIndex(composite_index);
    await lumpsumPerformance.index.selectCompositeIndex(composite_index);

    await lumpsumPerformance.createMap();
    await lumpsumPerformance.validCreateSuccessfullMessage();
    await lumpsumPerformance.validateMapPresent([scheme]);
    await page.waitForLoadState()
})
test("create mapping with composite index and additional composite index", async () => {
    const scheme = "ICICI Prudential Savings Fund - Reg - Dly IDCW"
    const composite_index = "Composite index 1"

    await lumpsumPerformance.open();
    await page.waitForLoadState();
    await lumpsumPerformance.schemaSelection.searchScheme(scheme)
    await lumpsumPerformance.schemaSelection.selectScheme(scheme)

    await lumpsumPerformance.index.expandSectionCompositeIndex()
    await lumpsumPerformance.index.searchCompositeIndex(composite_index);
    await lumpsumPerformance.index.selectCompositeIndex(composite_index);

    await lumpsumPerformance.createMap();
    await lumpsumPerformance.validCreateSuccessfullMessage();
    await lumpsumPerformance.validateMapPresent([scheme]);
    await page.waitForLoadState()
})
test("create mapping with customize index and additional customize index", async() => {
    const scheme = "ICICI Prudential Savings Fund - Reg - Dly IDCW"
    const composite_index = "Composite index 1"

    await lumpsumPerformance.open();
    await page.waitForLoadState();
    await lumpsumPerformance.schemaSelection.searchScheme(scheme)
    await lumpsumPerformance.schemaSelection.selectScheme(scheme)

    await lumpsumPerformance.index.expandSectionCompositeIndex()
    await lumpsumPerformance.index.searchCompositeIndex(composite_index);
    await lumpsumPerformance.index.selectCompositeIndex(composite_index);

    await lumpsumPerformance.createMap();
    await lumpsumPerformance.validCreateSuccessfullMessage();
    await lumpsumPerformance.validateMapPresent([scheme]);
    await page.waitForLoadState()
})


// Negative
test("create mappping with index, customize index or composite index and same addition index", async () => {
    const scheme = "ICICI Prudential Savings Fund - Reg - Dly IDCW"
    const composite_index = "Composite index 1"

    await lumpsumPerformance.open();
    await page.waitForLoadState();
    await lumpsumPerformance.schemaSelection.searchScheme(scheme)
    await lumpsumPerformance.schemaSelection.selectScheme(scheme)

    await lumpsumPerformance.index.expandSectionCompositeIndex()
    await lumpsumPerformance.index.searchCompositeIndex(composite_index);
    await lumpsumPerformance.index.selectCompositeIndex(composite_index);

    await lumpsumPerformance.createMap();
    await lumpsumPerformance.validCreateSuccessfullMessage();
    await lumpsumPerformance.validateMapPresent([scheme]);
    await page.waitForLoadState()
})

// Negative
test("create mapping with additioanal index and additional index 2", async () => {
    const scheme = "ICICI Prudential Savings Fund - Reg - Dly IDCW"
    const composite_index = "Composite index 1"

    await lumpsumPerformance.open();
    await page.waitForLoadState();
    await lumpsumPerformance.schemaSelection.searchScheme(scheme)
    await lumpsumPerformance.schemaSelection.selectScheme(scheme)

    await lumpsumPerformance.index.expandSectionCompositeIndex()
    await lumpsumPerformance.index.searchCompositeIndex(composite_index);
    await lumpsumPerformance.index.selectCompositeIndex(composite_index);

    await lumpsumPerformance.createMap();
    await lumpsumPerformance.validCreateSuccessfullMessage();
    await lumpsumPerformance.validateMapPresent([scheme]);
    await page.waitForLoadState()
})
test("create mapping with schema and multiple indexs", async () => {
    const scheme = "ICICI Prudential Savings Fund - Reg - Dly IDCW"
    const composite_index = "Composite index 1"

    await lumpsumPerformance.open();
    await page.waitForLoadState();
    await lumpsumPerformance.schemaSelection.searchScheme(scheme)
    await lumpsumPerformance.schemaSelection.selectScheme(scheme)

    await lumpsumPerformance.index.expandSectionCompositeIndex()
    await lumpsumPerformance.index.searchCompositeIndex(composite_index);
    await lumpsumPerformance.index.selectCompositeIndex(composite_index);

    await lumpsumPerformance.createMap();
    await lumpsumPerformance.validCreateSuccessfullMessage();
    await lumpsumPerformance.validateMapPresent([scheme]);
    await page.waitForLoadState()
})

// Negative
test("create mapping with schema and combined index and composiete or customized", async () => {
    const scheme = "ICICI Prudential Savings Fund - Reg - Dly IDCW"
    const composite_index = "Composite index 1"

    await lumpsumPerformance.open();
    await page.waitForLoadState();
    await lumpsumPerformance.schemaSelection.searchScheme(scheme)
    await lumpsumPerformance.schemaSelection.selectScheme(scheme)

    await lumpsumPerformance.index.expandSectionCompositeIndex()
    await lumpsumPerformance.index.searchCompositeIndex(composite_index);
    await lumpsumPerformance.index.selectCompositeIndex(composite_index);

    await lumpsumPerformance.createMap();
    await lumpsumPerformance.validCreateSuccessfullMessage();
    await lumpsumPerformance.validateMapPresent([scheme]);
    await page.waitForLoadState()
})


// create mapping without invested value
// create mapping without return period
// create mapping with check last day or month
// create mapping with return type CAGR
// create mapping with return type Absolute
// create mapping with return type Simpel Annualised