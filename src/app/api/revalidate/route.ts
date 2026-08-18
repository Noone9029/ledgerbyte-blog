import { timingSafeEqual } from "node:crypto";
import { revalidatePath, revalidateTag } from "next/cache";

function secretsMatch(received: string | null, expected: string | undefined) {
  if (!received || !expected) return false;
  const receivedBuffer = Buffer.from(received);
  const expectedBuffer = Buffer.from(expected);
  return receivedBuffer.length === expectedBuffer.length && timingSafeEqual(receivedBuffer, expectedBuffer);
}

export async function POST(request: Request) {
  const secret = request.headers.get("x-sanity-webhook-secret");
  if (!secretsMatch(secret, process.env.SANITY_REVALIDATE_SECRET)) {
    return Response.json({ error: "Invalid webhook secret." }, { status: 401 });
  }

  const body = (await request.json()) as { _type?: string; slug?: string };
  revalidateTag("posts", "max");
  revalidateTag("categories", "max");
  revalidateTag("topics", "max");
  revalidateTag("people", "max");
  revalidateTag("settings", "max");
  revalidatePath("/", "layout");
  if (body.slug) revalidateTag(`post:${body.slug}`, "max");

  return Response.json({ revalidated: true, type: body._type || null, slug: body.slug || null });
}
