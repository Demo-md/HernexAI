import { ChatbotStateController, type BotState } from "./state-controller";
import { initialiseLauncherInteractions } from "./launcher-interactions";

type ChatMessage = { role: "user" | "assistant"; content: string };
type ChatResponse = {
  reply: string;
  sessionId: string;
  leadSaved?: boolean;
  supportTicketCreated?: boolean;
  whatsappReady?: boolean;
  suggestedActions?: string[];
  contact?: { whatsapp?: string } | null;
};
type ServiceMessageResponse = {
  headline: string;
  message: string;
  whatsappLabel: string;
  whatsappUrl: string;
};
type ServiceInterestDetail = { serviceSlug: string; interactionType: "hover-intent" | "focus" | "tap" | "explicit"; openChat?: boolean };

type Cleanup = () => void;

const sessionKey = "hernex-chat-session";
const greetingKey = "hernex-bot-greeted";
const serviceDismissalKey = "hernex-service-bot-dismissed";
const whatsappUrlPattern = /https?:\/\/(?:www\.)?wa\.me\/[^\s)\]}]+|(?:www\.)?wa\.me\/[^\s)\]}]+/gi;

function prepareAssistantReply(content: string) {
  const includesWhatsAppUrl = whatsappUrlPattern.test(content);
  whatsappUrlPattern.lastIndex = 0;
  if (!includesWhatsAppUrl) return { content, includesWhatsAppUrl: false };

  const cleaned = content
    .replace(whatsappUrlPattern, "")
    .replace(/\s*\(\s*\)/g, "")
    .replace(/\s+([.,)])/g, "$1")
    .replace(/:\s*$/g, ".")
    .replace(/\s{2,}/g, " ")
    .trim();

  return { content: cleaned, includesWhatsAppUrl: true };
}

function appendMessage(container: HTMLElement, role: ChatMessage["role"], content: string) {
  const message = document.createElement("p");
  message.className = `chat-message chat-message--${role === "assistant" ? "bot" : "user"}`;
  message.textContent = content;
  container.append(message);
  const scrollContainer = container.closest<HTMLElement>("[data-chat-body]") || container;
  scrollContainer.scrollTop = scrollContainer.scrollHeight;
}

function appendAction(container: HTMLElement, label: string, href: string, variant: "default" | "whatsapp" = "default") {
  const link = document.createElement("a");
  link.className = `chat-action${variant === "whatsapp" ? " chat-action--whatsapp" : ""}`;
  link.href = href;
  link.textContent = variant === "whatsapp" ? `${label} ↗` : label;
  if (/^https?:/.test(href)) { link.target = "_blank"; link.rel = "noreferrer"; }
  container.append(link);
  const scrollContainer = container.closest<HTMLElement>("[data-chat-body]") || container;
  scrollContainer.scrollTop = scrollContainer.scrollHeight;
}

