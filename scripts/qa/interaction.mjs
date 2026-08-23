import { chromium } from "playwright";

/*
  Interaction and layout QA in a real browser.

  Covers the failures that only appear once the page is actually laid out:
  horizontal overflow, controls pushed outside the viewport, and the selector
  not advancing. Expects `npm run preview` on :4173.
*/
const BASE = process.env.QA_URL ?? "http://localhost:4173";

const browser = await chromium.launch();
const results = [];
const errors = [];

const check = (label, ok, detail = "") => results.push([label, ok, detail]);

for (const device of [
  { name: "desktop", viewport: { width: 1440, height: 900 } },
  { name: "tablet", viewport: { width: 834, height: 1112 }, isMobile: true, hasTouch: true },
  { name: "mobile", viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true },
]) {
  const page = await browser.newPage(device);
  page.on("pageerror", (e) => errors.push(`${device.name}: ${e.message}`));

  await page.goto(BASE, { waitUntil: "networkidle" });
  await page.waitForTimeout(900);

  /* No horizontal scroll anywhere on the page. */
  const overflow = await page.evaluate(() => ({
    scrollW: document.documentElement.scrollWidth,
    clientW: document.documentElement.clientWidth,
  }));
  check(
    `${device.name}: no horizontal page scroll`,
    overflow.scrollW <= overflow.clientW + 1,
    `scrollWidth ${overflow.scrollW} vs clientWidth ${overflow.clientW}`
  );

  /* Every interactive control sits inside the viewport. */
  const strays = await page.evaluate(() => {
    const w = document.documentElement.clientWidth;

    /*
      Controls inside a deliberately scrollable strip (the menu category
      filter) are reachable by scrolling that strip, so being off-viewport is
      expected there. Only flag controls with no scrollable ancestor.
    */
    const inScroller = (el) => {
      for (let n = el.parentElement; n && n !== document.body; n = n.parentElement) {
        const overflowX = getComputedStyle(n).overflowX;
        if (overflowX === "auto" || overflowX === "scroll") return true;
      }
      return false;
    };

    return [...document.querySelectorAll("a[href], button")]
      .filter((el) => el.offsetParent !== null && !inScroller(el))
      .map((el) => {
        const r = el.getBoundingClientRect();
        return { label: el.getAttribute("aria-label") || el.textContent.trim().slice(0, 28), left: r.left, right: r.right };
      })
      .filter((b) => b.right > w + 1 || b.left < -1);
  });
  check(`${device.name}: all controls within viewport`, strays.length === 0, JSON.stringify(strays));

  /* Menu button on small screens must actually be clickable. */
  if (device.viewport.width < 1024) {
    const burger = page.locator('button[aria-label="Menü öffnen"]');
    await burger.click({ timeout: 5000 }).catch((e) => errors.push(`${device.name}: burger click ${e.message}`));
    await page.waitForTimeout(500);
    const links = await page.locator("#mobile-menu a").count();
    check(`${device.name}: mobile menu opens`, links >= 4, `${links} links`);
    await page.keyboard.press("Escape").catch(() => {});
  }

  /* Selector advances and swaps the centre product. */
  await page.locator("#spezialitaeten").scrollIntoViewIfNeeded();
  await page.waitForTimeout(700);

  const centreName = () =>
    page.evaluate(() => {
      const cards = [...document.querySelectorAll('[aria-roledescription="Produktauswahl"] article')];
      const visible = cards.find((c) => c.getAttribute("aria-hidden") !== "true");
      return visible?.querySelector("h3")?.textContent?.trim() ?? null;
    });

  const before = await centreName();
  await page.locator('button[aria-label="Nächste Spezialität"]').click();
  await page.waitForTimeout(900);
  const after = await centreName();

  check(`${device.name}: selector starts on Kumru`, before === "Kumru", String(before));
  check(`${device.name}: selector advances`, before !== after && !!after, `${before} -> ${after}`);

  /* Menu category switching keeps working. */
  await page.locator("#speisekarte").scrollIntoViewIfNeeded();
  await page.waitForTimeout(500);
  await page.locator('button[role="tab"]', { hasText: "Dessert" }).click();
  await page.waitForTimeout(500);
  const hasSambali = await page.locator("#speisekarte").getByText("Sambali").count();
  check(`${device.name}: menu category switches`, hasSambali > 0);

  await page.close();
}

await browser.close();

console.log("Interaction and layout QA");
console.log("=========================");
let failed = 0;
for (const [label, ok, detail] of results) {
  if (!ok) failed++;
  console.log(`${ok ? "PASS" : "FAIL"}  ${label}${ok || !detail ? "" : `  [${detail}]`}`);
}

if (errors.length) {
  console.log("\nErrors:");
  for (const e of errors) console.log(`  ${e}`);
  failed += errors.length;
}

console.log(`\n${failed === 0 ? "ALL CHECKS PASSED" : `${failed} CHECK(S) FAILED`}`);
process.exit(failed === 0 ? 0 : 1);
