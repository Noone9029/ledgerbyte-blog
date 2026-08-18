const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://blog.ledgerbyte.io").replace(/\/$/, "");
const key = process.env.NEXT_PUBLIC_INDEXNOW_KEY;
if (!key) throw new Error("Set NEXT_PUBLIC_INDEXNOW_KEY before submitting IndexNow URLs.");

const sitemap = await fetch(`${siteUrl}/sitemap.xml`);
if (!sitemap.ok) throw new Error(`Sitemap returned ${sitemap.status}.`);
const xml = await sitemap.text();
const urlList = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((match) => match[1]).filter((value) => new URL(value).hostname === new URL(siteUrl).hostname);
if (urlList.length === 0) throw new Error("No same-host URLs found in sitemap.");

const response = await fetch("https://api.indexnow.org/indexnow", {
  method: "POST",
  headers: { "Content-Type": "application/json; charset=utf-8" },
  body: JSON.stringify({ host: new URL(siteUrl).hostname, key, keyLocation: `${siteUrl}/indexnow-key.txt`, urlList }),
});
if (![200, 202].includes(response.status)) throw new Error(`IndexNow returned ${response.status}: ${await response.text()}`);
console.log(`IndexNow accepted ${urlList.length} URLs with HTTP ${response.status}.`);
