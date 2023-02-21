import { test, expect } from '@playwright/test';
import WWR from '../pageObjects/wwr';

let wwr: WWR;

test.beforeEach(async ({ page }) => {
  wwr = new WWR(page);
});

test('Get We Work Remotely QA Jobs', async ({ page }) => {
  const lstJobs = await wwr.getRemotecoJobs('https://weworkremotely.com/remote-jobs/search?term=qa&button=');
  console.log("=================REMOTECO JOBS=================");
  console.table(lstJobs);
});