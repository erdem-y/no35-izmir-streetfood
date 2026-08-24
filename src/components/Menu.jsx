import { useState } from "react";
import { motion, useReducedMotion } from "motion/react";
import { Reveal } from "./Reveal";
import { menuCategories } from "../data/menu";
import { business, MENU_SUFFIX } from "../data/business";

/*
  Speisekarte.

  Menu data is untouched: same categories, products, prices and descriptions,
  still verified verbatim against restaurant/menu.md by the QA script.

  V3 reworks only the presentation. The single dark block of card rows is
  replaced by an editorial restaurant menu: name and price on one baseline
  joined by a faint leader, description beneath, menu option beneath that,
  and generous vertical rhythm. Rows sit on the environment with hairline
  separators instead of each being its own container.
*/
export function Menu() {
  const [activeId, setActiveId] = useState(menuCategories[0].id);
  const reduce = useReducedMotion();

  const active = menuCategories.find((c) => c.id === activeId) ?? menuCategories[0];

  return (
    <section
      id="speisekarte"
      data-scene="speisekarte"
      className="relative mx-auto max-w-[1400px] px-4 py-16 sm:px-6 sm:py-24 lg:px-10 lg:py-32"
    >
            <Reveal className="relative">
        <h2 className="on-photo-type max-w-[20ch] font-display text-[2rem] leading-[1.08] font-semibold tracking-tight text-on-photo sm:text-5xl sm:leading-[1.06]">
          Die ganze Speisekarte.
        </h2>
        <p className="on-photo-type mt-5 max-w-[52ch] text-[16px] leading-relaxed text-on-photo-soft">
          Jedes Gericht gibt es einzeln oder als Menü mit Pommes frites und einem
          Softdrink.
        </p>
      </Reveal>

      <Reveal delay={0.08}>
        <div
          role="tablist"
          aria-label="Kategorien der Speisekarte"
          className="mt-10 flex snap-x gap-2 overflow-x-auto pb-2"
        >
          {menuCategories.map((category) => {
            const selected = category.id === activeId;
            return (
              <button
                key={category.id}
                type="button"
                role="tab"
                id={`tab-${category.id}`}
                aria-selected={selected}
                aria-controls={`panel-${category.id}`}
                onClick={() => setActiveId(category.id)}
                className={`shrink-0 snap-start rounded-full border px-5 py-2.5 text-[14px] font-semibold whitespace-nowrap transition-all ${
                  selected
                    ? "border-accent-solid bg-accent-solid text-on-accent shadow-[0_6px_18px_rgb(13_106_142/0.35)]"
                    : "glass border-glass-border text-on-photo-soft hover:text-on-photo"
                }`}
              >
                {category.name}
              </button>
            );
          })}
        </div>
      </Reveal>

      <Reveal delay={0.14}>
        <motion.div
          key={active.id}
          role="tabpanel"
          id={`panel-${active.id}`}
          aria-labelledby={`tab-${active.id}`}
          initial={reduce ? false : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="glass mt-6 rounded-card px-4 py-2 sm:mt-8 sm:px-9 sm:py-6 lg:px-12 lg:py-8"
        >
          <div className="grid gap-x-16 lg:grid-cols-2">
            {active.items.map((item) => (
              <MenuRow key={item.name} item={item} />
            ))}
          </div>
        </motion.div>
      </Reveal>

      <p className="on-photo-type mt-8 max-w-[60ch] text-[13px] leading-relaxed text-on-photo-soft">
        {business.legalNote} {business.allergenNote}
      </p>
    </section>
  );
}

function MenuRow({ item }) {
  return (
    /*
      Mobile is tuned for density, desktop is unchanged from the approved
      layout. On small screens the name drops a step in size so it holds one
      line, the leader collapses, vertical padding tightens and the
      description goes italic to sit clearly under the name. From `sm` up
      every value returns to the approved desktop scale.
    */
    <article className="border-b border-[rgb(255_255_255/0.12)] py-4 last:border-b-0 sm:py-7">
      {/*
        Name and price share a baseline, joined by a faint dotted leader. This
        is what makes the price scannable down the column without boxing every
        dish into its own card.
      */}
      <div className="flex items-baseline gap-2 sm:gap-3">
        <h3 className="min-w-0 font-display text-[15px] leading-snug font-semibold tracking-tight text-on-photo sm:text-[19px] sm:leading-tight">
          {item.name}
        </h3>

        {item.popular && (
          <span className="shrink-0 rounded-full bg-accent-on-photo/18 px-1.5 py-0.5 text-[9px] font-bold tracking-[0.08em] text-accent-on-photo uppercase sm:px-2 sm:text-[10px] sm:tracking-[0.1em]">
            Beliebt
          </span>
        )}

        <span
          aria-hidden="true"
          className="mb-1 hidden min-w-6 flex-1 border-b border-dotted border-[rgb(255_255_255/0.28)] sm:block"
        />

        <span className="ml-auto shrink-0 font-display text-[15px] font-semibold text-on-photo tabular-nums sm:ml-0 sm:text-[19px]">
          {item.price} €
        </span>
      </div>

      {item.desc && (
        <p className="mt-1 max-w-[52ch] text-[12.5px] leading-snug text-on-photo-soft italic sm:mt-2 sm:text-[14px] sm:leading-relaxed sm:not-italic">
          {item.desc}
        </p>
      )}

      {item.menuPrice && (
        <p className="mt-1.5 text-[11.5px] font-medium text-on-photo-soft sm:mt-2.5 sm:text-[12.5px]">
          {MENU_SUFFIX}
          <span className="ml-1.5 font-semibold text-accent-on-photo tabular-nums sm:ml-2">
            {item.menuPrice} €
          </span>
        </p>
      )}
    </article>
  );
}
