# Content Sources — Authority Reference

This file documents which inputs are treated as authoritative for `restaurant-info.md` and `menu.md`, and which are reference-only.

## Authoritative (primary source of truth)

- **`Willkommen bei No. 35 Original Izmir Streetfood in Hamburg Barmbek Nord - Türkisches Restaurant und vieles mehr!.pdf`** (project root)
  A PDF export of the restaurant's existing restablo.de online-ordering page. This is the **only** source used for `menu.md` (all product names, descriptions, prices) and for the verified fields in `restaurant-info.md` (name, owner, address, phone, email, "beliebt" markers, legal/pricing footnotes).
  Note: `assets/reference/menu.pdf` is **not** a usable file — it turned out to be an empty directory (0 bytes, no contents), not an actual PDF. It was superseded by the root-level PDF above.

- **`image.png`** (project root)
  The official No.35 logo (circular badge, mustached-chef mark, "ORIGINAL İZMİR STREETFOOD" ring text). Authoritative brand asset — use as-is per `creative-direction.md`.

## Reference-only (not authoritative for facts, usable for mood/context)

- **`image copy.png`, `image copy 2.png`, `image copy 3.png`, `image copy 4.png`, `image copy 5.png`** (project root)
  Food photos of Kumru/köfte flatbread, midye dolma (stuffed mussels), döner dürüm, and stacked deli sandwiches. These are phone screenshots of Instagram Reels/Stories (visible "Add comment…" UI chrome), not clean production photography. Per `creative-direction.md`: treated as **reference material only** — not to be published as final site imagery, and not a stand-in for a confirmed Instagram account. Final visuals will be AI-generated later via fal.ai.

- **`taste-skill/`** (cloned repository)
  A library of AI agent design-skill instruction files (frontend "anti-slop" rules, dial-based design system guidance). This governs *how* the site should later be built/styled — it contains no restaurant-specific facts and is not a content source.

## Explicitly not invented

Per project direction, the following were left blank/flagged in `restaurant-info.md` rather than guessed, because no verified source was available:
- Opening hours
- Google Maps place URL (the source PDF embeds an OpenStreetMap/Leaflet map, not a Google Maps link)
- Instagram URL/handle
- Any standalone drinks menu with individual prices (source only shows soft drinks bundled inside "Menü" combos)
- Per-dish allergen/ingredient data (source defers this to a per-item detail view that was not captured)
