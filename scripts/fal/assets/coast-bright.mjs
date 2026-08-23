import { generateImage } from "../generate-image.mjs";

/*
  Brighter hero sea.

  The first coast scene came out hazy and grey-blue, which is what made the
  hero read as heavy. This one is explicitly midday Aegean: saturated blue
  water, real sunlight, open sky. Still art-directed to stay calm through the
  middle of the frame so headline type sits cleanly over it.
*/
const result = await generateImage({
  prompt: `The Aegean sea near İzmir on a clear bright summer midday, photographed from just above the water.

Vivid but sophisticated sea colour: deep blue in the distance turning to clear bright turquoise-blue nearer the camera, with sunlight sparkling across gentle small waves. Open luminous sky with soft high haze near the horizon. Warm natural sunlight, bright and airy, genuinely daylight rather than moody.

Colour is rich but slightly desaturated and filmic, never a tropical postcard and never an oversaturated travel advertisement.

Photorealistic, cinematic environmental photography, shallow depth of field far away, soft natural falloff, gentle film grain, believable water surface detail.

The composition stays calm and uncluttered so text can be laid over it. Mostly open water and sky.

No people. No boats. No text. No lettering. No signage. No logos. No flags. No buildings in the foreground. No recognisable landmarks. No watermarks.

16:9 horizontal.`,
  outputFileName: "scene-coast-bright.webp",
  aspectRatio: "16:9",
  resolution: "2K",
  outputFormat: "webp",
});

console.log(`Saved: ${result.localPath}`);
