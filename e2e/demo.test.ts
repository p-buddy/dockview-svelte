import { expect, test } from '@playwright/test';

class TestRoutes {
	static root = "/tests/";
	static basic_prefix = TestRoutes.root + "basic";
}


test('home page has expected h1', async ({ page }) => {
	await page.goto('/');
	await expect(page.locator('h1')).toBeVisible();
});
