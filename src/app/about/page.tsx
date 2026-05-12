import { AboutCopySection } from "@/components/AboutCopySection";
import { AboutHeroIntro } from "@/components/AboutHeroIntro";
import { AboutHeroVehicle } from "@/components/AboutHeroVehicle";
import { AboutNewsSection } from "@/components/AboutNewsSection";
import { AboutSiteHeader } from "@/components/AboutSiteHeader";
import { AboutTimelineSection } from "@/components/AboutTimelineSection";
import heroVehicleAltImage from "../../../details_hero.png";
import heroVehicleThirdImage from "../../../1.png";
import heroVehicleImage from "../../../public/hero.png";
import milestone2021Image from "../../../public/2021.png";
import milestone2022Image from "../../../public/2022.png";
import milestone2023Image from "../../../public/20231.png";
import milestoneFairPriceImage from "../../../public/20232.png";
import milestone20241Image from "../../../public/20241.png";
import milestone20242Image from "../../../public/20242.png";
import milestone20251Image from "../../../public/20251.png";
import milestone20252Image from "../../../public/20252.png";

const assets = {
  logoDark: "/footer logo.svg",
  click: "/click.png",
  heroVehicle: heroVehicleImage,
  milestone2021: milestone2021Image,
  milestone2022: milestone2022Image,
  milestone2023: milestone2023Image,
  milestoneFairPrice: milestoneFairPriceImage,
  milestone20241: milestone20241Image,
  milestone20242: milestone20242Image,
  milestone20251: milestone20251Image,
  milestone20252: milestone20252Image,
};

const milestones = [
  {
    year: "2021",
    axisMonth: 0,
    image: assets.milestone2021,
    title: "Zelostech Founded",
    description:
      "Founded in 2021, Zelostech was established by a world-class autonomous driving team and is a leading global autonomous driving technology company.",
  },
  {
    year: "2022",
    axisMonth: 5,
    image: assets.milestone2022,
    title: "Launch the first prototype vehicle",
    description:
      "In May 2022, Zelostech officially launched its first autonomous logistics prototype vehicle, marking a pivotal first step in the company’s journey.",
  },
  {
    year: "2023",
    axisMonth: 6,
    image: assets.milestone2023,
    title: "Z5 mass production offline",
    description:
      "In June 2023, Zelostech began mass production of the Z5, a versatile autonomous delivery vehicle purpose-built for urban logistics scenarios.",
  },
  {
    year: "2023",
    axisMonth: 9,
    image: assets.milestoneFairPrice,
    title: "Zelostech Partners with FairPrice",
    description:
      "Zelostech signed a cooperation agreement with Singapore’s FairPrice to launch an autonomous urban logistics transfer project.",
  },
  {
    year: "2024",
    axisMonth: 6,
    image: assets.milestone20241,
    title:
      "Released the industry’s first new model designed to cover all scenarios.",
    description:
      "In June 2024, Zelostech unveiled the industry’s first all-scenario Z-Series platform along with its full lineup of models. The launch generated strong market momentum.",
  },
  {
    year: "2024",
    axisMonth: 11,
    image: assets.milestone20242,
    title:
      "Obtained the first autonomous logistics vehicle license in Singapore",
    description:
      "Contributed to revising Singapore’s TR-68 autonomous driving technical standards, helping to fill local regulatory gaps, and obtained the first autonomous logistics vehicle license.",
  },
  {
    year: "2025",
    axisMonth: 2,
    image: assets.milestone20251,
    title:
      "Winning the \"DHL Fast Forward Challenge\" global championship in Dubai",
    description:
      "On February 26 (local time in the UAE), at the highly anticipated “DHL Fast Forward Challenge” 2025 competition, Zelostech reached the global finals and won the global championship.",
  },
  {
    year: "2025",
    axisMonth: 9,
    image: assets.milestone20252,
    title:
      "Launched the L-Series platform models and introduced L4.5-level autonomous driving technology.",
    description:
      "In September 2025, the company released its L4.5 autonomous driving technology and simultaneously launched the first model of the L-series platform.",
  },
];

const heroVehicleImages = [
  {
    src: assets.heroVehicle,
    alt: "Zelostech autonomous RoboVan loading cargo",
  },
  {
    src: heroVehicleAltImage,
    alt: "Zelostech Z5 autonomous delivery vehicle",
  },
  {
    src: heroVehicleThirdImage,
    alt: "Zelostech autonomous delivery vehicle in logistics scenario",
  },
];

export default function AboutPage() {
  return (
    <main className="w-full bg-white">
      <div className="mx-auto w-full max-w-[1440px] bg-white">
        <AboutSiteHeader />

        <section className="px-6 pb-20 pt-[228px] text-center md:pb-[100px]">
          <AboutHeroIntro />

          <div className="mt-[80px]">
            <AboutHeroVehicle images={heroVehicleImages} />
          </div>
        </section>

        <AboutCopySection />

        <div className="mt-[200px]">
          <AboutTimelineSection milestones={milestones} />
        </div>

        <div className="mt-[100px]">
          <AboutNewsSection />
        </div>
      </div>
    </main>
  );
}
