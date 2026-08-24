/*
  Featured product configuration.

  Single source of truth for the Spezialitäten showcase. The selector renders
  whatever is in this array, so products can be added, reordered or removed
  without touching a component.

  IMAGES: every dish here is professional food photography generated as one
  consistent set (scripts/fal/assets/food-set.mjs). The customer's own
  photographs were used only as references for what each dish is, and are
  never served to the site.

  ANIMATION: every dish carries an ambient clip generated from its own
  approved still by Kling image-to-video, which is exactly the technique that
  produced the approved Kokoreç. The Kokoreç entry below is untouched: same
  image, same clip, same settings. The still stays the poster, so it is what
  shows before the clip loads and under prefers-reduced-motion.

  `priceFrom` is null when a dish has no verified price in
  restaurant/menu.md; the UI then shows no price rather than inventing one.
*/

export const featuredProducts = [
  {
    id: "kumru",
    name: "Kumru",
    tagline: "Das Original aus Izmir",
    description:
      "Geröstetes Sesambrot, geschmolzener Goudakäse, Sucuk, Yaprak Sosis und Hähnchen-Salami. Der Klassiker, für den man nach Izmir fährt.",
    priceFrom: "6,90",
    image: "/media/hero-kumru-approved.webp",
    alt: "Kumru von No. 35 mit Sesambrot, geschmolzenem Goudakäse, Sucuk und Hähnchen-Salami",
    fx: "video",
    video: "/media/kumru-ambient.mp4",
    focus: "center 55%",
  },
  {
    id: "kokorec",
    name: "Kokoreç",
    tagline: "Vom Holzkohlegrill",
    description:
      "Knusprig gegrillte Lamm-Spezialität nach Izmir-Art, fein gehackt, mit Tomaten, Zwiebeln und Sumak auf warmem Fladenbrot.",
    priceFrom: "9,50",
    image: "/media/food-kokorec.webp",
    alt: "Frisch gegrillter Kokoreç auf warmem Fladenbrot mit Tomaten, Zwiebeln und Petersilie",
    fx: "video",
    video: "/media/kokorec-ambient.mp4",
    focus: "center center",
  },
  {
    id: "midye",
    name: "Midye Dolma",
    tagline: "Mit frischer Zitrone",
    description:
      "Mit gewürztem Reis gefüllte Miesmuscheln. Frisch aufgemacht, mit einem kräftigen Spritzer Zitrone.",
    priceFrom: "9,50",
    image: "/media/food-midye-dolma.webp",
    alt: "Gefüllte Miesmuscheln mit gewürztem Reis und frischen Zitronenspalten",
    /* Served cold, so its clip carries light and atmosphere rather than steam. */
    fx: "video",
    video: "/media/midye-ambient.mp4",
    focus: "center center",
  },
  {
    id: "koefte-ekmek",
    name: "Köfte Ekmek",
    tagline: "Frisch vom Grill",
    description: "Köfte im Sesambrot, mit geschmolzenem Käse, Salat und hausgemachter Sauce.",
    priceFrom: "8,00",
    image: "/media/food-koefte-ekmek.webp",
    alt: "Köfte Ekmek von No. 35 im Sesambrot, mit geschmolzenem Käse und frischem Salat",
    fx: "video",
    video: "/media/koefte-ambient.mp4",
    focus: "center 55%",
  },
  {
    id: "ayvalik-toast",
    name: "Ayvalık Toast",
    tagline: "Knusprig gepresst",
    description:
      "Knuspriger Toast mit Hähnchen-Salami, Yaprak Sosis, Goudakäse, Gewürzgurke und hausgemachter Sauce.",
    priceFrom: "6,50",
    image: "/media/food-ayvalik-toast.webp",
    alt: "Ayvalık Toast von No. 35, knusprig gepresst, mit langen Fäden geschmolzenen Käses",
    fx: "video",
    video: "/media/ayvalik-ambient.mp4",
    focus: "center center",
  },
  {
    id: "tantuni",
    name: "Tantuni",
    tagline: "Auf dem Teller serviert",
    /*
      Tantuni is not in restaurant/menu.md, so there is no verified price and
      priceFrom stays null. The description states only what is visibly in the
      photograph and claims nothing further.
    */
    description: "Fein gehacktes Fleisch mit Joghurt, Chiliöl und frischer Petersilie.",
    priceFrom: null,
    image: "/media/food-tantuni.webp",
    alt: "Tantuni von No. 35 auf dem Teller, mit Joghurt, Chiliöl und frischer Petersilie",
    fx: "video",
    video: "/media/tantuni-ambient.mp4",
    focus: "center center",
  },
];

/* The hero background is the restaurant itself; this is used for OG imagery. */
export const heroProduct = featuredProducts[0];
