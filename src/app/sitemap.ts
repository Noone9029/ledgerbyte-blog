import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/config";
import { getCategories, getPeople, getPosts, getTopics } from "@/sanity/data";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [posts, categories, topics, people] = await Promise.all([getPosts(), getCategories(), getTopics(), getPeople()]);
  return [
    { url: SITE_URL, lastModified: new Date(), changeFrequency: "weekly", priority: 1 },
    ...posts.filter((post) => !post.seo.noIndex).map((post) => ({ url: `${SITE_URL}/${post.slug}`, lastModified: new Date(post.updatedAt || post.publishedAt), changeFrequency: "monthly" as const, priority: 0.8 })),
    ...categories.map((category) => ({ url: `${SITE_URL}/category/${category.slug}`, changeFrequency: "weekly" as const, priority: 0.7 })),
    ...topics.map((topic) => ({ url: `${SITE_URL}/topic/${topic.slug}`, changeFrequency: "monthly" as const, priority: 0.5 })),
    ...people.map((person) => ({ url: `${SITE_URL}/author/${person.slug}`, changeFrequency: "monthly" as const, priority: 0.4 })),
  ];
}
