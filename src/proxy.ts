import { NextResponse, type NextRequest } from "next/server";
import { goneSlugs, permanentRedirects } from "@/content/legacy-routing";

export function proxy(request: NextRequest) {
  const slug = request.nextUrl.pathname.replace(/^\//, "").replace(/\/$/, "");
  if (!slug || slug.includes("/")) return NextResponse.next();

  const destination = permanentRedirects[slug];
  if (destination) return NextResponse.redirect(new URL(destination, request.url), 308);

  if (goneSlugs.has(slug)) {
    return new NextResponse(
      "<!doctype html><html lang=\"en\"><meta charset=\"utf-8\"><meta name=\"robots\" content=\"noindex\"><title>Article retired | LedgerByte Insights</title><body><main><h1>This article has been retired.</h1><p>No verified replacement is available.</p><a href=\"/\">Browse LedgerByte Insights</a></main></body></html>",
      { status: 410, headers: { "content-type": "text/html; charset=utf-8" } },
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|api|studio|category|topic|author|search|rss.xml|sitemap.xml|robots.txt|llms.txt|opengraph-image|favicon.ico).*)"],
};
