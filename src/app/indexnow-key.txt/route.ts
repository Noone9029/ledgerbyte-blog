export async function GET() {
  const key = process.env.NEXT_PUBLIC_INDEXNOW_KEY;
  if (!key) return new Response("IndexNow is not configured.", { status: 404 });
  return new Response(key, { headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "public, max-age=3600" } });
}
