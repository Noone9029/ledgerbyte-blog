import imageUrlBuilder from "@sanity/image-url";
import { sanityClient } from "@/sanity/client";
import type { EditorialImage } from "@/types/content";

const builder = sanityClient ? imageUrlBuilder(sanityClient) : null;

export function imageUrl(
  image: EditorialImage | undefined,
  width = 1600,
  height?: number,
) {
  if (!image) return "/art/insights-hero.webp";
  if (image.url) return image.url;
  if (image.asset?.url) return image.asset.url;
  if (!builder) return "/art/insights-hero.webp";

  let source = builder.image(image).width(width).auto("format").fit("max");
  if (height) source = source.height(height);
  return source.url();
}
