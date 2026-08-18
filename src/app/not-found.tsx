import Link from "next/link";

export default function NotFound() {
  return <main id="main-content" className="not-found page-section"><p className="eyebrow">404</p><h1>This insight could not be found.</h1><p>The article may have moved, been retired, or not yet been recovered.</p><div><Link className="button button-amber" href="/">Browse latest insights</Link><Link className="button button-outline" href="/search">Search articles</Link></div></main>;
}
