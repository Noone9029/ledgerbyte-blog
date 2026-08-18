import type { Post } from "@/types/content";
import { fixtureCategories, fixturePeople, fixtureTopics } from "@/content/fixtures";
// The editorial source is intentionally plain ESM so the same records drive validation and Sanity import.
// @ts-expect-error The launch package is validated at runtime by scripts/verify-launch-content.mjs.
import { launchArticles } from "../../content/launch/index.mjs";
// @ts-expect-error The shared Portable Text converter is plain ESM for Node import scripts.
import { toPortableText } from "../../scripts/launch-content-helpers.mjs";

type LaunchArticle = {
  slug: string;
  title: string;
  excerpt: string;
  categoryId: string;
  topicIds: string[];
  reviewerId: string;
  editorialReview: { status: "pending"; reviewedAt: null };
  primaryQuery: string;
  relatedQueries: string[];
  hero: { alt: string; caption: string };
  inlineDiagram?: { alt: string; caption: string; afterSection: number };
  sources: Post["sources"];
  serviceCta: Post["serviceCta"];
  featured: boolean;
  plannedPublishedAt: string;
  seoTitle: string;
  seoDescription: string;
  provenance: Post["provenance"];
  [key: string]: unknown;
};

const articles = launchArticles as LaunchArticle[];

export const launchFixturePosts: Post[] = articles.map((article) => {
  const category = fixtureCategories.find((item) => item._id === article.categoryId);
  const author = fixturePeople.find((item) => item._id === "person-alina-khalid");
  const reviewer = fixturePeople.find((item) => item._id === article.reviewerId);
  if (!category || !author || !reviewer) throw new Error(`Invalid launch fixture relationships for ${article.slug}.`);

  return {
    _id: `preview-launch-${article.slug}`,
    title: article.title,
    slug: article.slug,
    excerpt: article.excerpt,
    category,
    topics: article.topicIds.map((id) => {
      const topic = fixtureTopics.find((item) => item._id === id);
      if (!topic) throw new Error(`Missing fixture topic ${id}.`);
      return topic;
    }),
    author,
    reviewer,
    editorialReview: { status: "pending" },
    primaryQuery: article.primaryQuery,
    relatedQueries: article.relatedQueries,
    heroImage: {
      url: `/art/launch/${article.slug}-hero.webp`,
      alt: article.hero.alt,
      caption: article.hero.caption,
      credit: "Original LedgerByte illustration",
    },
    body: toPortableText(article, article.inlineDiagram ? {
      diagram: { url: `/art/launch/${article.slug}-diagram.webp` },
    } : {}),
    sources: article.sources,
    serviceCta: article.serviceCta,
    featured: article.featured,
    publishedAt: article.plannedPublishedAt,
    seo: {
      title: article.seoTitle,
      description: article.seoDescription,
      noIndex: true,
    },
    provenance: article.provenance,
  };
});
