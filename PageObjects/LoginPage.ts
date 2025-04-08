import { Locator, Page, expect } from '@playwright/test';

export class LoginPage {

    private emailInput: Locator;
    private passwordInput: Locator;
    private submitButton: Locator;
    private headerMenu: Locator;
    private logoutButton: Locator;

    constructor(private page: Page) {
        this.emailInput = this.page.locator('input[name="email"]');
        this.passwordInput = this.page.locator('input[name="password"]');
        this.submitButton = this.page.locator('button[type="submit"]');
        this.headerMenu = this.page.locator("div[data-test-id='header-menu']");
        this.logoutButton = this.page.locator('li[data-test-id="header-logout"]');
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
        await this.headerMenu.click();
        await this.logoutButton.click();
        await expect(this.page).toHaveURL('/authentication');
    }
}