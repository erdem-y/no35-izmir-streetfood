/*
  Background scene configuration.

  Order is fixed by the brief:
    1 Hero          the real No.35 restaurant at work
    2 Spezialitäten the İzmir coastal road sign
    3 Speisekarte   the panda-graffiti street
    4 Bewerten      Alaçatı, stone and pink bougainvillea
    5 Finden        the olive tree courtyard

  V5 principle: the photographs are the design. There are no full-surface
  white washes any more. `scrims` here are narrow directional gradients that
  darken only the band where text actually sits, so the picture stays the
  dominant visual element and keeps its own natural colour.
*/

export const scenes = [
  {
    id: "hero",
    image: "/media/hero-restaurant.webp",
    scrim: "heroLeft",
    focus: "center 50%",
  },
  {
    id: "spezialitaeten",
    image: "/media/scene-izmir-road.webp",
    scrim: "topLeft",
    focus: "center 55%",
  },
  {
    id: "speisekarte",
    image: "/media/scene-panda-street.webp",
    scrim: "topLeft",
    focus: "center 55%",
  },
  {
    id: "bewerten",
    image: "/media/scene-alacati-real.webp",
    scrim: "center",
    focus: "center 55%",
  },
  {
    id: "finden",
    image: "/media/scene-courtyard.webp",
    scrim: "topLeft",
    focus: "center 50%",
  },
];

export const DEFAULT_SCENE = scenes[0].id;

/*
  Directional, not blanket. Each one darkens the region under its section's
  type and releases to fully transparent across the rest of the frame, so most
  of every photograph is seen at its own contrast and saturation.
*/
export const SCRIMS = {
  heroLeft:
    "linear-gradient(97deg, rgb(10 16 20 / 0.88) 0%, rgb(10 16 20 / 0.72) 26%, rgb(10 16 20 / 0.34) 52%, rgb(10 16 20 / 0.1) 78%, rgb(10 16 20 / 0.04) 100%)",
  topLeft:
    "linear-gradient(160deg, rgb(10 16 20 / 0.8) 0%, rgb(10 16 20 / 0.64) 32%, rgb(10 16 20 / 0.24) 60%, rgb(10 16 20 / 0.08) 100%)",
  center:
    "linear-gradient(180deg, rgb(10 16 20 / 0.5) 0%, rgb(10 16 20 / 0.56) 45%, rgb(10 16 20 / 0.6) 100%)",
};
