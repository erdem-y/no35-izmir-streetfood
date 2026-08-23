import { chromium } from "playwright";
import { mkdirSync } from "node:fs";
import path from "node:path";

/*
  Renders the built site in a real browser and captures each section, plus a
  mobile pass. Used to actually look at the page rather than only asserting on
  the DOM.

  Expects `npm run preview` to be serving on :4173.
*/
const BASE = process.env.QA_URL ?? "http://localhost:4173";
const OUT = path.resolve("scratch/screens");

mkdirSync(OUT, { recursive: true });

const SECTIONS = [
  ["01-hero", "#top"],
  ["02-spezialitaeten", "#spezialitaeten"],
  ["03-speisekarte", "#speisekarte"],
  ["04-bewerten", "#bewerten"],
  ["05-finden", "#finden"],
];

const browser = await chromium.launch();

/* Desktop pass */
const page = await browser.newPage({
  viewport: { width: 1440, height: 900 },
  deviceScaleFactor: 1,
});

const errors = [];
page.on("pageerror", (e) => errors.push(`pageerror: ${e.message}`));
page.on("console", (m) => {
  if (m.type() === "error") errors.push(`console: ${m.text()}`);
});

await page.goto(BASE, { waitUntil: "networkidle" });
await page.waitForTimeout(1200);

for (const [name, selector] of SECTIONS) {
  await page.locator(selector).scrollIntoViewIfNeeded();
  /* Let the scene crossfade (1.4s) and reveal animations settle. */
  await page.waitForTimeout(1900);
  await page.screenshot({ path: path.join(OUT, `${name}.png`) });
  console.log(`captured ${name}`);
}

/* Selector interaction: advance one product and capture the new centre. */
await page.locator("#spezialitaeten").scrollIntoViewIfNeeded();
await page.waitForTimeout(900);
await page.locator('button[aria-label="Nächste Spezialität"]').click();
await page.waitForTimeout(1100);
await page.screenshot({ path: path.join(OUT, "02b-selector-advanced.png") });
console.log("captured 02b-selector-advanced");

await page.close();

/* Mobile pass */
const mobile = await browser.newPage({
  viewport: { width: 390, height: 844 },
  deviceScaleFactor: 2,
  isMobile: true,
  hasTouch: true,
});
mobile.on("pageerror", (e) => errors.push(`mobile pageerror: ${e.message}`));

await mobile.goto(BASE, { waitUntil: "networkidle" });
await mobile.waitForTimeout(1200);

for (const [name, selector] of [SECTIONS[0], SECTIONS[1], SECTIONS[2]]) {
  await mobile.locator(selector).scrollIntoViewIfNeeded();
  await mobile.waitForTimeout(1700);
  await mobile.screenshot({ path: path.join(OUT, `m-${name}.png`) });
  console.log(`captured m-${name}`);
}

await mobile.close();
await browser.close();

if (errors.length) {
  console.log("\nBrowser errors:");
  for (const e of errors) console.log(`  ${e}`);
  process.exit(1);
}
console.log("\nNo browser errors.");
