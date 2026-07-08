import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);
let lenis: Lenis | undefined;
let context: gsap.Context | undefined;
let controller: AbortController | undefined;
let wordTimer: ReturnType<typeof setInterval> | undefined;
let pulseAnimation: gsap.core.Timeline | undefined;
gsap.ticker.add((time) => lenis?.raf(time * 1000));
gsap.ticker.lagSmoothing(0);

const storyTitles = ["Find the real constraint.", "Clarify market and message.", "Create the system.", "Go live with confidence.", "Learn from the signal.", "Compound what works."];
const storyDetails = [
  "We audit the offer, audience, channels, and customer journey before recommending activity.",
  "We sharpen positioning, priorities, and the message every campaign needs to reinforce.",
  "We connect content, pages, campaigns, follow-up, and measurement into one practical plan.",
  "We launch with clean ownership, tracking, and a clear path from attention to enquiry.",
  "We read performance honestly, identify friction, and improve the highest-leverage step.",
  "We repeat what works, simplify what does not, and expand without creating daily chaos.",
];
const storyNames = ["Discover", "Position", "Build", "Launch", "Optimize", "Scale"];
const storyColors = ["#345cff", "#7e6bf2", "#b9a7ff", "#ffb49e", "#8ea8ff", "#dfff72"];
const serviceColors = ["#345cff", "#b9a7ff", "#ffb49e", "#5f7cff", "#dfff72", "#8ea8ff", "#ff9578", "#7e6bf2"];

