# JulesUiAutomation

# 🌐 Jules UI Automation

This project uses [Playwright](https://playwright.dev/) to automate UI testing for managing Customers & Suppliers within a web platform.

## 📦 Project Structure

├── tests/ │ └── customerAndSupplierFlow.spec.ts ├── PageObjects/ │ ├── CustomersAndSites.ts │ └── SuppliersAndSites.ts ├── fixtures/ │ ├── UserCredentials.json │ └── AddNewCustomer.json ├── Utils/ │ └── stringUtils.ts ├── logger/ │ └── logger.ts ├── storageState.json ├── playwright.config.ts └── README.md

---

## 🚀 Getting Started

### 1. Install dependencies

```bash
npm install
npx playwright test
npx playwright show-report

🧪 Features
✅ Add and validate Customers & Suppliers
🧠 Page Object Model (POM) structure
🔍 JSON-based test data
🎥 Video recording enabled for all tests
📋 HTML reporting with built-in Playwright reporter
📦 Centralized logging using logger.ts
