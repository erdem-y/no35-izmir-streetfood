import { Star, ArrowUpRight } from "@phosphor-icons/react";
import { Reveal } from "./Reveal";
import { GlassCard } from "./GlassCard";
import { business } from "../data/business";

/*
  Google review CTA, over the warm coastal evening scene. This is the primary
  business goal: the restaurant is newly opened and needs reviews.

  No rating and no review count are shown, because neither exists in any
  verified source. The stars stay outlined: filled stars would read as a
  five-star rating the business cannot yet claim. Once the Google Business
  Profile is confirmed, set googleReviewUrl in business.js and this switches
  from the maps-search fallback to the direct review link.

  V3: the solid dark block is gone. The panel is pale glass and narrower, so
  the evening scene stays visible around and through it.
*/
export function ReviewCta() {
  const href = business.googleReviewUrl ?? business.directionsUrl;

  return (
    <section
      id="bewerten"
      data-scene="bewerten"
      className="mx-auto max-w-[1400px] px-4 py-16 sm:px-6 sm:py-24 lg:px-10 lg:py-28"
    >
      <Reveal>
        <GlassCard className="mx-auto max-w-[52rem] px-6 py-14 text-center sm:px-12 lg:py-16">
          <div
            aria-hidden="true"
            className="mb-6 flex items-center justify-center gap-1.5 text-accent-on-photo"
          >
            {Array.from({ length: 5 }).map((_, i) => (
              <Star key={i} size={20} weight="regular" />
            ))}
          </div>

          <h2 className="mx-auto max-w-[20ch] font-display text-[1.75rem] leading-[1.15] font-semibold tracking-tight text-on-photo sm:text-4xl sm:leading-[1.1]">
            Hat es geschmeckt? Erzählen Sie es weiter.
          </h2>

          <p className="mx-auto mt-5 max-w-[46ch] text-[16px] leading-relaxed text-on-photo-soft">
            Eine kurze Google Bewertung hilft anderen, uns in Barmbek zu finden. Es
            dauert keine Minute.
          </p>

          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-accent-solid px-8 py-4 text-[15px] font-semibold whitespace-nowrap text-on-accent transition-colors hover:bg-accent-solid-hover active:translate-y-[1px]"
          >
            Bei Google bewerten
            <ArrowUpRight size={18} weight="bold" />
          </a>
        </GlassCard>
      </Reveal>
    </section>
  );
}
