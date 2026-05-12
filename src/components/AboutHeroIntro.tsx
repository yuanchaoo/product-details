"use client";

import { motion, MotionValue, useScroll, useTransform } from "framer-motion";

const introLines = [
  {
    text: "The World's Largest",
    className: "block",
  },
  {
    text: "RoboVan Enterprise",
    className: "block",
  },
  {
    text: "A Global Leader",
    className: "block mt-[70px]",
  },
  {
    text: "in Autonomous Driving Technology",
    className: "block whitespace-nowrap",
  },
];

const supportingLines = [
  {
    text: "Built for Real-World Logistics",
  },
];

const introCharacterCount = introLines.reduce(
  (count, line) => count + Array.from(line.text).length,
  0,
);

const supportingCharacterCount = supportingLines.reduce(
  (count, line) => count + Array.from(line.text).length,
  0,
);

const introLinesWithOffsets = introLines.map((line, index) => ({
  ...line,
  offset: introLines
    .slice(0, index)
    .reduce((count, item) => count + Array.from(item.text).length, 0),
}));

const supportingLinesWithOffsets = supportingLines.map((line, index) => ({
  ...line,
  offset: supportingLines
    .slice(0, index)
    .reduce((count, item) => count + Array.from(item.text).length, 0),
}));

type RevealCharacterProps = {
  char: string;
  index: number;
  total: number;
  progress: MotionValue<number>;
  from: number;
  to: number;
};

type RevealTextLineProps = {
  text: string;
  progress: MotionValue<number>;
  offset: number;
  total: number;
  from: number;
  to: number;
  className?: string;
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
    ["rgba(0, 89, 255, 0.2)", "#222943"],
  );

  return <motion.span style={{ color }}>{char}</motion.span>;
}

function RevealTextLine({
  text,
  progress,
  offset,
  total,
  from,
  to,
  className,
}: RevealTextLineProps) {
  const characters = Array.from(text);

  return (
    <span className={className}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">
        {characters.map((char, index) => (
          <RevealCharacter
            key={`${char}-${index}`}
            char={char}
            index={offset + index}
            total={total}
            progress={progress}
            from={from}
            to={to}
          />
        ))}
      </span>
    </span>
  );
}

export function AboutHeroIntro() {
  const { scrollY } = useScroll();

  return (
    <>
      <h1 className="mx-auto max-w-[1120px] text-[40px] font-semibold leading-[1.18] text-[#222943] md:text-[50px]">
        {introLinesWithOffsets.map((line) => (
          <RevealTextLine
            key={line.text}
            {...line}
            progress={scrollY}
            total={introCharacterCount}
            from={0}
            to={280}
          />
        ))}
      </h1>

      <div className="mx-auto mt-[70px] max-w-[900px] text-[28px] font-semibold leading-[1.35] text-[#222943] md:text-[50px]">
        {supportingLinesWithOffsets.map((line) => (
          <p key={line.text}>
            <RevealTextLine
              {...line}
              progress={scrollY}
              total={supportingCharacterCount}
              from={220}
              to={560}
            />
          </p>
        ))}
      </div>
    </>
  );
}
