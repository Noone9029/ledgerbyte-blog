export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"
).replace(/\/$/, "");

export const MAIN_SITE_URL = "https://ledgerbyte.io";
export const SITE_NAME = "LedgerByte Insights";
export const SITE_DESCRIPTION =
  "Practical finance and technology insight for growing businesses.";

export const SANITY_PROJECT_ID =
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "";
export const SANITY_DATASET =
  process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
export const SANITY_API_VERSION =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2026-08-01";
// The production dataset is private, so public routes must not switch away from
// the review fixtures until a server-only viewer token is present.
export const HAS_SANITY = Boolean(
  SANITY_PROJECT_ID && process.env.SANITY_API_READ_TOKEN,
);
export const IS_INDEXING_ENABLED =
  process.env.NEXT_PUBLIC_LAUNCH_INDEXING_ENABLED === "true";

export const isProductionDomain = SITE_URL === "https://blog.ledgerbyte.io";

export function absoluteUrl(path = "/") {
  return new URL(path, `${SITE_URL}/`).toString();
}
