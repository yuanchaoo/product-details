"use client";

import { motion, useScroll, useSpring, useTransform } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

type VehicleScrollSequenceProps = {
  src: string;
  alt?: string;
};

type SequenceState = {
  initialScale: number;
  initialOpacity: number;
  pastScale: number;
  pastOpacity: number;
};

const sequenceStates: SequenceState[] = [
  {
    initialScale: 1,
    initialOpacity: 1,
    pastScale: 0.95,
    pastOpacity: 0.78,
  },
  {
    initialScale: 0.5,
    initialOpacity: 0.5,
    pastScale: 0.93,
    pastOpacity: 0.68,
  },
  {
    initialScale: 0.4,
    initialOpacity: 0.4,
    pastScale: 0.91,
    pastOpacity: 0.58,
  },
];

function VehicleSequenceItem({
  src,
  alt,
  state,
}: {
  src: string;
  alt: string;
  state: SequenceState;
}) {
  const itemRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: itemRef,
    offset: ["start 88%", "end 22%"],
  });
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 26,
    mass: 0.28,
  });

  const scale = useTransform(
    smoothProgress,
    [0, 0.52, 0.74, 1],
    [state.initialScale, 1, 0.985, state.pastScale],
  );
  const opacity = useTransform(
    smoothProgress,
    [0, 0.52, 0.74, 1],
    [state.initialOpacity, 1, 0.95, state.pastOpacity],
  );
  const y = useTransform(smoothProgress, [0, 1], [18, -14]);

  return (
    <div ref={itemRef} className="relative flex items-center justify-center">
      <motion.div
        style={{ scale, opacity, y }}
        className="relative h-[619px] w-[1440px] shrink-0 will-change-transform"
      >
        <Image
          src={src}
          alt={alt}
          width={1440}
          height={619}
          className="h-[619px] w-[1440px] select-none"
          sizes="1440px"
          priority={state.initialScale === 1}
        />
      </motion.div>
    </div>
  );
}

export function VehicleScrollSequence({ src, alt = "Vehicle image" }: VehicleScrollSequenceProps) {
  return (
    <section className="bg-[#ffffff] px-4 pb-8 pt-10 md:px-6 md:pb-14 md:pt-10">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-0">
        {sequenceStates.map((state, index) => (
          <VehicleSequenceItem
            key={`vehicle-sequence-${index}`}
            src={src}
            alt={`${alt} ${index + 1}`}
            state={state}
          />
        ))}
      </div>
    </section>
  );
}
