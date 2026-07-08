import type { ChatIntent } from "./intents";

export type LeadStatus = "Cold Lead" | "Warm Lead" | "Hot Lead";

export function scoreLead(intent: ChatIntent, fields: { phone?: string; urgency?: string; requirement?: string; whatsappConsent?: boolean }, whatsappClick = false) {
  const score = (intent === "pricing_enquiry" ? 30 : 0) + (fields.phone ? 30 : 0) + (fields.urgency ? 20 : 0) + (fields.requirement ? 20 : 0) + (whatsappClick || fields.whatsappConsent ? 10 : 0);
  const status: LeadStatus = score >= 70 ? "Hot Lead" : score >= 30 ? "Warm Lead" : "Cold Lead";
  return { score, status };
}
