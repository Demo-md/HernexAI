import type { APIRoute } from "astro";
import { hernexKnowledge, supportCategories } from "../../data/hernex-knowledge";
import { detectIntent, extractLeadFields, isConversationalDetour, type ChatMessage } from "../../lib/chat/intents";
import { scoreLead } from "../../lib/chat/leadScoring";
import { appendToSheet } from "../../lib/chat/sheets";
import { buildSystemPrompt, getFlowInstruction } from "../../lib/chat/systemPrompt";

const cleanHistory = (value: unknown): ChatMessage[] => Array.isArray(value)
  ? value.slice(-24).flatMap((item) => item && ["user", "assistant"].includes(item.role) && typeof item.content === "string" ? [{ role: item.role as ChatMessage["role"], content: item.content.slice(0, 1200) }] : [])
  : [];

const pendingQuestion = (history: ChatMessage[]) => {
  for (let index = history.length - 1; index >= 0; index--) {
    const message = history[index];
    if (message.role !== "assistant" || !message.content.includes("?")) continue;
    const start = Math.max(message.content.lastIndexOf(". "), message.content.lastIndexOf("! "));
    return message.content.slice(start < 0 ? 0 : start + 2).trim();
  }
};

const detourReply = (message: string, question: string, sessionId: string) => {
  const replies = [
    `Hey! 👋 I’m still holding our place. ${question}`,
    `Hi! Tiny scenic detour accepted 😄 We were here: ${question}`,
    `Hello! I won’t let the conversation trail wander off 😄 ${question}`,
    `Hey there! Coming back to our last step: ${question}`,
  ];
  const index = [...`${sessionId}${message}`].reduce((total, character) => total + character.charCodeAt(0), 0) % replies.length;
  return replies[index];
};

const fallbackReply = (intent: string, fields: ReturnType<typeof extractLeadFields>, history: ChatMessage[]) => {
  const assistantText = history.filter(({ role }) => role === "assistant").map(({ content }) => content).join(" ");
  if (intent === "spam_irrelevant") return "I can help with HerNexAI services, marketing questions, enquiries, and support requests.";
  if (intent === "complaint" || intent === "support_request") {
    if (!fields.supportCategory) return `Sorry about that. Is this related to ${supportCategories.join(", ")}?`;
    if (!fields.issueSummary) return "Please share the issue in 1–2 lines so I can create a support request for the team.";
    if (!fields.name) return "What name should I add to the support request?";
    if (!fields.phone) return "Please share your WhatsApp number so the team can follow up. By sharing it, you allow HerNexAI to contact you about this request.";
    return "I’ve noted this support request. The HerNexAI team can follow up on WhatsApp.";
  }
  if (["service_enquiry", "pricing_enquiry", "website_enquiry", "social_media_enquiry"].includes(intent)) {
    if (!fields.serviceInterest) return "Let’s find the strongest growth lever first. Are you looking for Growth Technology Services—websites, apps, software, or automation—or branding, social media, ads, SEO, or funnels?";
    if (!fields.businessType) return /website|software|mobile app|saas|api|automation|cloud|crm|erp|devops|database|hosting|infrastructure/i.test(fields.serviceInterest) ? "Growth Technology Services may be the right fit if disconnected tools or manual work are slowing you down. What type of business is this for?" : "Great. What type of business is this for?";
    if (!fields.requirement) return "Briefly, what outcome or requirement are you looking for?";
    if (!/continue.*whatsapp|contact you on whatsapp|open a whatsapp chat|whatsapp chat/i.test(assistantText)) return "Would you like me to save your enquiry and then open a WhatsApp chat with the HerNexAI team?";
    if (fields.whatsappDeclined) return "No problem—I won’t collect contact details. You can continue asking questions here.";
    if (!fields.whatsappConsent) return "Please answer yes or no. If yes, I’ll collect the remaining details one at a time before showing the WhatsApp button.";
    if (fields.whatsappConsent && !fields.name) return "What name should the team use?";
    if (fields.name && !fields.phone) return "Please share your WhatsApp number. By sharing it, you allow HerNexAI to follow up on your enquiry.";
    if (fields.phone && !fields.budgetRange) return "What budget range should the team plan around? You can also say flexible or not sure.";
    if (fields.budgetRange && !fields.urgency) return "How soon would you like to start?";
    return "Thanks—I have everything needed to save your enquiry.";
  }
  if (intent === "job_career_query") return `Current vacancies are not listed. You can email a concise introduction and portfolio to ${hernexKnowledge.contact.email}.`;
  return "I can help with HerNexAI services, marketing questions, pricing enquiries, and support. What would you like to improve?";
};

