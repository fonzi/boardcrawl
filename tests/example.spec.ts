import { test, expect } from '@playwright/test';
const { countryCodeEmoji, emojiCountryCode } = require('country-code-emoji');


test('Get Remotive.com QA Jobs', async ({ page }) => {
  const lstJobs = await getRemotiveJobs(page, 'https://remotive.com/remote-jobs/qa');
  console.log("=================REMOTIVE JOBS=================");
  console.table(lstJobs);
  console.log("================================================");
});


test('Get Remotive.com Devops Jobs', async ({ page }) => {
  const lstJobs = await getRemotiveJobs(page, 'https://remotive.com/remote-jobs/devops');
  console.log("=================REMOTIVE JOBS=================");
  console.table(lstJobs);
  console.log("================================================");
});

async function getRemotiveJobs(page: any, url: string) {
  await page.goto(url);
  const jobs = await page.locator(".job-tile").all();
  let current = 0;
  let max = 20;
  const lstJobs: headers[] = [];
  for (const job in jobs) {
    const text = await jobs[job].innerText();
    const title = text.split("\n")[0];
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

interface headers {
  title: string;
  location: string;
  date: string;
  moreInfo: any;
}