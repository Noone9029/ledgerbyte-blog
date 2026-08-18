import type { Metadata } from "next";
import { MagnifyingGlass } from "@phosphor-icons/react/dist/ssr";
import { PostCard } from "@/components/post-card";
import { createMetadata } from "@/lib/metadata";
import { searchPosts } from "@/sanity/data";

export const metadata: Metadata = createMetadata({ title: "Search", description: "Search LedgerByte finance and technology insights.", path: "/search", noIndex: true });

export default async function SearchPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const query = (await searchParams).q?.trim() || "";
  const results = query ? await searchPosts(query) : [];
  return (
    <main id="main-content">
      <header className="listing-hero search-hero page-section">
        <p className="eyebrow">Find an answer</p><h1>Search insights</h1>
        <form className="search-form" action="/search" role="search">
          <label className="sr-only" htmlFor="search-query">Search articles</label>
          <MagnifyingGlass aria-hidden="true" />
          <input id="search-query" name="q" type="search" defaultValue={query} placeholder="Try reporting, automation, or cash flow" autoComplete="off" />
          <button className="button button-amber" type="submit">Search</button>
        </form>
      </header>
      <section className="listing-results page-section" aria-live="polite">
        {query ? <div className="search-summary"><p className="eyebrow">Search results</p><h2>{results.length} result{results.length === 1 ? "" : "s"} for “{query}”</h2></div> : <div className="empty-state"><h2>Search the publication</h2><p>Use a topic, service, or business question.</p></div>}
        {results.length > 0 && <div className="post-grid">{results.map((post) => <PostCard post={post} key={post._id} />)}</div>}
      </section>
    </main>
  );
}