export function initialiseChatbot(): Cleanup {
  const root = document.querySelector<HTMLElement>("[data-chatbot]");
  const launcher = root?.querySelector<HTMLButtonElement>("[data-chat-launcher]");
  const panel = root?.querySelector<HTMLElement>("[data-chat-panel]");
  const closeButton = root?.querySelector<HTMLButtonElement>("[data-chat-close]");
  const minimiseButton = root?.querySelector<HTMLButtonElement>("[data-chat-minimise]");
  const resetPositionButton = root?.querySelector<HTMLButtonElement>("[data-chat-reset-position]");
  const form = root?.querySelector<HTMLFormElement>("[data-chat-form]");
  const input = root?.querySelector<HTMLTextAreaElement>("#chat-input");
  const messagesElement = root?.querySelector<HTMLElement>("[data-chat-messages]");
  const starters = root?.querySelector<HTMLElement>("[data-chat-starters]");
  const status = root?.querySelector<HTMLElement>("[data-chat-status]");
  const presence = root?.querySelector<HTMLElement>("[data-chat-presence]");
  const serviceBubble = root?.querySelector<HTMLElement>("[data-service-bot-bubble]");
  const serviceBubbleTitle = root?.querySelector<HTMLElement>("[data-service-bot-title]");
  const serviceBubbleMessage = root?.querySelector<HTMLElement>("[data-service-bot-message]");
  const serviceBubbleWhatsApp = root?.querySelector<HTMLAnchorElement>("[data-service-bot-whatsapp]");
  const serviceBubbleDismiss = root?.querySelector<HTMLButtonElement>("[data-service-bot-dismiss]");
  const serviceBubbleMore = root?.querySelector<HTMLButtonElement>("[data-service-bot-more]");
  if (!root || !launcher || !panel || !closeButton || !minimiseButton || !form || !input || !messagesElement || !status || !presence) return () => {};

  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const state = new ChatbotStateController(root);
  const launcherInteractions = initialiseLauncherInteractions({ root, launcher, panel, state, reducedMotion, status });
  let history: ChatMessage[] = [];
  let sessionId = sessionStorage.getItem(sessionKey) || crypto.randomUUID();
  let savedState = { leadSaved: false, supportTicketCreated: false };
  let closeTimer: number | undefined;
  let pointerFrame = 0;
  let pendingPointer: PointerEvent | undefined;
  let activeServiceMessage: ServiceMessageResponse | undefined;
  let serviceRequest: AbortController | undefined;
  const serviceMessages = new Map<string, ServiceMessageResponse>();
  const triggeredServices = new Set<string>();

  const setPresence = (text: string, mode?: "error") => {
    presence.textContent = text;
    presence.classList.toggle("is-error", mode === "error");
  };
  const dismissStarters = () => { if (starters) starters.hidden = true; };
  const finishOpen = () => {
    panel.hidden = false;
    requestAnimationFrame(() => panel.classList.add("is-open"));
    launcher.setAttribute("aria-expanded", "true");
    state.set("chat-open");
    launcherInteractions.onPanelOpen();
    setPresence("Ready to help");
    window.setTimeout(() => input.focus(), reducedMotion ? 0 : 120);
  };
  const close = (restoreFocus = true, next: BotState = "idle") => {
    window.clearTimeout(closeTimer);
    panel.classList.remove("is-open");
    launcher.setAttribute("aria-expanded", "false");
    state.set(next);
    closeTimer = window.setTimeout(() => { panel.hidden = true; launcherInteractions.onPanelClosed(); if (restoreFocus) launcher.focus(); }, reducedMotion ? 0 : 170);
  };
  const open = () => { if (panel.hidden) finishOpen(); else close(); };
  const onClose = () => close();
  const onMinimise = () => close(true, "minimised");

  const sendMessage = async (value: string) => {
    const message = value.trim();
    if (!message) return;
    if (message.length > 500) {
      state.set("error");
      status.textContent = "Keep your message under 500 characters so HerNex Bot can respond clearly.";
      status.classList.add("is-error");
      setPresence("Message needs shortening", "error");
      return;
    }
    dismissStarters();
    appendMessage(messagesElement, "user", message);
    history.push({ role: "user", content: message });
    input.value = "";
    input.style.height = "";
    state.set("typing");
    status.textContent = "";
    status.classList.remove("is-error");
    setPresence("HerNex Bot is thinking…");
    const submit = form.querySelector<HTMLButtonElement>("button[type='submit']");
    if (submit) submit.disabled = true;
    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message, history: history.slice(0, -1), sessionId, state: savedState }),
      });
      const data = await response.json().catch(() => ({})) as Partial<ChatResponse> & { error?: string };
      if (!response.ok || !data.reply) throw new Error(data.error || "HerNex Bot could not reply right now.");
      sessionId = data.sessionId || sessionId;
      sessionStorage.setItem(sessionKey, sessionId);
      savedState = { leadSaved: Boolean(data.leadSaved) || savedState.leadSaved, supportTicketCreated: Boolean(data.supportTicketCreated) || savedState.supportTicketCreated };
      const assistantReply = prepareAssistantReply(data.reply);
      appendMessage(messagesElement, "assistant", assistantReply.content);
      history.push({ role: "assistant", content: assistantReply.content });
      if (data.contact?.whatsapp && (assistantReply.includesWhatsAppUrl || data.whatsappReady || data.suggestedActions?.includes("Start WhatsApp Chat"))) appendAction(messagesElement, "Chat on WhatsApp", data.contact.whatsapp, "whatsapp");
      if (data.suggestedActions?.includes("View Services")) appendAction(messagesElement, "Explore services", "/services");
      state.set("success");
      setPresence("Ready to help");
      window.setTimeout(() => state.set("chat-open"), reducedMotion ? 0 : 550);
    } catch (error) {
      state.set("error");
      status.textContent = error instanceof Error ? error.message : "HerNex Bot is unavailable right now. Try again or use WhatsApp.";
      status.classList.add("is-error");
      setPresence("Connection issue", "error");
      window.setTimeout(() => state.set("chat-open"), reducedMotion ? 0 : 700);
    } finally {
      if (submit) submit.disabled = false;
    }
  };

  const onSubmit = (event: SubmitEvent) => { event.preventDefault(); void sendMessage(input.value); };
  const onInput = () => { input.style.height = ""; input.style.height = `${Math.min(input.scrollHeight, 96)}px`; };
  const onKeydown = (event: KeyboardEvent) => {
    if (event.key === "Escape" && !panel.hidden) close();
    if (event.key === "Enter" && !event.shiftKey && document.activeElement === input) { event.preventDefault(); void sendMessage(input.value); }
  };
  const onQuickAction = (event: Event) => {
    const target = event.currentTarget as HTMLButtonElement;
    if (panel.hidden) finishOpen();
    dismissStarters();
    void sendMessage(target.dataset.chatQuick || "");
  };
  const onPointer = (event: PointerEvent) => {
    if (reducedMotion || !window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    pendingPointer = event;
    if (pointerFrame) return;
    pointerFrame = requestAnimationFrame(() => {
      pointerFrame = 0;
      if (!pendingPointer) return;
      const x = Math.max(-5, Math.min(5, (pendingPointer.clientX / window.innerWidth - 0.5) * 10));
      const y = Math.max(-4, Math.min(4, (pendingPointer.clientY / window.innerHeight - 0.5) * -8));
      root.style.setProperty("--bot-look-x", `${x}deg`);
      root.style.setProperty("--bot-look-y", `${y}deg`);
      if (state.state === "idle") state.set("looking");
    });
  };
  const onPointerLeave = () => { root.style.setProperty("--bot-look-x", "0deg"); root.style.setProperty("--bot-look-y", "0deg"); if (state.state === "looking" || state.state === "hovered") state.set("idle"); };
  const onHover = () => { if (!reducedMotion && panel.hidden) state.set("hovered"); };
  const dismissServiceBubble = () => {
    if (!serviceBubble) return;
    serviceBubble.hidden = true;
    sessionStorage.setItem(serviceDismissalKey, "true");
  };
  const openServiceConversation = () => {
    if (!activeServiceMessage) return;
    if (panel.hidden) finishOpen();
    dismissStarters();
    appendMessage(messagesElement, "assistant", activeServiceMessage.message);
    appendAction(messagesElement, activeServiceMessage.whatsappLabel, activeServiceMessage.whatsappUrl, "whatsapp");
    dismissServiceBubble();
  };
  const onServiceInterest = async (event: Event) => {
    const detail = (event as CustomEvent<ServiceInterestDetail>).detail;
    if (!detail?.serviceSlug || reducedMotion && detail.interactionType !== "explicit") return;
    if (detail.interactionType !== "explicit" && (sessionStorage.getItem(serviceDismissalKey) || triggeredServices.has(detail.serviceSlug))) return;
    serviceRequest?.abort();
    serviceRequest = new AbortController();
    try {
      let data = serviceMessages.get(detail.serviceSlug);
      if (!data) {
        const response = await fetch("/api/service-message", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          signal: serviceRequest.signal,
          body: JSON.stringify({ serviceSlug: detail.serviceSlug, interactionType: detail.interactionType, sessionId }),
        });
        if (!response.ok) throw new Error("Service context is unavailable.");
        data = await response.json() as ServiceMessageResponse;
        serviceMessages.set(detail.serviceSlug, data);
      }
      activeServiceMessage = data;
      if (detail.openChat) {
        if (serviceBubble) serviceBubble.hidden = true;
        openServiceConversation();
        return;
      }
      if (!serviceBubble || !serviceBubbleTitle || !serviceBubbleMessage || !serviceBubbleWhatsApp) return;
      serviceBubbleTitle.textContent = data.headline;
      serviceBubbleMessage.textContent = data.message;
      serviceBubbleWhatsApp.textContent = data.whatsappLabel;
      serviceBubbleWhatsApp.href = data.whatsappUrl;
      serviceBubble.hidden = false;
      triggeredServices.add(detail.serviceSlug);
      state.set("notification");
    } catch (error) {
      if (!(error instanceof DOMException && error.name === "AbortError")) console.warn("[service-bot]", error);
    }
  };
  launcher.addEventListener("click", open);
  closeButton.addEventListener("click", onClose);
  minimiseButton.addEventListener("click", onMinimise);
  resetPositionButton?.addEventListener("click", launcherInteractions.reset);
  form.addEventListener("submit", onSubmit);
  input.addEventListener("input", onInput);
  document.addEventListener("keydown", onKeydown);
  root.querySelectorAll<HTMLButtonElement>("[data-chat-quick]").forEach((button) => button.addEventListener("click", onQuickAction));
  window.addEventListener("pointermove", onPointer, { passive: true });
  launcher.addEventListener("pointerenter", onHover);
  launcher.addEventListener("pointerleave", onPointerLeave);
  serviceBubbleDismiss?.addEventListener("click", dismissServiceBubble);
  serviceBubbleMore?.addEventListener("click", openServiceConversation);
  document.addEventListener("hernex:service-interest", onServiceInterest);

  if (reducedMotion) state.set("reduced-motion");
  else if (!sessionStorage.getItem(greetingKey)) {
    state.set("entering");
    window.setTimeout(() => state.set("greeting"), 240);
    window.setTimeout(() => state.set("idle"), 1200);
    sessionStorage.setItem(greetingKey, "true");
  } else state.set("idle");

  return () => {
    window.clearTimeout(closeTimer);
    cancelAnimationFrame(pointerFrame);
    launcherInteractions.cleanup();
    launcher.removeEventListener("click", open);
    closeButton.removeEventListener("click", onClose);
    minimiseButton.removeEventListener("click", onMinimise);
    resetPositionButton?.removeEventListener("click", launcherInteractions.reset);
    form.removeEventListener("submit", onSubmit);
    input.removeEventListener("input", onInput);
    document.removeEventListener("keydown", onKeydown);
    root.querySelectorAll<HTMLButtonElement>("[data-chat-quick]").forEach((button) => button.removeEventListener("click", onQuickAction));
    window.removeEventListener("pointermove", onPointer);
    launcher.removeEventListener("pointerenter", onHover);
    launcher.removeEventListener("pointerleave", onPointerLeave);
    serviceRequest?.abort();
    serviceBubbleDismiss?.removeEventListener("click", dismissServiceBubble);
    serviceBubbleMore?.removeEventListener("click", openServiceConversation);
    document.removeEventListener("hernex:service-interest", onServiceInterest);
  };
}
