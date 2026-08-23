import { useCallback, useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { CaretLeft, CaretRight } from "@phosphor-icons/react";
import { featuredProducts } from "../data/products";
import { ProductMedia } from "./ProductMedia";

/*
  Featured product showcase, built as a character-select rather than a
  carousel: one dominant centre item with its neighbours pushed back in
  scale, opacity, blur and depth.

  Driven entirely by featuredProducts, so the list can grow to the full
  range without touching this file. Only the two nearest neighbours are
  rendered visible; everything else is parked transparent, which keeps the
  DOM stable and the animation cost flat as the list grows.

  Interaction: arrows, keyboard, direct selection by name, and horizontal
  drag on touch. Under reduced motion the transitions become instant swaps.
*/
const SPREAD = 70; // horizontal distance between neighbours, in % of card width

export function ProductSelector() {
  const [active, setActive] = useState(0);
  const reduce = useReducedMotion();
  const count = featuredProducts.length;

  const go = useCallback(
    (direction) => setActive((prev) => (prev + direction + count) % count),
    [count]
  );

  /* Shortest signed distance from the active item, so the list wraps evenly. */
  const offsetOf = (index) => {
    let delta = index - active;
    if (delta > count / 2) delta -= count;
    if (delta < -count / 2) delta += count;
    return delta;
  };

  const onKeyDown = (event) => {
    if (event.key === "ArrowLeft") {
      event.preventDefault();
      go(-1);
    } else if (event.key === "ArrowRight") {
      event.preventDefault();
      go(1);
    }
  };

  return (
    <div className="mt-12">
      <div
        role="group"
        aria-roledescription="Produktauswahl"
        aria-label="Unsere Spezialitäten"
        tabIndex={0}
        onKeyDown={onKeyDown}
        /*
          overflow-hidden is load-bearing. Neighbouring cards are translated
          past the container edge; without clipping they widen the document,
          which introduces horizontal page scroll and pushes the fixed
          navigation out of the viewport on small screens.
        */
        className="relative h-[28rem] w-full overflow-hidden sm:h-[32rem] lg:h-[37rem]"
      >
        {featuredProducts.map((product, index) => {
          const offset = offsetOf(index);
          const isCentre = offset === 0;
          const visible = Math.abs(offset) <= 1;

          return (
            <motion.article
              key={product.id}
              drag={isCentre ? "x" : false}
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.14}
              onDragEnd={(_, info) => {
                if (info.offset.x < -60) go(1);
                else if (info.offset.x > 60) go(-1);
              }}
              initial={false}
              animate={{
                x: `${-50 + offset * SPREAD}%`,
                scale: isCentre ? 1 : 0.72,
                opacity: visible ? (isCentre ? 1 : 0.4) : 0,
                filter: isCentre ? "blur(0px)" : "blur(6px)",
              }}
              transition={
                reduce ? { duration: 0 } : { type: "spring", stiffness: 185, damping: 26, mass: 0.9 }
              }
              style={{ zIndex: isCentre ? 3 : 2 - Math.abs(offset) }}
              aria-hidden={!isCentre}
              className={`glass absolute top-0 left-1/2 h-full w-[80%] overflow-hidden rounded-card sm:w-[64%] lg:w-[50%] ${
                isCentre ? "cursor-grab active:cursor-grabbing" : "pointer-events-none"
              }`}
            >
              <div className="relative h-[57%] w-full overflow-hidden sm:h-[61%]">
                <ProductMedia product={product} active={isCentre} eager={index === 0} />
              </div>

              <div className="flex h-[43%] flex-col justify-center gap-2 px-6 py-5 sm:h-[39%] sm:px-8">
                <p className="text-[12px] font-semibold tracking-wide text-accent-on-photo">
                  {product.tagline}
                </p>

                <div className="flex items-baseline justify-between gap-4">
                  <h3 className="font-display text-2xl leading-tight font-semibold tracking-tight text-on-photo sm:text-3xl">
                    {product.name}
                  </h3>
                  {/* No price is shown for a dish with no verified price in the menu data. */}
                  {product.priceFrom && (
                    <span className="shrink-0 font-display text-lg font-semibold text-accent-on-photo">
                      ab {product.priceFrom} €
                    </span>
                  )}
                </div>

                <p className="line-clamp-3 max-w-[46ch] text-[14px] leading-relaxed text-on-photo-soft">
                  {product.description}
                </p>
              </div>
            </motion.article>
          );
        })}

        <SelectorButton side="left" onClick={() => go(-1)} />
        <SelectorButton side="right" onClick={() => go(1)} />
      </div>

      {/* Direct selection and position indicator in one control. */}
      <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
        {featuredProducts.map((product, index) => {
          const selected = index === active;
          return (
            <button
              key={product.id}
              type="button"
              onClick={() => setActive(index)}
              aria-current={selected ? "true" : undefined}
              className={`rounded-full border px-4 py-2 text-[13px] font-semibold transition-colors ${
                selected
                  ? "border-accent-solid bg-accent-solid text-on-accent"
                  : "glass-soft border-glass-border text-on-photo-soft hover:text-on-photo"
              }`}
            >
              {product.name}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function SelectorButton({ side, onClick }) {
  const isLeft = side === "left";
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={isLeft ? "Vorherige Spezialität" : "Nächste Spezialität"}
      className={`glass glass-strong absolute top-1/2 z-10 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full text-on-photo transition-transform hover:scale-105 active:scale-95 ${
        isLeft ? "left-1 lg:left-4" : "right-1 lg:right-4"
      }`}
    >
      {isLeft ? <CaretLeft size={20} weight="bold" /> : <CaretRight size={20} weight="bold" />}
    </button>
  );
}
