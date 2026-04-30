"use client";

import { motion, useMotionValueEvent, useScroll } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

const assets = {
  logoDark: "/footer logo.svg",
  click: "/click.png",
};

const navLinks = [
  { label: "Products", href: "/" },
  { label: "Scenarios", href: "#" },
  { label: "Resources", href: "/resources" },
  { label: "About us", href: "/about" },
];

export function AboutSiteHeader() {
  const { scrollY } = useScroll();
  const [isHidden, setIsHidden] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0;
    const isScrollingDown = latest > previous;

    setIsHidden(isScrollingDown && latest > 24);
  });

  return (
    <motion.header
      animate={{ y: isHidden ? -72 : 0 }}
      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
      className="fixed left-0 right-0 top-0 z-50 h-[72px] bg-white/70 backdrop-blur-[15px]"
    >
      <div className="mx-auto flex h-full max-w-[1240px] items-center justify-between px-6 xl:px-0">
        <Link href="/" aria-label="Zelostech home">
          <Image
            src={assets.logoDark}
            alt="zelostech"
            width={240}
            height={38}
            className="h-10 w-auto"
          />
        </Link>

        <div className="hidden items-center gap-[50px] lg:flex">
          <nav className="flex items-center gap-12 text-[16px] text-[#222943]">
            {navLinks.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={
                  item.label === "About us"
                    ? "text-[#25cacc]"
                    : "transition-opacity hover:opacity-70"
                }
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <button className="flex h-[34px] items-center gap-2 rounded-[3px] bg-[#222943] px-4 text-[16px] font-bold text-white">
            Get in touch
            <Image src={assets.click} alt="" width={16} height={16} />
          </button>
        </div>
      </div>
    </motion.header>
  );
}
