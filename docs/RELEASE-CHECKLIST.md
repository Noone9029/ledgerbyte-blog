# Production release checklist

## Required gates

- Real Sanity project, production dataset, read token, and signed webhook.
- Finance and Technology categories, site settings, verified people, and at
  least one publishable article or recovered article are present.
- `npm test` and `npm run test:e2e` pass.
- Preview verification covers desktop, tablet, mobile, light/dark theme,
  reduced motion, JavaScript disabled reading, keyboard navigation, and images.
- Preview HTML has correct canonical, Article schema, author identity, dates,
  sitemap, RSS, robots, and `llms.txt`.
- No preview fixtures, secrets, personal data, unsupported claims, or broken
  main-site links are present.

## Domain cutover

1. Add `blog.ledgerbyte.io` to the dedicated Vercel project and inspect the
   exact DNS record Vercel requests.
2. Replace only the two Hostinger A records for `blog`; do not alter apex or
   mail records.
3. Wait for Vercel verification and automatic certificate issuance.
4. Verify HTTPS, HTTP-to-HTTPS redirect, canonical host, article routes,
   sitemap, robots, RSS, Studio authentication, and webhook revalidation.
5. Submit the blog sitemap in Search Console and the restored URLs through
   IndexNow. Google indexing remains sitemap and URL Inspection based.
6. Keep the prior deployment available for rollback. If TLS, widespread 5xx,
   routing, or canonical checks fail, restore the prior DNS records and retain
   failure evidence.

GA4 is optional at launch. Analytics events activate only when
`NEXT_PUBLIC_GA_MEASUREMENT_ID` is configured and never include article-form
inputs or visitor personal information.
