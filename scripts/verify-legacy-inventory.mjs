import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const inventory = JSON.parse(fs.readFileSync(path.join(root, "src/content/legacy-inventory.json"), "utf8"));
const slugs = new Set();
const urls = new Set();

if (inventory.length < 15) throw new Error("Legacy inventory lost known URLs.");
for (const item of inventory) {
  if (!item.slug || !item.title || !item.originalUrl || !item.status) throw new Error(`Incomplete legacy record: ${JSON.stringify(item)}`);
  if (slugs.has(item.slug) || urls.has(item.originalUrl)) throw new Error(`Duplicate legacy record: ${item.slug}`);
  if (new URL(item.originalUrl).hostname !== "blog.ledgerbyte.io") throw new Error(`Unexpected legacy host: ${item.originalUrl}`);
  if (!Array.isArray(item.discoveredBy) || item.discoveredBy.length === 0) throw new Error(`Missing provenance: ${item.slug}`);
  slugs.add(item.slug);
  urls.add(item.originalUrl);
}
console.log(`Legacy inventory passed: ${inventory.length} unique URLs.`);
