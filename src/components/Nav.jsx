import { useState } from "react";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { List, X } from "@phosphor-icons/react";
import { business } from "../data/business";

const LINKS = [
  { href: "#spezialitaeten", label: "Spezialitäten" },
  { href: "#speisekarte", label: "Speisekarte" },
  { href: "#bewerten", label: "Bewerten" },
  { href: "#finden", label: "Finden" },
];

/*
  Sticky navigation, single line at desktop, 72px tall (cap is 80px).

  Scroll state comes from Motion's useScroll, so state flips once at the 24px
  threshold rather than on every frame.

  The bar is transparent over the hero, which is a dark photograph, so its type
  switches to the light on-photo tones there and back to charcoal once the
  solid pale bar appears. Without that switch the links were charcoal on a dark
  interior shot and effectively unreadable.
*/
export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    const next = latest > 24;
    setScrolled((prev) => (prev === next ? prev : next));
  });

  const solid = scrolled || open;

  return (
    <header
      /*
        Once scrolled, the bar needs to be genuinely opaque. At the lighter
        glass-soft tint, content passing underneath stayed legible through the
        bar and collided with the nav labels.
      */
      className={`fixed inset-x-0 top-0 z-40 transition-colors duration-500 ${
        solid
          ? "border-b border-[rgb(255_255_255/0.12)] bg-[rgb(11_16_20/0.82)] backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      }`}
    >
      <nav
        aria-label="Hauptnavigation"
        className="mx-auto flex h-[72px] max-w-[1400px] items-center justify-between gap-6 px-4 sm:px-6 lg:px-10"
      >
        <a href="#top" className="flex shrink-0 items-center gap-3">
          <img
            src="/brand/logo-no35.png"
            alt="No. 35 Original Izmir Streetfood"
            width={44}
            height={44}
            className="h-11 w-11 rounded-full bg-white object-contain p-[2px]"
          />
          <span className={`hidden font-display text-[15px] leading-tight font-semibold tracking-tight sm:block ${"text-on-photo"}`}>
            No. 35
            <span className={`block text-[11px] font-medium tracking-[0.14em] uppercase ${"text-on-photo-soft"}`}>
              Izmir Streetfood
            </span>
          </span>
        </a>

        <ul className="hidden items-center gap-8 lg:flex">
          {LINKS.map((link) => (
            <li key={link.href}>
              <a
                href={link.href}
                className={`text-[15px] font-medium transition-colors ${"text-on-photo-soft hover:text-on-photo"}`}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex items-center gap-2">
          <a
            href={business.phoneHref}
            className="hidden rounded-full bg-accent-solid px-5 py-2.5 text-[14px] font-semibold whitespace-nowrap text-on-accent transition-colors hover:bg-accent-solid-hover active:scale-[0.98] sm:inline-block"
          >
            Anrufen
          </a>

          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? "Menü schließen" : "Menü öffnen"}
            className={`inline-flex h-11 w-11 items-center justify-center rounded-full lg:hidden ${"border border-on-photo/40 bg-[rgb(10_16_20/0.45)] text-on-photo backdrop-blur-sm"}`}
          >
            {open ? <X size={20} /> : <List size={20} />}
          </button>
        </div>
      </nav>

      {open && (
        <motion.div
          id="mobile-menu"
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: "auto" }}
          transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
          className="overflow-hidden border-t border-[rgb(255_255_255/0.12)] bg-[rgb(11_16_20/0.95)] backdrop-blur-xl lg:hidden"
        >
          <ul className="mx-auto flex max-w-[1400px] flex-col gap-1 px-4 py-4 sm:px-6">
            {LINKS.map((link) => (
              <li key={link.href}>
                <a
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-lg px-2 py-3 text-[16px] font-medium text-on-photo"
                >
                  {link.label}
                </a>
              </li>
            ))}
            <li className="pt-2">
              <a
                href={business.phoneHref}
                className="block rounded-full bg-accent-solid px-5 py-3 text-center text-[15px] font-semibold text-on-accent"
              >
                Anrufen
              </a>
            </li>
          </ul>
        </motion.div>
      )}
    </header>
  );
}
