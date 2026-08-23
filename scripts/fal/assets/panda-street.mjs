import path from "node:path";
import { generateImage } from "../generate-image.mjs";

/*
  Background 3, the panda-graffiti street.

  The customer's reference photograph shows a real mural by a named artist,
  signed in the corner. Reproducing that mural and its signature on a
  commercial page would be copying someone's artwork, so this generation is
  steered to an ORIGINAL panda design and explicitly excludes any signature.
  The street, the stone and the atmosphere are what carry over.
*/
const result = await generateImage({
  referenceImagePaths: [path.resolve("image copy 10.png")],
  prompt: `A professional travel photograph of a narrow old street in a Turkish Aegean town at dusk, in the same atmosphere as the reference image.

On the rough stone wall at the left there is a large hand-painted street-art panda in simple bold black and white shapes. Design it FRESH as an original piece: a different pose, different proportions and a different composition from any existing mural. Do not copy the artwork in the reference. It should look like weathered, genuine local street art painted onto uneven stone.

CRITICAL: there is no signature, no artist name, no tag, no handwriting and no lettering of any kind anywhere on the wall or in the frame.

The street runs away from the camera: worn stone paving, low stone buildings, small restaurants with awnings and simple wooden tables, warm lamps switching on at dusk, potted plants, deep blue evening sky.

Rich real documentary colour: warm honey stone, warm lamplight, cool blue sky, the black and white of the painting. Medium contrast, natural saturation, no haze.

Any people are distant and completely unidentifiable, or absent.

Shot on a full-frame camera, natural lens, real photograph. Natural contrast with detail in the shadows, fine grain, slight vignetting.

Not a 3D render, not an illustration, not HDR, not oversaturated, not a stock photo. No readable text, no signage, no logos, no watermarks.

16:9 horizontal.`,
  outputFileName: "scene-panda-street.webp",
  aspectRatio: "16:9",
  resolution: "2K",
  outputFormat: "webp",
});

console.log(`Saved: ${result.localPath}`);
