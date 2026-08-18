import { createClient } from "@sanity/client";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_API_READ_TOKEN;

if (!projectId || !token) {
  throw new Error(
    "Set NEXT_PUBLIC_SANITY_PROJECT_ID and SANITY_API_READ_TOKEN before verifying Sanity.",
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

const counts = await client.fetch(`{
  "draftPosts": count(*[_type == "post" && _id in path("drafts.**")]),
  "publishedPosts": count(*[_type == "post" && !(_id in path("drafts.**"))]),
  "pending": count(*[_type == "post" && _id in path("drafts.**") && editorialReview.status == "pending"]),
  "approved": count(*[_type == "post" && _id in path("drafts.**") && editorialReview.status == "approved"]),
  "finance": count(*[_type == "post" && _id in path("drafts.**") && category._ref == "category-finance"]),
  "technology": count(*[_type == "post" && _id in path("drafts.**") && category._ref == "category-technology"])
}`);

const expected = {
  draftPosts: 20,
  publishedPosts: 0,
  pending: 20,
  approved: 0,
  finance: 12,
  technology: 8,
};

for (const [key, value] of Object.entries(expected)) {
  if (counts[key] !== value) {
    throw new Error(`Sanity ${key} expected ${value}, received ${counts[key]}.`);
  }
}

console.log(
  `Sanity launch verified: ${counts.draftPosts} drafts (${counts.finance} Finance, ${counts.technology} Technology), all pending, none published.`,
);
