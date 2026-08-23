import path from "node:path";
import { pathToFileURL } from "node:url";
import { configureFal, downloadToFile, logQueueUpdate, uploadLocalFile } from "./client.mjs";
import { MODELS, PATHS } from "./config.mjs";
import { parseArgs, toArray } from "./cli-utils.mjs";

/**
 * Generates an image with Nano Banana 2. If one or more local reference
 * images are supplied, uploads them and calls the /edit (image-to-image)
 * endpoint so the reference material actually steers the output — a bare
 * text prompt would ignore the reference photos entirely.
 *
 * @param {object} opts
 * @param {string[]} [opts.referenceImagePaths] - local paths to reference images
 * @param {string} opts.prompt
 * @param {string} opts.outputFileName - saved under generated/images/
 * @param {string} [opts.aspectRatio="auto"]
 * @param {string} [opts.resolution="1K"]
 * @param {string} [opts.outputFormat="png"]
 */
export async function generateImage({
  referenceImagePaths = [],
  prompt,
  outputFileName,
  aspectRatio = "auto",
  resolution = "1K",
  outputFormat = "png",
}) {
  if (!prompt) throw new Error("generateImage requires a prompt.");
  if (!outputFileName) throw new Error("generateImage requires outputFileName.");

  const client = configureFal();

  const imageUrls = [];
  for (const refPath of referenceImagePaths) {
    console.log(`  [fal] uploading reference: ${refPath}`);
    imageUrls.push(await uploadLocalFile(refPath));
  }

  const endpoint = imageUrls.length > 0 ? MODELS.IMAGE_EDIT : MODELS.IMAGE_TEXT_TO_IMAGE;
  console.log(`  [fal] endpoint: ${endpoint}`);

  const result = await client.subscribe(endpoint, {
    input: {
      prompt,
      ...(imageUrls.length > 0 ? { image_urls: imageUrls } : {}),
      aspect_ratio: aspectRatio,
      resolution,
      output_format: outputFormat,
    },
    logs: true,
    onQueueUpdate: logQueueUpdate,
  });

  const [image] = result.data?.images ?? [];
  if (!image?.url) throw new Error("Nano Banana 2 returned no image.");

  const destPath = path.join(PATHS.generatedImages, outputFileName);
  await downloadToFile(image.url, destPath);

  return { localPath: destPath, remoteUrl: image.url, endpoint, raw: result.data };
}

// CLI entry point:
//   node scripts/fal/generate-image.mjs --ref assets/reference/foo.jpg --prompt "..." --out foo.png
async function runCli() {
  const args = parseArgs(process.argv.slice(2));
  if (!args.prompt || !args.out) {
    console.error(
      'Usage: node scripts/fal/generate-image.mjs --ref <path> [--ref <path> ...] --prompt "..." --out <filename.png> [--aspect-ratio 16:9] [--resolution 2K]'
    );
    process.exitCode = 1;
    return;
  }

  const result = await generateImage({
    referenceImagePaths: toArray(args.ref),
    prompt: args.prompt,
    outputFileName: args.out,
    aspectRatio: args["aspect-ratio"] ?? "auto",
    resolution: args.resolution ?? "1K",
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
