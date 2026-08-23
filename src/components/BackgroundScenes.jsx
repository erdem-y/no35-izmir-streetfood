import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useSpring, useTransform } from "motion/react";
import { scenes, DEFAULT_SCENE, SCRIMS } from "../data/scenes";

/*
  The persistent environment behind the whole page.

  Two independent motions combine so the world never feels static:

    1. Scene changes. An IntersectionObserver watches every [data-scene]
       section and promotes the most visible one. Layers crossfade over 1.4s,
       so scenes dissolve into each other rather than cutting. Discrete state,
       one change per section, no per-frame React work.

    2. Continuous drift. A slow CSS keyframe pan plus a scroll-linked parallax
       offset held in a Motion value, so it never re-renders React.

  Videos are opt-in per scene and deliberately conservative: only the active
  scene may hold one, it loads after first paint, and it is paused whenever its
  scene is not showing so an offscreen video never decodes frames.
*/
export function BackgroundScenes() {
  const reduce = useReducedMotion();
  const [activeId, setActiveId] = useState(DEFAULT_SCENE);
  const [videosAllowed, setVideosAllowed] = useState(false);

  const { scrollYProgress } = useScroll();

  /* Parallax: the environment moves slower than the content above it. */
  const rawY = useTransform(scrollYProgress, [0, 1], ["0%", "9%"]);
  const y = useSpring(rawY, { stiffness: 60, damping: 30, mass: 0.6 });

  /* Which section is on screen. */
  useEffect(() => {
    const sections = Array.from(document.querySelectorAll("[data-scene]"));
    if (!sections.length) return;

    const ratios = new Map();

    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          ratios.set(entry.target.dataset.scene, entry.isIntersecting ? entry.intersectionRatio : 0);
        }

        let best = null;
        let bestRatio = 0;
        for (const [id, ratio] of ratios) {
          if (ratio > bestRatio) {
            best = id;
            bestRatio = ratio;
          }
        }

        if (best) setActiveId((prev) => (prev === best ? prev : best));
      },
      { threshold: [0, 0.15, 0.35, 0.6, 0.85] }
    );

    for (const section of sections) observer.observe(section);
    return () => observer.disconnect();
  }, []);

  /*
    Hold video back until the page has settled, so the hero still image is the
    LCP candidate and never competes with a video download. Skipped entirely
    for reduced motion, save-data, and coarse low-width devices.
  */
  useEffect(() => {
    if (reduce) return;

    const connection = navigator.connection;
    if (connection?.saveData) return;
    if (typeof window !== "undefined" && window.innerWidth < 768) return;

    let cancelled = false;
    const enable = () => {
      if (!cancelled) setVideosAllowed(true);
    };

    const schedule = () => {
      if ("requestIdleCallback" in window) {
        window.requestIdleCallback(enable, { timeout: 2500 });
      } else {
        window.setTimeout(enable, 1400);
      }
    };

    if (document.readyState === "complete") {
      schedule();
    } else {
      window.addEventListener("load", schedule, { once: true });
      return () => window.removeEventListener("load", schedule);
    }

    return () => {
      cancelled = true;
    };
  }, [reduce]);

  const layers = useMemo(() => scenes, []);

  return (
    <div aria-hidden="true" className="pointer-events-none fixed inset-0 z-0 overflow-hidden bg-base">
      <motion.div style={reduce ? undefined : { y }} className="absolute inset-[-6%]">
        {layers.map((scene) => (
          <SceneLayer
            key={scene.id}
            scene={scene}
            active={scene.id === activeId}
            reduce={reduce}
            videosAllowed={videosAllowed}
          />
        ))}
      </motion.div>

      {/*
        A warm daylight vignette rather than a dark one. It settles the very
        edges of the frame so panels have something to sit against, without
        pulling the scene back toward the heavy V2 look.
      */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "radial-gradient(125% 95% at 50% 42%, rgb(255 252 246 / 0) 0%, rgb(255 252 246 / 0.16) 68%, rgb(255 252 246 / 0.42) 100%)",
        }}
      />
    </div>
  );
}

function SceneLayer({ scene, active, reduce, videosAllowed }) {
  const videoRef = useRef(null);
  const useVideo = Boolean(scene.video) && videosAllowed && !reduce;

  /* Only the visible scene decodes frames. */
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (active) {
      const played = video.play();
      if (played && typeof played.catch === "function") played.catch(() => {});
    } else {
      video.pause();
    }
  }, [active, useVideo]);

  return (
    <div
      className="absolute inset-0 transition-opacity duration-[1400ms] ease-in-out"
      style={{ opacity: active ? 1 : 0 }}
    >
      <div className={reduce ? "absolute inset-0" : "scene-drift absolute inset-0"}>
        {useVideo ? (
          <video
            ref={videoRef}
            className="h-full w-full object-cover"
            style={{ objectPosition: scene.focus }}
            src={scene.video}
            poster={scene.image}
            muted
            loop
            playsInline
            preload="none"
            tabIndex={-1}
          />
        ) : (
          <img
            className="h-full w-full object-cover"
            style={{ objectPosition: scene.focus }}
            src={scene.image}
            alt=""
            loading={scene.id === DEFAULT_SCENE ? "eager" : "lazy"}
            decoding="async"
            fetchPriority={scene.id === DEFAULT_SCENE ? "high" : "low"}
          />
        )}
      </div>

      <div className="absolute inset-0" style={{ background: SCRIMS[scene.scrim] ?? SCRIMS.medium }} />
    </div>
  );
}
