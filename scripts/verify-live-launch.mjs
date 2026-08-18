import { launchArticles } from "../content/launch/index.mjs";

const origin = (process.env.LAUNCH_SITE_URL || "https://blog.ledgerbyte.io").replace(/\/$/, "");

async function get(path) {
  const response = await fetch(`${origin}${path}`, { redirect: "manual" });
  return { response, text: await response.text() };
}

const homepage = await get("/");
if (homepage.response.status !== 200) throw new Error(`Homepage returned ${homepage.response.status}.`);
if (/<meta name="robots" content="noindex/i.test(homepage.text)) {
  throw new Error("Homepage remains noindex after launch.");
}

for (const article of launchArticles) {
  const path = `/${article.slug}`;
  const { response, text } = await get(path);
  if (response.status !== 200) throw new Error(`${path} returned ${response.status}.`);
  if (!text.includes(`<link rel="canonical" href="${origin}${path}"`)) {
    throw new Error(`${path} has an incorrect canonical URL.`);
  }
  if (!text.includes('"@type":"Article"')) throw new Error(`${path} lacks Article JSON-LD.`);
  if (!text.includes("Alina Khalid")) throw new Error(`${path} lacks the visible author.`);
  if (text.includes("Reviewed by") || text.includes('"reviewedBy"')) {
    throw new Error(`${path} exposes unapproved reviewer attribution.`);
  }
  if (/<meta name="robots" content="noindex/i.test(text)) {
    throw new Error(`${path} remains noindex after launch.`);
  }
}

const [sitemap, rss, robots, studio, search] = await Promise.all([
  get("/sitemap.xml"),
  get("/rss.xml"),
  get("/robots.txt"),
  get("/studio"),
  get("/search"),
]);

for (const article of launchArticles) {
  if (!sitemap.text.includes(`/${article.slug}`)) throw new Error(`Sitemap lacks ${article.slug}.`);
  if (!rss.text.includes(`/${article.slug}`)) throw new Error(`RSS lacks ${article.slug}.`);
}
if (robots.text.includes("Disallow: /\n") || !robots.text.includes("Sitemap:")) {
  throw new Error("robots.txt has not opened for launch.");
}
if (!/<meta name="robots" content="noindex/i.test(studio.text)) throw new Error("Studio is not noindex.");
if (!/<meta name="robots" content="noindex/i.test(search.text)) throw new Error("Search is not noindex.");

console.log(
  `Live launch verified at ${origin}: 20 article URLs, canonicals, Article JSON-LD, author visibility, hidden pending reviews, sitemap, RSS, robots, and noindex boundaries pass.`,
);
