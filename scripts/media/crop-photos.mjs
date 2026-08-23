import sharp from "sharp";
import path from "node:path";
import { mkdirSync } from "node:fs";

/*
  Prepares the restaurant's own photographs for the site.

  These are phone captures from social media, so every one carries app chrome
  (the "Add comment..." bar) and some carry a caption burned into the frame.
  Each crop below removes that UI and frames the food, without rescaling or
  distorting the dish itself.

  A gentle grade is applied: a small saturation and brightness lift plus a
  light sharpen, to compensate for phone-video compression. Deliberately
  restrained, the point is that these still read as real photographs.

  Originals are never modified.
*/
const OUT = path.resolve("public/media");
mkdirSync(OUT, { recursive: true });

const PHOTOS = [
  {
    label: "Restaurant interior and grill (hero)",
    src: "image copy 9.png",
    out: "photo-restaurant.webp",
    /* Full frame minus the comment bar: keeps the menu boards, the grill,
       the counter and the street window that prove the place is real. */
    region: { left: 0, top: 0, width: 942, height: 1866 },
    grade: { saturation: 1.16, brightness: 1.18 },
  },
  {
    label: "Köfte Ekmek",
    src: "image copy 7.png",
    out: "photo-koefte-ekmek.webp",
    region: { left: 0, top: 500, width: 700, height: 745 },
    grade: { saturation: 1.08, brightness: 1.04 },
  },
  {
    label: "Ayvalik Toast",
    src: "image copy 6.png",
    /* Cropped below the eye line: the dish is the subject, and the person
       who happens to be holding it should not be identifiable on a public
       marketing page. */
    out: "photo-ayvalik-toast.webp",
    region: { left: 0, top: 660, width: 920, height: 620 },
    grade: { saturation: 1.06, brightness: 1.05 },
  },
  {
    label: "Tantuni",
    src: "image copy 8.png",
    /* Stops above the burned-in "Das Beste" caption and the comment bar. */
    out: "photo-tantuni.webp",
    region: { left: 40, top: 150, width: 860, height: 1150 },
    grade: { saturation: 1.08, brightness: 1.05 },
  },
];

console.log("Cropping restaurant photographs");
console.log("===============================");

for (const photo of PHOTOS) {
  const meta = await sharp(photo.src).metadata();
  const region = {
    left: photo.region.left,
    top: photo.region.top,
    width: Math.min(photo.region.width, meta.width - photo.region.left),
    height: Math.min(photo.region.height, meta.height - photo.region.top),
  };

  const dest = path.join(OUT, photo.out);

  await sharp(photo.src)
    .extract(region)
    .modulate({ saturation: photo.grade.saturation, brightness: photo.grade.brightness })
    .sharpen({ sigma: 0.6 })
    .webp({ quality: 86 })
    .toFile(dest);

  const out = await sharp(dest).metadata();
  console.log(
    `${photo.label.padEnd(34)} ${meta.width}x${meta.height} -> ${out.width}x${out.height}  ${photo.out}`
  );
}

console.log("\nOriginals untouched.");
