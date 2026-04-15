"use client";

import { useLayoutEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export const RESOURCES_HERO_ANIM = {
  titleText: "News\n& Events",
  duration: 1.25,
  startDelay: 0.1,
  triggerStart: "top 82%",
  carStartXFallback: -320,
  carEndX: 0,
  carStartOpacity: 0,
  carEndOpacity: 1,
  carWidth: 285,
  carHeight: 176.64,
  horizontalGap: 120,
  carStartGapFromTitle: 12,
  titleBlockWidthMobile: 320,
  titleBlockWidthDesktop: 430,
} as const;

type ResourcesHeroEntranceProps = {
  carSrc: string;
  carAlt?: string;
};

export function ResourcesHeroEntrance({
  carSrc,
  carAlt = "Resources car",
}: ResourcesHeroEntranceProps) {
  const rootRef = useRef<HTMLDivElement | null>(null);
  const typingRef = useRef<HTMLSpanElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const carRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    if (!rootRef.current || !typingRef.current || !carRef.current) {
      return;
    }

    const ctx = gsap.context(() => {
      const typingTarget = typingRef.current;
      const titleTarget = titleRef.current;
      const carTarget = carRef.current;
      if (!typingTarget || !carTarget || !titleTarget) {
        return;
      }

      const fullText = RESOURCES_HERO_ANIM.titleText;
      const typingState = { value: 0 };
      typingTarget.textContent = "";

      // Measure the natural resting layout first, then compute start position.
      gsap.set(carTarget, { x: 0, opacity: 0 });
      const titleRect = titleTarget.getBoundingClientRect();
      const carRect = carTarget.getBoundingClientRect();
      const startGap = RESOURCES_HERO_ANIM.carStartGapFromTitle;
      const startDistance = carRect.left - (titleRect.right + startGap);
      const resolvedStartX =
        startDistance > 0
          ? -startDistance
          : RESOURCES_HERO_ANIM.carStartXFallback;

      gsap.set(carTarget, {
        x: resolvedStartX,
        opacity: RESOURCES_HERO_ANIM.carStartOpacity,
      });

      const timeline = gsap.timeline({ paused: true });

      timeline.to(
        typingState,
        {
          value: fullText.length,
          duration: RESOURCES_HERO_ANIM.duration,
          ease: "none",
          onUpdate: () => {
            if (!typingRef.current) {
              return;
            }
            const count = Math.floor(typingState.value);
            typingRef.current.textContent = fullText.slice(0, count);
          },
        },
        0,
      );

      timeline.to(
        carTarget,
        {
          x: RESOURCES_HERO_ANIM.carEndX,
          opacity: RESOURCES_HERO_ANIM.carEndOpacity,
          duration: RESOURCES_HERO_ANIM.duration,
          ease: "power3.out",
        },
        0,
      );

      ScrollTrigger.create({
        trigger: rootRef.current,
        start: RESOURCES_HERO_ANIM.triggerStart,
        once: true,
        onEnter: () => timeline.play(RESOURCES_HERO_ANIM.startDelay),
      });
    }, rootRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={rootRef}
      className="flex flex-col gap-10 lg:flex-row lg:items-center"
      style={{ columnGap: `${RESOURCES_HERO_ANIM.horizontalGap}px` }}
    >
      <h1
        ref={titleRef}
        className="relative text-[56px] font-semibold leading-[1.05] text-[#222943] md:text-[70px] md:leading-[80px]"
        style={{
          width: `min(100%, ${RESOURCES_HERO_ANIM.titleBlockWidthMobile}px)`,
          maxWidth: `${RESOURCES_HERO_ANIM.titleBlockWidthDesktop}px`,
        }}
      >
        <span className="invisible whitespace-pre-line">
          {RESOURCES_HERO_ANIM.titleText}
        </span>
        <span
          ref={typingRef}
          className="absolute left-0 top-0 whitespace-pre-line"
        />
      </h1>

      <div className="ml-auto shrink-0">
        <div
          ref={carRef}
          className="relative shrink-0 will-change-transform"
          style={{
            width: `${RESOURCES_HERO_ANIM.carWidth}px`,
            height: `${RESOURCES_HERO_ANIM.carHeight}px`,
            opacity: RESOURCES_HERO_ANIM.carStartOpacity,
            transform: `translateX(${RESOURCES_HERO_ANIM.carStartXFallback}px)`,
          }}
        >
          <Image
            src={carSrc}
            alt={carAlt}
            width={RESOURCES_HERO_ANIM.carWidth}
            height={177}
            className="h-[176.64px] w-[285px]"
            sizes="285px"
            priority
          />
        </div>
      </div>
    </div>
  );
}
