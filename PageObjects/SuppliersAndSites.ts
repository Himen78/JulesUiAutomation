import { Locator, Page, expect } from '@playwright/test';
import { generateSupplierName } from '../Utils/stringUtils';

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

    private supplierName: string = '';

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
    }

    async clickSuppliersAndSitesButton() {
        await this.supplierIcon.hover();
        await this.suppliersAndSitesButton.waitFor({ state: 'visible' });
        await this.suppliersAndSitesButton.click();
    }

    async assertSupplierUrl(): Promise<void> {
        await expect(this.page).toHaveURL(/supplier-board/);
    }

    async addaNewSupplier(legalEntityName: string, erpId: string, legalForm: string, identificationCode: string, locationIdentificationCode: string): Promise<void> {
        await this.addSupplierButton.click();
        await expect(this.addNewSupplierHeader).toBeVisible();
        this.supplierName = generateSupplierName();
        console.log('Supplier Name:', this.supplierName);
        await this.usualNameTextBox.fill(this.supplierName);
        await this.legalEntityNameTextBox.fill(legalEntityName);
        await this.erpIdTextBox.fill(erpId);
        await this.legalFormTextBox.fill(legalForm);
        await this.identificationCodeTextBox.fill(identificationCode);
        await this.locationIdentificationCodeTextBox.fill(locationIdentificationCode);
        await this.nextButton.click();
        await this.saveButton.click();
      }
}