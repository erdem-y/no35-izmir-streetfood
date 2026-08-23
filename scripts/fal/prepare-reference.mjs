import sharp from "sharp";
import path from "node:path";
import { mkdir } from "node:fs/promises";
import { pathToFileURL } from "node:url";
import { PATHS } from "./config.mjs";
import { parseArgs } from "./cli-utils.mjs";

/**
 * The supplied food photos are phone screenshots of Instagram Reels/Stories:
 * they carry app UI chrome, a hand, table clutter, drinks and packaging that
 * must never reach the image model. The strongest way to enforce "use the
 * food only" is physical — crop the frame down to the dish itself so the
 * surrounding scene is not in the model's input at all.
 *
 * Two modes:
 *   - region crop (left/top/width/height): isolate one dish from a scene
 *   - bottom crop (cropBottomPx): just strip the Instagram UI bar
 *
 * @param {object} opts
 * @param {string} opts.sourcePath
 * @param {string} opts.outputFileName - written into assets/reference/
 * @param {{left:number,top:number,width:number,height:number}} [opts.region]
 * @param {number} [opts.cropBottomPx]
 * @param {number} [opts.upscaleWidth] - optional resize for a larger model input
 */
export async function prepareReference({
  sourcePath,
  outputFileName,
  region,
  cropBottomPx,
  upscaleWidth,
}) {
  const image = sharp(sourcePath);
  const { width, height } = await image.metadata();

  let pipeline = image;
  let resulting = { width, height };

  if (region) {
    const { left, top } = region;
    const w = Math.min(region.width, width - left);
    const h = Math.min(region.height, height - top);
    if (left < 0 || top < 0 || w <= 0 || h <= 0) {
      throw new Error(`Invalid region for a ${width}x${height} image.`);
    }
    pipeline = pipeline.extract({ left, top, width: w, height: h });
    resulting = { width: w, height: h };
  } else if (cropBottomPx) {
    const h = height - cropBottomPx;
    if (h <= 0) throw new Error(`cropBottomPx (${cropBottomPx}) removes the whole image.`);
    pipeline = pipeline.extract({ left: 0, top: 0, width, height: h });
    resulting = { width, height: h };
  }

  if (upscaleWidth) {
    const scale = upscaleWidth / resulting.width;
    pipeline = pipeline.resize({ width: upscaleWidth, kernel: "lanczos3" });
    resulting = { width: upscaleWidth, height: Math.round(resulting.height * scale) };
  }

  await mkdir(PATHS.referenceDir, { recursive: true });
  const destPath = path.join(PATHS.referenceDir, outputFileName);
  await pipeline.toFile(destPath);

  return { destPath, originalSize: { width, height }, resultingSize: resulting };
}

async function runCli() {
  const args = parseArgs(process.argv.slice(2));
  if (!args.src || !args.out) {
    console.error(
      "Usage: node scripts/fal/prepare-reference.mjs --src <path> --out <file.png>\n" +
        "         [--left N --top N --width N --height N]   (isolate a region)\n" +
        "         [--crop-bottom N]                          (strip UI bar)\n" +
        "         [--upscale-width N]"
    );
    process.exitCode = 1;
    return;
  }

  const hasRegion =
    args.left !== undefined && args.top !== undefined && args.width !== undefined && args.height !== undefined;

  const result = await prepareReference({
    sourcePath: args.src,
    outputFileName: args.out,
    region: hasRegion
      ? {
          left: Number(args.left),
          top: Number(args.top),
          width: Number(args.width),
          height: Number(args.height),
        }
      : undefined,
    cropBottomPx: args["crop-bottom"] ? Number(args["crop-bottom"]) : undefined,
    upscaleWidth: args["upscale-width"] ? Number(args["upscale-width"]) : undefined,
  });

  console.log(
    `${result.originalSize.width}x${result.originalSize.height} -> ${result.resultingSize.width}x${result.resultingSize.height}`
  );
  console.log(`Saved: ${result.destPath}`);
}

if (import.meta.url === pathToFileURL(process.argv[1] ?? "").href) {
  runCli().catch((error) => {
    console.error(error);
    process.exitCode = 1;
  });
}
