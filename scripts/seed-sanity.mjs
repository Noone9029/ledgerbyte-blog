import { createClient } from "next-sanity";
import fs from "node:fs";
import path from "node:path";

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
  { _id: "topic-sme-finance", _type: "topic", title: "SME finance", slug: { _type: "slug", current: "sme-finance" }, description: "Funding, liquidity, payments, and financial resilience for SMEs." },
  { _id: "topic-risk-controls", _type: "topic", title: "Risk and controls", slug: { _type: "slug", current: "risk-controls" }, description: "Practical safeguards for finance and technology operations." },
  { _id: "topic-ai-governance", _type: "topic", title: "AI governance", slug: { _type: "slug", current: "ai-governance" }, description: "Using AI with accountable decisions, measured value, and human control." },
  { _id: "topic-digital-infrastructure", _type: "topic", title: "Digital infrastructure", slug: { _type: "slug", current: "digital-infrastructure" }, description: "Open standards, cloud portability, identity, and resilient systems." },
  { _id: "person-alina-khalid", _type: "person", name: "Alina Khalid", slug: { _type: "slug", current: "alina-khalid" }, role: "Communications Manager", credentials: "BS (Hons.) in Management Sciences (Marketing), MPhil in Development Studies", bio: "LedgerByte Communications Manager translating finance and technology research into practical guidance for growing businesses.", canonicalProfileUrl: "https://ledgerbyte.io/about/team/alina-khalid" },
  { _id: "person-haider-ali", _type: "person", name: "Haider Ali", slug: { _type: "slug", current: "haider-ali" }, role: "Managing Partner", credentials: "ACMA, CGMA", bio: "LedgerByte Managing Partner with more than 13 years of finance leadership experience across Pakistan and the GCC.", canonicalProfileUrl: "https://ledgerbyte.io/about/team/haider-ali" },
  { _id: "person-sayyam-nasir", _type: "person", name: "Sayyam Nasir", slug: { _type: "slug", current: "sayyam-nasir" }, role: "Reporting Manager", credentials: "ACCA", bio: "LedgerByte Reporting Manager focused on management reporting, planning, and decision-ready financial information.", canonicalProfileUrl: "https://ledgerbyte.io/about/team/sayyam-nasir" },
  { _id: "person-faisal-nawaz", _type: "person", name: "Faisal Nawaz", slug: { _type: "slug", current: "faisal-nawaz" }, role: "Head of Accounting", credentials: "FCA", bio: "LedgerByte Head of Accounting focused on dependable reporting, controls, and finance operations for growing businesses.", canonicalProfileUrl: "https://ledgerbyte.io/about/team/faisal-nawaz" },
  { _id: "person-amir-ilyas", _type: "person", name: "Amir Ilyas", slug: { _type: "slug", current: "amir-ilyas" }, role: "Senior Tax Consultant", credentials: "FCCA | 12+ years of experience in KSA Accounting & Taxation", bio: "LedgerByte Senior Tax Consultant focused on accounting and tax operations, with more than 12 years of experience in Saudi Arabia.", canonicalProfileUrl: "https://ledgerbyte.io/about/team/amir-ilyas" },
  { _id: "person-muhammad-ahmad", _type: "person", name: "Muhammad Ahmad", slug: { _type: "slug", current: "muhammad-ahmad" }, role: "CTO", credentials: "BSCS", bio: "LedgerByte technology leader focused on reliable products, automation, and scalable systems.", canonicalProfileUrl: "https://ledgerbyte.io/about/team/muhammad-ahmad" },
  { _id: "site-settings", _type: "siteSettings", title: "LedgerByte Insights", description: "Practical finance and technology insight for growing businesses.", socialLinks: [{ _key: "linkedin", label: "LinkedIn", href: "https://www.linkedin.com/company/ledger-byte/" }], defaultCta: { _type: "serviceCta", eyebrow: "Let’s connect", title: "Put clearer finance and smarter systems to work", body: "Tell LedgerByte what your business needs next.", label: "Start a conversation", href: "https://ledgerbyte.io/contact" } },
];

const portraitFiles = {
  "person-alina-khalid": "alina-khalid.jpeg",
  "person-haider-ali": "haider-ali.jpg",
  "person-sayyam-nasir": "sayyam-nasir.jpeg",
  "person-faisal-nawaz": "faisal-nawaz.png",
  "person-amir-ilyas": "amir-ilyas.jpg",
  "person-muhammad-ahmad": "muhammad-ahmad.png",
};

for (const document of documents) {
  const portraitFilename = portraitFiles[document._id];
  if (!portraitFilename) continue;
  const existing = await client.fetch(`*[_type == "sanity.imageAsset" && originalFilename == $filename][0]{_id}`, { filename: portraitFilename });
  const asset = existing || await client.assets.upload(
    "image",
    fs.createReadStream(path.join(process.cwd(), "public", "team", portraitFilename)),
    { filename: portraitFilename },
  );
  document.portrait = {
    _type: "editorialImage",
    asset: { _type: "reference", _ref: asset._id },
    alt: document.name,
    credit: "Authorized LedgerByte team portrait",
  };
}

let transaction = client.transaction();
for (const document of documents) transaction = transaction.createOrReplace(document);
const result = await transaction.commit();
console.log(`Seeded ${result.results.length} foundational Sanity documents.`);
