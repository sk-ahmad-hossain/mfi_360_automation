import { test } from '@playwright/test';
import { Login } from '@pages/login-page';

test.skip('login test', async ({ page }, testInfo) => {
  console.log(testInfo.project.metadata);
  
  const login = new Login(page, testInfo);
  await login.login();
  // wait for the page to load

  //validate home page
  //await expect(page).toHaveURL(/.*home/);
});
