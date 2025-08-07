export class Login {
    usernameInput: string = "#TxtUserId";
    passwordInput: string = "#TxtPwd";
    loginButton: string = "#BtnSubmit";
    page: any;

    constructor(page: any) {
        this.page = page;
    }

    async login(username?:string, password?:string) {
        if (!username) {
            username = 'ahmad.hossain@icraanalytics.com';
        }
        if (!password) {
            password = 'IatP@941';
        }

        await this.page.goto('/Account/Login');
        await this.page.fill(this.usernameInput, username);
        await this.page.fill(this.passwordInput, password);  
        await this.page.click(this.loginButton);
        //await this.page.waitForLoadState('networkidle');
        await this.page.waitForSelector('a.user-profile:visible');
    }   
}