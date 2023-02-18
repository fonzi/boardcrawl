import { expect, test, Locator, type Page } from '@playwright/test'

export default class Remoteco {

    readonly noGutterSelector = ".row.no-gutters";

    constructor(private page: Page) {
        this.page = page;
    }

    // todo: convert to JSON and return to table 
    public async getRemotecoJobs(url: string) {
        await this.page.goto(url);
        const noGutterRows = await this.page.locator(this.noGutterSelector).all();
        
        for(const row in noGutterRows) {
            const text = await noGutterRows[row].innerText();
            console.log(text);
        }
    }
}