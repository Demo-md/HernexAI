type Cleanup = () => void;

type StrategyGeometry = {
  sourceLeft: number;
  sourceTop: number;
  deltaX: number;
  deltaY: number;
  scaleX: number;
  scaleY: number;
};

const entranceOffsets = [
  { x: -7, y: 8, rotation: -1.6, scale: 0.99 },
  { x: 4, y: -8, rotation: 1.2, scale: 1.01 },
  { x: -5, y: 7, rotation: -1.1, scale: 0.99 },
  { x: 7, y: 5, rotation: 1.7, scale: 1.01 },
  { x: -6, y: -7, rotation: -1.5, scale: 0.99 },
  { x: 7, y: 5, rotation: 1.2, scale: 1.01 },
  { x: -6, y: 9, rotation: -1.7, scale: 0.99 },
  { x: 8, y: -5, rotation: 1.8, scale: 1.01 },
];

const loopOffsets = [
  { x: 0, y: -5, rotation: -0.8 },
  { x: 1, y: -1, rotation: 1.1 },
  { x: -3, y: 0, rotation: -0.6 },
  { x: 0, y: 4, rotation: 0.5 },
  { x: 0, y: 0, scaleX: 0.985 },
  { x: 3, y: 0, rotation: 0.45 },
  { x: 0, y: 5, rotation: -0.8 },
  { x: 4, y: -4, rotation: 0.9 },
];

const travelOffsets = [0, 3, 6, 2, 8, 4, 10, 6];
const strategyStages = ["problem", "system", "services", "capability"] as const;
type StrategyStage = (typeof strategyStages)[number];
type StrategyStageNode = {
  id: StrategyStage;
  target: HTMLElement;
  section: HTMLElement;
  reveals: HTMLElement[];
};

function createStrategyTraveller(source: HTMLElement, letters: HTMLElement[]) {
  const traveller = document.createElement("span");
  traveller.className = "strategy-traveller";
  traveller.dataset.strategyTraveller = "";
  traveller.setAttribute("aria-hidden", "true");
  letters.forEach((letter) => {
    const clone = document.createElement("span");
    clone.className = "strategy-word__letter";
    clone.textContent = letter.textContent;
    traveller.append(clone);
  });
  const sweep = document.createElement("span");
  sweep.className = "strategy-traveller__sweep";
  traveller.append(sweep);
  document.body.append(traveller);
  return {
    traveller,
    letters: [...traveller.querySelectorAll<HTMLElement>(".strategy-word__letter")],
    sweep,
  };
}

function setTravellerTypography(traveller: HTMLElement, origin: HTMLElement) {
  const styles = getComputedStyle(origin);
  traveller.style.fontSize = styles.fontSize;
  traveller.style.fontWeight = styles.fontWeight;
  traveller.style.letterSpacing = styles.letterSpacing;
  traveller.style.lineHeight = styles.lineHeight;
}

