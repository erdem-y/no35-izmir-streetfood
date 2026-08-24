import ffmpegPath from "ffmpeg-static";
import { execFileSync } from "node:child_process";
import { mkdirSync, statSync, readdirSync, existsSync } from "node:fs";
import path from "node:path";

/*
  Compresses the raw Kling output for web delivery.

  These clips are ambient background layers: they sit behind a scrim, are
  blurred by the glass panels above them, and are never the subject of
  attention. That tolerates far more compression than foreground video, so
  they are downscaled to 1280px at 24fps with no audio track.

  Writes into public/media/, leaving the originals in generated/videos/
  untouched as masters.
*/
const SOURCE_DIR = path.resolve("generated/videos");
const OUT_DIR = path.resolve("public/media");

const mb = (bytes) => (bytes / 1024 / 1024).toFixed(2);

mkdirSync(OUT_DIR, { recursive: true });

const files = readdirSync(SOURCE_DIR).filter((f) => f.endsWith(".mp4"));

if (!files.length) {
  console.log("No source videos found.");
  process.exit(0);
}

console.log("Video compression");
console.log("=================");

let before = 0;
let after = 0;

for (const file of files) {
  const src = path.join(SOURCE_DIR, file);
  const out = path.join(OUT_DIR, file);

  /*
    Never re-encode a clip that is already published. Re-running ffmpeg over
    an approved asset would produce a different file for no benefit, and the
    Kokoreç clip in particular is a locked reference. Delete the file in
    public/media first if a deliberate re-encode is ever wanted.
  */
  if (existsSync(out)) {
    console.log(`${file.padEnd(24)} already published, skipping`);
    continue;
  }

  const srcSize = statSync(src).size;
  before += srcSize;

  execFileSync(
    ffmpegPath,
    [
      "-y",
      "-i", src,
      "-vf", "scale=1280:-2,fps=24",
      "-c:v", "libx264",
      "-crf", "30",
      "-preset", "slow",
      "-profile:v", "high",
      "-pix_fmt", "yuv420p",
      "-an",
      "-movflags", "+faststart",
      out,
    ],
    { stdio: ["ignore", "ignore", "ignore"] }
  );

  const outSize = statSync(out).size;
  after += outSize;

  const saved = (100 * (1 - outSize / srcSize)).toFixed(1);
  console.log(`${file.padEnd(24)} ${mb(srcSize).padStart(7)} MB -> ${mb(outSize).padStart(6)} MB  (-${saved}%)`);
}

console.log("-".repeat(58));
console.log(`${"total".padEnd(24)} ${mb(before).padStart(7)} MB -> ${mb(after).padStart(6)} MB`);
