import path from "node:path";
import { existsSync } from "node:fs";
import { generateVideoFromImage } from "../generate-video.mjs";
import { PATHS } from "../config.mjs";

/*
  Brings the other five dishes up to the approved Kokoreç animation standard.

  Kokoreç is the master reference and is NOT touched: its image and its clip
  are excluded here, and kokorec-ambient.mp4 is never rewritten.

  The technique is deliberately identical to the one that produced the
  approved Kokoreç clip: Kling image-to-video driven from the already-approved
  still, with a prompt built on the same skeleton. No food image is
  regenerated; each existing photograph is simply the first frame.

  Midye Dolma is the one variation. It is served cold, so asking for steam
  would misrepresent the dish. It gets the same cinematic treatment with
  atmospheric light movement instead.
*/

const HOT = (dish, detail) => `Slow, subtle, cinematic food cinematography of ${dish}.

${detail} Fine wisps of real steam rise gently from the hot food and drift slowly to one side before fading. The warm side light shifts almost imperceptibly across the surface.

The food itself stays completely still and undistorted. No warping, no morphing, no shape change, no melting. Every ingredient keeps its exact form.

Locked-off tripod shot with an extremely slow, barely perceptible drift. No fast camera movement, no push-in, no pan, no zoom, no rotation. Nothing enters or leaves the frame. No people, no hands, no text.

Very slow, very calm, premium restaurant cinematography. Natural steam motion only, never thick white smoke, never cartoon puffs, never glowing.`;

const CLIPS = [
  {
    name: "Kumru",
    source: "hero-kumru-approved.webp",
    output: "kumru-ambient.mp4",
    prompt: HOT(
      "a Turkish Kumru sandwich on a warm sesame roll",
      "The melted cheese holds its shape and stays glossy."
    ),
  },
  {
    name: "Midye Dolma",
    source: "food-midye-dolma.webp",
    output: "midye-ambient.mp4",
    prompt: `Slow, subtle, cinematic food cinematography of Turkish stuffed mussels served cold with lemon.

There is NO steam and NO heat: this dish is served cold. Instead the warm side light shifts almost imperceptibly across the wet, glossy shells, and the faintest highlights travel over them as the light moves.

The mussels stay completely still and undistorted. No warping, no morphing, no shape change. Nothing opens or closes.

Locked-off tripod shot with an extremely slow, barely perceptible drift. No fast camera movement, no push-in, no pan, no zoom, no rotation. Nothing enters or leaves the frame. No people, no hands, no text.

Very slow, very calm, premium restaurant cinematography. Atmospheric light movement only.`,
  },
  {
    name: "Köfte Ekmek",
    source: "food-koefte-ekmek.webp",
    output: "koefte-ambient.mp4",
    prompt: HOT(
      "a Turkish Köfte Ekmek sandwich in a sesame roll, fresh off the grill",
      "The melted cheese over the köfte stays glossy and holds its shape."
    ),
  },
  {
    name: "Ayvalık Toast",
    source: "food-ayvalik-toast.webp",
    output: "ayvalik-ambient.mp4",
    prompt: HOT(
      "a hot pressed Turkish Ayvalık Toast with stretched strands of melted cheese",
      "The cheese strands stay exactly as they are and do not stretch further, sag or move."
    ),
  },
  {
    name: "Tantuni",
    source: "food-tantuni.webp",
    output: "tantuni-ambient.mp4",
    prompt: HOT(
      "Turkish Tantuni, chopped spiced meat plated along a long dark dish with yogurt and chilli oil",
      "The yogurt and the chilli oil stay exactly where they are and do not run or spread."
    ),
  },
];

for (const clip of CLIPS) {
  const dest = path.join(PATHS.generatedVideos, clip.output);
  if (existsSync(dest)) {
    console.log(`\n=== ${clip.name} === already generated, skipping`);
    continue;
  }

  console.log(`\n=== ${clip.name} ===`);
  const result = await generateVideoFromImage({
    imagePath: path.join(PATHS.generatedImages, clip.source),
    prompt: clip.prompt,
    outputFileName: clip.output,
    duration: "5",
    generateAudio: false,
  });
  console.log(`Saved: ${result.localPath}`);
}
