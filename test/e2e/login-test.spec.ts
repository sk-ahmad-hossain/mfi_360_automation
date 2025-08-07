import { test } from '@playwright/test';
import { Login } from '@pages/login-page';

test.skip('login test', async ({ page }, testInfo) => {
  const login = new Login(page, testInfo);
  await login.login();
});