export interface VideoAuthor {
  id: string;
  name: string;
  role?: string;
  avatar: string;
  bio?: string;
}

export interface VideoChapter {
  id: string;
  title: string;
  startTime: number; // in seconds (e.g. 0, 75, 240)
  formattedTime?: string; // formatted representation (e.g. "01:15")
  description?: string;
}

export interface VideoTranscript {
  speaker: string;
  timestamp: string; // formatted timestamp (e.g. "00:18")
  text: string;
  startTime?: number; // in seconds for interactive timeline scrubbing
}

export interface VideoThumbnail {
  src: string;
  alt: string;
  width?: number;
  height?: number;
}

export interface Video {
  id: string;
  slug: string;
  title: string;
  description: string;
  shortDescription: string;
  category: string;
  topics: string[];
  author: VideoAuthor;
  publishedAt: string;
  updatedAt?: string;
  duration: string; // formatted duration, e.g. "14:30"
  thumbnail: string;
  thumbnailAlt: string;
  videoUrl: string; // placeholder or sample video streaming URL
  featured: boolean;
  chapters?: VideoChapter[];
  transcript?: VideoTranscript[];
  relatedArticleIds?: string[];
  relatedVideoIds?: string[];
  views?: string | number;
}
