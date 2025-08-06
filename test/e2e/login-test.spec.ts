import { test, expect } from '@playwright/test';
import { Login } from '../../pages/login-page';

test.skip('login test', async ({ page }) => {
  const login = new Login(page);
  await login.login();
  // wait for the page to load

  //validate home page
  //await expect(page).toHaveURL(/.*home/);
});
