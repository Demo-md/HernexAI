export const contact = {
  email: "hernexai@gmail.com",
  phone: "+91 9581444069",
  whatsapp: "https://wa.me/919581444069"
};

export type ServiceCategory = "marketing" | "technology";

type ServiceInput = {
  title: string;
  slug?: string;
  category: ServiceCategory;
  kicker: string;
  summary: string;
  problem: string;
  solution: string;
  includes: string[];
  tags: string[];
};

export type Service = Omit<ServiceInput, "slug"> & { slug: string };

export const proofPoints = [
  { value: "100%", label: "Tailored engagement scope built around each client vision" },
  { value: "100+", label: "Founder, coach, and service business profiles audited" },
  { value: "90", label: "Content ideas generated through one strategic framework" },
  { value: "Weekly", label: "Metric review and optimisation rhythm" },
];

const serviceData: ServiceInput[] = [
  {
    title: "Branding & Identity",
    category: "marketing",
    kicker: "Become unmistakable",
    summary: "Define how your brand looks, sounds, and earns trust before campaigns go live.",
    problem: "Your audience sees posts, ads, and a website, but not one clear brand they can remember.",
    solution: "We shape positioning, messaging, visual identity, brand systems, and launch assets that make your business easier to choose.",
    includes: ["Brand strategy", "Naming support", "Logo & visual system", "Messaging framework", "Brand guidelines", "Launch kit"],
    tags: ["Strategy", "Positioning", "Visual Identity"]
  },
  {
    title: "Social Media & Content",
    category: "marketing",
    kicker: "Turn attention into trust",
    summary: "Build content systems for awareness, authority, and consistent audience growth.",
    problem: "Content is inconsistent, random, and disconnected from sales goals.",
    solution: "We plan content pillars, calendars, short form concepts, carousels, captions, and campaign narratives built around buyer questions.",
    includes: ["Content strategy", "Monthly calendar", "Reels concepts", "Carousel systems", "Copywriting", "Community prompts"],
    tags: ["Reels", "Carousels", "Content Calendar"]
  },
  {
    title: "Performance Marketing",
    category: "marketing",
    kicker: "Spend with discipline",
    summary: "Launch paid campaigns with sharper targeting, stronger creatives, and cleaner tracking.",
    problem: "Ad spend creates traffic but not predictable leads, sales, or learning.",
    solution: "We build paid media funnels across Meta and Google with testing loops, audience strategy, conversion assets, and reporting.",
    includes: ["Meta ads", "Google ads", "Landing page direction", "A/B testing", "Pixel setup", "ROAS reporting"],
    tags: ["Meta Ads", "Google Ads", "Landing Pages"]
  },
  {
    title: "Website and Ecommerce",
    slug: "website-and-e-commerce",
    category: "marketing",
    kicker: "Make the site sell clearly",
    summary: "Design fast websites and landing pages that explain, persuade, and convert.",
    problem: "Visitors arrive but do not understand why they should stay, trust, or take action.",
    solution: "We create premium website journeys with sharp copy, service routing, conversion sections, and mobile first UX.",
    includes: ["Website strategy", "UX/UI design", "Conversion copy", "Service pages", "Ecommerce flows", "Speed basics"],
    tags: ["Web Design", "Ecommerce", "Conversion"]
  },
  {
    title: "SEO & Organic Growth",
    category: "marketing",
    kicker: "Compound demand",
    summary: "Improve visibility across Google, local discovery, and AI powered search journeys.",
    problem: "Your buyers search for solutions, but your brand does not show up with the right answers.",
    solution: "We create technical SEO foundations, topic clusters, schema, FAQs, and useful content designed for modern search journeys.",
    includes: ["Technical SEO", "Keyword strategy", "Content clusters", "Schema markup", "Local SEO", "Search visibility"],
    tags: ["SEO", "Local Search", "AI Search"]
  },
  {
    title: "Marketing Automation & AI",
    slug: "marketing-automation-and-ai",
    category: "marketing",
    kicker: "Scale without chaos",
    summary: "Use automation and AI to qualify leads, nurture prospects, and reduce manual follow up.",
    problem: "Leads leak because follow ups, CRM updates, and nurture messages depend on manual effort.",
    solution: "We map customer journeys and build automated workflows, lead scoring, email flows, and responsive follow up systems.",
    includes: ["CRM workflow", "Email automation", "Lead scoring", "Chat workflows", "Zapier/Make flows", "Journey mapping"],
    tags: ["WhatsApp", "CRM", "AI Workflows"]
  },
  {
    title: "Lead Generation & Sales Funnels",
    category: "marketing",
    kicker: "Create qualified conversations",
    summary: "Design offers, landing pages, and nurture flows that move strangers toward sales calls.",
    problem: "People visit, like, or click, but very few become serious enquiries.",
    solution: "We build lead magnets, funnel pages, qualification forms, retargeting paths, and sales enablement content.",
    includes: ["Offer strategy", "Lead magnet", "Funnel page", "Qualification form", "Nurture sequence", "Sales handoff"],
    tags: ["Funnels", "Lead Magnets", "Email"]
  },
  {
    title: "Analytics, Consulting & Training",
    category: "marketing",
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
    category: "technology",
    kicker: "Build dependable digital products",
    summary: "We build the digital systems your business needs to grow from websites, mobile apps, SaaS products, APIs, AI agents, automation, CRM/ERP, cloud setup, hosting, security, and long term technical support.",
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
];

export const services: Service[] = serviceData.map((service) => ({
  ...service,
  slug: service.slug ?? service.title.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")
}));

const serviceCategoryDetails = {
  marketing: { label: "Marketing", description: "Brand, content, campaigns, visibility, and conversion." },
  technology: { label: "Technology", description: "Products, platforms, automation, and technical foundations." },
} as const;

export const serviceGroups = (Object.keys(serviceCategoryDetails) as ServiceCategory[]).map((category) => ({
  category,
  ...serviceCategoryDetails[category],
  services: services.filter((service) => service.category === category),
}));

export type ServiceCatalogueItem = {
  slug: string;
  title: string;
  category: ServiceCategory;
  kicker: string;
  summary: string;
  problem: string;
  solution: string;
  deliverables: string[];
  tags: string[];
  chatbotContext: string;
  whatsappContext: string;
  evidenceKey: string;
  relatedCapabilities: string[];
};

export const marketingServices: ServiceCatalogueItem[] = services
  .filter((service) => service.category === "marketing")
  .map((service) => ({
    ...service,
    deliverables: service.includes,
    chatbotContext: service.problem,
    whatsappContext: `I am exploring ${service.title}.`,
    evidenceKey: service.slug,
    relatedCapabilities: [],
  }));

const technologyCapability = (
  slug: string,
  title: string,
  kicker: string,
  summary: string,
  problem: string,
  solution: string,
  deliverables: string[],
  tags: string[],
  relatedCapabilities: string[] = [],
): ServiceCatalogueItem => ({
  slug,
  title,
  category: "technology",
  kicker,
  summary,
  problem,
  solution,
  deliverables,
  tags,
  chatbotContext: problem,
  whatsappContext: `I am exploring ${title}.`,
  evidenceKey: slug,
  relatedCapabilities,
});

export const technologyCapabilities: ServiceCatalogueItem[] = [
  technologyCapability("website-development", "Website Development", "A dependable front door", "Build an accessible, maintainable website that makes the offer and next action clear.", "An outdated or hard to manage website leaves buyers without a reliable path to understand the business.", "We plan, build, test, and deploy websites around content, journeys, and maintainable foundations.", ["Information architecture", "Responsive build", "CMS ready structure", "Deployment support"], ["Web", "Responsive", "Foundations"], ["ui-ux-design", "hosting-infrastructure-management"]),
  technologyCapability("custom-web-applications", "Custom Web Applications", "Fit the workflow", "Create focused browser based tools for the way your team or customers actually work.", "Off the shelf tools can force workarounds that make operations slower and harder to track.", "We scope and build tailored web applications with clear roles, journeys, and maintainable architecture.", ["Workflow mapping", "Role based interfaces", "Application build", "Launch support"], ["Web Apps", "Operations", "Product"], ["database-design-architecture", "api-development-integration"]),
  technologyCapability("mobile-application-development", "Mobile Application Development", "Useful in the moment", "Design mobile experiences around fast, task focused customer or team interactions.", "Important actions can be difficult to complete when a business only offers a desktop first workflow.", "We define mobile journeys, key screens, integrations, and release ready product foundations.", ["Mobile UX", "Feature planning", "Integration mapping", "Release support"], ["Mobile", "Product", "UX"], ["ui-ux-design", "api-development-integration"]),
  technologyCapability("saas-product-development", "SaaS Product Development", "Make the product coherent", "Shape subscription products from user flows and product logic through launch foundations.", "A promising SaaS idea can become expensive when features are built before the product model is clear.", "We connect product strategy, interface design, engineering, billing considerations, and operational readiness.", ["Product discovery", "User flows", "MVP roadmap", "Delivery planning"], ["SaaS", "MVP", "Product"], ["custom-web-applications", "ui-ux-design"]),
  technologyCapability("api-development-integration", "API Development & Integration", "Make systems talk", "Connect reliable data flows between the tools your team already depends on.", "Manual re entry and disconnected tools create delays, duplicate records, and avoidable mistakes.", "We design APIs and integrations with clear ownership, error handling, and practical handoffs.", ["API design", "Third party integration", "Data mapping", "Error handling"], ["APIs", "Integration", "Data"], ["database-design-architecture", "workflow-automation"]),
  technologyCapability("artificial-intelligence-enablement", "Artificial Intelligence Enablement", "Use AI with purpose", "Identify practical AI opportunities that support people, quality control, and business workflows.", "Teams can adopt disconnected AI tools without clear governance, useful inputs, or review points.", "We assess workflows, define guardrails, and introduce AI where it removes genuine friction.", ["Opportunity audit", "Workflow design", "Guardrails", "Team enablement"], ["AI", "Enablement", "Governance"], ["ai-agent-development", "business-automation"]),
  technologyCapability("ai-agent-development", "AI Agent Development", "Support repeatable work", "Create bounded AI assistants for defined customer, content, or internal workflow tasks.", "Repeatable questions and handoffs can consume team attention without improving the customer experience.", "We define agent responsibilities, approved knowledge, escalation paths, and safe human review.", ["Agent scope", "Knowledge design", "Escalation rules", "Monitoring plan"], ["AI Agents", "Support", "Automation"], ["artificial-intelligence-enablement", "workflow-automation"]),
  technologyCapability("business-automation", "Business Automation", "Reduce manual drag", "Automate repeatable operating steps without making the process opaque or fragile.", "Teams spend time moving information between tools instead of serving customers or improving the work.", "We map the process, automate the useful steps, and leave clear human checkpoints.", ["Process audit", "Automation map", "Tool configuration", "Documentation"], ["Automation", "Operations", "Efficiency"], ["workflow-automation", "crm-development"]),
  technologyCapability("workflow-automation", "Workflow Automation", "Keep handoffs moving", "Connect triggers, ownership, and follow up across the work that should not rely on memory.", "Tasks stall when a handoff depends on one person remembering the next step.", "We create visible workflow rules, notifications, and exception paths that teams can maintain.", ["Trigger mapping", "Automation rules", "Exception paths", "Team handover"], ["Workflows", "Automation", "Handoffs"], ["business-automation", "api-development-integration"]),
  technologyCapability("crm-development", "CRM Development", "Make relationships usable", "Structure customer data and sales follow up around the decisions your team needs to make.", "Customer context can disappear across spreadsheets, inboxes, and disconnected sales activity.", "We design CRM stages, fields, automations, and reporting around a practical sales process.", ["Pipeline design", "Data fields", "Automation", "Reporting setup"], ["CRM", "Sales", "Data"], ["workflow-automation", "lead-generation-and-sales-funnels"]),
  technologyCapability("erp-development", "ERP Development", "Connect the operation", "Plan integrated operational systems for inventory, finance, people, or delivery workflows.", "Separate operational records make it difficult to understand what is happening across the business.", "We map the required operational model, integrations, roles, and staged delivery plan.", ["Process discovery", "System architecture", "Role mapping", "Integration plan"], ["ERP", "Operations", "Architecture"], ["database-design-architecture", "custom-web-applications"]),
  technologyCapability("cloud-solutions", "Cloud Solutions", "Make infrastructure intentional", "Choose cloud foundations that support the application, team, security needs, and future growth.", "Infrastructure choices made in a hurry can create reliability and maintenance problems later.", "We assess workloads, design a pragmatic cloud setup, and document operational ownership.", ["Cloud assessment", "Environment design", "Access planning", "Operations guide"], ["Cloud", "Infrastructure", "Reliability"], ["devops-deployment", "hosting-infrastructure-management"]),
  technologyCapability("database-design-architecture", "Database Design & Architecture", "Keep data dependable", "Design data structures that are clear to query, extend, protect, and maintain.", "Poorly structured data makes reporting, integrations, and application changes increasingly risky.", "We model entities, relationships, access, and performance needs before the data layer becomes a bottleneck.", ["Data modelling", "Schema design", "Access rules", "Performance review"], ["Database", "Architecture", "Data"], ["api-development-integration", "custom-web-applications"]),
  technologyCapability("devops-deployment", "DevOps & Deployment", "Ship with confidence", "Build repeatable release and environment practices that reduce avoidable launch risk.", "Manual deployments and unclear environments make changes harder to test, trace, and roll back.", "We set up practical delivery pipelines, environment conventions, and release checks.", ["Environment setup", "Deployment pipeline", "Release checks", "Rollback plan"], ["DevOps", "Deployment", "Reliability"], ["cloud-solutions", "hosting-infrastructure-management"]),
  technologyCapability("ui-ux-design", "UI/UX Design", "Make complex work clear", "Design useful interfaces around user decisions, accessibility, and the context of the task.", "A feature can be technically complete but still hard to understand, trust, or use.", "We translate user needs into journeys, information hierarchy, interface patterns, and tested priorities.", ["User flows", "Wireframes", "Interface direction", "Accessibility review"], ["UI/UX", "Research", "Interface"], ["website-development", "mobile-application-development"]),
  technologyCapability("software-maintenance", "Software Maintenance", "Keep the system healthy", "Maintain and improve existing software without forcing an unnecessary rebuild.", "Small unresolved defects and outdated dependencies can make routine changes increasingly risky.", "We assess the current application, prioritise maintenance work, and create a practical improvement plan.", ["Codebase assessment", "Dependency review", "Bug fixes", "Maintenance roadmap"], ["Maintenance", "Reliability", "Software"], ["application-support", "performance-optimization"]),
  technologyCapability("application-support", "Application Support", "Keep users moving", "Provide structured support pathways for the applications your team or customers rely on.", "Unclear ownership can leave users without a dependable way to report or resolve issues.", "We define support categories, escalation paths, communication rules, and maintenance handoffs.", ["Support model", "Issue triage", "Escalation paths", "Service handover"], ["Support", "Operations", "Service"], ["software-maintenance", "security-enhancement"]),
  technologyCapability("performance-optimization", "Performance Optimization", "Remove useful friction", "Find and address the technical bottlenecks that make key experiences slower or less reliable.", "Slow pages and applications can frustrate users and make teams hesitant to improve the product.", "We investigate relevant bottlenecks, prioritise changes, and validate improvements against the actual experience.", ["Performance audit", "Bottleneck analysis", "Optimisation plan", "Validation"], ["Performance", "Web Vitals", "Reliability"], ["website-development", "software-maintenance"]),
  technologyCapability("security-enhancement", "Security Enhancement", "Reduce avoidable exposure", "Improve common security controls, access practices, and application hardening priorities.", "Unreviewed access, dependencies, and application paths can create avoidable risk.", "We assess the appropriate scope, identify practical controls, and explain what needs specialist escalation.", ["Security review", "Access controls", "Hardening plan", "Risk register"], ["Security", "Risk", "Controls"], ["hosting-infrastructure-management", "application-support"]),
  technologyCapability("hosting-infrastructure-management", "Hosting & Infrastructure Management", "Keep ownership visible", "Operate hosting and supporting infrastructure with clear access, monitoring, and maintenance responsibilities.", "Hosting can become fragile when credentials, renewals, and operational checks are not owned clearly.", "We organise hosting responsibilities, deployment access, and routine infrastructure maintenance.", ["Hosting review", "Access inventory", "Monitoring setup", "Maintenance plan"], ["Hosting", "Infrastructure", "Operations"], ["cloud-solutions", "devops-deployment"]),
  technologyCapability("technical-consulting", "Technical Consulting", "Choose the right build", "Clarify the technical decision before investing in a product, integration, or platform change.", "Teams can lose time and budget when they start building before agreeing on the real requirement.", "We facilitate discovery, options, trade offs, and a staged recommendation grounded in the operating context.", ["Discovery workshop", "Options review", "Technical roadmap", "Vendor neutral advice"], ["Consulting", "Roadmap", "Planning"], ["emerging-technology-solutions", "saas-product-development"]),
  technologyCapability("emerging-technology-solutions", "Emerging Technology Solutions", "Explore without hype", "Evaluate new technologies against a real business problem, capability, and delivery risk.", "New technology can create distraction when it is adopted because it is fashionable rather than useful.", "We assess fit, prototype only when justified, and define what evidence would support the next decision.", ["Opportunity framing", "Feasibility review", "Prototype plan", "Decision criteria"], ["Innovation", "R&D", "Strategy"], ["technical-consulting", "artificial-intelligence-enablement"]),
];

export const serviceCatalogue = [...marketingServices, ...technologyCapabilities];

export function getServiceCatalogueItem(slug: string) {
  return serviceCatalogue.find((service) => service.slug === slug);
}

export const brandPrinciples = ["Understand before prescribing.", "Make the message useful before making it louder.", "Use AI to support the work, not replace the thinking."];

export const process = ["Discover", "Position", "Build", "Launch", "Optimize", "Scale"];

export const faqs = [
  ["What does HerNexAI do?", "Founded by Priyanka Jha, HerNexAI is a women led digital marketing agency that blends human creativity with smart technology across branding, content, advertising, websites, SEO, automation, funnels, analytics, consulting, and training."],
  ["Does HerNexAI provide technology services?", "Yes. HerNexAI builds websites, apps, SaaS platforms, APIs, AI agents, automation systems, CRM/ERP solutions, cloud infrastructure, and provides ongoing technical support."],
  ["Can HerNexAI build custom software for my business?", "Yes. We design and develop custom software based on your workflow, users, and business goals, including dashboards, portals, booking systems, automation tools, and internal business platforms."],
  ["Do you provide AI and automation solutions?", "Yes. We help businesses use AI agents, workflow automation, CRM automation, chatbot support, reporting systems, and smart tools to reduce manual work and improve efficiency."],
  ["Do you handle deployment, hosting, and maintenance?", "Yes. We can manage hosting, cloud setup, deployment, database setup, performance optimization, security improvements, and ongoing application support."],
  ["How do I start a tech project with HerNexAI?", "You can start by sharing your business goal and required features. Our team will understand your needs, suggest the right solution, and provide a clear scope, timeline, and development plan."],
  ["Can you build a complete website and marketing funnel?", "Yes. The website, service pages, blog, chatbot, WhatsApp CTA, lead capture, and follow up logic can be planned as one connected funnel."],
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
