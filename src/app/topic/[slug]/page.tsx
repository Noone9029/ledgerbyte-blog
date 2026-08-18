import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ListingPage } from "@/components/listing-page";
import { createMetadata } from "@/lib/metadata";
import { getPosts, getTopics } from "@/sanity/data";

type PageProps = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return (await getTopics()).map((topic) => ({ slug: topic.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const topic = (await getTopics()).find((item) => item.slug === slug);
  return topic ? createMetadata({ title: topic.title, description: topic.description, path: `/topic/${topic.slug}` }) : {};
}

export default async function TopicPage({ params }: PageProps) {
  const { slug } = await params;
  const [topics, posts] = await Promise.all([getTopics(), getPosts()]);
  const topic = topics.find((item) => item.slug === slug);
  if (!topic) notFound();
  return <ListingPage eyebrow="Topic" title={topic.title} description={topic.description} posts={posts.filter((post) => post.topics.some((item) => item.slug === topic.slug))} />;
}
