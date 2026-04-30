# 三个场景图片切换动效参数与代码

## 动效范围

只包含 Product 页面第二屏三个场景图片的滚动切换动效。

不包含文字标题、caption、文字位移或文字透明度参数。

## 当前参数

```ts
const SCENE_SWITCH_CONFIG = {
  sectionHeightVh: 300,
  scrollScrub: 0.55,
} as const;
```

| 参数 | 当前值 | 说明 |
| --- | --- | --- |
| `sectionHeightVh` | `300` | 整个滚动切换区域高度为 `300vh` |
| `scrollScrub` | `0.55` | 滚动与动画同步的平滑延迟 |
| `start` | `"top top"` | 区块顶部到达视口顶部时开始 |
| `end` | `"bottom bottom"` | 区块底部到达视口底部时结束 |
| `ease` | `"sine.inOut"` | 图片交叉淡入淡出的缓动曲线 |
| `sceneCount` | `3` | 三张场景图 |

## 初始状态

```ts
scene1.opacity = 1;
scene2.opacity = 0;
scene3.opacity = 0;
```

## 图片切换逻辑

滚动进度 `scrollProgress` 的范围是 `0` 到 `1`。

三张图片会按滚动进度分成两段切换：

```txt
0%   - 50%   scene 1 -> scene 2
50%  - 100%  scene 2 -> scene 3
```

图片之间使用透明度交叉淡入淡出：

```ts
fromImage.opacity = 1 - mix;
toImage.opacity = mix;
inactiveImage.opacity = 0;
```

`mix` 会经过 `sine.inOut` 缓动处理。

## 可复用核心代码

```tsx
"use client";

import Image, { StaticImageData } from "next/image";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const SCENE_SWITCH_CONFIG = {
  sectionHeightVh: 300,
  scrollScrub: 0.55,
} as const;

type SceneSpec = {
  image: StaticImageData;
  alt: string;
};

type ThreeSceneImageSwitchProps = {
  scenes: SceneSpec[];
};

export function ThreeSceneImageSwitch({ scenes }: ThreeSceneImageSwitchProps) {
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
  }, [scenes.length]);

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
```

## 当前项目对应文件

```txt
src/components/ScenarioScrollSection.tsx
```
