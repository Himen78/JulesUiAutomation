import { Locator, Page, expect } from '@playwright/test';
import { Logger } from '../Utils/logger';

export class SuppliersAndSitesPage {

    private supplierIcon: Locator;
    private suppliersAndSitesButton: Locator;
    private addSupplierButton: Locator;
    private addNewSupplierHeader: Locator;
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
        this.suppliersAndSitesButton = this.page.getByRole('link', { name: 'Suppliers & Sites' });
        this.addSupplierButton = this.page.getByRole('button', { name: 'Add a new supplier' });
        this.addNewSupplierHeader = this.page.locator('//div[contains(text(),"Add a new supplier")]');
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

    async clickSuppliersAndSitesButton() {
        Logger.step('Hovering over Supplier icon');
        await this.supplierIcon.hover();
        Logger.step('Waiting for Suppliers & Sites button to appear');
        await this.suppliersAndSitesButton.waitFor({ state: 'visible' });
        Logger.step('Clicking Suppliers & Sites button');
        await this.suppliersAndSitesButton.click();
    }

    async assertSupplierUrl(): Promise<void> {
        Logger.step('Verifying Supplier URL contains "supplier-board"');
        await expect(this.page).toHaveURL(/supplier-board/);
        Logger.success('Successfully navigated to Supplier page');
    }

    async addaNewSupplier(supplierName: string, legalEntityName: string, erpId: string, legalForm: string, identificationCode: string, locationIdentificationCode: string): Promise<void> {
        Logger.step('Clicking Add a new supplier button');
        await this.addSupplierButton.click();

        Logger.step('Waiting for Add New Supplier header');
        await expect(this.addNewSupplierHeader).toBeVisible();

        Logger.step('Filling in supplier details');
        Logger.info(`Usual Name: ${supplierName}`);
        await this.usualNameTextBox.fill(supplierName);
        await this.legalEntityNameTextBox.fill(legalEntityName);
        await this.erpIdTextBox.fill(erpId);
        await this.legalFormTextBox.fill(legalForm);
        await this.identificationCodeTextBox.fill(identificationCode);
        await this.locationIdentificationCodeTextBox.fill(locationIdentificationCode);

        Logger.step('Clicking Next and Save buttons');
        await this.nextButton.click();
        await this.saveButton.click();

        Logger.success('Supplier created successfully');
    }

    async searchComapnyNameAndVerifyDetails(supplierName: string, legalEntityName: string, legalFormName: string, identificationCodeValue: string, locationIdentificationCodeValue: string): Promise<void> {
        Logger.step(`Searching for company: ${supplierName}`);
        await this.searchByCompanyName.fill(supplierName);

        const matchingCell = this.companyNameColumn.filter({ hasText: supplierName });
        Logger.step('Waiting for matching table cell');
        await expect(matchingCell).toBeVisible({ timeout: 5000 });

        Logger.step('Iterating through table rows to find the supplier');
        const rows = await this.companyTableRows;
        const rowsCount = await rows.count();
        let found = false;

        for (let i = 0; i < rowsCount; i++) {
            const text = (await rows.nth(i).locator('td').nth(2).textContent())?.trim();
            if (text === supplierName) {
                Logger.info(`Supplier found at row ${i + 1}`);
                found = true;

                const seventhCell = rows.nth(i).locator('td').nth(7);
                Logger.step('Clicking on toogle button to expand details');
                await seventhCell.click();

                Logger.step('Waiting for expanded section to be visible');
                await this.expandSectionContainer.waitFor({ state: 'visible', timeout: 3000 });

                Logger.step('Verifying expanded details');
                await expect(this.expandLegalEntityNameValue).toHaveText(legalEntityName);
                await expect(this.expandLegalFormValue).toHaveText(legalFormName);
                await expect(this.expandIdentificationCodeValue).toHaveText(identificationCodeValue);
                await expect(this.expandLocationIdentificationCodeValue).toHaveText(locationIdentificationCodeValue);

                Logger.success('Verified supplier details successfully');
                break;
            }
        }

        expect(found).toBe(true);
    }
}