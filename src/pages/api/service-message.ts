import type { APIRoute } from "astro";
import { getServiceInterestMessage, type ServiceInterestContext } from "../../lib/service-context";

const cache = new Map<string, ReturnType<typeof getServiceInterestMessage>>();
const recentRequests = new Map<string, number>();
const allowedInteractions = new Set<ServiceInterestContext["interactionType"]>(["hover-intent", "focus", "tap", "explicit"]);

export const POST: APIRoute = async ({ request }) => {
  const body = await request.json().catch(() => ({}));
  const serviceSlug = typeof body.serviceSlug === "string" ? body.serviceSlug.slice(0, 120) : "";
  const interactionType = typeof body.interactionType === "string" && allowedInteractions.has(body.interactionType as ServiceInterestContext["interactionType"])
    ? body.interactionType as ServiceInterestContext["interactionType"]
    : "explicit";
  const sessionId = typeof body.sessionId === "string" ? body.sessionId.slice(0, 100) : "anonymous";
  const rateKey = `${sessionId}:${serviceSlug}`;
  const now = Date.now();
  if (now - (recentRequests.get(rateKey) || 0) < 900) return Response.json({ error: "Please wait a moment before requesting this service context again." }, { status: 429 });
  recentRequests.set(rateKey, now);

  const cacheKey = `${serviceSlug}:${interactionType}`;
  const result = cache.get(cacheKey) || getServiceInterestMessage({ serviceSlug, interactionType });
  if (!result) return Response.json({ error: "That service context is unavailable." }, { status: 404 });
  cache.set(cacheKey, result);
  return Response.json({ ...result, source: "deterministic-approved-context" });
};
