"use client";

import Image, { StaticImageData } from "next/image";
import type { ReactNode } from "react";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import heroImage from "../../details_hero.png";
import sceneImage1 from "../../1.png";
import sceneImage2 from "../../2.png";
import sceneImage3 from "../../3.png";

gsap.registerPlugin(ScrollTrigger);

const SCENE_SWITCH_CONFIG = {
  sectionHeightVh: 420,
  scrollScrub: 0.55,
} as const;

type PanelSpec = {
  image: StaticImageData;
  alt: string;
  caption?: string;
  mode: "hero" | "scenario";
};

const panels: PanelSpec[] = [
  {
    image: heroImage,
    alt: "Zelos Z5 autonomous delivery vehicle",
    mode: "hero",
  },
  {
    image: sceneImage1,
    alt: "Scene 1",
    caption: "Retail Replenishment",
    mode: "scenario",
  },
  {
    image: sceneImage2,
    alt: "Scene 2",
    caption: "Business Park Logistics",
    mode: "scenario",
  },
  {
    image: sceneImage3,
    alt: "Scene 3",
    caption: "Intralogistics",
    mode: "scenario",
  },
];

const scenarioPanels = panels.filter((panel) => panel.mode === "scenario");

type ScenarioScrollSectionProps = {
  headerSlot?: ReactNode;
  heroContentSlot?: ReactNode;
};

