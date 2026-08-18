import { expect, test } from "@playwright/test";

test("preview fixture article has canonical metadata and remains noindex", async ({ page }) => {
  test.skip(test.info().project.name === "no-javascript", "SEO markup is covered in browser-enabled projects");
  await page.goto("/preview-monthly-financial-reporting");
  await expect(page.locator('link[rel="canonical"]')).toHaveAttribute("href", /preview-monthly-financial-reporting/);
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);
  const schema = await page.locator('script[type="application/ld+json"]').allTextContents();
  expect(schema.some((value) => value.includes('"@type":"Article"'))).toBe(true);
  expect(schema.some((value) => value.includes('"@type":"BreadcrumbList"'))).toBe(true);
});

test("search and studio are excluded from indexing", async ({ page }) => {
  test.skip(test.info().project.name === "no-javascript", "SEO markup is covered in browser-enabled projects");
  await page.goto("/search?q=reporting");
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);
  await page.goto("/studio");
  await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", /noindex/);
});

test("preview mode blocks crawling until Sanity is configured", async ({ request }) => {
  const response = await request.get("/robots.txt");
  expect(response.status()).toBe(200);
  expect(await response.text()).toContain("Disallow: /");
});

test("feeds expose correct content types", async ({ request }) => {
  const rss = await request.get("/rss.xml");
  expect(rss.headers()["content-type"]).toContain("application/rss+xml");
  const llms = await request.get("/llms.txt");
  expect(llms.headers()["content-type"]).toContain("text/plain");
});
