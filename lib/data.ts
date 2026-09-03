import { MOCK_TOPICS, MOCK_VIDEOS, MOCK_GUIDES, MOCK_APPS, Video, Guide, App } from "./mock-data";
import { MOCK_ARTICLES } from "./mock-articles";
import { Article } from "./types/article";
import { Topic, TopicContentCounts } from "./types/topic";

export type { TopicContentCounts };

/**
 * Data fetching layer.
 * Currently uses local mock data, architected as async functions 
 * so it can be seamlessly swapped out for Supabase in future phases.
 */

// ----------------------------------------------------------------------------
// COUNT CALCULATION HELPERS
// ----------------------------------------------------------------------------

/**
 * Calculates dynamic content counts (articles, videos, guides) for a given topic
 * directly from the local mock dataset without arbitrary hardcoding.
 */
export async function getTopicContentCounts(slug: string): Promise<TopicContentCounts> {
  if (!slug || typeof slug !== "string") {
    return { articles: 0, videos: 0, guides: 0, total: 0 };
  }

  const normalized = slug.trim().toLowerCase();
  const topic = MOCK_TOPICS.find((t) => t.slug.toLowerCase() === normalized);

  // 1. Articles Count: Match explicit topic.articleIds + category + tags (deduplicated by id)
  const matchingArticleIds = new Set<string>();

  if (topic?.articleIds) {
    topic.articleIds.forEach((id) => matchingArticleIds.add(id));
  }

  MOCK_ARTICLES.forEach((article) => {
    if (article.category.toLowerCase() === normalized) {
      matchingArticleIds.add(article.id);
    } else if (article.tags?.some((tag) => tag.toLowerCase() === normalized)) {
      matchingArticleIds.add(article.id);
    }
  });

  const articlesCount = matchingArticleIds.size;

  // 2. Videos Count: Match explicit topic.videoIds + category (deduplicated by id)
  const matchingVideoIds = new Set<string>();

  if (topic?.videoIds) {
    topic.videoIds.forEach((id) => matchingVideoIds.add(id));
  }

  MOCK_VIDEOS.forEach((video) => {
    if (video.category.toLowerCase() === normalized) {
      matchingVideoIds.add(video.id);
    }
  });

  const videosCount = matchingVideoIds.size;

  // 3. Guides Count: Match explicit topic.guideIds + category (deduplicated by id)
  const matchingGuideIds = new Set<string>();

  if (topic?.guideIds) {
    topic.guideIds.forEach((id) => matchingGuideIds.add(id));
  }

  MOCK_GUIDES.forEach((guide) => {
    if (guide.category.toLowerCase() === normalized) {
      matchingGuideIds.add(guide.id);
    }
  });

  const guidesCount = matchingGuideIds.size;

  return {
    articles: articlesCount,
    videos: videosCount,
    guides: guidesCount,
    total: articlesCount + videosCount + guidesCount,
  };
}

export async function getTopicArticleCount(slug: string): Promise<number> {
  const counts = await getTopicContentCounts(slug);
  return counts.articles;
}

export async function getTopicVideoCount(slug: string): Promise<number> {
  const counts = await getTopicContentCounts(slug);
  return counts.videos;
}

export async function getTopicGuideCount(slug: string): Promise<number> {
  const counts = await getTopicContentCounts(slug);
  return counts.guides;
}

export async function getAllArticles(): Promise<Article[]> {
  return MOCK_ARTICLES;
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  if (!slug || typeof slug !== "string" || slug.trim() === "") {
    return null;
  }
  const cleanSlug = slug.trim().toLowerCase();
  return MOCK_ARTICLES.find(a => a.slug.toLowerCase() === cleanSlug) || null;
}

export async function getFeaturedArticles(): Promise<Article[]> {
  return MOCK_ARTICLES.filter(a => a.featured).slice(0, 3);
}

export async function getLatestArticles(): Promise<Article[]> {
  return MOCK_ARTICLES.filter(a => !a.featured).slice(0, 6);
}

// ----------------------------------------------------------------------------
// TOPIC QUERIES
// ----------------------------------------------------------------------------

export async function getAllTopics(): Promise<Topic[]> {
  const topicsWithCounts = await Promise.all(
    MOCK_TOPICS.map(async (topic) => {
      const counts = await getTopicContentCounts(topic.slug);
      return {
        ...topic,
        counts,
      };
    })
  );
  return topicsWithCounts;
}

export async function getFeaturedTopics(): Promise<Topic[]> {
  const all = await getAllTopics();
  return all.filter(t => t.featured);
}

export async function getTopicBySlug(slug: string): Promise<Topic | null> {
  if (!slug || typeof slug !== "string" || slug.trim() === "") {
    return null;
  }
  const cleanSlug = slug.trim().toLowerCase();
  const topic = MOCK_TOPICS.find(t => t.slug.toLowerCase() === cleanSlug);
  if (!topic) return null;

  const counts = await getTopicContentCounts(topic.slug);
  return {
    ...topic,
    counts,
  };
}

