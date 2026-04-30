"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type Milestone = {
  year: string;
  image: string;
  title: string;
  description: string;
};

type AboutTimelineSectionProps = {
  milestones: Milestone[];
};

export function AboutTimelineSection({ milestones }: AboutTimelineSectionProps) {
  const activeYearRef = useRef<HTMLParagraphElement | null>(null);
  const yearRefs = useRef<Array<HTMLParagraphElement | null>>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (!activeYearRef.current) {
      return;
    }

    const updateActiveIndex = () => {
      const activeLine = activeYearRef.current?.getBoundingClientRect().top ?? 100;
      let closestIndex = 0;
      let closestDistance = Number.POSITIVE_INFINITY;

      yearRefs.current.forEach((node, index) => {
        if (!node) {
          return;
        }

        const distance = Math.abs(node.getBoundingClientRect().top - activeLine);

        if (distance < closestDistance) {
          closestDistance = distance;
          closestIndex = index;
        }
      });

      setActiveIndex(closestIndex);
    };

    updateActiveIndex();
    window.addEventListener("scroll", updateActiveIndex, { passive: true });
    window.addEventListener("resize", updateActiveIndex);

    return () => {
      window.removeEventListener("scroll", updateActiveIndex);
      window.removeEventListener("resize", updateActiveIndex);
    };
  }, []);

  return (
    <section className="px-6 pb-[60px] pt-[120px] md:pb-[80px]">
      <div className="mx-auto max-w-[1240px]">
        <div className="grid gap-x-[70px] gap-y-[70px] md:grid-cols-[120px_1fr] lg:gap-x-[100px]">
          <aside className="hidden md:block">
            <div className="sticky top-[100px]">
              <p
                ref={activeYearRef}
                className="text-[60px] font-semibold leading-none text-[#222943]/10"
              >
                {milestones[activeIndex]?.year ?? "2021"}
              </p>
              <div className="mt-[70px] flex h-[520px] flex-col items-center text-center">
                <span className="text-[16px] font-bold text-[#222943]">2021</span>
                <span className="mt-6 h-3 w-3 rounded-full border-[3px] border-[#222943] bg-white" />
                <span className="mt-4 h-2 w-2 rounded-full bg-[#222943]" />
                <span className="h-[118px] w-px border-l border-dashed border-[#c0c2c9]" />
                <span className="h-2 w-2 rounded-full bg-[#222943]" />
                <span className="h-[90px] w-px border-l border-dashed border-[#c0c2c9]" />
                <span className="text-[12px] text-[#c0c2c9]">2023</span>
                <span className="h-[110px] w-px border-l border-dashed border-[#c0c2c9]" />
                <span className="h-2 w-2 rounded-full bg-[#222943]" />
                <span className="mt-8 h-2 w-2 rounded-full bg-[#222943]" />
                <span className="h-[58px] w-px border-l border-dashed border-[#c0c2c9]" />
                <span className="h-3 w-3 rounded-full border-[3px] border-[#c0c2c9] bg-white" />
                <span className="text-[16px] font-bold text-[#c0c2c9]">Today</span>
              </div>
            </div>
          </aside>

          <div>
            <div className="grid gap-x-[58px] gap-y-[70px] lg:grid-cols-2">
              {milestones.map((item, index) => (
                <article
                  key={`${item.year}-${item.title}`}
                  className={index % 2 === 1 ? "lg:translate-y-[380px]" : ""}
                >
                  <p
                    ref={(node) => {
                      yearRefs.current[index] = node;
                    }}
                    className={`text-[20px] font-bold leading-[40px] transition-colors ${
                      activeIndex === index
                        ? "text-[#25cacc]"
                        : "text-[#222943] opacity-30"
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
                        unoptimized
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
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
