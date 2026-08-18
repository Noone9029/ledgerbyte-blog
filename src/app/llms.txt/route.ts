import { SITE_DESCRIPTION, SITE_NAME, SITE_URL } from "@/lib/config";
import { getPosts } from "@/sanity/data";

export async function GET() {
  const posts = (await getPosts()).filter((post) => !post.seo.noIndex);
  const text = [`# ${SITE_NAME}`, "", SITE_DESCRIPTION, "", "## Canonical sections", `- [Finance](${SITE_URL}/category/finance)`, `- [Technology](${SITE_URL}/category/technology)`, "", "## Articles", ...posts.map((post) => `- [${post.title}](${SITE_URL}/${post.slug}): ${post.excerpt}`), "", "## Company", "- [LedgerByte](https://ledgerbyte.io)", "- [Finance services](https://ledgerbyte.io/finance/services)", "- [Technology services](https://ledgerbyte.io/technology/services)"].join("\n");
  return new Response(text, { headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "public, s-maxage=300, stale-while-revalidate=86400" } });
}
