import { Topic } from "./types/topic";
import { Video, VideoAuthor, VideoChapter, VideoTranscript, VideoThumbnail } from "./types/video";
import { MOCK_VIDEOS } from "./mock-videos";

export interface Author {
  id: string;
  name: string;
  avatar: string;
  role?: string;
}

export type { Topic, Video, VideoAuthor, VideoChapter, VideoTranscript, VideoThumbnail };

export interface Guide {
  id: string;
  slug: string;
  title: string;
  description: string;
  cover: string;
  pages: number;
  category: string;
  publishedAt: string;
}

export interface App {
  id: string;
  slug: string;
  name: string;
  description: string;
  icon: string;
  screenshot: string;
  category: string;
  platform: string[]; // e.g., ["iOS", "Android", "Web"]
}

// ----------------------------------------------------------------------------
// MOCK DATA
// ----------------------------------------------------------------------------

export const MOCK_AUTHORS: Record<string, Author> = {
  sarah: {
    id: "a1",
    name: "Dr. Sarah Chen",
    avatar: "https://picsum.photos/seed/sarah/200/200",
    role: "Senior Science Editor",
  },
  marcus: {
    id: "a2",
    name: "Marcus Thorne",
    avatar: "https://picsum.photos/seed/marcus/200/200",
    role: "Technology Correspondent",
  },
  elena: {
    id: "a3",
    name: "Elena Rostova",
    avatar: "https://picsum.photos/seed/elena/200/200",
    role: "Culture Analyst",
  },
  james: {
    id: "a4",
    name: "James Lin",
    avatar: "https://picsum.photos/seed/james/200/200",
    role: "Psychology Writer",
  },
};

