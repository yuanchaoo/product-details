import Image from "next/image";
import { AboutCopySection } from "@/components/AboutCopySection";
import { AboutHeroIntro } from "@/components/AboutHeroIntro";
import { AboutHeroVehicle } from "@/components/AboutHeroVehicle";
import { AboutSiteHeader } from "@/components/AboutSiteHeader";
import { AboutTimelineSection } from "@/components/AboutTimelineSection";

const assets = {
  logoDark: "/footer logo.svg",
  click: "/click.png",
  heroVehicle:
    "https://www.figma.com/api/mcp/asset/a5711eb8-0912-4847-8cef-1e974485e394",
  milestone2021:
    "https://www.figma.com/api/mcp/asset/9627e176-7d5d-4b1d-9655-13b44d5e499e",
  milestone2022:
    "https://www.figma.com/api/mcp/asset/7553a87c-c220-4f36-8f45-68805008a9a2",
  milestone2023:
    "https://www.figma.com/api/mcp/asset/ce303efe-7031-47fa-b779-b17ae58ddf4f",
  milestoneFairPrice:
    "https://www.figma.com/api/mcp/asset/7692be72-bf49-4f84-93e0-b142396a5e9f",
  news1:
    "https://www.figma.com/api/mcp/asset/68b4fd65-8606-4aa4-a77d-9555932c064a",
  news2:
    "https://www.figma.com/api/mcp/asset/ebd58e38-110b-460c-877f-f65730b596d1",
  news3:
    "https://www.figma.com/api/mcp/asset/20a55bea-a3f5-4932-b5fc-95c4729d8ee5",
  news4:
    "https://www.figma.com/api/mcp/asset/f7a08bc9-3ced-4b42-968b-cb1dffeed449",
};

const milestones = [
  {
    year: "2021",
    image: assets.milestone2021,
    title: "Zelostech Founded",
    description:
      "Founded in 2021, Zelostech was established by a world-class autonomous driving team and is a leading global autonomous driving technology company.",
  },
  {
    year: "2022",
    image: assets.milestone2022,
    title: "Launch the first prototype vehicle",
    description:
      "In May 2022, Zelostech officially launched its first autonomous logistics prototype vehicle, marking a pivotal first step in the company’s journey.",
  },
  {
    year: "2023",
    image: assets.milestone2023,
    title: "Z5 mass production offline",
    description:
      "In June 2023, Zelostech began mass production of the Z5, a versatile autonomous delivery vehicle purpose-built for urban logistics scenarios.",
  },
  {
    year: "2023",
    image: assets.milestoneFairPrice,
    title: "Zelostech Partners with FairPrice",
    description:
      "Zelostech signed a cooperation agreement with Singapore’s FairPrice to launch an autonomous urban logistics transfer project.",
  },
];

const newsCards = [
  {
    image: assets.news1,
    title:
      "The Global Partner of Choice for Autonomous Logistics: Zelostech Deploys RoboVan at Abu Dhabi’s KEZAD",
  },
  {
    image: assets.news2,
    title:
      "Strategic Integration: Zelostech and Cainiao RoboVan Form Alliance to Build a Global RoboVan Platform",
  },
  {
    image: assets.news3,
    title:
      "Zelostech Signs Strategic MOU with Singapore Post to Accelerate Deploy",
  },
  {
    image: assets.news4,
    title:
      "Autonomous logistics solutions continue expanding across urban delivery scenarios",
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
            <AboutHeroVehicle
              src={assets.heroVehicle}
              alt="Zelostech autonomous RoboVan"
            />
          </div>
        </section>

        <AboutCopySection />

        <div className="px-6 pt-[120px]">
          <div className="mx-auto h-px max-w-[1240px] bg-[#f0f1f2]" />
        </div>

        <AboutTimelineSection milestones={milestones} />

        <section className="overflow-hidden bg-[#f5f7fb] px-6 py-[70px]">
          <div className="mx-auto max-w-[1240px]">
            <h2 className="text-[32px] font-semibold leading-[1.2] text-[#222943]">
              Latest news and events.
            </h2>
            <div className="mt-10 flex gap-5 overflow-x-auto pb-4">
              {newsCards.map((card) => (
                <article key={card.title} className="w-[375px] shrink-0">
                  <div className="relative h-[268px] overflow-hidden rounded-[8px]">
                    <Image
                      src={card.image}
                      alt={card.title}
                      fill
                      unoptimized
                      className="object-cover"
                      sizes="375px"
                    />
                  </div>
                  <p className="mt-[17px] text-[14px] font-semibold text-[#8e919f]">
                    December 2, 2025
                  </p>
                  <h3 className="mt-[17px] text-[18px] font-medium leading-8 text-[#040b29]">
                    {card.title}
                  </h3>
                </article>
              ))}
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
