import path from "node:path";
import { generateVideoFromImage } from "../generate-video.mjs";
import { PATHS } from "../config.mjs";

/*
  Kokoreç is the one dish whose character IS movement, so it gets a real clip
  rather than a CSS overlay. Regenerated from the new food-set image, since
  the previous clip was built from the older photograph and no longer matches.
*/
const result = await generateVideoFromImage({
  imagePath: path.join(PATHS.generatedImages, "food-kokorec.webp"),
  prompt: `Slow, subtle, cinematic food cinematography. Real steam and a faint wisp of charcoal smoke rise gently from the hot grilled meat and drift slowly to one side. The warm side light shifts almost imperceptibly.

The food itself stays completely still. Locked-off tripod shot, no camera movement, no push-in, no pan, no zoom. Nothing enters or leaves the frame. No people, no hands, no text.

Very slow, very calm, premium. Natural steam motion only, never thick white smoke.`,
  outputFileName: "kokorec-ambient.mp4",
  duration: "5",
  generateAudio: false,
});

console.log(`\nSaved : ${result.localPath}`);
