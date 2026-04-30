import Image from "next/image";
import Link from "next/link";

const assets = {
  logoDark: "/footer logo.svg",
  click: "/click.png",
  card1: "https://www.figma.com/api/mcp/asset/01c8cf03-caa4-47d8-9062-2a061c783424",
  card2: "https://www.figma.com/api/mcp/asset/62eb8d7b-90d2-4a32-8d28-a31178243be1",
  card3: "https://www.figma.com/api/mcp/asset/a33361d5-3092-4491-b261-c1d69f1a6a28",
  card4: "https://www.figma.com/api/mcp/asset/b6ff2eb9-aa02-4b09-b108-0e9fd6be5c37",
  card5: "https://www.figma.com/api/mcp/asset/e073bda0-d7f0-43f7-8e88-ba0155635abc",
  card6: "https://www.figma.com/api/mcp/asset/25f21339-dcd2-46a8-ae84-a99e0c59c4c1",
};

const navLinks = ["Products", "Scenarios", "Resources", "About us"];

const newsCards = [
  {
    image: assets.card1,
    date: "December 2, 2025",
    title:
      "Strategic Integration: Zelostech and Cainiao RoboVan Form Alliance to Build a Global RoboVan Platform",
  },
  {
    image: assets.card2,
    date: "December 2, 2025",
    title:
      "The Global Partner of Choice for Autonomous Logistics: Zelostech Deploys RoboVan at Abu Dhabi’s KEZAD, Launching a New Era of Strategic Delivery",
  },
  {
    image: assets.card3,
    date: "December 2, 2025",
    title:
      "The Global Partner of Choice for Autonomous Logistics: Zelostech Deploys RoboVan at Abu Dhabi’s KEZAD, Launching a New Era of Strategic Delivery",
  },
  {
    image: assets.card4,
    date: "December 2, 2025",
    title:
      "The Global Partner of Choice for Autonomous Logistics: Zelostech Deploys RoboVan at Abu Dhabi’s KEZAD, Launching a New Era of Strategic Delivery",
  },
  {
    image: assets.card5,
    date: "December 2, 2025",
    title:
      "The Global Partner of Choice for Autonomous Logistics: Zelostech Deploys RoboVan at Abu Dhabi’s KEZAD, Launching a New Era of Strategic Delivery",
  },
  {
    image: assets.card6,
    date: "December 2, 2025",
    title:
      "The Global Partner of Choice for Autonomous Logistics: Zelostech Deploys RoboVan at Abu Dhabi’s KEZAD, Launching a New Era of Strategic Delivery",
  },
];

export default function ResourcesPage() {
  return (
    <main className="w-full bg-white">
      <div className="mx-auto w-full max-w-[1440px] bg-white">
        <header className="sticky top-0 z-40 h-[72px] backdrop-blur-[15px] bg-white/70">
          <div className="mx-auto flex h-full max-w-[1240px] items-center justify-between pl-0 pr-6">
            <Image
              src={assets.logoDark}
              alt="zelostech"
              width={320}
              height={50}
              className="h-[50px] w-auto"
            />

            <div className="hidden items-center gap-[50px] lg:flex">
              <nav className="flex items-center gap-12 text-[16px] text-[#222943]">
                {navLinks.map((item) => (
                  <Link
                    key={item}
                    href={
                      item === "Resources"
                        ? "/resources"
                        : item === "About us"
                          ? "/about"
                          : item === "Products"
                            ? "/"
                            : "#"
                    }
                    className={item === "Resources" ? "text-[#25cacc]" : "transition-opacity hover:opacity-70"}
                  >
                    {item}
                  </Link>
                ))}
              </nav>
              <button className="flex h-[34px] items-center gap-2 rounded-[3px] bg-[#222943] px-4 text-[16px] font-bold text-white">
                Get in touch
                <Image
                  src={assets.click}
                  alt=""
                  width={16}
                  height={16}
                  className="h-4 w-4"
                />
              </button>
            </div>
          </div>
        </header>

        <section className="px-6 pb-20 pt-16 md:pb-24 md:pt-24">
          <div className="mx-auto max-w-[1240px]">
            <h1 className="text-[56px] font-semibold leading-[1.05] text-[#222943] md:text-[70px] md:leading-[80px]">
              News
              <br />
              &amp; Events
            </h1>

            <div className="mt-16 grid gap-x-5 gap-y-14 md:grid-cols-2 xl:grid-cols-3">
              {newsCards.map((card, index) => (
                <article key={`news-card-${index}`} className="group w-full">
                  <div className="relative h-[250px] w-full overflow-hidden rounded-[8px]">
                    <Image
                      src={card.image}
                      alt={card.title}
                      fill
                      className="object-cover transition-transform duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] group-hover:scale-105"
                      sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 400px"
                    />
                  </div>
                  <p className="mt-[15px] text-[14px] font-semibold text-[#8e919f]">{card.date}</p>
                  <h2 className="mt-[15px] line-clamp-3 text-[16px] font-semibold leading-[1.5] text-[#040b29]">
                    {card.title}
                  </h2>
                </article>
              ))}
            </div>

            <div className="mt-12 flex justify-center">
              <button className="h-[34px] rounded-[3px] border border-[#222943] px-4 text-[16px] text-[#222943]">
                Load more
              </button>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
