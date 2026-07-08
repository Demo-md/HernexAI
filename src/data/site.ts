export const contact = {
  email: "hernexai@gmail.com",
  phone: "+91 9581444069",
  whatsapp: "https://wa.me/919581444069"
};

export const proofPoints = [
  { value: "100%", label: "Tailored engagement scope built around each client vision" },
  { value: "100+", label: "Founder, coach, and service-business profiles audited" },
  { value: "90", label: "Content ideas generated through one strategic framework" },
  { value: "Weekly", label: "Metric review and optimisation rhythm" },
];

export const services = [
  {
    title: "Branding & Identity",
    kicker: "Become unmistakable",
    summary: "Define how your brand looks, sounds, and earns trust before campaigns go live.",
    problem: "Your audience sees posts, ads, and a website, but not one clear brand they can remember.",
    solution: "We shape positioning, messaging, visual identity, brand systems, and launch assets that make your business easier to choose.",
    includes: ["Brand strategy", "Naming support", "Logo & visual system", "Messaging framework", "Brand guidelines", "Launch kit"],
    tags: ["Strategy", "Positioning", "Visual Identity"]
  },
  {
    title: "Social Media & Content",
    kicker: "Turn attention into trust",
    summary: "Build content systems for awareness, authority, and consistent audience growth.",
    problem: "Content is inconsistent, random, and disconnected from sales goals.",
    solution: "We plan content pillars, calendars, short-form concepts, carousels, captions, and campaign narratives built around buyer questions.",
    includes: ["Content strategy", "Monthly calendar", "Reels concepts", "Carousel systems", "Copywriting", "Community prompts"],
    tags: ["Reels", "Carousels", "Content Calendar"]
  },
  {
    title: "Performance Marketing",
    kicker: "Spend with discipline",
    summary: "Launch paid campaigns with sharper targeting, stronger creatives, and cleaner tracking.",
    problem: "Ad spend creates traffic but not predictable leads, sales, or learning.",
    solution: "We build paid media funnels across Meta and Google with testing loops, audience strategy, conversion assets, and reporting.",
    includes: ["Meta ads", "Google ads", "Landing page direction", "A/B testing", "Pixel setup", "ROAS reporting"],
    tags: ["Meta Ads", "Google Ads", "Landing Pages"]
  },
  {
    title: "Website & E-commerce",
    kicker: "Make the site sell clearly",
    summary: "Design fast websites and landing pages that explain, persuade, and convert.",
    problem: "Visitors arrive but do not understand why they should stay, trust, or take action.",
    solution: "We create premium website journeys with sharp copy, service routing, conversion sections, and mobile-first UX.",
    includes: ["Website strategy", "UX/UI design", "Conversion copy", "Service pages", "E-commerce flows", "Speed basics"],
    tags: ["Web Design", "E-commerce", "Conversion"]
  },
  {
    title: "SEO & Organic Growth",
    kicker: "Compound demand",
    summary: "Improve visibility across Google, local discovery, and AI-powered search journeys.",
    problem: "Your buyers search for solutions, but your brand does not show up with the right answers.",
    solution: "We create technical SEO foundations, topic clusters, schema, FAQs, and useful content designed for modern search journeys.",
    includes: ["Technical SEO", "Keyword strategy", "Content clusters", "Schema markup", "Local SEO", "Search visibility"],
    tags: ["SEO", "Local Search", "AI Search"]
  },
  {
    title: "Marketing Automation & AI",
    slug: "marketing-automation-and-ai",
    kicker: "Scale without chaos",
    summary: "Use automation and AI to qualify leads, nurture prospects, and reduce manual follow-up.",
    problem: "Leads leak because follow-ups, CRM updates, and nurture messages depend on manual effort.",
    solution: "We map customer journeys and build automated workflows, lead scoring, email flows, and responsive follow-up systems.",
    includes: ["CRM workflow", "Email automation", "Lead scoring", "Chat workflows", "Zapier/Make flows", "Journey mapping"],
    tags: ["WhatsApp", "CRM", "AI Workflows"]
  },
  {
    title: "Lead Generation & Sales Funnels",
    kicker: "Create qualified conversations",
    summary: "Design offers, landing pages, and nurture flows that move strangers toward sales calls.",
    problem: "People visit, like, or click, but very few become serious enquiries.",
    solution: "We build lead magnets, funnel pages, qualification forms, retargeting paths, and sales enablement content.",
    includes: ["Offer strategy", "Lead magnet", "Funnel page", "Qualification form", "Nurture sequence", "Sales handoff"],
    tags: ["Funnels", "Lead Magnets", "Email"]
  },
  {
    title: "Analytics, Consulting & Training",
    kicker: "Know what is working",
    summary: "Make marketing decisions with clean dashboards, audits, workshops, and growth consulting.",
    problem: "Reports show activity but not the decisions your team should make next.",
    solution: "We audit current systems, build dashboards, train teams, and turn marketing data into action plans.",
    includes: ["Growth audit", "GA4 setup", "Dashboards", "Team training", "Strategy workshops", "Monthly consulting"],
    tags: ["Reports", "Audits", "Training"]
  },
  {
    title: "Growth Technology Services",
    slug: "tech-services",
    kicker: "Build dependable digital products",
    summary: "We build the digital systems your business needs to grow from websites, mobile apps, SaaS products, APIs, AI agents, automation, CRM/ERP, cloud setup, hosting, security, and long-term technical support.",
    problem: "Growth stalls when websites, applications, data, automation, and infrastructure are fragmented or difficult to maintain.",
    solution: "We connect product strategy, experience design, software delivery, integrations, automation, cloud, deployment, security, and ongoing support around one practical roadmap.",
    includes: [
      "Website Development",
      "Custom Web Applications",
      "Mobile Application Development",
      "SaaS Product Development",
      "API Development & Integration",
      "Artificial Intelligence Enablement",
      "AI Agent Development",
      "Business Automation",
      "Workflow Automation",
      "CRM Development",
      "ERP Development",
      "Cloud Solutions",
      "Database Design & Architecture",
      "DevOps & Deployment",
      "UI/UX Design",
      "Software Maintenance",
      "Application Support",
      "Performance Optimization",
      "Security Enhancement",
      "Hosting & Infrastructure Management",
      "Technical Consulting",
      "Emerging Technology Solutions"
    ],
    tags: ["Web & Apps", "Automation", "Cloud"]
  }
].map((service) => ({
  ...service,
  slug: "slug" in service ? service.slug : service.title.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")
}));

