import { fal } from "@fal-ai/client";
import { configureFal } from "./client.mjs";
import { FAL_KEY, MODELS } from "./config.mjs";

/**
 * Verifies the fal.ai integration is wired correctly WITHOUT spending on
 * image/video generation: it authenticates and uploads a tiny in-memory
 * probe file to fal's storage service. A successful upload proves FAL_KEY
 * is valid and the client can reach fal.ai — no Nano Banana 2 / Kling call
 * is made here.
 */
async function main() {
  console.log("fal.ai integration test");
  console.log("========================");
  console.log(`Image model : ${MODELS.IMAGE_EDIT} (reference-driven) / ${MODELS.IMAGE_TEXT_TO_IMAGE} (text-only fallback)`);
  console.log(`Video model : ${MODELS.VIDEO_IMAGE_TO_VIDEO}`);
  console.log("");

  if (!FAL_KEY) {
    console.log("FAL_KEY detected : NO");
    console.log("");
    console.log("Set your key before testing:");
    console.log("  1. Copy .env.example to .env");
    console.log("  2. Add: FAL_KEY=your-fal-api-key");
    console.log("  3. Re-run: npm run fal:test");
    process.exitCode = 1;
    return;
  }

  console.log(`FAL_KEY detected : YES (${FAL_KEY.slice(0, 4)}...${FAL_KEY.slice(-4)}, length ${FAL_KEY.length})`);

  // Shape-only sanity checks. These never print the key itself — only
  // structural facts about it — but catch the most common .env mistakes
  // (stray quotes, trailing whitespace/newline, missing "id:secret" colon)
  // that produce a syntactically "present" key the server still rejects.
  const hasSurroundingQuotes = /^["'].*["']$/.test(FAL_KEY);
  const hasStrayWhitespace = FAL_KEY !== FAL_KEY.trim();
  const hasColon = FAL_KEY.includes(":");
  if (hasSurroundingQuotes) {
    console.log('  warning: FAL_KEY appears wrapped in quote characters — remove them, .env values should not be quoted.');
  }
  if (hasStrayWhitespace) {
    console.log("  warning: FAL_KEY has leading/trailing whitespace or a newline — check for a stray space or blank line in .env.");
  }
  if (!hasColon) {
    console.log('  warning: FAL_KEY does not contain a ":" — fal.ai keys are normally in "key_id:key_secret" format. Double-check you copied the full key from the fal.ai dashboard.');
  }

  try {
    configureFal();
    const probe = new File([new Uint8Array([0x35])], "no35-connection-test.bin", {
      type: "application/octet-stream",
    });
    const url = await fal.storage.upload(probe);

    console.log("API connection test : SUCCESS");
    console.log(`Uploaded test probe to fal storage: ${url}`);
    console.log("");
    console.log("No image or video model was called — credentials are valid and the");
    console.log("pipeline is ready for actual asset generation when you give the go-ahead.");
  } catch (error) {
    console.log("API connection test : FAILED");
    // Surface the FULL diagnostic (status, requestId, JSON body) instead of
    // just error.message — for storage/upload/initiate failures fal.ai's
    // error body often has no top-level `.message`, so `.message` alone
    // collapses to the generic HTTP reason phrase (e.g. plain "Forbidden")
    // and hides the actual `detail`/`error_type` explaining WHY.
    if (error?.name === "ApiError" || error?.name === "ValidationError") {
      console.error(`  status     : ${error.status}`);
      console.error(`  requestId  : ${error.requestId || "(none returned)"}`);
      console.error(`  body       : ${safeStringify(error.body)}`);
    } else {
      console.error(error);
    }
    process.exitCode = 1;
  }
}

function safeStringify(value) {
  try {
    return JSON.stringify(value, null, 2);
  } catch {
    return String(value);
  }
}

main();
