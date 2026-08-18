import { draftMode } from "next/headers";
import {
  fixtureCategories,
  fixturePeople,
  fixturePosts,
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

async function fetchSanity<T>(
  query: string,
  params: Record<string, unknown> = {},
  tags: string[] = [],
): Promise<T> {
  const preview = (await draftMode()).isEnabled;
  const client = preview ? sanityPreviewClient : sanityClient;
  if (!client) throw new Error("Sanity is not configured.");

  return client.fetch<T>(query, params, {
    cache: preview ? "no-store" : "force-cache",
    next: preview ? undefined : { revalidate: 300, tags },
  });
}

export async function getPosts(): Promise<Post[]> {
  if (!HAS_SANITY) return fixturePosts;
  return fetchSanity<Post[]>(allPostsQuery, {}, ["posts"]);
}

export async function getPost(slug: string): Promise<Post | null> {
  if (!HAS_SANITY) {
    return fixturePosts.find((post) => post.slug === slug) ?? null;
  }
  return fetchSanity<Post | null>(postBySlugQuery, { slug }, [
    "posts",
    `post:${slug}`,
  ]);
}

export async function getCategories(): Promise<Category[]> {
  if (!HAS_SANITY) return fixtureCategories;
  return fetchSanity<Category[]>(categoriesQuery, {}, ["categories"]);
}

export async function getTopics(): Promise<Topic[]> {
  if (!HAS_SANITY) return fixtureTopics;
  return fetchSanity<Topic[]>(topicsQuery, {}, ["topics"]);
}

export async function getPeople(): Promise<Person[]> {
  if (!HAS_SANITY) return fixturePeople;
  return fetchSanity<Person[]>(peopleQuery, {}, ["people"]);
}

export async function getSettings(): Promise<SiteSettings> {
  if (!HAS_SANITY) return fixtureSettings;
  return fetchSanity<SiteSettings>(settingsQuery, {}, ["settings"]);
}

export async function searchPosts(query: string): Promise<Post[]> {
  const normalized = query.trim().toLowerCase();
  if (!normalized) return [];

  const posts = await getPosts();
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
