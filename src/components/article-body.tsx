import { PortableText, type PortableTextComponents } from "@portabletext/react";
import Link from "next/link";
import { EditorialImage } from "@/components/editorial-image";
import { headingId } from "@/lib/format";
import type { PortableBlock, ServiceCta } from "@/types/content";

const components: PortableTextComponents = {
  block: {
    h2: ({ children, value }) => <h2 id={headingId(value as PortableBlock)}>{children}</h2>,
    h3: ({ children, value }) => <h3 id={headingId(value as PortableBlock)}>{children}</h3>,
    blockquote: ({ children }) => <blockquote>{children}</blockquote>,
  },
  marks: {
    link: ({ children, value }) => {
      const href = typeof value?.href === "string" ? value.href : "#";
      const external = href.startsWith("http");
      return external ? (
        <a href={href} rel="noreferrer">{children}</a>
      ) : (
        <Link href={href}>{children}</Link>
      );
    },
  },
  types: {
    editorialImage: ({ value }) => <EditorialImage image={value} />,
    image: ({ value }) => <EditorialImage image={value} />,
    callout: ({ value }) => (
      <aside className="article-callout" data-tone={value.tone || "note"}>
        {value.title && <strong>{value.title}</strong>}
        <p>{value.body}</p>
      </aside>
    ),
    codeBlock: ({ value }) => (
      <figure className="code-block">
        {value.filename && <figcaption>{value.filename}</figcaption>}
        <pre><code data-language={value.language || "text"}>{value.code}</code></pre>
      </figure>
    ),
    editorialTable: ({ value }) => (
      <div className="table-scroll">
        <table>
          <caption>{value.caption}</caption>
          <thead><tr>{(value.headers || []).map((header: string) => <th scope="col" key={header}>{header}</th>)}</tr></thead>
          <tbody>{(value.rows || []).map((row: { _key?: string; cells?: string[] }, index: number) => (
            <tr key={row._key || index}>{(row.cells || []).map((cell, cellIndex) => <td key={`${index}-${cellIndex}`}>{cell}</td>)}</tr>
          ))}</tbody>
        </table>
      </div>
    ),
    gallery: ({ value }) => (
      <section className="article-gallery" aria-label={value.title || "Image gallery"}>
        {value.title && <h2>{value.title}</h2>}
        <div>{(value.images || []).map((image: { _key?: string; alt: string }, index: number) => <EditorialImage image={image} key={image._key || index} />)}</div>
      </section>
    ),
    serviceCta: ({ value }: { value: ServiceCta }) => <InlineCta cta={value} />,
  },
};

function InlineCta({ cta }: { cta: ServiceCta }) {
  return (
    <aside className="inline-cta">
      {cta.eyebrow && <p className="eyebrow">{cta.eyebrow}</p>}
      <h2>{cta.title}</h2>
      <p>{cta.body}</p>
      <a className="button button-amber" href={cta.href}>{cta.label}</a>
    </aside>
  );
}

export function ArticleBody({ value }: { value: PortableBlock[] }) {
  return <PortableText value={value} components={components} />;
}

export { InlineCta };
