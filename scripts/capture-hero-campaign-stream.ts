import { mkdir } from "node:fs/promises";
import { chromium } from "playwright";

const baseUrl = process.env.BASE_URL ?? "http://127.0.0.1:3001";
const outputDir = process.env.QA_OUTPUT_DIR ?? ".qa/hero-campaign-stream";
const viewports = [
  ["desktop-1440", { width: 1440, height: 900 }],
  ["desktop-1280", { width: 1280, height: 800 }],
  ["tablet-1024", { width: 1024, height: 768 }],
  ["tablet-768", { width: 768, height: 1024 }],
  ["mobile-430", { width: 430, height: 932 }],
  ["mobile-390", { width: 390, height: 844 }],
] as const;

const browser = await chromium.launch({ headless: true });
try {
  await mkdir(outputDir, { recursive: true });
  for (const [name, viewport] of viewports) {
    const context = await browser.newContext({ viewport });
    const page = await context.newPage();
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    page.on("console", (message) => { if (message.type() === "error") errors.push(message.text()); });
    await page.addInitScript(() => window.sessionStorage.setItem("hernex-intro-seen", "true"));
    await page.goto(baseUrl, { waitUntil: "domcontentloaded" });
    await page.waitForFunction(() => document.querySelectorAll("[data-kinetic-media-item]").length === 5);
    await page.waitForTimeout(1800);
    await page.screenshot({ path: `${outputDir}/${name}-first-media.png` });
    await page.waitForTimeout(3900);
    await page.screenshot({ path: `${outputDir}/${name}-second-media.png` });
    if (name === "desktop-1440") {
      for (const card of ["third", "fourth", "fifth"]) {
        await page.waitForTimeout(3900);
        await page.screenshot({ path: `${outputDir}/${name}-${card}-media.png` });
      }
    }
    await page.evaluate(() => window.scrollTo({ top: document.querySelector<HTMLElement>("[data-strategy-section='problem']")!.offsetTop + 180, behavior: "auto" }));
    await page.waitForTimeout(360);
    await page.screenshot({ path: `${outputDir}/${name}-handoff.png` });
    console.log(JSON.stringify({ name, errors }));
    await context.close();
  }

  const context = await browser.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: "reduce" });
  const page = await context.newPage();
  await page.addInitScript(() => window.sessionStorage.setItem("hernex-intro-seen", "true"));
  await page.goto(baseUrl, { waitUntil: "domcontentloaded" });
  await page.screenshot({ path: `${outputDir}/reduced-1440-static.png` });
  await context.close();
} finally {
  await browser.close();
}
