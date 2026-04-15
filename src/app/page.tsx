"use client";

import {
  motion,
} from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import detailsHeroImage from "../../details_hero.png";
import { ScenarioScrollSection } from "@/components/ScenarioScrollSection";

const assets = {
  hero: detailsHeroImage,
  logoDark:
    "https://www.figma.com/api/mcp/asset/c09e776a-e946-486b-9d81-f10ca738c3e0",
  logoLight: "/logo.svg",
  logoFooter: "/footer logo.svg",
  arrow: "/arrow.png",
  globe: "/globe.svg",
  location: "/icon_location_s.svg",
  communicate: "/icon_communicate_s.svg",
  x: "/X.png",
  linkedIn: "/link.png",
  instagram: "/ins.png",
  youtube: "/YouTube.png",
};

type MetricSpec = {
  target: number;
  decimals: number;
  suffix: string;
  label: string;
};

const metricSpecs: MetricSpec[] = [
  { target: 330, decimals: 0, suffix: " km", label: "Maximum Range" },
  { target: 1000, decimals: 0, suffix: " kg", label: "Payload Capacity" },
  { target: 5.8, decimals: 1, suffix: " m³", label: "Cargo Volume" },
  { target: 28.3, decimals: 1, suffix: " kWh", label: "Capitalize P" },
];

const navLinks = ["Products", "Scenarios", "Resources", "About us"];

export default function Home() {
  const [secondScreenInView, setSecondScreenInView] = useState(false);

  const handleSecondScreenEnter = () => {
    setSecondScreenInView(true);
  };

  const handleSecondScreenLeave = () => {
    setSecondScreenInView(false);
  };

  return (
    <main className="w-full bg-white">
      <div className="w-full bg-white">
        <section className="relative isolate h-[540px] overflow-hidden md:h-[820px]">
          <Image
            src={assets.hero}
            alt="Hero background"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/10 to-black/20" />

          <header className="absolute inset-x-0 top-0 z-20 h-[72px] backdrop-blur-[12px]">
            <div className="mx-auto flex h-full max-w-[1240px] items-center justify-between px-0">
              <Image
                src={assets.logoLight}
                alt="zelostech"
                width={306}
                height={48}
                className="h-12 w-auto"
              />

              <div className="hidden items-center gap-8 text-[16px] text-[#f5f6f7] lg:flex">
                <nav className="flex items-center gap-12">
                  {navLinks.map((item) => (
                    <Link
                      key={item}
                      href={item === "Resources" ? "/resources" : "#"}
                      className="transition-opacity hover:opacity-80"
                    >
                      {item}
                    </Link>
                  ))}
                </nav>
                <button className="flex h-[34px] items-center gap-2 rounded-[3px] bg-white px-4 text-[16px] font-bold text-[#222943]">
                  Get in touch
                  <Image src={assets.arrow} alt="" width={16} height={16} />
                </button>
              </div>

            </div>
          </header>

          <motion.div
            className="absolute bottom-[45px] left-0 right-0 z-20 px-6"
            viewport={{ amount: 0.25 }}
            onViewportEnter={handleSecondScreenEnter}
            onViewportLeave={handleSecondScreenLeave}
          >
            <div className="mx-auto flex max-w-[980px] flex-wrap items-center justify-center gap-x-10 gap-y-10 md:gap-x-24">
              {metricSpecs.map((item, index) => (
                <motion.div
                  key={item.label}
                  className="min-w-[126px]"
                  initial={{ opacity: 0, y: 24 }}
                  animate={
                    secondScreenInView
                      ? { opacity: 1, y: 0 }
                      : { opacity: 0, y: 24 }
                  }
                  transition={{
                    duration: 0.65,
                    delay: index * 0.1,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                >
                  <p className="text-[32px] font-semibold leading-[1.1] text-white">
                    {item.target.toFixed(item.decimals)}
                    {item.suffix}
                  </p>
                  <p className="mt-2 text-[14px] text-white/70">{item.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>
        <ScenarioScrollSection />
      </div>
    </main>
  );
}
