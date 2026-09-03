import { Article } from "./types/article";

export const MOCK_ARTICLES: Article[] = [
  {
    id: "art-1",
    slug: "disappearing-interface-zero-ui",
    title: "The Disappearing Interface: When Technology Gets Out of the Way",
    subtitle: "Ambient computing and zero-UI paradigms are fundamentally reshaping how we interact with our physical spaces, shifting the focus from screens to environments.",
    category: "Technology",
    tags: ["Design", "HCI", "Ambient Computing", "Future"],
    author: {
      name: "Elena Rostova",
      avatar: "https://picsum.photos/seed/elena/200/200",
      role: "Senior Design Editor",
      bio: "Elena covers the intersection of human-computer interaction, spatial software, and industrial design. Formerly design lead at Studio Meta.",
      social: {
        twitter: "https://twitter.com/elenarostova",
        linkedin: "https://linkedin.com/in/elenarostova",
        website: "https://elenarostova.design"
      }
    },
    publishedAt: "2026-08-15T09:00:00Z",
    updatedAt: "2026-08-16T14:30:00Z",
    readingTime: 6,
    heroImage: "https://picsum.photos/seed/zeroui/1920/1080",
    heroImageAlt: "A minimalist living space with hidden integrated technology.",
    heroCaption: "Smart environments of the future will rely on spatial awareness rather than touchscreens. Photo by J. Doe.",
    heroImageCredit: "Studio G",
    featured: true,
    relatedArticles: ["art-2", "art-4", "art-5"],
    sections: [
      {
        type: "paragraph",
        text: "For the last two decades, the primary vector for technological interaction has been a glowing rectangle. We have bent our necks, strained our eyes, and adapted our physical posture to accommodate the smartphone, the tablet, and the monitor. But a quiet revolution is currently underway in the field of Human-Computer Interaction (HCI)."
      },
      {
        type: "heading",
        level: 2,
        text: "The Rise of Ambient Computing"
      },
      {
        type: "paragraph",
        text: "Ambient computing operates on a radically different premise: the environment itself is the interface. Instead of requiring active, focal attention, technology fades into the background, operating on the periphery of our awareness and responding to our natural behaviors—voice, gesture, presence, and routine."
      },
      {
        type: "callout",
        intent: "info",
        title: "What is Zero-UI?",
        text: "Zero-UI is a design paradigm where user interfaces are completely invisible, relying on natural human communication like voice, gestures, haptics, and context-awareness."
      },
      {
        type: "image",
        src: "https://picsum.photos/seed/ambient/1200/800",
        alt: "A subtle wooden panel that displays soft light notifications.",
        caption: "Smart materials, like this responsive wood composite, display information only when needed.",
        credit: "Lars Hendriks",
        layout: "full"
      },
      {
        type: "paragraph",
        text: "This shift requires hardware designers and software engineers to completely rethink their approach. When you remove the screen, you remove the explicit menus, the back buttons, and the visual affordances that users have relied on since the invention of the Graphical User Interface (GUI)."
      },
      {
        type: "quote",
        text: "The best technology is the technology you don't even realize you're using. It should feel less like a tool and more like an extension of your own intent.",
        author: "Marcus Chen",
        role: "Director of Spatial Computing, OpenTech"
      },
      {
        type: "heading",
        level: 3,
        text: "Core Principles of Invisible Design"
      },
      {
        type: "list",
        style: "unordered",
        items: [
          "Context over explicit commands: Systems should anticipate needs based on historical data.",
          "Glanceability: Information must be processed in milliseconds.",
          "Fail gracefully: When an ambient system misinterprets intent, it must not disrupt the physical environment."
        ]
      },
      {
        type: "paragraph",
        text: "As we move toward a post-screen era, the ultimate metric of successful technology will no longer be 'time spent in app,' but rather 'time given back to the user.' The disappearing interface is not about removing technology from our lives; it is about integrating it so perfectly that we forget it is there at all."
      }
    ]
  },
  {
    id: "art-2",
    slug: "mycelium-architecture-future-cities",
    title: "Mycelium Architecture: Building the Cities of Tomorrow with Fungi",
    subtitle: "How biological building materials could drastically reduce the carbon footprint of global construction.",
    category: "Science",
    tags: ["Climate", "Architecture", "Biology", "Sustainability"],
    author: {
      name: "Dr. Aris Thorne",
      avatar: "https://picsum.photos/seed/aris/200/200",
      role: "Climate Science Contributor",
      bio: "Dr. Aris Thorne is a bio-materials researcher and lecturer specializing in regenerative architecture and circular economy systems.",
      social: {
        twitter: "https://twitter.com/aristhorne",
        linkedin: "https://linkedin.com/in/aristhorne",
        github: "https://github.com/aristhorne"
      }
    },
    publishedAt: "2026-08-12T10:15:00Z",
    readingTime: 8,
    heroImage: "https://picsum.photos/seed/fungi/1920/1080",
    heroImageAlt: "A towering pavilion constructed from organic white mycelium bricks.",
    heroCaption: "The Hy-Fi pavilion, constructed entirely from biodegradable mushroom bricks.",
    featured: true,
    relatedArticles: ["art-1", "art-3"],
    sections: [
      {
        type: "paragraph",
        text: "Concrete is the second most consumed material on Earth, trailing only water. Its production is responsible for roughly 8% of global carbon dioxide emissions. If the cement industry were a country, it would be the third-largest carbon dioxide emitter in the world with up to 2.8 billion tonnes, surpassed only by China and the US."
      },
      {
        type: "heading",
        level: 2,
        text: "Growing Our Buildings"
      },
      {
        type: "paragraph",
        text: "Enter mycelium—the root-like structure of a fungus consisting of a mass of branching, thread-like hyphae. Over the past decade, a quiet alliance of biologists and architects have been cultivating a revolutionary idea: instead of extracting, refining, and pouring our building materials, what if we simply grew them?"
      },
      {
        type: "image",
        src: "https://picsum.photos/seed/myceliumbrick/1200/800",
        alt: "Close up of a mycelium brick structure.",
        caption: "Mycelium binds agricultural waste into a solid, durable matrix that is surprisingly fire-resistant.",
        credit: "BioBuild Labs",
        layout: "column"
      },
      {
        type: "quote",
        text: "We are moving from a paradigm of extraction to one of cultivation. We aren't just creating a new material; we are creating a new relationship with the built environment.",
        author: "Sarah Jenkins",
        role: "Lead Architect, BioBuild"
      },
      {
        type: "heading",
        level: 3,
        text: "The Cultivation Process"
      },
      {
        type: "list",
        style: "ordered",
        items: [
          "Inoculation: Agricultural waste (like corn husks or sawdust) is introduced to mycelium spores.",
          "Incubation: Over 5-7 days, the mycelium digests the waste, growing a dense network of fibers that bind the material into a solid shape.",
          "Baking: The structural mold is heated to stop the growth process and neutralize the spores.",
          "Curing: The resulting bio-brick is dried, creating a lightweight, incredibly strong material."
        ]
      },
      {
        type: "paragraph",
        text: "Mycelium bricks are naturally fire-retardant, possess excellent acoustic and thermal insulation properties, and, at the end of their lifecycle, they can be composted. They are literally earth returning to earth."
      }
    ]
  },
  {
    id: "art-3",
    slug: "asynchronous-advantage-work",
    title: "The Asynchronous Advantage: Why Real-Time Communication is Breaking Work",
    subtitle: "Deep work requires long stretches of uninterrupted time. The modern notification ecosystem is structurally opposed to this.",
    category: "Culture",
    tags: ["Work", "Productivity", "Culture"],
    author: {
      name: "Marcus Thorne",
      avatar: "https://picsum.photos/seed/marcus/200/200",
      role: "Culture & Systems Writer",
      bio: "Marcus investigates digital labor, organizational culture, and cognitive efficiency in remote-first enterprises.",
      social: {
        twitter: "https://twitter.com/marcusthorne",
        website: "https://marcusthorne.com"
      }
    },
    publishedAt: "2026-08-10T14:20:00Z",
    readingTime: 5,
    heroImage: "https://picsum.photos/seed/asyncwork/1920/1080",
    heroImageAlt: "A person working peacefully in a quiet, sunlit room.",
    featured: true,
    relatedArticles: ["art-1", "art-4", "art-6"],
    sections: [
      {
        type: "paragraph",
        text: "The average knowledge worker checks their email or Slack every six minutes. It takes an average of 23 minutes to return to a state of deep concentration after an interruption. The math is brutal: we are structuring our workdays in a way that guarantees meaningful, deep work is mathematically impossible."
      },
      {
        type: "heading",
        level: 2,
        text: "The Illusion of Speed"
      },
      {
        type: "paragraph",
        text: "Real-time chat tools were sold to us on the promise of **speed** and *agility*. Why wait hours for an email response when you can get a slack reply in seconds? The problem is that while individual micro-transactions of information are faster, the overall output of complex, high-value work has slowed to a crawl. [Read the full report on context switching](https://example.com)."
      },
      {
        type: "callout",
        intent: "warning",
        title: "The Cost of Context Switching",
        text: "Psychological studies show that constantly shifting context between deep tasks and shallow communication depletes cognitive reserves and spikes cortisol levels."
      },
      {
        type: "paragraph",
        text: "Companies that have aggressively transitioned to asynchronous-first workflows report not only higher productivity, but significantly lower employee burnout."
      },
      {
        type: "quote",
        text: "If a decision requires a meeting, the organization has failed to document its strategy clearly.",
        author: "Default to Async Manifesto",
        isPullQuote: true
      }
    ]
  },
  {
    id: "art-4",
    slug: "quantum-supremacy-explained",
    title: "Quantum Supremacy: Beyond the Hype",
    subtitle: "Separating the science fiction from the engineering reality of the next generation of computing.",
    category: "Technology",
    tags: ["Quantum", "Computing", "Physics"],
    author: { 
      name: "Dr. Aris Thorne", 
      avatar: "https://picsum.photos/seed/aris/200/200",
      role: "Climate Science Contributor",
      bio: "Dr. Aris Thorne is a bio-materials researcher and lecturer specializing in regenerative architecture and circular economy systems.",
      social: { twitter: "https://twitter.com/aristhorne", linkedin: "https://linkedin.com/in/aristhorne" }
    },
    publishedAt: "2026-08-08T09:00:00Z",
    readingTime: 7,
    heroImage: "https://picsum.photos/seed/quantum/1920/1080",
    heroImageAlt: "A quantum computer chandelier.",
    heroCaption: "Cryogenic dilution refrigerators maintain qubits near absolute zero.",
    featured: false,
    sections: [
      {
        type: "paragraph",
        text: "Quantum computing is often discussed in terms of magical speeds and instantaneous calculations. In reality, quantum systems operate on the subtle, fragile physics of quantum superposition and entanglement."
      },
      {
        type: "heading",
        level: 2,
        text: "The Qubit Frontier"
      },
      {
        type: "paragraph",
        text: "Unlike classical bits that exist in binary states of 0 or 1, qubits can represent complex linear combinations. This opens up unprecedented mathematical shortcuts for molecular simulations and cryptographic analysis."
      }
    ]
  },
  {
    id: "art-5",
    slug: "designing-for-the-multiverse",
    title: "Designing the Digital Multiverse",
    subtitle: "How 3D engines are moving beyond gaming to architect our next digital reality.",
    category: "Design",
    tags: ["VR", "AR", "3D", "Design"],
    author: { 
      name: "Elena Rostova", 
      avatar: "https://picsum.photos/seed/elena/200/200",
      role: "Senior Design Editor",
      bio: "Elena covers the intersection of human-computer interaction, spatial software, and industrial design. Formerly design lead at Studio Meta.",
      social: { twitter: "https://twitter.com/elenarostova", website: "https://elenarostova.design" }
    },
    publishedAt: "2026-08-05T11:30:00Z",
    readingTime: 4,
    heroImage: "https://picsum.photos/seed/multiverse/1920/1080",
    heroImageAlt: "Abstract 3D digital landscape.",
    heroCaption: "Procedural geometry creating limitless digital architectures.",
    featured: false,
    sections: [
      {
        type: "paragraph",
        text: "Real-time rendering technology has crossed a photorealism threshold that fundamentally transforms how architects, industrial designers, and filmmakers conceive physical spaces."
      },
      {
        type: "heading",
        level: 2,
        text: "Spatial Interfaces"
      },
      {
        type: "paragraph",
        text: "As headsets and ambient spatial projectors mature, UI designers must transition from flat 2D viewport coordinates to 3D volumetric fields of view."
      }
    ]
  },
  {
    id: "art-6",
    slug: "psychology-of-algorithms",
    title: "The Psychology of the Feed",
    subtitle: "Why we scroll, and how algorithmic personalization shapes our worldview.",
    category: "Culture",
    tags: ["Psychology", "Social Media", "Algorithms"],
    author: { 
      name: "Marcus Thorne", 
      avatar: "https://picsum.photos/seed/marcus/200/200",
      role: "Culture & Systems Writer",
      bio: "Marcus investigates digital labor, organizational culture, and cognitive efficiency in remote-first enterprises.",
      social: { twitter: "https://twitter.com/marcusthorne" }
    },
    publishedAt: "2026-08-01T16:45:00Z",
    readingTime: 6,
    heroImage: "https://picsum.photos/seed/algorithm/1920/1080",
    heroImageAlt: "A glowing grid of digital information.",
    heroCaption: "Visualizing the hidden recommendation loops of modern feeds.",
    featured: false,
    sections: [
      {
        type: "paragraph",
        text: "The infinite scroll was designed to eliminate friction in digital navigation. However, the psychological consequence has been the creation of an endless dopamine feedback loop."
      },
      {
        type: "heading",
        level: 2,
        text: "Variable Reward Schedules"
      },
      {
        type: "paragraph",
        text: "By delivering unpredictable rewards across unpredictable intervals, algorithmic feeds activate the exact same neurological pathways as traditional slot machines."
      }
    ]
  },
  {
    id: "art-7",
    slug: "circadian-rhythm-deep-sleep-science",
    title: "Optimizing the Circadian Clock: The Molecular Science of Deep Rest",
    subtitle: "How light exposure, temperature shifts, and meal timing calibrate our cellular master clock for restorative sleep.",
    category: "Health",
    tags: ["Sleep", "Neuroscience", "Health", "Longevity"],
    author: {
      name: "Dr. Sarah Chen",
      avatar: "https://picsum.photos/seed/sarah/200/200",
      role: "Senior Science Editor",
      bio: "Dr. Sarah Chen is a neurobiologist focusing on sleep architecture, circadian rhythm regulation, and cognitive performance.",
      social: {
        twitter: "https://twitter.com/drsarahchen",
        linkedin: "https://linkedin.com/in/drsarahchen"
      }
    },
    publishedAt: "2026-08-14T07:30:00Z",
    readingTime: 9,
    heroImage: "https://picsum.photos/seed/circadian/1920/1080",
    heroImageAlt: "Morning sunlight streaming through bedroom windows.",
    heroCaption: "Early morning photon exposure triggers cortisol awakening and sets the evening melatonin countdown.",
    featured: false,
    sections: [
      {
        type: "paragraph",
        text: "Every cell in the human body houses a biochemical oscillator governed by a 24-hour cycle. At the apex of this network is the suprachiasmatic nucleus (SCN), a cluster of twenty thousand neurons in the hypothalamus that synchronizes bodily rhythms to the solar cycle."
      },
      {
        type: "heading",
        level: 2,
        text: "The Three Anchors of Circadian Entrainment"
      },
      {
        type: "paragraph",
        text: "Calibrating the master clock does not require synthetic supplements; it requires deliberate environmental anchoring through photons, temperature, and nutrition."
      },
      {
        type: "list",
        style: "unordered",
        items: [
          "Photonic timing: Viewing sunlight within 60 minutes of waking sets the melatonin release clock 14-16 hours later.",
          "Thermal downshifting: A drop in core body temperature by 1-2 degrees Fahrenheit is biologically mandatory for initiating Slow-Wave Sleep (SWS).",
          "Metabolic windowing: Ending caloric intake 3 hours prior to sleep allows cellular autophagy and glymphatic clearance to proceed unhindered."
        ]
      }
    ]
  },
  {
    id: "art-8",
    slug: "metabolic-health-cellular-energy",
    title: "The Mitochondrial Engine: Redefining Metabolic Flexibility",
    subtitle: "New insights into how cellular energy production dictates longevity, mental clarity, and chronic disease resistance.",
    category: "Health",
    tags: ["Metabolism", "Longevity", "Nutrition", "Health"],
    author: {
      name: "Dr. Sarah Chen",
      avatar: "https://picsum.photos/seed/sarah/200/200",
      role: "Senior Science Editor",
      bio: "Dr. Sarah Chen is a neurobiologist focusing on sleep architecture, circadian rhythm regulation, and cognitive performance.",
      social: {
        twitter: "https://twitter.com/drsarahchen"
      }
    },
    publishedAt: "2026-08-11T12:00:00Z",
    readingTime: 7,
    heroImage: "https://picsum.photos/seed/mitochondria/1920/1080",
    heroImageAlt: "Microscopic rendering of cellular energy pathways.",
    heroCaption: "Mitochondrial efficiency is directly correlated with cognitive longevity.",
    featured: false,
    sections: [
      {
        type: "paragraph",
        text: "Metabolic flexibility is the cellular capacity to seamlessly switch between burning glucose and fatty acids depending on energetic demands."
      },
      {
        type: "heading",
        level: 2,
        text: "Cellular Energy Dynamics"
      },
      {
        type: "paragraph",
        text: "When mitochondria become overwhelmed by constant nutrient surplus, cellular respiration produces excessive reactive oxygen species, leading to systemic inflammation."
      }
    ]
  },
  {
    id: "art-9",
    slug: "neuroplasticity-habit-formation-protocols",
    title: "Rewiring Focus: How Neuroplasticity Shapes Everyday Habits",
    subtitle: "Actionable protocols grounded in neuroscience for dismantling friction and establishing frictionless daily routines.",
    category: "Health",
    tags: ["Psychology", "Habits", "Neuroscience", "Health"],
    author: {
      name: "James Lin",
      avatar: "https://picsum.photos/seed/james/200/200",
      role: "Psychology Writer",
      bio: "James explores behavioral economics, habit loops, and neuroplasticity in high-performance environments.",
      social: {
        twitter: "https://twitter.com/jameslin"
      }
    },
    publishedAt: "2026-08-07T08:15:00Z",
    readingTime: 5,
    heroImage: "https://picsum.photos/seed/neuroplasticity/1920/1080",
    heroImageAlt: "Abstract neural pathway connections.",
    heroCaption: "Neural pathways strengthen through deliberate repetition and emotional salience.",
    featured: false,
    sections: [
      {
        type: "paragraph",
        text: "The adult brain retains the remarkable capability to physically reorganize its synaptic connections in response to focused attention and repeated behaviors."
      },
      {
        type: "heading",
        level: 2,
        text: "The Synaptic Cost of Habituation"
      },
      {
        type: "paragraph",
        text: "By leveraging limbic friction and identity-based reinforcement, behaviors transition from effortful executive functions to automatic basal ganglia executions."
      }
    ]
  },
  {
    id: "art-10",
    slug: "microbiome-gut-brain-axis",
    title: "The Second Brain: Mapping the Gut-Microbiome-Neuro Axis",
    subtitle: "How trillions of symbiotic microorganisms in the human digestive tract regulate mood, immunity, and cognitive acuity.",
    category: "Health",
    tags: ["Microbiome", "Gut Health", "Neuroscience", "Health"],
    author: {
      name: "Dr. Sarah Chen",
      avatar: "https://picsum.photos/seed/sarah/200/200",
      role: "Senior Science Editor",
      bio: "Dr. Sarah Chen is a neurobiologist focusing on sleep architecture, circadian rhythm regulation, and cognitive performance.",
      social: {
        twitter: "https://twitter.com/drsarahchen",
        linkedin: "https://linkedin.com/in/drsarahchen"
      }
    },
    publishedAt: "2026-08-03T15:40:00Z",
    readingTime: 6,
    heroImage: "https://picsum.photos/seed/gutbrain/1920/1080",
    heroImageAlt: "Fermented natural foods rich in diverse probiotics.",
    heroCaption: "Dietary microbial diversity directly communicates with the vagus nerve.",
    featured: false,
    sections: [
      {
        type: "paragraph",
        text: "Over 90 percent of the body's serotonin and roughly 50 percent of its dopamine are synthesized within the gastrointestinal tract, coordinated by microbial metabolites."
      },
      {
        type: "heading",
        level: 2,
        text: "The Vagal Information Superhighway"
      },
      {
        type: "paragraph",
        text: "Bidirectional signaling between the enteric nervous system and the central nervous system occurs through short-chain fatty acids (SCFAs) like butyrate and acetate."
      }
    ]
  },
  {
    id: "art-11",
    slug: "generative-tutoring-primary-education",
    title: "The Socratic Algorithm: How Generative AI is Reshaping Primary Education",
    subtitle: "Personalized, mastery-based instruction is moving from a luxury pedagogical theory to an accessible classroom reality.",
    category: "Education",
    tags: ["Education", "AI", "Learning", "Pedagogy"],
    author: {
      name: "Marcus Thorne",
      avatar: "https://picsum.photos/seed/marcus/200/200",
      role: "Education & Systems Correspondent",
      bio: "Marcus investigates digital pedagogy, cognitive development, and classroom technology integration.",
      social: {
        twitter: "https://twitter.com/marcusthorne"
      }
    },
    publishedAt: "2026-08-16T11:00:00Z",
    readingTime: 7,
    heroImage: "https://picsum.photos/seed/educationai/1920/1080",
    heroImageAlt: "A student engaging with an interactive digital learning display.",
    heroCaption: "Adaptive feedback loops guide students through individualized mathematical models.",
    featured: true,
    relatedArticles: ["art-1", "art-6", "art-12"],
    sections: [
      {
        type: "paragraph",
        text: "For more than a century, modern schooling has adhered to the factory model of education: fixed cohorts of students moving through uniform syllabi at a predetermined pace regardless of individual mastery."
      },
      {
        type: "heading",
        level: 2,
        text: "The Two-Sigma Problem Revisited"
      },
      {
        type: "paragraph",
        text: "In 1984, educational psychologist Benjamin Bloom demonstrated that one-on-one tutored students performed two standard deviations better than conventionally taught peers. Generative systems are closing this gap at scale."
      },
      {
        type: "callout",
        intent: "info",
        title: "Mastery-Based Learning",
        text: "Unlike traditional letter grading, mastery frameworks require students to achieve complete conceptual comprehension before progressing to advanced modules."
      }
    ]
  },
  {
    id: "art-12",
    slug: "third-places-social-fabric",
    title: "The Disappearance of the Third Place and the Loneliness Epidemic",
    subtitle: "Why the erosion of informal public gathering spots is fracturing civic trust and community resilience.",
    category: "Society",
    tags: ["Society", "Urban Planning", "Community", "Loneliness"],
    author: {
      name: "Elena Rostova",
      avatar: "https://picsum.photos/seed/elena/200/200",
      role: "Culture & Society Analyst",
      bio: "Elena covers civic architecture, urban sociology, and the cultural shifts defining contemporary urban life.",
      social: {
        twitter: "https://twitter.com/elenarostova"
      }
    },
    publishedAt: "2026-08-13T09:30:00Z",
    readingTime: 8,
    heroImage: "https://picsum.photos/seed/thirdplace/1920/1080",
    heroImageAlt: "A bustling sunlit neighborhood public square and library courtyard.",
    heroCaption: "Public plazas and independent bookshops serve as indispensable social glue.",
    featured: true,
    relatedArticles: ["art-2", "art-3", "art-13"],
    sections: [
      {
        type: "paragraph",
        text: "Sociologist Ray Oldenburg coined the term 'Third Place' to describe the physical environments beyond home (the first place) and work (the second place) where spontaneous, unscripted human connection takes place."
      },
      {
        type: "heading",
        level: 2,
        text: "The Commercialization of Shared Space"
      },
      {
        type: "paragraph",
        text: "As municipal parks face disinvestment and commercial landlords enforce pay-to-stay models, free public gathering zones have precipitously declined across urban centers worldwide."
      }
    ]
  },
  {
    id: "art-13",
    slug: "post-growth-economics-business-models",
    title: "Beyond Infinite Expansion: Designing the Post-Growth Enterprise",
    subtitle: "Pioneering companies are proving that regenerative revenue and circular business models outlast debt-fueled hypergrowth.",
    category: "Business",
    tags: ["Business", "Economics", "Sustainability", "Startups"],
    author: {
      name: "Marcus Thorne",
      avatar: "https://picsum.photos/seed/marcus/200/200",
      role: "Business & Systems Writer",
      bio: "Marcus investigates organizational economics, regenerative finance, and sustainable operational models.",
      social: {
        twitter: "https://twitter.com/marcusthorne"
      }
    },
    publishedAt: "2026-08-09T14:15:00Z",
    readingTime: 6,
    heroImage: "https://picsum.photos/seed/businesspost/1920/1080",
    heroImageAlt: "Sustainable urban architectural office integrated with green courtyards.",
    heroCaption: "Circular supply chains reduce raw material dependency and increase enterprise longevity.",
    featured: true,
    relatedArticles: ["art-3", "art-2", "art-11"],
    sections: [
      {
        type: "paragraph",
        text: "For half a century, venture capital and public markets prioritized relentless top-line expansion over durable profitability and ecological balance. A counter-current of resilient founders is now constructing post-growth enterprises."
      },
      {
        type: "heading",
        level: 2,
        text: "The Resilience Advantage"
      },
      {
        type: "paragraph",
        text: "By focusing on stewardship, localized supply chains, and customer value density rather than customer acquisition burn, circular business models thrive during economic turbulence."
      }
    ]
  },
  {
    id: "art-14",
    slug: "cognitive-load-theory-information-age",
    title: "Cognitive Load and the Architecture of Modern Attention",
    subtitle: "How working memory constraints dictate our capacity for creative synthesis in a high-throughput information environment.",
    category: "Psychology",
    tags: ["Psychology", "Cognition", "Neuroscience", "Focus"],
    author: {
      name: "James Lin",
      avatar: "https://picsum.photos/seed/james/200/200",
      role: "Psychology & Behavioral Writer",
      bio: "James explores cognitive load theory, human attention spans, and decision architecture in modern knowledge environments.",
      social: {
        twitter: "https://twitter.com/jameslin"
      }
    },
    publishedAt: "2026-08-06T10:00:00Z",
    readingTime: 6,
    heroImage: "https://picsum.photos/seed/cognitiveload/1920/1080",
    heroImageAlt: "Minimalist workspace with warm diffused light and clear spatial organization.",
    heroCaption: "Reducing extraneous cognitive load frees working memory for high-order creative synthesis.",
    featured: true,
    relatedArticles: ["art-6", "art-9", "art-3"],
    sections: [
      {
        type: "paragraph",
        text: "Human working memory is remarkably constrained: George Miller's classic 1956 research suggested seven plus-or-minus two items, while contemporary neurological research caps active working memory capacity closer to four distinct chunks."
      },
      {
        type: "heading",
        level: 2,
        text: "Extraneous vs. Germane Load"
      },
      {
        type: "paragraph",
        text: "When digital tools introduce fragmented notifications, erratic typography, and unnecessary navigation steps, they induce extraneous cognitive load that actively sabotages conceptual problem-solving."
      }
    ]
  }
];
