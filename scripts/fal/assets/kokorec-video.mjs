import path from "node:path";
import { generateVideoFromImage } from "../generate-video.mjs";
import { PATHS } from "../config.mjs";

/**
 * Production asset: the site's one cinematic ambient video.
 *
 * Source is the generated Kokoreç still rather than the Kumru hero, so the
 * video adds a second visual moment instead of restating the hero. Kokoreç is
 * also the most motion-friendly of the three dishes (rising steam, charcoal
 * warmth).
 *
 * Audio is disabled: this plays muted as an ambient background, so generating
 * a soundtrack would be wasted.
 */
const SOURCE = path.join(PATHS.generatedImages, "kokorec.webp");

const PROMPT = `Slow, subtle, cinematic commercial food cinematography. A very gentle, smooth push-in toward the freshly grilled kokoreç on the warm flatbread. Delicate steam rises and drifts naturally. Warm late-afternoon Aegean light shifts almost imperceptibly across the stone surface. The food stays completely still and appetising.

Extremely subtle and premium. No camera shake, no fast movement, no cuts, no zoom-out. Nothing enters or leaves the frame. No people, no hands, no text, no logos.`;

const result = await generateVideoFromImage({
  imagePath: SOURCE,
  prompt: PROMPT,
  outputFileName: "kokorec-ambient.mp4",
  duration: "5",
  generateAudio: false,
});

console.log(`\nSaved : ${result.localPath}`);
console.log(`Remote: ${result.remoteUrl}`);
