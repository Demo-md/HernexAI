import { mkdir } from "node:fs/promises";
import { chromium } from "playwright";

const baseUrl = process.env.BASE_URL ?? "http://127.0.0.1:3001";
const outputDir = process.env.QA_OUTPUT_DIR ?? ".qa/first-signal";

interface CaptureOptions {
  name: string;
  viewport: { width: number; height: number };
  reduced?: boolean;
}

const browser = await chromium.launch({ headless: true });
try {
  await mkdir(outputDir, { recursive: true });

  const capture = async ({ name, viewport, reduced = false }: CaptureOptions) => {
    const context = await browser.newContext({ viewport, reducedMotion: reduced ? "reduce" : "no-preference" });
    const page = await context.newPage();
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    page.on("console", (message) => { if (message.type() === "error") errors.push(message.text()); });
    await page.addInitScript(() => window.sessionStorage.clear());
    await page.goto(baseUrl, { waitUntil: "domcontentloaded" });

    if (!reduced) {
      await page.waitForFunction(() => document.documentElement.dataset.introState === "active");
      await page.screenshot({ path: `${outputDir}/${name}-initial.png` });
      await page.waitForFunction(() => document.querySelector(".cinematic-intro__word")?.textContent?.includes("নমস্কার"), undefined, { timeout: 4_000 });
      await page.waitForFunction(() => Number(getComputedStyle(document.querySelector(".cinematic-intro__word")!).opacity) > 0.98, undefined, { timeout: 1_000 });
      await page.screenshot({ path: `${outputDir}/${name}-bengali.png` });
      await page.waitForFunction(() => document.querySelector(".cinematic-intro__word")?.textContent?.includes("നമസ്കാരം"), undefined, { timeout: 8_000 });
      await page.waitForFunction(() => Number(getComputedStyle(document.querySelector(".cinematic-intro__word")!).opacity) > 0.98, undefined, { timeout: 1_000 });
      await page.waitForTimeout(900);
      await page.screenshot({ path: `${outputDir}/${name}-malayalam-hold.png` });
    }

    await page.waitForFunction(() => document.documentElement.dataset.introState === "complete", undefined, { timeout: 13_000 });
    await page.screenshot({ path: `${outputDir}/${name}-hero.png` });
    console.log(JSON.stringify({ name, errors, state: await page.locator("html").getAttribute("data-intro-state") }));
    await context.close();
  };

  await capture({ name: "desktop-1440", viewport: { width: 1440, height: 900 } });
  await capture({ name: "mobile-390", viewport: { width: 390, height: 844 } });
  await capture({ name: "reduced-1440", viewport: { width: 1440, height: 900 }, reduced: true });
} finally {
  await browser.close();
}
