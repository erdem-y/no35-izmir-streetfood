import { fal } from "@fal-ai/client";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { FAL_KEY } from "./config.mjs";

/**
 * Throws a clear, actionable error if FAL_KEY is missing. Called before any
 * network request so failures happen immediately, not mid-generation.
 */
export function assertFalKey() {
  if (!FAL_KEY) {
    throw new Error(
      "FAL_KEY is not set.\n" +
        "  1. Copy .env.example to .env\n" +
        "  2. Add your fal.ai API key: FAL_KEY=your-key-here\n" +
        "  (or export FAL_KEY in your shell environment instead of using .env)"
    );
  }
}

let configured = false;

/** Configures the shared fal client exactly once and returns it. */
export function configureFal() {
  assertFalKey();
  if (!configured) {
    fal.config({ credentials: FAL_KEY });
    configured = true;
  }
  return fal;
}

const MIME_BY_EXT = {
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".gif": "image/gif",
};

/**
 * Uploads a local file to fal's storage and returns the public URL fal
 * models expect as input (e.g. image_urls, start_image_url).
 */
export async function uploadLocalFile(filePath) {
  configureFal();
  const buffer = await readFile(filePath);
  const ext = path.extname(filePath).toLowerCase();
  const type = MIME_BY_EXT[ext] ?? "application/octet-stream";
  const file = new File([buffer], path.basename(filePath), { type });
  return fal.storage.upload(file);
}

/** Downloads a remote URL (fal-generated output) to a local file path. */
export async function downloadToFile(url, destPath) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`Failed to download ${url}: ${response.status} ${response.statusText}`);
  }
  const buffer = Buffer.from(await response.arrayBuffer());
  await mkdir(path.dirname(destPath), { recursive: true });
  await writeFile(destPath, buffer);
  return destPath;
}

/** Shared onQueueUpdate handler: prints fal's in-flight logs to the console. */
export function logQueueUpdate(update) {
  console.log(`  [fal] status: ${update.status}`);
  if (Array.isArray(update.logs)) {
    for (const log of update.logs) {
      if (log?.message) console.log(`  [fal] ${log.message}`);
    }
  }
}
