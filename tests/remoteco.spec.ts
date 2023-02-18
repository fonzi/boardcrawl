import { test, expect } from '@playwright/test';
import Remoteco from '../pageObjects/remoteco';

let remoteco: Remoteco;

test.beforeEach(async ({ page }) => {
  remoteco = new Remoteco(page);
});

test('Get Remotive.com QA Jobs', async ({ page }) => {
  const lstJobs = await remoteco.getRemotecoJobs('https://remote.co/remote-jobs/qa/');
  console.log("=================REMOTIVE JOBS=================");
  console.table(lstJobs);
});