import type { Metadata } from "next";
import { absoluteUrl, SITE_DESCRIPTION, SITE_NAME } from "@/lib/config";

type MetadataInput = {
  title: string;
  description?: string;
  path?: string;
  image?: string;
  noIndex?: boolean;
  type?: "website" | "article";
};

export function createMetadata({
  title,
  description = SITE_DESCRIPTION,
  path = "/",
  image = "/opengraph-image",
  noIndex = false,
  type = "website",
}: MetadataInput): Metadata {
  const pageTitle = title === SITE_NAME ? title : `${title} | ${SITE_NAME}`;
  const canonical = absoluteUrl(path);
  const imageUrl = image.startsWith("http") ? image : absoluteUrl(image);

  return {
    title: pageTitle,
    description,
    alternates: { canonical },
    robots: noIndex ? { index: false, follow: false } : undefined,
    openGraph: {
      type,
      title: pageTitle,
      description,
      url: canonical,
      siteName: SITE_NAME,
      images: [{ url: imageUrl, width: 1200, height: 630 }],
    },
    twitter: {
      card: "summary_large_image",
      title: pageTitle,
      description,
      images: [imageUrl],
    },
  };
}
