import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { ArrowDown, Phone, ArrowUpRight } from "@phosphor-icons/react";
import { business } from "../data/business";

/*
  Hero.

  The whole first screen is the restaurant: the grill, the counter, the fresh
  ingredients and a cook at work in the No.35 shirt. There is no product image
  laid over it any more. The photograph carries the message on its own, and
  the type sits directly on it.

  Readability comes from the directional `heroLeft` gradient in scenes.js,
  which darkens only the left band where the copy sits and releases across the
  rest of the frame, so the counter and the cook stay clearly visible.

  CTA hierarchy: Speisekarte ansehen (primary), Jetzt bestellen (secondary,
  the existing Restablo link), Anrufen (utility).
*/
export function Hero() {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();

  const contentY = useTransform(scrollYProgress, [0, 0.16], ["0%", "-10%"]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.13], [1, 0]);

  const item = (delay) =>
    reduce
      ? {}
      : {
          initial: { opacity: 0, y: 24 },
          animate: { opacity: 1, y: 0 },
          transition: { duration: 0.85, delay, ease: [0.16, 1, 0.3, 1] },
        };

  return (
    <section
      id="top"
      data-scene="hero"
      className="relative flex min-h-[100dvh] w-full items-center overflow-hidden"
    >
      <motion.div
        style={reduce ? undefined : { y: contentY, opacity: contentOpacity }}
        className="mx-auto w-full max-w-[1400px] px-4 pt-24 pb-16 sm:pt-28 sm:pb-20 sm:px-6 lg:px-10"
      >
        <div className="max-w-[38rem]">
          <motion.h1
            {...item(0.05)}
            className="font-display text-[2.15rem] leading-[1.05] sm:leading-[1.01] font-semibold tracking-tight text-on-photo sm:text-6xl lg:text-[4.4rem]"
          >
            Original Izmir Streetfood.
            <span className="mt-1 block text-accent-on-photo">Mitten in Hamburg.</span>
          </motion.h1>

          <motion.p
            {...item(0.2)}
            className="mt-5 max-w-[34rem] text-[0.98rem] leading-relaxed text-on-photo-soft sm:mt-7 sm:text-lg"
          >
            Kumru, Kokoreç und Midye Dolma. Jeden Tag frisch zubereitet, so wie an
            der ägäischen Küste.
          </motion.p>

          <motion.div {...item(0.34)} className="mt-7 flex flex-wrap sm:mt-10 items-center gap-3">
            <a
              href="#speisekarte"
              className="inline-flex items-center gap-2 rounded-full bg-accent-solid px-7 py-3.5 text-[15px] font-semibold whitespace-nowrap text-on-accent transition-colors hover:bg-accent-solid-hover active:translate-y-[1px]"
            >
              Speisekarte ansehen
              <ArrowDown size={18} weight="bold" />
            </a>

            <a
              href={business.orderingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-on-photo/45 bg-[rgb(10_16_20/0.4)] px-7 py-3.5 text-[15px] font-semibold whitespace-nowrap text-on-photo backdrop-blur-sm transition-colors hover:bg-[rgb(10_16_20/0.62)] active:translate-y-[1px]"
            >
              Jetzt bestellen
              <ArrowUpRight size={17} weight="bold" />
            </a>

            <a
              href={business.phoneHref}
              className="inline-flex items-center gap-2 rounded-full px-5 py-3.5 text-[15px] font-semibold whitespace-nowrap text-on-photo-soft transition-colors hover:text-on-photo"
            >
              <Phone size={17} weight="bold" />
              Anrufen
            </a>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
}
