type Cleanup = () => void;

type OrbitPhase = { id: string; label: string; angle: number; card: string };

const phases: OrbitPhase[] = [
  { id: "instagram", label: "Content and community", angle: 0, card: "brand" },
  { id: "linkedin", label: "Authority and lead generation", angle: 90, card: "social" },
  { id: "google", label: "Visibility and intent", angle: 315, card: "website" },
  { id: "whatsapp", label: "Conversation and follow up", angle: 270, card: "crm" },
  { id: "ai-agents", label: "AI agent support", angle: 18, card: "agent" },
  { id: "automation", label: "Workflow automation", angle: 90, card: "automation" },
  { id: "software", label: "Software delivery", angle: 234, card: "analytics" },
  { id: "web", label: "Web experience", angle: 306, card: "website" },
];

const contextualLabels: Record<string, Omit<OrbitPhase, "id">> = {
  facebook: { label: "Reach and retargeting", angle: 45, card: "social" },
  reddit: { label: "Community insight", angle: 135, card: "brand" },
  youtube: { label: "Video discovery", angle: 180, card: "social" },
  x: { label: "Timely conversation", angle: 225, card: "social" },
  crm: { label: "Customer context", angle: 162, card: "crm" },
};

function phaseFor(id: string): OrbitPhase {
  return phases.find((phase) => phase.id === id) || { id, ...(contextualLabels[id] || { label: "Connected system", angle: 0, card: "brand" }) };
}

