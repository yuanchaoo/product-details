"use client";

import Image from "next/image";
import type { StaticImageData } from "next/image";
import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";

type Milestone = {
  year: string;
  axisMonth: number;
  image: StaticImageData;
  title: string;
  description: string;
};

type AboutTimelineSectionProps = {
  milestones: Milestone[];
};

const DESKTOP_COLUMN_GAP = 58;
const DESKTOP_TOP_ALIGNMENT_OFFSET = 100;
const DESKTOP_TITLE_ALIGNMENT_OFFSET = 380;
const DESKTOP_MODULE_HEIGHT = 500;
const AXIS_START_YEAR = 2021;
const AXIS_TOTAL_MONTHS = 60;

export function AboutTimelineSection({ milestones }: AboutTimelineSectionProps) {
  const activeYearRef = useRef<HTMLParagraphElement | null>(null);
  const sectionRef = useRef<HTMLElement | null>(null);
  const stickyFrameRef = useRef<HTMLDivElement | null>(null);
  const cardRefs = useRef<Array<HTMLElement | null>>([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [contentScroll, setContentScroll] = useState(0);
  const foundedYear = milestones[0]?.year ?? "2021";
  const isLatestActive = activeIndex === milestones.length - 1;
  const timelineContentHeight = Math.max(
    DESKTOP_MODULE_HEIGHT,
    DESKTOP_TOP_ALIGNMENT_OFFSET +
      (milestones.length - 1) * DESKTOP_TITLE_ALIGNMENT_OFFSET +
      DESKTOP_MODULE_HEIGHT,
  );

  const getAxisProgress = (item: Milestone, index: number) => {
    if (index === 0) {
      return 0;
    }

    const year = Number(item.year);
    const monthOffset = (year - AXIS_START_YEAR) * 12 + item.axisMonth;

    return Math.min(1, Math.max(0, monthOffset / AXIS_TOTAL_MONTHS));
  };

  const progress = milestones[activeIndex]
    ? getAxisProgress(milestones[activeIndex], activeIndex)
    : 0;
  const axisLineHeight = isLatestActive
    ? "calc(100% - 12px)"
    : `calc((100% - 24px) * ${progress})`;

  const scrollToMilestone = (index: number) => {
    const section = sectionRef.current;
    const target = cardRefs.current[index];

    if (!section || !target) {
      return;
    }

    const sectionTop = section.getBoundingClientRect().top + window.scrollY;
    const availableFrameHeight = window.innerHeight;
    const maxScroll = Math.max(
      0,
      timelineContentHeight + 160 - availableFrameHeight,
    );
    const targetScroll = Math.min(maxScroll, Math.max(0, target.offsetTop - 80));

    setActiveIndex(index);
    window.scrollTo({
      top: sectionTop + targetScroll,
      behavior: "smooth",
    });
  };

  const getCardOpacity = (index: number) => {
    const distance = Math.abs(activeIndex - index);

    if (distance === 0) {
      return 1;
    }
    if (distance === 1) {
      return 0.6;
    }
    if (distance === 2) {
      return 0.4;
    }

    return Math.max(0.18, 0.3 - (distance - 3) * 0.1);
  };

  const getCardPosition = (index: number): CSSProperties => ({
    opacity: getCardOpacity(index),
    top: `${DESKTOP_TOP_ALIGNMENT_OFFSET + index * DESKTOP_TITLE_ALIGNMENT_OFFSET}px`,
    left:
      index % 2 === 1
        ? `calc((100% + ${DESKTOP_COLUMN_GAP}px) / 2)`
        : 0,
  });

  const getAxisPointStyle = (item: Milestone, index: number): CSSProperties => ({
    top: `calc(12px + (100% - 24px) * ${getAxisProgress(item, index)})`,
  });

  const timelineContentStyle = {
    "--timeline-content-height": `${timelineContentHeight}px`,
  } as CSSProperties;

  const timelineSectionStyle = {
    height: `calc(${timelineContentHeight}px + 160px)`,
  } as CSSProperties;

  useEffect(() => {
    const updateScrollState = () => {
      const section = sectionRef.current;

      if (!section || window.innerWidth < 768) {
        setContentScroll(0);
        setActiveIndex(0);
        return;
      }

      const sectionTop = section.getBoundingClientRect().top + window.scrollY;
      const availableFrameHeight = window.innerHeight;
      const maxScroll = Math.max(
        0,
        timelineContentHeight + 160 - availableFrameHeight,
      );
      const nextContentScroll = Math.min(
        maxScroll,
        Math.max(0, window.scrollY - sectionTop),
      );
      const activeLine = nextContentScroll + DESKTOP_TOP_ALIGNMENT_OFFSET;
      let closestIndex = 0;
      let closestDistance = Number.POSITIVE_INFINITY;

      milestones.forEach((_, index) => {
        const distance = Math.abs(
          DESKTOP_TOP_ALIGNMENT_OFFSET +
            index * DESKTOP_TITLE_ALIGNMENT_OFFSET -
            activeLine,
        );

        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = index;
        }
      });

      setContentScroll(nextContentScroll);
      setActiveIndex(closestIndex);
    };

    updateScrollState();
    window.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);

    return () => {
      window.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, [milestones, timelineContentHeight]);

  const contentTransformStyle = {
    transform: `translateY(-${contentScroll}px)`,
  } as CSSProperties;

  return (
    <section
      ref={sectionRef}
      className="relative bg-white"
      style={timelineSectionStyle}
    >
      <div
        ref={stickyFrameRef}
        className="sticky top-0 z-10 h-screen overflow-hidden px-6"
      >
        <div className="mx-auto h-full max-w-[1240px]">
          <div className="grid h-full gap-x-[70px] gap-y-[70px] md:grid-cols-[120px_minmax(0,1fr)] lg:gap-x-[100px]">
            <aside className="hidden pt-[100px] md:block">
              <div>
                <p
                  ref={activeYearRef}
                  className="text-[60px] font-semibold leading-none text-[#222943]/10"
                >
                  {milestones[activeIndex]?.year ?? "2021"}
                </p>
                <div className="-ml-[16px] mt-[30px] flex h-[520px] flex-col items-start text-center">
                  <span className="w-20 text-center text-[16px] font-bold text-[#222943]">
                    {foundedYear}
                  </span>
                  <div className="relative mt-6 w-20 flex-1">
                    <span className="absolute bottom-0 left-1/2 top-3 w-px -translate-x-1/2 border-l-2 border-dashed border-[#e5e7eb]" />
                    <span
                      className="absolute left-1/2 top-3 w-[2px] -translate-x-1/2 bg-[#222943] transition-[height]"
                      style={{ height: axisLineHeight }}
                    />

                    {milestones.map((item, index) => {
                      const isCurrent = index === activeIndex;
                      const isFirst = index === 0;
                      const isPassed = getAxisProgress(item, index) <= progress;

                      return (
                        <button
                          key={`${item.year}-${item.title}-timeline`}
                          type="button"
                          aria-label={`Jump to ${item.year} ${item.title}`}
                          onClick={() => scrollToMilestone(index)}
                          className="group absolute left-1/2 z-10 flex h-6 w-20 -translate-x-1/2 -translate-y-1/2 cursor-pointer items-center justify-center"
                          style={getAxisPointStyle(item, index)}
                        >
                          {!isFirst && (
                            <span
                              className={`pointer-events-none absolute left-[51px] text-[12px] font-medium text-[#c0c2c9] transition-opacity ${
                                isCurrent ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                              }`}
                            >
                              {item.year}
                            </span>
                          )}
                          <span
                            className={`rounded-full transition-colors ${
                              isFirst
                                ? "relative z-20 h-5 w-5 border-[4px] border-[#222943] bg-white shadow-[0_0_0_4px_#fff]"
                                : `h-3 w-3 border-2 border-white ${
                                    isPassed
                                      ? "bg-[#222943]"
                                      : "bg-[#c0c2c9] group-hover:bg-[#222943]"
                                  }`
                            }`}
                          />
                        </button>
                      );
                    })}
                    <button
                      type="button"
                      onClick={() => scrollToMilestone(milestones.length - 1)}
                      className="absolute left-1/2 top-full z-10 flex h-6 w-20 -translate-x-1/2 -translate-y-1/2 cursor-pointer items-center justify-center"
                      aria-label="Jump to today"
                    >
                      <span
                        className={`h-5 w-5 rounded-full border-[4px] transition-colors ${
                          isLatestActive
                            ? "relative z-20 border-[#222943] bg-white shadow-[0_0_0_4px_#fff]"
                            : "border-[#e6e7ea] bg-white"
                        }`}
                      />
                      <span
                        className={`absolute top-[30px] text-[16px] font-bold transition-colors ${
                          isLatestActive ? "text-[#222943]" : "text-[#c0c2c9]"
                        }`}
                      >
                        Today
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </aside>

            <div className="h-full overflow-hidden pr-1 md:pr-4">
              <div
                className="grid gap-y-[70px] pb-[80px] pt-[80px] transition-transform duration-75 lg:relative lg:block lg:min-h-[var(--timeline-content-height)]"
                style={{ ...timelineContentStyle, ...contentTransformStyle }}
              >
                {milestones.map((item, index) => {
                  const isCurrent = activeIndex === index;

                  return (
                    <article
                      ref={(node) => {
                        cardRefs.current[index] = node;
                      }}
                      key={`${item.year}-${item.title}`}
                      className="transition-opacity duration-300 lg:absolute lg:w-[calc((100%_-_58px)/2)]"
                      style={getCardPosition(index)}
                    >
                      <p
                        className={`text-[20px] font-bold leading-[40px] transition-colors ${
                          isCurrent ? "text-[#25cacc]" : "text-[#222943]"
                        }`}
                      >
                        {item.year}
                      </p>
                      <div className="mt-[25px]">
                        <div className="relative h-[260px] w-full overflow-hidden rounded-[8px] md:h-[300px]">
                          <Image
                            src={item.image}
                            alt={item.title}
                            fill
                            className="object-cover"
                            sizes="(max-width: 1024px) calc(100vw - 48px), 450px"
                          />
                        </div>
                        <h3 className="mt-[15px] text-[20px] font-semibold leading-[1.35] text-[#222943]">
                          {item.title}
                        </h3>
                        <p className="mt-[10px] text-[16px] font-medium leading-[22px] text-[#8e919f]">
                          {item.description}
                        </p>
                      </div>
                    </article>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
