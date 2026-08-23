/*
  Full menu, transcribed verbatim from restaurant/menu.md.

  Product names, descriptions and prices are exactly as published by the
  restaurant. Nothing added, nothing renamed, nothing rounded.

  Each source product appears twice on the original menu: once on its own and
  once as "<name> Menü mit Pommes & Softdrink". Those pairs are joined into a
  single row here with both prices kept intact (`price` and `menuPrice`), so
  the list stays readable without losing or altering a single price. Items
  with no menu variant simply have `menuPrice: null`.

  `popular: true` mirrors the "BELIEBT" flag on the source menu.
*/

export const menuCategories = [
  {
    id: "kumru",
    name: "Kumru",
    items: [
      {
        name: 'Kumru Sandwich "Izmir"',
        desc: "mit Hähnchen-Salami, Yaprak Sosis, Sucuk, Goudakäse, Gewürzgurke, Tomaten, Saucen",
        price: "6,90",
        menuPrice: "11,90",
        popular: true,
      },
      {
        name: 'Kumru Sandwich "Atom"',
        desc: "mit Hähnchen-Salami, Yaprak Sosis, Sucuk, Goudakäse, Ei, Gewürzgurke, Tomaten, Saucen",
        price: "7,90",
        menuPrice: "12,90",
        popular: true,
      },
      {
        name: 'Kumru Burger "Izmir"',
        desc: "mit Hähnchen-Salami, Yaprak Sosis, Sucuk, Goudakäse, Gewürzgurke, Tomaten, Saucen",
        price: "6,90",
        menuPrice: "11,90",
      },
      {
        name: 'Kumru Burger "Atom"',
        desc: "mit Hähnchen-Salami, Yaprak Sosis, Sucuk, Goudakäse, Ei, Gewürzgurke, Tomaten, Saucen",
        price: "7,90",
        menuPrice: "12,90",
      },
      {
        name: "Kumru Box",
        desc: "mit Pommes frites, Hähnchen-Salami, Yaprak Sosis, Sucuk, Goudakäse, Gewürzgurke, Tomaten, Saucen",
        price: "7,90",
        menuPrice: "12,90",
        popular: true,
      },
    ],
  },
  {
    id: "kokorec",
    name: "Kokorec",
    items: [
      {
        name: "Kokorec Izmir",
        desc: "knusprig gegrillte Lamm-Spezialität nach Izmir-Art",
        price: "9,50",
        menuPrice: "14,50",
      },
      {
        name: "Kokorec Istanbul",
        desc: "knusprig gegrillte Lamm-Spezialität nach Izmir-Art mit 1 x Zutat nach Wahl",
        price: "9,50",
        menuPrice: "14,50",
      },
      {
        name: "Kokorec Teller",
        desc: "knusprig gegrillte Lamm-Spezialität mit Reis",
        price: "16,00",
        menuPrice: "21,00",
      },
    ],
  },
  {
    id: "midye-dolma",
    name: "Midye Dolma",
    items: [
      {
        name: "Midye Dolma, 10-12 Stück",
        desc: "mit Reis gefüllte Miesmuscheln",
        price: "9,50",
        menuPrice: "14,50",
      },
    ],
  },
  {
    id: "toast",
    name: "Toast",
    items: [
      {
        name: "Ayvalik Toast",
        desc: "mit Hähnchen-Salami, Yaprak Sosis, Goudakäse, Gewürzgurke, Tomaten, Saucen",
        price: "6,50",
        menuPrice: "11,50",
        popular: true,
      },
      {
        name: "Ayvalik Toast Veggi",
        desc: "mit Goudakäse, Gewürzgurke, Tomaten, Saucen",
        price: "5,50",
        menuPrice: "10,50",
      },
    ],
  },
  {
    id: "patso",
    name: "Patso",
    items: [
      {
        name: "Izmir Patso",
        desc: "mit Pommes frites, Gewürzgurke, Sauce, Cheddarkäse, Goudakäse im Sandwich",
        price: "5,00",
        menuPrice: "10,00",
      },
      {
        name: "Izmir Patso Sosis",
        desc: "mit Pommes frites, Yaprak Sosis, Gewürzgurke, Sauce im Sandwich",
        price: "6,50",
        menuPrice: "11,50",
      },
    ],
  },
  {
    id: "koefte",
    name: "Köfte",
    items: [
      {
        name: "Köfte Ekmek",
        desc: "mit Köfte im Sandwich, Salat",
        price: "8,00",
        menuPrice: "13,00",
        popular: true,
      },
      {
        name: "Köfte Dürüm",
        desc: "mit Köfte im Dürüm, Salat",
        price: "8,00",
        menuPrice: "13,00",
      },
      {
        name: "Cheese Köfte",
        desc: "mit Köfte im Sandwich, Cheddarkäse, Salat",
        price: "9,50",
        menuPrice: "14,50",
        popular: true,
      },
      {
        name: "Köfte Teller",
        desc: "mit Reis, Salat",
        price: "14,50",
        menuPrice: "19,50",
        popular: true,
      },
    ],
  },
  {
    id: "grill",
    name: "Grill-Gerichte",
    items: [
      {
        name: "Tavuk Pirzola Teller",
        desc: "mit Hähnchenkotelett, Reis, Salat",
        price: "14,50",
        menuPrice: "19,50",
        popular: true,
      },
      {
        name: "Tavuk Pirzola Sandwich",
        desc: "mit Hähnchenkotelett im Sandwich, Salat",
        price: "8,00",
        menuPrice: "13,00",
        popular: true,
      },
      {
        name: "Tavuk Pirzola Dürüm",
        desc: "mit Hähnchenkotelett im Dürüm, Salat",
        price: "8,00",
        menuPrice: "13,00",
      },
      {
        name: "No.35 Mix Teller",
        desc: "mit Kokorec, Hähnchenkotelett, Lammleber, Köfte, Reis, Salat, Midye Dolma",
        price: "24,90",
        menuPrice: "29,90",
      },
    ],
  },
  {
    id: "veggie",
    name: "Veggie",
    items: [
      {
        name: "Cigköfte Prt.",
        desc: "mit Portion veganen Bulgurbällchen, Eisberg, Zitrone",
        price: "10,00",
        menuPrice: "15,00",
        popular: true,
      },
      {
        name: "Cigköfte Dürüm",
        desc: "mit veganen Bulgurbällchen im Dürüm",
        price: "5,00",
        menuPrice: "10,00",
        popular: true,
      },
      {
        name: "Falafel Sandwich",
        desc: "mit Falafel im Sandwich, Salat",
        price: "5,90",
        menuPrice: "10,90",
      },
      {
        name: "Falafel Dürüm",
        desc: "mit Falafel im Dürüm, Salat",
        price: "5,90",
        menuPrice: "10,90",
      },
      {
        name: "Falafel Teller",
        desc: "mit Falafel Teller, Reis, Salat",
        price: "11,50",
        menuPrice: "16,50",
      },
      {
        name: "Halloumi Sandwich",
        desc: "mit Halloumi im Sandwich, Salat",
        price: "6,90",
        menuPrice: "11,90",
      },
      {
        name: "Halloumi Dürüm",
        desc: "mit Halloumi im Dürüm, Salat",
        price: "6,90",
        menuPrice: "11,90",
      },
      {
        name: "Halloumi Teller",
        desc: "mit Halloumi Teller, Reis, Salat",
        price: "11,50",
        menuPrice: "16,50",
      },
      {
        name: "Veggi Mix Teller",
        desc: "mit Halloumi und Falafel Teller, Reis, Salat",
        price: "12,50",
        menuPrice: "17,50",
      },
    ],
  },
  {
    id: "kids",
    name: "Kids Menü",
    items: [
      {
        name: "Kiddy Box",
        desc: "mit Köfte, Pommes frites, 1 x Softdrink, klein",
        price: "7,50",
        menuPrice: null,
      },
    ],
  },
  {
    id: "beilagen",
    name: "Beilagen",
    items: [
      { name: "Pommes frites", desc: null, price: "4,50", menuPrice: null },
      { name: "Pommes frites mit Ketchup", desc: null, price: "4,50", menuPrice: null },
      { name: "Pommes frites mit Mayonnaise", desc: null, price: "4,50", menuPrice: null },
      {
        name: "Loaded Fries",
        desc: "mit Pommes frites, Yaprak Sosis, Sauce",
        price: "6,50",
        menuPrice: null,
      },
    ],
  },
  {
    id: "dessert",
    name: "Dessert",
    items: [
      { name: "Sambali", desc: "Grießkuchen mit Mandeln", price: "3,00", menuPrice: null },
      {
        name: "Bomba",
        desc: "knusprige Teighülle mit Schokocreme-Füllung",
        price: "2,00",
        menuPrice: null,
      },
    ],
  },
];