function initMotion() {
  context?.revert(); controller?.abort(); lenis?.destroy(); pulseAnimation?.kill(); if (wordTimer) clearInterval(wordTimer); ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
  controller = new AbortController();
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const stackCards = gsap.utils.toArray<HTMLAnchorElement>(".service-stack-card");
  const setStackAccess = (active: number | null) => stackCards.forEach((card, index) => { const visible = active === null || index === active; card.tabIndex = visible ? 0 : -1; card.style.pointerEvents = visible ? "auto" : "none"; card.setAttribute("aria-hidden", String(!visible)); });
  if (reduced || innerWidth < 768) setStackAccess(null);
  if (reduced) { document.querySelector(location.hash)?.scrollIntoView(); return; }

  lenis = new Lenis({ duration: 1.05, smoothWheel: true, syncTouch: false });
  lenis.on("scroll", ScrollTrigger.update);
  document.addEventListener("click", (event) => {
    const anchor = (event.target as Element).closest<HTMLAnchorElement>("a[href*='#']");
    if (!anchor) return;
    const url = new URL(anchor.href);
    if (url.origin !== location.origin || url.pathname !== location.pathname || !url.hash) return;
    const target = document.querySelector<HTMLElement>(url.hash);
    if (!target) return;
    event.preventDefault(); history.pushState(null, "", url.hash); lenis?.scrollTo(target, { offset: -76, duration: 1.05 });
  }, { signal: controller.signal });

  context = gsap.context(() => {
    const heroTitle = document.querySelector<HTMLElement>("[data-hero-title]");
    if (heroTitle) gsap.fromTo(heroTitle, { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: .9, ease: "power3.out", clearProps: "transform,opacity" });
    gsap.utils.toArray<HTMLElement>(".reveal-on-scroll").forEach((element) => gsap.fromTo(element, { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: .8, ease: "power3.out", clearProps: "transform,opacity", scrollTrigger: { trigger: element, start: "top 86%" } }));
    document.querySelectorAll<HTMLElement>(".magnetic").forEach((button) => { button.addEventListener("pointermove", (event) => { const rect = button.getBoundingClientRect(); gsap.to(button, { x: (event.clientX - rect.left - rect.width / 2) * .12, y: (event.clientY - rect.top - rect.height / 2) * .12, duration: .25 }); }, { signal: controller?.signal }); button.addEventListener("pointerleave", () => gsap.to(button, { x: 0, y: 0, duration: .4, ease: "power2.out" }), { signal: controller?.signal }); });
    const chatLauncher = document.querySelector<HTMLElement>("#chat-open");
    chatLauncher?.addEventListener("pointermove", (event) => { const rect = chatLauncher.getBoundingClientRect(); gsap.to(chatLauncher, { rotateY: ((event.clientX - rect.left) / rect.width - .5) * 22, rotateX: -((event.clientY - rect.top) / rect.height - .5) * 18, scale: 1.06, transformPerspective: 700, duration: .28, ease: "power2.out" }); }, { signal: controller.signal });
    chatLauncher?.addEventListener("pointerleave", () => gsap.to(chatLauncher, { rotateX: 0, rotateY: 0, scale: 1, duration: .5, ease: "power3.out" }), { signal: controller.signal });
    document.querySelector<HTMLElement>(".hero-section")?.addEventListener("pointermove", (event) => gsap.to("#hero-glow", { x: (event.clientX / innerWidth - .5) * 70, y: (event.clientY / innerHeight - .5) * 50, duration: 1.2, ease: "power2.out" }), { signal: controller.signal });

    const story = document.querySelector<HTMLElement>("#growth-story");
    const stage = document.querySelector<HTMLElement>("#growth-stage");
    if (story && stage) {
      const objects = gsap.utils.toArray<HTMLElement>(".marketing-object");
      const nodes = gsap.utils.toArray<HTMLElement>(".system-node");
      const lines = gsap.utils.toArray<SVGPathElement>(".system-line");
      const stageRect = stage.getBoundingClientRect();
      const movements = objects.map((object) => { const rect = object.getBoundingClientRect(); return { x: stageRect.left + stageRect.width / 2 - rect.left - rect.width / 2, y: stageRect.top + stageRect.height / 2 - rect.top - rect.height / 2 }; });
      gsap.set(nodes, { opacity: .16, scale: .82 }); gsap.set(lines, { strokeDashoffset: 160, opacity: .1 }); gsap.set(".system-dot", { opacity: .1 }); gsap.set(".growth-bar", { scaleY: .15 });
      const pulse = document.querySelector<SVGCircleElement>(".signal-pulse");
      const pulseNodes = [{ x: 450, y: 105 }, { x: 170, y: 195 }, { x: 730, y: 190 }, { x: 270, y: 420 }, { x: 640, y: 415 }];
      let pulseRoute: typeof pulseNodes = [];
      const movePulse = () => {
        if (!pulse || controller?.signal.aborted) return;
        if (!pulseRoute.length) pulseRoute = gsap.utils.shuffle([...pulseNodes]);
        const next = pulseRoute.pop()!;
        pulseAnimation = gsap.timeline({ onComplete: movePulse })
          .to(pulse, { attr: { cx: next.x, cy: next.y }, duration: .75, ease: "power2.inOut" })
          .to(pulse, { attr: { cx: 450, cy: 270 }, duration: .55, ease: "power2.inOut" }, "+=.12");
      };
      movePulse();
      const desktop = innerWidth >= 768;
      gsap.timeline({ scrollTrigger: { trigger: story, start: desktop ? "top 10%" : "top 78%", end: desktop ? "+=1050" : "bottom 45%", scrub: desktop ? 1 : false, pin: desktop, pinSpacing: true, anticipatePin: 1, invalidateOnRefresh: true, refreshPriority: 2 } })
        .to(objects, { x: (index) => movements[index].x, y: (index) => movements[index].y, rotateX: 18, rotateY: -24, scale: .22, opacity: 0, duration: 1, stagger: .025, ease: "power2.inOut" })
        .to(".stage-chaos", { y: -10, opacity: 0, duration: .25 }, .36).to(".stage-system", { y: 0, opacity: 1, duration: .35 }, .55)
        .to(nodes, { opacity: 1, scale: 1, duration: .65, stagger: .06, ease: "back.out(1.3)" }, .5).to(lines, { strokeDashoffset: 0, opacity: .82, duration: .8, stagger: .05 }, .66).to(".system-dot", { opacity: 1, duration: .3 }, .86)
        .to(".core-shell", { scale: 1.06, rotateZ: 15, duration: .65, ease: "power2.inOut" }, 1.08).to(".stage-system", { y: -10, opacity: 0, duration: .25 }, 1.28).to(".stage-growth", { y: 0, opacity: 1, duration: .35 }, 1.4)
        .to(".growth-bars", { opacity: 1, duration: .25 }, 1.38).to(".growth-bar", { scaleY: 1, duration: .55, stagger: .08, ease: "back.out(1.6)" }, 1.44).to(lines, { stroke: "#dfff72", duration: .45 }, 1.5).to(".system-glow", { scale: 1.18, rotate: 18, duration: .6 }, 1.5);
      stage.addEventListener("pointermove", (event) => gsap.to(".system-plane", { rotateY: (event.clientX / innerWidth - .5) * 7, rotateX: -(event.clientY / innerHeight - .5) * 5, duration: .8, ease: "power2.out" }), { signal: controller.signal });
      stage.addEventListener("pointerleave", () => gsap.to(".system-plane", { rotateY: 0, rotateX: 0, duration: .8, ease: "power2.out" }), { signal: controller.signal });
    }

    const stackSection = document.querySelector<HTMLElement>(".services-scroll-section");
    const stackPin = document.querySelector<HTMLElement>(".services-pin");
    const stackDots = gsap.utils.toArray<HTMLElement>(".service-progress-dot");
    const stackCounter = document.querySelector<HTMLElement>(".service-counter");
    if (stackSection && stackPin && stackCards.length && innerWidth >= 768) {
      gsap.fromTo(".services-intro > *", { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: .75, stagger: .1, ease: "power3.out", scrollTrigger: { trigger: stackSection, start: "top 82%" } });
      gsap.set(stackCards, { opacity: 0, scale: 1.08, rotateY: 28, rotateX: -6, z: 420, y: 40, filter: "blur(10px)", force3D: true });
      gsap.set(stackCards[0], { opacity: 1, scale: 1, rotateY: 0, rotateX: 0, z: 0, y: 0, filter: "blur(0px)" });
      setStackAccess(0);
      let activeCard = 0;
      const updateStack = (index: number) => {
        if (index === activeCard) return;
        activeCard = index; setStackAccess(index);
        if (stackCounter) stackCounter.textContent = `${String(index + 1).padStart(2, "0")} / ${String(stackCards.length).padStart(2, "0")}`;
        stackDots.forEach((dot, dotIndex) => dot.classList.toggle("is-active", dotIndex === index));
        gsap.to(".services-stack-aura", { backgroundColor: serviceColors[index], opacity: .24, scale: 1 + index * .025, duration: .6 });
      };
      const stackTimeline = gsap.timeline({ defaults: { duration: 1, ease: "power2.inOut" }, scrollTrigger: { trigger: stackSection, start: "top top", end: () => `+=${stackCards.length * innerHeight}`, pin: stackPin, pinSpacing: true, scrub: 1, anticipatePin: 1, invalidateOnRefresh: true, refreshPriority: 1, onUpdate: ({ progress }) => updateStack(Math.min(stackCards.length - 1, Math.round(progress * (stackCards.length - 1)))) } });
      for (let index = 0; index < stackCards.length - 1; index++) {
        if (index > 0) stackTimeline.set(stackCards[index - 1], { opacity: 0 }, index);
        stackTimeline.to(stackCards[index], { opacity: .12, scale: .72, rotateY: -38, rotateX: 8, z: -650, y: -30, filter: "blur(8px)" }, index)
          .fromTo(stackCards[index + 1], { opacity: 0, scale: 1.08, rotateY: 28, rotateX: -6, z: 420, y: 40, filter: "blur(10px)" }, { opacity: 1, scale: 1, rotateY: 0, rotateX: 0, z: 0, y: 0, filter: "blur(0px)" }, index);
      }
    }

    const steps = gsap.utils.toArray<HTMLElement>(".os-step");
    const nodes = gsap.utils.toArray<HTMLElement>(".os-node");
    const title = document.querySelector<HTMLElement>(".os-title"); const description = document.querySelector<HTMLElement>(".os-description"); const kicker = document.querySelector<HTMLElement>(".os-kicker"); const counter = document.querySelector<HTMLElement>(".os-counter");
    const activate = (index: number) => {
      steps.forEach((step, stepIndex) => step.classList.toggle("is-active", stepIndex === index)); nodes.forEach((node, nodeIndex) => node.classList.toggle("is-active", nodeIndex <= index));
      if (title) title.textContent = storyTitles[index]; if (description) description.textContent = storyDetails[index]; if (kicker) kicker.textContent = storyNames[index]; if (counter) counter.textContent = `0${index + 1} / 06`;
      gsap.to(".os-progress", { scaleY: index / 5, duration: .45, ease: "power2.out" }); gsap.to(".os-glow", { backgroundColor: storyColors[index], opacity: .28, scale: 1 + index * .03, duration: .6 }); gsap.fromTo([title, description], { y: 10, opacity: .35 }, { y: 0, opacity: 1, duration: .4 }); gsap.to(".os-bar", { scaleY: (barIndex) => .45 + ((barIndex + index) % 4) * .18, transformOrigin: "bottom", duration: .45, stagger: .04 });
    };
    if (steps.length) { gsap.set(steps, { opacity: .32 }); activate(0); }
    steps.forEach((step, index) => ScrollTrigger.create({ trigger: step, start: "top 48%", end: "bottom 48%", onEnter: () => activate(index), onEnterBack: () => activate(index) }));

    const whySection = document.querySelector<HTMLElement>(".why-section");
    const whyCards = gsap.utils.toArray<HTMLElement>(".why-card");
    if (whySection && whyCards.length) {
      gsap.timeline({ scrollTrigger: { trigger: whySection, start: "top 72%", end: "top 30%", toggleActions: "play none none reverse" } })
        .fromTo(".why-eyebrow", { y: 16, opacity: 0 }, { y: 0, opacity: 1, duration: .55, ease: "power3.out" })
        .fromTo(".why-heading-line", { y: 28, opacity: 0 }, { y: 0, opacity: 1, duration: .7, stagger: .12, ease: "power3.out" }, .12)
        .fromTo(".why-copy", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: .7, ease: "power3.out" }, .38)
        .fromTo(".why-grid-line-x", { scaleX: 0 }, { scaleX: 1, duration: .8, ease: "power3.out" }, .2)
        .fromTo(".why-grid-line-y", { scaleY: 0 }, { scaleY: 1, duration: .8, ease: "power3.out" }, .26)
        .fromTo(whyCards, { y: 34, opacity: 0, scale: .97 }, { y: 0, opacity: 1, scale: 1, duration: .75, stagger: .14, ease: "power3.out" }, .32);
      let activeWhy = -1;
      ScrollTrigger.create({ trigger: whySection, start: "top 38%", end: "bottom 48%", scrub: true, onUpdate: ({ progress }) => { const index = Math.min(whyCards.length - 1, Math.floor(progress * whyCards.length)); if (index === activeWhy) return; activeWhy = index; whyCards.forEach((card, cardIndex) => card.classList.toggle("is-active", cardIndex === index)); gsap.to(".why-spotlight", { xPercent: index % 2 ? 14 : -14, yPercent: index > 1 ? 14 : -14, backgroundColor: storyColors[index + 1], duration: .7, ease: "power2.out" }); } });
    }

    document.querySelectorAll<HTMLElement>(".nav-link[data-section]").forEach((link) => { const target = document.querySelector(`#${link.dataset.section}`); if (target) ScrollTrigger.create({ trigger: target, start: "top 35%", end: "bottom 35%", onToggle: ({ isActive }) => link.classList.toggle("is-active", isActive) }); });
  });

  const word = document.querySelector("#rotating-word"); const words = ["Strategy", "Content", "Funnels", "Automation", "Growth"]; let wordIndex = 0;
  wordTimer = setInterval(() => { if (!word) return; gsap.to(word, { y: -7, opacity: 0, duration: .2, onComplete: () => { word.textContent = words[++wordIndex % words.length]; gsap.fromTo(word, { y: 7 }, { y: 0, opacity: 1, duration: .3 }); } }); }, 2400);
  if (location.hash) requestAnimationFrame(() => { const target = document.querySelector<HTMLElement>(location.hash); if (target) lenis?.scrollTo(target, { offset: -76, immediate: true }); });
  requestAnimationFrame(() => { ScrollTrigger.sort(); ScrollTrigger.refresh(); });
  document.fonts.ready.then(() => { ScrollTrigger.sort(); ScrollTrigger.refresh(); });
}

document.addEventListener("astro:page-load", initMotion);
