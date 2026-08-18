import { createClient } from "next-sanity";
import { launchArticles } from "../content/launch/index.mjs";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_API_WRITE_TOKEN;
if (!projectId || !token) throw new Error("Set NEXT_PUBLIC_SANITY_PROJECT_ID and SANITY_API_WRITE_TOKEN.");
if (process.env.LAUNCH_PUBLISH_CONFIRMATION !== "APPROVED_20_ARTICLE_BATCH") {
  throw new Error("Refusing to publish. Set LAUNCH_PUBLISH_CONFIRMATION=APPROVED_20_ARTICLE_BATCH only after every named reviewer has approved in Studio.");
}

const client = createClient({ projectId, dataset, token, apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2026-08-01", useCdn: false });
const draftIds = launchArticles.map((article) => `drafts.launch-${article.slug}`);
const drafts = await client.fetch(`*[_id in $ids]{...,"reviewerId":reviewer._ref}`, { ids: draftIds });
const byId = new Map(drafts.map((document) => [document._id, document]));
const failures = [];

for (const article of launchArticles) {
  const draft = byId.get(`drafts.launch-${article.slug}`);
  if (!draft) failures.push(`${article.slug}: draft missing`);
  else {
    if (draft.reviewerId !== article.reviewerId) failures.push(`${article.slug}: named reviewer changed`);
    if (draft.editorialReview?.status !== "approved") failures.push(`${article.slug}: review status is not approved`);
    if (!draft.editorialReview?.reviewedAt) failures.push(`${article.slug}: approved review has no date`);
    if (draft.seo?.noIndex) failures.push(`${article.slug}: SEO noIndex must be false`);
  }
}

if (failures.length) {
  throw new Error(`Atomic launch blocked. Nothing was published:\n- ${failures.join("\n- ")}`);
}

const suppliedBase = process.env.LAUNCH_PUBLISHED_AT;
const now = new Date();
const defaultBase = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), 14, 0, 0));
const base = suppliedBase ? new Date(suppliedBase) : defaultBase;
if (Number.isNaN(base.valueOf())) throw new Error("LAUNCH_PUBLISHED_AT must be a valid ISO timestamp.");

let transaction = client.transaction();
for (const article of launchArticles) {
  const draftId = `drafts.launch-${article.slug}`;
  const draft = byId.get(draftId);
  const content = { ...draft };
  delete content._rev;
  delete content._createdAt;
  delete content._updatedAt;
  delete content.reviewerId;
  const publishedAt = new Date(base.valueOf() + (article.order - 1) * 1000).toISOString();
  transaction = transaction.createOrReplace({ ...content, _id: `launch-${article.slug}`, publishedAt });
  transaction = transaction.delete(draftId);
}

await transaction.commit({ visibility: "sync" });
console.log(`Published all 20 approved articles atomically, ordered one second apart from ${base.toISOString()}.`);
