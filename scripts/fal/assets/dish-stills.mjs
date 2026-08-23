import path from "node:path";
import { generateImage } from "../generate-image.mjs";
import { PATHS } from "../config.mjs";

/**
 * Production assets: the two remaining primary visual products from
 * restaurant/creative-direction.md (Kokoreç and Midye Dolma).
 *
 * The Kumru is NOT regenerated here: the approved hero already covers it.
 *
 * Each reference is a tight crop of the real dish, so the original photo's
 * table, wrapper, drinks and phone UI are absent from the model input. The
 * environment language is kept deliberately identical to the approved hero
 * (sun-warmed stone, weathered plaster, warm late-afternoon Aegean light) so
 * all three images read as one brand world.
 */
const SHARED_WORLD = `Create a completely new professional food-photography environment: a sun-warmed pale stone surface, a softly out-of-focus weathered plaster wall, warm late-afternoon Aegean sunlight, gentle natural shadows. Inspired by İzmir, Çeşme and Alaçatı, but not a recognisable real location.

Use the reference image ONLY to understand what the real dish looks like: its ingredients, texture, colour and proportions. Completely discard the reference photograph's surroundings, surface, packaging, lighting and any phone or social-media interface elements.

Premium editorial food photography, cinematic lighting, photorealistic, realistic textures, natural imperfections, restrained saturation, appetising and sophisticated.

No text. No logo. No packaging or wrappers. No people, no hands. No drinks or bottles. No flags. No recognisable landmarks. No plastic-looking food.`;

const ASSETS = [
  {
    name: "Kokoreç",
    reference: path.join(PATHS.referenceDir, "kokorec-no35.png"),
    outputFileName: "kokorec.webp",
    aspectRatio: "16:9",
    prompt: `Create a premium cinematic commercial food photograph of Turkish Kokoreç as served at No.35, based on the provided reference.

THE DISH: finely chopped, crisp-edged charcoal-grilled kokoreç with deep golden-brown caramelised texture, served on warm flatbread, mixed with fresh chopped tomato, thinly sliced red onion, flat-leaf parsley and a dusting of sumac and chilli. Keep the chopped, rustic, charcoal-grilled character exactly as in the reference. Do not turn it into minced meat, a kebab skewer or a burger.

Photographed close, from a slightly low three-quarter angle, with subtle steam rising and a hint of charcoal-grill warmth.

Leave clean, uncluttered negative space on the left third of the frame for typography.

${SHARED_WORLD}

16:9 horizontal composition. High-end commercial restaurant photography.`,
  },
  {
    name: "Midye Dolma",
    reference: path.join(PATHS.referenceDir, "midye-dolma-no35.png"),
    outputFileName: "midye-dolma.webp",
    aspectRatio: "4:3",
    prompt: `Create a premium cinematic commercial food photograph of Turkish Midye Dolma (stuffed mussels) as served at No.35, based on the provided reference.

THE DISH: glossy black-shelled mussels opened to reveal spiced rice stuffing, arranged generously, with fresh lemon wedges for squeezing. Keep the deep blue-black iridescent shells and the aromatic spiced rice filling exactly as in the reference. Do not restyle them as a cooked mussel pot, a seafood stew or a plated fine-dining dish.

Photographed close and slightly from above, glistening and fresh, with natural highlights on the wet shells.

${SHARED_WORLD}

4:3 composition. High-end commercial restaurant photography.`,
  },
];

for (const asset of ASSETS) {
  console.log(`\n=== ${asset.name} ===`);
  const result = await generateImage({
    referenceImagePaths: [asset.reference],
    prompt: asset.prompt,
    outputFileName: asset.outputFileName,
    aspectRatio: asset.aspectRatio,
    resolution: "2K",
    outputFormat: "webp",
  });
  console.log(`Saved: ${result.localPath}`);
}
