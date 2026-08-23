import path from "node:path";
import { generateImage } from "../generate-image.mjs";
import { PATHS } from "../config.mjs";

/**
 * Production asset, PASS 2: targeted refinement of the Kumru hero.
 *
 * Pass 1 (hero-kumru.mjs) established the bread, environment, lighting and
 * left-side negative space correctly, but the filling came out dominated by
 * pale deli meat, with the Gouda, sucuk, tomato and sauces under-represented
 * relative to the real Kumru Burger "Izmir".
 *
 * This pass edits that output rather than regenerating from scratch, so the
 * approved composition survives untouched:
 *   reference 1 = the pass-1 hero  -> what to PRESERVE
 *   reference 2 = the real product -> ingredient identity to MATCH
 *
 * Ingredients are locked to the menu spec for Kumru Burger "Izmir":
 * Hähnchen-Salami, Yaprak Sosis, Sucuk, Goudakäse, Gewürzgurke, Tomaten,
 * Saucen. No egg (that is the "Atom" variant).
 */
const BASE_HERO = path.join(PATHS.generatedImages, "hero-kumru-v2-superseded.webp");
const PRODUCT_REFERENCE = path.join(PATHS.referenceDir, "kumru-regular-no35.png");

const PROMPT = `Refine the first image, which is a finished premium food photograph of a No.35 İzmir Kumru. This is a TARGETED EDIT: preserve that image almost entirely and change ONLY the visible sandwich filling.

PRESERVE EXACTLY, DO NOT ALTER:
The elongated, soft, glossy golden bread roll — its shape, length, colour, sheen and smooth seedless crust. Do not change the bread in any way.
The camera angle, the sandwich's position, scale and framing.
The warm Aegean environment: sun-warmed stone surface, weathered plaster wall, terracotta pots and herbs.
The warm late-afternoon lighting, shadows and colour grade.
The clean, empty negative space on the left side of the frame, reserved for typography.
The premium photorealistic commercial-photography look.

CHANGE ONLY THE FILLING BALANCE.
At present the filling is dominated by pale pink deli meat. Rebalance it so it represents the real No.35 Kumru Burger "Izmir". The second image shows the actual product — use it to guide ingredient identity and balance:

- Clearly more melted Gouda cheese: warm, molten, glossy, visibly flowing over the edge of the filling.
- More visible Yaprak Sosis.
- Sucuk that is clearly recognisable as distinct, dark-red, spiced Turkish sausage slices.
- A natural, visible amount of fresh red tomato slices.
- Sauces noticeably more prominent and glossy, catching the warm light.
- Keep the chicken salami present, but clearly less dominant than it currently is.
- Keep the pickled cucumber.

Keep the sandwich realistic and appetising: generously but naturally filled, NOT excessively stuffed, NOT overflowing, NOT exaggerated. It must look like the actual product that is served, simply photographed at premium commercial quality.

Do not add a fried egg.
Do not add any ingredient outside that list.
Do not add packaging, wrappers, drinks, bottles, plates, cutlery, hands, people, text or logos.
Keep the left side of the frame clean and empty.

16:9 horizontal website hero composition. Photorealistic. High-end commercial restaurant photography.`;

const result = await generateImage({
  referenceImagePaths: [BASE_HERO, PRODUCT_REFERENCE],
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
