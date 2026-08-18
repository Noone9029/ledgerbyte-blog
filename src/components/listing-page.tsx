import { PostCard } from "@/components/post-card";
import type { Post } from "@/types/content";

export function ListingPage({ eyebrow, title, description, posts }: { eyebrow: string; title: string; description?: string; posts: Post[] }) {
  return (
    <main id="main-content">
      <header className="listing-hero page-section">
        <p className="eyebrow">{eyebrow}</p>
        <h1>{title}</h1>
        {description && <p className="hero-summary">{description}</p>}
      </header>
      <section className="listing-results page-section" aria-label={`${title} articles`}>
        {posts.length > 0 ? <div className="post-grid">{posts.map((post) => <PostCard post={post} key={post._id} />)}</div> : <div className="empty-state"><h2>No published articles yet</h2><p>New LedgerByte insights will appear here when they are ready.</p></div>}
      </section>
    </main>
  );
}
