import { existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Project root = two levels up from scripts/fal/
export const PROJECT_ROOT = path.resolve(__dirname, "../..");

// Load .env (if present) into process.env before anything reads FAL_KEY.
// Node 20.6+/24 ships process.loadEnvFile natively — no extra dependency needed.
const envPath = path.join(PROJECT_ROOT, ".env");
if (existsSync(envPath)) {
  process.loadEnvFile(envPath);
}

export const FAL_KEY = process.env.FAL_KEY ?? "";

// Model endpoint IDs (fal.ai)
export const MODELS = {
  // Reference-image-driven generation/editing (what we use when a local
  // reference photo is supplied, per the project's asset-generation brief).
  IMAGE_EDIT: "fal-ai/nano-banana-2/edit",
  // Pure text-to-image fallback (no reference image supplied).
  IMAGE_TEXT_TO_IMAGE: "fal-ai/nano-banana-2",
  // Image-to-video.
  VIDEO_IMAGE_TO_VIDEO: "fal-ai/kling-video/v3/pro/image-to-video",
};

export const PATHS = {
  root: PROJECT_ROOT,
  referenceDir: path.join(PROJECT_ROOT, "assets", "reference"),
  logo: path.join(PROJECT_ROOT, "image.png"),
  generatedImages: path.join(PROJECT_ROOT, "generated", "images"),
  generatedVideos: path.join(PROJECT_ROOT, "generated", "videos"),
};
