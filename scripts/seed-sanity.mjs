import { createClient } from "next-sanity";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_API_WRITE_TOKEN;
if (!projectId || !token) throw new Error("Set NEXT_PUBLIC_SANITY_PROJECT_ID and SANITY_API_WRITE_TOKEN before seeding.");

const client = createClient({ projectId, dataset, token, apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2026-08-01", useCdn: false });
const documents = [
  { _id: "category-finance", _type: "category", title: "Finance", slug: { _type: "slug", current: "finance" }, description: "Reporting, controls, cash flow, compliance, and financial leadership for growing businesses.", seoTitle: "Finance Insights", seoDescription: "Practical reporting, cash flow, controls, compliance, and financial leadership guidance for growing businesses." },
  { _id: "category-technology", _type: "category", title: "Technology", slug: { _type: "slug", current: "technology" }, description: "Practical guidance on software, cloud infrastructure, automation, and product delivery.", seoTitle: "Technology Insights", seoDescription: "Practical software, cloud, automation, and product-delivery guidance for growing businesses." },
  { _id: "topic-financial-reporting", _type: "topic", title: "Financial reporting", slug: { _type: "slug", current: "financial-reporting" }, description: "Making management information useful and timely." },
  { _id: "topic-automation", _type: "topic", title: "Automation", slug: { _type: "slug", current: "automation" }, description: "Reducing repetitive work with dependable systems." },
  { _id: "person-alina-khalid", _type: "person", name: "Alina Khalid", slug: { _type: "slug", current: "alina-khalid" }, role: "Finance Associate", bio: "LedgerByte contributor covering practical finance operations for growing businesses.", canonicalProfileUrl: "https://ledgerbyte.io/about/team/alina-khalid" },
  { _id: "person-muhammad-ahmad", _type: "person", name: "Muhammad Ahmad", slug: { _type: "slug", current: "muhammad-ahmad" }, role: "CTO", credentials: "BSCS", bio: "Technology leader focused on reliable products, automation, and scalable systems.", canonicalProfileUrl: "https://ledgerbyte.io/about/team/muhammad-ahmad" },
  { _id: "site-settings", _type: "siteSettings", title: "LedgerByte Insights", description: "Practical finance and technology insight for growing businesses.", socialLinks: [{ _key: "linkedin", label: "LinkedIn", href: "https://www.linkedin.com/company/ledger-byte/" }], defaultCta: { _type: "serviceCta", eyebrow: "Let’s connect", title: "Put clearer finance and smarter systems to work", body: "Tell LedgerByte what your business needs next.", label: "Start a conversation", href: "https://ledgerbyte.io/contact" } },
];

let transaction = client.transaction();
for (const document of documents) transaction = transaction.createIfNotExists(document);
const result = await transaction.commit();
console.log(`Seeded ${result.results.length} foundational Sanity documents.`);
