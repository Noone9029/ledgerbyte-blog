import fs from "node:fs";
import path from "node:path";
import { createClient } from "next-sanity";
import { launchArticles } from "../content/launch/index.mjs";
import { toSanityDocument } from "./launch-content-helpers.mjs";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_API_WRITE_TOKEN;
if (!projectId || !token) throw new Error("Set NEXT_PUBLIC_SANITY_PROJECT_ID and a short-lived SANITY_API_WRITE_TOKEN before importing.");

const client = createClient({
  projectId,
  dataset,
  token,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2026-08-01",
  useCdn: false,
});
const artworkDirectory = path.join(process.cwd(), "public", "art", "launch");

async function uploadArtwork(filename) {
  const existing = await client.fetch(`*[_type == "sanity.imageAsset" && originalFilename == $filename][0]{_id}`, { filename });
  if (existing?._id) return existing;
  const absolutePath = path.join(artworkDirectory, filename);
  if (!fs.existsSync(absolutePath)) throw new Error(`Missing launch artwork: ${absolutePath}`);
  return client.assets.upload("image", fs.createReadStream(absolutePath), { filename });
}

const foundationalIds = [
  "category-finance", "category-technology", "person-alina-khalid", "person-haider-ali",
  "person-sayyam-nasir", "person-faisal-nawaz", "person-amir-ilyas", "person-muhammad-ahmad",
];
const existingFoundation = await client.fetch(`count(*[_id in $ids])`, { ids: foundationalIds });
if (existingFoundation !== foundationalIds.length) {
  throw new Error("Run npm run content:seed first; required categories or verified people are missing.");
}

for (const article of launchArticles) {
  const heroFilename = `${article.slug}-hero.webp`;
  const hero = await uploadArtwork(heroFilename);
  const diagram = article.inlineDiagram
    ? await uploadArtwork(`${article.slug}-diagram.webp`)
    : undefined;
  const document = toSanityDocument(article, { hero, diagram });
  await client.createOrReplace(document);
  console.log(`Imported pending draft ${article.order}/20: ${article.slug}`);
}

console.log("Imported all 20 launch articles as pending Sanity drafts. No article was published.");
