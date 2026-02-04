import { test, expect } from '@playwright/test'


test.describe('Authorization on saucedemo.com without POM', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('https://www.saucedemo.com/')
    });


test('Happy path: success authorization (with valid date)', async ({ page }) => {
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('secret_sauce');
    await page.locator('[data-test="login-button"]').click();

    // Assertions
    // await expect(page).toHaveURL('https://www.saucedemo.com/inventory.html');
    // regExp
    await expect(page).toHaveURL(/.*inventory.html/);

    await expect(page.locator('.title')).toHaveText('Products');
    await expect(page.locator('.inventory_container')).toBeVisible();
});


// Exercise I:
// Test: Authorize with incorrect password
// Assertions: 
// Verify that error message element is visible
// Verify that error message element contains exect text
// Verify that user is still on the same page
// Verify that login button is still present
test('Unhappy path: unsuccessful authorization', async ({ page }) => {
    await page.locator('[data-test="username"]').fill('standard_user');
    await page.locator('[data-test="password"]').fill('password123');
    await page.locator('[data-test="login-button"]').click();

    // Error message element is visible
    await expect(page.locator('[data-test="error"]')).toBeVisible();
    // Error message element contains text
    await expect(page.locator('[data-test="error"]')).toHaveText('Epic sadface: Username and password do not match any user in this service');
    // User is still on the same page
    await expect(page).toHaveURL("https://www.saucedemo.com/");
    // Login button still present
    await expect(page.locator('[data-test="login-button"]')).toBeVisible();
    // Login button is enabled (.toBeEnabled())
    await expect(page.locator('[data-test="login-button"]')).toBeEnabled();
    // Login button contains text = 'Login'
    await expect(page.locator('[data-test="login-button"]')).toContainText('Login');

});

test('Close error message and verify visibility of it', async ({ page }) => {
    await page.locator('[data-test="login-button"]').click();
    await expect(page.locator('[data-test="error"]')).toBeVisible();
    
    const errorButton = page.locator('[data-test="error-button"]');
    await expect(errorButton).toBeVisible();

    await errorButton.click();
    await expect(page.locator('[data-test="error"]')).not.toBeVisible();
});

test('Verify password field has type = password and placeholder', async ({ page }) => {
    const passwordInput = page.locator('[data-test="password"]');
    await expect(passwordInput).toHaveAttribute('placeholder', 'Password');
    await expect(passwordInput).toHaveAttribute('type', 'password');
});



});