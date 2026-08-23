# fal.ai asset-generation scripts

Utilities for generating brand imagery and video for No.35 Original İzmir
Streetfood through fal.ai. Nothing here runs automatically — every script is
invoked explicitly.

## Setup

```bash
npm install
cp .env.example .env
# edit .env and set FAL_KEY=your-fal-api-key
npm run fal:test
```

`npm run fal:test` only authenticates and uploads a tiny probe file to fal's
storage — it does **not** call Nano Banana 2 or Kling, so it costs nothing.

## Models

| Purpose | Endpoint |
|---|---|
| Image generation/editing from a reference photo | `fal-ai/nano-banana-2/edit` |
| Text-only image generation (no reference, fallback) | `fal-ai/nano-banana-2` |
| Image-to-video | `fal-ai/kling-video/v3/pro/image-to-video` |

## Scripts

- **`config.mjs`** — loads `.env`, exposes `FAL_KEY`, model endpoint IDs, and standard output paths (`generated/images/`, `generated/videos/`).
- **`client.mjs`** — shared fal client setup, local-file upload (`uploadLocalFile`), remote-file download (`downloadToFile`), and queue-log printing.
- **`generate-image.mjs`** — `generateImage()`: uploads reference image(s) and calls Nano Banana 2 (`/edit` when references are given, plain text-to-image otherwise). Saves the result to `generated/images/`.
- **`generate-video.mjs`** — `generateVideoFromImage()`: calls Kling 3.0 Pro image-to-video from a local image path or a remote URL. Saves the result to `generated/videos/`.
- **`pipeline.mjs`** — `runImageToVideoPipeline()`: chains the two above (reference photo → Nano Banana 2 image → Kling video) in one call.
- **`test-connection.mjs`** — connection/auth check only, no generation.

## CLI usage (once you're ready to actually generate assets)

```bash
# Image only, from a reference photo
node scripts/fal/generate-image.mjs \
  --ref "assets/reference/kokorec.jpg" \
  --prompt "..." \
  --out kokorec-hero.png

# Video only, from an already-generated image
node scripts/fal/generate-video.mjs \
  --image generated/images/kokorec-hero.png \
  --prompt "..." \
  --out kokorec-hero.mp4 \
  --duration 5

# Full pipeline: reference photo -> image -> video
node scripts/fal/pipeline.mjs \
  --ref "assets/reference/kokorec.jpg" \
  --image-prompt "..." \
  --video-prompt "..." \
  --name kokorec-hero
```

## Security

- `FAL_KEY` is read only from the environment (`.env`, gitignored, or a real
  shell export). It is never hardcoded and never sent to a browser — these
  scripts are Node-only/server-side.
- `.env` is gitignored; `.env.example` documents the required variable with
  no value.
