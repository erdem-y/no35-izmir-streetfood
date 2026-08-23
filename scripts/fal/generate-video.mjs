import path from "node:path";
import { pathToFileURL } from "node:url";
import { configureFal, downloadToFile, logQueueUpdate, uploadLocalFile } from "./client.mjs";
import { MODELS, PATHS } from "./config.mjs";
import { parseArgs } from "./cli-utils.mjs";

/**
 * Generates a video from a single starting image with Kling 3.0 Pro
 * (image-to-video). Accepts either a local image path (uploaded to fal
 * storage first) or an already-remote image URL (e.g. output of
 * generateImage()).
 *
 * @param {object} opts
 * @param {string} [opts.imagePath] - local path to the starting image
 * @param {string} [opts.imageUrl] - remote URL to the starting image (skips upload)
 * @param {string} [opts.prompt]
 * @param {string} opts.outputFileName - saved under generated/videos/
 * @param {string} [opts.duration="5"] - seconds, "3".."15"
 * @param {boolean} [opts.generateAudio=true]
 */
export async function generateVideoFromImage({
  imagePath,
  imageUrl,
  prompt,
  outputFileName,
  duration = "5",
  generateAudio = true,
}) {
  if (!imagePath && !imageUrl) {
    throw new Error("generateVideoFromImage requires imagePath or imageUrl.");
  }
  if (!outputFileName) throw new Error("generateVideoFromImage requires outputFileName.");

  const client = configureFal();

  const startImageUrl = imageUrl ?? (await uploadLocalFile(imagePath));

  console.log(`  [fal] endpoint: ${MODELS.VIDEO_IMAGE_TO_VIDEO}`);
  const result = await client.subscribe(MODELS.VIDEO_IMAGE_TO_VIDEO, {
    input: {
      start_image_url: startImageUrl,
      ...(prompt ? { prompt } : {}),
      duration,
      generate_audio: generateAudio,
    },
    logs: true,
    onQueueUpdate: logQueueUpdate,
  });

  const video = result.data?.video;
  if (!video?.url) throw new Error("Kling 3.0 Pro returned no video.");

  const destPath = path.join(PATHS.generatedVideos, outputFileName);
  await downloadToFile(video.url, destPath);

  return { localPath: destPath, remoteUrl: video.url, raw: result.data };
}

// CLI entry point:
//   node scripts/fal/generate-video.mjs --image generated/images/foo.png --prompt "..." --out foo.mp4 --duration 5
async function runCli() {
  const args = parseArgs(process.argv.slice(2));
  if ((!args.image && !args["image-url"]) || !args.out) {
    console.error(
      'Usage: node scripts/fal/generate-video.mjs (--image <local path> | --image-url <url>) --prompt "..." --out <filename.mp4> [--duration 5]'
    );
    process.exitCode = 1;
    return;
  }

  const result = await generateVideoFromImage({
    imagePath: args.image,
    imageUrl: args["image-url"],
    prompt: args.prompt,
    outputFileName: args.out,
    duration: args.duration ?? "5",
  });

  console.log(`\nSaved: ${result.localPath}`);
  console.log(`Remote URL: ${result.remoteUrl}`);
}

if (import.meta.url === pathToFileURL(process.argv[1] ?? "").href) {
  runCli().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
}
