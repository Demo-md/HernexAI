import { mkdir } from "node:fs/promises";
import { chromium } from "playwright";

const baseUrl = process.env.BASE_URL ?? "http://127.0.0.1:3001";
const outputDir = process.env.QA_OUTPUT_DIR ?? ".qa/strategy-four-section";
const stages = ["problem", "system", "services", "capability"] as const;

const browser = await chromium.launch({ headless: true });
try {
  await mkdir(outputDir, { recursive: true });
  for (const [name, viewport] of [["desktop-1440", { width: 1440, height: 900 }], ["mobile-390", { width: 390, height: 844 }]] as const) {
    const context = await browser.newContext({ viewport });
    const page = await context.newPage();
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    page.on("console", (message) => { if (message.type() === "error") errors.push(message.text()); });
    await page.addInitScript(() => window.sessionStorage.setItem("hernex-intro-seen", "true"));
    await page.goto(baseUrl, { waitUntil: "domcontentloaded" });
    await page.waitForFunction(() => document.querySelector("[data-strategy-traveller]"));
    await page.screenshot({ path: `${outputDir}/${name}-hero.png` });
    for (const stage of stages) {
      await page.evaluate((id) => window.scrollTo({ top: document.querySelector<HTMLElement>(`[data-strategy-section="${id}"]`)!.offsetTop + 240, behavior: "auto" }), stage);
      await page.waitForFunction((id) => Number.parseFloat(getComputedStyle(document.querySelector(`[data-strategy-target="${id}"]`)!).opacity) > 0.98, stage);
      await page.screenshot({ path: `${outputDir}/${name}-${stage}.png` });
    }
    await page.evaluate(() => window.scrollTo({ top: 0, behavior: "auto" }));
    await page.waitForFunction(() => Number.parseFloat(getComputedStyle(document.querySelector("[data-strategy-source]")!).opacity) > 0.98);
    console.log(JSON.stringify({ name, errors, reverse: "pass" }));
    await context.close();
  }
} finally {
  await browser.close();
}
