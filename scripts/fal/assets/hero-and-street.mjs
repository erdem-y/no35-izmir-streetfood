import path from "node:path";
import { existsSync } from "node:fs";
import { generateImage } from "../generate-image.mjs";
import { PATHS } from "../config.mjs";

/*
  STEP 3 and STEP 5 - the hero and the panda-graffiti street.

  Both are recreations. The customer's photographs go in as references so the
  place and the street stay recognisable, and neither original is ever shipped.

  For the hero the brief is specific: keep the real working restaurant, the
  grill, the counter and a member of staff in the No.35 shirt, but produce it
  as a professional interior photograph rather than a phone still. The cook is
  shot from behind at work, which keeps the scene honest without making a
  real employee's face into website furniture.
*/

const REAL_PHOTO = `Shot on a full-frame camera with a fast prime lens. Natural available light mixed with warm interior lighting. Real photographic contrast with detail held in both highlights and shadows. Natural depth of field. Fine grain. Slight lens vignetting.

Absolutely not a 3D render, not an illustration, not HDR, not oversaturated, not a stock photo, not a glossy advertisement. No impossible symmetry, no glowing edges, no plastic surfaces.

No readable text anywhere. No legible signage, no menu prices, no lettering on walls, no logos, no watermarks.`;

const SCENES = [
  {
    name: "Hero: the working restaurant",
    reference: path.resolve("public/media/photo-restaurant.webp"),
    outputFileName: "hero-restaurant.webp",
    prompt: `A professional interior photograph of a small Turkish street-food restaurant at work, based on the real place shown in the reference image.

THE SCENE: a stainless steel service counter running across the frame. Behind it a cook in a plain black t-shirt with a large light-coloured number 35 printed across the back, seen from behind and slightly to the side, working at the grill with tongs. On the grill, chopped meat is cooking and giving off real steam. Along the counter: a glass-fronted refrigerated display holding trays of fresh ingredients, bright green parsley, sliced tomatoes, pickled chillies, crisp lettuce, and a stack of fresh bread rolls. A large window at the back of the room opens onto a green, softly out-of-focus city street.

Keep the honest, slightly cramped, genuinely busy feel of a real working takeaway. Worn stainless steel, real reflections, real clutter. Warm interior light over the counter, cooler daylight from the window behind.

Rich natural colour: warm metal, deep greens, real reds in the vegetables, warm skin tones. Medium contrast, nothing washed out.

The cook is seen from behind. No face is visible and no one is identifiable.

16:9 horizontal composition, room on the left side of the frame for text to be laid over.

${REAL_PHOTO}`,
  },
  {
    name: "Background 3: panda graffiti street",
    reference: path.resolve("image copy 10.png"),
    outputFileName: "scene-panda-street.webp",
    prompt: `A professional travel photograph of a narrow old street in a Turkish Aegean town in the warm light of early evening, in the same real atmosphere as the reference image.

In the left foreground, a rough natural stone wall carries a large painted street-art mural of a stylised panda in black and white, with bold graphic shapes. The mural is loose, hand-painted and weathered, and it is an original design, not a copy of any existing artwork or signature.

The street runs away from the camera: worn stone paving, low stone buildings, small restaurants with awnings and simple wooden tables set out along one side, warm lamps just switching on, potted plants, a soft blue evening sky above.

Rich, real, documentary colour: warm honey stone, deep shadow, the black and white of the mural, warm lamplight, a cool blue sky. Medium contrast, natural saturation, no haze.

Any people are distant, small and completely unidentifiable, or absent entirely.

16:9 horizontal composition.

${REAL_PHOTO}`,
  },
];

for (const scene of SCENES) {
  const dest = path.join(PATHS.generatedImages, scene.outputFileName);
  if (existsSync(dest)) {
    console.log(`\n=== ${scene.name} === already generated, skipping`);
    continue;
  }

  console.log(`\n=== ${scene.name} ===`);
  const result = await generateImage({
    referenceImagePaths: [scene.reference],
    prompt: scene.prompt,
    outputFileName: scene.outputFileName,
    aspectRatio: "16:9",
    resolution: "2K",
    outputFormat: "webp",
  });
  console.log(`Saved: ${result.localPath}`);
}
