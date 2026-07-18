import { chromium } from "playwright";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const baseUrl = process.env.BASE_URL ?? "http://127.0.0.1:2600";
const outputDir = process.env.QA_OUTPUT_DIR ?? ".qa/visual-regression";
const widths = [1440, 1280, 1024, 768, 430, 390];
const height = Number(process.env.VIEWPORT_HEIGHT ?? 900);

const browser = await chromium.launch({ headless: true });
try {
  await mkdir(outputDir, { recursive: true });

  for (const width of widths) {
    const page = await browser.newPage({ viewport: { width, height } });
    const slug = `${width}x${height}`;

    try {
      // The intro has dedicated lifecycle captures; this matrix verifies the settled page state.
      await page.addInitScript(() => window.sessionStorage.setItem("hernex-intro-seen", "true"));
      await page.goto(baseUrl, { waitUntil: "domcontentloaded" });
      await page.evaluate(() => document.fonts.ready);
      await page.waitForLoadState("networkidle", { timeout: 10_000 }).catch(() => undefined);
      await page.evaluate(() => window.scrollTo({ top: 0, behavior: "auto" }));
      await page.waitForFunction(() => {
        const title = document.querySelector<HTMLElement>("[data-hero-title]");
        const cue = document.querySelector<HTMLElement>("[data-hero-cue]");
        const headlineLines = [...document.querySelectorAll<HTMLElement>("[data-hero-line]")];
        const strategyLetters = [...document.querySelectorAll<HTMLElement>("[data-strategy-letter]")];
        const isVisible = (element: HTMLElement | null) => !element || (getComputedStyle(element).opacity === "1" && getComputedStyle(element).visibility !== "hidden");
        const isSettled = headlineLines.every((line) => {
          const transform = getComputedStyle(line).transform;
          if (transform === "none") return true;
          const matrix = new DOMMatrixReadOnly(transform);
          return Math.abs(matrix.m41) < 0.5 && Math.abs(matrix.m42) < 0.5;
        });
        const strategyIsSettled = strategyLetters.every((letter) => {
          const transform = getComputedStyle(letter).transform;
          if (transform === "none") return true;
          const matrix = new DOMMatrixReadOnly(transform);
          return Math.abs(matrix.m41) < 0.5 && Math.abs(matrix.m42) < 0.5;
        });
        return isVisible(title) && isVisible(cue) && isSettled && strategyIsSettled;
      }, { timeout: 4_000 }).catch(() => undefined);

      await page.screenshot({
        path: path.join(outputDir, `${slug}.png`),
        fullPage: false,
      });
      await page.screenshot({
        path: path.join(outputDir, `${slug}-full.png`),
        fullPage: true,
      });

      console.log(`captured ${width}px at ${baseUrl}`);
    } catch (error) {
      console.error(`failed ${width}px at ${baseUrl}`, error);
      process.exitCode = 1;
    } finally {
      await page.close();
    }
  }
} finally {
  await browser.close();
}
