export const AUTHOR_ID = "person-alina-khalid";

export const reviewers = {
  haider: "person-haider-ali",
  sayyam: "person-sayyam-nasir",
  faisal: "person-faisal-nawaz",
  amir: "person-amir-ilyas",
  muhammad: "person-muhammad-ahmad",
};

export const categories = {
  Finance: "category-finance",
  Technology: "category-technology",
};

export const topicIds = {
  finance: ["topic-sme-finance", "topic-risk-controls"],
  reporting: ["topic-financial-reporting", "topic-risk-controls"],
  automation: ["topic-automation", "topic-risk-controls"],
  ai: ["topic-ai-governance", "topic-automation"],
  infrastructure: ["topic-digital-infrastructure", "topic-risk-controls"],
};

export const source = (label, publisher, url) => ({
  label,
  publisher,
  url,
  accessedAt: "2026-08-18",
});

export const section = (heading, paragraphs) => ({ heading, paragraphs });
export const faq = (question, answer) => ({ question, answer });
export const table = (caption, headers, rows) => ({ caption, headers, rows });

export const serviceCtas = {
  fractionalCfo: {
    eyebrow: "Finance leadership",
    title: "Turn uncertainty into an operating plan",
    body: "LedgerByte fractional CFO support connects cash, funding, risk, and management decisions in one practical cadence.",
    label: "Explore fractional CFO support",
    href: "https://ledgerbyte.io/finance/services/fractional-cfo-advisory",
  },
  cashFlow: {
    eyebrow: "Working capital",
    title: "Build a clearer view of cash",
    body: "LedgerByte helps growing businesses improve cash forecasting, working-capital routines, and liquidity decisions.",
    label: "Explore cash flow support",
    href: "https://ledgerbyte.io/finance/services/cash-flow-working-capital",
  },
  forecasting: {
    eyebrow: "Planning and forecasting",
    title: "Make the next thirteen weeks visible",
    body: "LedgerByte can help your team build practical budgets, rolling forecasts, and decision-ready scenarios.",
    label: "Explore forecasting support",
    href: "https://ledgerbyte.io/finance/services/budgeting-forecasting",
  },
  accountingAutomation: {
    eyebrow: "Finance systems",
    title: "Automate the routine without losing control",
    body: "LedgerByte designs accounting workflows that preserve approvals, evidence, ownership, and reliable reporting.",
    label: "Explore accounting automation",
    href: "https://ledgerbyte.io/finance/services/accounting-automation-systems",
  },
  accounting: {
    eyebrow: "Dependable books",
    title: "Strengthen the controls behind every payment",
    body: "LedgerByte supports accurate bookkeeping, reconciliations, and finance controls for growing businesses.",
    label: "Explore accounting support",
    href: "https://ledgerbyte.io/finance/services/accounting-bookkeeping",
  },
  reporting: {
    eyebrow: "Decision-ready reporting",
    title: "Connect sustainability information to management reporting",
    body: "LedgerByte helps teams design reporting processes, evidence trails, and management information that leaders can use.",
    label: "Explore reporting and MIS",
    href: "https://ledgerbyte.io/finance/services/financial-reporting-mis",
  },
  tax: {
    eyebrow: "Tax operations",
    title: "Prepare finance systems for digital reporting",
    body: "LedgerByte supports practical tax, VAT, and compliance workflows while your qualified advisers determine jurisdiction-specific obligations.",
    label: "Explore tax and VAT support",
    href: "https://ledgerbyte.io/finance/services/tax-vat-compliance",
  },
  ai: {
    eyebrow: "Applied AI",
    title: "Put useful automation behind accountable teams",
    body: "LedgerByte designs AI-assisted workflows with clear ownership, controls, measurement, and human decision points.",
    label: "Explore AI and automation",
    href: "https://ledgerbyte.io/technology/services/ai-automation",
  },
  backend: {
    eyebrow: "Connected systems",
    title: "Build reliable interfaces for modern business software",
    body: "LedgerByte develops secure backends and APIs that connect products, data, identity, and automation.",
    label: "Explore backend and API services",
    href: "https://ledgerbyte.io/technology/services/backend-apis",
  },
  cloud: {
    eyebrow: "Cloud operations",
    title: "Make cloud systems resilient, measurable, and portable",
    body: "LedgerByte helps teams improve cloud architecture, delivery, observability, cost control, and recovery readiness.",
    label: "Explore cloud and DevOps",
    href: "https://ledgerbyte.io/technology/services/cloud-devops",
  },
};

export function defineArticle(article) {
  return {
    authorId: AUTHOR_ID,
    featured: false,
    noIndex: false,
    editorialReview: { status: "pending", reviewedAt: null, notes: "Awaiting the named reviewer's decision." },
    provenance: {
      recoveryStatus: "new",
      recoverySource: "LedgerByte 20-article global trends launch",
      notes: "Original educational article researched from the listed primary sources on 2026-08-18.",
    },
    ...article,
  };
}

export function articleWordCount(article) {
  const visibleDisclaimer = article.category === "Finance"
    ? "This article provides general educational information, not personalized legal, tax, accounting, investment, or regulatory advice. Requirements and risks differ by jurisdiction and business. Consult appropriately qualified advisers before acting."
    : "This article provides general educational information, not legal, cybersecurity, procurement, or architecture advice for a specific organization. Assess your systems, obligations, and risk with appropriately qualified specialists.";
  const text = [
    article.directAnswer,
    ...article.sections.flatMap((item) => [item.heading, ...item.paragraphs]),
    article.table.caption,
    ...article.table.headers,
    ...article.table.rows.flat(),
    ...article.faqs.flatMap((item) => [item.question, item.answer]),
    visibleDisclaimer,
  ].join(" ");
  return (text.match(/[\p{L}\p{N}][\p{L}\p{N}’'\-]*/gu) || []).length;
}
