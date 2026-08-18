import crypto from "node:crypto";

function key(seed) {
  return crypto.createHash("sha1").update(seed).digest("hex").slice(0, 12);
}

function block(articleSlug, seed, text, style = "normal") {
  const blockKey = key(`${articleSlug}:${seed}`);
  return {
    _key: blockKey,
    _type: "block",
    style,
    markDefs: [],
    children: [{ _key: key(`${blockKey}:span`), _type: "span", text, marks: [] }],
  };
}

export function toPortableText(article, imageAssets = {}) {
  const body = [block(article.slug, "direct-answer", article.directAnswer)];
  for (const [sectionIndex, item] of article.sections.entries()) {
    body.push(block(article.slug, `heading-${sectionIndex}`, item.heading, "h2"));
    item.paragraphs.forEach((paragraph, paragraphIndex) => {
      body.push(block(article.slug, `section-${sectionIndex}-${paragraphIndex}`, paragraph));
    });
    if (article.inlineDiagram && article.inlineDiagram.afterSection === sectionIndex + 1 && imageAssets.diagram) {
      body.push({
        _key: key(`${article.slug}:diagram`),
        _type: "editorialImage",
        ...(imageAssets.diagram._id ? { asset: { _type: "reference", _ref: imageAssets.diagram._id } } : {}),
        ...(imageAssets.diagram.url ? { url: imageAssets.diagram.url } : {}),
        alt: article.inlineDiagram.alt,
        caption: article.inlineDiagram.caption,
        credit: "Original LedgerByte illustration",
      });
    }
  }
  body.push({
    _key: key(`${article.slug}:table`),
    _type: "editorialTable",
    caption: article.table.caption,
    headers: article.table.headers,
    rows: article.table.rows.map((cells, rowIndex) => ({
      _key: key(`${article.slug}:table:${rowIndex}`),
      _type: "tableRow",
      cells,
    })),
  });
  body.push(block(article.slug, "faq-heading", "Frequently asked questions", "h2"));
  article.faqs.forEach((item, index) => {
    body.push(block(article.slug, `faq-question-${index}`, item.question, "h3"));
    body.push(block(article.slug, `faq-answer-${index}`, item.answer));
  });
  body.push({
    _key: key(`${article.slug}:disclaimer`),
    _type: "callout",
    tone: "caution",
    title: "Educational information only",
    body: article.category === "Finance"
      ? "This article provides general educational information, not personalized legal, tax, accounting, investment, or regulatory advice. Requirements and risks differ by jurisdiction and business. Consult appropriately qualified advisers before acting."
      : "This article provides general educational information, not legal, cybersecurity, procurement, or architecture advice for a specific organization. Assess your systems, obligations, and risk with appropriately qualified specialists.",
  });
  return body;
}

export function toSanityDocument(article, imageAssets) {
  return {
    _id: `drafts.launch-${article.slug}`,
    _type: "post",
    title: article.title,
    slug: { _type: "slug", current: article.slug },
    excerpt: article.excerpt,
    category: { _type: "reference", _ref: article.categoryId },
    topics: article.topicIds.map((id) => ({ _key: key(`${article.slug}:${id}`), _type: "reference", _ref: id })),
    author: { _type: "reference", _ref: article.authorId },
    reviewer: { _type: "reference", _ref: article.reviewerId },
    editorialReview: article.editorialReview,
    primaryQuery: article.primaryQuery,
    relatedQueries: article.relatedQueries,
    heroImage: {
      _type: "editorialImage",
      asset: { _type: "reference", _ref: imageAssets.hero._id },
      alt: article.hero.alt,
      caption: article.hero.caption,
      credit: "Original LedgerByte illustration",
    },
    body: toPortableText(article, imageAssets),
    sources: article.sources.map((item, index) => ({ ...item, _key: key(`${article.slug}:source:${index}`) })),
    serviceCta: { _type: "serviceCta", ...article.serviceCta },
    featured: article.featured,
    publishedAt: article.plannedPublishedAt,
    seo: {
      title: article.seoTitle,
      description: article.seoDescription,
      noIndex: false,
    },
    provenance: article.provenance,
  };
}
