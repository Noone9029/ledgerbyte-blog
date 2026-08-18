import { createClient } from "next-sanity";
import {
  HAS_SANITY,
  SANITY_API_VERSION,
  SANITY_DATASET,
  SANITY_PROJECT_ID,
} from "@/lib/config";

export const sanityClient = HAS_SANITY
  ? createClient({
      projectId: SANITY_PROJECT_ID,
      dataset: SANITY_DATASET,
      apiVersion: SANITY_API_VERSION,
      useCdn: false,
      perspective: "published",
      token: process.env.SANITY_API_READ_TOKEN,
      stega: { enabled: false },
    })
  : null;

export const sanityPreviewClient = HAS_SANITY
  ? createClient({
      projectId: SANITY_PROJECT_ID,
      dataset: SANITY_DATASET,
      apiVersion: SANITY_API_VERSION,
      useCdn: false,
      perspective: "drafts",
      token: process.env.SANITY_API_READ_TOKEN,
      stega: { enabled: true, studioUrl: "/studio" },
    })
  : null;
