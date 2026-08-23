import { pathToFileURL } from "node:url";
import { generateImage } from "./generate-image.mjs";
import { generateVideoFromImage } from "./generate-video.mjs";
import { parseArgs, toArray } from "./cli-utils.mjs";

/**
 * Full reference-image -> Nano Banana 2 image -> Kling 3.0 Pro video chain.
 *
 * @param {object} opts
 * @param {string[]} opts.referenceImagePaths - local reference photo(s)
 * @param {string} opts.imagePrompt - prompt for the Nano Banana 2 step
 * @param {string} [opts.videoPrompt] - prompt for the Kling image-to-video step
 * @param {string} opts.baseName - output files become `${baseName}.png` / `${baseName}.mp4`
 * @param {string} [opts.duration="5"]
 * @param {string} [opts.aspectRatio="auto"]
 * @param {string} [opts.resolution="1K"]
 */
export async function runImageToVideoPipeline({
  referenceImagePaths,
  imagePrompt,
  videoPrompt,
  baseName,
  duration = "5",
  aspectRatio = "auto",
  resolution = "1K",
}) {
  if (!baseName) throw new Error("runImageToVideoPipeline requires baseName.");

  console.log(`[1/2] Nano Banana 2 — generating image from ${referenceImagePaths.length} reference(s)...`);
  const image = await generateImage({
    referenceImagePaths,
    prompt: imagePrompt,
    outputFileName: `${baseName}.png`,
    aspectRatio,
    resolution,
  });
  console.log(`  -> saved ${image.localPath}`);

  console.log(`\n[2/2] Kling 3.0 Pro — generating video from the image above...`);
  const video = await generateVideoFromImage({
    imagePath: image.localPath,
    prompt: videoPrompt,
    outputFileName: `${baseName}.mp4`,
    duration,
  });
  console.log(`  -> saved ${video.localPath}`);

  return { image, video };
}

// CLI entry point:
//   node scripts/fal/pipeline.mjs --ref assets/reference/foo.jpg --image-prompt "..." --video-prompt "..." --name foo
async function runCli() {
  const args = parseArgs(process.argv.slice(2));
  if (!args["image-prompt"] || !args.name) {
    console.error(
      'Usage: node scripts/fal/pipeline.mjs --ref <path> [--ref <path> ...] --image-prompt "..." [--video-prompt "..."] --name <base-name> [--duration 5]'
    );
    process.exitCode = 1;
    return;
  }

  const result = await runImageToVideoPipeline({
    referenceImagePaths: toArray(args.ref),
    imagePrompt: args["image-prompt"],
    videoPrompt: args["video-prompt"],
    baseName: args.name,
    duration: args.duration ?? "5",
  });

  console.log(`\nImage: ${result.image.localPath}`);
  console.log(`Video: ${result.video.localPath}`);
}

if (import.meta.url === pathToFileURL(process.argv[1] ?? "").href) {
  runCli().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
}
