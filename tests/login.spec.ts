import { test } from '@playwright/test';
import { LoginPage } from '../PageObjects/LoginPage';
import users from '../fixtures/users.json';
test.use({ storageState: 'storageState.json' });

test.describe('Login Scenarios', () => {
  test('Valid login and logout flow', async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.goto();
    await loginPage.assertLoginSuccess();
    await loginPage.logout();
  });
});