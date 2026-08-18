"use client";

import { ArrowUpRight, Check, LinkSimple } from "@phosphor-icons/react";
import { useState } from "react";

export function ShareLinks({ url, title }: { url: string; title: string }) {
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    await navigator.clipboard.writeText(url);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1800);
  };
  return (
    <div className="share-links">
      <strong>Share</strong>
      <a href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`} target="_blank" rel="noreferrer" aria-label={`Share ${title} on LinkedIn`}>LinkedIn <ArrowUpRight aria-hidden="true" /></a>
      <button type="button" onClick={copy}>{copied ? "Copied" : "Copy link"} {copied ? <Check aria-hidden="true" /> : <LinkSimple aria-hidden="true" />}</button>
    </div>
  );
}
