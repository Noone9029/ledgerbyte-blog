import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import Link from "next/link";
import { draftMode } from "next/headers";
import { PostCard } from "@/components/post-card";
import { StructuredData } from "@/components/structured-data";
import { HAS_SANITY, SITE_DESCRIPTION, SITE_NAME, absoluteUrl } from "@/lib/config";
import { getCategories, getPosts } from "@/sanity/data";
import { imageUrl } from "@/sanity/image";

export default async function HomePage() {
  const preview = (await draftMode()).isEnabled;
  const [posts, categories] = await Promise.all([getPosts(preview), getCategories(preview)]);
  const featured = posts.find((post) => post.featured) ?? posts[0];
  const latest = posts.filter((post) => post._id !== featured?._id).slice(0, 6);

  return (
    <main id="main-content">
      {!HAS_SANITY && (
        <aside className="preview-banner" role="status">
          Preview dataset — connect Sanity before production launch.
        </aside>
      )}
      <section className="insights-hero page-section">
        <div className="insights-hero-copy">
          <p className="eyebrow">LedgerByte Insights</p>
          <h1>Clear thinking for better business decisions.</h1>
          <p className="hero-summary">
            Practical finance and technology guidance for growing businesses —
            written to be useful, reviewed for clarity, and connected to the work.
          </p>
          <div className="topic-pills" aria-label="Browse by category">
            {categories.map((category) => (
              <Link href={`/category/${category.slug}`} key={category._id}>{category.title}</Link>
            ))}
          </div>
        </div>
        <div className="insights-hero-art" aria-hidden="true">
          <Image src="/art/insights-hero.webp" alt="" width={1600} height={1000} priority sizes="(max-width: 900px) 100vw, 48vw" />
          <span>FINANCE × TECHNOLOGY</span>
        </div>
      </section>

      {featured && (
        <section className="featured-section page-section" aria-labelledby="featured-heading">
          <div className="section-kicker"><p className="eyebrow">Editor&apos;s pick</p><h2 id="featured-heading">A useful place to start</h2></div>
          <PostCard post={featured} featured />
        </section>
      )}

      <section className="latest-section page-section" aria-labelledby="latest-heading">
        <div className="section-heading-row">
          <div><p className="eyebrow">Latest thinking</p><h2 id="latest-heading">Fresh from LedgerByte</h2></div>
          <Link className="text-link" href="/search">Search all articles <ArrowRight aria-hidden="true" /></Link>
        </div>
        {latest.length > 0 ? <div className="post-grid">{latest.map((post) => <PostCard post={post} key={post._id} />)}</div> : <p className="empty-state">More articles will appear here as they are published.</p>}
      </section>

      <section className="pillar-section page-section" aria-labelledby="pillars-heading">
        <div className="section-heading-row"><div><p className="eyebrow">Explore by pillar</p><h2 id="pillars-heading">Depth where it matters</h2></div></div>
        <div className="pillar-grid">
          {categories.map((category, index) => (
            <Link className="pillar-card" href={`/category/${category.slug}`} key={category._id}>
              <span>0{index + 1}</span><h3>{category.title}</h3><p>{category.description}</p><strong>Explore {category.title.toLowerCase()} <ArrowRight aria-hidden="true" /></strong>
            </Link>
          ))}
        </div>
      </section>

      <StructuredData data={{
        "@context": "https://schema.org",
        "@type": "CollectionPage",
        name: SITE_NAME,
        description: SITE_DESCRIPTION,
        url: absoluteUrl("/"),
        isPartOf: { "@id": "https://ledgerbyte.io/#website" },
        mainEntity: posts.slice(0, 10).map((post) => ({ "@type": "Article", headline: post.title, url: absoluteUrl(`/${post.slug}`), image: imageUrl(post.heroImage) })),
      }} />
    </main>
  );
}
