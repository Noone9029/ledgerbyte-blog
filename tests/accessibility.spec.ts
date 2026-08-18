import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

for (const route of ["/", "/preview-monthly-financial-reporting", "/search"]) {
  test(`${route} has no serious accessibility violations`, async ({ page }) => {
    test.skip(test.info().project.name === "no-javascript", "Axe injection requires JavaScript");
    await page.addInitScript(() => localStorage.setItem("ledgerbyte-theme", "dark"));
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto(route);
    await page.waitForTimeout(50);
    const results = await new AxeBuilder({ page }).analyze();
    expect(results.violations.filter((violation) => ["serious", "critical"].includes(violation.impact || ""))).toEqual([]);
  });
}

test("skip link reaches main content", async ({ page }) => {
  test.skip(test.info().project.name === "no-javascript", "Keyboard interaction is covered by browser-enabled projects");
  await page.goto("/");
  await page.keyboard.press("Tab");
  await expect(page.getByRole("link", { name: "Skip to content" })).toBeFocused();
});