export async function getArticlesByTopic(slug: string, limit = 8): Promise<Article[]> {
  const normalized = slug.toLowerCase();
  const topic = MOCK_TOPICS.find(t => t.slug.toLowerCase() === normalized);

  if (topic && topic.articleIds && topic.articleIds.length > 0) {
    const directMatches = MOCK_ARTICLES.filter(a => topic.articleIds.includes(a.id));
    const fallbackCategoryMatches = MOCK_ARTICLES.filter(
      a => !topic.articleIds.includes(a.id) &&
        (a.category.toLowerCase() === normalized || a.tags?.some(t => t.toLowerCase() === normalized))
    );
    return [...directMatches, ...fallbackCategoryMatches].slice(0, limit);
  }

  return MOCK_ARTICLES.filter(
    a => a.category.toLowerCase() === normalized || a.tags?.some(t => t.toLowerCase() === normalized)
  ).slice(0, limit);
}

export async function getTopicFeaturedArticle(topic: Topic): Promise<Article | null> {
  if (topic.featuredArticleId) {
    const article = MOCK_ARTICLES.find(a => a.id === topic.featuredArticleId);
    if (article) return article;
  }
  const topicArticles = await getArticlesByTopic(topic.slug, 1);
  return topicArticles[0] || null;
}

export async function getTopicPopularArticles(topic: Topic, limit = 3): Promise<Article[]> {
  if (topic.popularArticleIds && topic.popularArticleIds.length > 0) {
    const matched = MOCK_ARTICLES.filter(a => topic.popularArticleIds?.includes(a.id));
    if (matched.length > 0) return matched.slice(0, limit);
  }
  const topicArticles = await getArticlesByTopic(topic.slug, limit + 1);
  return topicArticles.filter(a => a.id !== topic.featuredArticleId).slice(0, limit);
}

export async function getVideosByTopic(slug: string, limit = 4): Promise<Video[]> {
  if (!slug || typeof slug !== "string") return [];
  const normalized = slug.trim().toLowerCase();
  const topic = MOCK_TOPICS.find((t) => t.slug.toLowerCase() === normalized);

  const matchedIds = new Set<string>();
  const result: Video[] = [];

  // 1. Explicitly configured videoIds on topic
  if (topic && topic.videoIds && topic.videoIds.length > 0) {
    for (const vidId of topic.videoIds) {
      const v = MOCK_VIDEOS.find(
        (item) => item.id === vidId || item.slug.toLowerCase() === vidId.toLowerCase()
      );
      if (v && !matchedIds.has(v.id)) {
        result.push(v);
        matchedIds.add(v.id);
        if (result.length >= limit) return result;
      }
    }
  }

  // 2. Direct category matches (e.g. video.category === "Health" for /topics/health)
  const categoryMatches = MOCK_VIDEOS.filter(
    (v) => !matchedIds.has(v.id) && v.category?.toLowerCase() === normalized
  );
  for (const v of categoryMatches) {
    result.push(v);
    matchedIds.add(v.id);
    if (result.length >= limit) return result;
  }

  // 3. Topic tags array match (e.g. video.topics includes "health")
  const topicTagMatches = MOCK_VIDEOS.filter(
    (v) =>
      !matchedIds.has(v.id) &&
      Array.isArray(v.topics) &&
      v.topics.some((t) => t.toLowerCase() === normalized)
  );
  for (const v of topicTagMatches) {
    result.push(v);
    matchedIds.add(v.id);
    if (result.length >= limit) return result;
  }

  return result.slice(0, limit);
}

export async function getGuidesByTopic(slug: string, limit = 2): Promise<Guide[]> {
  const normalized = slug.toLowerCase();
  const topic = MOCK_TOPICS.find(t => t.slug.toLowerCase() === normalized);

  if (topic && topic.guideIds && topic.guideIds.length > 0) {
    const matched = MOCK_GUIDES.filter(g => topic.guideIds.includes(g.id));
    if (matched.length > 0) return matched.slice(0, limit);
  }

  const categoryMatches = MOCK_GUIDES.filter(g => g.category.toLowerCase() === normalized);
  if (categoryMatches.length > 0) return categoryMatches.slice(0, limit);
  return MOCK_GUIDES.slice(0, limit);
}

// ----------------------------------------------------------------------------
// MEDIA & APP QUERIES
// ----------------------------------------------------------------------------

export async function getAllVideos(): Promise<Video[]> {
  return [...MOCK_VIDEOS];
}

export async function getVideoBySlug(slug: string): Promise<Video | undefined> {
  const normalized = slug.toLowerCase();
  return MOCK_VIDEOS.find(v => v.slug.toLowerCase() === normalized);
}

export async function getVideoById(id: string): Promise<Video | undefined> {
  return MOCK_VIDEOS.find(v => v.id === id);
}

export async function getFeaturedVideo(): Promise<Video> {
  return MOCK_VIDEOS.find(v => v.featured) || MOCK_VIDEOS[0];
}

