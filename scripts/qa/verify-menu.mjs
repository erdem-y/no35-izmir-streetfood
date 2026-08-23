import { readFileSync } from "node:fs";
import { menuCategories } from "../../src/data/menu.js";

/*
  Guards the menu against transcription drift.

  Every product name, description and price rendered on the site must appear
  verbatim in restaurant/menu.md, which is itself a verbatim transcription of
  the restaurant's published menu. If a price is ever edited in one place and
  not the other, this fails.
*/
const source = readFileSync("restaurant/menu.md", "utf8");

const escape = (s) => s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

let count = 0;
const problems = [];

for (const category of menuCategories) {
  for (const item of category.items) {
    count++;

    if (!source.includes(item.name)) {
      problems.push(`name not found in source: ${item.name}`);
      continue;
    }

    /*
      Anchor to the start of a markdown table row. A bare substring search
      would match the product name where it appears inside another item's
      description (for example "Pommes frites" inside the Kumru Box text).
    */
    const row = source.match(
      new RegExp(`^\\|\\s*${escape(item.name)}\\s*(\\u2605\\s*)?\\|[^\n]*`, "m")
    );

    if (!row) {
      problems.push(`no table row found for ${item.name}`);
    } else if (!row[0].includes(item.price)) {
      problems.push(`price ${item.price} not on the source row for ${item.name}`);
    }

    if (item.menuPrice && !source.includes(item.menuPrice)) {
      problems.push(`menu price ${item.menuPrice} not in source for ${item.name}`);
    }

    if (item.desc && !source.includes(item.desc)) {
      problems.push(`description drift for ${item.name}`);
    }
  }
}

const sourceCategories = (source.match(/^## /gm) || []).length - 1;

console.log("Menu integrity check");
console.log("====================");
console.log(`Categories on site   : ${menuCategories.length}`);
console.log(`Categories in source : ${sourceCategories}`);
console.log(`Products transcribed : ${count}`);

if (problems.length) {
  console.log(`\n${problems.length} issue(s):`);
  for (const p of problems) console.log(`  ${p}`);
  process.exit(1);
}

console.log("\nOK: every name, description and price matches restaurant/menu.md verbatim.");
