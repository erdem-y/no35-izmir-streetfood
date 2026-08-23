import { BackgroundScenes } from "./components/BackgroundScenes";
import { Nav } from "./components/Nav";
import { Hero } from "./components/Hero";
import { Signatures } from "./components/Signatures";
import { Menu } from "./components/Menu";
import { ReviewCta } from "./components/ReviewCta";
import { Visit } from "./components/Visit";
import { Footer } from "./components/Footer";

/*
  V3 structure.

  BackgroundScenes is a single fixed environment behind everything. Each
  section carries a data-scene attribute; the background observes those and
  crossfades as the visitor moves down the page.

  The standalone Kokorec section is gone. It made the site read as separate
  microsites for individual dishes; Kokorec now lives inside the Spezialitäten
  showcase alongside every other featured product.

  Section order and layout families:
    Hero          -> asymmetric split, food sitting directly on the bright sea
    Spezialitäten -> character-select product showcase (the main food moment)
    Speisekarte   -> editorial two-column menu on one glass sheet
    Bewerten      -> centred panel, the primary conversion goal
    Finden        -> two-column split, practical
*/
export default function App() {
  return (
    <>
      <a
        href="#speisekarte"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50 focus:rounded-full focus:bg-accent-solid focus:px-5 focus:py-3 focus:text-[14px] focus:font-semibold focus:text-on-accent"
      >
        Zur Speisekarte springen
      </a>

      <BackgroundScenes />

      {/*
        Content rides in its own layer above the fixed scene stack. Explicit
        z-layers rather than negative z-index on the background, so the
        environment can never be painted over by an ancestor background.
      */}
      <div className="relative z-10">
        <Nav />
        <main>
          <Hero />
          <Signatures />
          <Menu />
          <ReviewCta />
          <Visit />
        </main>
        <Footer />
      </div>
    </>
  );
}
