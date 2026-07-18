export type BlogStatus = "draft" | "scheduled" | "published" | "archived";

export type BlogPost = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage: string;
  coverImageAlt: string;
  authorName: string;
  category: string;
  tags: string[];
  status: BlogStatus;
  featured: boolean;
  publishedAt: string;
  updatedAt: string;
  estimatedReadingTime: string;
  metaTitle: string;
  metaDescription: string;
  canonicalUrl?: string;
  ogImage?: string;
  noindex: boolean;
  isDevelopmentFixture?: boolean;
};

// These are presentation fixtures for Phase 2C. They are visibly labelled in
// the UI and excluded from feeds and the sitemap until approved editorial copy
// is supplied through the Phase 2D content source.
export const blogFixtures: BlogPost[] = [
  {
    id: "search-visibility-strategy",
    title: "How Search Visibility Shapes Marketing Strategy",
    slug: "how-search-visibility-shapes-marketing",
    excerpt: "Modern search rewards clear answers, useful structure, and genuine expertise.",
    content: "## Start with the question\n\nSearch is changing how customers discover brands. Clear positioning, structured content, useful FAQs, local relevance, and trustworthy service pages now matter across the whole discovery journey.\n\n## Make the next action obvious\n\nEvery page should answer the buyer's question first, then explain the service, proof, process, and next step. That structure helps people and search platforms understand what the company does.\n\n> A useful page is easier to find because it is easier to understand.\n\n- Lead with the customer question\n- Explain the work in plain language\n- Make the next action specific",
    coverImage: "/insights/search-visibility.svg",
    coverImageAlt: "Abstract search path diagram connecting a question, clear answer, and next action.",
    authorName: "HerNexAI Team",
    category: "Visibility",
    tags: ["Search", "Content", "Strategy"],
    status: "published",
    featured: true,
    publishedAt: "2026-07-07T00:00:00.000Z",
    updatedAt: "2026-07-07T00:00:00.000Z",
    estimatedReadingTime: "3 min read",
    metaTitle: "How Search Visibility Shapes Marketing Strategy | HerNexAI",
    metaDescription: "A practical note on structuring marketing pages around customer questions and useful next actions.",
    ogImage: "/insights/search-visibility.svg",
    noindex: false,
  },
  {
    id: "fixture-brief-to-action",
    title: "Preview article: From a campaign brief to a clearer next action",
    slug: "preview-brief-to-next-action",
    excerpt: "A development preview showing how the future editorial format handles a practical planning topic.",
    content: "## A brief should create direction\n\nThis development fixture demonstrates the structure of a public article before approved editorial content is connected. It is not presented as a client story or a published HerNexAI perspective.\n\n## Keep the handoff usable\n\nA useful brief makes room for the audience question, the message, the decision needed next, and the owner of that decision.\n\n::: note\nReplace this fixture with approved editorial material before publication.\n:::\n\n| Input | Useful outcome |\n| --- | --- |\n| Audience question | A clear message |\n| Campaign goal | A specific next action |",
    coverImage: "/insights/brief-to-action.svg",
    coverImageAlt: "Abstract editorial diagram showing a brief becoming a clear next action.",
    authorName: "HerNexAI Team",
    category: "Planning",
    tags: ["Campaigns", "Briefs"],
    status: "published",
    featured: false,
    publishedAt: "2026-07-18T00:00:00.000Z",
    updatedAt: "2026-07-18T00:00:00.000Z",
    estimatedReadingTime: "2 min read",
    metaTitle: "Preview: From a Campaign Brief to a Clearer Next Action | HerNexAI",
    metaDescription: "Development preview article fixture for the HernexAI public Blog system.",
    ogImage: "/insights/brief-to-action.svg",
    noindex: true,
    isDevelopmentFixture: true,
  },
  {
    id: "fixture-human-led-systems",
    title: "Preview article: Where automation helps a human led system",
    slug: "preview-human-led-systems",
    excerpt: "A development preview of the article template, not an approved public claim or case study.",
    content: "## Support the work, not the noise\n\nAutomation earns its place when it reduces repeatable operational drag while keeping decisions visible to the people responsible for them.\n\n## Decide what stays human\n\nChoose the moments that need context, judgment, and relationship building before introducing a workflow.\n\n```text\nQuestion to human decision to useful automation to clear follow up\n```\n\nThis is a development fixture awaiting approved editorial content.",
    coverImage: "/insights/human-led-systems.svg",
    coverImageAlt: "Abstract workflow diagram balancing human judgment and a practical automation step.",
    authorName: "HerNexAI Team",
    category: "Systems",
    tags: ["Automation", "Operations"],
    status: "published",
    featured: false,
    publishedAt: "2026-07-17T00:00:00.000Z",
    updatedAt: "2026-07-17T00:00:00.000Z",
    estimatedReadingTime: "2 min read",
    metaTitle: "Preview: Where Automation Helps a Human Led System | HerNexAI",
    metaDescription: "Development preview article fixture for the HernexAI public Blog system.",
    ogImage: "/insights/human-led-systems.svg",
    noindex: true,
    isDevelopmentFixture: true,
  },
];
