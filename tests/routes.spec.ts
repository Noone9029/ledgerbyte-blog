import { expect, test } from "@playwright/test";

const routes = [
  "/",
  "/category/finance",
  "/category/technology",
  "/topic/automation",
  "/author/alina-khalid",
  "/search?q=automation",
  "/preview-monthly-financial-reporting",
  "/rss.xml",
  "/robots.txt",
  "/sitemap.xml",
  "/llms.txt",
];

for (const route of routes) {
  test(`${route} responds without server errors`, async ({ page }) => {
    test.skip(test.info().project.name === "no-javascript", "Dedicated no-JS reading test covers this project");
    const response = await page.goto(route);
    expect(response?.status()).toBeLessThan(500);
  });
}

test("navigation exposes both editorial pillars", async ({ page }) => {
  test.skip(test.info().project.name === "no-javascript", "Dedicated no-JS reading test covers this project");
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1 })).toContainText("Clear thinking");
  await expect(page.getByRole("link", { name: "Finance", exact: true }).first()).toBeVisible();
  await expect(page.getByRole("link", { name: "Technology", exact: true }).first()).toBeVisible();
});

test("article remains readable without JavaScript", async ({ page }) => {
  test.skip(test.info().project.name !== "no-javascript", "No-JS project only");
  await page.goto("/preview-monthly-financial-reporting");
  await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  await expect(page.locator(".article-content")).toContainText("publishing");
});
