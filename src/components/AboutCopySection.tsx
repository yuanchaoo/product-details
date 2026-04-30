"use client";

import { motion, MotionValue, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const primaryText =
  "As the Global Pioneer of RoboVan, Zelostech Operating the Largest L4 Autonomous Fleet worldwide, Zelostech rolled out the world’s first autonomous truck for urban operations, which has become a key intersection and milestone in the advancement of autonomous driving technology and the transformation of modern logistics, ushering in a new era of large-scale commercialization of RoboVan.";

const secondaryText =
  "We are committed to providing global customers with fast, reliable, cost-effective and high-efficiency autonomous delivery solutions. Our business footprint extends across multiple countries and regions including China, Japan, South Korea, Singapore, the United Arab Emirates and Austria.";

type RevealTextProps = {
  text: string;
  progress: MotionValue<number>;
  from: number;
  to: number;
};

type RevealCharacterProps = RevealTextProps & {
  char: string;
  index: number;
  total: number;
};

function RevealCharacter({
  char,
  index,
  total,
  progress,
  from,
  to,
}: RevealCharacterProps) {
  const step = (to - from) / Math.max(total, 1);
  const start = from + step * index;
  const end = start + step * 2;
  const color = useTransform(
    progress,
    [start, end],
    ["#c0c2c9", "#222943"],
  );

  return (
    <motion.span style={{ color }}>
      {char}
    </motion.span>
  );
}

function RevealText({ text, progress, from, to }: RevealTextProps) {
  const characters = Array.from(text);

  return (
    <>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {characters.map((char, index) => (
          <RevealCharacter
            key={`${char}-${index}`}
            char={char}
            index={index}
            total={characters.length}
            progress={progress}
            from={from}
            to={to}
            text={text}
          />
        ))}
      </span>
    </>
  );
}

export function AboutCopySection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start 72%", "end 42%"],
  });

  return (
    <section ref={sectionRef} className="bg-white px-6 pt-[102px] md:px-[100px]">
      <div className="w-full">
        <h2 className="text-center text-[48px] font-semibold leading-[1.15] text-[#222943] md:text-[70px] md:leading-[80px]">
          About us
        </h2>

        <div className="mt-[80px] space-y-[34px] text-left text-[18px] font-medium leading-8 md:text-[24px] md:leading-[40px]">
          <p>
            <RevealText
              text={primaryText}
              progress={scrollYProgress}
              from={0}
              to={0.5}
            />
          </p>
          <p>
            <RevealText
              text={secondaryText}
              progress={scrollYProgress}
              from={0.62}
              to={1}
            />
          </p>
        </div>
      </div>
    </section>
  );
}
