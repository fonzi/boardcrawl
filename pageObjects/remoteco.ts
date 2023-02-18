import { expect, test, Locator, type Page } from '@playwright/test'

export default class Remoteco {

    readonly noGutterSelector = ".card.m-0.border-left-0.border-right-0.border-top-0.border-bottom";

    constructor(private page: Page) {
        this.page = page;
    }

    // todo: convert to JSON and return to table 
    public async getRemotecoJobs(url: string) {
        await this.page.goto(url);
        const noGutterRows = await this.page.locator(this.noGutterSelector).all();
        const lstJobs: headers[] = [];
        for(const row in noGutterRows) {
            const badge = await noGutterRows[row].locator(".badge.badge-success").nth(0).innerText();
            const title = await noGutterRows[row].locator(".font-weight-bold.larger").innerText();
            const date = await noGutterRows[row].locator("date").innerText();
            const company = await (await noGutterRows[row].locator(".m-0.text-secondary").innerText()).split('|')[0].split(" ")[0];
            const moreInfo = await noGutterRows[row].getAttribute("href");
            lstJobs.push({ title: title, company: company, date: date, moreInfo: "https://remote.co"+ moreInfo });
        }
        return lstJobs;
    }
}

interface headers {
    title: string;
    company: string;
    date: string;
    moreInfo: any;
}

//   title: string;
//   location: string;
//   date: string;
//   moreInfo: any;