"use client";

import Image, { StaticImageData } from "next/image";
import { useLayoutEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import postalSceneImage from "../../Postal Services.png";
import expressDeliverySceneImage from "../../Express Delivery.png";
import hypermarketsSceneImage from "../../Hypermarkets.png";

gsap.registerPlugin(ScrollTrigger);

const SCENE_SWITCH_CONFIG = {
  sectionHeightVh: 300,
  panelGap: 48,
  imageWidth: 880,
  imageHeight: 608,
  textPanelWidth: 300,
  textPanelHeight: 609,
  scrollScrub: 0.42,
  textInactiveOpacity: 0.5,
  textActiveScale: 1.02,
  overlayStartY: 38,
  textParallaxY: 10,
} as const;

type SceneSpec = {
  title: string;
  image: StaticImageData;
  alt: string;
};

const scenes: SceneSpec[] = [
  {
    title: "Postal Services",
    image: postalSceneImage,
    alt: "Postal Services logistics scene",
  },
  {
    title: "Express Delivery",
    image: expressDeliverySceneImage,
    alt: "Express Delivery logistics scene",
  },
  {
    title: "Hypermarkets",
    image: hypermarketsSceneImage,
    alt: "Hypermarkets logistics scene",
  },
];

export function ScenarioScrollSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const imageRefs = useRef<Array<HTMLDivElement | null>>([]);
  const titleRefs = useRef<Array<HTMLDivElement | null>>([]);
  const underlineRefs = useRef<Array<HTMLSpanElement | null>>([]);
  const [activeIndex, setActiveIndex] = useState(0);

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
          clipPath: index === 0 ? "inset(0% 0% 0% 0%)" : "inset(100% 0% 0% 0%)",
          y: index === 0 ? 0 : SCENE_SWITCH_CONFIG.overlayStartY,
        });
      });

      titleRefs.current.forEach((node, index) => {
        if (!node) {
          return;
        }

        gsap.set(node, {
          color: index === 0 ? "#151823" : "#b2b6bd",
          opacity: index === 0 ? 1 : SCENE_SWITCH_CONFIG.textInactiveOpacity,
          scale: index === 0 ? SCENE_SWITCH_CONFIG.textActiveScale : 1,
          y: 0,
        });
      });

      underlineRefs.current.forEach((node, index) => {
        if (!node) {
          return;
        }

        gsap.set(node, {
          scaleX: index === 0 ? 1 : 0,
          opacity: index === 0 ? 1 : 0,
        });
      });

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: SCENE_SWITCH_CONFIG.scrollScrub,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          // scroll -> index: map [0,1] to [0, scenes.length - 1]
          const sceneProgress = self.progress * (scenes.length - 1);
          const nearestIndex = Math.min(
            scenes.length - 1,
            Math.max(0, Math.round(sceneProgress)),
          );
          setActiveIndex((prev) => (prev === nearestIndex ? prev : nearestIndex));

          imageRefs.current.forEach((node, index) => {
            if (!node) {
              return;
            }

            if (index === 0) {
              gsap.set(node, { clipPath: "inset(0% 0% 0% 0%)", y: 0 });
              return;
            }

            // each overlay image starts revealing when progress reaches its segment
            const reveal = gsap.utils.clamp(0, 1, sceneProgress - (index - 1));
            const topInsetPercent = (1 - reveal) * 100;
            const y = (1 - reveal) * SCENE_SWITCH_CONFIG.overlayStartY;

            gsap.set(node, {
              clipPath: `inset(${topInsetPercent}% 0% 0% 0%)`,
              y,
            });
          });

          titleRefs.current.forEach((node, index) => {
            if (!node) {
              return;
            }

            const influence = gsap.utils.clamp(0, 1, 1 - Math.abs(sceneProgress - index));
            const color = gsap.utils.interpolate("#b2b6bd", "#151823", influence);
            const opacity =
              SCENE_SWITCH_CONFIG.textInactiveOpacity +
              (1 - SCENE_SWITCH_CONFIG.textInactiveOpacity) * influence;
            const scale = 1 + (SCENE_SWITCH_CONFIG.textActiveScale - 1) * influence;
            const y = (1 - influence) * SCENE_SWITCH_CONFIG.textParallaxY;

            gsap.set(node, {
              color,
              opacity,
              scale,
              y,
            });
          });

          underlineRefs.current.forEach((node, index) => {
            if (!node) {
              return;
            }

            const influence = gsap.utils.clamp(0, 1, 1 - Math.abs(sceneProgress - index));
            gsap.set(node, {
              scaleX: influence,
              opacity: influence,
            });
          });
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-[rgb(245,245,247)]"
      style={{ height: `${SCENE_SWITCH_CONFIG.sectionHeightVh}vh` }}
    >
      <div className="sticky top-0 flex h-screen items-center">
        <div
          className="mx-auto flex w-full items-center justify-center px-6"
          style={{ gap: `${SCENE_SWITCH_CONFIG.panelGap}px` }}
        >
          <div
            className="relative overflow-hidden  bg-[#dbe0e8]"
            style={{
              width: `${SCENE_SWITCH_CONFIG.imageWidth}px`,
              height: `${SCENE_SWITCH_CONFIG.imageHeight}px`,
            }}
          >
            {scenes.map((scene, index) => (
              <div
                key={scene.title}
                ref={(node) => {
                  imageRefs.current[index] = node;
                }}
                className="absolute inset-0 will-change-transform will-change-[clip-path]"
                style={{
                  clipPath:
                    index === 0 ? "inset(0% 0% 0% 0%)" : "inset(100% 0% 0% 0%)",
                }}
              >
                <Image
                  src={scene.image}
                  alt={scene.alt}
                  fill
                  className="object-cover"
                  sizes="(max-width: 1200px) 100vw, 880px"
                  priority={index === 0}
                />
              </div>
            ))}
          </div>

          <div
            className=" bg-white px-10 shadow-[0_0_20px_0_rgba(0,0,0,0.03)]"
            style={{
              width: `${SCENE_SWITCH_CONFIG.textPanelWidth}px`,
              height: `${SCENE_SWITCH_CONFIG.textPanelHeight}px`,
            }}
          >
            <ul className="flex h-full flex-col justify-center space-y-10">
              {scenes.map((scene, index) => {
                const isActive = index === activeIndex;

                return (
                  <li key={`scene-text-${scene.title}`}>
                    <div
                      ref={(node) => {
                        titleRefs.current[index] = node;
                      }}
                      className={`origin-left text-[24px] leading-[1.2] tracking-[-0.01em] font-medium font-['Poppins'] ${
                        isActive ? "text-[#151823]" : "text-[#b2b6bd]"
                      }`}
                    >
                      {scene.title}
                    </div>
                    <span
                      ref={(node) => {
                        underlineRefs.current[index] = node;
                      }}
                      className="mt-3 block h-[2px] w-[140px] origin-left bg-[#151823]"
                      style={{
                        transform: `scaleX(${isActive ? 1 : 0})`,
                        opacity: isActive ? 1 : 0,
                      }}
                    />
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
