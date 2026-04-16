"use client";

import Image, { StaticImageData } from "next/image";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import sceneImage1 from "../../1.png";
import sceneImage2 from "../../2.png";
import sceneImage3 from "../../3.png";

gsap.registerPlugin(ScrollTrigger);

const SCENE_SWITCH_CONFIG = {
  sectionHeightVh: 300,
  scrollScrub: 0.55,
} as const;

type SceneSpec = {
  image: StaticImageData;
  alt: string;
};

const scenes: SceneSpec[] = [
  {
    image: sceneImage1,
    alt: "Scene 1",
  },
  {
    image: sceneImage2,
    alt: "Scene 2",
  },
  {
    image: sceneImage3,
    alt: "Scene 3",
  },
];

export function ScenarioScrollSection() {
  const sectionRef = useRef<HTMLElement | null>(null);
  const imageRefs = useRef<Array<HTMLDivElement | null>>([]);
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

      ScrollTrigger.create({
        trigger: sectionRef.current,
        start: "top top",
        end: "bottom bottom",
        scrub: SCENE_SWITCH_CONFIG.scrollScrub,
        invalidateOnRefresh: true,
        onUpdate: (self) => {
          const sceneProgress = gsap.utils.clamp(
            0,
            scenes.length - 1,
            self.progress * (scenes.length - 1),
          );
          const fromIndex = Math.floor(sceneProgress);
          const toIndex = Math.min(scenes.length - 1, fromIndex + 1);
          const rawMix = sceneProgress - fromIndex;
          const mix = mixEase.current(rawMix);

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
          {scenes.map((scene, index) => (
            <div
              key={scene.alt}
              ref={(node) => {
                imageRefs.current[index] = node;
              }}
              className="absolute inset-0"
              style={{ opacity: index === 0 ? 1 : 0 }}
            >
              <Image
                src={scene.image}
                alt={scene.alt}
                fill
                priority={index === 0}
                sizes="100vw"
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
