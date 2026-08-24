import { JSDOM, VirtualConsole } from "jsdom";
import { readFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { featuredProducts } from "../../src/data/products.js";

/*
  Render smoke test for the production build.

  Loads dist/ in jsdom, executes the real bundle, and asserts the app actually
  mounted and rendered the sections. A successful `vite build` only proves the
  modules resolve; this proves the page does not throw at runtime.

  jsdom lacks a few browser APIs the page uses, so they are stubbed to their
  inert behaviour (no intersections observed, no media queries matched).
*/
const DIST = path.resolve("dist");

const errors = [];
const virtualConsole = new VirtualConsole();
virtualConsole.on("jsdomError", (e) => errors.push(e.message));
virtualConsole.on("error", (msg) => errors.push(String(msg)));

const html = readFileSync(path.join(DIST, "index.html"), "utf8");

const dom = new JSDOM(html, {
  runScripts: "outside-only",
  pretendToBeVisual: true,
  url: "http://localhost/",
  virtualConsole,
});

const { window } = dom;

window.IntersectionObserver = class {
  observe() {}
  unobserve() {}
  disconnect() {}
};
window.matchMedia =
  window.matchMedia ||
  ((query) => ({
    matches: false,
    media: query,
    addEventListener() {},
    removeEventListener() {},
    addListener() {},
    removeListener() {},
    onchange: null,
    dispatchEvent: () => false,
  }));
window.scrollTo = () => {};
/*
  jsdom defines play() as a method that throws "Not implemented", so it must be
  overridden unconditionally rather than only when missing. The page calls it
  on the active product card.
*/
window.HTMLMediaElement.prototype.play = () => Promise.resolve();
window.HTMLMediaElement.prototype.pause = () => {};

const jsFile = readdirSync(path.join(DIST, "assets")).find(
  (f) => f.startsWith("index-") && f.endsWith(".js")
);
if (!jsFile) {
  console.error("FAIL: no built JS bundle found in dist/assets");
  process.exit(1);
}

const bundle = readFileSync(path.join(DIST, "assets", jsFile), "utf8");

try {
  window.eval(bundle);
} catch (error) {
  errors.push(`Bundle threw: ${error.message}`);
}

await new Promise((resolve) => setTimeout(resolve, 400));

const doc = window.document;
const root = doc.getElementById("root");
const text = doc.body.textContent ?? "";

const checks = [
  ["App mounted into #root", root && root.children.length > 0],
  ["Hero headline rendered", text.includes("Original Izmir Streetfood")],
  ["Signature dishes rendered", text.includes("Midye Dolma") && text.includes("Kokorec")],
  ["Full menu rendered", text.includes("Kumru Sandwich")],
  ["Google review CTA rendered", text.includes("Bei Google bewerten")],
  ["Address rendered", text.includes("Hardorffsweg 15")],
  ["Address verification notice shown", text.includes("Adresse vor Veröffentlichung")],
  ["Opening hours gap stated honestly", text.includes("Öffnungszeiten pflegen wir gerade ein")],
  [
    /* Kumru now renders as <video poster>, so assert the approved asset is
       still the one backing that card rather than looking for an <img>. */
    "Approved Kumru asset still in use",
    doc.documentElement.innerHTML.includes("hero-kumru-approved.webp"),
  ],
  /*
    Only the centre card renders a <video>, so clip wiring is asserted against
    the data module rather than the static DOM.
  */
  [
    "Kokorec image and clip unchanged",
    (() => {
      const k = featuredProducts.find((p) => p.id === "kokorec");
      return k?.image === "/media/food-kokorec.webp" && k?.video === "/media/kokorec-ambient.mp4";
    })(),
  ],
  [
    "All six dishes carry an ambient clip",
    featuredProducts.length === 6 && featuredProducts.every((p) => Boolean(p.video)),
  ],
  [
    "Scene 2 is the panda street, scene 3 the Izmir road",
    (() => {
      const s = [...doc.querySelectorAll("main [data-scene]")].map((n) => n.dataset.scene);
      return s[1] === "spezialitaeten" && s[2] === "speisekarte";
    })(),
  ],
  [
    "No superseded Kumru asset referenced",
    !doc.documentElement.innerHTML.includes("superseded"),
  ],
  ["Logo present", !!doc.querySelector('img[src="/brand/logo-no35.png"]')],
  ["Nav landmark present", !!doc.querySelector("nav")],
  ["No invented rating shown", !/\b4[.,]\d\s*(Sterne|stars)\b/i.test(text)],
  ["Zero em-dashes in rendered text", !text.includes("—") && !text.includes("–")],

  /* V2 systems */
  ["Background scene layers mounted", doc.querySelectorAll("[data-scene]").length >= 4],
  ["Every section declares a scene", doc.querySelectorAll("main [data-scene]").length === 5],
  ["Glass surface system in use", doc.querySelectorAll(".glass, .glass-soft").length >= 4],
  [
    "Product selector rendered",
    !!doc.querySelector('[aria-roledescription="Produktauswahl"]'),
  ],
  [
    "Selector holds all six featured products",
    doc.querySelectorAll('[aria-roledescription="Produktauswahl"] article').length >= 6,
  ],
  [
    "Selector navigation present",
    !!doc.querySelector('button[aria-label="Nächste Spezialität"]') &&
      !!doc.querySelector('button[aria-label="Vorherige Spezialität"]'),
  ],
  ["Videos never eager-loaded", [...doc.querySelectorAll("video")].every((v) => v.preload === "none")],

  /* V3 */
  ["Standalone Kokorec section removed", !doc.querySelector("#kokorec")],
  ["Kokorec present inside the showcase", text.includes("Kokorec")],
  
  ["Order CTA present", text.includes("Jetzt bestellen")],
  ["Tantuni featured", text.includes("Tantuni")],
  ["Cigköfte removed from showcase", !doc.querySelector('[aria-roledescription="Produktauswahl"]')?.textContent?.includes("Cigköfte")],
  ["Recreated restaurant photo is the hero scene", doc.documentElement.innerHTML.includes("hero-restaurant")],
  ["Professional food set in use", ["food-kokorec","food-midye-dolma","food-koefte-ekmek","food-ayvalik-toast","food-tantuni"].every((p) => doc.documentElement.innerHTML.includes(p))],
  ["No original uploaded photo shipped", !["photo-restaurant","photo-koefte-ekmek","photo-ayvalik-toast","photo-tantuni"].some((p) => doc.documentElement.innerHTML.includes(p))],
  ["Panda street scene present", doc.documentElement.innerHTML.includes("scene-panda-street")],
  ["No burger image in the hero", !doc.querySelector("#top img[src*='hero-kumru']")],
  ["Izmir road scene present", doc.documentElement.innerHTML.includes("scene-izmir-road")],
  ["No social-media UI text rendered", !text.includes("Add comment")],
];

let failed = 0;
console.log("Render smoke test");
console.log("=================");
for (const [label, ok] of checks) {
  console.log(`${ok ? "PASS" : "FAIL"}  ${label}`);
  if (!ok) failed++;
}

const realErrors = errors.filter(
  (e) => !/Could not parse CSS|Error: Not implemented/i.test(e)
);

if (realErrors.length) {
  console.log("\nRuntime errors:");
  for (const e of realErrors) console.log(`  ${e}`);
  failed += realErrors.length;
} else {
  console.log("\nNo runtime errors.");
}

console.log(`\n${failed === 0 ? "ALL CHECKS PASSED" : `${failed} CHECK(S) FAILED`}`);
process.exit(failed === 0 ? 0 : 1);