export async function initialiseMotion(): Promise<Cleanup> {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return () => {};

  const [{ gsap }, { ScrollTrigger }, { default: Lenis }] = await Promise.all([
    import("gsap"),
    import("gsap/ScrollTrigger"),
    import("lenis"),
  ]);
  gsap.registerPlugin(ScrollTrigger);

  let stopIntroGate = () => {};
  let stopHeroMotion = () => {};
  const context = gsap.context(() => {
    const hero = document.querySelector<HTMLElement>(".hero");
    const master = gsap.timeline({ paused: true, defaults: { ease: "power3.out" } });
    master.addLabel("navigation", 0).from("[data-site-header] .site-header__inner", { y: -10, autoAlpha: 0, duration: 0.28 }, "navigation");

    if (!hero) {
      master.play(0);
      return;
    }

    const strategyWord = hero.querySelector<HTMLElement>("[data-strategy-source]");
    const strategyLetters = gsap.utils.toArray<HTMLElement>("[data-strategy-letter]");
    const [creativeLine, executionLine] = gsap.utils.toArray<HTMLElement>("[data-hero-line]");
    const mediaHost = hero.querySelector<HTMLElement>("[data-kinetic-media]");
    const mediaItems = gsap.utils.toArray<HTMLElement>("[data-kinetic-media-item]");
    const staticMedia = hero.querySelector<HTMLElement>("[data-hero-media-static]");
    const stageNodes = strategyStages.flatMap((id): StrategyStageNode[] => {
      const target = document.querySelector<HTMLElement>(`[data-strategy-target="${id}"]`);
      const section = target?.closest<HTMLElement>("[data-strategy-section]");
      const reveals = section ? [...section.querySelectorAll<HTMLElement>("[data-strategy-reveal]")] : [];
      return target && section ? [{ id, target, section, reveals }] : [];
    });

    let entranceComplete = false;
    let heroVisible = true;
    let transferActive = false;
    let strategyBeat = false;
    const updateState = (state: string) => { document.documentElement.dataset.strategyState = state; };

    gsap.set(mediaItems, { autoAlpha: 0, willChange: "transform, opacity" });
    gsap.set("[data-hero-human], [data-strategy-letter], [data-hero-line], [data-hero-body], [data-hero-actions], [data-hero-cue]", { willChange: "transform, opacity" });

    const mediaLoop = gsap.timeline({ paused: true, repeat: -1, defaults: { ease: "power2.inOut" } });
    const cardTransition = 0.42;
    // Each card, including its entry and exit, hands off to the next one every 4.2 seconds.
    const cardPeriod = 4.2;
    const cardHold = cardPeriod - cardTransition;
    const media = (id: string) => mediaItems.find((item) => item.dataset.kineticMediaItem === id);
    const addMediaBeat = (id: string, at: number, rotation: number) => {
      const item = media(id);
      if (!item) return;
      mediaLoop
        .set(item, { xPercent: -50, yPercent: -50, x: 14, y: 18, rotation: rotation + 4.5, scale: 0.94, autoAlpha: 0 }, at)
        .to(item, { x: 0, y: 0, rotation, scale: 1, autoAlpha: 0.98, duration: cardTransition, ease: "power3.out" }, at)
        // Keep the card readable between the two art-directed transition phases.
        .to(item, { y: -2, rotation: rotation + 0.65, duration: cardHold, ease: "sine.inOut" }, at + cardTransition)
        // Start the outgoing fade at the exact moment the next card enters, so the scene never blanks.
        .to(item, { x: -10, y: -15, rotation: rotation - 3.5, scale: 0.965, autoAlpha: 0, duration: cardTransition, ease: "power2.in" }, at + cardPeriod);
    };

    addMediaBeat("brand", 0, -5.5);
    addMediaBeat("social", cardPeriod, 4.5);
    addMediaBeat("search", cardPeriod * 2, -3.5);
    addMediaBeat("mobile", cardPeriod * 3, 5.5);
    addMediaBeat("workflow", cardPeriod * 4, -4.5);

    // The 0.8s letter settle plus this 0.4s pause gives Strategy a deliberate 1.2s cadence.
    const strategyLoop = gsap.timeline({ paused: true, repeat: -1, repeatDelay: 0.4 })
      .call(() => {
        strategyBeat = true;
      }, [], 0)
      .to(strategyLetters, {
        x: (index) => loopOffsets[index]?.x ?? 0,
        y: (index) => loopOffsets[index]?.y ?? 0,
        rotation: (index) => loopOffsets[index]?.rotation ?? 0,
        scaleX: (index) => loopOffsets[index]?.scaleX ?? 1,
        duration: 0.18,
        stagger: 0.035,
        ease: "power2.out",
      }, 0)
      .to(strategyLetters, { x: 0, y: 0, rotation: 0, scaleX: 1, duration: 0.27, stagger: 0.03, ease: "power4.out" }, 0.17)
      .set("[data-strategy-sweep]", { autoAlpha: 1, scaleX: 0 }, 0.44)
      .to("[data-strategy-sweep]", { scaleX: 1, duration: 0.26, ease: "power2.inOut" }, 0.44)
      .to("[data-strategy-sweep]", { autoAlpha: 0, duration: 0.1 }, 0.69)
      .call(() => {
        strategyBeat = false;
        syncAutonomous();
      }, [], 0.8);

    const syncAutonomous = () => {
      const shouldRun = entranceComplete && heroVisible && !document.hidden && !transferActive;
      if (!shouldRun) {
        strategyLoop.pause();
        mediaLoop.pause();
        return;
      }
      strategyLoop.play();
      if (!strategyBeat) {
        if (Number(gsap.getProperty(mediaHost, "opacity")) < 0.99) gsap.to(mediaHost, { autoAlpha: 1, duration: 0.16, overwrite: "auto" });
        mediaLoop.play();
      }
    };

    const heroObserver = new IntersectionObserver(([entry]) => {
      heroVisible = entry.isIntersecting;
      syncAutonomous();
    }, { threshold: 0.08 });
    const onVisibility = () => syncAutonomous();
    heroObserver.observe(hero);
    document.addEventListener("visibilitychange", onVisibility);

    master
      .addLabel("eyebrow", 0.15)
      .from("[data-hero-eyebrow]", { y: 10, autoAlpha: 0, duration: 0.28 }, "eyebrow")
      .addLabel("human", 0.25)
      .from("[data-hero-human]", { yPercent: 102, autoAlpha: 0, duration: 0.46 }, "human")
      .addLabel("strategy", 0.3);
    strategyLetters.forEach((letter, index) => {
      master.from(letter, { ...entranceOffsets[index], autoAlpha: 0, duration: 0.62, ease: "power4.out" }, `strategy+=${index * 0.04}`);
    });
    master
      .to(strategyWord, { letterSpacing: "-0.065em", duration: 0.11 }, 0.82)
      .set("[data-strategy-sweep]", { autoAlpha: 1, scaleX: 0 }, 0.85)
      .to("[data-strategy-sweep]", { scaleX: 1, duration: 0.28, ease: "power2.inOut" }, 0.85)
      .to("[data-strategy-sweep]", { autoAlpha: 0, duration: 0.12 }, 1.14)
      .from(creativeLine, { yPercent: 105, autoAlpha: 0, duration: 0.54 }, 0.95)
      .from(executionLine, { yPercent: 105, autoAlpha: 0, duration: 0.54 }, 1.15)
      .from("[data-hero-body]", { y: 13, autoAlpha: 0, duration: 0.36 }, 1.3)
      .from("[data-hero-actions]", { y: 10, autoAlpha: 0, duration: 0.32 }, 1.42)
      .from("[data-hero-cue]", { y: 8, autoAlpha: 0, duration: 0.28 }, 1.48)
      .to(staticMedia, { autoAlpha: 0, duration: 0.22 }, 1.6)
      .to(mediaHost, { autoAlpha: 1, duration: 0.28 }, 1.65)
      .call(() => mediaLoop.play(0), [], 1.65);
    master.eventCallback("onComplete", () => {
      entranceComplete = true;
      gsap.set("[data-hero-human], [data-strategy-letter], [data-hero-line], [data-hero-body], [data-hero-actions], [data-hero-cue]", { willChange: "auto" });
      syncAutonomous();
    });

    if (strategyWord && stageNodes.length === strategyStages.length) {
      const { traveller, letters: travellerLetters, sweep } = createStrategyTraveller(strategyWord, strategyLetters);
      const geometries = new Map<string, StrategyGeometry>();
      const origins = [strategyWord, ...stageNodes.slice(0, -1).map((stage) => stage.target)];
      gsap.set(traveller, { autoAlpha: 0, willChange: "transform, opacity" });
      gsap.set(sweep, { autoAlpha: 0, scaleX: 0 });

      const measure = () => {
        stageNodes.forEach((stage, index) => {
          const origin = origins[index];
          if (!origin) return;
          const originRect = origin.getBoundingClientRect();
          const targetRect = stage.target.getBoundingClientRect();
          const sourceLeft = originRect.left + window.scrollX;
          const sourceTop = originRect.top + window.scrollY;
          geometries.set(stage.id, {
            sourceLeft,
            sourceTop,
            deltaX: targetRect.left + window.scrollX - sourceLeft,
            deltaY: targetRect.top + window.scrollY - sourceTop,
            scaleX: targetRect.width / originRect.width,
            scaleY: targetRect.height / originRect.height,
          });
        });
      };
      const resetTraveller = (origin: HTMLElement, id: string) => {
        const geometry = geometries.get(id);
        if (!geometry) return;
        setTravellerTypography(traveller, origin);
        traveller.style.left = `${geometry.sourceLeft}px`;
        traveller.style.top = `${geometry.sourceTop}px`;
        traveller.style.width = `${origin.getBoundingClientRect().width}px`;
      };
      measure();

      stageNodes.forEach((stage, index) => {
        const origin = origins[index];
        if (!origin) return;
        const mobile = window.matchMedia("(max-width: 767px)").matches;
        const timeline = gsap.timeline({
          defaults: { ease: "none" },
          scrollTrigger: {
            trigger: stage.section,
            start: index === 0 ? "top 86%" : "top 76%",
            end: index === 0 ? "top 39%" : "top 35%",
            scrub: true,
            invalidateOnRefresh: true,
            onEnter: () => {
              transferActive = true;
              updateState(`TRANSITION_TO_${stage.id.toUpperCase()}`);
              gsap.set(stage.target, { autoAlpha: 0 });
              gsap.set(stage.reveals, { autoAlpha: 0, y: 16 });
              strategyLoop.pause(0);
              mediaLoop.pause();
              gsap.to(mediaHost, { autoAlpha: 0, duration: 0.18, overwrite: "auto" });
              gsap.set(strategyLetters, { x: 0, y: 0, rotation: 0, scaleX: 1 });
              resetTraveller(origin, stage.id);
            },
            onEnterBack: () => {
              transferActive = true;
              updateState("REVERSING");
              gsap.set(stage.target, { autoAlpha: 0 });
              gsap.set(stage.reveals, { autoAlpha: 0, y: 16 });
              resetTraveller(origin, stage.id);
            },
            onLeave: () => {
              updateState(`${stage.id.toUpperCase()}_LOCKED`);
              if (index > 0) transferActive = false;
            },
            onLeaveBack: () => {
              if (index === 0) {
                transferActive = false;
                updateState("HERO_IDLE");
                syncAutonomous();
              } else {
                const previousStage = stageNodes[index - 1];
                if (previousStage) updateState(`${previousStage.id.toUpperCase()}_LOCKED`);
              }
            },
            onRefresh: () => {
              measure();
              resetTraveller(origin, stage.id);
            },
          },
        });
        timeline
          .to(origin, { autoAlpha: 0, duration: 0.08 }, 0.08)
          .to(traveller, { autoAlpha: 1, duration: 0.05 }, 0.07)
          .to(traveller, {
            x: () => geometries.get(stage.id)?.deltaX ?? 0,
            y: () => geometries.get(stage.id)?.deltaY ?? 0,
            scaleX: () => geometries.get(stage.id)?.scaleX ?? 1,
            scaleY: () => geometries.get(stage.id)?.scaleY ?? 1,
            duration: 0.72,
          }, 0.1);
        if (!mobile) {
          timeline
            .to(travellerLetters, { y: (letter) => travelOffsets[letter] ?? 0, duration: 0.22, stagger: 0.022 }, 0.26)
            .to(travellerLetters, { y: 0, rotation: 0, duration: 0.2, stagger: 0.018 }, 0.56);
        }
        timeline
          .to(sweep, { autoAlpha: 1, scaleX: 1, duration: 0.14 }, 0.68)
          .to(traveller, { autoAlpha: 0, duration: 0.04 }, 0.9)
          .to(stage.target, { autoAlpha: 1, duration: 0.04 }, 0.91)
          .to(stage.reveals, { autoAlpha: 1, y: 0, duration: 0.12, stagger: 0.035 }, 0.93);
      });

      const resizeObserver = new ResizeObserver(() => ScrollTrigger.refresh());
      resizeObserver.observe(hero);
      stageNodes.forEach((stage) => resizeObserver.observe(stage.section));
      document.fonts?.ready.then(() => ScrollTrigger.refresh());
      stopHeroMotion = () => {
        resizeObserver.disconnect();
        traveller.remove();
      };
    }

    gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((element) => {
      gsap.from(element, { y: 24, autoAlpha: 0, duration: 0.6, ease: "power3.out", immediateRender: false, scrollTrigger: { trigger: element, start: "top 86%", once: true } });
    });
    gsap.utils.toArray<HTMLElement>("[data-capability-step]").forEach((element) => {
      gsap.from(element, { x: -16, autoAlpha: 0, duration: 0.46, ease: "power3.out", immediateRender: false, scrollTrigger: { trigger: element, start: "top 88%", once: true } });
    });

    const startHero = () => master.play(0);
    if (document.documentElement.dataset.introState === "active") {
      window.addEventListener("hernex:intro-complete", startHero, { once: true });
      stopIntroGate = () => window.removeEventListener("hernex:intro-complete", startHero);
    } else startHero();

    const previousStop = stopHeroMotion;
    stopHeroMotion = () => {
      heroObserver.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      mediaLoop.kill();
      strategyLoop.kill();
      previousStop();
      delete document.documentElement.dataset.strategyState;
    };
  }, document.body);

  let lenis: InstanceType<typeof Lenis> | undefined;
  const onLenisVisibility = () => document.hidden ? lenis?.stop() : lenis?.start();
  if (window.matchMedia("(min-width: 768px)").matches) {
    lenis = new Lenis({ lerp: 0.09, smoothWheel: true, syncTouch: false });
    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis?.raf(time * 1000);
    gsap.ticker.add(tick);
    document.addEventListener("visibilitychange", onLenisVisibility);
    document.fonts?.ready.then(() => ScrollTrigger.refresh());
    return () => {
      document.removeEventListener("visibilitychange", onLenisVisibility);
      gsap.ticker.remove(tick);
      lenis?.destroy();
      stopHeroMotion();
      stopIntroGate();
      context.revert();
    };
  }
  return () => {
    stopHeroMotion();
    stopIntroGate();
    context.revert();
  };
}
