import { test, expect } from '@playwright/test';


test('Get Remotive.com QA Jobs', async ({ page }) => {
  await page.goto('https://remotive.com/remote-jobs/qa');
  const jobs = await page.locator(".job-tile").all();
  let current = 0;
  let max = 20;
  const regex = /(\p{Emoji}|\p{Extended_Pictographic})/gu;

  //let emojiBs: RegExp = /\p{RI}\p{RI}|\p{Emoji}(\p{EMod}|\u{FE0F}\u{20E3}?|[\u{E0020}-\u{E007E}]+\u{E007F})?(\u{200D}\p{Emoji}(\p{EMod}|\u{FE0F}\u{20E3}?|[\u{E0020}-\u{E007E}]+\u{E007F})?)*|./gus;
  const lstJobs: headers[] = [];
  for (const job in jobs) {
    const text = await jobs[job].innerText();
    const title = text.split("\n")[0];
    const location =  await jobs[job].locator(".left-tag").innerText();

    const locationText = await location.split("\n")[0].toString();
    //const sanitizedLocationName = locationText.replace(regex, '');

    await jobs[job].hover();
    const moreInfo = await jobs[job].locator("a").nth(3).getAttribute("href");
    const time = await jobs[job].locator(".tw-w-auto").innerText(); 

    lstJobs.push({title: title, location: locationText, date: time, moreInfo: moreInfo});

    current ++;
    if(current == max) break;
  }

  console.table(lstJobs);
});

interface headers {
  title: string;
  location: string;
  date: string;
  moreInfo: any;
}