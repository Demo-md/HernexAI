export type BotState = "loading" | "entering" | "idle" | "looking" | "attentive" | "hovered" | "greeting" | "notification" | "dragging" | "chat-open" | "typing" | "success" | "error" | "minimised" | "sleeping" | "reduced-motion" | "webgl-unavailable" | "asset-load-failed" | "unavailable";

const allowedTransitions: Record<BotState, BotState[]> = {
  loading: ["entering", "idle", "chat-open", "reduced-motion", "webgl-unavailable", "asset-load-failed"],
  entering: ["greeting", "idle", "dragging", "reduced-motion"], idle: ["looking", "hovered", "greeting", "notification", "dragging", "chat-open", "sleeping", "reduced-motion"],
  looking: ["idle", "hovered", "dragging", "chat-open", "reduced-motion"], attentive: ["idle", "dragging", "chat-open", "reduced-motion"], hovered: ["idle", "dragging", "chat-open", "reduced-motion"],
  greeting: ["idle", "dragging", "chat-open", "reduced-motion"], notification: ["idle", "dragging", "chat-open", "reduced-motion"], dragging: ["idle", "looking", "hovered", "minimised", "reduced-motion"], "chat-open": ["typing", "success", "error", "minimised", "idle", "reduced-motion"],
  typing: ["chat-open", "success", "error", "reduced-motion"], success: ["chat-open", "idle", "reduced-motion"], error: ["typing", "chat-open", "idle", "reduced-motion"],
  minimised: ["chat-open", "idle", "dragging", "reduced-motion"], sleeping: ["idle", "chat-open", "reduced-motion"], "reduced-motion": ["chat-open", "idle", "dragging"],
  "webgl-unavailable": ["idle", "chat-open", "reduced-motion"], "asset-load-failed": ["idle", "chat-open", "reduced-motion"], unavailable: ["idle", "chat-open", "reduced-motion"],
};

export class ChatbotStateController {
  state: BotState;
  private readonly listeners = new Set<(state: BotState) => void>();
  constructor(private readonly root: HTMLElement, initial: BotState = "loading") { this.state = initial; this.root.dataset.botState = initial; }
  set(next: BotState) {
    if (next !== this.state && !allowedTransitions[this.state].includes(next)) return false;
    this.state = next;
    this.root.dataset.botState = next;
    this.listeners.forEach((listener) => listener(next));
    return true;
  }
  subscribe(listener: (state: BotState) => void) { this.listeners.add(listener); return () => this.listeners.delete(listener); }
}
