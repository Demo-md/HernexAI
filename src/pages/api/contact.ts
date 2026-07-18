import type { APIRoute } from "astro";
import { appendToSheet } from "../../lib/chat/sheets";

const clean = (value: unknown) => typeof value === "string" ? value.trim().slice(0, 500) : "";

export const POST: APIRoute = async ({ request }) => {
  const body = await request.json().catch(() => ({}));
  const name = clean(body.name);
  const email = clean(body.email);
  const phone = clean(body.phone);
  const company = clean(body.company);
  const service = clean(body.service);
  const message = clean(body.message);
  const budgetRange = clean(body.budgetRange);
  const customBudget = clean(body.customBudget);

  if (!name || !email || !phone || !message || !budgetRange || (budgetRange === "Custom budget" && !customBudget)) {
    return Response.json({ ok: false, error: "Please add your name, email, phone number, message, and budget details." }, { status: 400 });
  }

  const result = await appendToSheet("lead", {
    createdAt: new Date().toISOString(),
    name,
    phone,
    email,
    businessType: company,
    requirement: `${service ? `${service}: ` : ""}${message}`,
    budgetRange: customBudget ? `${budgetRange}: ${customBudget}` : budgetRange,
    urgency: "",
    intent: "strategy_form",
    leadScore: 50,
    leadStatus: "Warm Lead",
    conversationSummary: message,
    source: "Homepage Strategy Form"
  });

  if (!result.saved) {
    return Response.json({ ok: false, error: "The enquiry could not be saved right now. Please use WhatsApp or try again." }, { status: 503 });
  }

  return Response.json({ ok: true });
};
