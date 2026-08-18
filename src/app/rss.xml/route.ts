import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/config";
import { getPosts } from "@/sanity/data";

const escapeXml = (value: string) => value.replace(/[<>&'"]/g, (character) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;", "'": "&apos;", '"': "&quot;" })[character] || character);

export async function GET() {
  const posts = (await getPosts()).filter((post) => !post.seo.noIndex);
  const xml = `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0"><channel><title>${escapeXml(SITE_NAME)}</title><link>${SITE_URL}</link><description>${escapeXml(SITE_DESCRIPTION)}</description><language>en</language>${posts.map((post) => `<item><title>${escapeXml(post.title)}</title><link>${SITE_URL}/${post.slug}</link><guid isPermaLink="true">${SITE_URL}/${post.slug}</guid><description>${escapeXml(post.excerpt)}</description><pubDate>${new Date(post.publishedAt).toUTCString()}</pubDate></item>`).join("")}</channel></rss>`;
  return new Response(xml, { headers: { "Content-Type": "application/rss+xml; charset=utf-8", "Cache-Control": "public, s-maxage=300, stale-while-revalidate=86400" } });
}
