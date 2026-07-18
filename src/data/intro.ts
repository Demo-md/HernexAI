export type GreetingAnimation = "slice" | "rise" | "compress" | "mask";

export interface IntroGreeting {
  text: string;
  language: string;
  locale: string;
  direction?: "ltr" | "rtl";
  letterAnimation?: boolean;
  animation: GreetingAnimation;
}

const introGreetings: IntroGreeting[] = [
  { text: "Hello", language: "English", locale: "en", letterAnimation: true, animation: "slice" },
  { text: "नमस्ते", language: "Hindi", locale: "hi", animation: "rise" },
  { text: "নমস্কার", language: "Bengali", locale: "bn", animation: "compress" },
  { text: "నమస్కారం", language: "Telugu", locale: "te", animation: "mask" },
  { text: "வணக்கம்", language: "Tamil", locale: "ta", animation: "slice" },
  { text: "ನಮಸ್ಕಾರ", language: "Kannada", locale: "kn", animation: "rise" },
  { text: "നമസ്കാരം", language: "Malayalam", locale: "ml", animation: "compress" },
];

export function getIntroGreetings(): IntroGreeting[] {
  return introGreetings;
}