export const MOCK_TOPICS: Topic[] = [
  {
    id: "t1",
    slug: "health",
    name: "Health",
    description: "Understanding human physiology, metabolic wellness, circadian science, and evidence-based longevity protocols.",
    shortDescription: "Physiology, longevity protocols, sleep science, and cellular energy.",
    image: "https://picsum.photos/seed/circadian/1600/900",
    accentColor: "emerald",
    featured: true,
    order: 1,
    articleIds: ["art-7", "art-8", "art-9", "art-10"],
    videoIds: ["vid-4"],
    guideIds: ["guide-3"],
    featuredArticleId: "art-7",
    popularArticleIds: ["art-8", "art-10", "art-9"],
    sections: [
      { id: "sec-h-1", title: "Circadian Rhythms & Sleep Architecture", type: "articles", itemIds: ["art-7"] },
      { id: "sec-h-2", title: "Cellular Energy & Metabolism", type: "articles", itemIds: ["art-8", "art-10"] },
      { id: "sec-h-3", title: "Longevity Frameworks", type: "guides", itemIds: ["guide-3"] },
      { id: "sec-h-4", title: "Clinical AI Diagnostics", type: "videos", itemIds: ["vid-4"] },
    ],
    metadata: {
      title: "Health & Longevity Science — Thryve",
      description: "Deep editorial investigations into cellular biology, circadian entrainment, and preventative health science.",
      keywords: ["Health", "Sleep", "Longevity", "Microbiome", "Metabolism"],
    }
  },
  {
    id: "t2",
    slug: "psychology",
    name: "Psychology",
    description: "Exploring human behavioral economics, cognitive architecture, attention spans, and neuroplasticity.",
    shortDescription: "Cognitive load, habit formation, behavioral loops, and neuroscience.",
    image: "https://picsum.photos/seed/cognitiveload/1600/900",
    accentColor: "indigo",
    featured: true,
    order: 2,
    articleIds: ["art-14", "art-9", "art-6"],
    videoIds: ["vid-2"],
    guideIds: ["guide-1"],
    featuredArticleId: "art-14",
    popularArticleIds: ["art-9", "art-6"],
    sections: [
      { id: "sec-p-1", title: "Cognitive Architecture & Working Memory", type: "articles", itemIds: ["art-14"] },
      { id: "sec-p-2", title: "Habit Rewiring & Focus", type: "articles", itemIds: ["art-9"] },
      { id: "sec-p-3", title: "Algorithmic Behavior Loops", type: "videos", itemIds: ["vid-2"] },
    ],
    metadata: {
      title: "Psychology & Behavioral Neuroscience — Thryve",
      description: "Rigorous investigations into how attention mechanisms, dopamine loops, and cognitive architecture shape daily performance.",
      keywords: ["Psychology", "Neuroscience", "Habits", "Cognitive Load"],
    }
  },
  {
    id: "t3",
    slug: "technology",
    name: "Technology",
    description: "The systems, ambient computing models, quantum breakthroughs, and software architectures defining our next era.",
    shortDescription: "Ambient interfaces, spatial computing, quantum hardware, and systems.",
    image: "https://picsum.photos/seed/zeroui/1600/900",
    accentColor: "sky",
    featured: true,
    order: 3,
    articleIds: ["art-1", "art-4", "art-5"],
    videoIds: ["vid-1"],
    guideIds: ["guide-2"],
    featuredArticleId: "art-1",
    popularArticleIds: ["art-4", "art-5"],
    sections: [
      { id: "sec-t-1", title: "Ambient Interfaces & Zero-UI", type: "articles", itemIds: ["art-1"] },
      { id: "sec-t-2", title: "Quantum Computing & Cryptography", type: "videos", itemIds: ["vid-1"] },
      { id: "sec-t-3", title: "Deep Learning Foundations", type: "guides", itemIds: ["guide-2"] },
    ],
    metadata: {
      title: "Technology & Computing Paradigms — Thryve",
      description: "Essays and technical analyses on zero-UI design, quantum engineering, and modern systems architecture.",
      keywords: ["Technology", "Ambient Computing", "Quantum", "Software Architecture"],
    }
  },
  {
    id: "t4",
    slug: "science",
    name: "Science",
    description: "Frontier discoveries across bio-materials, synthetic biology, orbital logistics, and planetary science.",
    shortDescription: "Bio-materials, planetary science, physics, and regenerative systems.",
    image: "https://picsum.photos/seed/fungi/1600/900",
    accentColor: "teal",
    featured: true,
    order: 4,
    articleIds: ["art-2", "art-8"],
    videoIds: ["vid-3"],
    guideIds: ["guide-3"],
    featuredArticleId: "art-2",
    popularArticleIds: ["art-8"],
    sections: [
      { id: "sec-s-1", title: "Regenerative Materials & Bio-Design", type: "articles", itemIds: ["art-2"] },
      { id: "sec-s-2", title: "Orbital Mechanics & Planetary Engineering", type: "videos", itemIds: ["vid-3"] },
    ],
    metadata: {
      title: "Science & Bio-Materials — Thryve",
      description: "Exploring mycelium architecture, synthetic biology, and scientific breakthroughs transforming the material world.",
      keywords: ["Science", "Bio-materials", "Physics", "Planetary Engineering"],
    }
  },
  {
    id: "t5",
    slug: "society",
    name: "Society",
    description: "Examining community architecture, public gathering spaces, civic trust, and urban demographic shifts.",
    shortDescription: "Public realm, urban sociology, community resilience, and civic trust.",
    image: "https://picsum.photos/seed/thirdplace/1600/900",
    accentColor: "amber",
    featured: false,
    order: 5,
    articleIds: ["art-12", "art-3"],
    videoIds: ["vid-5"],
    guideIds: ["guide-4"],
    featuredArticleId: "art-12",
    popularArticleIds: ["art-3"],
    sections: [
      { id: "sec-so-1", title: "The Third Place & Public Realm", type: "articles", itemIds: ["art-12"] },
      { id: "sec-so-2", title: "Sustainable Urbanism", type: "videos", itemIds: ["vid-5"] },
      { id: "sec-so-3", title: "Independent Creator Economies", type: "guides", itemIds: ["guide-4"] },
    ],
    metadata: {
      title: "Society & Urban Architecture — Thryve",
      description: "In-depth explorations into the decline of third places, civic infrastructure, and urban community resilience.",
      keywords: ["Society", "Urban Planning", "Civic Trust", "Community"],
    }
  },
  {
    id: "t6",
    slug: "education",
    name: "Education",
    description: "Pedagogical innovation, mastery-based learning algorithms, cognitive development, and classroom evolution.",
    shortDescription: "Mastery learning, adaptive pedagogy, and cognitive development.",
    image: "https://picsum.photos/seed/educationai/1600/900",
    accentColor: "violet",
    featured: false,
    order: 6,
    articleIds: ["art-11", "art-14"],
    videoIds: ["vid-2"],
    guideIds: ["guide-2"],
    featuredArticleId: "art-11",
    popularArticleIds: ["art-14"],
    sections: [
      { id: "sec-e-1", title: "Socratic AI & Adaptive Tutoring", type: "articles", itemIds: ["art-11"] },
      { id: "sec-e-2", title: "Cognitive Development", type: "articles", itemIds: ["art-14"] },
    ],
    metadata: {
      title: "Education & Learning Systems — Thryve",
      description: "Analysis of generative tutoring models, pedagogical theory, and the structural evolution of primary education.",
      keywords: ["Education", "Pedagogy", "AI Tutoring", "Mastery Learning"],
    }
  },
  {
    id: "t7",
    slug: "culture",
    name: "Culture",
    description: "Media philosophy, digital labor dynamics, algorithmic feed psychology, and contemporary expression.",
    shortDescription: "Media philosophy, asynchronous work culture, and digital expression.",
    image: "https://picsum.photos/seed/asyncwork/1600/900",
    accentColor: "rose",
    featured: false,
    order: 7,
    articleIds: ["art-3", "art-6", "art-5"],
    videoIds: ["vid-2"],
    guideIds: ["guide-4"],
    featuredArticleId: "art-3",
    popularArticleIds: ["art-6", "art-5"],
    sections: [
      { id: "sec-c-1", title: "Asynchronous Work Culture", type: "articles", itemIds: ["art-3"] },
      { id: "sec-c-2", title: "Algorithmic Attention Loops", type: "articles", itemIds: ["art-6"] },
    ],
    metadata: {
      title: "Culture & Media Philosophy — Thryve",
      description: "Critical commentary on asynchronous workflows, feed mechanics, and modern human expression.",
      keywords: ["Culture", "Deep Work", "Attention Economy", "Digital Labor"],
    }
  },
  {
    id: "t8",
    slug: "business",
    name: "Business",
    description: "Post-growth economics, circular supply chains, enterprise durability, and organizational focus.",
    shortDescription: "Circular economics, post-growth enterprise, and organizational strategy.",
    image: "https://picsum.photos/seed/businesspost/1600/900",
    accentColor: "stone",
    featured: false,
    order: 8,
    articleIds: ["art-13", "art-3"],
    videoIds: ["vid-5"],
    guideIds: ["guide-1"],
    featuredArticleId: "art-13",
    popularArticleIds: ["art-3"],
    sections: [
      { id: "sec-b-1", title: "The Post-Growth Enterprise", type: "articles", itemIds: ["art-13"] },
      { id: "sec-b-2", title: "Deep Work Protocols", type: "guides", itemIds: ["guide-1"] },
    ],
    metadata: {
      title: "Business & Economic Architecture — Thryve",
      description: "Strategic frameworks for circular supply chains, resilient startup structures, and sustainable growth models.",
      keywords: ["Business", "Economics", "Sustainability", "Startups", "Strategy"],
    }
  },
];

