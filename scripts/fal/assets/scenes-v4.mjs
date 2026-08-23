import path from "node:path";
import { generateImage } from "../generate-image.mjs";
import { PATHS } from "../config.mjs";

/*
  V4 background scenes.

  Two goals drove these prompts:

  1. Real photographic colour. The V3 scenes were fine, but the page washed
     them out with heavy white veils. V4 removes those veils, so the scenes
     themselves must carry natural saturation and real contrast.

  2. Authenticity over polish. The reference for the street is the customer's
     own Alaçatı photograph, passed in as an image reference so the output
     inherits its real evening light and lived-in stone rather than the
     generic bright-white "AI Mediterranean" look.

  The reference photograph contains identifiable passers-by and a signed
  street mural. Neither is reproduced: the prompt asks for an empty street and
  plain walls, so the output borrows the atmosphere, not the people or
  someone else's artwork.
*/

const NO_AI_LOOK = `Shot on a full-frame camera, natural lens, real photograph. Authentic colour, natural contrast, real shadows with detail, slight lens vignetting, fine natural grain.

Absolutely not an AI-generated illustration, not a render, not HDR, not oversaturated, not a glossy travel advertisement, no glowing highlights, no plastic surfaces, no impossible symmetry.

No identifiable people. No text. No lettering on walls. No shop signage. No logos. No murals or painted artwork. No watermarks.`;

const SCENES = [
  {
    name: "Alacati street",
    reference: path.resolve("image copy 10.png"),
    outputFileName: "scene-alacati-real.webp",
    aspectRatio: "16:9",
    prompt: `A narrow street in a Turkish Aegean town in the warm hour before sunset, in the same real atmosphere as the reference photograph.

Rough natural stone buildings with worn plaster, weathered wooden shutters and doors in faded blue and green, stone paving worn smooth underfoot. Small simple restaurant tables and bentwood chairs set out along one side, empty and waiting. Bougainvillea in deep pink spilling over a wall. Warm low sunlight raking down the street, with warm lamp light just beginning to show in the shade.

Keep the colour real and rich: warm honey stone, deep pink flowers, green foliage, blue-grey shutters, a soft evening blue in the sky. Natural saturation, real shadow depth, no washed-out haze.

The street is empty of people. The walls are plain stone and plaster with no painted artwork and no signage of any kind.

${NO_AI_LOOK}`,
  },
  {
    name: "Izmir coastal road sign",
    outputFileName: "scene-izmir-road.webp",
    aspectRatio: "16:9",
    prompt: `A photograph taken from the roadside on a coastal highway along the Turkish Aegean, on a clear afternoon.

In the middle distance stands a standard Turkish motorway direction sign: a plain rectangular sign with a blue background and a white border, carrying the single white uppercase word "İZMİR" and a white directional arrow. It is an ordinary, slightly weathered, entirely believable real road sign on a simple grey metal post, photographed from the side of the road at a natural angle.

Behind and below the road, the deep blue Aegean sea stretches out, with a rocky scrub-covered headland, dry golden grass and low Mediterranean pines along the roadside. Clear sky with soft haze near the horizon. Warm natural afternoon sunlight.

Real, natural, documentary colour: genuine deep sea blue, sun-bleached dry grass, warm asphalt, honest sky. Rich but not oversaturated. Real contrast with detail held in both the shadows and the sky.

The sign must read exactly "İZMİR" and nothing else. No other text anywhere in the frame.

Shot on a full-frame camera, natural lens, real photograph. Authentic colour, natural contrast, fine natural grain.

Not an AI illustration, not a render, not HDR, not a travel advertisement. No people. No cars in the foreground. No logos. No watermarks.`,
  },
];

for (const scene of SCENES) {
  console.log(`\n=== ${scene.name} ===`);
  const result = await generateImage({
    referenceImagePaths: scene.reference ? [scene.reference] : [],
    prompt: scene.prompt,
    outputFileName: scene.outputFileName,
    aspectRatio: scene.aspectRatio,
    resolution: "2K",
    outputFormat: "webp",
  });
  console.log(`Saved: ${result.localPath}`);
}
