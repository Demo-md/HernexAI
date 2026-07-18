import { getIntroGreetings } from "../../data/intro";

type Cleanup = () => void;

function releaseHero(reason: string) {
  const root = document.documentElement;
  if (root.dataset.introReleased === "true") return;
  root.dataset.introReleased = "true";
  window.dispatchEvent(new CustomEvent("hernex:intro-complete", { detail: { reason } }));
}

export function initialiseIntro(): Cleanup {
  const intro = document.querySelector<HTMLElement>("[data-cinematic-intro]");
  const root = document.documentElement;
  if (!intro || root.dataset.introState !== "active") return () => {};
  const skipButton = intro.querySelector<HTMLButtonElement>("[data-intro-skip]");

  const isMobile = window.matchMedia("(max-width: 767px)").matches;
  const reduced = root.dataset.introMode === "reduced";
  const greetingCount = getIntroGreetings().length;
  let disposed = false;
  let timeline: GSAPTimeline | undefined;
  let scene: { setIntensity: (value: number) => void; destroy: () => void } | undefined;
  let startTimer = 0;

  const finish = (reason: string) => {
    if (!disposed) releaseHero(reason);
  };
  const removeOverlay = () => {
    if (disposed) return;
    scene?.destroy();
    scene = undefined;
    intro.hidden = true;
    root.dataset.introState = "complete";
  };
  const run = async () => {
    if (disposed) return;
    try {
      const [{ gsap }, sceneModule] = await Promise.all([
        import("gsap"),
        reduced ? Promise.resolve(undefined) : import("./intro-three-scene"),
      ]);
      if (disposed) return;
      if (sceneModule) {
        const canvas = intro.querySelector<HTMLCanvasElement>("[data-intro-canvas]");
        if (canvas) scene = await sceneModule.createIntroSignalScene(canvas, isMobile).catch(() => undefined);
      }
      if (disposed) return;

      const signal = intro.querySelector<HTMLElement>("[data-intro-signal]");
      const greetingRegion = intro.querySelector<HTMLElement>("[data-intro-greeting-region]");
      const greetingStart = reduced ? 0.04 : 0.15;
      const greetingInterval = 0.8;
      const greetingSettle = 0.16;
      const finalHold = 0.8;
      const greetingTimes = reduced
        ? [greetingStart]
        : Array.from({ length: greetingCount }, (_, index) => greetingStart + index * greetingInterval);
      const finalGreetingAt = greetingTimes[greetingTimes.length - 1];
      const handoffAt = reduced ? 0.1 : finalGreetingAt + greetingSettle + finalHold;
      const heroPrepareAt = reduced ? 0.16 : handoffAt + 0.34;
      const heroStartAt = reduced ? 0.25 : heroPrepareAt + 0.08;
      const duration = reduced ? 0.32 : heroStartAt + 0.28;
      const introTimeline = gsap.timeline({ defaults: { ease: "power3.out" } });
      timeline = introTimeline;
      introTimeline
        .addLabel("intro:start", 0)
        .set(intro, { autoAlpha: 1, yPercent: 0 })
        .set(signal, { y: 18, scale: 0.82 })
        .call(() => scene?.setIntensity(0.2), [], 0.1)
        .addLabel("greetings:start", greetingTimes[0]);

      greetingTimes.slice(0, greetingCount).forEach((time, index) => {
        introTimeline.call(() => window.dispatchEvent(new CustomEvent("hernex:intro-greeting", { detail: { index } })), [], time);
      });

      introTimeline
        .addLabel("signal:handoff", handoffAt)
        .to(greetingRegion, { autoAlpha: 0, y: -8, duration: reduced ? 0.01 : 0.18 }, "signal:handoff")
        .to(signal, { x: 0, y: 0, scale: 1.55, duration: reduced ? 0.01 : 0.24, ease: "power2.inOut" }, "signal:handoff+=0.1")
        .call(() => scene?.setIntensity(1), [], "signal:handoff+=0.13")
        .addLabel("hero:prepare", heroPrepareAt)
        .to(intro, { autoAlpha: 0, yPercent: reduced ? 0 : 100, duration: reduced ? 0.18 : 0.35, ease: "power2.inOut" }, "hero:prepare")
        .addLabel("hero:start", heroStartAt)
        .call(() => finish("timeline"), [], "hero:start")
        .call(removeOverlay, [], duration)
        .play(0);
    } catch {
      finish("initialisation-fallback");
      removeOverlay();
    }
  };
  const onGreetingReady = () => run();
  const skip = () => {
    timeline?.kill();
    finish("skipped-by-user");
    removeOverlay();
  };
  skipButton?.addEventListener("click", skip);
  if (root.dataset.introGreetingReady === "true" || reduced) {
    startTimer = window.setTimeout(run, 0);
  } else {
    window.addEventListener("hernex:intro-greeting-ready", onGreetingReady, { once: true });
  }

  return () => {
    disposed = true;
    window.clearTimeout(startTimer);
    window.removeEventListener("hernex:intro-greeting-ready", onGreetingReady);
    skipButton?.removeEventListener("click", skip);
    timeline?.kill();
    scene?.destroy();
  };
}