export function ScenarioScrollSection({
  headerSlot,
  heroContentSlot,
}: ScenarioScrollSectionProps) {
  const sectionRef = useRef<HTMLElement | null>(null);
  const imageRefs = useRef<Array<HTMLDivElement | null>>([]);
  const captionRefs = useRef<Array<HTMLDivElement | null>>([]);
  const heroContentRef = useRef<HTMLDivElement | null>(null);
  const sceneChromeRef = useRef<HTMLDivElement | null>(null);
  const sceneProgressRefs = useRef<Array<HTMLDivElement | null>>([]);
  const mixEase = useRef(gsap.parseEase("sine.inOut"));

  useLayoutEffect(() => {
    if (!sectionRef.current) {
      return;
    }

    const ctx = gsap.context(() => {
      imageRefs.current.forEach((node, index) => {
        if (!node) {
          return;
        }

        gsap.set(node, {
          opacity: index === 0 ? 1 : 0,
        });
      });

      captionRefs.current.forEach((node, index) => {
        if (!node) {
          return;
        }

        gsap.set(node, {
          opacity: index === 0 ? 1 : 0,
          y: index === 0 ? 0 : 24,
        });
      });

      if (heroContentRef.current) {
        gsap.set(heroContentRef.current, { opacity: 1, y: 0 });
      }
      if (sceneChromeRef.current) {
        gsap.set(sceneChromeRef.current, { opacity: 0, y: 18 });
      }
      sceneProgressRefs.current.forEach((node, index) => {
        gsap.set(node, { scaleX: index === 0 ? 1 : 0 });
      });

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: SCENE_SWITCH_CONFIG.scrollScrub,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const sceneProgress = gsap.utils.clamp(
            0,
            panels.length - 1,
            self.progress * (panels.length - 1),
          );
          const fromIndex = Math.floor(sceneProgress);
          const toIndex = Math.min(panels.length - 1, fromIndex + 1);
          const rawMix = sceneProgress - fromIndex;
          const mix = mixEase.current(rawMix);
          const heroOpacity = gsap.utils.clamp(0, 1, 1 - sceneProgress * 1.25);
          const scenarioChromeOpacity = gsap.utils.clamp(
            0,
            1,
            (sceneProgress - 0.55) * 1.8,
          );
          const scenarioProgress = gsap.utils.clamp(
            0,
            scenarioPanels.length - 1,
            sceneProgress - 1,
          );

          imageRefs.current.forEach((node, index) => {
            if (!node) {
              return;
            }

            let opacity = 0;
            if (index === fromIndex && fromIndex === toIndex) {
              opacity = 1;
            } else if (index === fromIndex) {
              opacity = 1 - mix;
            } else if (index === toIndex) {
              opacity = mix;
            }

            gsap.set(node, { opacity });
          });

          if (heroContentRef.current) {
            gsap.set(heroContentRef.current, {
              opacity: heroOpacity,
              y: (1 - heroOpacity) * -18,
            });
          }

          if (sceneChromeRef.current) {
            gsap.set(sceneChromeRef.current, {
              opacity: scenarioChromeOpacity,
              y: (1 - scenarioChromeOpacity) * 18,
            });
          }

          captionRefs.current.forEach((node, index) => {
            if (!node) {
              return;
            }

            const panelIndex = index + 1;
            let opacity = 0;
            if (panelIndex === fromIndex && fromIndex === toIndex) {
              opacity = 1;
            } else if (panelIndex === fromIndex) {
              opacity = 1 - mix;
            } else if (panelIndex === toIndex) {
              opacity = mix;
            }

            const y = (1 - opacity) * 24;
            gsap.set(node, { opacity, y });
          });

          sceneProgressRefs.current.forEach((node, index) => {
            if (!node) {
              return;
            }

            const fill = gsap.utils.clamp(0, 1, scenarioProgress - index + 1);
            gsap.set(node, { scaleX: fill });
          });
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-black"
      style={{ height: `${SCENE_SWITCH_CONFIG.sectionHeightVh}vh` }}
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        <div className="relative h-full w-full">
          {panels.map((panel, index) => (
            <div
              key={panel.alt}
              ref={(node) => {
                imageRefs.current[index] = node;
              }}
              className="absolute inset-0"
              style={{ opacity: index === 0 ? 1 : 0 }}
            >
              <Image
                src={panel.image}
                alt={panel.alt}
                fill
                priority={index === 0}
                sizes="100vw"
                className="object-cover"
              />
            </div>
          ))}

          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-black/12 to-black/22" />
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_24%_48%,rgba(255,255,255,0.18),transparent_28%)] opacity-60" />

          <div className="relative z-30">{headerSlot}</div>

          <div
            ref={heroContentRef}
            className="pointer-events-none absolute inset-x-0 bottom-[42px] z-20 px-6"
          >
            <div className="mx-auto max-w-[1240px]">
              <div className="mb-8 inline-flex items-center gap-3 border-l-2 border-white/70 pl-4 text-[13px] font-medium uppercase tracking-[0.18em] text-white/80">
                Product
                <span className="h-px w-10 bg-white/55" />
                Z5
              </div>
              {heroContentSlot}
            </div>
          </div>

          <div
            ref={sceneChromeRef}
            className="pointer-events-none absolute inset-x-0 bottom-[34px] z-20 px-6"
          >
            <div className="mx-auto flex max-w-[1240px] flex-col gap-8">
              <div className="flex items-center gap-3 text-[13px] font-medium uppercase tracking-[0.18em] text-white/80">
                <span className="h-px w-10 bg-white/55" />
                Scenarios
              </div>

              <div className="relative min-h-[52px]">
                {scenarioPanels.map((scene, index) => (
                  <div
                    key={`${scene.alt}-caption`}
                    ref={(node) => {
                      captionRefs.current[index] = node;
                    }}
                    className="absolute left-0 top-0 text-[30px] font-medium leading-[1.15] text-white md:text-[46px]"
                    style={{
                      opacity: index === 0 ? 1 : 0,
                      transform: "translateY(0px)",
                    }}
                  >
                    {scene.caption}
                  </div>
                ))}
              </div>

              <div className="grid w-full max-w-[760px] grid-cols-3 gap-4">
                {scenarioPanels.map((scene, index) => (
                  <div key={`${scene.alt}-progress`} className="space-y-2">
                    <div className="h-[2px] overflow-hidden bg-white/25">
                      <div
                        ref={(node) => {
                          sceneProgressRefs.current[index] = node;
                        }}
                        className="h-full origin-left bg-white"
                      />
                    </div>
                    <div className="flex items-start gap-2 text-white/75">
                      <span className="text-[12px] font-semibold leading-5">
                        {String(index + 1).padStart(2, "0")}
                      </span>
                      <span className="text-[12px] font-medium leading-5">
                        {scene.caption}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
