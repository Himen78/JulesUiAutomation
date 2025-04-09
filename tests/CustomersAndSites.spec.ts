import { test } from '@playwright/test';
import users from '../fixtures/UserCredentials.json';
import customers from '../fixtures/AddNewCustomer.json';
import { CustomerAndSitesPage } from '../PageObjects/CustomersAndSites';
import { generateUsualName } from '../Utils/stringUtils';
test.use({ storageState: 'storageState.json' });

test.describe('Customers & Sites Scenarios', () => {

  test.beforeEach(async ({ page }) => {
    await page.goto(users.julesLoginDetails.url);
  });

  test('Add a New Customers & Sites flow', async ({ page }) => {
    const customersAndSitesPage = new CustomerAndSitesPage(page);
    await customersAndSitesPage.clickCustomersAndSitesButton();
    await customersAndSitesPage.assertCustomersUrl();
    const companyName = generateUsualName();
    await customersAndSitesPage.addaNewCustomer(companyName,customers.addANewCustomer.legalEntityName, customers.addANewCustomer.erpId, customers.addANewCustomer.legalForm, customers.addANewCustomer.identificationCode, customers.addANewCustomer.locationIdentificationCode);
    await page.waitForTimeout(2000); // Wait for 2 seconds to observe the result
    await customersAndSitesPage.searchComapnyNameAndVerifyDetails(companyName,customers.addANewCustomer.legalEntityName,customers.addANewCustomer.legalForm, customers.addANewCustomer.identificationCode, customers.addANewCustomer.locationIdentificationCode);
  });
});