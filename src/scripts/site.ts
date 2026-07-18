import { initialiseMotion } from "./motion/site-motion";
import { initialiseIntro } from "./intro/intro-controller";
import { initialiseChatbot } from "./chatbot/chatbot";
import { initialiseServicePreviews } from "./services/service-preview";
import { initialiseChannelOrbit } from "./insights/channel-orbit";
import { registerBrowserCache } from "./browser-cache";

type Cleanup = () => void;

const focusableSelector = "a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex='-1'])";

function setupMobileMenu(): Cleanup {
  const toggle = document.querySelector<HTMLButtonElement>("[data-menu-toggle]");
  const menu = document.querySelector<HTMLElement>("[data-mobile-menu]");
  const panel = menu?.querySelector<HTMLElement>("[role='dialog']");
  const closeButton = menu?.querySelector<HTMLButtonElement>("[data-menu-close]");
  const servicesTrigger = menu?.querySelector<HTMLButtonElement>("[data-mobile-services-trigger]");
  const servicesPanel = menu?.querySelector<HTMLElement>("[data-mobile-services-panel]");
  if (!toggle || !menu || !panel || !closeButton) return () => {};

  let opener: HTMLElement | null = null;
  const close = () => {
    if (servicesTrigger && servicesPanel) {
      servicesTrigger.setAttribute("aria-expanded", "false");
      servicesPanel.hidden = true;
    }
    menu.hidden = true;
    toggle.setAttribute("aria-expanded", "false");
    opener?.focus();
  };
  const open = () => {
    opener = document.activeElement instanceof HTMLElement ? document.activeElement : toggle;
    menu.hidden = false;
    toggle.setAttribute("aria-expanded", "true");
    closeButton.focus();
  };
  const onKeydown = (event: KeyboardEvent) => {
    if (menu.hidden) return;
    if (event.key === "Escape") return close();
    if (event.key !== "Tab") return;
    const controls = [...panel.querySelectorAll<HTMLElement>(focusableSelector)];
    if (!controls.length) return;
    const first = controls[0];
    const last = controls.at(-1)!;
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
    if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
  };
  const onBackdrop = (event: MouseEvent) => { if (event.target === menu) close(); };
  const onLink = () => close();
  const onServicesToggle = () => {
    if (!servicesTrigger || !servicesPanel) return;
    const expanded = servicesTrigger.getAttribute("aria-expanded") === "true";
    servicesTrigger.setAttribute("aria-expanded", String(!expanded));
    servicesPanel.hidden = expanded;
  };

  toggle.addEventListener("click", open);
  closeButton.addEventListener("click", close);
  menu.addEventListener("click", onBackdrop);
  servicesTrigger?.addEventListener("click", onServicesToggle);
  menu.querySelectorAll("a").forEach((link) => link.addEventListener("click", onLink));
  document.addEventListener("keydown", onKeydown);
  return () => {
    toggle.removeEventListener("click", open);
    closeButton.removeEventListener("click", close);
    menu.removeEventListener("click", onBackdrop);
    servicesTrigger?.removeEventListener("click", onServicesToggle);
    menu.querySelectorAll("a").forEach((link) => link.removeEventListener("click", onLink));
    document.removeEventListener("keydown", onKeydown);
  };
}

function setupServicesMenu(): Cleanup {
  const root = document.querySelector<HTMLElement>("[data-services-menu]");
  const trigger = root?.querySelector<HTMLButtonElement>("[data-services-trigger]");
  const panel = root?.querySelector<HTMLElement>("[data-services-panel]");
  if (!root || !trigger || !panel) return () => {};

  let closeFrame = 0;
  const close = (restoreFocus = false) => {
    panel.hidden = true;
    trigger.setAttribute("aria-expanded", "false");
    if (restoreFocus) trigger.focus();
  };
  const open = () => {
    panel.hidden = false;
    trigger.setAttribute("aria-expanded", "true");
  };
  const toggle = () => panel.hidden ? open() : close();
  const onPointerDown = (event: PointerEvent) => { if (!root.contains(event.target as Node)) close(); };
  const onKeydown = (event: KeyboardEvent) => { if (event.key === "Escape" && !panel.hidden) { event.preventDefault(); close(true); } };
  const onFocusOut = () => {
    cancelAnimationFrame(closeFrame);
    closeFrame = requestAnimationFrame(() => { if (!root.contains(document.activeElement)) close(); });
  };

  trigger.addEventListener("click", toggle);
  document.addEventListener("pointerdown", onPointerDown);
  document.addEventListener("keydown", onKeydown);
  root.addEventListener("focusout", onFocusOut);
  return () => {
    cancelAnimationFrame(closeFrame);
    trigger.removeEventListener("click", toggle);
    document.removeEventListener("pointerdown", onPointerDown);
    document.removeEventListener("keydown", onKeydown);
    root.removeEventListener("focusout", onFocusOut);
  };
}

