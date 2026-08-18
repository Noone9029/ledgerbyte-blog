import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import Image from "next/image";
import Link from "next/link";
import { formatDate, estimateReadingTime } from "@/lib/format";
import { imageUrl } from "@/sanity/image";
import type { Post } from "@/types/content";

export function PostCard({ post, featured = false }: { post: Post; featured?: boolean }) {
  return (
    <article className={featured ? "post-card post-card-featured" : "post-card"}>
      <Link className="post-card-image" href={`/${post.slug}`} aria-label={`Read ${post.title}`}>
        <Image
          src={imageUrl(post.heroImage, 1200)}
          alt=""
          width={1200}
          height={760}
          sizes={featured ? "(max-width: 900px) 100vw, 62vw" : "(max-width: 760px) 100vw, 33vw"}
        />
      </Link>
      <div className="post-card-copy">
        <div className="post-card-meta">
          <Link href={`/category/${post.category.slug}`}>{post.category.title}</Link>
          <span>{formatDate(post.publishedAt)}</span>
          <span>{estimateReadingTime(post.body)} min read</span>
        </div>
        <h2><Link href={`/${post.slug}`}>{post.title}</Link></h2>
        <p>{post.excerpt}</p>
        <Link className="text-link" href={`/${post.slug}`}>
          Read article <ArrowUpRight aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}
