import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useEffect, useState } from "react";
import type { GreetingAnimation, IntroGreeting } from "../../data/intro";

interface Props {
  greetings: IntroGreeting[];
}

const easing = [0.22, 1, 0.36, 1] as const;
const motionStyle = { willChange: "transform, opacity" } as const;

function getVariant(animation: GreetingAnimation, reduced: boolean) {
  if (reduced) return { initial: { opacity: 1 }, animate: { opacity: 1 }, exit: { opacity: 0 } };
  if (animation === "rise") return { initial: { opacity: 0, y: 16 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -10 } };
  if (animation === "compress") return { initial: { opacity: 0, scaleX: 0.76 }, animate: { opacity: 1, scaleX: 1 }, exit: { opacity: 0, scaleX: 0.86 } };
  if (animation === "mask") return { initial: { opacity: 0, x: 18, clipPath: "inset(0 100% 0 0)" }, animate: { opacity: 1, x: 0, clipPath: "inset(0 0% 0 0)" }, exit: { opacity: 0, x: -12, clipPath: "inset(0 0 0 100%)" } };
  return { initial: { opacity: 0, y: 12, clipPath: "inset(0 0 100% 0)" }, animate: { opacity: 1, y: 0, clipPath: "inset(0 0 0% 0)" }, exit: { opacity: 0, y: -8, clipPath: "inset(100% 0 0 0)" } };
}

export default function GreetingSequence({ greetings }: Props) {
  const reduceMotion = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState<number>(-1);
  const activeGreeting = activeIndex >= 0 ? greetings[activeIndex] : undefined;

  useEffect(() => {
    const onGreeting = (event: Event) => {
      const index = (event as CustomEvent<{ index: number }>).detail.index;
      setActiveIndex(index);
    };
    window.addEventListener("hernex:intro-greeting", onGreeting);
    document.documentElement.dataset.introGreetingReady = "true";
    window.dispatchEvent(new CustomEvent("hernex:intro-greeting-ready"));
    return () => {
      window.removeEventListener("hernex:intro-greeting", onGreeting);
      delete document.documentElement.dataset.introGreetingReady;
    };
  }, []);

  const variants = activeGreeting ? getVariant(activeGreeting.animation, Boolean(reduceMotion)) : undefined;
  const letters = activeGreeting?.text.split("") ?? [];
  const splitLetters = Boolean(activeGreeting?.letterAnimation);

  return (
    <div className="cinematic-intro__greeting" data-intro-greeting-region>
      <AnimatePresence mode="wait" initial={false}>
        {activeGreeting && variants && (
          <motion.span
            key={activeGreeting.text}
            className={`cinematic-intro__word cinematic-intro__word--${activeGreeting.animation}`}
            lang={activeGreeting.locale}
            dir={activeGreeting.direction ?? "ltr"}
            initial={variants.initial}
            animate={variants.animate}
            exit={variants.exit}
            transition={{ duration: reduceMotion ? 0.01 : 0.18, ease: easing }}
            style={motionStyle}
          >
            {splitLetters ? letters.map((letter, index) => (
              <motion.span
                key={`${activeGreeting.text}-${index}`}
                className="cinematic-intro__letter"
                initial={activeGreeting.animation === "slice" && !reduceMotion ? { y: (index % 3 - 1) * 9, opacity: 0 } : false}
                animate={{ y: 0, opacity: 1 }}
                transition={{ duration: reduceMotion ? 0.01 : 0.24, delay: activeGreeting.animation === "slice" ? index * 0.018 : 0, ease: easing }}
              >
                {letter === " " ? "\u00a0" : letter}
              </motion.span>
            )) : <span className="cinematic-intro__script-word">{activeGreeting.text}</span>}
          </motion.span>
        )}
      </AnimatePresence>
    </div>
  );
}
