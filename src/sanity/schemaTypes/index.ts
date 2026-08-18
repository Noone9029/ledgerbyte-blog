import { BookIcon, DocumentTextIcon, TagIcon, UserIcon } from "@sanity/icons";
import { defineArrayMember, defineField, defineType } from "sanity";

const slugField = defineField({
  name: "slug",
  title: "URL slug",
  type: "slug",
  options: { source: "title", maxLength: 96 },
  validation: (Rule) => Rule.required(),
});

const linkAnnotation = defineArrayMember({
  name: "link",
  title: "Link",
  type: "object",
  fields: [
    defineField({
      name: "href",
      title: "URL",
      type: "url",
      validation: (Rule) =>
        Rule.required().uri({ allowRelative: true, scheme: ["http", "https", "mailto", "tel"] }),
    }),
  ],
});

const editorialImage = defineType({
  name: "editorialImage",
  title: "Editorial image",
  type: "image",
  options: { hotspot: true },
  fields: [
    defineField({
      name: "alt",
      title: "Alternative text",
      description: "Describe the useful visual information for someone who cannot see the image.",
      type: "string",
      validation: (Rule) => Rule.required().min(8).max(180),
    }),
    defineField({ name: "caption", title: "Caption", type: "string" }),
    defineField({ name: "credit", title: "Credit", type: "string" }),
  ],
  validation: (Rule) => Rule.required(),
});

const callout = defineType({
  name: "callout",
  title: "Callout",
  type: "object",
  fields: [
    defineField({
      name: "tone",
      title: "Tone",
      type: "string",
      options: {
        layout: "radio",
        list: [
          { title: "Note", value: "note" },
          { title: "Important", value: "important" },
          { title: "Caution", value: "caution" },
        ],
      },
      initialValue: "note",
      validation: (Rule) => Rule.required(),
    }),
    defineField({ name: "title", title: "Title", type: "string" }),
    defineField({
      name: "body",
      title: "Text",
      type: "text",
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
  ],
});

const table = defineType({
  name: "editorialTable",
  title: "Table",
  type: "object",
  fields: [
    defineField({ name: "caption", title: "Accessible caption", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "headers", title: "Column headings", type: "array", of: [{ type: "string" }], validation: (Rule) => Rule.required().min(2) }),
    defineField({
      name: "rows",
      title: "Rows",
      type: "array",
      of: [
        defineArrayMember({
          name: "tableRow",
          type: "object",
          fields: [
            defineField({ name: "cells", title: "Cells", type: "array", of: [{ type: "string" }], validation: (Rule) => Rule.required() }),
          ],
          preview: { select: { cells: "cells" }, prepare: ({ cells }) => ({ title: Array.isArray(cells) ? cells.join(" | ") : "Row" }) },
        }),
      ],
    }),
  ],
});

const codeBlock = defineType({
  name: "codeBlock",
  title: "Code example",
  type: "object",
  fields: [
    defineField({ name: "filename", title: "Filename or label", type: "string" }),
    defineField({ name: "language", title: "Language", type: "string", initialValue: "text" }),
    defineField({ name: "code", title: "Code", type: "text", rows: 14, validation: (Rule) => Rule.required() }),
  ],
});

const serviceCta = defineType({
  name: "serviceCta",
  title: "Service call to action",
  type: "object",
  fields: [
    defineField({ name: "eyebrow", title: "Eyebrow", type: "string" }),
    defineField({ name: "title", title: "Title", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "body", title: "Text", type: "text", rows: 3, validation: (Rule) => Rule.required() }),
    defineField({ name: "label", title: "Button label", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "href", title: "Destination", type: "url", validation: (Rule) => Rule.required().uri({ scheme: ["http", "https"] }) }),
  ],
});

const gallery = defineType({
  name: "gallery",
  title: "Image gallery",
  type: "object",
  fields: [
    defineField({ name: "title", title: "Gallery title", type: "string" }),
    defineField({ name: "images", title: "Images", type: "array", of: [{ type: "editorialImage" }], validation: (Rule) => Rule.required().min(2).max(6) }),
  ],
});

const person = defineType({
  name: "person",
  title: "People",
  type: "document",
  icon: UserIcon,
  fields: [
    defineField({ name: "name", title: "Name", type: "string", validation: (Rule) => Rule.required() }),
    slugField,
    defineField({ name: "role", title: "Role", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "credentials", title: "Verified credentials", type: "string", description: "Do not add credentials that have not been verified." }),
    defineField({ name: "bio", title: "Biography", type: "text", rows: 5, validation: (Rule) => Rule.required().min(40) }),
    defineField({ name: "portrait", title: "Portrait", type: "editorialImage" }),
    defineField({ name: "canonicalProfileUrl", title: "Canonical LedgerByte profile", type: "url", validation: (Rule) => Rule.uri({ scheme: ["https"] }) }),
  ],
  preview: { select: { title: "name", subtitle: "role", media: "portrait" } },
});

const category = defineType({
  name: "category",
  title: "Categories",
  type: "document",
  icon: BookIcon,
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (Rule) => Rule.required() }),
    slugField,
    defineField({ name: "description", title: "Description", type: "text", rows: 3, validation: (Rule) => Rule.required() }),
    defineField({ name: "seoTitle", title: "SEO title", type: "string", validation: (Rule) => Rule.max(60).warning("Aim for 60 characters or fewer.") }),
    defineField({ name: "seoDescription", title: "SEO description", type: "text", rows: 3, validation: (Rule) => Rule.max(160).warning("Aim for 160 characters or fewer.") }),
  ],
});

