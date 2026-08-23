import { useEffect, useRef } from "react";
import { useReducedMotion } from "motion/react";

/*
  Product media, with a visible micro-animation on EVERY dish.

  The rule: the food photograph itself is never distorted. Steam, haze and
  light sweeps are transparent layers composited over a stable image, so a
  professional photo still reads as a photograph.

  Effects per dish, chosen for what the food actually is:
    steam - hot off the grill or the press: rising wisps + heat haze + sweep
    video - Kokoreç only, where real grill smoke is the subject
    cool  - Midye Dolma: served cold, so no fake steam. Light sweep and a slow
            drift instead, which still reads as alive without lying about the
            dish.

  Only the centre card animates, so cost stays flat as the list grows.
*/

/* Three wisps at different sizes, positions, speeds and phases. Staggering is
   what makes steam look like steam rather than a pulsing blob. */
const WISPS = [
  { left: "38%", bottom: "30%", w: "7rem", h: "12rem", dur: "7s", delay: "0s", peak: 0.62 },
  { left: "52%", bottom: "36%", w: "5.5rem", h: "10rem", dur: "9s", delay: "2.4s", peak: 0.5 },
  { left: "46%", bottom: "26%", w: "8.5rem", h: "14rem", dur: "11s", delay: "4.8s", peak: 0.4 },
];

export function ProductMedia({ product, active, eager = false }) {
  const reduce = useReducedMotion();
  const videoRef = useRef(null);

  const useVideo = product.fx === "video" && product.video && active && !reduce;

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (useVideo) {
      const played = video.play();
      if (played && typeof played.catch === "function") played.catch(() => {});
    } else {
      video.pause();
    }
  }, [useVideo]);

  const animate = active && !reduce;
  const hot = product.fx === "steam";

  return (
    <div className="relative h-full w-full overflow-hidden">
      {useVideo ? (
        <video
          ref={videoRef}
          className="h-full w-full object-cover"
          style={{ objectPosition: product.focus ?? "center" }}
          src={product.video}
          poster={product.image}
          muted
          loop
          playsInline
          preload="none"
          tabIndex={-1}
          aria-label={product.alt}
        />
      ) : (
        <img
          src={product.image}
          alt={product.alt}
          loading={eager ? "eager" : "lazy"}
          decoding="async"
          draggable={false}
          style={{ objectPosition: product.focus ?? "center" }}
          className={`h-full w-full object-cover ${animate ? "fx-drift" : ""}`}
        />
      )}

      {/* Rising steam, hot dishes only. */}
      {hot && animate && (
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
          {WISPS.map((w, i) => (
            <div
              key={i}
              className="fx-wisp absolute rounded-full opacity-0 blur-2xl"
              style={{
                left: w.left,
                bottom: w.bottom,
                width: w.w,
                height: w.h,
                animationDuration: w.dur,
                animationDelay: w.delay,
                background: `radial-gradient(closest-side, rgb(255 255 255 / ${w.peak}), rgb(255 255 255 / 0))`,
              }}
            />
          ))}

          {/* Heat haze sitting just above the hot surface. */}
          <div
            className="fx-haze absolute inset-x-0 bottom-0 h-3/5"
            style={{
              background:
                "linear-gradient(0deg, rgb(255 244 226 / 0.22), rgb(255 244 226 / 0.08) 48%, rgb(255 244 226 / 0) 82%)",
            }}
          />
        </div>
      )}

      {/* Light sweep on every still, hot or cold. */}
      {!useVideo && animate && (
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
          <div
            className="fx-sweep absolute inset-y-[-25%] left-0 w-2/5 blur-xl"
            style={{
              background:
                "linear-gradient(100deg, rgb(255 255 255 / 0), rgb(255 250 240 / 0.5), rgb(255 255 255 / 0))",
            }}
          />
        </div>
      )}
    </div>
  );
}
