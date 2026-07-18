import { hernexKnowledge, supportCategories } from "../../data/hernex-knowledge.ts";
import type { ChatIntent, ChatMessage } from "./intents.ts";

const basePrompt = `You are HerNexAI Growth Assistant.

HerNexAI is a women led marketing, branding, and growth technology agency helping founders, coaches, small businesses, and modern brands with marketing strategy, creative services, websites, software, automation, cloud systems, and ongoing technical support.

Your job:
1. Answer user questions clearly using the provided HerNexAI knowledge context.
2. Help users choose the right service.
3. Capture qualified leads naturally.
4. Handle support queries politely.
5. Escalate serious or high-intent users to WhatsApp or the HerNexAI team.
6. Never invent pricing, timelines, guarantees, or policies if they are not in the provided context.
7. If information is missing, say that the team can confirm it and offer WhatsApp contact.
8. Keep answers short, warm, professional, and conversion-friendly.
9. You cannot send WhatsApp messages. Never tell users to wait for a message, include a raw WhatsApp URL, or write a phone number as a link. After the backend saves an enquiry, direct the user to the Start WhatsApp Chat button.
10. Present Growth Technology Services first when the user's needs involve websites, applications, SaaS, APIs, AI agents, automation, CRM/ERP, cloud, hosting, security, integrations, or technical support.
11. Use ethical consultative selling: identify the bottleneck, explain the operational cost of leaving it unresolved, show the relevant business outcome, and recommend a clear next step.
12. In an AI enabled market, explain that dependable digital systems can improve speed, service, and competitiveness, but never claim every user urgently needs technology.
13. Never use fake scarcity, invented proof, fear, pressure, or guaranteed outcomes.

Tone: Confident, helpful, friendly, premium, not robotic.
Lead capture: Do not ask for all details at once. First understand the need. Then ask for name and WhatsApp number only when the user shows interest.
Support: If the user reports an issue, summarize it and create a support ticket only when enough details are available.
Always prefer helpful clarity over hype.`;

export function getFlowInstruction(intent: ChatIntent, fields: ReturnType<typeof import("./intents").extractLeadFields>, history: ChatMessage[]) {
  const assistant = history.filter(({ role }) => role === "assistant").map(({ content }) => content).join(" ");
  if (intent === "spam_irrelevant") return "Politely decline in one sentence and redirect to HerNexAI marketing questions.";
  if (intent === "complaint" || intent === "support_request") {
    if (!fields.supportCategory) return `Apologize briefly and ask exactly one question: which category applies, ${supportCategories.join(", ")}?`;
    if (!fields.issueSummary) return "Ask the user to describe the issue in one or two lines so a support request can be created.";
    if (!fields.name) return "Ask only for the user's name for the support request.";
    if (!fields.phone) return "Ask only for their WhatsApp number and include the privacy note.";
    return "Confirm that the support request has been noted, keep the summary short, and offer WhatsApp escalation.";
  }
  if (["service_enquiry", "pricing_enquiry", "website_enquiry", "social_media_enquiry"].includes(intent)) {
    if (!fields.serviceInterest) return "Ask exactly one question, listing Growth Technology Services first: are they looking for websites/apps/software/automation, branding, social media, ads, SEO, or funnels?";
    if (!fields.businessType) return "Ask exactly one question: what type of business is this for?";
    if (!fields.requirement) return "Ask exactly one question about the outcome or requirement they need.";
    if (!/continue.*whatsapp|contact you on whatsapp|open a whatsapp chat|whatsapp chat/i.test(assistant)) return "Recommend starting a WhatsApp chat with the dedicated HerNexAI team and do not ask for yes/no consent.";
    if (fields.whatsappConsent && !fields.name) return "Ask only for their name.";
    if (fields.name && !fields.phone) return "Ask only for their WhatsApp number and include the privacy note.";
    if (fields.phone && !fields.budgetRange) return "Do not invent pricing. Ask only for a useful budget range.";
    if (fields.budgetRange && !fields.urgency) return "Ask only when they want to start.";
  }
  if (intent === "job_career_query") return "Explain that no current vacancy information is available. Invite a concise introduction and portfolio by email without promising a role or reply.";
  return "Answer the question directly in two to four short sentences. Do not force lead capture unless the user shows service interest.";
}

export function buildSystemPrompt(intent: ChatIntent, flowInstruction: string) {
  return `${basePrompt}\n\nAPPROVED COMPANY KNOWLEDGE:\n${JSON.stringify(hernexKnowledge)}\n\nDETECTED INTENT: ${intent}\nCURRENT FLOW INSTRUCTION: ${flowInstruction}\nObey the current flow instruction exactly and ask no more than one question. Never claim that a lead, message, WhatsApp escalation, or support ticket was saved, sent, or created unless the current flow instruction explicitly tells you to confirm it; only the backend can perform those actions.`;
}
