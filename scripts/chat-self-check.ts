import assert from "node:assert/strict";
import { detectIntent, extractLeadFields, isConversationalDetour } from "../src/lib/chat/intents.ts";
import { scoreLead } from "../src/lib/chat/leadScoring.ts";

assert.equal(detectIntent("What is your pricing package?"), "pricing_enquiry");
assert.equal(detectIntent("I am unhappy and need a refund"), "complaint");
assert.equal(detectIntent("Can you build my website?"), "website_enquiry");
assert.equal(detectIntent("I need Instagram reels"), "social_media_enquiry");
assert.equal(detectIntent("Tell me about branding"), "service_enquiry");
assert.equal(detectIntent("I need cloud and CRM development"), "service_enquiry");
assert.equal(detectIntent("I have an issue and need support"), "support_request");
assert.equal(detectIntent("Are you hiring interns?"), "job_career_query");
assert.equal(detectIntent("crypto scam betting casino"), "spam_irrelevant");
assert.equal(detectIntent("Who founded the company?"), "general_question");
const fields = extractLeadFields("My phone is 9581444069 and this is urgent. I need a website.");
assert.equal(fields.phone, "9581444069");
assert.equal(scoreLead("pricing_enquiry", { ...fields, requirement: "website" }).status, "Hot Lead");
assert.equal(scoreLead("general_question", {}).status, "Cold Lead");
const pendingHistory = [
  { role: "user" as const, content: "I need a website" },
  { role: "assistant" as const, content: "Great. What type of business is this for?" },
];
assert.equal(isConversationalDetour("hi"), true);
assert.equal(extractLeadFields("hi", pendingHistory).businessType, undefined);
const leadHistory = [
  { role: "user" as const, content: "Website" },
  { role: "assistant" as const, content: "Great. What type of business is this for?" },
  { role: "user" as const, content: "Cloud consulting" },
  { role: "assistant" as const, content: "Briefly, what outcome or requirement are you looking for?" },
  { role: "user" as const, content: "I need a custom SaaS application" },
  { role: "assistant" as const, content: "Would you like me to save your enquiry and then open a WhatsApp chat with the HerNexAI team?" },
  { role: "user" as const, content: "yes" },
  { role: "assistant" as const, content: "What name should the team use?" },
  { role: "user" as const, content: "Alex Kumar" },
  { role: "assistant" as const, content: "Please share your WhatsApp number." },
  { role: "user" as const, content: "9581444069" },
  { role: "assistant" as const, content: "What budget range should the team plan around?" },
  { role: "user" as const, content: "2 lakh" },
  { role: "assistant" as const, content: "How soon would you like to start?" },
];
const completeLead = extractLeadFields("this month", leadHistory);
assert.equal(completeLead.name, "Alex Kumar");
assert.equal(completeLead.phone, "9581444069");
assert.equal(completeLead.businessType, "Cloud consulting");
assert.equal(completeLead.requirement, "I need a custom SaaS application");
assert.equal(completeLead.budgetRange, "2 lakh");
assert.equal(completeLead.urgency, "this month");
assert.equal(completeLead.whatsappConsent, true);
console.log("chat self-check passed");
