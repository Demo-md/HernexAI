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

  if (!name || !email || !message) {
    return Response.json({ ok: false, error: "Please add your name, email, and message." }, { status: 400 });
  }

  const result = await appendToSheet("lead", {
    createdAt: new Date().toISOString(),
    name,
    phone,
    email,
    businessType: company,
    requirement: `${service ? `${service}: ` : ""}${message}`,
    budgetRange: "",
    urgency: "",
    intent: "strategy_form",
    leadScore: phone ? 50 : 20,
    leadStatus: phone ? "Warm Lead" : "Cold Lead",
    conversationSummary: message,
    source: "Homepage Strategy Form"
  });

  if (!result.saved) {
    return Response.json({ ok: false, error: "The enquiry could not be saved right now. Please use WhatsApp or try again." }, { status: 503 });
  }

  return Response.json({ ok: true });
};
