import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ListingPage } from "@/components/listing-page";
import { createMetadata } from "@/lib/metadata";
import { getCategories, getPosts } from "@/sanity/data";

type PageProps = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return (await getCategories()).map((category) => ({ slug: category.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = (await getCategories()).find((item) => item.slug === slug);
  if (!category) return {};
  return createMetadata({ title: category.seoTitle || category.title, description: category.seoDescription || category.description, path: `/category/${category.slug}` });
}

export default async function CategoryPage({ params }: PageProps) {
  const { slug } = await params;
  const [categories, posts] = await Promise.all([getCategories(), getPosts()]);
  const category = categories.find((item) => item.slug === slug);
  if (!category) notFound();
  return <ListingPage eyebrow="Insight pillar" title={category.title} description={category.description} posts={posts.filter((post) => post.category.slug === category.slug)} />;
}
