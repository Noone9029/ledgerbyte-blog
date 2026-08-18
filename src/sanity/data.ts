import {
  fixtureCategories,
  fixturePeople,
  fixtureSettings,
  fixtureTopics,
} from "@/content/fixtures";
import { HAS_SANITY } from "@/lib/config";
import { sanityClient, sanityPreviewClient } from "@/sanity/client";
import {
  allPostsQuery,
  categoriesQuery,
  peopleQuery,
  postBySlugQuery,
  settingsQuery,
  topicsQuery,
} from "@/sanity/queries";
import type { Category, Person, Post, SiteSettings, Topic } from "@/types/content";
import { launchFixturePosts } from "@/content/launch-fixtures";

async function fetchSanity<T>(
  query: string,
  params: Record<string, unknown> = {},
  tags: string[] = [],
  preview = false,
): Promise<T> {
  const client = preview ? sanityPreviewClient : sanityClient;
  if (!client) throw new Error("Sanity is not configured.");

  return client.fetch<T>(query, params, {
    cache: preview ? "no-store" : "force-cache",
    next: preview ? undefined : { revalidate: 300, tags },
  });
}

export async function getPosts(preview = false): Promise<Post[]> {
  if (!HAS_SANITY) return launchFixturePosts;
  return fetchSanity<Post[]>(allPostsQuery, {}, ["posts"], preview);
}

export async function getPost(slug: string, preview = false): Promise<Post | null> {
  if (!HAS_SANITY) {
    return launchFixturePosts.find((post) => post.slug === slug) ?? null;
  }
  return fetchSanity<Post | null>(postBySlugQuery, { slug }, [
    "posts",
    `post:${slug}`,
  ], preview);
}

export async function getCategories(preview = false): Promise<Category[]> {
  if (!HAS_SANITY) return fixtureCategories;
  return fetchSanity<Category[]>(categoriesQuery, {}, ["categories"], preview);
}

export async function getTopics(preview = false): Promise<Topic[]> {
  if (!HAS_SANITY) return fixtureTopics;
  return fetchSanity<Topic[]>(topicsQuery, {}, ["topics"], preview);
}

export async function getPeople(preview = false): Promise<Person[]> {
  if (!HAS_SANITY) return fixturePeople;
  return fetchSanity<Person[]>(peopleQuery, {}, ["people"], preview);
}

export async function getSettings(): Promise<SiteSettings> {
  if (!HAS_SANITY) return fixtureSettings;
  return fetchSanity<SiteSettings>(settingsQuery, {}, ["settings"]);
}

export async function searchPosts(query: string, preview = false): Promise<Post[]> {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return [];

  const posts = await getPosts(preview);
  return posts.filter((post) => {
    const haystack = [
      post.title,
      post.excerpt,
      post.category.title,
      ...post.topics.map((topic) => topic.title),
    ]
      .join(" ")
      .toLowerCase();
    return haystack.includes(normalized);
  });
}
