import { MapPin, Phone, EnvelopeSimple, Clock, Info } from "@phosphor-icons/react";
import { Reveal } from "./Reveal";
import { GlassCard } from "./GlassCard";
import { business } from "../data/business";

/*
  Finden.

  The closing section is deliberately the most grounded on the page: its scene
  carries the heaviest scrim and the panel uses the strong glass tone, because
  a visitor here wants an address and a phone number, not atmosphere.

  Opening hours remain genuinely unknown and are stated as such. The address
  verification notice from V1 is unchanged and still driven by
  business.address.needsVerification.
*/
export function Visit() {
  const locations = business.locations ?? [];

  return (
    <section
      id="finden"
      data-scene="finden"
      className="relative mx-auto max-w-[1400px] px-4 py-16 sm:px-6 sm:py-24 lg:px-10 lg:py-32"
    >
            <div className="relative grid gap-12 lg:grid-cols-12 lg:gap-16">
        <Reveal className="lg:col-span-5">
          <h2 className="on-photo-type max-w-[18ch] font-display text-[2rem] leading-[1.08] font-semibold tracking-tight text-on-photo sm:text-5xl sm:leading-[1.06]">
            Kommen Sie vorbei.
          </h2>
          <p className="on-photo-type mt-5 max-w-[42ch] text-[16px] leading-relaxed text-on-photo-soft">
            Sie finden uns in Hamburg Barmbek-Nord. Am besten frisch vom Grill, direkt
            vor Ort.
          </p>

          <a
            href={business.directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-8 inline-flex items-center gap-2 rounded-full bg-accent-solid px-7 py-3.5 text-[15px] font-semibold whitespace-nowrap text-on-accent transition-colors hover:bg-accent-solid-hover active:translate-y-[1px]"
          >
            <MapPin size={18} weight="bold" />
            Route planen
          </a>
        </Reveal>

        <Reveal delay={0.1} className="lg:col-span-7">
          <GlassCard as="dl" tone="strong" className="divide-y divide-[rgb(255_255_255/0.12)] overflow-hidden">
            <InfoRow
              icon={<MapPin size={20} />}
              label={locations.length > 1 ? "Standorte" : "Adresse"}
            >
              {/*
                Renders every entry in business.locations. With one location it
                is the single address exactly as before; with two or more it
                becomes a labelled two-column list, so adding the second branch
                to the data is all that is required.
              */}
              <div
                className={
                  locations.length > 1
                    ? "grid gap-5 sm:grid-cols-2 sm:gap-x-8"
                    : ""
                }
              >
                {locations.map((location, index) => (
                  <div key={location.id}>
                    {locations.length > 1 && (
                      <p className="mb-1.5 text-[10.5px] font-bold tracking-[0.14em] text-accent-on-photo uppercase">
                        Standort {index + 1}
                        {location.label ? ` · ${location.label}` : ""}
                      </p>
                    )}

                    <address className="text-[15.5px] leading-relaxed font-medium text-on-photo not-italic sm:text-[16px]">
                      {location.street}
                      <br />
                      {location.postalCode} {location.city}
                    </address>

                    {location.needsVerification && (
                      <p className="mt-3 flex gap-2 rounded-lg bg-[rgb(255_255_255/0.08)] p-3 text-[12.5px] leading-relaxed text-on-photo-soft">
                        <Info size={16} className="mt-px shrink-0" />
                        <span>{location.verificationNote}</span>
                      </p>
                    )}
                  </div>
                ))}
              </div>
            </InfoRow>

            <InfoRow icon={<Clock size={20} />} label="Öffnungszeiten">
              {business.openingHours ? (
                <ul className="space-y-1.5">
                  {business.openingHours.map((entry) => (
                    <li key={entry.days} className="flex justify-between gap-6 text-[15px]">
                      <span className="text-on-photo-soft">{entry.days}</span>
                      <span className="font-medium text-on-photo tabular-nums">{entry.hours}</span>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-[15px] leading-relaxed text-on-photo-soft">
                  Unsere Öffnungszeiten pflegen wir gerade ein. Rufen Sie uns bis dahin
                  kurz an, wir sagen Ihnen sofort, ob wir für Sie da sind.
                </p>
              )}
            </InfoRow>

            <InfoRow icon={<Phone size={20} />} label="Telefon">
              <a
                href={business.phoneHref}
                className="text-[16px] font-medium text-accent-on-photo underline-offset-4 hover:underline"
              >
                {business.phone}
              </a>
            </InfoRow>

            <InfoRow icon={<EnvelopeSimple size={20} />} label="E-Mail">
              <a
                href={`mailto:${business.email}`}
                className="text-[16px] font-medium text-accent-on-photo underline-offset-4 hover:underline"
              >
                {business.email}
              </a>
            </InfoRow>
          </GlassCard>
        </Reveal>
      </div>
    </section>
  );
}

function InfoRow({ icon, label, children }) {
  return (
    <div className="flex gap-4 p-6 sm:gap-5 sm:p-7">
      <div className="mt-0.5 shrink-0 text-accent-on-photo" aria-hidden="true">
        {icon}
      </div>
      <div className="min-w-0 flex-1">
        <dt className="text-[11px] font-semibold tracking-[0.16em] text-on-photo-soft uppercase">
          {label}
        </dt>
        <dd className="mt-2">{children}</dd>
      </div>
    </div>
  );
}
