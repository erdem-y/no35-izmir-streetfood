import { business } from "../data/business";

/*
  Footer. Ordering stays a quiet secondary link: the brief sets Google reviews
  and physical visits as the goal, not online orders.

  Instagram is intentionally absent. No handle has ever been verified, and
  linking a guessed profile would be worse than omitting it.
*/
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[rgb(255_255_255/0.12)] bg-[rgb(9_14_18/0.88)] backdrop-blur-xl">
      <div className="mx-auto max-w-[1400px] px-4 py-14 sm:px-6 lg:px-10">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-start lg:justify-between">
          <div className="flex items-start gap-4">
            <img
              src="/brand/logo-no35.png"
              alt=""
              aria-hidden="true"
              width={52}
              height={52}
              loading="lazy"
              className="h-13 w-13 shrink-0 rounded-full bg-white object-contain p-[2px]"
            />
            <div>
              <p className="font-display text-[17px] font-semibold tracking-tight text-on-photo">
                {business.name}
              </p>
              <p className="mt-1 text-[14px] text-on-photo-soft">{business.district}</p>
              <p className="mt-3 text-[13px] text-on-photo-soft">Inh. {business.owner}</p>
            </div>
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-x-12 gap-y-3 sm:gap-x-20">
            <a href="#speisekarte" className="text-[14px] text-on-photo-soft transition-colors hover:text-on-photo">
              Speisekarte
            </a>
            <a href="#finden" className="text-[14px] text-on-photo-soft transition-colors hover:text-on-photo">
              Anfahrt
            </a>
            <a href={business.phoneHref} className="text-[14px] text-on-photo-soft transition-colors hover:text-on-photo">
              {business.phone}
            </a>
            <a
              href={`mailto:${business.email}`}
              className="text-[14px] break-all text-on-photo-soft transition-colors hover:text-on-photo"
            >
              {business.email}
            </a>
            <a
              href={business.orderingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="text-[14px] text-on-photo-soft transition-colors hover:text-on-photo"
            >
              Online bestellen
            </a>
          </nav>
        </div>

        <div className="mt-12 flex flex-col gap-3 border-t border-[rgb(255_255_255/0.12)] pt-7 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-[12.5px] text-on-photo-soft">
            © {year} {business.name}
          </p>
          <p className="text-[12.5px] text-on-photo-soft">{business.legalNote}</p>
        </div>
      </div>
    </footer>
  );
}