export async function getLatestVideos(limit = 4, excludeSlug?: string): Promise<Video[]> {
  return MOCK_VIDEOS
    .filter(v => v.slug !== excludeSlug)
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
    .slice(0, limit);
}

function parseViewCount(views?: string | number): number {
  if (!views) return 0;
  if (typeof views === "number") return views;
  const str = views.toString().trim().toUpperCase();
  if (str.endsWith("M")) return parseFloat(str) * 1_000_000;
  if (str.endsWith("K")) return parseFloat(str) * 1_000;
  return parseFloat(str) || 0;
}

export async function getPopularVideos(limit = 4, excludeSlug?: string): Promise<Video[]> {
  return [...MOCK_VIDEOS]
    .filter(v => v.slug !== excludeSlug)
    .sort((a, b) => parseViewCount(b.views) - parseViewCount(a.views))
    .slice(0, limit);
}

export async function getRelatedVideosForVideo(video: Video, limit = 4): Promise<Video[]> {
  const result: Video[] = [];
  const addedSlugs = new Set<string>();
  const currentSlug = video.slug.toLowerCase();
  addedSlugs.add(currentSlug);

  // 1. Explicitly configured related video IDs on the video
  if (video.relatedVideoIds && video.relatedVideoIds.length > 0) {
    for (const idOrSlug of video.relatedVideoIds) {
      const match = MOCK_VIDEOS.find(
        v => (v.id === idOrSlug || v.slug.toLowerCase() === idOrSlug.toLowerCase()) &&
             v.slug.toLowerCase() !== currentSlug
      );
      if (match && !addedSlugs.has(match.slug.toLowerCase())) {
        result.push(match);
        addedSlugs.add(match.slug.toLowerCase());
        if (result.length >= limit) return result;
      }
    }
  }

  // 2. Matching category or topic overlaps
  const categoryOrTopicMatched = MOCK_VIDEOS.filter(v => {
    if (addedSlugs.has(v.slug.toLowerCase())) return false;
    const sameCat = v.category?.toLowerCase() === video.category?.toLowerCase();
    const tagMatch = v.topics?.some(topic =>
      video.topics?.some(t => t.toLowerCase() === topic.toLowerCase())
    );
    return sameCat || tagMatch;
  });

  for (const v of categoryOrTopicMatched) {
    result.push(v);
    addedSlugs.add(v.slug.toLowerCase());
    if (result.length >= limit) return result;
  }

  // 3. General fallback if still under limit
  for (const v of MOCK_VIDEOS) {
    if (!addedSlugs.has(v.slug.toLowerCase())) {
      result.push(v);
      addedSlugs.add(v.slug.toLowerCase());
      if (result.length >= limit) return result;
    }
  }

  return result.slice(0, limit);
}

export async function getGuides(limit = 4): Promise<Guide[]> {
  return MOCK_GUIDES.slice(0, limit);
}

export async function getApps(limit = 3): Promise<App[]> {
  return MOCK_APPS.slice(0, limit);
}

export async function getRelatedArticles(slugsOrIds: string[], currentSlug?: string, limit = 3): Promise<Article[]> {
  if (slugsOrIds && slugsOrIds.length > 0) {
    const matched = MOCK_ARTICLES.filter(
      a => (slugsOrIds.includes(a.slug) || slugsOrIds.includes(a.id)) && a.slug !== currentSlug
    );
    if (matched.length > 0) {
      return matched.slice(0, limit);
    }
  }
  return MOCK_ARTICLES.filter(a => a.slug !== currentSlug).slice(0, limit);
}

export async function getRelatedArticlesForVideo(video: Video, limit = 3): Promise<Article[]> {
  const result: Article[] = [];
  const addedSlugs = new Set<string>();

  // 1. Explicitly configured related article IDs or slugs on the video
  if (video.relatedArticleIds && video.relatedArticleIds.length > 0) {
    for (const idOrSlug of video.relatedArticleIds) {
      const match = MOCK_ARTICLES.find(a => a.id === idOrSlug || a.slug === idOrSlug);
      if (match && !addedSlugs.has(match.slug)) {
        result.push(match);
        addedSlugs.add(match.slug);
        if (result.length >= limit) return result;
      }
    }
  }

  // 2. Matching category or topic overlaps
  const categoryMatched = MOCK_ARTICLES.filter(a => {
    if (addedSlugs.has(a.slug)) return false;
    const sameCat = a.category?.toLowerCase() === video.category?.toLowerCase();
    const tagMatch = a.tags?.some(tag =>
      video.topics?.some(t => t.toLowerCase() === tag.toLowerCase())
    );
    return sameCat || tagMatch;
  });

  for (const article of categoryMatched) {
    result.push(article);
    addedSlugs.add(article.slug);
    if (result.length >= limit) return result;
  }

  // 3. General fallback if still under limit
  for (const article of MOCK_ARTICLES) {
    if (!addedSlugs.has(article.slug)) {
      result.push(article);
      addedSlugs.add(article.slug);
      if (result.length >= limit) return result;
    }
  }

  return result.slice(0, limit);
}
