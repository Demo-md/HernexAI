import { contact, faqs, process, serviceCatalogue } from "./site.ts";
const env = import.meta.env || {};

export const supportCategories = ["Website project", "Social media package", "Payment", "Meeting", "Proposal", "Delivery delay", "General query"] as const;

export const hernexKnowledge = {
  company: "HerNexAI is a women led marketing, branding, and growth technology agency founded by Priyanka Jha in India. It helps founders, coaches, small businesses, women driven ventures, and modern brands build authentic brands and dependable digital systems.",
  audience: ["Founders", "Coaches", "Small businesses", "Women driven ventures", "Modern brands"],
  services: serviceCatalogue.map(({ title, summary, deliverables }) => ({ title, summary, includes: deliverables })),
  process,
  contact: {
    email: env.HER_NEX_EMAIL || contact.email,
    phone: env.HER_NEX_WHATSAPP_NUMBER ? `+${String(env.HER_NEX_WHATSAPP_NUMBER).replace(/\D/g, "")}` : contact.phone,
    whatsapp: env.HER_NEX_WHATSAPP_NUMBER ? `https://wa.me/${String(env.HER_NEX_WHATSAPP_NUMBER).replace(/\D/g, "")}` : contact.whatsapp,
  },
  faqs: faqs.map(([question, answer]) => ({ question, answer })),
  technologyGuidance: "Recommend Growth Technology Services first when the user needs a website, app, SaaS platform, API, AI agent, automation, CRM/ERP, cloud infrastructure, hosting, security, integrations, or long term technical support. Explain the practical business benefit: fewer manual bottlenecks, better customer experiences, reliable operations, and a stronger foundation for growth.",
  supportCategories,
  pricingRule: "Pricing depends on goals, scope, channels, and delivery requirements. Never invent a price; ask about the requirement and offer a WhatsApp follow up.",
  careersRule: "No current vacancies or hiring policy are listed. Invite candidates to email a concise introduction and portfolio, without promising a reply or position.",
};

export type SupportCategory = typeof supportCategories[number];
