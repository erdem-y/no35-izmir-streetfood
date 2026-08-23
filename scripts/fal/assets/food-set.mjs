import path from "node:path";
import { generateImage } from "../generate-image.mjs";
import { PATHS } from "../config.mjs";

/*
  STEP 1 - the professional food photography set.

  The customer's own photographs are REFERENCES ONLY. They are passed in to
  establish what each dish actually is (ingredients, build, portion, colour)
  and are never shipped to the site. Each dish is re-photographed here as a
  new professional image.

  The approved Kumru is the quality benchmark and is NOT regenerated. Every
  other dish is shot into the same set: same warm stone ledge, same weathered
  wood backdrop, same soft warm side light, same shallow depth of field, same
  lens character. That shared world is what makes six separate generations
  read as one photo shoot rather than six stock images.
*/

const SET_LOOK = `PHOTOGRAPHY SET, identical for every dish in this series:
Shot on a full-frame camera with a fast prime lens at a shallow aperture. The dish sits on a pale sun-warmed stone ledge, with a weathered dark wood wall softly out of focus behind it. Warm late-afternoon side light rakes across from the left, with a soft natural falloff into gentle shadow on the right. Subtle warm bounce, no hard specular hotspots.

Rich natural colour and real contrast. Deep shadows that still hold detail. Fine natural grain. Slight lens vignetting. Natural depth of field with the front of the dish sharp and the background falling away.

Real food, honestly photographed: natural imperfections, a crumb or two, an uneven edge, sauce that sits where sauce actually sits. Appetising because it is real, not because it is retouched.

Absolutely not a 3D render, not an illustration, not HDR, not oversaturated, not plastic, not a glossy fast-food advertisement. No glowing highlights, no artificial rim light, no impossible symmetry.

No text. No lettering. No packaging with printing on it. No logos. No people. No hands. No phone or social-media interface elements. No watermarks.

16:9 horizontal composition, the dish filling the frame generously.`;

const DISHES = [
  {
    name: "Kokoreç",
    reference: path.join(PATHS.referenceDir, "kokorec-no35.png"),
    outputFileName: "food-kokorec.webp",
    prompt: `A professional food photograph of Turkish Kokoreç as served at this restaurant, based on the dish shown in the reference image.

THE DISH: finely chopped charcoal-grilled kokoreç with crisp caramelised dark-golden edges, piled generously on a warm soft flatbread, tossed with fresh chopped tomato, thinly sliced red onion, flat-leaf parsley, and a dusting of sumac and chilli flakes. Keep the chopped rustic character exactly as in the reference. Never minced meat, never a skewer, never a burger.

Photographed close, slightly above and to the side, with a fine wisp of steam rising from the hot meat.

${SET_LOOK}`,
  },
  {
    name: "Midye Dolma",
    reference: path.join(PATHS.referenceDir, "midye-dolma-no35.png"),
    outputFileName: "food-midye-dolma.webp",
    prompt: `A professional food photograph of Turkish Midye Dolma (stuffed mussels) as served at this restaurant, based on the dish shown in the reference image.

THE DISH: glossy blue-black mussel shells opened to reveal spiced rice stuffing, arranged generously and slightly overlapping, with fresh lemon wedges alongside for squeezing. Keep the deep iridescent shells and the aromatic spiced rice exactly as in the reference. Never a cooked mussel pot, never a seafood stew, never a fine-dining plating.

Photographed close and slightly from above, the wet shells catching the light. Served cool, so no steam.

${SET_LOOK}`,
  },
  {
    name: "Köfte Ekmek",
    reference: path.resolve("public/media/photo-koefte-ekmek.webp"),
    outputFileName: "food-koefte-ekmek.webp",
    prompt: `A professional food photograph of Köfte Ekmek as served at this restaurant, based on the sandwich shown in the reference image.

THE DISH: a crusty sesame-topped bread roll, split and filled with chargrilled köfte patties, generously covered with melted cheese that has gone golden and blistered in patches, plus a warm reddish sauce, fresh green salad leaves, sliced tomato and thinly sliced onion visible at the edges. Keep the build, the sesame crust and the melted-cheese-over-köfte character exactly as in the reference.

Photographed close, from a low three-quarter angle, with a fine wisp of steam rising from the hot filling.

${SET_LOOK}`,
  },
  {
    name: "Ayvalık Toast",
    reference: path.resolve("public/media/photo-ayvalik-toast.webp"),
    outputFileName: "food-ayvalik-toast.webp",
    prompt: `A professional food photograph of an Ayvalık Toast as served at this restaurant, based on the sandwich shown in the reference image.

THE DISH: a pressed grilled toast with deep golden-brown ridged grill marks across the crust, broken open into two halves and pulled slightly apart so long strands of molten cheese stretch between them. Inside: sliced chicken salami and sausage, sucuk and melted Gouda. Keep the ridged press marks and the dramatic cheese pull exactly as in the reference.

The two halves are held apart in mid-air by nothing visible, or resting propped against each other on the stone. No hands and no people in the frame.

Photographed close, straight on, with the cheese strands catching the warm side light and a fine wisp of steam rising.

${SET_LOOK}`,
  },
  {
    name: "Tantuni",
    reference: path.resolve("public/media/photo-tantuni.webp"),
    outputFileName: "food-tantuni.webp",
    prompt: `A professional food photograph of Tantuni as served at this restaurant, based on the dish shown in the reference image.

THE DISH: finely chopped spiced meat served along a long narrow dark ceramic plate, over and beside generous spoonfuls of thick white yogurt, finished with a drizzle of bright red-orange chilli butter and a scattering of fresh chopped flat-leaf parsley. A few pickled green chillies rest alongside. Keep the long plated presentation, the yogurt, the chilli oil drizzle and the parsley exactly as in the reference.

Photographed close, at a natural angle along the length of the plate, with a fine wisp of steam rising from the hot meat.

${SET_LOOK}`,
  },
];

for (const dish of DISHES) {
  console.log(`\n=== ${dish.name} ===`);
  const result = await generateImage({
    referenceImagePaths: [dish.reference],
    prompt: dish.prompt,
    outputFileName: dish.outputFileName,
    aspectRatio: "16:9",
    resolution: "2K",
    outputFormat: "webp",
  });
  console.log(`Saved: ${result.localPath}`);
}
