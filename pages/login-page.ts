export class Login {
    usernameInput: any;
    passwordInput: any;
    loginButton: any;
    page: any;

    constructor(page: any) {
        this.page = page;
        this.usernameInput = '#TxtUserId';
        this.passwordInput = '#TxtPwd';
        this.loginButton = '#BtnSubmit';
    }

    async login(username?:string, password?:string) {
        if (!username) {
            username = 'ahmad.hossain@icraanalytics.com';
        }
        if (!password) {
            password = 'IatP@941';
        }

        await this.page.goto('https://mfi360web-it2.icraanalytics.co.in:8443/Account/Login');
        await this.page.fill(this.usernameInput, username);
        await this.page.fill(this.passwordInput, password);  
        await this.page.click(this.loginButton);
        //await this.page.waitForLoadState('networkidle');
        await this.page.waitForSelector('a.user-profile:visible');
    }   
}