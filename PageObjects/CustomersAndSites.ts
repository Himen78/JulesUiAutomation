import { Locator, Page, expect } from '@playwright/test';
import { Logger } from '../Utils/logger';

export class CustomerAndSitesPage {

    private supplierIcon: Locator;
    private customersAndSitesButton: Locator;
    private addCustomerButton: Locator;
    private addNewCustomerHeader: Locator;
    private usualNameTextBox: Locator;
    private legalEntityNameTextBox: Locator;
    private erpIdTextBox: Locator;
    private legalFormTextBox: Locator;
    private identificationCodeTextBox: Locator;
    private locationIdentificationCodeTextBox: Locator;
    private nextButton: Locator;
    private saveButton: Locator;
    private searchByCompanyName: Locator;
    private companyTableRows: Locator;
    private companyNameColumn: Locator;
    private expandLegalFormValue: Locator;
    private expandLegalEntityNameValue: Locator;
    private expandIdentificationCodeValue: Locator;
    private expandLocationIdentificationCodeValue: Locator;
    private expandSectionContainer: Locator;

    constructor(private page: Page) {
        this.supplierIcon = this.page.locator('div[permission="SUPPLIERS,CUSTOMERS,CONTACTS"]');
        this.customersAndSitesButton = this.page.getByRole('link', { name: 'Customers & Sites' });
        this.addCustomerButton = this.page.getByRole('button', { name: 'Add a new customer' });
        this.addNewCustomerHeader = this.page.locator('//div[contains(text(),"Add a new customer")]');
        this.usualNameTextBox = this.page.locator('div[data-test-id="Company.companyName"] input');
        this.legalEntityNameTextBox = this.page.locator('div[data-test-id="Company.companyLegalName"] input');
        this.erpIdTextBox = this.page.locator('div[data-test-id="Company.erpId"] input');
        this.legalFormTextBox = this.page.locator('div[data-test-id="Company.legalForm"] input');
        this.identificationCodeTextBox = this.page.locator('div[data-test-id="Company.identificationCode"] input');
        this.locationIdentificationCodeTextBox = this.page.locator('div[data-test-id="Company.locationIdentificationCode"] input');
        this.nextButton = this.page.getByRole('button', { name: 'Next' });
        this.saveButton = this.page.getByRole('button', { name: 'Save' });
        this.searchByCompanyName = this.page.locator('input[placeholder="Search by company name"]');
        this.companyTableRows = this.page.locator('table tbody tr');
        this.companyNameColumn = this.page.locator('table tbody tr td:nth-child(3)');
        this.expandLegalFormValue = this.page.locator('//div[normalize-space()="Legal form"]/following-sibling::div/span');
        this.expandLegalEntityNameValue = this.page.locator('//div[normalize-space()="Legal entity name"]/following-sibling::div/span');
        this.expandIdentificationCodeValue = this.page.locator('//div[normalize-space()="Identification code"]/following-sibling::div/span');
        this.expandLocationIdentificationCodeValue = this.page.locator('//div[normalize-space()="Location identification code"]/following-sibling::div/span');
        this.expandSectionContainer = this.page.locator('div[class="sc-jdAMXn iRaWtY"]');
    }

    async clickCustomersAndSitesButton() {
        Logger.step('Hovering over Supplier icon');
        await this.supplierIcon.hover();
        Logger.step('Waiting for Customers & Sites button to appear');
        await this.customersAndSitesButton.waitFor({ state: 'visible' });
        Logger.step('Clicking Customers & Sites button');
        await this.customersAndSitesButton.click();
    }

    async assertCustomersUrl(): Promise<void> {
        Logger.step('Verifying if navigated to Customers URL');
        await expect(this.page).toHaveURL(/customer-board/);
        Logger.success('Successfully navigated to Customers page');
    }

    async addaNewCustomer(customerName: string, legalEntityName: string, erpId: string, legalForm: string, identificationCode: string, locationIdentificationCode: string): Promise<void> {
        Logger.step('Clicking Add a new customer button');
        await this.addCustomerButton.click();

        Logger.step('Waiting for Add New Customer header');
        await expect(this.addNewCustomerHeader).toBeVisible();

        Logger.step('Filling customer form');
        Logger.info(`Usual Name: ${customerName}`);
        await this.usualNameTextBox.fill(customerName);
        await this.legalEntityNameTextBox.fill(legalEntityName);
        await this.erpIdTextBox.fill(erpId);
        await this.legalFormTextBox.fill(legalForm);
        await this.identificationCodeTextBox.fill(identificationCode);
        await this.locationIdentificationCodeTextBox.fill(locationIdentificationCode);

        Logger.step('Clicking Next and Save buttons');
        await this.nextButton.click();
        await this.saveButton.click();

        Logger.success('Customer created successfully');
    }

    async searchComapnyNameAndVerifyDetails(customerName: string, legalEntityName: string, legalFormName: string, identificationCodeValue: string, locationIdentificationCodeValue: string): Promise<void> {
        Logger.step(`Searching for company: ${customerName}`);
        await this.searchByCompanyName.fill(customerName);

        const matchingCell = this.companyNameColumn.filter({ hasText: customerName });
        Logger.step('Waiting for matching cell in table');
        await expect(matchingCell).toBeVisible({ timeout: 5000 });

        Logger.step('Iterating over table rows to find the company');
        const rows = await this.companyTableRows;
        const rowsCount = await rows.count();
        let found = false;

        for (let i = 0; i < rowsCount; i++) {
            const text = (await rows.nth(i).locator('td').nth(2).textContent())?.trim();
            if (text === customerName) {
                Logger.info(`Company found at row ${i + 1}`);
                found = true;

                const seventhCell = rows.nth(i).locator('td').nth(7);
                Logger.step('Clicking on toogle button to expand details');
                await seventhCell.click();

                Logger.step('Waiting for expanded section');
                await this.expandSectionContainer.waitFor({ state: 'visible', timeout: 3000 });

                Logger.step('Verifying expanded values');
                await expect(this.expandLegalEntityNameValue).toHaveText(legalEntityName);
                await expect(this.expandLegalFormValue).toHaveText(legalFormName);
                await expect(this.expandIdentificationCodeValue).toHaveText(identificationCodeValue);
                await expect(this.expandLocationIdentificationCodeValue).toHaveText(locationIdentificationCodeValue);

                Logger.success('Verified all expanded details successfully');
                break;
            }
        }

        expect(found).toBe(true);
    }
}