const topic = defineType({
  name: "topic",
  title: "Topics",
  type: "document",
  icon: TagIcon,
  fields: [
    defineField({ name: "title", title: "Title", type: "string", validation: (Rule) => Rule.required() }),
    slugField,
    defineField({ name: "description", title: "Description", type: "text", rows: 3 }),
  ],
});

const post = defineType({
  name: "post",
  title: "Articles",
  type: "document",
  icon: DocumentTextIcon,
  groups: [
    { name: "content", title: "Article", default: true },
    { name: "publishing", title: "Publishing" },
    { name: "seo", title: "SEO" },
    { name: "recovery", title: "Recovery" },
  ],
  fields: [
    defineField({ name: "title", title: "Title", type: "string", group: "content", validation: (Rule) => Rule.required().min(12).max(110) }),
    defineField({ ...slugField, group: "publishing" }),
    defineField({ name: "excerpt", title: "Summary", description: "One clear promise shown on cards and search results.", type: "text", rows: 3, group: "content", validation: (Rule) => Rule.required().min(80).max(220) }),
    defineField({ name: "category", title: "Primary pillar", type: "reference", to: [{ type: "category" }], group: "publishing", validation: (Rule) => Rule.required() }),
    defineField({ name: "topics", title: "Topics", type: "array", of: [{ type: "reference", to: [{ type: "topic" }] }], group: "publishing", validation: (Rule) => Rule.unique().max(5) }),
    defineField({ name: "author", title: "Author", type: "reference", to: [{ type: "person" }], group: "publishing", validation: (Rule) => Rule.required() }),
    defineField({ name: "reviewer", title: "Qualified reviewer", type: "reference", to: [{ type: "person" }], group: "publishing", description: "Strongly recommended for finance, tax, payroll, compliance, or regulatory claims." }),
    defineField({
      name: "editorialReview",
      title: "Launch editorial review",
      type: "object",
      group: "publishing",
      description: "Internal approval record. Notes are never included in public queries.",
      fields: [
        defineField({
          name: "status",
          title: "Status",
          type: "string",
          initialValue: "pending",
          options: {
            layout: "radio",
            list: [
              { title: "Pending review", value: "pending" },
              { title: "Approved", value: "approved" },
              { title: "Changes requested", value: "changes-requested" },
            ],
          },
          validation: (Rule) => Rule.required(),
        }),
        defineField({ name: "reviewedAt", title: "Reviewed at", type: "datetime" }),
        defineField({ name: "notes", title: "Private review notes", type: "text", rows: 5 }),
      ],
      validation: (Rule) => Rule.custom((value) => {
        if (!value || typeof value !== "object") return "A review status is required for launch articles.";
        const review = value as { status?: string; reviewedAt?: string };
        if (review.status === "approved" && !review.reviewedAt) return "Approved articles need a review date.";
        return true;
      }),
    }),
    defineField({ name: "primaryQuery", title: "Primary search query", type: "string", group: "seo", validation: (Rule) => Rule.required().min(8) }),
    defineField({ name: "relatedQueries", title: "Related search queries", type: "array", of: [{ type: "string" }], group: "seo", validation: (Rule) => Rule.required().min(3).max(5).unique() }),
    defineField({ name: "heroImage", title: "Hero image", type: "editorialImage", group: "content", validation: (Rule) => Rule.required() }),
    defineField({
      name: "body",
      title: "Article body",
      type: "array",
      group: "content",
      of: [
        defineArrayMember({
          type: "block",
          styles: [
            { title: "Paragraph", value: "normal" },
            { title: "Heading 2", value: "h2" },
            { title: "Heading 3", value: "h3" },
            { title: "Quote", value: "blockquote" },
          ],
          lists: [
            { title: "Bullets", value: "bullet" },
            { title: "Numbered", value: "number" },
          ],
          marks: { annotations: [linkAnnotation] },
        }),
        defineArrayMember({ type: "editorialImage" }),
        defineArrayMember({ type: "gallery" }),
        defineArrayMember({ type: "callout" }),
        defineArrayMember({ type: "editorialTable" }),
        defineArrayMember({ type: "codeBlock" }),
        defineArrayMember({ type: "serviceCta" }),
      ],
      validation: (Rule) => Rule.required().min(3),
    }),
    defineField({
      name: "sources",
      title: "Sources",
      type: "array",
      group: "publishing",
      description: "Use current primary sources for financial, tax, payroll, compliance, and regulatory claims.",
      of: [
        defineArrayMember({
          type: "object",
          fields: [
            defineField({ name: "label", title: "Source title", type: "string", validation: (Rule) => Rule.required() }),
            defineField({ name: "publisher", title: "Publisher", type: "string" }),
            defineField({ name: "url", title: "URL", type: "url", validation: (Rule) => Rule.required().uri({ scheme: ["https"] }) }),
            defineField({ name: "accessedAt", title: "Checked on", type: "date" }),
          ],
        }),
      ],
      validation: (Rule) => Rule.custom((value) => (Array.isArray(value) && value.length > 0 ? true : "Finance and compliance articles should include current primary sources.")).warning(),
    }),
    defineField({ name: "serviceCta", title: "Related LedgerByte service", type: "serviceCta", group: "content", validation: (Rule) => Rule.required() }),
    defineField({ name: "featured", title: "Feature on homepage", type: "boolean", initialValue: false, group: "publishing" }),
    defineField({ name: "publishedAt", title: "Original publication date", type: "datetime", group: "publishing", validation: (Rule) => Rule.required() }),
    defineField({ name: "updatedAt", title: "Last materially updated", type: "datetime", group: "publishing", validation: (Rule) => Rule.custom((value, context) => {
      const published = context.document?.publishedAt;
      if (!value || typeof published !== "string") return true;
      return new Date(value as string) >= new Date(published) || "Updated date cannot precede publication.";
    }) }),
    defineField({
      name: "seo",
      title: "Search and social",
      type: "object",
      group: "seo",
      validation: (Rule) => Rule.required(),
      fields: [
        defineField({ name: "title", title: "SEO title", type: "string", validation: (Rule) => Rule.required().max(60).warning("Aim for 60 characters or fewer.") }),
        defineField({ name: "description", title: "Meta description", type: "text", rows: 3, validation: (Rule) => Rule.required().min(100).max(160).warning("Aim for 100–160 characters.") }),
        defineField({ name: "canonicalUrl", title: "Canonical override", description: "Leave blank unless this article was first published elsewhere.", type: "url", validation: (Rule) => Rule.uri({ scheme: ["https"] }) }),
        defineField({ name: "noIndex", title: "Hide from search engines", type: "boolean", initialValue: false }),
      ],
    }),
    defineField({
      name: "provenance",
      title: "Legacy recovery evidence",
      type: "object",
      group: "recovery",
      fields: [
        defineField({ name: "originalUrl", title: "Original URL", type: "url" }),
        defineField({ name: "recoverySource", title: "Recovery source", type: "string" }),
        defineField({ name: "recoveryStatus", title: "Recovery status", type: "string", options: { list: ["verified-full", "verified-partial", "unrecoverable", "new"] } }),
        defineField({ name: "notes", title: "Notes", type: "text", rows: 4 }),
      ],
    }),
  ],
  orderings: [{ title: "Publication date", name: "publishedAtDesc", by: [{ field: "publishedAt", direction: "desc" }] }],
  preview: { select: { title: "title", subtitle: "category.title", media: "heroImage" } },
});

const siteSettings = defineType({
  name: "siteSettings",
  title: "Site settings",
  type: "document",
  fields: [
    defineField({ name: "title", title: "Publication title", type: "string", validation: (Rule) => Rule.required() }),
    defineField({ name: "description", title: "Description", type: "text", rows: 3, validation: (Rule) => Rule.required() }),
    defineField({ name: "socialLinks", title: "Social links", type: "array", of: [defineArrayMember({ type: "object", fields: [defineField({ name: "label", title: "Label", type: "string", validation: (Rule) => Rule.required() }), defineField({ name: "href", title: "URL", type: "url", validation: (Rule) => Rule.required() })] })] }),
    defineField({ name: "defaultCta", title: "Default call to action", type: "serviceCta", validation: (Rule) => Rule.required() }),
  ],
});

export const schemaTypes = [
  editorialImage,
  callout,
  table,
  codeBlock,
  serviceCta,
  gallery,
  person,
  category,
  topic,
  post,
  siteSettings,
];
