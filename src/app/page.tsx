"use client";

import Image from "next/image";
import Link from "next/link";
import calculatorImage from "../../计算器.png";
import { ScenarioScrollSection } from "@/components/ScenarioScrollSection";

const assets = {
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
  return (
    <main className="w-full bg-white">
      <div className="w-full bg-white">
        <ScenarioScrollSection
          headerSlot={
            <header className="absolute inset-x-0 top-0 z-20 h-[72px] backdrop-blur-[12px]">
              <div className="mx-auto flex h-full max-w-[1240px] items-center justify-between px-6 xl:px-0">
                <Image
                  src={assets.logoLight}
                  alt="zelostech"
                  width={306}
                  height={48}
                  priority
                  className="h-12 w-auto"
                  style={{ width: "auto" }}
                />

                <div className="hidden items-center gap-8 text-[16px] text-[#f5f6f7] lg:flex">
                  <nav className="flex items-center gap-12">
                    {navLinks.map((item) => (
                      <Link
                        key={item}
                        href={
                          item === "Resources"
                            ? "/resources"
                            : item === "About us"
                              ? "/about"
                              : "#"
                        }
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
          }
          heroContentSlot={
            <div className="mx-auto flex max-w-[980px] flex-wrap items-center justify-center gap-x-10 gap-y-10 md:gap-x-24">
              {metricSpecs.map((item) => (
                <div key={item.label} className="min-w-[126px]">
                  <p className="text-[32px] font-semibold leading-[1.1] text-white">
                    {item.target.toFixed(item.decimals)}
                    {item.suffix}
                  </p>
                  <p className="mt-2 text-[14px] text-white/70">{item.label}</p>
                </div>
              ))}
            </div>
          }
        />
        <section className="relative min-h-screen bg-white px-[100px] pt-[80px]">
          <div className="relative w-full">
            <Image
              src={calculatorImage}
              alt="Calculator scene"
              className="h-auto w-full"
              sizes="calc(100vw - 200px)"
            />
          </div>
        </section>
      </div>
    </main>
  );
}
