import path from "node:path";
import { generateVideoFromImage } from "../generate-video.mjs";
import { PATHS } from "../config.mjs";

/*
  The single moving background scene, used behind the hero.
  Water is the one environment where continuous motion reads as real rather
  than as an AI effect, which is why this is the scene that gets a video.

  Loaded well after first paint (see BackgroundScenes.jsx) so it never blocks
  the hero image as LCP.
*/
const SOURCE = path.join(PATHS.generatedImages, "scene-coast.webp");

const PROMPT = `Extremely subtle, slow, continuous cinematic footage of calm Aegean sea water. The small waves roll and glitter very gently. Sunlight shimmers softly across the surface. The distant coastline and sky stay completely still.

Locked-off tripod shot. No camera movement at all, no push-in, no pan, no zoom. Nothing enters or leaves the frame. No people, no boats, no birds, no text.

Very slow, very calm, almost meditative. Natural water motion only.`;

const result = await generateVideoFromImage({
  imagePath: SOURCE,
  prompt: PROMPT,
  outputFileName: "coast-ambient.mp4",
  duration: "5",
  generateAudio: false,
});

console.log(`\nSaved : ${result.localPath}`);
console.log(`Remote: ${result.remoteUrl}`);