function setupFaqs(): Cleanup {
  const controllers = [...document.querySelectorAll<HTMLButtonElement>("[data-faq-button]")];
  const handlers = controllers.map((button) => {
    const answer = document.getElementById(button.getAttribute("aria-controls") || "");
    const handler = () => {
      const expanded = button.getAttribute("aria-expanded") === "true";
      button.setAttribute("aria-expanded", String(!expanded));
      if (answer) answer.hidden = expanded;
    };
    button.addEventListener("click", handler);
    return () => button.removeEventListener("click", handler);
  });
  return () => handlers.forEach((cleanup) => cleanup());
}

function setupContactForm(): Cleanup {
  const form = document.querySelector<HTMLFormElement>("[data-contact-form]");
  const status = document.querySelector<HTMLElement>("[data-contact-status]");
  if (!form || !status) return () => {};
  const submit = async (event: SubmitEvent) => {
    event.preventDefault();
    status.className = "";
    const fields = new FormData(form);
    const payload = Object.fromEntries(fields.entries());
    const customBudgetRequired = payload.budgetRange === "Custom budget" && !String(payload.customBudget || "").trim();
    if (!String(payload.name || "").trim() || !String(payload.email || "").trim() || !String(payload.phone || "").trim() || !String(payload.message || "").trim() || !String(payload.budgetRange || "").trim() || customBudgetRequired) {
      status.textContent = "Add your name, email, phone number, message, and budget details so we know where to begin.";
      status.classList.add("is-error");
      return;
    }
    const submitButton = form.querySelector<HTMLButtonElement>("button[type='submit']");
    if (submitButton) submitButton.disabled = true;
    status.textContent = "Sending your enquiry…";
    try {
      const response = await fetch("/api/contact", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(payload) });
      const data = await response.json().catch(() => ({}));
      if (!response.ok || !data.ok) throw new Error(data.error || "Your enquiry could not be sent.");
      form.reset();
      status.textContent = "Your enquiry was sent. The HerNexAI team will review the context shared.";
      status.classList.add("is-success");
    } catch (error) {
      status.textContent = error instanceof Error ? error.message : "Your enquiry could not be sent right now. Please use WhatsApp or try again.";
      status.classList.add("is-error");
    } finally {
      if (submitButton) submitButton.disabled = false;
    }
  };
  form.addEventListener("submit", submit);
  return () => form.removeEventListener("submit", submit);
}

function setupBackToTop(): Cleanup {
  const button = document.querySelector<HTMLButtonElement>("[data-back-to-top]");
  const header = document.querySelector<HTMLElement>("[data-site-header]");
  if (!button || !header) return () => {};
  const footer = document.getElementById("site-footer");
  let footerVisible = false;
  const update = () => {
    const scrolled = window.scrollY > 360;
    button.classList.toggle("is-visible", scrolled || footerVisible);
    header.classList.toggle("is-scrolled", window.scrollY > 24);
    document.dispatchEvent(new CustomEvent("hernex:back-to-top-visibility"));
  };
  const goTop = () => window.scrollTo({ top: 0, behavior: document.documentElement.dataset.reducedMotion === "true" ? "auto" : "smooth" });
  update();
  const observer = footer ? new IntersectionObserver(([entry]) => { footerVisible = entry.isIntersecting; update(); }, { threshold: 0.08 }) : undefined;
  if (footer) observer?.observe(footer);
  window.addEventListener("scroll", update, { passive: true });
  button.addEventListener("click", goTop);
  return () => { observer?.disconnect(); window.removeEventListener("scroll", update); button.removeEventListener("click", goTop); };
}

function setupInsightsCredit(): Cleanup {
  const credit = document.querySelector<HTMLElement>("[data-insights-credit]");
  if (!credit || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return () => {};
  let timeline: GSAPTimeline | undefined;
  let observer: IntersectionObserver | undefined;
  void import("gsap").then(({ gsap }) => {
    const letters = credit.querySelectorAll("i");
    timeline = gsap.timeline({ paused: true, repeat: -1, repeatDelay: 0.93 });
    timeline.to(letters, { y: -3, duration: 0.18, stagger: 0.035, ease: "sine.out" })
      .to(letters, { y: 0, duration: 0.18, stagger: 0.035, ease: "sine.in" });
    observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) timeline?.play(); else timeline?.pause(); }, { threshold: 0.15 });
    observer.observe(credit);
  });
  return () => { observer?.disconnect(); timeline?.kill(); };
}

