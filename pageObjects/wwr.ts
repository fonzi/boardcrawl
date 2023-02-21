import { expect, test, Locator, type Page } from '@playwright/test'

export default class WWR {

    constructor(private page: Page) {
        this.page = page;
    }

    public async getRemotecoJobs(url: string) {
        await this.page.goto(url);
        const jobs = await this.page.locator(".company").locator("..").all();
        let current = 0;
        let max = 20;
        const lstJobs: headers[] = [];
        for(const job in jobs)
        {
            const title = await jobs[job].locator(".title").innerText();
            const location = await jobs[job].locator(".region.company").innerText();
            const moreInfo = await jobs[job].locator("..").locator("a").nth(1).getAttribute("href");
            const time = await jobs[job].locator(".date").innerText();
            lstJobs.push({ title: title, location: location, date: time, moreInfo: "https://weworkremotely.com/"+moreInfo });
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