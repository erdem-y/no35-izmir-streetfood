import { generateImage } from "../generate-image.mjs";

/*
  V2 environmental background scenes.

  These are atmosphere, not subject matter: they sit far behind glass content
  cards and are further dimmed by gradient scrims, so they are art-directed to
  be soft, deep and uncluttered in the middle of the frame where text lands.

  Explicitly steered away from the glossy "luxury Mediterranean resort" look.
  The reference point is a real working Aegean town: lived-in plaster, worn
  stone, ordinary plants, honest daylight.
*/
const COMMON = `Photorealistic, cinematic environmental photography. Shallow depth of field, soft natural falloff, gentle film grain, restrained saturation, believable imperfect surfaces.

This is a real, lived-in Aegean town, NOT a luxury resort, NOT a hotel, NOT a polished travel advertisement. No glamour, no gloss, no staged perfection.

Composition must stay calm and uncluttered through the middle of the frame, with soft out-of-focus depth, so that text can be laid over it.

No people. No text. No lettering. No signage. No logos. No restaurants. No flags. No boats with markings. No recognisable landmarks or monuments. No watermarks.

16:9 horizontal.`;

const SCENES = [
  {
    name: "Coast",
    outputFileName: "scene-coast.webp",
    prompt: `The Aegean sea off the coast near İzmir on a warm afternoon. Deep blue-green water with slow gentle swell catching the sunlight, a soft hazy horizon, warm light scattering across the surface. Perhaps a weathered stone edge in the near foreground, heavily out of focus.

Atmospheric and quiet rather than a postcard view. The sea fills most of the frame.

${COMMON}`,
  },
  {
    name: "Alacati street",
    outputFileName: "scene-alacati.webp",
    prompt: `A narrow old street in Alaçatı. Whitewashed plaster walls with visible age and texture, worn stone paving, wooden shutters in faded blue. Bougainvillea with deep pink flowers spilling over a wall on one side. Warm late-afternoon sunlight raking across the plaster, long soft shadows.

Ordinary and lived-in, an everyday back street rather than a tourist postcard.

${COMMON}`,
  },
  {
    name: "Courtyard",
    outputFileName: "scene-courtyard.webp",
    prompt: `A quiet Aegean courtyard in the early afternoon. An old olive tree casting dappled moving shadows onto a pale plaster wall and worn stone ground. A few simple terracotta pots with herbs. Warm filtered sunlight through the leaves, soft dust in the air.

Calm, shaded, almost still. Mostly wall and shadow, very uncluttered.

${COMMON}`,
  },
  {
    name: "Sunset",
    outputFileName: "scene-sunset.webp",
    prompt: `The Aegean coast at golden hour, shortly before sunset. Warm amber and soft rose light low across calm water, gentle haze, the silhouette of a low rocky shoreline far in the distance. Deep warm sky gradient with soft clouds.

Warm and quiet, an ordinary evening rather than a dramatic spectacle. Restrained, not oversaturated.

${COMMON}`,
  },
];

for (const scene of SCENES) {
  console.log(`\n=== ${scene.name} ===`);
  const result = await generateImage({
    prompt: scene.prompt,
    outputFileName: scene.outputFileName,
    aspectRatio: "16:9",
    resolution: "2K",
    outputFormat: "webp",
  });
  console.log(`Saved: ${result.localPath}`);
}