export const process = ["Discover", "Position", "Build", "Launch", "Optimize", "Scale"];

export const faqs = [
  ["What does HerNexAI do?", "Founded by Priyanka Jha, HerNexAI is a women-led digital marketing agency that blends human creativity with smart technology across branding, content, advertising, websites, SEO, automation, funnels, analytics, consulting, and training."],
  ["Does HerNexAI provide technology services?", "Yes. HerNexAI builds websites, apps, SaaS platforms, APIs, AI agents, automation systems, CRM/ERP solutions, cloud infrastructure, and provides ongoing technical support."],
  ["Can HerNexAI build custom software for my business?", "Yes. We design and develop custom software based on your workflow, users, and business goals — including dashboards, portals, booking systems, automation tools, and internal business platforms."],
  ["Do you provide AI and automation solutions?", "Yes. We help businesses use AI agents, workflow automation, CRM automation, chatbot support, reporting systems, and smart tools to reduce manual work and improve efficiency."],
  ["Do you handle deployment, hosting, and maintenance?", "Yes. We can manage hosting, cloud setup, deployment, database setup, performance optimization, security improvements, and ongoing application support."],
  ["How do I start a tech project with HerNexAI?", "You can start by sharing your business goal and required features. Our team will understand your needs, suggest the right solution, and provide a clear scope, timeline, and development plan."],
  ["Can you build a complete website and marketing funnel?", "Yes. The website, service pages, blog, chatbot, WhatsApp CTA, lead capture, and follow-up logic can be planned as one connected funnel."],
  ["How is HerNexAI different from a normal agency?", "The work is built around business outcomes: clearer positioning, stronger creative, better conversion paths, practical automation, transparent reporting, and content that answers real buyer questions."],
  ["Do you support SEO and search visibility?", "Yes. Pages are structured with clear headings, FAQs, internal links, useful content, local relevance, and sound technical foundations for modern search journeys."],
  ["How does a project start?", "Start with a discovery call. We identify the bottleneck, recommend the right service mix, and define the first launch sprint."],
  ["Do you work with small businesses?", "Yes. The service model works for startups, local businesses, personal brands, service companies, and growing teams that need a reliable marketing system."]
];

export const blogSeed = [
  {
    slug: "how-search-visibility-shapes-marketing",
    title: "How Search Visibility Shapes Marketing Strategy",
    excerpt: "Modern search rewards clear answers, useful structure, and genuine expertise.",
    author: "HerNexAI Team",
    updatedAt: "2026-07-07T00:00:00.000Z",
    content: "Search is changing how customers discover brands. Clear positioning, structured content, useful FAQs, local relevance, and trustworthy service pages now matter across the whole discovery journey.\n\nFor HerNexAI clients, every page should answer the buyer's question first, then explain the service, proof, process, and next step. That structure helps people and search platforms understand what the company does."
  }
];
