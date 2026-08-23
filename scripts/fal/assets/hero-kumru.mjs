import path from "node:path";
import { generateImage } from "../generate-image.mjs";
import { PATHS } from "../config.mjs";

/**
 * Production asset: main website HERO image — the regular No.35 Kumru.
 *
 * REFERENCE HANDLING
 * The reference is `assets/reference/kumru-regular-no35.png`: the regular
 * Kumru isolated by a tight crop out of the original photo, so the drinks,
 * tray, plates, lemon, peppers, table and Instagram UI in that photo are
 * physically absent from the model's input rather than merely discouraged
 * by prompt text.
 *
 * It is the REGULAR Kumru deliberately — the other supplied photo shows the
 * same sandwich plus a fried egg, which is the "Atom" variant, and the
 * sesame-roll sandwich in the same scene is a köfte sandwich, not a Kumru.
 *
 * The reference supplies FOOD IDENTITY ONLY. The environment is invented
 * fresh from the approved Aegean art direction.
 */
const REFERENCE = path.join(PATHS.referenceDir, "kumru-regular-no35.png");

const PROMPT = `Create a premium cinematic commercial food photograph of the real No.35 İzmir Kumru shown in the provided reference image.

USE THE REFERENCE FOR THE FOOD ONLY.
The reference image exists solely so you understand what the actual No.35 Kumru looks like: its bread, sandwich shape, filling, ingredients, proportions, texture and overall appearance. Reproduce the food's identity faithfully.

COMPLETELY DISCARD the reference photograph's surroundings. Do not reproduce, echo or reinterpret any of the following from the reference: its paper wrapper or packaging, printed branding or lettering on that packaging, the wooden tray, the table, plates, lemon wedges, pickled peppers, any drinks or bottles, the indoor background, the original snapshot lighting, or any phone or social-media interface elements. None of that may appear in the final image in any form.

Build a completely new, professional food-photography environment around the sandwich instead.

THE SANDWICH — match the reference precisely:
A soft, elongated, lightly golden glazed bread roll with a smooth glossy crust and NO sesame seeds. It is a soft sandwich roll, not a round burger bun and not a seeded bun.
The filling is generously layered and visibly overflowing at the open side: abundant folded slices of pink chicken salami and yaprak sosis, reddish spiced sucuk, melted Gouda cheese flowing over the edges, a slice of pickled cucumber, and glossy sauces.

INGREDIENT LOCK: include only the ingredients visible in the reference. Do NOT add a fried egg. Do NOT add any ingredient that is not part of this regular Kumru. Do not substitute a beef patty, and do not restyle it as a burger.

COMPOSITION AND ART DIRECTION:
The Kumru is the dominant subject, photographed from a slightly low three-quarter angle, extremely appetizing, realistic and richly detailed, with natural food texture on the bread, cheese and meats.

Warm Mediterranean / Aegean atmosphere inspired by İzmir, Çeşme and Alaçatı: warm late-afternoon sunlight, subtle stone and sun-bleached wood textures, understated Turkish Aegean street-food character. Do not depict a recognizable real İzmir location — the atmosphere is inspired by the Aegean rather than pretending to be an actual place.

Premium editorial food photography, cinematic lighting, realistic textures, subtle steam, natural imperfections, sophisticated composition.

Leave substantial clean negative space on the upper-left and left side of the composition for German website typography.

No text.
No logo.
No packaging or wrappers.
No people, no hands.
No flags.
No recognizable landmarks.
No drinks or bottles.
No generic burger styling.
No excessive saturation.
No plastic-looking food.
No artificial-looking ingredients.

16:9 horizontal website hero composition.
Photorealistic.
High-end commercial restaurant photography.`;

const result = await generateImage({
  referenceImagePaths: [REFERENCE],
  prompt: PROMPT,
  outputFileName: "hero-kumru.webp",
  aspectRatio: "16:9",
  resolution: "2K",
  outputFormat: "webp",
});

console.log(`\nSaved : ${result.localPath}`);
console.log(`Model : ${result.endpoint}`);
console.log(`Remote: ${result.remoteUrl}`);
if (result.raw?.description) {
  console.log(`\nModel description of output:\n${result.raw.description}`);
}
