import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const files = [
  "src/content/fixtures.ts",
  "src/sanity/schemaTypes/index.ts",
  "docs/EDITOR-GUIDE.md",
];

for (const relative of files) {
  const body = fs.readFileSync(path.join(root, relative), "utf8");
  if (/lorem ipsum|placeholder text|TODO: write/i.test(body)) {
    throw new Error(`${relative} contains placeholder editorial copy.`);
  }
}

const fixtures = fs.readFileSync(path.join(root, "src/content/fixtures.ts"), "utf8");
if (!fixtures.includes("seo: { noIndex: true }")) {
  throw new Error("Preview fixtures must remain noindex.");
}
console.log("Content guardrails passed.");