export { MOCK_VIDEOS };

export const MOCK_GUIDES: Guide[] = [
  {
    id: "guide-1",
    slug: "guide-to-deep-work",
    title: "The Complete Guide to Deep Work",
    description: "A 40-page actionable framework for auditing your attention, eliminating distractions, and producing breakthrough professional work.",
    cover: "https://picsum.photos/seed/deepwork/800/1200",
    pages: 42,
    category: "Business",
    publishedAt: "2026-07-20T09:00:00Z",
  },
  {
    id: "guide-2",
    slug: "understanding-neural-networks",
    title: "Demystifying Artificial Neural Networks",
    description: "A non-technical primer on how large language models process information, complete with visual diagrams and glossaries.",
    cover: "https://picsum.photos/seed/neural/800/1200",
    pages: 28,
    category: "Technology",
    publishedAt: "2026-08-01T11:00:00Z",
  },
  {
    id: "guide-3",
    slug: "longevity-protocols",
    title: "Evidence-Based Longevity Protocols",
    description: "A comprehensive teardown of clinical interventions, nutritional science, and daily habits proven to extend healthspan.",
    cover: "https://picsum.photos/seed/longevity/800/1200",
    pages: 65,
    category: "Health",
    publishedAt: "2026-08-10T10:00:00Z",
  },
  {
    id: "guide-4",
    slug: "creator-economics",
    title: "The New Creator Economics",
    description: "Monetization models, audience psychology, and independent business structures for modern digital creators.",
    cover: "https://picsum.photos/seed/creator/800/1200",
    pages: 34,
    category: "Society",
    publishedAt: "2026-08-15T14:00:00Z",
  }
];

export const MOCK_APPS: App[] = [
  {
    id: "app-1",
    slug: "mindful-minutes",
    name: "Mindful Minutes",
    description: "A minimal, privacy-first meditation timer that syncs directly with your health data without requiring an account.",
    icon: "https://picsum.photos/seed/mindfulapp/400/400",
    screenshot: "https://picsum.photos/seed/mindfulscreen/800/1600",
    category: "Health",
    platform: ["iOS", "watchOS"],
  },
  {
    id: "app-2",
    slug: "focus-flow",
    name: "FocusFlow",
    description: "An adaptive ambient noise generator tailored to your current cognitive load and circadian rhythm.",
    icon: "https://picsum.photos/seed/focusapp/400/400",
    screenshot: "https://picsum.photos/seed/focusscreen/1920/1080",
    category: "Productivity",
    platform: ["macOS", "Windows", "Web"],
  },
  {
    id: "app-3",
    slug: "thryve-daily",
    name: "Thryve Daily",
    description: "Your daily digest of editorial content, delivered in a distraction-free, offline-first reading environment.",
    icon: "https://picsum.photos/seed/thryveapp/400/400",
    screenshot: "https://picsum.photos/seed/thryvescreen/800/1600",
    category: "Media",
    platform: ["iOS", "Android"],
  },
];
