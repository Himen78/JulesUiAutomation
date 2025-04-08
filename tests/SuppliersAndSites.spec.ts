import { test } from '@playwright/test';
import { LoginPage } from '../PageObjects/LoginPage';
import users from '../fixtures/UserCredentials.json';
import supplier from '../fixtures/AddNewSuppiers.json';
import { SuppliersAndSitesPage } from '../PageObjects/SuppliersAndSites';
test.use({ storageState: 'storageState.json' });

test.describe('Suppliers & Sites Scenarios', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto(users.julesLoginDetails.url);
  });

  test('Add a New Suppliers & Sites flow', async ({ page }) => {
    const suppliersAndSitesPage = new SuppliersAndSitesPage(page);
    await suppliersAndSitesPage.clickSuppliersAndSitesButton();
    await suppliersAndSitesPage.assertSupplierUrl();
    await suppliersAndSitesPage.addaNewSupplier(supplier.addANewSuppliers.legalEntityName, supplier.addANewSuppliers.erpId, supplier.addANewSuppliers.legalForm, supplier.addANewSuppliers.identificationCode, supplier.addANewSuppliers.locationIdentificationCode);
    await page.waitForTimeout(2000); // Wait for 2 seconds to observe the result
  });
});