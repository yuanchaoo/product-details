"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import type { StaticImageData } from "next/image";
import { useEffect, useRef, useState } from "react";

type AboutHeroVehicleProps = {
  images: Array<{
    src: StaticImageData;
    alt: string;
  }>;
};

const INITIAL_DESKTOP_WIDTH = 750;
const INITIAL_DESKTOP_HEIGHT = 431;
const INITIAL_MOBILE_HEIGHT = 260;

export function AboutHeroVehicle({ images }: AboutHeroVehicleProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [viewport, setViewport] = useState({ width: 1440, height: 900 });
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const activeImage = images[activeImageIndex] ?? images[0];

  useEffect(() => {
    const updateViewport = () => {
      setViewport({
        width: window.innerWidth,
        height: window.innerHeight,
      });
    };

    updateViewport();
    window.addEventListener("resize", updateViewport);

    return () => window.removeEventListener("resize", updateViewport);
  }, []);

  const initialWidth = Math.min(viewport.width - 48, INITIAL_DESKTOP_WIDTH);
  const initialHeight =
    viewport.width < 768 ? INITIAL_MOBILE_HEIGHT : INITIAL_DESKTOP_HEIGHT;
  const maxScale = Math.max(
    viewport.width / initialWidth,
    viewport.height / initialHeight,
  );

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 62%", "end end"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, maxScale]);
  const borderRadius = useTransform(scrollYProgress, [0, 1], [20, 0]);
  const dotsOpacity = useTransform(scrollYProgress, [0.78, 0.95], [0, 1]);

  return (
    <section
      ref={sectionRef}
      className="relative left-1/2 h-[150vh] w-screen -translate-x-1/2"
    >
      <div className="sticky top-0 flex h-screen w-screen items-center justify-center overflow-hidden">
        <motion.div
          className="relative overflow-hidden will-change-transform"
          style={{
            width: initialWidth,
            height: initialHeight,
            borderRadius,
            scale,
            transformOrigin: "center center",
          }}
        >
          {activeImage && (
            <Image
              key={activeImage.alt}
              src={activeImage.src}
              alt={activeImage.alt}
              fill
              priority
              className="object-cover"
              sizes="100vw"
            />
          )}
        </motion.div>
        {images.length > 1 && (
          <motion.div
            className="absolute bottom-10 left-1/2 z-20 flex -translate-x-1/2 items-center gap-3"
            style={{ opacity: dotsOpacity }}
          >
            {images.map((image, index) => {
              const isActive = index === activeImageIndex;

              return (
                <button
                  key={image.alt}
                  type="button"
                  aria-label={`Show hero image ${index + 1}`}
                  onClick={() => setActiveImageIndex(index)}
                  className={`h-[10px] w-[10px] rounded-full border transition-colors ${
                    isActive
                      ? "border-[#222943] bg-[#222943]"
                      : "border-white/80 bg-white/70 hover:bg-white"
                  }`}
                />
              );
            })}
          </motion.div>
        )}
      </div>
    </section>
  );
}
