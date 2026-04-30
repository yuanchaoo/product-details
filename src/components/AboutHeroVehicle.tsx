"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type AboutHeroVehicleProps = {
  src: string;
  alt: string;
};

const INITIAL_DESKTOP_WIDTH = 750;
const INITIAL_DESKTOP_HEIGHT = 431;
const INITIAL_MOBILE_HEIGHT = 260;

export function AboutHeroVehicle({ src, alt }: AboutHeroVehicleProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const [viewport, setViewport] = useState({ width: 1440, height: 900 });

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
          <Image
            src={src}
            alt={alt}
            fill
            priority
            unoptimized
            className="object-cover"
            sizes="100vw"
          />
        </motion.div>
      </div>
    </section>
  );
}
