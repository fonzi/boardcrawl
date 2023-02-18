import { expect, test, Locator, type Page } from '@playwright/test'
const { countryCodeEmoji, emojiCountryCode } = require('country-code-emoji');


export default class Remotive {

    constructor(private page: Page) {
        this.page = page;
    }

    public async getRemotiveJobs(url: string) {
        await this.page.goto(url);
        const jobs = await this.page.locator(".job-tile").all();
        let current = 0;
        let max = 20;
        const lstJobs: headers[] = [];
        for (const job in jobs) {
            const text = await jobs[job].innerText();
            const title = text.split("\n")[0].substring(0, 30);
            const location = await jobs[job].locator(".left-tag").innerText();
            let locationText: any;
            try {
                locationText = emojiCountryCode(location.split("\n")[0]);
            } catch (e) {
                locationText = location.split("\n")[0].toString();
            }
            await jobs[job].hover();
            const moreInfo = await jobs[job].locator("a").nth(3).getAttribute("href");
            const time = await jobs[job].locator(".tw-w-auto").innerText();
            lstJobs.push({ title: title, location: locationText, date: time, moreInfo: moreInfo });
            current++;
            if (current == max) break;
        }
        return lstJobs;
    }
}

interface headers {
    title: string;
    location: string;
    date: string;
    moreInfo: any;
  }