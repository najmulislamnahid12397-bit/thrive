import { Video } from "./types/video";

export const MOCK_VIDEOS: Video[] = [
  {
    id: "vid-4",
    slug: "ai-in-healthcare-diagnostics",
    title: "When AI Becomes the Doctor: The Diagnostic Frontier",
    description: "Generative vision-language models and deep convolutional neural networks are outperforming human radiologists in early oncological detection. We examine the clinical trials, false-positive trade-offs, and ethical dilemmas facing contemporary triage departments.",
    shortDescription: "How deep learning diagnostics are transforming oncology triage and challenging clinical standards.",
    category: "Health",
    topics: ["health", "technology", "science"],
    author: {
      id: "a1",
      name: "Dr. Sarah Chen",
      role: "Senior Science Editor",
      avatar: "https://picsum.photos/seed/sarah/200/200",
      bio: "Physician-scientist and investigative writer specializing in cellular oncology, translational genomics, and clinical algorithms."
    },
    publishedAt: "2026-08-18T10:00:00Z",
    updatedAt: "2026-08-20T14:30:00Z",
    duration: "14:30",
    thumbnail: "https://picsum.photos/seed/healthai/1920/1080",
    thumbnailAlt: "Medical specialist reviewing multi-spectral algorithmic scan outputs in a diagnostic lab",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    featured: true,
    views: "84.2K",
    relatedArticleIds: ["art-7", "art-8", "art-10"],
    relatedVideoIds: ["vid-1", "vid-8", "vid-10"],
    chapters: [
      {
        id: "ch-4-1",
        title: "Introduction: The Radiologist's Horizon",
        startTime: 0,
        formattedTime: "00:00",
        description: "Overview of current imaging volumes and the acute clinical diagnostic bottleneck worldwide."
      },
      {
        id: "ch-4-2",
        title: "Convolutional Ensembles vs. Multi-Modal Vision",
        startTime: 145,
        formattedTime: "02:25",
        description: "A technical comparison of classical CAD systems versus transformer-based multimodal reasoning."
      },
      {
        id: "ch-4-3",
        title: "Clinical Trial Data: The Mayo and Karolinska Studies",
        startTime: 380,
        formattedTime: "06:20",
        description: "Breaking down real-world sensitivity gains and the critical problem of automated over-diagnosis."
      },
      {
        id: "ch-4-4",
        title: "The Human in the Loop: Liability & Bedside Trust",
        startTime: 620,
        formattedTime: "10:20",
        description: "Legal liability frameworks, patient consent protocols, and defensive medicine safeguards."
      },
      {
        id: "ch-4-5",
        title: "Future Outlook: Decentralized Triage by 2030",
        startTime: 780,
        formattedTime: "13:00",
        description: "How point-of-care handheld ultrasound combined with local edge models will democratize care."
      }
    ],
    transcript: [
      {
        speaker: "Dr. Sarah Chen",
        timestamp: "00:08",
        startTime: 8,
        text: "Across tertiary hospitals in North America and Western Europe, the average radiologist is tasked with analyzing over two hundred imaging series every single shift. That leaves mere seconds to parse subtle pixel-density discrepancies that could signify stage-one malignant neoplasia."
      },
      {
        speaker: "Dr. Robert Vance",
        timestamp: "01:02",
        startTime: 62,
        text: "When you look at late-shift fatigue curves, error margins predictably climb past four in the afternoon. What machine intelligence gives us is not an automated replacement for clinical judgment, but a tireless second pair of calibrated eyes that never experiences circadian degradation."
      },
      {
        speaker: "Dr. Sarah Chen",
        timestamp: "02:30",
        startTime: 150,
        text: "Let's dig into the architectural leap. Why did early CAD systems from the late nineties generate so many false alarms, and why are today's transformer models demonstrating fundamentally different spatial comprehension?"
      },
      {
        speaker: "Dr. Robert Vance",
        timestamp: "03:15",
        startTime: 195,
        text: "Classical computer vision relied on heuristic hand-engineered edge filters. Modern vision foundation models have absorbed tens of millions of histopathology slides and cross-referenced longitudinal outcomes. They recognize relational micro-architectures across multiple anatomical slices concurrently."
      },
      {
        speaker: "Dr. Sarah Chen",
        timestamp: "06:40",
        startTime: 400,
        text: "In the Karolinska retrospective published last quarter, the sensitivity rate reached ninety-four point six percent. But what happens when the model identifies indeterminate lesions that subject patients to invasive biopsies they never actually needed?"
      },
      {
        speaker: "Dr. Robert Vance",
        timestamp: "07:55",
        startTime: 475,
        text: "That is precisely where human calibration remains paramount. Our institutional protocols mandate that any automated flag must meet a pre-test probability threshold evaluated by an attending clinician before surgical consultation is initiated."
      },
      {
        speaker: "Dr. Sarah Chen",
        timestamp: "10:35",
        startTime: 635,
        text: "Ultimately, the regulatory challenge isn't algorithmic precision—it's establishing transparent chain-of-custody for diagnostic conclusions when lives hang in the balance."
      }
    ]
  },
  {
    id: "vid-1",
    slug: "quantum-supremacy-explained",
    title: "Understanding Quantum Supremacy in 12 Minutes",
    description: "A comprehensive visual breakdown of qubits, coherent superposition, and quantum entanglement. We investigate why asymmetric encryption like RSA-2048 faces structural obsolescence and how post-quantum lattice cryptography will safeguard future telecommunications.",
    shortDescription: "A visual breakdown of qubits, superposition, and post-quantum encryption paradigms.",
    category: "Technology",
    topics: ["technology", "science", "business"],
    author: {
      id: "a2",
      name: "Marcus Thorne",
      role: "Technology Correspondent",
      avatar: "https://picsum.photos/seed/marcus/200/200",
      bio: "Investigative hardware analyst writing about advanced semiconductor packaging, quantum states, and distributed infrastructure."
    },
    publishedAt: "2026-08-16T10:00:00Z",
    updatedAt: "2026-08-17T11:00:00Z",
    duration: "12:45",
    thumbnail: "https://picsum.photos/seed/quantum/1920/1080",
    thumbnailAlt: "Dilution refrigerator chandelier showing gold-plated coaxial lines in a quantum physics lab",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    featured: false,
    views: "61.9K",
    relatedArticleIds: ["art-1", "art-4", "art-5"],
    relatedVideoIds: ["vid-7", "vid-3", "vid-4"],
    chapters: [
      {
        id: "ch-1-1",
        title: "The Limits of Silicon & Moore's Law",
        startTime: 0,
        formattedTime: "00:00",
        description: "Why sub-nanometer gate oxide tunneling makes traditional silicon transistors fundamentally unviable."
      },
      {
        id: "ch-1-2",
        title: "Qubits, Superposition & Bloch Spheres",
        startTime: 110,
        formattedTime: "01:50",
        description: "Visualizing the mathematical probability space of quantum states versus binary gates."
      },
      {
        id: "ch-1-3",
        title: "Shor's Algorithm & The Cryptographic Cliff",
        startTime: 310,
        formattedTime: "05:10",
        description: "How quantum polynomial time transforms prime factorization from millennia to minutes."
      },
      {
        id: "ch-1-4",
        title: "Lattice-Based Post-Quantum Defense",
        startTime: 520,
        formattedTime: "08:40",
        description: "The mathematical hard problems that even fault-tolerant quantum machines cannot collapse."
      }
    ],
    transcript: [
      {
        speaker: "Marcus Thorne",
        timestamp: "00:15",
        startTime: 15,
        text: "Every bank transaction, encrypted signal, and diplomatic cable currently transmitted relies on a shared assumption: that calculating prime factors of very large integers takes longer than the lifespan of our sun."
      },
      {
        speaker: "Dr. Aris Thorne",
        timestamp: "01:45",
        startTime: 105,
        text: "When you operate classical silicon, a bit is a switch: zero or one. In a superconducting transmon qubit, you exist simultaneously across a continuous surface of probabilities defined mathematically on the Bloch sphere."
      },
      {
        speaker: "Marcus Thorne",
        timestamp: "05:20",
        startTime: 320,
        text: "Peter Shor showed in 1994 that quantum computers don't just calculate faster; they compute in an entirely different computational complexity class. Once we achieve logical fault-tolerant qubits, standard public-key cryptography dissolves."
      },
      {
        speaker: "Dr. Aris Thorne",
        timestamp: "08:50",
        startTime: 530,
        text: "That is why global standard bodies have ratified lattice-based mathematical primitives. The race is no longer theoretical—it is an infrastructure migration across millions of servers worldwide."
      }
    ]
  },
  {
    id: "vid-2",
    slug: "the-psychology-of-scrolling",
    title: "The Dark Pattern: How Infinite Scroll Hacks Your Brain",
    description: "An investigative dissection into variable ratio schedule reinforcement, micro-friction removal, and prefrontal dopamine fatigue. We examine the exact interface mechanics pioneered in Silicon Valley to suppress conscious exit decisions.",
    shortDescription: "The psychological mechanics of variable reward loops and endless feed architecture.",
    category: "Psychology",
    topics: ["psychology", "technology", "culture"],
    author: {
      id: "a4",
      name: "James Lin",
      role: "Psychology Writer",
      avatar: "https://picsum.photos/seed/james/200/200",
      bio: "Behavioral economist and cognitive researcher tracking the intersection of digital UX patterns, attention economics, and habitual loops."
    },
    publishedAt: "2026-08-05T15:30:00Z",
    updatedAt: "2026-08-08T09:15:00Z",
    duration: "18:20",
    thumbnail: "https://picsum.photos/seed/scroll/1920/1080",
    thumbnailAlt: "Silhouette of a person interacting with an illuminated smartphone screen in low ambient light",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    featured: false,
    views: "112.4K",
    relatedArticleIds: ["art-14", "art-9", "art-6"],
    relatedVideoIds: ["vid-6", "vid-1", "vid-9"],
    chapters: [
      {
        id: "ch-2-1",
        title: "The Invention of Pagination Removal",
        startTime: 0,
        formattedTime: "00:00",
        description: "How the removal of 'Page 2' buttons dismantled natural human pause points."
      },
      {
        id: "ch-2-2",
        title: "B.F. Skinner and the Variable Reward Loop",
        startTime: 180,
        formattedTime: "03:00",
        description: "Why unpredictable content frequency triggers identical neurochemistry to slot machines."
      },
      {
        id: "ch-2-3",
        title: "Prefrontal Satiety & Dopaminergic Depletion",
        startTime: 490,
        formattedTime: "08:10",
        description: "What occurs inside the striatum during prolonged passive content consumption."
      },
      {
        id: "ch-2-4",
        title: "Architectural Antidotes: Friction as Respect",
        startTime: 820,
        formattedTime: "13:40",
        description: "How mindful UX, batch reading, and pagination can restore cognitive autonomy."
      }
    ],
    transcript: [
      {
        speaker: "James Lin",
        timestamp: "00:20",
        startTime: 20,
        text: "When you read a physical book, the page turn is not a friction point—it's a conscious cognitive boundary. Your brain acknowledges completion and asks: do I want to continue? The infinite scroll dismantled that question forever."
      },
      {
        speaker: "Dr. Maya Sterling",
        timestamp: "03:15",
        startTime: 195,
        text: "Variable ratio reinforcement is the most powerful operant conditioning protocol discovered in behavioral biology. If every scroll produced mediocrity, you'd quit. If every scroll produced brilliance, you'd habituate. But because the payoff is stochastic, your dopaminergic anticipation remains perpetually elevated."
      },
      {
        speaker: "James Lin",
        timestamp: "08:25",
        startTime: 505,
        text: "By the twenty-minute mark, your prefrontal cortex—the seat of executive impulse inhibition—experiences measurable metabolic exhaustion. You aren't staying because you're fascinated; you're staying because your brain lacks the momentary energy to construct an exit impulse."
      }
    ]
  },
  {
    id: "vid-3",
    slug: "mars-colonization-logistics",
    title: "The Reality of Martian Logistics: Beyond the Rocket",
    description: "Before we can establish permanent settlements on the Martian surface, we have to solve the unglamorous physics of payload density, atmospheric ISRU extraction, perchlorate toxicity, and radiation shielding.",
    shortDescription: "An engineering investigation into the logistical bottlenecks of deep-space planetary habitability.",
    category: "Science",
    topics: ["science", "technology"],
    author: {
      id: "a1",
      name: "Dr. Sarah Chen",
      role: "Senior Science Editor",
      avatar: "https://picsum.photos/seed/sarah/200/200"
    },
    publishedAt: "2026-08-01T08:00:00Z",
    duration: "09:15",
    thumbnail: "https://picsum.photos/seed/mars/1920/1080",
    thumbnailAlt: "Rendering of an automated subterranean planetary habitat on red rocky terrain",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4",
    featured: false,
    views: "43.1K",
    relatedArticleIds: ["art-2", "art-8"],
    relatedVideoIds: ["vid-1", "vid-5", "vid-10"],
    chapters: [
      {
        id: "ch-3-1",
        title: "The Mass Fraction Reality Check",
        startTime: 0,
        formattedTime: "00:00"
      },
      {
        id: "ch-3-2",
        title: "Perchlorates: The Soil Toxin Nobody Talks About",
        startTime: 155,
        formattedTime: "02:35"
      },
      {
        id: "ch-3-3",
        title: "ISRU: Sabatier Reactors in Hard Vacuum",
        startTime: 340,
        formattedTime: "05:40"
      },
      {
        id: "ch-3-4",
        title: "Regolith Sintering and Subterranean Shelters",
        startTime: 450,
        formattedTime: "07:30"
      }
    ]
  },
  {
    id: "vid-5",
    slug: "sustainable-architecture-timber",
    title: "Building Without Concrete: The Mass Timber Revolution",
    description: "Concrete and steel production account for roughly fifteen percent of global greenhouse gas emissions. Leading structural engineers and architects are proving that cross-laminated mass timber can construct 40-story towers while acting as long-term carbon sinks.",
    shortDescription: "How cross-laminated mass timber is transforming skyscraper engineering into carbon-negative architecture.",
    category: "Society",
    topics: ["society", "science", "culture"],
    author: {
      id: "a3",
      name: "Elena Rostova",
      role: "Culture Analyst",
      avatar: "https://picsum.photos/seed/elena/200/200"
    },
    publishedAt: "2026-07-20T14:15:00Z",
    duration: "06:45",
    thumbnail: "https://picsum.photos/seed/timber/1920/1080",
    thumbnailAlt: "Warm minimalist mass timber interior beams in an urban architectural pavilion",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerFun.mp4",
    featured: false,
    views: "29.7K",
    relatedArticleIds: ["art-12", "art-3", "art-2"],
    relatedVideoIds: ["vid-6", "vid-12"]
  },
  {
    id: "vid-6",
    slug: "the-death-of-deep-work",
    title: "Why Modern Workplaces Kill Concentration",
    description: "An animated, data-driven breakdown of open-plan offices, asynchronous chat saturation, context-switching penalties, and the neuroscience of reclaiming unbroken four-hour cognitive work blocks.",
    shortDescription: "An animated breakdown of context switching costs and how to protect deep focus blocks.",
    category: "Culture",
    topics: ["culture", "psychology", "business"],
    author: {
      id: "a3",
      name: "Elena Rostova",
      role: "Culture Analyst",
      avatar: "https://picsum.photos/seed/elena/200/200"
    },
    publishedAt: "2026-08-11T13:00:00Z",
    duration: "11:10",
    thumbnail: "https://picsum.photos/seed/deepfocus/1920/1080",
    thumbnailAlt: "A focused professional working in an organized study with natural light",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerJoyBlazes.mp4",
    featured: false,
    views: "95.3K",
    relatedArticleIds: ["art-11", "art-14", "art-6"],
    relatedVideoIds: ["vid-2", "vid-9", "vid-11"]
  },
  {
    id: "vid-7",
    slug: "zero-knowledge-cryptography-primer",
    title: "Zero-Knowledge Proofs: Verifiable Privacy Without Exposure",
    description: "How zk-SNARKs and polynomial commitments allow one party to mathematically prove the truth of a statement without revealing the underlying private data. From voting systems to decentralized identity.",
    shortDescription: "The mathematical breakthrough enabling cryptographic proof without data disclosure.",
    category: "Technology",
    topics: ["technology", "science", "business"],
    author: {
      id: "a2",
      name: "Marcus Thorne",
      role: "Technology Correspondent",
      avatar: "https://picsum.photos/seed/marcus/200/200"
    },
    publishedAt: "2026-08-03T16:00:00Z",
    duration: "15:40",
    thumbnail: "https://picsum.photos/seed/zeroknowledge/1920/1080",
    thumbnailAlt: "Abstract geometric lines illustrating cryptographic mathematical verification",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4",
    featured: false,
    views: "38.5K",
    relatedArticleIds: ["art-1", "art-5"],
    relatedVideoIds: ["vid-1", "vid-11"]
  },
  {
    id: "vid-8",
    slug: "the-neuroscience-of-circadian-sleep",
    title: "The Molecular Clock: Circadian Entrainment and Sleep Architecture",
    description: "A molecular deep dive into suprachiasmatic nucleus photo-receptors, adenosine buildup, melatonin clearance pathways, and how specific light spectrums alter non-REM slow-wave restorative cycles.",
    shortDescription: "How melanopsin receptors and light exposure regulate restorative sleep stages.",
    category: "Health",
    topics: ["health", "science", "psychology"],
    author: {
      id: "a1",
      name: "Dr. Sarah Chen",
      role: "Senior Science Editor",
      avatar: "https://picsum.photos/seed/sarah/200/200"
    },
    publishedAt: "2026-07-30T11:20:00Z",
    duration: "16:25",
    thumbnail: "https://picsum.photos/seed/circadian/1920/1080",
    thumbnailAlt: "Morning sunlight entering a minimalist bedroom illustrating circadian natural light cues",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WeAreGoingOnBullrun.mp4",
    featured: false,
    views: "52.8K",
    relatedArticleIds: ["art-7", "art-10"],
    relatedVideoIds: ["vid-4", "vid-2", "vid-10"]
  },
  {
    id: "vid-9",
    slug: "the-future-of-pedagogy-and-adaptive-learning",
    title: "Beyond the Lecture: Adaptive Socratic Pedagogy",
    description: "Why standardized one-size-fits-all classroom pacing fails seventy percent of students, and how intelligent tutoring systems modeled on Bloom's two-sigma problem are restructuring education worldwide.",
    shortDescription: "How personalized tutoring loops are solving educational variance across modern institutions.",
    category: "Education",
    topics: ["education", "technology", "psychology"],
    author: {
      id: "a4",
      name: "James Lin",
      role: "Psychology Writer",
      avatar: "https://picsum.photos/seed/james/200/200"
    },
    publishedAt: "2026-07-24T09:45:00Z",
    duration: "13:15",
    thumbnail: "https://picsum.photos/seed/pedagogy/1920/1080",
    thumbnailAlt: "Students collaborating around an interactive digital design table",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/WhatCarCanYouGetForAGrand.mp4",
    featured: false,
    views: "34.1K",
    relatedArticleIds: ["art-6", "art-14"],
    relatedVideoIds: ["vid-2", "vid-6"]
  },
  {
    id: "vid-10",
    slug: "cellular-longevity-and-nad-metabolism",
    title: "Mitochondrial Bioenergetics: The Biochemistry of NAD+",
    description: "An evidence-based scientific exploration of sirtuins, PARPs, CD38 enzymatic degradation, and the real therapeutic potential of cellular precursors in delaying age-related metabolic decline.",
    shortDescription: "Exploring mitochondrial biogenesis, sirtuin activation, and cellular energy maintenance.",
    category: "Science",
    topics: ["science", "health"],
    author: {
      id: "a1",
      name: "Dr. Sarah Chen",
      role: "Senior Science Editor",
      avatar: "https://picsum.photos/seed/sarah/200/200"
    },
    publishedAt: "2026-07-15T15:00:00Z",
    duration: "17:50",
    thumbnail: "https://picsum.photos/seed/cellular/1920/1080",
    thumbnailAlt: "High-resolution fluorescent microscopy of active mitochondrial cellular networks",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4",
    featured: false,
    views: "48.9K",
    relatedArticleIds: ["art-8", "art-7"],
    relatedVideoIds: ["vid-4", "vid-8"]
  },
  {
    id: "vid-11",
    slug: "the-post-capitalist-creator-economy",
    title: "The Sovereign Writer: Direct-to-Reader Economics",
    description: "Analyzing subscription micro-economies, patron guilds, syndication collectives, and the death of algorithmic ad-supported media models in favour of focused high-trust editorial publications.",
    shortDescription: "How boutique publications and direct reader funding are decoupling journalism from advertising.",
    category: "Business",
    topics: ["business", "society", "culture"],
    author: {
      id: "a3",
      name: "Elena Rostova",
      role: "Culture Analyst",
      avatar: "https://picsum.photos/seed/elena/200/200"
    },
    publishedAt: "2026-07-10T12:30:00Z",
    duration: "10:35",
    thumbnail: "https://picsum.photos/seed/creatoreconomy/1920/1080",
    thumbnailAlt: "Clean studio workspace with typography layouts and publication press proofs",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4",
    featured: false,
    views: "27.4K",
    relatedArticleIds: ["art-5", "art-12"],
    relatedVideoIds: ["vid-6", "vid-7"]
  },
  {
    id: "vid-12",
    slug: "rethinking-urban-density-and-third-places",
    title: "The Third Place Dilemma: Rebuilding Civic Fabric",
    description: "Ray Oldenburg's sociological concept of the third place—neither home nor work—faces unprecedented commercial pressures. We examine urban design projects resurrecting communal spaces without commercial gatekeeping.",
    shortDescription: "Urban design movements revitalizing public parks, community libraries, and non-commercial gathering hubs.",
    category: "Society",
    topics: ["society", "culture"],
    author: {
      id: "a3",
      name: "Elena Rostova",
      role: "Culture Analyst",
      avatar: "https://picsum.photos/seed/elena/200/200"
    },
    publishedAt: "2026-07-02T16:45:00Z",
    duration: "08:50",
    thumbnail: "https://picsum.photos/seed/thirdplace/1920/1080",
    thumbnailAlt: "Vibrant sunlit urban public square with communal benches and green landscaping",
    videoUrl: "https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4",
    featured: false,
    views: "31.0K",
    relatedArticleIds: ["art-12", "art-3"],
    relatedVideoIds: ["vid-5", "vid-11"]
  }
];
