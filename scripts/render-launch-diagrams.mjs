import fs from "node:fs/promises";
import path from "node:path";
import { pathToFileURL } from "node:url";
import { chromium } from "@playwright/test";

const artworkDirectory = path.join(process.cwd(), "public", "art", "launch");
const diagrams = (await fs.readdir(artworkDirectory)).filter((name) => name.endsWith("-diagram.svg"));
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1600, height: 900 }, deviceScaleFactor: 1 });

for (const diagram of diagrams) {
  const source = path.join(artworkDirectory, diagram);
  const output = source.replace(/\.svg$/, ".png");
  await page.goto(pathToFileURL(source).href);
  await page.screenshot({ path: output, type: "png", fullPage: false });
}

await browser.close();
console.log(`Rendered ${diagrams.length} launch diagrams to PNG.`);