function initialiseOrbit(root: HTMLElement, gsap: typeof import("gsap").gsap): Cleanup {
  const outer = root.querySelector<HTMLElement>("[data-orbit-ring='outer']");
  const inner = root.querySelector<HTMLElement>("[data-orbit-ring='inner']");
  const context = root.querySelector<HTMLElement>("[data-orbit-context]");
  const signal = root.querySelector<HTMLElement>("[data-orbit-signal]");
  if (!outer || !inner || !signal) return () => {};

  const tokens = [...root.querySelectorAll<HTMLButtonElement>("[data-orbit-token]")];
  const cards = [...root.querySelectorAll<HTMLButtonElement>("[data-orbit-card]")];
  const outerUprights = [...root.querySelectorAll<HTMLElement>("[data-orbit-upright='outer']")];
  const innerUprights = [...root.querySelectorAll<HTMLElement>("[data-orbit-upright='inner']")];
  const footerCta = root.closest<HTMLElement>(".site-footer__showcase")?.querySelector<HTMLElement>(".site-footer__cta .button");
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  let timeline: GSAPTimeline | undefined;
  let observer: IntersectionObserver | undefined;
  let visible = false;
  let disposed = false;

  const setWillChange = (value: "transform, opacity" | "auto") => {
    [outer, inner, signal, ...outerUprights, ...innerUprights, ...cards].forEach((element) => { element.style.willChange = value; });
  };
  const activate = (phase: OrbitPhase) => {
    tokens.forEach((token) => token.classList.toggle("is-active", token.dataset.orbitToken === phase.id));
    cards.forEach((card) => card.classList.toggle("is-active", card.dataset.orbitCard === phase.card));
    if (context) context.textContent = phase.label;
    root.style.setProperty("--orbit-signal-angle", `${phase.angle}deg`);
  };
  const dispatchServiceInterest = (event: Event) => {
    const card = event.currentTarget as HTMLElement;
    const serviceSlug = card.dataset.serviceSlug;
    if (!serviceSlug) return;
    document.dispatchEvent(new CustomEvent("hernex:service-interest", { detail: { serviceSlug, interactionType: "explicit", openChat: true } }));
  };
  cards.forEach((card) => card.addEventListener("click", dispatchServiceInterest));
  activate(phases[0]);

  if (reducedMotion) return () => cards.forEach((card) => card.removeEventListener("click", dispatchServiceInterest));

  const sync = () => {
    if (!timeline || disposed) return;
    if (visible && !document.hidden) {
      setWillChange("transform, opacity");
      timeline.play();
      return;
    }
    timeline.pause();
    setWillChange("auto");
  };
  const showToken = (token: HTMLButtonElement, paused: boolean) => {
    const phase = phaseFor(token.dataset.orbitToken || "");
    timeline?.pause();
    activate(phase);
    const icon = token.querySelector<HTMLElement>("[data-orbit-icon]");
    if (icon) gsap.fromTo(icon, { scale: 1 }, { scale: 1.08, rotation: 7, duration: 0.2, yoyo: true, repeat: 1, ease: "power2.inOut", overwrite: "auto" });
    if (!paused) timeline?.play();
  };
  const handlers = tokens.map((token) => {
    const onPointerEnter = () => showToken(token, true);
    const onPointerLeave = () => timeline?.play();
    const onFocus = () => showToken(token, true);
    const onBlur = () => timeline?.play();
    const onClick = () => showToken(token, false);
    token.addEventListener("pointerenter", onPointerEnter);
    token.addEventListener("pointerleave", onPointerLeave);
    token.addEventListener("focus", onFocus);
    token.addEventListener("blur", onBlur);
    token.addEventListener("click", onClick);
    return () => {
      token.removeEventListener("pointerenter", onPointerEnter);
      token.removeEventListener("pointerleave", onPointerLeave);
      token.removeEventListener("focus", onFocus);
      token.removeEventListener("blur", onBlur);
      token.removeEventListener("click", onClick);
    };
  });

  const cycle = 4.8;
  const orbitTimeline = gsap.timeline({ paused: true, repeat: -1 });
  timeline = orbitTimeline;
  orbitTimeline
    .to(outer, { rotation: 360, duration: cycle * phases.length, ease: "none" }, 0)
    .to(outerUprights, { rotation: -360, duration: cycle * phases.length, ease: "none" }, 0)
    .to(inner, { rotation: -432, duration: cycle * phases.length, ease: "none" }, 0)
    .to(innerUprights, { rotation: 432, duration: cycle * phases.length, ease: "none" }, 0);

  if (cards.length) orbitTimeline.set(cards, { autoAlpha: 0, y: 12 }, 0);
  phases.forEach((phase, index) => {
    const at = index * cycle;
    const icon = root.querySelector<HTMLElement>(`[data-orbit-token='${phase.id}'] [data-orbit-icon]`);
    const card = root.querySelector<HTMLElement>(`[data-orbit-card='${phase.card}']`);
    orbitTimeline.call(() => activate(phase), [], at);
    if (icon) orbitTimeline.fromTo(icon, { scale: 1, rotation: 0 }, { scale: 1.08, rotation: 7, duration: 0.3, ease: "power2.out" }, at).to(icon, { scale: 1, rotation: 0, duration: 0.28, ease: "power2.inOut" }, at + 0.74);
    if (card) orbitTimeline.set(card, { autoAlpha: 0, y: 12 }, at).to(card, { autoAlpha: 1, y: 0, duration: 0.32, ease: "power3.out" }, at).to(card, { autoAlpha: 0, y: -12, duration: 0.28, ease: "power2.in" }, at + cycle - 0.28);
    orbitTimeline.fromTo(signal, { autoAlpha: 0, scaleX: 0.12 }, { autoAlpha: 0.72, scaleX: 1, duration: 0.26, ease: "power2.out" }, at + 0.08).to(signal, { autoAlpha: 0, duration: 0.24, ease: "power1.in" }, at + 0.58);
  });
  if (footerCta) orbitTimeline.to(footerCta, { x: 4, duration: 0.16, yoyo: true, repeat: 1, ease: "power2.inOut" }, cycle * phases.length - 0.7);

  observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; sync(); }, { threshold: 0.18 });
  observer.observe(root);
  const onVisibility = () => sync();
  document.addEventListener("visibilitychange", onVisibility);
  sync();

  return () => {
    disposed = true;
    observer?.disconnect();
    timeline?.kill();
    setWillChange("auto");
    document.removeEventListener("visibilitychange", onVisibility);
    handlers.forEach((cleanup) => cleanup());
    cards.forEach((card) => card.removeEventListener("click", dispatchServiceInterest));
  };
}

export function initialiseChannelOrbit(): Cleanup {
  const roots = [...document.querySelectorAll<HTMLElement>("[data-channel-orbit]")];
  if (!roots.length) return () => {};
  let disposed = false;
  let cleanups: Cleanup[] = [];
  void import("gsap").then(({ gsap }) => {
    if (disposed) return;
    cleanups = roots.map((root) => initialiseOrbit(root, gsap));
  });
  return () => {
    disposed = true;
    cleanups.forEach((cleanup) => cleanup());
    cleanups = [];
  };
}
