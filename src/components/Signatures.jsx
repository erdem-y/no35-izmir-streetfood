import { Reveal } from "./Reveal";
import { ProductSelector } from "./ProductSelector";

/*
  Spezialitäten.

  The showcase carries the full featured range, including Kokorec, which no
  longer has a section of its own. All product content lives in
  src/data/products.js.
*/
export function Signatures() {
  return (
    <section
      id="spezialitaeten"
      data-scene="spezialitaeten"
      className="relative mx-auto max-w-[1400px] px-4 py-24 sm:px-6 lg:px-10 lg:py-32"
    >
      {/* Localised wash so the heading holds contrast without veiling the street. */}
            <Reveal className="relative">
        <p className="on-photo-type text-[11px] font-semibold tracking-[0.2em] text-accent-on-photo uppercase">
          Unsere Spezialitäten
        </p>
        <h2 className="on-photo-type mt-4 max-w-[22ch] font-display text-4xl leading-[1.06] font-semibold tracking-tight text-on-photo sm:text-5xl">
          Die Gerichte, für die Izmir bekannt ist.
        </h2>
      </Reveal>

      <Reveal delay={0.08}>
        <ProductSelector />
      </Reveal>
    </section>
  );
}
