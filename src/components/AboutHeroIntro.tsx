"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";

const introLines = [
  {
    text: "The World’s",
    className: "block",
    baseOpacity: 1,
    start: 0,
    end: 60,
  },
  {
    text: "Leading",
    className: "block",
    baseOpacity: 0.35,
    start: 40,
    end: 160,
  },
  {
    text: "RoboVan Platform",
    className: "block",
    baseOpacity: 0.18,
    start: 120,
    end: 260,
  },
];

const supportingLines = [
  {
    text: "Making Logistics Simpler.",
    baseOpacity: 0.12,
    start: 240,
    end: 400,
  },
  {
    text: "Built for Real-World Autonomous Logistics.",
    baseOpacity: 0.08,
    start: 340,
    end: 520,
  },
];

type ScrollTextLineProps = {
  text: string;
  baseOpacity: number;
  start: number;
  end: number;
  className?: string;
};

function ScrollTextLine({
  text,
  baseOpacity,
  start,
  end,
  className,
}: ScrollTextLineProps) {
  const { scrollY } = useScroll();
  const opacity = useSpring(useTransform(scrollY, [start, end], [baseOpacity, 1]), {
    stiffness: 120,
    damping: 28,
    mass: 0.4,
  });

  return (
    <motion.span className={className} style={{ opacity }}>
      {text}
    </motion.span>
  );
}

export function AboutHeroIntro() {
  return (
    <>
      <h1 className="mx-auto max-w-[780px] text-[40px] font-semibold leading-[1.18] text-[#222943] md:text-[50px]">
        {introLines.map((line) => (
          <ScrollTextLine key={line.text} {...line} />
        ))}
      </h1>

      <div className="mx-auto mt-[70px] max-w-[900px] text-[28px] font-semibold leading-[1.35] text-[#222943] md:text-[50px]">
        {supportingLines.map((line) => (
          <p key={line.text}>
            <ScrollTextLine {...line} />
          </p>
        ))}
      </div>
    </>
  );
}
