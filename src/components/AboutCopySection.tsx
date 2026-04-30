"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export function AboutCopySection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 70%", "end 45%"],
  });

  const titleColor = useTransform(
    scrollYProgress,
    [0, 0.35],
    ["#c0c2c9", "#222943"],
  );
  const primaryColor = useTransform(
    scrollYProgress,
    [0.15, 0.65],
    ["#c0c2c9", "#222943"],
  );
  const secondaryColor = useTransform(
    scrollYProgress,
    [0.45, 1],
    ["#c0c2c9", "#222943"],
  );

  return (
    <section
      ref={sectionRef}
      className="px-6 pb-0 pt-[100px] text-center"
    >
      <div className="mx-auto w-full max-w-[1240px]">
        <motion.h2
          className="text-[48px] font-semibold leading-[1.1] md:text-[70px] md:leading-[80px]"
          style={{ color: titleColor }}
        >
          About us
        </motion.h2>
        <div className="mt-[30px] text-left text-[18px] font-medium leading-8 md:text-[24px] md:leading-[40px]">
          <motion.p style={{ color: primaryColor }}>
            As the Global Pioneer of RoboVan, Zelostech Operating the Largest L4
            Autonomous Fleet worldwide, Zelostech rolled out the world’s first
            autonomous truck for urban operations, which has become a key
            intersection and milestone in the advancement of autonomous driving
            technology and the transformation of modern logistics, ushering in a
            new era of large-scale commercialization of RoboVan.
          </motion.p>
          <motion.p className="mt-6" style={{ color: secondaryColor }}>
            We are committed to providing global customers with fast, reliable,
            cost-effective and high-efficiency autonomous delivery solutions. Our
            business footprint extends across multiple countries and regions
            including China, Japan, South Korea, Singapore, the United Arab
            Emirates and Austria.
          </motion.p>
        </div>
      </div>
    </section>
  );
}
