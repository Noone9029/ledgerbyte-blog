import type { PortableBlock } from "@/types/content";

export function formatDate(value: string) {
  return new Intl.DateTimeFormat("en", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(value));
}

export function estimateReadingTime(blocks: PortableBlock[]) {
  const words = blocks
    .flatMap((block) => block.children ?? [])
    .map((child) => child.text)
    .join(" ")
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;

  return Math.max(1, Math.ceil(words / 220));
}

export function plainText(blocks: PortableBlock[]) {
  return blocks
    .flatMap((block) => block.children ?? [])
    .map((child) => child.text)
    .join(" ")
    .replace(/\s+/g, " ")
    .trim();
}

export function headingId(block: PortableBlock) {
  const text = (block.children ?? []).map((child) => child.text).join(" ");
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}
