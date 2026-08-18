import { ArrowLeft, ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { draftMode } from "next/headers";
import { notFound } from "next/navigation";
import { ArticleBody, InlineCta } from "@/components/article-body";
import { EditorialImage } from "@/components/editorial-image";
import { PostCard } from "@/components/post-card";
import { ShareLinks } from "@/components/share-links";
import { StructuredData } from "@/components/structured-data";
import { absoluteUrl } from "@/lib/config";
import { estimateReadingTime, formatDate, headingId } from "@/lib/format";
import { createMetadata } from "@/lib/metadata";
import { getPost, getPosts } from "@/sanity/data";
import { imageUrl } from "@/sanity/image";

type PageProps = { params: Promise<{ slug: string }> };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const preview = await draftMode();
  const post = await getPost(slug, preview.isEnabled);
  if (!post) return {};
  return createMetadata({
    title: post.seo.title || post.title,
    description: post.seo.description || post.excerpt,
    path: `/${post.slug}`,
    image: imageUrl(post.heroImage),
    noIndex: preview.isEnabled || post.seo.noIndex,
    type: "article",
  });
}

export async function generateStaticParams() {
  return (await getPosts()).map((post) => ({ slug: post.slug }));
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;
  const preview = (await draftMode()).isEnabled;
  const [post, posts] = await Promise.all([getPost(slug, preview), getPosts(preview)]);
  if (!post) notFound();
  const headings = post.body.filter((item) => item._type === "block" && ["h2", "h3"].includes(item.style || ""));
  const related = posts.filter((candidate) => candidate._id !== post._id && candidate.category.slug === post.category.slug).slice(0, 3);
  const personUrl = post.author.canonicalProfileUrl || absoluteUrl(`/author/${post.author.slug}`);
  const canonical = post.seo.canonicalUrl || absoluteUrl(`/${post.slug}`);
  const approvedReviewer = post.editorialReview?.status === "approved" && post.editorialReview.reviewedAt
    ? post.reviewer
    : undefined;

  return (
    <main id="main-content">
      <article>
        <header className="article-hero page-section">
          <Link className="article-back" href={`/category/${post.category.slug}`}><ArrowLeft aria-hidden="true" /> {post.category.title}</Link>
          <div className="article-heading">
            <p className="eyebrow">{post.category.title}</p>
            <h1>{post.title}</h1>
            <p className="article-deck">{post.excerpt}</p>
          </div>
          <div className="article-byline">
            {post.author.portrait && <Image src={imageUrl(post.author.portrait, 96)} alt="" width={48} height={48} />}
            <div><span>Written by</span><a href={personUrl}>{post.author.name}</a></div>
            <div><span>Published</span><time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time></div>
            {post.updatedAt && <div><span>Updated</span><time dateTime={post.updatedAt}>{formatDate(post.updatedAt)}</time></div>}
            <div><span>Reading time</span><strong>{estimateReadingTime(post.body)} minutes</strong></div>
          </div>
          <EditorialImage image={post.heroImage} priority sizes="(max-width: 1400px) 100vw, 1320px" />
        </header>

        <div className="article-layout page-section">
          <aside className="article-rail">
            {headings.length > 0 && <nav aria-label="On this page"><strong>On this page</strong>{headings.map((heading) => <a href={`#${headingId(heading)}`} key={heading._key}>{(heading.children || []).map((child) => child.text).join(" ")}</a>)}</nav>}
            <ShareLinks url={canonical} title={post.title} />
          </aside>
          <div className="article-content">
            <ArticleBody value={post.body} />
            {post.sources.length > 0 && <section className="sources" aria-labelledby="sources-heading"><h2 id="sources-heading">Sources</h2><ol>{post.sources.map((source) => <li key={source.url}><a href={source.url} rel="noreferrer">{source.label}</a>{source.publisher && <span> — {source.publisher}</span>}</li>)}</ol></section>}
            {approvedReviewer && <aside className="reviewer"><span>Reviewed by</span><h2>{approvedReviewer.name}</h2><p>{approvedReviewer.role}{approvedReviewer.credentials ? ` · ${approvedReviewer.credentials}` : ""}</p><p>{approvedReviewer.bio}</p>{approvedReviewer.canonicalProfileUrl && <a className="text-link" href={approvedReviewer.canonicalProfileUrl}>View profile <ArrowUpRight aria-hidden="true" /></a>}</aside>}
            <InlineCta cta={post.serviceCta} />
            <aside className="author-box"><span>About the author</span><div>{post.author.portrait && <Image src={imageUrl(post.author.portrait, 160)} alt="" width={80} height={80} />}<div><h2>{post.author.name}</h2><p>{post.author.role}{post.author.credentials ? ` · ${post.author.credentials}` : ""}</p><p>{post.author.bio}</p><Link className="text-link" href={`/author/${post.author.slug}`}>More from {post.author.name}</Link></div></div></aside>
          </div>
        </div>
      </article>

      {related.length > 0 && <section className="related page-section" aria-labelledby="related-heading"><div className="section-heading-row"><div><p className="eyebrow">Keep reading</p><h2 id="related-heading">Related insights</h2></div></div><div className="post-grid">{related.map((item) => <PostCard post={item} key={item._id} />)}</div></section>}

      <StructuredData data={[
        {
          "@context": "https://schema.org", "@type": "Article", "@id": `${canonical}#article`, mainEntityOfPage: canonical, headline: post.title, description: post.excerpt, image: [imageUrl(post.heroImage)], datePublished: post.publishedAt, dateModified: post.updatedAt || post.publishedAt,
          author: { "@type": "Person", "@id": `${personUrl}#person`, name: post.author.name, url: personUrl, jobTitle: post.author.role },
          reviewedBy: approvedReviewer ? { "@type": "Person", name: approvedReviewer.name, url: approvedReviewer.canonicalProfileUrl } : undefined,
          publisher: { "@id": "https://ledgerbyte.io/#organization" }, articleSection: post.category.title, keywords: post.topics.map((topic) => topic.title),
        },
        { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [
          { "@type": "ListItem", position: 1, name: "Insights", item: absoluteUrl("/") },
          { "@type": "ListItem", position: 2, name: post.category.title, item: absoluteUrl(`/category/${post.category.slug}`) },
          { "@type": "ListItem", position: 3, name: post.title, item: canonical },
        ] },
      ]} />
    </main>
  );
}
