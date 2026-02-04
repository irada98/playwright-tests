import { test, expect } from '@playwright/test'
import fs from 'fs'

test.describe('Playwright Locators', () => {
    test.beforeEach(async ({ page }) => {
        await page.goto('http://localhost:8080')
    });

/* Search by ROLE */
test('Role locators', async ({ page }) => {
    // Buttons
    await page.getByRole('button', {name: 'Primary Button'}).click();
    await page.getByRole('button', {name: 'Save'}).click();

    // Search for links
    await expect(page.getByRole('link', {name: 'Playwright Documentation'})).toBeVisible();

    // Search heading
    await expect(page.getByRole('heading', {name: '1. Buttons'})).toBeVisible();

    // Search for form element or Fill all forms
    await page.getByRole('textbox', {name: "Username:"}).fill('Irada');
    await page.getByRole('textbox', {name: "Email:"}).fill('irada98@gmail.com');
    await page.getByRole('textbox', {name: "Password:"}).fill('Password1234');
    await page.getByRole('spinbutton', {name: "Number"}).press('ArrowUp'); // ArrowDown

    // Click() -> fill()
    await page.getByRole('spinbutton', {name: "Number"}).click();
    await page.getByRole('spinbutton', {name: "Number"}).fill('79');

    // Checkbox
    await page.getByRole('checkbox', {name: 'Option 1'}).check();
    await expect(page.getByRole('checkbox', {name: 'Option 1'})).toBeChecked(); // didn't work

    // Radio
    await page.getByRole('radio', {name: 'Choice 1'}).check();

    // Dropdown
    await page.getByRole('combobox', {name: 'Select country:'}).selectOption('canada');
});

test('Label locators', async ({ page }) => {
    await page.getByLabel('Username:').fill('Vincent');
    await page.getByLabel('Email:').fill('vincent7@gmail.com')

    // Verify value
    await expect(page.getByLabel('Username:')).toHaveValue('Vincent');
    await expect(page.getByLabel('Email:')).toHaveValue('vincent7@gmail.com');
});

test('Placeholder locators', async ({page}) => {
    await page.getByPlaceholder('Enter username').fill('Sephiroth');
    await page.getByPlaceholder('Enter password').fill('Jenova2025');
});

test('Search locators/elements by text content', async ({page}) => {
    await page.getByText('Primary Button').click();
    await page.getByText('Playwright Documentation').click();
});

test('List locators', async ({page}) => {
    const listItems = page.locator('#unordered-list li')    // in CSS id starts with #
    await expect(listItems).toHaveCount(4);

    await expect(listItems.nth(0)).toHaveText('First element');

    const count = await listItems.count();
    for(let x = 0; x < count; x++) {
        const text = await listItems.nth(x).textContent();
        console.log(`Item ${x}: ${text}`);
    };
});

test('Dropdown and Select', async ({page}) => {
    const countrySelect = page.getByLabel('Select country:')
    await countrySelect.selectOption('usa');
    await expect(countrySelect).toHaveValue('usa');
    
    // selectOption({index: 2})

    await page.getByRole('button', {name: "Select action"}).click();
    await page.locator('[data-action="edit"]').click();
});

test('Modal window locators', async ({page}) => {
    await page.getByRole('button', {name: 'Open modal window'}).click();
    await page.locator('.close').click();

});

test('Drag and drop', async ({page}) => {
    const dragItem = page.locator('#item1');    // # is ID
    const dragTarget = page.locator('#drag-target');
    await expect(dragItem).toBeVisible();
    await dragItem.dragTo(dragTarget);
    await expect(dragTarget.locator('#item1')).toBeVisible(); 
})

test('File upload', async({page}) => {
    const fileInput = page.locator('#file-input');
    await fileInput.setInputFiles({
        name: 'upload1.txt',
        mimeType: 'text/plain',
        buffer: fs.readFileSync('test.txt')
    });

    await fileInput.setInputFiles([
        {
            name: 'test.txt',
            mimeType: 'text/plain',
            buffer: Buffer.from('File 1')
        },
        {
            name: 'test1.txt',
            mimeType: 'text/plain',
            buffer: Buffer.from('File 2')
        }
    ]);
});

test('Data picker', async({page}) => {
    const datePicker = page.getByTestId('date-picker');
    await datePicker.fill('2025-12-10');
    //await expect(datePicker).toHaveValue('2025-12-10');

    const currentDatePickerValue = await datePicker.inputValue();
    expect(currentDatePickerValue).toBe('2025-12-10');
});

// Progress bar
// Find element, verify the element toHaveAttribute('value', '70')
// Verify attribute max is equalto 100
// Create variable currentValue | Create variable maxValue
// expect(currentValue).toBe('70')
// expect(maxValue).toBe('100')
test('Progress bar', async ({page}) => {
    const progressBar = page.locator('#progress');
    await expect(progressBar).toBeVisible();
    await expect(progressBar).toHaveAttribute('value', '70');
    await expect(progressBar).toHaveAttribute('max', '100');

    const currentValue = 70;
    const maxValue = 100;
    expect(currentValue).toBe(70);
    expect(maxValue).toBe(100);
})

})