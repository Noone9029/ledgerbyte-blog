# LedgerByte Insights

Independent Next.js 16 blog for `blog.ledgerbyte.io`, with an embedded Sanity
Studio at `/studio`.

## Local setup

1. Copy `.env.example` to `.env.local` and supply the Sanity project settings.
2. Run `npm install`.
3. Run `npm run dev`.
4. Open `http://localhost:3000/studio` to edit content.

Without Sanity configuration the app uses a deliberately no-indexed preview
dataset so the design and routes can still be tested. Production deployment is
blocked by the release checklist until real Sanity content is connected.

## Verification

```powershell
npm run test:content
npm run test:legacy
npm run lint
npm run typecheck
npm run build
npm run test:e2e
```

See `docs/EDITOR-GUIDE.md`, `docs/CONTENT-RECOVERY.md`, and
`docs/RELEASE-CHECKLIST.md` for editorial and production procedures.
