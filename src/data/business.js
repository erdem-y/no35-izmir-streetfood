/*
  Single source of truth for business facts.

  Everything here is transcribed from restaurant/restaurant-info.md, which in
  turn comes from the restaurant's own restablo.de page. Nothing is invented.

  Anything not verifiable from that source is set to null and rendered as an
  explicit gap in the UI rather than filled with a plausible guess.
*/

export const business = {
  name: "No. 35 Original Izmir Streetfood",
  shortName: "No. 35",
  owner: "Muhammed Hanifi Tekdemir",
  district: "Hamburg Barmbek-Nord",

  phone: "0176-81487843",
  phoneHref: "tel:+4917681487843",
  email: "raci@capaci.de",

  /*
    ADDRESS - VERIFY BEFORE LAUNCH.

    The source document is internally inconsistent: the contact block reads
    "Hardorffsweg 15, 22305 Hamburg" while the embedded map is centred on the
    Hellbrookstraße / Hardorffsweg junction. Both are in Barmbek-Nord, but the
    exact house number has not been independently confirmed.

    Edit the fields below once the correct address is confirmed, then set
    `needsVerification` to false to hide the on-page verification notice.
  */
  address: {
    street: "Hardorffsweg 15",
    postalCode: "22305",
    city: "Hamburg",
    needsVerification: true,
    verificationNote:
      "Adresse vor Veröffentlichung bitte bestätigen. Die Quelle nennt Hardorffsweg 15, die hinterlegte Karte zeigt den Bereich Hellbrookstraße / Hardorffsweg.",
  },

  /*
    Not present in any verified source. Left null on purpose.
    Opening hours and the Instagram handle were never supplied, and the source
    page embeds an OpenStreetMap map rather than a Google Maps place link, so
    no Google place URL or review count exists to quote.
  */
  openingHours: null,
  instagramUrl: null,
  googleMapsPlaceUrl: null,
  googleReviewUrl: null,
  googleRating: null,
  googleReviewCount: null,

  /*
    A directions link that works without a verified Google place ID: it opens
    Google Maps search for the address. Replace with the real place URL once
    the Google Business Profile is confirmed.
  */
  directionsUrl:
    "https://www.google.com/maps/search/?api=1&query=" +
    encodeURIComponent("No. 35 Original Izmir Streetfood, Hardorffsweg 15, 22305 Hamburg"),

  /*
    Existing third-party ordering channel referenced by the source page.
    Ordering is explicitly not the primary goal of this site, so it appears
    only as a secondary link in the footer.
  */
  orderingUrl: "https://restablo.de",
  orderingLabel: "restablo.de",

  legalNote: "Alle Preise in Euro inkl. gesetzl. MwSt.",
  allergenNote:
    "Für Informationen zu Inhalts- und Zusatzstoffen sprechen Sie uns bitte direkt an.",
};

export const MENU_SUFFIX = "Menü mit Pommes & Softdrink";
