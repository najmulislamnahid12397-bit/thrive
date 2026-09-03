export interface TopicSection {
  id: string;
  title: string;
  description?: string;
  type: "featured" | "latest" | "popular" | "videos" | "guides" | "articles";
  itemIds?: string[];
}

export interface TopicMetadata {
  title: string;
  description: string;
  keywords?: string[];
  canonicalUrl?: string;
  ogImage?: string;
}

export interface TopicContentCounts {
  articles: number;
  videos: number;
  guides: number;
  total?: number;
}

export interface Topic {
  id: string;
  slug: string;
  name: string;
  description: string;
  shortDescription: string;
  image: string;
  accentColor?: string; // Hex or design token color class
  featured: boolean;
  order?: number;
  articleIds: string[];
  videoIds: string[];
  guideIds: string[];
  featuredArticleId?: string;
  popularArticleIds?: string[];
  sections?: TopicSection[];
  metadata?: TopicMetadata;
  counts?: TopicContentCounts;
}
