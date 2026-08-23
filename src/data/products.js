/*
  Featured product configuration.

  Single source of truth for the Spezialitäten showcase. The selector renders
  whatever is in this array, so products can be added, reordered or removed
  without touching a component.

  IMAGES: every dish here is professional food photography generated as one
  consistent set (scripts/fal/assets/food-set.mjs). The customer's own
  photographs were used only as references for what each dish is, and are
  never served to the site.

  `fx` selects the micro-animation:
    steam - rising wisps, heat haze and a light sweep (hot dishes)
    video - the Kokoreç grill clip, poster-backed and lazily loaded
    cool  - light sweep and slow drift only, no steam (Midye is served cold)

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
    fx: "steam",
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
    fx: "cool",
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
    fx: "steam",
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
    fx: "steam",
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
    fx: "steam",
    focus: "center center",
  },
];

/* The hero background is the restaurant itself; this is used for OG imagery. */
export const heroProduct = featuredProducts[0];
