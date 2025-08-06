class MenuComponent {
    page: any;
    menuButton = 'a#menu_toggle';
    menuItems = '.menu-items';

    constructor(page) {
        this.page = page;
    }

    async openMenu() {
        await this.page.click(this.menuButton);
    }

    async selectMenuItem(itemText:string) {
        await this.page.click(`${this.menuItems} >> text=${itemText}`);
    }

    async openAdvanceReturnAnalysis() {
        await this.openMenu();
        await this.selectMenuItem('Advance Return Analysis');
    }

    async openReturnAnalysis() {
        await this.openMenu();
        await this.selectMenuItem('Return Analysis');
    }  
}