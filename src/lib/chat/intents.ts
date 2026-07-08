import { supportCategories, type SupportCategory } from "../../data/hernex-knowledge.ts";

export type ChatIntent = "general_question" | "service_enquiry" | "pricing_enquiry" | "website_enquiry" | "social_media_enquiry" | "support_request" | "complaint" | "job_career_query" | "spam_irrelevant";
export type ChatMessage = { role: "user" | "assistant"; content: string };

export function isConversationalDetour(message: string) {
  return /^(?:hi+|hello+|hey+|yo+|sup|what'?s up|how are you|good (?:morning|afternoon|evening)|thanks?|thank you)[\s!?.👋🙂😊]*$/i.test(message.trim());
}

const tests: Array<[ChatIntent, RegExp]> = [
  ["spam_irrelevant", /crypto scam|adult content|betting|gambling|casino|buy followers|abusive spam/i],
  ["complaint", /complaint|unhappy|refund|fraud|not satisfied|angry|terrible service/i],
  ["support_request", /need help|issue|problem|not working|support|stuck|service delay|delivery delay|payment problem/i],
  ["pricing_enquiry", /price|pricing|cost|package|charges|rate|budget|quotation|quote/i],
  ["job_career_query", /job|hiring|vacancy|internship|career|resume|cv|portfolio/i],
  ["website_enquiry", /website|landing page|e-?commerce|web design|web development|web application|mobile app|saas|api development/i],
  ["social_media_enquiry", /social media|instagram|facebook|linkedin|reels|carousel|content calendar/i],
  ["service_enquiry", /branding|ads|advertising|seo|automation|funnels?|leads?|analytics|marketing help|services?|software|cloud|crm|erp|devops|database|hosting|infrastructure|technical consulting/i],
];

export function detectIntent(message: string, history: ChatMessage[] = []): ChatIntent {
  const text = `${history.filter(({ role }) => role === "user").map(({ content }) => content).join(" ")} ${message}`;
  return tests.find(([, pattern]) => pattern.test(text))?.[0] || "general_question";
}

export function detectSupportCategory(text: string): SupportCategory | undefined {
  return supportCategories.find((category) => new RegExp(category.replace(" project", "|project").replace(" package", "|package"), "i").test(text));
}

export function extractLeadFields(message: string, history: ChatMessage[] = []) {
  const userMessages = [...history.filter(({ role }) => role === "user").map(({ content }) => content), message];
  const all = userMessages.join(" ");
  const latest = message.trim();
  const answerAfter = (pattern: RegExp) => {
    for (let index = history.length - 1; index >= 0; index--) if (history[index].role === "assistant" && pattern.test(history[index].content)) {
      const answer = history.slice(index + 1).find(({ role }) => role === "user")?.content || latest;
      return isConversationalDetour(answer) ? undefined : answer;
    }
  };
  const phone = all.match(/(?:\+?91[\s-]?)?[6-9]\d{9}\b/)?.[0];
  const email = all.match(/[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i)?.[0];
  const explicitName = all.match(/(?:my name is|this is)\s+([a-z][a-z .'-]{1,40})/i)?.[1]?.trim();
  const nameAnswer = answerAfter(/what(?:'s| is) your name|what name should|(?:tell|provide|share|send|give).{0,32}(?:your )?name|your name is\.*\?|name should i/i);
  const name = explicitName || (nameAnswer && /^[a-z][a-z .'-]{1,40}$/i.test(nameAnswer) ? nameAnswer : undefined);
  const businessType = answerAfter(/type of business|what business|which industry/i) || all.match(/(?:business|company|brand)\s+(?:is|for)\s+([^,.]{2,60})/i)?.[1]?.trim();
  const serviceInterest = all.match(/branding|social media|website|ads?|seo|automation|funnels?|leads?|analytics|content|software|mobile app|saas|api|cloud|crm|erp|devops|database|hosting|infrastructure/i)?.[0];
  const budgetRange = all.match(/(?:₹|rs\.?|inr|budget(?: is| of)?)[\s:]*(?:\d[\d,.]*\s*(?:k|lakh|lakhs)?|under\s+\d[\d,.]*|flexible)/i)?.[0] || answerAfter(/budget range|budget.*plan/i);
  const urgency = all.match(/urgent|asap|immediately|this week|today|tomorrow|within a week/i)?.[0] || answerAfter(/how soon|preferred timeline|when.*start|urgency/i);
  const consentAnswer = answerAfter(/contact you on whatsapp|continue.*whatsapp|open a whatsapp chat|whatsapp chat/i);
  const whatsappConsent = Boolean(consentAnswer && /\byes\b|sure|okay|ok|please do|contact me/i.test(consentAnswer));
  const whatsappDeclined = Boolean(consentAnswer && /\bno\b|not now|no thanks|don'?t/i.test(consentAnswer));
  const supportCategory = detectSupportCategory(all);
  const issueSummary = answerAfter(/share the issue|issue in 1.?2 lines/i);
  const requirement = (serviceInterest ? userMessages.find((text) => /need|want|looking|help|build|improve|launch/i.test(text)) : undefined) || answerAfter(/what.*need|describe.*requirement|outcome.*looking/i);
  return { name, phone, email, businessType, requirement, budgetRange, urgency, serviceInterest, whatsappConsent, whatsappDeclined, supportCategory, issueSummary };
}
