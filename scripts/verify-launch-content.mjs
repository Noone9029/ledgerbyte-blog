import fs from "node:fs";
import path from "node:path";
import { launchArticles } from "../content/launch/index.mjs";
import { articleWordCount } from "../content/launch/content-model.mjs";

const errors = [];
const expect = (condition, message) => { if (!condition) errors.push(message); };
const slugs = new Set();
const reviewerIds = new Set(["person-haider-ali", "person-sayyam-nasir", "person-faisal-nawaz", "person-amir-ilyas", "person-muhammad-ahmad"]);

expect(launchArticles.length === 20, `Expected exactly 20 launch articles; found ${launchArticles.length}.`);
expect(launchArticles.filter((article) => article.category === "Finance").length === 12, "Expected 12 Finance articles.");
expect(launchArticles.filter((article) => article.category === "Technology").length === 8, "Expected 8 Technology articles.");

for (const [index, article] of launchArticles.entries()) {
  const label = `Article ${index + 1} (${article.slug || "missing slug"})`;
  expect(article.order === index + 1, `${label}: launch order must be ${index + 1}.`);
  expect(Boolean(article.slug) && !slugs.has(article.slug), `${label}: slug must be present and unique.`);
  slugs.add(article.slug);
  expect(article.authorId === "person-alina-khalid", `${label}: Alina Khalid must be the author.`);
  expect(reviewerIds.has(article.reviewerId), `${label}: reviewer is not in the verified launch roster.`);
  expect(article.editorialReview?.status === "pending", `${label}: source records must remain pending until genuine review.`);
  expect(!article.editorialReview?.reviewedAt, `${label}: pending source records cannot contain a review date.`);
  const words = articleWordCount(article);
  expect(words >= 1600 && words <= 2100, `${label}: ${words} words; expected 1600–2100.`);
  expect(article.sections.length >= 5 && article.sections.length <= 7, `${label}: expected 5–7 descriptive sections.`);
  expect(article.faqs.length === 3, `${label}: expected exactly 3 FAQs.`);
  expect(article.sources.length >= 3 && article.sources.length <= 6, `${label}: expected 3–6 primary sources.`);
  expect(article.sources.every((item) => item.url.startsWith("https://")), `${label}: every source must use HTTPS.`);
  expect(article.relatedQueries.length >= 3 && article.relatedQueries.length <= 5, `${label}: expected 3–5 related queries.`);
  expect(article.excerpt.length >= 80 && article.excerpt.length <= 220, `${label}: excerpt must be 80–220 characters.`);
  expect(article.seoTitle.length <= 60, `${label}: SEO title exceeds 60 characters.`);
  expect(article.seoDescription.length >= 100 && article.seoDescription.length <= 160, `${label}: SEO description must be 100–160 characters.`);
  expect(article.hero.alt.length >= 8 && article.hero.alt.length <= 180, `${label}: hero alt text is invalid.`);
  expect(Boolean(article.table?.caption) && article.table.headers.length >= 2 && article.table.rows.length >= 3, `${label}: a useful table or checklist is required.`);
  expect(article.serviceCta?.href?.startsWith("https://ledgerbyte.io/"), `${label}: CTA must point to LedgerByte.`);
  expect(article.noIndex === false, `${label}: launch articles cannot be noindex.`);
  expect(article.featured === (index === 0), `${label}: only article 1 may be featured.`);
  const heroPath = path.join(process.cwd(), "public", "art", "launch", `${article.slug}-hero.webp`);
  expect(fs.existsSync(heroPath), `${label}: missing hero artwork ${heroPath}.`);
  if (article.inlineDiagram) {
    const diagramPath = path.join(process.cwd(), "public", "art", "launch", `${article.slug}-diagram.svg`);
    expect(fs.existsSync(diagramPath), `${label}: missing inline diagram ${diagramPath}.`);
    const renderedDiagramPath = path.join(process.cwd(), "public", "art", "launch", `${article.slug}-diagram.webp`);
    expect(fs.existsSync(renderedDiagramPath), `${label}: missing rendered inline diagram ${renderedDiagramPath}.`);
  }
}

if (errors.length) {
  console.error(`Launch content verification failed with ${errors.length} error(s):`);
  errors.forEach((error) => console.error(`- ${error}`));
  process.exit(1);
}

console.log("Launch content verification passed: 20 original articles, 12/8 split, metadata, sources, review gates, and artwork are complete.");
