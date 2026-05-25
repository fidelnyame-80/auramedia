"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import dynamic from "next/dynamic";
import { motion, useInView } from "framer-motion";

const CircularGallery = dynamic(() => import("./CircularGallery"), {
  ssr: false,
  loading: () => <div className="h-full w-full" aria-hidden="true" />,
});

// Framer Motion preset for elements that should rise slightly as they appear.
const fadeUp = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.65, ease: [0.16, 1, 0.3, 1] },
  },
};

// Framer Motion preset for the main section heading.
const slideInLeft = {
  hidden: { opacity: 0, x: -64 },
  visible: {
    opacity: 1,
    x: 0,
    transition: { duration: 0.75, ease: [0.16, 1, 0.3, 1] },
  },
};

// Applies a small delay between each filter button animation.
const staggerGroup = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.12 },
  },
};

function getOptimizedGalleryImage(src, width = 1200) {
  if (!src.startsWith("/")) return src;

  return `/_next/image?url=${encodeURIComponent(src)}&w=${width}&q=75`;
}

function preloadImage(src) {
  return new Promise((resolve) => {
    const image = new window.Image();

    image.decoding = "async";
    image.onload = () => {
      if (image.decode) {
        image.decode().catch(() => undefined).finally(resolve);
        return;
      }

      resolve();
    };
    image.onerror = resolve;
    image.src = src;
  });
}

function useImagePreloader(items, enabled) {
  const imageKey = items.map((item) => item.image).join("|");
  const [readyImageKey, setReadyImageKey] = useState(null);

  useEffect(() => {
    if (!enabled || readyImageKey === imageKey) return undefined;

    let isActive = true;
    const urls = Array.from(new Set(items.map((item) => item.image)));

    if (urls.length === 0) {
      queueMicrotask(() => {
        if (isActive) setReadyImageKey(imageKey);
      });

      return () => {
        isActive = false;
      };
    }

    Promise.allSettled(
      urls.map((url) => preloadImage(url))
    ).then(() => {
      if (isActive) setReadyImageKey(imageKey);
    });

    return () => {
      isActive = false;
    };
  }, [enabled, imageKey, items, readyImageKey]);

  return {
    isReady: enabled && readyImageKey === imageKey,
  };
}

function GalleryLoadingShell() {
  return (
    <div
      className="absolute inset-0 flex items-center justify-center"
      aria-hidden="true"
    >
      <div className="flex w-full max-w-5xl items-center justify-center gap-5 opacity-70">
        {[0, 1, 2].map((item) => (
          <div
            key={item}
            className="h-52 w-[28%] animate-pulse rounded-[28px] border border-[#2539a8]/25 bg-white/[0.04] shadow-2xl shadow-black/20"
            style={{
              transform:
                item === 0
                  ? "rotate(-4deg)"
                  : item === 2
                    ? "rotate(4deg)"
                    : "rotate(0deg)",
            }}
          />
        ))}
      </div>
    </div>
  );
}

/*
  These are the project slides used by CircularGallery below.

  Replace image paths here when you add final portfolio images.
  Each object needs:
  - image: public path or remote image URL
  - text: label rendered under the WebGL card

  The current paths point to /public/images/designs1.webp through designs6.webp.
*/
const galleryImageSources = [
  { image: "/images/designs1.webp", text: "Design 1" },
  { image: "/images/designs2.webp", text: "Design 2" },
  { image: "/images/designs3.webp", text: "Design 3" },
  { image: "/images/designs4.webp", text: "Design 4" },
  { image: "/images/designs5.webp", text: "Design 5" },
  { image: "/images/designs6.webp", text: "Design 6" },
];

const galleryItems = galleryImageSources.map((item) => ({
  ...item,
  image: getOptimizedGalleryImage(item.image),
}));

export default function Portfolio() {
  const sectionRef = useRef(null);
  const shouldPreloadGallery = useInView(sectionRef, {
    once: true,
    margin: "900px 0px",
  });
  const [isGalleryRuntimeReady, setIsGalleryRuntimeReady] = useState(false);
  const { isReady: areGalleryImagesReady } = useImagePreloader(
    galleryItems,
    shouldPreloadGallery
  );
  const isGalleryReady = areGalleryImagesReady && isGalleryRuntimeReady;

  const handleGalleryReady = useCallback(() => {
    setIsGalleryRuntimeReady(true);
  }, []);

  return (
    <section
      id="work"
      ref={sectionRef}
      className="bg-[#050914] px-6 pb-8 pt-24 text-white"
    >
      <div className="mx-auto max-w-7xl">
        <div className="mb-4 flex flex-col gap-6 md:mb-3 md:flex-row md:items-end md:justify-between">
          <div>
            <motion.p
              className="mb-3 text-lg lg:text-xl font-bold uppercase tracking-widest text-[#ff1f2d]"
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.8 }}
            >
              Our Work
            </motion.p>
            <motion.h2
              className="text-4xl leading-tight"
              variants={slideInLeft}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.65 }}
            >
              Designs That <br />
              Speak for <span className="text-[#ff1f2d]">Themselves.</span>
            </motion.h2>
          </div>

          <motion.div
            className="flex flex-wrap gap-3"
            variants={staggerGroup}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.45 }}
          >
            {["All Work", "Web Design", "Branding", "Graphic Design", "Latest"].map(
              (item) => (
                <motion.button
                  key={item}
                  className="rounded-full border border-[#2539a8] px-5 py-3 text-sm"
                  variants={fadeUp}
                >
                  {item}
                </motion.button>
              )
            )}
          </motion.div>
        </div>

        <div
          className="relative h-[420px] overflow-hidden sm:h-[480px] lg:h-[520px]"
          aria-busy={!isGalleryReady}
        >
          {!isGalleryReady && <GalleryLoadingShell />}

          {/*
            CircularGallery usage for the Our Work section.

            Tuning notes:
            - The wrapper above controls available gallery height:
              h-[420px] sm:h-[480px] lg:h-[520px]
            - bend controls the arc. Use 0 for flat, 1 for subtle curve.
            - scrollSpeed controls how far wheel/drag input moves the carousel.
            - scrollEase controls how fast the visible carousel catches the target.
            - imageFit="contain" shows the full artwork instead of cropping it.
            - itemWidth and itemHeight control card size.
              The designs are 1536x1024, so these values keep a 1.5 landscape ratio.
            - itemPadding controls space between cards.
            - onReady fires after the WebGL textures are loaded, so the gallery
              reveal waits for real images instead of animating empty planes.
            - The actual gallery logic lives in components/CircularGallery.jsx.
          */}
          <motion.div
            className="absolute inset-0"
            variants={fadeUp}
            initial="hidden"
            whileInView={isGalleryReady ? "visible" : "hidden"}
            viewport={{ once: true, amount: 0.18 }}
          >
            {areGalleryImagesReady && (
              <CircularGallery
                items={galleryItems}
                bend={1}
                textColor="#ffffff"
                borderRadius={0.05}
                scrollSpeed={1}
                scrollEase={0.05}
                imageFit="contain"
                itemWidth={980}
                itemHeight={653}
                itemPadding={1.35}
                onReady={handleGalleryReady}
              />
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
