import { expect, test } from '@playwright/test';
import { argosAriaSnapshot, argosScreenshot } from '@argos-ci/playwright';

test.describe('Argos visual POC', () => {
  test('homepage visual coverage', async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole('heading', { name: /Visual POC/i })).toBeVisible();

    await argosScreenshot(page, 'homepage', {
      ariaSnapshot: true,
      viewports: [
        { width: 1440, height: 1000 },
        { width: 390, height: 900 },
      ],
      argosCSS: `
        * { transition: none !important; animation: none !important; }
        [data-testid="clock"] { visibility: hidden !important; }
      `,
    });
  });

  test('plans component visual coverage', async ({ page }) => {
    await page.goto('/#plans');
    const plans = page.getByTestId('plans');

    await expect(plans).toBeVisible();
    await argosScreenshot(page, 'plans-component', {
      element: plans,
      fullPage: false,
      argosCSS: '* { transition: none !important; animation: none !important; }',
    });
  });

  test('homepage accessibility snapshot', async ({ page }) => {
    await page.goto('/');
    await argosAriaSnapshot(page, 'homepage-aria');
  });
});
