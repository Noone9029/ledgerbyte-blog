import { expect, test } from "@playwright/test";

const launchSlugs = [
  "2026-sme-finance-outlook-credit-costs",
  "factoring-leasing-asset-based-finance-for-smes",
  "13-week-cash-flow-forecast-volatile-economy",
  "ai-finance-automation-controls",
  "iso-20022-cross-border-payments-for-smes",
  "stablecoins-vs-bank-transfers-business-payments",
  "cyber-enabled-payment-fraud-finance-controls",
  "issb-sustainability-disclosures-sme-readiness",
  "digital-non-bank-lending-sme-comparison",
  "currency-energy-price-volatility-sme-treasury",
  "e-invoicing-real-time-tax-reporting-smes",
  "mobile-first-payments-emerging-market-smes",
  "ai-agents-for-smes-value-risks-human-control",
  "mcp-a2a-open-standards-business-ai-agents",
  "ai-governance-framework-for-smes",
  "ai-cost-control-finops-models-tokens-business-value",
  "passkeys-for-smes-passwordless-migration",
  "ransomware-resilience-for-smes",
  "post-quantum-readiness-cryptography-inventory",
  "cloud-portability-data-ownership-eu-data-act",
] as const;

test("all twenty launch routes expose canonical article metadata", async ({
  request,
}) => {
  test.skip(
    test.info().project.name !== "desktop-1440",
    "One request-based launch inventory check is sufficient.",
  );

  for (const slug of launchSlugs) {
    const response = await request.get(`/${slug}`);
    expect(response.status(), slug).toBe(200);
    const html = await response.text();
    expect(html, slug).toContain(`/${slug}`);
    expect(html, slug).toContain('"@type":"Article"');
    expect(html, slug).toContain("Alina Khalid");
    expect(html, slug).toContain("noindex");
  }
});

test("preview sitemap and RSS deliberately exclude unpublished drafts", async ({
  request,
}) => {
  test.skip(
    test.info().project.name !== "desktop-1440",
    "One feed-boundary check is sufficient.",
  );

  const [sitemap, rss] = await Promise.all([
    request.get("/sitemap.xml"),
    request.get("/rss.xml"),
  ]);
  expect(sitemap.status()).toBe(200);
  expect(rss.status()).toBe(200);

  const sitemapText = await sitemap.text();
  const rssText = await rss.text();
  for (const slug of launchSlugs) {
    expect(sitemapText, slug).not.toContain(slug);
    expect(rssText, slug).not.toContain(slug);
  }
});
