/*
  Contrast audit for the V5 light-on-photography palette.

  V4 removed the heavy warm veils, so the glass panels are now doing nearly
  all the legibility work on their own. The worst case modelled here is
  therefore the harshest one available: the darkest plausible scene pixel with
  effectively NO scrim lifting it, seen through each surface.

  The hero is modelled separately because it is the one place with light type:
  a mid-tone warm interior pixel under the cinematic gradient from scenes.js.
*/

const hex = (h) => h.replace("#", "").match(/../g).map((x) => parseInt(x, 16));

const lum = (rgb) => {
  const [r, g, b] = rgb
    .map((v) => v / 255)
    .map((v) => (v <= 0.03928 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4)));
  return 0.2126 * r + 0.7152 * g + 0.0722 * b;
};

const ratio = (fg, bg) => {
  const a = lum(typeof fg === "string" ? hex(fg) : fg);
  const b = lum(typeof bg === "string" ? hex(bg) : bg);
  return (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
};

/* Composite `rgba` over `under`. */
const over = (under, rgba) => {
  const [r, g, b, a] = rgba;
  const u = typeof under === "string" ? hex(under) : under;
  return [r * a + u[0] * (1 - a), g * a + u[1] * (1 - a), b * a + u[2] * (1 - a)];
};

/* Darkest plausible scene pixel: a shaded doorway, deep foliage, wet stone. */
/* Brightest plausible scene pixel: a blown window, a sunlit wall, lamplight.
   With light type on dark panels, THIS is now the risky case. */
const BRIGHT_SCENE = "#e6dccb";

const PANEL = [13, 19, 24, 0.62];
const PANEL_STRONG = [11, 16, 20, 0.76];
const PANEL_SOFT = [13, 19, 24, 0.62];
const NAV = [11, 16, 20, 0.82];

const onPanel = over(BRIGHT_SCENE, PANEL);
const onPanelStrong = over(BRIGHT_SCENE, PANEL_STRONG);
const onPanelSoft = over(BRIGHT_SCENE, PANEL_SOFT);
const onNav = over(BRIGHT_SCENE, NAV);

/* Type directly on photography, protected only by the directional scrim at
   its weakest usable point under each section's text. */
const onHeroScrim = over(BRIGHT_SCENE, [10, 16, 20, 0.72]);
const onSectionScrim = over(BRIGHT_SCENE, [10, 16, 20, 0.64]);

const ON_PHOTO = "#f7f3ec";
const ON_PHOTO_SOFT = "#dbe4e6";
const ACCENT_ON_PHOTO = "#a9e2f7";
const ON_ACCENT = "#fbfeff";
const ACCENT_SOLID = "#0a5c7c";

const tests = [
  ["Panel body text", ON_PHOTO, onPanel, 4.5],
  ["Panel soft text", ON_PHOTO_SOFT, onPanel, 4.5],
  ["Panel accent text", ACCENT_ON_PHOTO, onPanel, 4.5],

  ["Menu name on panel", ON_PHOTO, onPanel, 4.5],
  ["Menu description on panel", ON_PHOTO_SOFT, onPanel, 4.5],
  ["Menu price accent on panel", ACCENT_ON_PHOTO, onPanel, 4.5],

  ["Strong panel body", ON_PHOTO, onPanelStrong, 4.5],
  ["Strong panel soft", ON_PHOTO_SOFT, onPanelStrong, 4.5],

  ["Soft panel pill label", ON_PHOTO_SOFT, onPanelSoft, 4.5],

  ["Nav link on scrolled bar", ON_PHOTO_SOFT, onNav, 4.5],
  ["Nav brand on scrolled bar", ON_PHOTO, onNav, 4.5],

  ["Hero headline on scrim", ON_PHOTO, onHeroScrim, 4.5],
  ["Hero subtext on scrim", ON_PHOTO_SOFT, onHeroScrim, 4.5],
  ["Hero accent line on scrim, large type", ACCENT_ON_PHOTO, onHeroScrim, 3],

  ["Section heading on scrim", ON_PHOTO, onSectionScrim, 4.5],
  ["Section subhead on scrim", ON_PHOTO_SOFT, onSectionScrim, 4.5],
  ["Section eyebrow on scrim", ACCENT_ON_PHOTO, onSectionScrim, 4.5],

  ["Primary CTA label on accent", ON_ACCENT, ACCENT_SOLID, 4.5],
  ["Active menu tab label", ON_ACCENT, ACCENT_SOLID, 4.5],
  ["Active selector pill label", ON_ACCENT, ACCENT_SOLID, 4.5],
];

const fmt = (bg) => (Array.isArray(bg) ? `rgb(${bg.map((v) => Math.round(v)).join(",")})` : bg);

let failed = 0;
console.log("Contrast audit (worst-case composites, V5 light-on-photography palette)");
console.log("===============================================================");

for (const [label, fg, bg, min] of tests) {
  const r = ratio(fg, bg);
  const ok = r >= min;
  if (!ok) failed++;
  console.log(
    `${ok ? "PASS" : "FAIL"}  ${r.toFixed(2).padStart(5)}:1  (min ${min})  ${label}  [on ${fmt(bg)}]`
  );
}

console.log(`\n${failed === 0 ? "All pairs pass WCAG AA" : `${failed} FAILURE(S)`}`);
process.exit(failed === 0 ? 0 : 1);
