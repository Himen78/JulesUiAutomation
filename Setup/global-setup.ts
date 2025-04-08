import { chromium, FullConfig } from '@playwright/test';
import users from '../fixtures/UserCredentials.json';
import { LoginPage } from '../PageObjects/LoginPage';

async function globalSetup(config: FullConfig) {
    const browser = await chromium.launch({headless:false});
    const page = await browser.newPage();
    const loginPage = new LoginPage(page);

    await page.goto('https://demo.haroldwaste.com');
    await loginPage.login(users.julesLoginDetails.email, users.julesLoginDetails.password);
    await loginPage.assertLoginSuccess();

    await page.context().storageState({ path: 'storageState.json' });
    await browser.close();
}

export default globalSetup;