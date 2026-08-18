export const imageProjection = `{
  ...,
  asset->{
    _ref,
    url,
    metadata{
      lqip,
      dimensions{width,height,aspectRatio}
    }
  }
}`;

export const personProjection = `{
  _id,
  name,
  "slug": slug.current,
  role,
  credentials,
  bio,
  canonicalProfileUrl,
  "portrait": portrait ${imageProjection}
}`;

export const categoryProjection = `{
  _id,
  title,
  "slug": slug.current,
  description,
  seoTitle,
  seoDescription
}`;

export const topicProjection = `{
  _id,
  title,
  "slug": slug.current,
  description
}`;

export const postProjection = `{
  _id,
  title,
  "slug": slug.current,
  excerpt,
  "category": category->${categoryProjection},
  "topics": topics[]->${topicProjection},
  "author": author->${personProjection},
  "reviewer": reviewer->${personProjection},
  editorialReview{status,reviewedAt},
  primaryQuery,
  relatedQueries,
  "heroImage": heroImage ${imageProjection},
  body[]{
    ...,
    _type == "image" => { ..., asset->{url,metadata{lqip,dimensions}} },
    _type == "gallery" => { ..., images[]{ ..., asset->{url,metadata{lqip,dimensions}} } }
  },
  sources,
  serviceCta,
  featured,
  publishedAt,
  updatedAt,
  seo,
  provenance
}`;

export const allPostsQuery = `*[_type == "post" && defined(slug.current)] | order(publishedAt desc) ${postProjection}`;
export const postBySlugQuery = `*[_type == "post" && slug.current == $slug][0] ${postProjection}`;
export const categoriesQuery = `*[_type == "category"] | order(title asc) ${categoryProjection}`;
export const topicsQuery = `*[_type == "topic"] | order(title asc) ${topicProjection}`;
export const peopleQuery = `*[_type == "person"] | order(name asc) ${personProjection}`;
export const settingsQuery = `*[_type == "siteSettings"][0]{
  title,
  description,
  socialLinks,
  defaultCta
}`;
