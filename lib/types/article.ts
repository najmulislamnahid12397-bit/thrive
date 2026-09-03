export interface AuthorSocialLinks {
  twitter?: string;
  linkedin?: string;
  website?: string;
  github?: string;
  instagram?: string;
}

export interface Author {
  name: string;
  avatar: string;
  role?: string;
  bio?: string;
  social?: AuthorSocialLinks;
}

export interface ParagraphSection {
  type: "paragraph";
  text: string;
}

export interface HeadingSection {
  type: "heading";
  level: 2 | 3 | 4;
  text: string;
}

export interface ArticleImage {
  type: "image";
  src: string;
  alt: string;
  caption?: string;
  credit?: string;
  layout?: "full" | "wide" | "column";
}

export interface QuoteSection {
  type: "quote";
  text: string;
  author?: string;
  role?: string;
  isPullQuote?: boolean;
}

export interface ListSection {
  type: "list";
  style: "ordered" | "unordered";
  items: string[];
}

export interface CalloutSection {
  type: "callout";
  intent?: "info" | "warning" | "neutral";
  title?: string;
  text: string;
}

export type ArticleSection =
  | ParagraphSection
  | HeadingSection
  | ArticleImage
  | QuoteSection
  | ListSection
  | CalloutSection;

export interface RelatedArticle {
  slug: string;
  title: string;
  category: string;
  heroImage: string;
  readingTime: number;
}

export interface Article {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  category: string;
  tags: string[];
  author: Author;
  publishedAt: string;
  updatedAt?: string;
  readingTime: number;
  heroImage: string;
  heroImageAlt: string;
  heroCaption?: string;
  heroImageCredit?: string;
  featured: boolean;
  sections: ArticleSection[];
  relatedArticles?: string[];
}
