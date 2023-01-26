import { test, expect } from '@playwright/test';

const fs = require('fs');

test('test', async ({ page }) => {
  await page.goto('https://www.scielo.br/j/rae/grid');
  await page.getByRole('row', { name: '2023 63 1' }).getByRole('link', { name: '1' }).click();
  await page.goto('https://www.scielo.br/j/rae/a/wgw9BWX9FKnY9YnHhX3YVsh/?lang=en');

  const result: Array<any> = []

  for (const content of await page.locator('.article-title').all()) {
    for (const ct of await content.allInnerTexts()) {
      result.push({ titulo: ct })
    }
  }

  for (const content of await page.locator('.articleSection').all()) {
    for (const ct of await content.allInnerTexts()) {
      result.push(ct)
    }
  }

  const data = JSON.stringify(result);

  fs.writeFile('test.json', data, err => {
    if (err) {
      console.error(err);
    }
  });
});