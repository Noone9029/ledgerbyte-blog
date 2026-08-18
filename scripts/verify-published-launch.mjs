import { createClient } from "@sanity/client";
import { launchArticles } from "../content/launch/index.mjs";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_API_READ_TOKEN;

if (!projectId || !token) {
  throw new Error(
    "Set NEXT_PUBLIC_SANITY_PROJECT_ID and SANITY_API_READ_TOKEN before verifying publication.",
  );
}

const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2026-08-01",
  useCdn: false,
  perspective: "raw",
});

const expectedIds = launchArticles.map((article) => `launch-${article.slug}`);
const counts = await client.fetch(
  `{
    "draftPosts": count(*[_type == "post" && _id in path("drafts.**")]),
    "publishedPosts": count(*[_type == "post" && !(_id in path("drafts.**"))]),
    "launchPosts": count(*[_id in $ids]),
    "pendingPublished": count(*[_id in $ids && editorialReview.status == "pending" && !defined(editorialReview.reviewedAt)]),
    "approvedPublished": count(*[_id in $ids && editorialReview.status == "approved"]),
    "finance": count(*[_id in $ids && category._ref == "category-finance"]),
    "technology": count(*[_id in $ids && category._ref == "category-technology"]),
    "indexable": count(*[_id in $ids && seo.noIndex != true]),
    "withReviewerReference": count(*[_id in $ids && defined(reviewer._ref)])
  }`,
  { ids: expectedIds },
);

const expected = {
  draftPosts: 0,
  publishedPosts: 20,
  launchPosts: 20,
  pendingPublished: 20,
  approvedPublished: 0,
  finance: 12,
  technology: 8,
  indexable: 20,
  withReviewerReference: 20,
};

for (const [key, value] of Object.entries(expected)) {
  if (counts[key] !== value) {
    throw new Error(`Published Sanity ${key} expected ${value}, received ${counts[key]}.`);
  }
}

console.log(
  "Published Sanity launch verified: 20 posts, 12/8 split, no remaining drafts, pending reviewer attribution hidden.",
);
