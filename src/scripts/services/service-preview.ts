type Cleanup = () => void;

export function initialiseServicePreviews(): Cleanup {
  const hosts = [...document.querySelectorAll<HTMLElement>("[data-service-preview]")];
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const cleanups = hosts.map((host) => {
    const triggers = [...host.querySelectorAll<HTMLButtonElement>("[data-service-preview-trigger]")];
    const panels = [...host.querySelectorAll<HTMLElement>("[data-service-preview-panel]")];
    const askButtons = [...host.querySelectorAll<HTMLButtonElement>("[data-service-ask]")];
    if (!triggers.length || !panels.length) return () => {};
    let activeSlug = triggers[0].dataset.serviceSlug || "";
    let timer = 0;
    let hoverIntent = 0;
    let index = 0;
    let visible = true;
    const emit = (serviceSlug: string, interactionType: "hover-intent" | "focus" | "tap" | "explicit") => document.dispatchEvent(new CustomEvent("hernex:service-interest", { detail: { serviceSlug, interactionType } }));
    const setActive = (slug: string, interaction?: "hover-intent" | "focus" | "tap") => {
      if (!slug) return;
      if (slug === activeSlug) {
        if (interaction) emit(slug, interaction);
        return;
      }
      const oldPanel = panels.find((panel) => panel.dataset.servicePreviewPanel === activeSlug);
      const nextPanel = panels.find((panel) => panel.dataset.servicePreviewPanel === slug);
      triggers.forEach((trigger) => trigger.setAttribute("aria-current", String(trigger.dataset.serviceSlug === slug)));
      if (oldPanel) { oldPanel.classList.add("is-leaving"); window.setTimeout(() => { oldPanel.hidden = true; oldPanel.classList.remove("is-leaving"); }, reducedMotion ? 0 : 220); }
      if (nextPanel) { nextPanel.hidden = false; nextPanel.classList.add("is-entering"); requestAnimationFrame(() => nextPanel.classList.remove("is-entering")); }
      activeSlug = slug;
      index = Math.max(0, triggers.findIndex((trigger) => trigger.dataset.serviceSlug === slug));
      if (interaction) emit(slug, interaction);
    };
    const stop = () => window.clearTimeout(timer);
    const schedule = () => {
      stop();
      if (reducedMotion || !visible || document.hidden) return;
      timer = window.setTimeout(() => { setActive(triggers[(index + 1) % triggers.length].dataset.serviceSlug || ""); schedule(); }, 4200);
    };
    const onEnter = (event: Event) => { stop(); const target = event.currentTarget as HTMLButtonElement; setActive(target.dataset.serviceSlug || ""); window.clearTimeout(hoverIntent); hoverIntent = window.setTimeout(() => emit(target.dataset.serviceSlug || "", "hover-intent"), 820); };
    const onLeave = () => { window.clearTimeout(hoverIntent); schedule(); };
    const onFocus = (event: FocusEvent) => { stop(); const target = event.currentTarget as HTMLButtonElement; setActive(target.dataset.serviceSlug || ""); window.clearTimeout(hoverIntent); hoverIntent = window.setTimeout(() => emit(target.dataset.serviceSlug || "", "focus"), 820); };
    const onClick = (event: Event) => { const target = event.currentTarget as HTMLButtonElement; setActive(target.dataset.serviceSlug || "", "tap"); schedule(); };
    const onAsk = (event: Event) => emit((event.currentTarget as HTMLButtonElement).dataset.serviceSlug || "", "explicit");
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting; if (visible) schedule(); else stop(); }, { threshold: 0.15 });
    observer.observe(host);
    document.addEventListener("visibilitychange", schedule);
    triggers.forEach((trigger) => { trigger.addEventListener("pointerenter", onEnter); trigger.addEventListener("pointerleave", onLeave); trigger.addEventListener("focus", onFocus); trigger.addEventListener("blur", onLeave); trigger.addEventListener("click", onClick); });
    askButtons.forEach((button) => button.addEventListener("click", onAsk));
    schedule();
    return () => { stop(); window.clearTimeout(hoverIntent); observer.disconnect(); document.removeEventListener("visibilitychange", schedule); triggers.forEach((trigger) => { trigger.removeEventListener("pointerenter", onEnter); trigger.removeEventListener("pointerleave", onLeave); trigger.removeEventListener("focus", onFocus); trigger.removeEventListener("blur", onLeave); trigger.removeEventListener("click", onClick); }); askButtons.forEach((button) => button.removeEventListener("click", onAsk)); };
  });
  return () => cleanups.forEach((cleanup) => cleanup());
}
