import { expect, test } from "@playwright/test";
import { services } from "../src/data/site";
import { blogFixtures } from "../src/data/blog";

const publicRoutes = [
  "/",
  "/services",
  "/services/marketing",
  "/services/technology",
  ...services.map((service) => `/services/${service.slug}`),
  "/about",
  "/capabilities",
  "/contact",
  "/insights",
  ...blogFixtures.map((post) => `/insights/${post.slug}`),
];

test.describe("HernexAI public experience", () => {
  test("public routes render without page errors", async ({ page }) => {
    const pageErrors: string[] = [];
    page.on("pageerror", (error) => pageErrors.push(error.message));
    page.on("console", (message) => {
      if (message.type() === "error") pageErrors.push(message.text());
    });

    for (const route of publicRoutes) {
      const response = await page.goto(route);
      expect(response?.status()).toBe(200);
      await expect(page.locator("main")).toBeVisible();
    }

    expect(pageErrors).toEqual([]);
  });

  test("production browser cache stores only safe public requests for 48 hours", async ({ page }) => {
    await page.goto("/");
    await page.evaluate(async () => { await navigator.serviceWorker.ready; });
    await page.reload();
    await expect.poll(() => page.evaluate(async () => {
      const contentCache = (await caches.keys()).find((name) => name === "hernex-public-v1-content");
      if (!contentCache) return false;
      const keys = await (await caches.open(contentCache)).keys();
      return keys.some((request) => new URL(request.url).pathname === "/");
    })).toBe(true);

    const cacheState = await page.evaluate(async () => {
      const names = await caches.keys();
      const content = await caches.open("hernex-public-v1-content");
      const metadata = await caches.open("hernex-public-v1-metadata");
      const metadataEntries = await metadata.keys();
      const first = metadataEntries[0] ? await metadata.match(metadataEntries[0]) : undefined;
      const data = first ? await first.json() as { expiresAt?: number } : {};
      const cachedUrls = (await content.keys()).map((request) => request.url);
      return { names, cachedUrls, expiresAt: data.expiresAt };
    });

    expect(cacheState.names).toContain("hernex-public-v1-content");
    expect(cacheState.cachedUrls.some((url) => url.includes("/api/"))).toBe(false);
    expect(cacheState.expiresAt).toBeGreaterThan(Date.now() + 47 * 60 * 60 * 1000);
  });

  test("desktop services menu presents the two hubs and closes accessibly", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/");
    const officialHeaderLogo = page.locator(".wordmark .brand-logo--official");
    await expect(officialHeaderLogo).toHaveAttribute("src", "/hernex-logo-official.svg");
    expect((await officialHeaderLogo.boundingBox())!.width / (await officialHeaderLogo.boundingBox())!.height).toBeGreaterThan(3);
    const trigger = page.getByRole("button", { name: /Services/ });
    const panel = page.locator("[data-services-panel]");

    await trigger.click();
    await expect(trigger).toHaveAttribute("aria-expanded", "true");
    await expect(panel).toBeVisible();
    expect(await panel.evaluate((element) => getComputedStyle(element).backgroundColor)).toBe("rgba(7, 27, 85, 0.76)");
    await expect(panel.getByRole("link", { name: /Marketing/ })).toBeVisible();
    await expect(panel.getByRole("link", { name: /Technology/ })).toBeVisible();
    await expect(panel.locator('a[href^="/services/"]')).toHaveCount(2);
    await expect(page.getByRole("navigation", { name: "Primary navigation" }).getByRole("link", { name: "Contact" })).toHaveAttribute("href", "/contact");
    const serviceDescription = panel.locator(".services-menu__choice strong").first();
    await expect(serviceDescription).toHaveCSS("font-weight", "500");
    await serviceDescription.hover();
    await expect(serviceDescription).toHaveCSS("transform", /matrix/);

    await trigger.focus();
    await page.keyboard.press("Enter");
    await expect(trigger).toHaveAttribute("aria-expanded", "false");
    await page.keyboard.press("Enter");
    await page.keyboard.press("Tab");
    await expect(panel.getByRole("link", { name: /Marketing/ })).toBeFocused();
    await page.keyboard.press("Escape");
    await expect(panel).toBeHidden();
    await expect(trigger).toBeFocused();

    await trigger.click();
    await page.locator("[data-hero-title]").click();
    await expect(panel).toBeHidden();
  });

  test("mobile navigation exposes the two service hubs and chatbot closes with Escape", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");
    await page.getByRole("button", { name: "Open navigation" }).click();
    await expect(page.getByRole("navigation", { name: "Mobile primary navigation" })).toBeVisible();
    await page.getByRole("button", { name: /Services/ }).click();
    const servicePanel = page.locator("[data-mobile-services-panel]");
    await expect(servicePanel).toBeVisible();
    await expect(servicePanel.locator('a[href^="/services/"]')).toHaveCount(2);
    await expect(servicePanel.getByRole("link", { name: "Marketing" })).toBeVisible();
    await expect(servicePanel.getByRole("link", { name: "Technology" })).toBeVisible();
    await expect(page.getByRole("navigation", { name: "Mobile primary navigation" }).getByRole("link", { name: "Contact" })).toHaveAttribute("href", "/contact");
    await page.keyboard.press("Escape");
    await expect(page.getByRole("navigation", { name: "Mobile primary navigation" })).toBeHidden();

    await page.getByRole("button", { name: "Open HN Bot assistant" }).click();
    await expect(page.getByRole("textbox", { name: "Write a message to HerNex Bot" })).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(page.getByRole("textbox", { name: "Write a message to HerNex Bot" })).toBeHidden();
  });

  test("HerNex Bot offers a vertically scrollable mix of marketing and technology prompts", async ({ page }) => {
    await page.setViewportSize({ width: 738, height: 968 });
    await page.goto("/");
    await page.getByRole("button", { name: "Open HN Bot assistant" }).click();
    const chatBody = page.locator("[data-chat-body]");
    const quickActions = page.locator("[data-chat-starters]");
    await expect(chatBody).toHaveCSS("overflow-y", "scroll");
    await expect.poll(() => chatBody.evaluate((element) => element.scrollHeight > element.clientHeight)).toBe(true);
    await expect(quickActions.getByRole("button")).toHaveCount(8);
    await chatBody.evaluate((element) => { element.scrollTop = element.scrollHeight; });
    await expect(quickActions.getByRole("button", { name: "Web development" })).toBeInViewport();
    await quickActions.getByRole("button", { name: "Search visibility" }).click();
    await expect(quickActions).toBeHidden();
  });

  test("Blog hero uses a connected channel orbit with a static reduced-motion fallback", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/insights");
    const orbit = page.locator("[data-channel-orbit][data-orbit-variant='hero']");
    await expect(orbit).toBeVisible();
    await expect(orbit.locator("[data-orbit-token]")).toHaveCount(13);
    await expect(orbit.getByText("Platforms and capabilities within our working ecosystem.")).toHaveCount(0);
    await expect(page.getByText("Practical thinking on visibility, systems, and the choices that connect good marketing work.")).toHaveCount(0);
    await expect.poll(() => orbit.locator("[data-orbit-ring='outer']").evaluate((element) => getComputedStyle(element).transform !== "none"), { timeout: 2_000 }).toBe(true);

    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.reload();
    await expect(orbit).toBeVisible();
    await expect(orbit.locator("[data-orbit-token]")).toHaveCount(13);
    await expect(orbit.locator("[data-orbit-signal]")).toBeHidden();
  });

  test("contact form gives a useful client-side validation state", async ({ page }) => {
    await page.goto("/contact");
    await expect(page.locator('select[name="service"] option')).toHaveCount(services.length + 1);
    await page.getByRole("button", { name: "Send your enquiry" }).click();
    await expect(page.getByText("Add your name, email, phone number, message, and budget details so we know where to begin.")).toBeVisible();
  });

  test("About page presents the founder, philosophy, and complete footer directory", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/about");
    await expect(page.getByRole("heading", { name: "A woman led agency built to make marketing feel clearer, more human and more connected." })).toBeVisible();
    await expect(page.getByRole("link", { name: "Visit Priyanka Jha on LinkedIn" })).toHaveAttribute("href", /priyankajha84/);
    await expect(page.getByText("Founder statement, approval required")).toBeVisible();
    await expect(page.locator(".about-philosophy__principles > li")).toHaveCount(3);
    await expect(page.locator(".about-close")).toHaveCount(0);
    const footer = page.getByRole("navigation", { name: "Footer navigation" });
    await expect(footer.getByRole("link", { name: "Marketing" })).toHaveAttribute("href", "/services/marketing");
    await expect(footer.getByRole("link", { name: "Technology" })).toHaveAttribute("href", "/services/technology");
  });

  test("conversation links open the contact form without an introductory scroll", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/");
    await page.getByRole("link", { name: "Start the conversation" }).click();
    await expect(page).toHaveURL(/\/contact$/);
    const form = page.locator("[data-contact-form]");
    await expect(form).toBeVisible();
    expect((await form.boundingBox())?.y).toBeLessThan(900);
    await expect(page.locator(".page-intro")).toHaveCount(0);
  });

  test("footer ecosystem keeps one service card actionable and opens HN Bot with a relevant handoff", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.addInitScript(() => window.sessionStorage.setItem("hernex-intro-seen", "true"));
    await page.goto("/");

    const ecosystem = page.locator("[data-channel-orbit][data-orbit-variant='footer']");
    const brandCard = ecosystem.locator("[data-orbit-card='brand']");
    await ecosystem.scrollIntoViewIfNeeded();
    await expect(ecosystem.locator("[data-orbit-token]")).toHaveCount(13);
    await expect(ecosystem.locator("[data-orbit-card]")).toHaveCount(7);
    await expect(brandCard).toBeVisible();
    await brandCard.click();

    const panel = page.locator("[data-chat-panel]");
    await expect(panel).toBeVisible();
    await expect(panel.getByText("Your audience sees posts, ads, and a website, but not one clear brand they can remember.")).toBeVisible();
    await expect(panel.getByRole("link", { name: /Discuss Branding & Identity/ })).toHaveAttribute("href", /wa\.me/);
  });

  test("footer ecosystem has a stable reduced-motion fallback", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/");
    const ecosystem = page.locator("[data-channel-orbit][data-orbit-variant='footer']");
    await ecosystem.scrollIntoViewIfNeeded();
    await expect(ecosystem.locator("[data-orbit-card='brand']")).toBeVisible();
    await expect(ecosystem.locator("[data-orbit-card='crm']")).toBeHidden();
    await expect(ecosystem.locator("[data-orbit-signal]")).toBeHidden();
  });

  test("Capabilities introduces the same connected ecosystem alongside the page message", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/capabilities");
    const orbit = page.locator("[data-channel-orbit][data-orbit-variant='capabilities']");
    await expect(page.getByRole("heading", { name: "A capability view, not a performance claim." })).toBeVisible();
    await expect(page.getByText("03 / Capabilities")).toHaveCount(0);
    await expect(page.locator(".page-intro__copy")).toBeVisible();
    await expect(orbit).toBeVisible();
    await expect(orbit.locator("[data-orbit-token]")).toHaveCount(13);
  });

  test("header navigation uses immediate document navigation and the homepage excludes Blog content", async ({ page }) => {
    await page.goto("/");
    const contactLink = page.getByRole("navigation", { name: "Primary navigation" }).getByRole("link", { name: "Contact" });
    await expect(contactLink).toHaveAttribute("data-astro-reload", "");
    await Promise.all([page.waitForURL(/\/contact$/), contactLink.click()]);
    await expect(page.locator("[data-contact-form]")).toBeVisible();
    await page.goto("/");
    await expect(page.locator(".latest-insights")).toHaveCount(0);
  });

  test("HN Bot stays in a blinking ready state on a secondary route", async ({ page }) => {
    await page.addInitScript(() => window.sessionStorage.setItem("hernex-bot-greeted", "true"));
    await page.goto("/about");
    const bot = page.locator("[data-chatbot]");
    await expect(bot).toHaveAttribute("data-bot-state", "idle");
    await expect(bot.getByRole("button", { name: "Open HN Bot assistant" })).toBeVisible();
    await expect.poll(async () => bot.locator(".hn-bot__face i").first().evaluate((eye) => {
      const transform = getComputedStyle(eye).transform;
      const scaleY = transform === "none" ? 1 : Number(transform.match(/matrix\([^,]+,[^,]+,[^,]+,\s*([^,]+)/)?.[1] || 1);
      return scaleY < 0.5;
    }), { timeout: 2_800, intervals: [16, 32, 50] }).toBe(true);
  });

  test("hero and technology service route retain the full data model", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.addInitScript(() => window.sessionStorage.setItem("hernex-intro-seen", "true"));
    await page.goto("/");
    await expect(page.getByRole("heading", { name: "Human strategy. Creative direction. AI enabled execution." })).toBeVisible();
    await expect(page.locator("[data-strategy-letter]")).toHaveCount(8);
    await expect(page.locator("[data-strategy-sweep]")).toHaveCount(1);
    await expect(page.locator("[data-kinetic-media]")).toHaveCount(1);
    await expect(page.locator("[data-kinetic-media-item]")).toHaveCount(5);
    await expect(page.locator("[data-kinetic-media] canvas")).toHaveCount(0);
    await expect(page.getByRole("heading", { name: "Strategy turns activity into demand." })).toBeVisible();
    await expect(page.getByRole("link", { name: "Book a Free Strategy Call" }).first()).toBeVisible();
    await expect(page.getByRole("link", { name: "View Our Work" })).toBeVisible();

    const technologyService = services.find((service) => service.slug === "tech-services");
    if (!technologyService) throw new Error("Growth Technology Services is missing from the source model.");
    await page.goto(`/services/${technologyService.slug}`);
    await expect(page.getByRole("heading", { name: technologyService.title })).toBeVisible();
    await expect(page.locator(".service-detail__grid ol > li")).toHaveCount(technologyService.includes.length);
  });

  test("Strategy keeps a compact repeating hero cadence after the entrance", async ({ page }) => {
    await page.addInitScript(() => window.sessionStorage.setItem("hernex-intro-seen", "true"));
    await page.goto("/");
    const letter = page.locator("[data-strategy-letter]").first();
    await expect(letter).toBeVisible();
    await expect.poll(async () => letter.evaluate((element) => getComputedStyle(element).transform !== "none"), {
      timeout: 3_000,
      intervals: [16, 32, 50],
    }).toBe(true);
  });

  test("reduced motion leaves service content available", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto("/services");
    await expect(page.getByRole("link", { name: "Marketing", exact: true })).toBeVisible();
    await expect(page.getByRole("link", { name: "Technology", exact: true })).toBeVisible();
    await expect(page.locator("html")).toHaveAttribute("data-reduced-motion", "true");
  });

  test("reduced motion presents the completed hero with a static campaign concept", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/");
    await expect(page.getByRole("heading", { name: "Human strategy. Creative direction. AI enabled execution." })).toBeVisible();
    await expect(page.locator("[data-strategy-letter]").first()).toBeVisible();
    await expect(page.locator("[data-kinetic-media]")).toBeHidden();
    await expect(page.locator("[data-hero-media-static]")).toBeVisible();
  });

  test("first visit introduces the signal once, then releases the hero", async ({ page }) => {
    const pageErrors: string[] = [];
    page.on("pageerror", (error) => pageErrors.push(error.message));
    await page.addInitScript(() => {
      if (window.sessionStorage.getItem("hernex-test-intro-initialised") === "true") return;
      window.sessionStorage.clear();
      window.sessionStorage.setItem("hernex-test-intro-initialised", "true");
    });
    await page.goto("/");

    const intro = page.locator("[data-cinematic-intro]");
    await expect(intro).toBeVisible();
    await expect(intro.getByText("Welcome", { exact: true })).toHaveCount(0);
    await expect(intro.locator(".cinematic-intro__logo")).toHaveAttribute("src", "/hernex-logo-official.svg");
    await expect(page.locator("[data-intro-signal]")).toBeVisible();
    await expect.poll(() => page.locator(".cinematic-intro__word").textContent(), { timeout: 8_000 }).toContain("നമസ്കാരം");
    await page.waitForTimeout(900);
    await expect(page.locator(".cinematic-intro__word")).toContainText("നമസ്കാരം");
    await expect.poll(() => page.locator("html").getAttribute("data-intro-state"), { timeout: 4_000 }).toBe("complete");
    await expect(intro).toBeHidden();
    await expect(page.getByRole("heading", { name: "Human strategy. Creative direction. AI enabled execution." })).toBeVisible();

    await page.reload();
    await expect(intro).toBeHidden();
    await page.goto("/about");
    await page.goBack();
    await expect(intro).toBeHidden();
    expect(pageErrors).toEqual([]);
  });

  test("first-visit greeting can be skipped without delaying the homepage", async ({ page }) => {
    await page.addInitScript(() => window.sessionStorage.clear());
    await page.goto("/");
    await page.getByRole("button", { name: "Skip intro" }).click();
    await expect(page.locator("[data-cinematic-intro]")).toBeHidden();
    await expect(page.getByRole("heading", { name: "Human strategy. Creative direction. AI enabled execution." })).toBeVisible();
  });

  test("unavailable WebGL cannot trap the greeting overlay", async ({ page }) => {
    await page.addInitScript(() => {
      window.sessionStorage.clear();
      HTMLCanvasElement.prototype.getContext = () => null;
    });
    await page.goto("/");
    await expect.poll(() => page.locator("html").getAttribute("data-intro-state"), { timeout: 13_000 }).toBe("complete");
    await expect(page.locator("[data-cinematic-intro]")).toBeHidden();
    await expect(page.getByRole("heading", { name: "Human strategy. Creative direction. AI enabled execution." })).toBeVisible();
  });

  test("campaign stream remains a DOM-only enhancement", async ({ page }) => {
    await page.addInitScript(() => {
      window.sessionStorage.setItem("hernex-intro-seen", "true");
    });
    await page.goto("/");
    await expect(page.getByRole("heading", { name: "Human strategy. Creative direction. AI enabled execution." })).toBeVisible();
    await expect(page.locator("[data-kinetic-media-item]")).toHaveCount(5);
    await expect(page.locator("[data-kinetic-media] canvas")).toHaveCount(0);
  });

  test("service hubs expose all capabilities and offer context-aware HN Bot and WhatsApp actions", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/services/marketing");
    await expect(page.locator("[data-service-preview-trigger]")).toHaveCount(8);
    await expect(page.locator("[data-service-preview-panel]")).toHaveCount(8);
    await page.getByRole("button", { name: "Ask HerNex Bot" }).first().click();
    const bubble = page.locator("[data-service-bot-bubble]");
    await expect(bubble).toBeVisible();
    await expect(bubble.getByRole("link", { name: /Discuss/ })).toHaveAttribute("href", /wa\.me.*Branding/);

    await page.goto("/services/technology");
    await expect(page.locator("[data-service-preview-trigger]")).toHaveCount(22);
    await expect(page.locator("[data-service-preview-panel]")).toHaveCount(22);
    await expect(page.locator("canvas")).toHaveCount(0);
    await page.goto("/services/tech-services");
    await expect(page.getByRole("heading", { name: "Growth Technology Services" })).toBeVisible();
  });

  test("service preview cycles safely, respects reduced motion, and keeps history usable", async ({ page }) => {
    await page.goto("/");
    await page.goto("/services/marketing");
    const active = page.locator("[data-service-preview-trigger][aria-current='true']");
    await expect(active).toHaveAttribute("data-service-slug", "branding-and-identity");
    await page.waitForTimeout(4_500);
    await expect(active).not.toHaveAttribute("data-service-slug", "branding-and-identity");
    await page.goBack();
    await expect(page).toHaveURL(/\/$/);
    await page.goForward();
    await expect(page).toHaveURL(/\/services\/marketing$/);

    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.reload();
    await page.waitForTimeout(4_500);
    await expect(page.locator("[data-service-preview-trigger][aria-current='true']")).toHaveAttribute("data-service-slug", "branding-and-identity");
  });

  test("campaign cards rotate from their presentation slot every 4.2 seconds", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.addInitScript(() => window.sessionStorage.setItem("hernex-intro-seen", "true"));
    await page.goto("/");

    const activeCard = async () => page.locator("[data-kinetic-media-item]").evaluateAll((cards) => cards
      .map((card) => ({
        id: card.getAttribute("data-kinetic-media-item"),
        opacity: Number.parseFloat(getComputedStyle(card).opacity),
        rect: (() => {
          const rect = card.getBoundingClientRect();
          return { centerX: rect.x + rect.width / 2, centerY: rect.y + rect.height / 2 };
        })(),
      }))
      .find((card) => card.opacity > 0.9));

    await page.waitForTimeout(2_100);
    const first = await activeCard();
    expect(first?.id).toBe("brand");

    await page.waitForTimeout(2_300);
    expect((await activeCard())?.id).toBe("brand");

    await page.waitForTimeout(2_000);
    const second = await activeCard();
    expect(second?.id).toBe("social");
    expect(Math.abs((first?.rect.centerX ?? 0) - (second?.rect.centerX ?? 0))).toBeLessThan(3);
    expect(Math.abs((first?.rect.centerY ?? 0) - (second?.rect.centerY ?? 0))).toBeLessThan(3);

    const visibleCards = await page.locator("[data-kinetic-media-item]").evaluateAll((cards) => cards
      .filter((card) => Number.parseFloat(getComputedStyle(card).opacity) > 0.05)
      .length);
    expect(visibleCards).toBeGreaterThan(0);

    // Sample the next handoff frame-by-frame. A card must remain visible while the stream crossfades.
    await page.waitForTimeout(3_100);
    const lowestVisibleCardOpacity = await page.evaluate(async () => {
      const cards = [...document.querySelectorAll<HTMLElement>("[data-kinetic-media-item]")];
      const visibleOpacities: number[] = [];
      const startedAt = performance.now();

      await new Promise<void>((resolve) => {
        const sample = () => {
          visibleOpacities.push(Math.max(...cards.map((card) => Number.parseFloat(getComputedStyle(card).opacity))));
          if (performance.now() - startedAt >= 900) {
            resolve();
            return;
          }
          requestAnimationFrame(sample);
        };
        requestAnimationFrame(sample);
      });

      return Math.min(...visibleOpacities);
    });
    expect(lowestVisibleCardOpacity).toBeGreaterThan(0.05);
  });

  test("strategy travels through all four homepage sections and returns on reverse scroll", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.addInitScript(() => window.sessionStorage.setItem("hernex-intro-seen", "true"));
    await page.goto("/");

    const source = page.locator("[data-strategy-source]");
    const targets = ["problem", "system", "services", "capability"].map((id) => page.locator(`[data-strategy-target="${id}"]`));
    await expect.poll(() => page.locator("[data-strategy-traveller]").count()).toBe(1);
    await expect.poll(async () => Number.parseFloat(await source.evaluate((element) => getComputedStyle(element).opacity))).toBeGreaterThan(0.98);
    await expect.poll(async () => Number.parseFloat(await targets[0].evaluate((element) => getComputedStyle(element).opacity))).toBeGreaterThan(0.98);

    for (const id of ["problem", "system", "services", "capability"]) {
      await page.evaluate((sectionId) => {
        const section = document.querySelector(`[data-strategy-section="${sectionId}"]`);
        window.scrollTo({ top: section!.getBoundingClientRect().top + window.scrollY + 240, behavior: "auto" });
      }, id);
      const target = page.locator(`[data-strategy-target="${id}"]`);
      await expect.poll(async () => Number.parseFloat(await target.evaluate((element) => getComputedStyle(element).opacity))).toBeGreaterThan(0.98);
    }
    await expect.poll(async () => Number.parseFloat(await source.evaluate((element) => getComputedStyle(element).opacity))).toBeLessThan(0.02);

    await page.evaluate(() => window.scrollTo({ top: 0, behavior: "auto" }));
    await expect.poll(async () => Number.parseFloat(await source.evaluate((element) => getComputedStyle(element).opacity))).toBeGreaterThan(0.98);
  });

  test("verified testimonials stay visible and the public Blog clearly labels development fixtures", async ({ page }) => {
    await page.goto("/");
    await expect(page.locator("[data-testimonial-proof] [data-testimonial-row]")).toHaveCount(3);
    await page.locator("[data-testimonial-proof]").scrollIntoViewIfNeeded();
    await expect(page.locator("[data-testimonial-heading]").getByRole("heading", { name: "Testimonials" })).toBeVisible();
    await expect(page.locator("[data-testimonial-proof]").getByText("Namdev Koyale")).toBeVisible();
    await expect(page.locator("[data-testimonial-proof]").getByText("Sandip Patil")).toBeVisible();
    await expect(page.locator("[data-testimonial-proof]").getByText("Harish Dani")).toBeVisible();
    await page.locator("[data-testimonial-proof] details").first().evaluate((details) => (details as HTMLDetailsElement).open = true);
    await expect(page.getByText(/Extremely happy with the social media management services/).last()).toBeVisible();

    await page.goto("/capabilities");
    await expect(page.getByRole("heading", { name: "What clients remember after the work goes live." })).toBeVisible();
    await expect(page.locator(".testimonial-column")).toHaveCount(3);
    await expect(page.getByText("Client work, results, and testimonials appear only when they are approved for publication.")).toHaveCount(0);

    await page.goto("/insights");
    await expect(page.getByRole("heading", { name: "Ideas for making the next move clearer." })).toBeVisible();
    await expect(page.getByText("Development preview").first()).toBeVisible();
    await page.getByRole("searchbox", { name: "Search Blog posts" }).fill("automation");
    await expect(page.getByRole("link", { name: /Where automation helps/ })).toBeVisible();
    await expect(page.getByRole("link", { name: /How Search Visibility/ })).toBeHidden();
  });

  test("Blog routes expose public SEO endpoints without indexing development fixtures", async ({ page, request }) => {
    await page.goto("/insights/how-search-visibility-shapes-marketing");
    await expect(page.getByRole("heading", { name: "How Search Visibility Shapes Marketing Strategy" })).toBeVisible();
    await expect(page.getByRole("navigation", { name: "Breadcrumb" })).toBeVisible();
    await expect(page.locator('script[type="application/ld+json"]')).toHaveCount(1);

    await page.goto("/insights/preview-brief-to-next-action");
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute("content", "noindex, nofollow");
    await expect(page.getByText("Development preview").first()).toBeVisible();

    const sitemap = await request.get("/sitemap.xml");
    const sitemapText = await sitemap.text();
    expect(sitemap.status()).toBe(200);
    expect(sitemapText).toContain("how-search-visibility-shapes-marketing");
    expect(sitemapText).not.toContain("preview-brief-to-next-action");
    const rss = await request.get("/rss.xml");
    expect(rss.status()).toBe(200);
    expect(await rss.text()).not.toContain("preview-human-led-systems");
  });

  test("HN Bot keeps keyboard behavior while drag position persists and can be reset", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto("/");
    const launcher = page.getByRole("button", { name: "Open HN Bot assistant" });
    const root = page.locator("[data-chatbot]");
    const start = await launcher.boundingBox();
    if (!start) throw new Error("HN Bot launcher has no box.");

    await page.mouse.move(start.x + start.width / 2, start.y + start.height / 2);
    await page.mouse.down();
    await page.mouse.move(start.x + start.width / 2 + 80, start.y + start.height / 2 - 120, { steps: 4 });
    await page.mouse.up();
    await expect(page.getByRole("textbox", { name: "Write a message to HerNex Bot" })).toBeHidden();
    await expect.poll(() => root.evaluate((element) => localStorage.getItem("hernex-hn-bot-position"))).not.toBeNull();

    await launcher.click();
    await expect(page.getByRole("textbox", { name: "Write a message to HerNex Bot" })).toBeVisible();
    await page.getByRole("button", { name: "Reset bot position" }).click();
    await expect.poll(() => root.evaluate((element) => localStorage.getItem("hernex-hn-bot-position"))).toBeNull();
    await page.keyboard.press("Escape");

    await launcher.focus();
    await page.keyboard.press("Enter");
    await expect(page.getByRole("textbox", { name: "Write a message to HerNex Bot" })).toBeVisible();
    await page.keyboard.press("Escape");
  });

  test("HN Bot turns a raw WhatsApp URL into a clear action button", async ({ page }) => {
    await page.addInitScript(() => window.sessionStorage.setItem("hernex-intro-seen", "true"));
    await page.route("/api/chat", async (route) => {
      await route.fulfill({
        contentType: "application/json",
        body: JSON.stringify({
          reply: "You can continue this conversation on WhatsApp: https://wa.me/919581444069",
          sessionId: "test-chat-session",
          contact: { whatsapp: "https://wa.me/919581444069" },
          suggestedActions: ["Start WhatsApp Chat"],
        }),
      });
    });
    await page.goto("/");
    await page.getByRole("button", { name: "Open HN Bot assistant" }).click();
    await page.getByRole("textbox", { name: "Write a message to HerNex Bot" }).fill("I need campaign help");
    await page.getByRole("button", { name: "Send message" }).click();
    await expect(page.getByText("https://wa.me/919581444069")).toHaveCount(0);
    await expect(page.getByRole("link", { name: "Chat on WhatsApp ↗" })).toHaveAttribute("href", "https://wa.me/919581444069");
  });

  test("back-to-top remains visible above the launcher and reduced motion keeps dragging usable", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 844 });
    await page.goto("/");
    await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight));
    const backToTop = page.getByRole("button", { name: "Back to top" });
    await expect(backToTop).toBeVisible();
    await backToTop.click();
    await expect.poll(() => page.evaluate(() => window.scrollY)).toBeLessThan(10);

    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.reload();
    const launcher = page.getByRole("button", { name: "Open HN Bot assistant" });
    const box = await launcher.boundingBox();
    if (!box) throw new Error("HN Bot launcher has no box in reduced motion.");
    await page.mouse.move(box.x + 10, box.y + 10);
    await page.mouse.down();
    await page.mouse.move(box.x + 38, box.y - 40, { steps: 3 });
    await page.mouse.up();
    await expect(page.getByRole("textbox", { name: "Write a message to HerNex Bot" })).toBeHidden();
  });
});
