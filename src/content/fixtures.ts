import type {
  Category,
  Person,
  Post,
  PortableBlock,
  SiteSettings,
  Topic,
} from "@/types/content";

const block = (
  key: string,
  text: string,
  style = "normal",
): PortableBlock => ({
  _key: key,
  _type: "block",
  style,
  children: [{ _key: `${key}-span`, _type: "span", text, marks: [] }],
  markDefs: [],
});

export const fixtureCategories: Category[] = [
  {
    _id: "category-finance",
    title: "Finance",
    slug: "finance",
    description:
      "Reporting, controls, cash flow, compliance, and financial leadership for growing businesses.",
  },
  {
    _id: "category-technology",
    title: "Technology",
    slug: "technology",
    description:
      "Practical guidance on software, cloud infrastructure, automation, and product delivery.",
  },
];

export const fixtureTopics: Topic[] = [
  {
    _id: "topic-reporting",
    title: "Financial reporting",
    slug: "financial-reporting",
    description: "Making management information useful and timely.",
  },
  {
    _id: "topic-automation",
    title: "Automation",
    slug: "automation",
    description: "Reducing repetitive work with dependable systems.",
  },
];

export const fixturePeople: Person[] = [
  {
    _id: "person-alina-khalid",
    name: "Alina Khalid",
    slug: "alina-khalid",
    role: "Finance Associate",
    bio: "LedgerByte contributor covering practical finance operations for growing businesses.",
    canonicalProfileUrl: "https://ledgerbyte.io/about/team/alina-khalid",
    portrait: { url: "/team/alina-khalid.jpeg", alt: "Alina Khalid" },
  },
  {
    _id: "person-muhammad-ahmad",
    name: "Muhammad Ahmad",
    slug: "muhammad-ahmad",
    role: "CTO",
    credentials: "BSCS",
    bio: "Technology leader focused on reliable products, automation, and scalable systems.",
    canonicalProfileUrl: "https://ledgerbyte.io/about/team/muhammad-ahmad",
    portrait: { url: "/team/muhammad-ahmad.png", alt: "Muhammad Ahmad" },
  },
];

export const fixturePosts: Post[] = [
  {
    _id: "preview-monthly-reporting",
    title: "Why Monthly Financial Reporting Matters",
    slug: "preview-monthly-financial-reporting",
    excerpt:
      "A preview article demonstrating LedgerByte Insights typography, imagery, sources, and editorial structure.",
    category: fixtureCategories[0],
    topics: [fixtureTopics[0]],
    author: fixturePeople[0],
    heroImage: {
      url: "/art/finance-insight.webp",
      alt: "Abstract financial reporting dashboard rendered in LedgerByte amber and graphite",
      caption: "Editorial preview artwork created for LedgerByte Insights.",
    },
    body: [
      block(
        "intro",
        "This preview exists so the site can be reviewed before a Sanity project is connected. It is not a recovered or production-ready finance article.",
      ),
      block("heading-one", "A clear editorial structure", "h2"),
      block(
        "body-one",
        "The production editor supports headings, images, captions, lists, tables, callouts, quotations, code examples, sources, and contextual service links without exposing page-layout controls.",
      ),
      block("heading-two", "Publishing guardrails", "h2"),
      block(
        "body-two",
        "Required metadata, image alternative text, authorship, and category fields are validated before publishing. Finance and compliance content also surfaces source and reviewer warnings.",
      ),
    ],
    sources: [],
    serviceCta: {
      eyebrow: "Financial clarity",
      title: "Build a reporting rhythm your team can use",
      body: "Explore LedgerByte financial reporting and MIS support.",
      label: "Explore reporting services",
      href: "https://ledgerbyte.io/finance/services/financial-reporting-mis",
    },
    featured: true,
    publishedAt: "2026-08-18T12:00:00.000Z",
    seo: { noIndex: true },
    provenance: { recoveryStatus: "local-preview-only" },
  },
  {
    _id: "preview-automation",
    title: "Designing Automation That Teams Can Trust",
    slug: "preview-designing-reliable-automation",
    excerpt:
      "A technology preview showing the second LedgerByte editorial pillar and reusable article components.",
    category: fixtureCategories[1],
    topics: [fixtureTopics[1]],
    author: fixturePeople[1],
    heroImage: {
      url: "/art/technology-insight.webp",
      alt: "Abstract connected workflow nodes in amber light on graphite",
      caption: "Editorial preview artwork created for LedgerByte Insights.",
    },
    body: [
      block(
        "intro",
        "Technology content uses the same restrained editorial system as finance, with optional code blocks and implementation-focused callouts.",
      ),
      block("heading-one", "Keep the workflow understandable", "h2"),
      block(
        "body-one",
        "The blog favors durable explanations, explicit tradeoffs, and accessible diagrams over opaque product claims.",
      ),
    ],
    sources: [],
    serviceCta: {
      eyebrow: "Smart systems",
      title: "Turn repetitive work into a dependable workflow",
      body: "Talk with LedgerByte about AI and automation delivery.",
      label: "Explore automation services",
      href: "https://ledgerbyte.io/technology/services/ai-automation",
    },
    featured: false,
    publishedAt: "2026-08-17T12:00:00.000Z",
    seo: { noIndex: true },
    provenance: { recoveryStatus: "local-preview-only" },
  },
];

export const fixtureSettings: SiteSettings = {
  title: "LedgerByte Insights",
  description:
    "Practical finance and technology insight for growing businesses.",
  socialLinks: [
    {
      label: "LinkedIn",
      href: "https://www.linkedin.com/company/ledger-byte/",
    },
  ],
  defaultCta: {
    eyebrow: "Let’s connect",
    title: "Put clearer finance and smarter systems to work",
    body: "Tell LedgerByte what your business needs next.",
    label: "Start a conversation",
    href: "https://ledgerbyte.io/contact",
  },
};
