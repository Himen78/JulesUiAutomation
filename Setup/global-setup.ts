import { chromium, FullConfig } from '@playwright/test';
import users from '../fixtures/users.json';
import { LoginPage } from '../PageObjects/LoginPage';

async function globalSetup(config: FullConfig) {
    const browser = await chromium.launch();
    const page = await browser.newPage();
    const loginPage = new LoginPage(page);

    await page.goto('https://demo.haroldwaste.com');
    await loginPage.login(users.email, users.password);
    await page.waitForURL(/purchases/);

    await page.context().storageState({ path: 'storageState.json' });
    await browser.close();
}

export default globalSetup;