import { contact, getServiceCatalogueItem } from "../data/site";
import { getApprovedEvidence } from "../data/service-evidence";

export type ServiceInterestContext = {
  serviceSlug: string;
  interactionType: "hover-intent" | "focus" | "tap" | "explicit";
};

export function buildServiceWhatsAppUrl(serviceTitle: string) {
  const message = `Hello HernexAI, I am exploring ${serviceTitle}.\n\nMy current challenge is:\n\nI would like to understand the right next step.`;
  return `${contact.whatsapp}?text=${encodeURIComponent(message)}`;
}

export function getServiceInterestMessage(context: ServiceInterestContext) {
  const service = getServiceCatalogueItem(context.serviceSlug);
  if (!service) return undefined;
  const evidence = getApprovedEvidence(service.evidenceKey);
  const consequence = service.category === "technology"
    ? "Left unresolved, the gap can keep creating manual work, uncertainty, or maintenance pressure for the team."
    : "Left unresolved, the gap can keep making attention, enquiry, and follow up harder to connect.";
  const message = `${service.problem} ${consequence} ${service.solution} A short conversation can identify the most useful first step without assuming a fixed scope.`;
  return {
    service,
    headline: service.kicker,
    message,
    evidenceText: evidence?.displayText,
    evidenceSource: evidence?.sourceTitle,
    whatsappLabel: `Discuss ${service.title}`,
    whatsappUrl: buildServiceWhatsAppUrl(service.title),
  };
}
