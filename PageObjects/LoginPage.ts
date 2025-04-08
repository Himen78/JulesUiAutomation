import { Locator, Page, expect } from '@playwright/test';

export class LoginPage {

    private emailInput: Locator;
    private passwordInput: Locator;
    private submitButton: Locator;
    private logoutButton: Locator;

    constructor(private page: Page) {
        this.emailInput = this.page.locator('input[name="email"]');
        this.passwordInput = this.page.locator('input[name="password"]');
        this.submitButton = this.page.locator('button[type="submit"]');
        this.logoutButton = this.page.locator('text=Logout');
    }

    async goto() {
        await this.page.goto('/');
    }

    async login(email: string, password: string) {
        await this.emailInput.fill(email);
        await this.passwordInput.fill(password);
        await this.submitButton.click();
    }

    async assertLoginSuccess(): Promise<void> {
        await expect(this.page).toHaveURL(/purchases/);
    }

    async logout(): Promise<void> {
        await this.page.click("//div[@data-test-id='header-menu']");
        await this.page.click("//li[@data-test-id='header-logout']");
        await expect(this.page).toHaveURL('/authentication');
    }
}