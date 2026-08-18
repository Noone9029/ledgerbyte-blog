import Image from "next/image";
import { imageUrl } from "@/sanity/image";
import type { EditorialImage as EditorialImageType } from "@/types/content";

export function EditorialImage({
  image,
  priority = false,
  sizes = "(max-width: 900px) 100vw, 900px",
}: {
  image: EditorialImageType;
  priority?: boolean;
  sizes?: string;
}) {
  const dimensions = image.asset?.metadata?.dimensions;
  return (
    <figure className="editorial-figure">
      <div className="editorial-image-frame">
        <Image
          src={imageUrl(image)}
          alt={image.alt}
          width={dimensions?.width || 1600}
          height={dimensions?.height || 1000}
          sizes={sizes}
          priority={priority}
        />
      </div>
      {(image.caption || image.credit) && (
        <figcaption>
          <span>{image.caption}</span>
          {image.credit && <span>{image.credit}</span>}
        </figcaption>
      )}
    </figure>
  );
}
