export type Category = {
  _id: string;
  title: string;
  slug: string;
  description: string;
  seoTitle?: string;
  seoDescription?: string;
};

export type Topic = {
  _id: string;
  title: string;
  slug: string;
  description?: string;
};

export type Person = {
  _id: string;
  name: string;
  slug: string;
  role: string;
  credentials?: string;
  bio: string;
  canonicalProfileUrl?: string;
  portrait?: EditorialImage;
};

export type EditorialImage = {
  asset?: {
    _ref?: string;
    _type?: string;
    url?: string;
    metadata?: {
      dimensions?: { width: number; height: number; aspectRatio: number };
      lqip?: string;
    };
  };
  url?: string;
  alt: string;
  caption?: string;
  credit?: string;
  hotspot?: unknown;
  crop?: unknown;
};

export type Source = {
  _key?: string;
  label: string;
  url: string;
  publisher?: string;
  accessedAt?: string;
};

export type ServiceCta = {
  eyebrow?: string;
  title: string;
  body: string;
  label: string;
  href: string;
};

export type SeoFields = {
  title?: string;
  description?: string;
  canonicalUrl?: string;
  noIndex?: boolean;
};

export type PortableChild = {
  _key: string;
  _type: "span";
  text: string;
  marks?: string[];
};

export type PortableBlock = {
  _key: string;
  _type: string;
  style?: string;
  level?: number;
  listItem?: string;
  children?: PortableChild[];
  markDefs?: Array<{ _key: string; _type: string; href?: string }>;
  [key: string]: unknown;
};

export type Post = {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: Category;
  topics: Topic[];
  author: Person;
  reviewer?: Person;
  editorialReview?: {
    status: "pending" | "approved" | "changes-requested";
    reviewedAt?: string;
  };
  primaryQuery?: string;
  relatedQueries?: string[];
  heroImage: EditorialImage;
  body: PortableBlock[];
  sources: Source[];
  serviceCta: ServiceCta;
  featured: boolean;
  publishedAt: string;
  updatedAt?: string;
  seo: SeoFields;
  provenance?: {
    originalUrl?: string;
    recoverySource?: string;
    recoveryStatus?: string;
  };
};

export type SiteSettings = {
  title: string;
  description: string;
  socialLinks: Array<{ label: string; href: string }>;
  defaultCta: ServiceCta;
};
