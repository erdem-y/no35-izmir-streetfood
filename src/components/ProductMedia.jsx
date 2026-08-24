import { useEffect, useRef } from "react";
import { useReducedMotion } from "motion/react";

/*
  Product media.

  Every dish now animates the same way Kokoreç does: an ambient Kling clip
  generated from the dish's own approved photograph, played muted and looping
  as the centre card. That is the approved technique, so the other five were
  brought up to it rather than approximated with CSS overlays.

  Kokoreç itself is untouched. Its entry in products.js and its clip
  (kokorec-ambient.mp4) are exactly as approved; this component treats it
  identically to the rest, which is what keeps its behaviour unchanged.

  The still photograph is the poster, so it is what shows before the clip
  loads, when a clip is missing, and whenever motion is not wanted. Under
  prefers-reduced-motion no video is attached at all and the still is final.

  Only the centre card loads or decodes video; off-centre cards render the
  still, so cost stays flat as the list grows.
*/
export function ProductMedia({ product, active, eager = false }) {
  const reduce = useReducedMotion();
  const videoRef = useRef(null);

  const useVideo = Boolean(product.video) && active && !reduce;

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
          className="h-full w-full object-cover"
        />
      )}
    </div>
  );
}