/* The three products the brand leads with, per restaurant/creative-direction.md. */
export const signatureDishes = [
  {
    id: "kumru",
    name: "Kumru",
    turkishNote: "Das Original aus Izmir",
    text: "Geröstetes Brot, Goudakäse, Sucuk, Yaprak Sosis und Hähnchen-Salami. Der Klassiker, für den man nach Izmir fährt.",
    image: "/media/hero-kumru.webp",
    alt: "Kumru Sandwich mit geschmolzenem Goudakäse, Sucuk und Hähnchen-Salami",
    priceFrom: "6,90",
  },
  {
    id: "kokorec",
    name: "Kokorec",
    turkishNote: "Vom Holzkohlegrill",
    text: "Knusprig gegrillte Lamm-Spezialität nach Izmir-Art, fein gehackt, mit Tomaten, Zwiebeln und Sumak.",
    image: "/media/kokorec.webp",
    alt: "Frisch gegrillter Kokorec auf warmem Fladenbrot mit Tomaten, Zwiebeln und Petersilie",
    priceFrom: "9,50",
  },
  {
    id: "midye",
    name: "Midye Dolma",
    turkishNote: "Mit Zitrone",
    text: "Mit gewürztem Reis gefüllte Miesmuscheln. Frisch aufgemacht, mit einem Spritzer Zitrone.",
    image: "/media/midye-dolma.webp",
    alt: "Gefüllte Miesmuscheln mit Reis und frischen Zitronenspalten",
    priceFrom: "9,50",
  },
];