function setupTestimonialMotion(): Cleanup {
  const rows = [...document.querySelectorAll<HTMLElement>("[data-testimonial-row]")];
  const root = document.querySelector<HTMLElement>("[data-testimonial-proof], .testimonials-columns");
  const heading = document.querySelector<HTMLElement>("[data-testimonial-heading]");
  if (!rows.length || !root || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return () => {};
  let timeline: GSAPTimeline | undefined;
  let observer: IntersectionObserver | undefined;
  void import("gsap").then(({ gsap }) => {
    timeline = gsap.timeline({ paused: true });
    if (heading) timeline.from(heading, { y: 14, autoAlpha: 0, duration: 0.34, ease: "power3.out", clearProps: "transform,visibility,opacity" });
    timeline.from(rows, { y: 18, autoAlpha: 0, duration: 0.4, stagger: 0.08, ease: "power3.out", clearProps: "transform,visibility,opacity" }, heading ? "-=0.06" : 0)
      .from(rows.map((row) => row.querySelector(".testimonial-stars")), { clipPath: "inset(0 100% 0 0)", duration: 0.3, stagger: 0.07, ease: "power2.out", clearProps: "clipPath" }, "-=0.22");
    observer = new IntersectionObserver(([entry]) => { if (entry.isIntersecting) { timeline?.play(); observer?.disconnect(); } }, { threshold: 0.18 });
    observer.observe(root);
  });
  return () => { observer?.disconnect(); timeline?.kill(); };
}

function setupAboutMotion(): Cleanup {
  const opening = document.querySelector<HTMLElement>("[data-about-opening]");
  if (!opening || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return () => {};
  let timeline: GSAPTimeline | undefined;
  let disposed = false;
  void import("gsap").then(({ gsap }) => {
    if (disposed) return;
    timeline = gsap.timeline({ defaults: { ease: "power3.out" } });
    timeline
      .from(opening.querySelector("[data-about-eyebrow]"), { y: 10, autoAlpha: 0, duration: 0.28 })
      .from(opening.querySelectorAll("[data-about-title] > span"), { yPercent: 104, autoAlpha: 0, duration: 0.55, stagger: 0.1, ease: "power4.out" }, "-=0.08")
      .from(opening.querySelector("[data-about-portrait]"), { clipPath: "inset(0 0 100% 0)", y: 20, duration: 0.62 }, "-=0.44")
      .from(opening.querySelector("[data-about-name]"), { y: 10, autoAlpha: 0, duration: 0.3 }, "-=0.24")
      .from(opening.querySelector("[data-about-lede]"), { y: 12, autoAlpha: 0, duration: 0.38 }, "-=0.16");
  });
  return () => { disposed = true; timeline?.kill(); };
}

function setupInsightsFilters(): Cleanup {
  const root = document.querySelector<HTMLElement>("[data-insights]");
  const input = root?.querySelector<HTMLInputElement>("[data-insights-search]");
  const buttons = root ? [...root.querySelectorAll<HTMLButtonElement>("[data-insights-filter]")] : [];
  const posts = root ? [...root.querySelectorAll<HTMLElement>("[data-insight-post]")] : [];
  const empty = root?.querySelector<HTMLElement>("[data-insights-empty]");
  if (!root || !input || !posts.length) return () => {};
  let category = "all";
  const filter = () => {
    const query = input.value.trim().toLowerCase();
    let matches = 0;
    posts.forEach((post) => {
      const visible = (category === "all" || post.dataset.category === category) && (!query || post.dataset.search?.includes(query));
      post.hidden = !visible;
      if (visible) matches += 1;
    });
    if (empty) empty.hidden = matches !== 0;
  };
  const handlers = buttons.map((button) => {
    const onClick = () => {
      category = button.dataset.insightsFilter?.toLowerCase() || "all";
      buttons.forEach((item) => item.setAttribute("aria-pressed", String(item === button)));
      filter();
    };
    button.addEventListener("click", onClick);
    return () => button.removeEventListener("click", onClick);
  });
  input.addEventListener("input", filter);
  return () => { handlers.forEach((cleanup) => cleanup()); input.removeEventListener("input", filter); };
}

function setupShareLinks(): Cleanup {
  const buttons = [...document.querySelectorAll<HTMLButtonElement>("[data-share-copy]")];
  const handlers = buttons.map((button) => {
    const original = button.textContent || "Copy link";
    const onClick = async () => {
      try {
        await navigator.clipboard.writeText(button.dataset.shareUrl || window.location.href);
        button.textContent = "Link copied";
      } catch {
        button.textContent = "Copy unavailable";
      }
      window.setTimeout(() => { button.textContent = original; }, 1600);
    };
    button.addEventListener("click", onClick);
    return () => button.removeEventListener("click", onClick);
  });
  return () => handlers.forEach((cleanup) => cleanup());
}

export function mountSite(): Cleanup {
  registerBrowserCache();
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  document.documentElement.dataset.reducedMotion = String(reducedMotion);
  const cleanups: Cleanup[] = [initialiseIntro(), setupMobileMenu(), setupServicesMenu(), setupFaqs(), setupContactForm(), setupBackToTop(), initialiseChatbot(), initialiseServicePreviews(), initialiseChannelOrbit(), setupInsightsCredit(), setupTestimonialMotion(), setupAboutMotion(), setupInsightsFilters(), setupShareLinks()];
  let disposed = false;
  void initialiseMotion().then((cleanup) => {
    if (disposed) cleanup();
    else cleanups.push(cleanup);
  });
  return () => {
    disposed = true;
    cleanups.splice(0).reverse().forEach((cleanup) => cleanup());
  };
}
