import { defineEnableDraftMode } from "next-sanity/draft-mode";
import { sanityPreviewClient } from "@/sanity/client";

const enableDraftMode = sanityPreviewClient
  ? defineEnableDraftMode({ client: sanityPreviewClient })
  : null;

export async function GET(request: Request) {
  if (!enableDraftMode) {
    return Response.json({ error: "Sanity is not configured." }, { status: 503 });
  }
  return enableDraftMode.GET(request);
}
