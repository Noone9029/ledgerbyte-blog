import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ListingPage } from "@/components/listing-page";
import { StructuredData } from "@/components/structured-data";
import { absoluteUrl } from "@/lib/config";
import { createMetadata } from "@/lib/metadata";
import { getPeople, getPosts } from "@/sanity/data";

type PageProps = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return (await getPeople()).map((person) => ({ slug: person.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const person = (await getPeople()).find((item) => item.slug === slug);
  return person ? createMetadata({ title: person.name, description: person.bio, path: `/author/${person.slug}` }) : {};
}

export default async function AuthorPage({ params }: PageProps) {
  const { slug } = await params;
  const [people, posts] = await Promise.all([getPeople(), getPosts()]);
  const person = people.find((item) => item.slug === slug);
  if (!person) notFound();
  const page = <ListingPage eyebrow={`${person.role}${person.credentials ? ` · ${person.credentials}` : ""}`} title={person.name} description={person.bio} posts={posts.filter((post) => post.author.slug === person.slug)} />;
  return <>{page}<StructuredData data={{ "@context": "https://schema.org", "@type": "CollectionPage", name: `Articles by ${person.name}`, url: absoluteUrl(`/author/${person.slug}`), about: { "@type": "Person", "@id": `${person.canonicalProfileUrl || absoluteUrl(`/author/${person.slug}`)}#person`, name: person.name, jobTitle: person.role, description: person.bio } }} /></>;
}
