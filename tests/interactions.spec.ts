import { expect, test } from "@playwright/test";

test("theme preference persists", async ({ page }) => {
  test.skip(test.info().project.name === "no-javascript", "Requires JavaScript");
  await page.goto("/");
  const toggle = page.getByRole("button", { name: "Toggle color theme" });
  await toggle.click();
  const theme = await page.locator("html").getAttribute("data-theme");
  await page.reload();
  await expect(page.locator("html")).toHaveAttribute("data-theme", theme || "light");
});

test("mobile menu opens and closes", async ({ page }) => {
  test.skip(test.info().project.name !== "mobile", "Mobile project only");
  await page.goto("/");
  const button = page.getByRole("button", { name: "Open navigation" });
  await button.click();
  await expect(page.getByRole("navigation", { name: "Mobile navigation" })).toBeVisible();
  await page.getByRole("button", { name: "Close navigation" }).click();
  await expect(page.getByRole("navigation", { name: "Mobile navigation" })).not.toBeVisible();
});
