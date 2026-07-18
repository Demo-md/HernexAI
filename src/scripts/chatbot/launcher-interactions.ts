import { type BotState, type ChatbotStateController } from "./state-controller";

type Position = { x: number; y: number };
type Cleanup = () => void;

type LauncherOptions = {
  root: HTMLElement;
  launcher: HTMLButtonElement;
  panel: HTMLElement;
  state: ChatbotStateController;
  reducedMotion: boolean;
  status: HTMLElement;
};

const storageKey = "hernex-hn-bot-position";
const desktopMargin = 16;
const mobileMargin = 12;
const dragThreshold = 7;

const isPosition = (value: unknown): value is Position => {
  if (!value || typeof value !== "object") return false;
  const candidate = value as Position;
  return Number.isFinite(candidate.x) && Number.isFinite(candidate.y);
};

const overlaps = (one: DOMRect, two: DOMRect, padding: number) =>
  one.left < two.right + padding && one.right > two.left - padding && one.top < two.bottom + padding && one.bottom > two.top - padding;

export function initialiseLauncherInteractions({ root, launcher, panel, state, reducedMotion, status }: LauncherOptions) {
  const eyes = root.querySelectorAll<HTMLElement>(".hn-bot__face i");
  const backToTop = document.querySelector<HTMLButtonElement>("[data-back-to-top]");
  const footer = document.getElementById("site-footer");
  let activePointerId: number | undefined;
  let dragStarted = false;
  let suppressClick = false;
  let pointerOrigin: Position | undefined;
  let elementOrigin: Position | undefined;
  let measured = { width: 0, height: 0 };
  let preDragState: BotState = "idle";
  let panelPositionWasTemporarilyChanged = false;
  let blinkTimeline: GSAPTimeline | undefined;
  let disposed = false;

  const safeMargin = () => window.matchMedia("(max-width: 767px)").matches ? mobileMargin : desktopMargin;
  const measure = () => {
    const rect = root.getBoundingClientRect();
    measured = { width: rect.width, height: rect.height };
    return rect;
  };
  const clamp = (position: Position) => {
    const margin = safeMargin();
    return {
      x: Math.min(Math.max(margin, position.x), Math.max(margin, window.innerWidth - measured.width - margin)),
      y: Math.min(Math.max(margin, position.y), Math.max(margin, window.innerHeight - measured.height - margin)),
    };
  };
  const setPosition = (position: Position) => {
    const next = clamp(position);
    root.style.left = `${Math.round(next.x)}px`;
    root.style.top = `${Math.round(next.y)}px`;
    root.style.right = "auto";
    root.style.bottom = "auto";
    return next;
  };
  const clearPosition = () => {
    root.style.left = "";
    root.style.top = "";
    root.style.right = "";
    root.style.bottom = "";
  };
  const savedPosition = () => {
    try {
      const candidate = JSON.parse(localStorage.getItem(storageKey) || "null");
      return isPosition(candidate) ? candidate : undefined;
    } catch { return undefined; }
  };
  const persist = (position: Position) => localStorage.setItem(storageKey, JSON.stringify(position));
  const restore = () => {
    measure();
    const saved = savedPosition();
    if (saved) setPosition(saved);
    else clearPosition();
    requestAnimationFrame(correctCollision);
  };
  const isBackToTopVisible = () => Boolean(backToTop && backToTop.classList.contains("is-visible"));
  const correctCollision = () => {
    if (!backToTop || !isBackToTopVisible() || panelPositionWasTemporarilyChanged) return;
    const bot = measure();
    const back = backToTop.getBoundingClientRect();
    if (!overlaps(bot, back, 16)) return;
    const current = { x: bot.left, y: bot.top };
    const candidates = [
      { x: current.x, y: back.top - bot.height - 16 },
      { x: back.left - bot.width - 16, y: current.y },
    ].map(clamp).filter((candidate) => !overlaps(new DOMRect(candidate.x, candidate.y, bot.width, bot.height), back, 12));
    const closest = candidates.sort((a, b) => Math.hypot(a.x - current.x, a.y - current.y) - Math.hypot(b.x - current.x, b.y - current.y))[0];
    if (!closest) return;
    setPosition(closest);
    persist(closest);
  };
  const reset = () => {
    localStorage.removeItem(storageKey);
    clearPosition();
    requestAnimationFrame(correctCollision);
    status.textContent = "HN Bot returned to the default position.";
  };
  const updateBlink = (nextState = state.state) => {
    // Keep the closed launcher alive on every route; only active chat, drag, hidden tabs, and reduced motion pause its eye loop.
    const canBlink = !reducedMotion && !document.hidden && !dragStarted && !["loading", "dragging", "chat-open", "typing", "error", "sleeping", "reduced-motion", "unavailable"].includes(nextState);
    if (canBlink) blinkTimeline?.play();
    else blinkTimeline?.pause();
  };
  if (!reducedMotion && eyes.length) void import("gsap").then(({ gsap }) => {
    if (disposed) return;
    // 0.17s of eyelid motion plus a 1.93s rest makes a complete 2.1s idle cycle.
    blinkTimeline = gsap.timeline({ repeat: -1, repeatDelay: 1.93, paused: true });
    blinkTimeline
      .set(eyes, { transformOrigin: "50% 50%" })
      .to(eyes, { scaleY: 0.08, duration: 0.07, ease: "power1.in" })
      .to(eyes, { scaleY: 1, duration: 0.1, ease: "power1.out" });
    updateBlink();
  });

  const beginDrag = (event: PointerEvent) => {
    if (!panel.hidden || event.button > 0) return;
    const rect = measure();
    activePointerId = event.pointerId;
    dragStarted = false;
    suppressClick = false;
    pointerOrigin = { x: event.clientX, y: event.clientY };
    elementOrigin = { x: rect.left, y: rect.top };
    launcher.setPointerCapture(event.pointerId);
  };
  const moveDrag = (event: PointerEvent) => {
    if (activePointerId !== event.pointerId || !pointerOrigin || !elementOrigin) return;
    const dx = event.clientX - pointerOrigin.x;
    const dy = event.clientY - pointerOrigin.y;
    if (!dragStarted && Math.hypot(dx, dy) < dragThreshold) return;
    if (!dragStarted) {
      dragStarted = true;
      preDragState = state.state;
      root.classList.add("is-dragging");
      state.set("dragging");
      updateBlink("dragging");
    }
    event.preventDefault();
    setPosition({ x: elementOrigin.x + dx, y: elementOrigin.y + dy });
  };
  const endDrag = (event: PointerEvent) => {
    if (activePointerId !== event.pointerId) return;
    if (launcher.hasPointerCapture(event.pointerId)) launcher.releasePointerCapture(event.pointerId);
    activePointerId = undefined;
    pointerOrigin = undefined;
    elementOrigin = undefined;
    if (!dragStarted) return;
    dragStarted = false;
    suppressClick = true;
    root.classList.remove("is-dragging");
    const rect = measure();
    persist({ x: rect.left, y: rect.top });
    correctCollision();
    state.set(preDragState === "minimised" ? "minimised" : "idle");
    status.textContent = "HN Bot position updated.";
    updateBlink();
  };
  const cancelDrag = (event: PointerEvent) => endDrag(event);
  const preventPostDragClick = (event: MouseEvent) => {
    if (!suppressClick) return;
    suppressClick = false;
    event.preventDefault();
    event.stopImmediatePropagation();
  };
  const onResize = () => restore();
  const onVisibility = () => updateBlink();
  const onBackToTopChange = () => requestAnimationFrame(correctCollision);
  const footerObserver = footer ? new IntersectionObserver(([entry]) => {
    root.classList.toggle("is-near-footer", entry.isIntersecting);
    if (entry.isIntersecting) requestAnimationFrame(correctCollision);
  }, { threshold: 0.08 }) : undefined;
  if (footer) footerObserver?.observe(footer);

  launcher.addEventListener("pointerdown", beginDrag);
  launcher.addEventListener("pointermove", moveDrag);
  launcher.addEventListener("pointerup", endDrag);
  launcher.addEventListener("pointercancel", cancelDrag);
  launcher.addEventListener("click", preventPostDragClick, true);
  window.addEventListener("resize", onResize, { passive: true });
  window.addEventListener("orientationchange", onResize);
  document.addEventListener("visibilitychange", onVisibility);
  document.addEventListener("hernex:back-to-top-visibility", onBackToTopChange);
  const unsubscribe = state.subscribe(updateBlink);
  restore();
  updateBlink();

  return {
    reset,
    onPanelOpen: () => {
      root.classList.add("is-panel-open");
      panelPositionWasTemporarilyChanged = true;
      root.style.left = "auto";
      root.style.top = "auto";
      root.style.right = `max(${safeMargin()}px, env(safe-area-inset-right))`;
      root.style.bottom = `max(${safeMargin()}px, env(safe-area-inset-bottom))`;
      updateBlink("chat-open");
    },
    onPanelClosed: () => {
      root.classList.remove("is-panel-open");
      if (!panelPositionWasTemporarilyChanged) return;
      panelPositionWasTemporarilyChanged = false;
      restore();
      updateBlink();
    },
    cleanup: (() => {
      disposed = true;
      if (activePointerId !== undefined && launcher.hasPointerCapture(activePointerId)) launcher.releasePointerCapture(activePointerId);
      blinkTimeline?.kill();
      footerObserver?.disconnect();
      unsubscribe();
      launcher.removeEventListener("pointerdown", beginDrag);
      launcher.removeEventListener("pointermove", moveDrag);
      launcher.removeEventListener("pointerup", endDrag);
      launcher.removeEventListener("pointercancel", cancelDrag);
      launcher.removeEventListener("click", preventPostDragClick, true);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("orientationchange", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
      document.removeEventListener("hernex:back-to-top-visibility", onBackToTopChange);
    }) as Cleanup,
  };
}