export const POST: APIRoute = async ({ request }) => {
  const body = await request.json().catch(() => ({}));
  const message = typeof body.message === "string" ? body.message.trim() : "";
  if (!message || message.length > 500) return Response.json({ error: "Enter a question under 500 characters." }, { status: 400 });

  const sessionId = typeof body.sessionId === "string" && body.sessionId.length < 100 ? body.sessionId : crypto.randomUUID();
  const history = cleanHistory(body.history);
  const awaitingAnswer = pendingQuestion(history);
  const conversationalDetour = awaitingAnswer && isConversationalDetour(message) ? detourReply(message, awaitingAnswer, sessionId) : undefined;
  const intent = detectIntent(message, history);
  const fields = extractLeadFields(message, history);
  const { score: leadScore, status: leadStatus } = scoreLead(intent, fields, body.event === "whatsapp_click");
  const flowInstruction = getFlowInstruction(intent, fields, history);
  const now = new Date().toISOString();
  const state = { leadSaved: Boolean(body.state?.leadSaved), supportTicketCreated: Boolean(body.state?.supportTicketCreated) };
  const conversationSummary = [...history.slice(-5).map(({ role, content }) => `${role}: ${content}`), `user: ${message}`].join(" | ").slice(0, 1500);

  let supportTicketCreated = false;
  let supportTicketSaveFailed = false;
  let ticketId: string | undefined;
  if (["support_request", "complaint"].includes(intent) && fields.supportCategory && fields.issueSummary && fields.name && fields.phone && !state.supportTicketCreated) {
    ticketId = `HN-${Date.now().toString(36).toUpperCase()}`;
    const priority = intent === "complaint" || fields.supportCategory === "Payment" || /urgent|not working|delay/i.test(`${fields.issueSummary} ${fields.urgency || ""}`) ? "High" : ["Meeting", "Proposal"].includes(fields.supportCategory) ? "Medium" : "Low";
    const result = await appendToSheet("support_ticket", { createdAt: now, ticketId, name: fields.name, phone: fields.phone, category: fields.supportCategory, issueSummary: fields.issueSummary, priority, status: "Open", source: "Website Chatbot" });
    supportTicketCreated = result.saved;
    supportTicketSaveFailed = !result.saved;
  }

  let leadSaved = false;
  let leadSaveFailed = false;
  const serviceIntent = ["service_enquiry", "pricing_enquiry", "website_enquiry", "social_media_enquiry"].includes(intent);
  const leadReady = serviceIntent && fields.whatsappConsent && fields.name && fields.phone && fields.businessType && fields.requirement && fields.budgetRange && fields.urgency;
  if (leadReady && !state.leadSaved) {
    const result = await appendToSheet("lead", { createdAt: now, name: fields.name, phone: fields.phone, email: fields.email || "", businessType: fields.businessType, requirement: fields.requirement, budgetRange: fields.budgetRange, urgency: fields.urgency, intent, leadScore, leadStatus, conversationSummary, source: "Website Chatbot" });
    leadSaved = result.saved;
    leadSaveFailed = !result.saved;
  }

  let reply = conversationalDetour || fallbackReply(intent, fields, history);
  let source: "groq" | "fallback" = "fallback";
  const deterministicFlow = ["support_request", "complaint", "service_enquiry", "pricing_enquiry", "website_enquiry", "social_media_enquiry"].includes(intent);
  if (!conversationalDetour && intent !== "spam_irrelevant" && !deterministicFlow) {
    const apiKey = import.meta.env.GROQ_API_KEY || process.env.GROQ_API_KEY;
    if (apiKey) try {
      const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
        signal: AbortSignal.timeout(12000),
        body: JSON.stringify({ model: import.meta.env.GROQ_MODEL || process.env.GROQ_MODEL || "llama-3.1-8b-instant", temperature: .25, max_completion_tokens: 300, messages: [{ role: "system", content: buildSystemPrompt(intent, flowInstruction) }, ...history.slice(-8), { role: "user", content: message }] })
      });
      if (!response.ok) throw new Error(`Groq returned ${response.status}`);
      const data = await response.json();
      reply = data.choices?.[0]?.message?.content || reply;
      source = "groq";
    } catch (error) { console.error("[chat] Groq unavailable:", error instanceof Error ? error.message : "Unknown error"); }
  }

  if (leadSaved) reply = `Thanks, ${fields.name}. Your enquiry is saved. Tap “Start WhatsApp Chat” to continue directly with the HerNexAI team.`;
  if (leadSaveFailed) reply = "I collected your details, but the enquiry could not be saved right now. Please try once more before continuing to WhatsApp.";
  if (supportTicketCreated && ticketId) reply = `I’ve created support request ${ticketId}. The HerNexAI team can follow up on WhatsApp. Would you like to continue there?`;
  if (supportTicketSaveFailed) reply = "I collected the support details, but the ticket could not be saved right now. Please try again.";
  if (leadSaved || supportTicketCreated) void appendToSheet("conversation", { createdAt: new Date().toISOString(), sessionId, role: "summary", message: conversationSummary, intent });

  const whatsappReady = state.leadSaved || state.supportTicketCreated || leadSaved || supportTicketCreated;
  const showContact = whatsappReady || /contact|phone|email|whatsapp/i.test(message);
  const suggestedActions = !fields.supportCategory && ["support_request", "complaint"].includes(intent)
    ? [...supportCategories]
    : whatsappReady ? ["Start WhatsApp Chat", "View Services"] : ["View Services"];

  return Response.json({ reply, intent, leadScore, leadStatus, suggestedActions, supportCategories: !fields.supportCategory && ["support_request", "complaint"].includes(intent) ? supportCategories : [], supportTicketCreated, ticketId, leadSaved, whatsappReady, source, sessionId, contact: showContact ? hernexKnowledge.contact : null });
};
