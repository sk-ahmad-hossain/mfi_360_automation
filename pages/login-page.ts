import { TestInfo } from "playwright/test";

export class Login {
    usernameInput: string = "#TxtUserId";
    passwordInput: string = "#TxtPwd";
    loginButton: string = "#BtnSubmit";
    page: any;
    testInfo: TestInfo;

    constructor(page: any, testInfo: TestInfo) {
        this.page = page;
        this.testInfo = testInfo;
    }

    async login(username?:string, password?:string) {
        if (!username) {
            username = this.testInfo.project.metadata.username;
        }
        if (!password) {
            password = this.testInfo.project.metadata.password;
        }

        await this.page.goto('/Account/Login');
        await this.page.fill(this.usernameInput, username);
        await this.page.fill(this.passwordInput, password);  
        await this.page.click(this.loginButton);
        //await this.page.waitForLoadState('networkidle');
        await this.page.waitForSelector('a.user-profile:visible');
    }   
}