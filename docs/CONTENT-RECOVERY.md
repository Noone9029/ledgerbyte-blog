# Legacy content recovery

The Hostinger domain currently serves a parked page and the public archive has
no captured snapshots. `src/content/legacy-inventory.json` records the initial
15 URLs discovered from the production site’s content map and public search
indexes. Search Console exports may add more URLs.

## Recovery rules

1. Export all URLs from the Search Console domain property and merge unseen
   article URLs into the inventory with provenance.
2. Recover only text, author names, and dates visible in a verifiable first-party
   export or complete public index copy. Never join partial excerpts into a
   supposedly complete article.
3. Create recovered documents as Sanity drafts and record the original URL,
   recovery source, and status.
4. Re-check every regulatory statement against a current primary source.
   High-risk indexed copies are marked `indexed-copy-available-review-required`.
5. Preserve the original flat slug. Use the original publication date only when
   it is visible in evidence; set the modification date after a real update.
6. Replace unavailable legacy imagery with original LedgerByte artwork.
7. If recovery fails, redirect only to a genuinely equivalent destination.
   Otherwise add the slug to `goneSlugs` for an honest HTTP 410 response.

The local fixture articles are visual previews, are explicitly no-indexed, and
must never be treated as recovered content.
