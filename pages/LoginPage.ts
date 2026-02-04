import { Locator , Page } from "@playwright/test";

export class LoginPage {
    // Define locators for the LoginPage
    private readonly usernameInput: Locator;
    private readonly passwordInput: Locator;
    private readonly loginButton: Locator;
    private readonly errorMessage: Locator;
    private readonly errorButton: Locator;

    protected page: Page;

    constructor(page: Page) {
        // Initialize locators
        this.usernameInput = page.locator('[data-test="username"]');
        this.passwordInput = page.locator('[data-test="password"]');
        this.loginButton = page.locator('[data-test="login-button"]');
        this.errorMessage = page.locator('[data-test="error"]');
        this.errorButton = page.locator('[data-test="error-button"]');
        
        this.page = page;
    };

    // Create function for each element;
    // Combine authorization steps;
    async enterUsername(username: string): Promise<void> {
        await this.usernameInput.fill(username);
    };
    
    async enterPassword(password: string): Promise<void> {
        await this.passwordInput.fill(password);
    };
    
    async clickLogin(): Promise<void> {
        await this.loginButton.click();
    };

    async clickErrorButton(): Promise<void> {
        await this.errorButton.click();
    }

    async authorize(username: string, password: string): Promise<void> {
        await this.enterUsername(username);
        await this.enterPassword(password);
        await this.clickLogin();
    }

    async getErrorMsg(): Promise<string> {
        const errorText = await this.errorMessage.textContent();
        return errorText || '';
    }

    async isErrorDisplayed(): Promise<boolean> {
        const isVisibe = await this.errorMessage.isVisible();
        return isVisibe;
    }

    async isOnLoginPage(): Promise<boolean> {
        const currentURL = await this.page.url();
        const isOnPage = currentURL.includes("https://www.saucedemo.com");
        return isOnPage;
    }

}