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
      className="relative mx-auto max-w-[1400px] px-4 py-24 sm:px-6 lg:px-10 lg:py-32"
    >
            <Reveal className="relative">
        <h2 className="on-photo-type max-w-[20ch] font-display text-4xl leading-[1.06] font-semibold tracking-tight text-on-photo sm:text-5xl">
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
          className="glass mt-8 rounded-card px-5 py-4 sm:px-9 sm:py-6 lg:px-12 lg:py-8"
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
    <article className="border-b border-[rgb(255_255_255/0.12)] py-7 last:border-b-0">
      {/*
        Name and price share a baseline, joined by a faint dotted leader. This
        is what makes the price scannable down the column without boxing every
        dish into its own card.
      */}
      <div className="flex items-baseline gap-3">
        <h3 className="font-display text-[19px] leading-tight font-semibold tracking-tight text-on-photo">
          {item.name}
        </h3>

        {item.popular && (
          <span className="shrink-0 rounded-full bg-accent-on-photo/18 px-2 py-0.5 text-[10px] font-bold tracking-[0.1em] text-accent-on-photo uppercase">
            Beliebt
          </span>
        )}

        <span
          aria-hidden="true"
          className="mb-1 min-w-6 flex-1 border-b border-dotted border-[rgb(255_255_255/0.28)]"
        />

        <span className="shrink-0 font-display text-[19px] font-semibold text-on-photo tabular-nums">
          {item.price} €
        </span>
      </div>

      {item.desc && (
        <p className="mt-2 max-w-[52ch] text-[14px] leading-relaxed text-on-photo-soft">{item.desc}</p>
      )}

      {item.menuPrice && (
        <p className="mt-2.5 text-[12.5px] font-medium text-on-photo-soft">
          {MENU_SUFFIX}
          <span className="ml-2 font-semibold text-accent-on-photo tabular-nums">{item.menuPrice} €</span>
        </p>
      )}
    </article>
  );
}
