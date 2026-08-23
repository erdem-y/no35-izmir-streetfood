import { chromium } from "playwright";
import sharp from "sharp";
import { featuredProducts } from "../../src/data/products.js";

/*
  Proves that every featured dish actually moves on screen.

  An animation that exists in the stylesheet but is visually imperceptible is
  not an animation. So this does not inspect CSS: it selects each product,
  captures two frames of the card roughly two seconds apart, and measures how
  many pixels changed between them.

  Fails if any dish is static. Expects `npm run preview` on :4173.
*/
const BASE = process.env.QA_URL ?? "http://localhost:4173";

/* Percentage of sampled pixels that must differ perceptibly between frames. */
const MIN_CHANGED_PCT = 0.4;
/* Per-channel difference that counts as a visible change. */
const CHANNEL_THRESHOLD = 6;

async function changedPercent(bufA, bufB) {
  /* Downsample both frames identically: we care about visible motion, not
     compression noise. */
  const opts = { width: 220, fit: "inside" };
  const a = await sharp(bufA).resize(opts).greyscale().raw().toBuffer();
  const b = await sharp(bufB).resize(opts).greyscale().raw().toBuffer();

  const len = Math.min(a.length, b.length);
  let changed = 0;
  for (let i = 0; i < len; i++) {
    if (Math.abs(a[i] - b[i]) > CHANNEL_THRESHOLD) changed++;
  }
  return (changed / len) * 100;
}

const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });

await page.goto(BASE, { waitUntil: "networkidle" });
await page.locator("#spezialitaeten").scrollIntoViewIfNeeded();
await page.waitForTimeout(1500);

const results = [];

for (const product of featuredProducts) {
  await page
    .locator("button", { hasText: new RegExp(`^${product.name}$`) })
    .first()
    .click();
  /* Let the card settle so the spring transition is not what we measure. */
  await page.waitForTimeout(1800);

  const card = page
    .locator('[aria-roledescription="Produktauswahl"] article')
    .filter({ hasText: product.name })
    .first();

  const media = card.locator("div").first();

  const frameA = await media.screenshot();
  await page.waitForTimeout(2100);
  const frameB = await media.screenshot();

  const pct = await changedPercent(frameA, frameB);
  results.push([product.name, pct, product.fx]);
}

await browser.close();

console.log("Food animation check");
console.log("====================");
console.log(`Frames 2.1s apart, ${MIN_CHANGED_PCT}% of pixels must change visibly.\n`);

let failed = 0;
for (const [name, pct, fx] of results) {
  const ok = pct >= MIN_CHANGED_PCT;
  if (!ok) failed++;
  console.log(
    `${ok ? "PASS" : "FAIL"}  ${pct.toFixed(2).padStart(6)}% of pixels moved  ${name.padEnd(15)} (${fx})`
  );
}

console.log(
  `\n${failed === 0 ? "All six dishes visibly animate." : `${failed} dish(es) are STATIC`}`
);
process.exit(failed === 0 ? 0 : 1);
