import { test, expect } from '@playwright/test'
import { LoginPage } from '../pages/LoginPage';

test.describe('Authorization suite', () => {
    let loginPage: LoginPage;


test.beforeEach(async ({page}) => {
    loginPage = new LoginPage(page);
    await page.goto('https://www.saucedemo.com');
});


test('Success login', async () => {
    // call login page object (authorize function)
    await loginPage.authorize('standard_user', 'secret_sauce')
});


test('Unhappy path: unsuccessful authorization', async ({ page }) => {
    await loginPage.authorize('test', 'test');
    const errorMsg = await loginPage.getErrorMsg();
    expect(errorMsg).toContain('Epic sadface: Username and password do not match any user in this service');

    // isErrorDisplayed(); -> expect (...).toBeTruthy();
    const isErrorDisplayed = await loginPage.isErrorDisplayed();
    expect(isErrorDisplayed).toBeTruthy();
    // isOnLoginPage(); - > expect(...).toBeTruthy();
    const isOnLoginPage = await loginPage.isOnLoginPage();
    expect(isOnLoginPage).toBeTruthy();
});

// Invalid credentials: wrong username and correct password
test('Invalid credentials: wrong username and correct password', async ({ page }) => {
    await loginPage.authorize('standard', 'secret_sauce');
    const isErrorDisplayed = await loginPage.isErrorDisplayed();
    expect(isErrorDisplayed).toBeTruthy();
});

// Invalid credentials: wrong password and correct username
test('Invalid credentials: correct username and wrong password', async ({ page }) => {
    await loginPage.authorize('standard_user', 'secret');
    const errorMsg = await loginPage.getErrorMsg();
    expect(errorMsg).toContain('Epic sadface: Username and password do not match any user in this service');
});

// Invalid credentials: fields are empty
test('Invalid credentials: empty fields', async ({ page }) => {
    await loginPage.authorize('', '');
    const isErrorDisplayed = await loginPage.isErrorDisplayed();
    expect(isErrorDisplayed).toBeTruthy();
    const errorMsg = await loginPage.getErrorMsg();
    expect(errorMsg).toContain('Epic sadface: Username is required');
});

// Validate that user can close the error message
test('User can close the error message', async ({ page }) => {
    await loginPage.authorize('', '');
    const isErrorDisplayed = await loginPage.isErrorDisplayed();
    expect(isErrorDisplayed).toBeTruthy();
    const errorButton = await loginPage.clickErrorButton();
    expect(errorButton);
});

});