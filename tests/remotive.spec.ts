import { test, expect } from '@playwright/test';
import Remotive from '../pageObjects/remotive';

let remotive: Remotive;

test.beforeEach(async ({ page }) => {
  remotive = new Remotive(page);
});

test('Get Remotive.com QA Jobs', async ({ page }) => {
  const lstJobs = await remotive.getRemotiveJobs('https://remotive.com/remote-jobs/qa');
  console.log("=================REMOTIVE JOBS=================");
  console.table(lstJobs);
});

test('Get Remotive.com Devops Jobs', async ({ page }) => {
  const lstJobs = await remotive.getRemotiveJobs('https://remotive.com/remote-jobs/devops');
  console.log("=================REMOTIVE JOBS=================");
  console.table(lstJobs);
});

test('Get Remotive.com Software Dev Jobs', async ({ page }) => {
  const lstJobs = await remotive.getRemotiveJobs('https://remotive.com/remote-jobs/software-dev');
  console.log("=================REMOTIVE JOBS=================");
  console.table(lstJobs);
});

