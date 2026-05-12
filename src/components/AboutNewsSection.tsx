import Image from "next/image";
import Link from "next/link";
import newsMainImage from "../../public/news-main.png";
import newsThumb1Image from "../../public/news-thumb-1.png";
import newsThumb2Image from "../../public/news-thumb-2.png";
import newsThumb3Image from "../../public/news-thumb-3.png";

const featuredNews = {
  image: newsMainImage,
  title: "China’s milestone in unmanned freight going overseas!",
  description:
    "China’s milestone in unmanned freight going overseas! Partnering with Singapore’s largest chain supermarket, Jiushi has been awarded the first unmanned freight...",
  date: "May 29, 2025",
};

const sideNews = [
  {
    image: newsThumb1Image,
    title: "NineSense Intelligence has signed a joint ...",
    description:
      "China’s milestone in unmanned freight going overseas! Partnering with Singapore’s largest chain supermarket, Jiushi has been awarde...",
    date: "May 29, 2025",
  },
  {
    image: newsThumb2Image,
    title: "NineSense Intelligence has signed a joint ...",
    description:
      "China’s milestone in unmanned freight going overseas! Partnering with Singapore’s largest chain supermarket, Jiushi has been awarde...",
    date: "May 29, 2025",
  },
  {
    image: newsThumb3Image,
    title: "NineSense Intelligence has signed a joint ...",
    description:
      "China’s milestone in unmanned freight going overseas! Partnering with Singapore’s largest chain supermarket...",
    date: "May 29, 2025",
  },
];

export function AboutNewsSection() {
  return (
    <section className="bg-[rgba(0,94,255,0.04)] px-6 pb-20 pt-20 md:pb-[100px]">
      <div className="mx-auto max-w-[1240px]">
        <h2 className="text-[38px] font-semibold leading-[1.15] text-black md:text-[60px]">
          Latest news and events.
        </h2>

        <div className="mt-14 grid gap-8 lg:grid-cols-[550px_minmax(0,1fr)] lg:gap-8">
          <article className="overflow-hidden rounded-[8px] bg-[#222943]/[0.06]">
            <div className="relative h-[310px] w-full">
              <Image
                src={featuredNews.image}
                alt={featuredNews.title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) calc(100vw - 48px), 550px"
              />
            </div>
            <div className="px-5 pb-7 pt-5">
              <h3 className="text-[16px] font-semibold leading-normal text-[#222943]">
                {featuredNews.title}
              </h3>
              <p className="mt-2 text-[16px] leading-normal text-[#8e919f]">
                {featuredNews.description}
              </p>
              <p className="mt-4 text-[14px] font-semibold leading-normal text-[#8e919f]">
                {featuredNews.date}
              </p>
            </div>
          </article>

          <div className="grid gap-5">
            {sideNews.map((item) => (
              <article
                key={`${item.title}-${item.image.src}`}
                className="grid overflow-hidden rounded-[8px] bg-[#222943]/[0.06] md:grid-cols-[250px_minmax(0,1fr)]"
              >
                <div className="relative h-[180px] md:h-[160px]">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) calc(100vw - 48px), 250px"
                  />
                </div>
                <div className="flex flex-col justify-between px-5 py-[13px]">
                  <div>
                    <h3 className="line-clamp-1 text-[16px] font-semibold leading-normal text-[#222943]">
                      {item.title}
                    </h3>
                    <p className="mt-2 line-clamp-2 text-[16px] leading-normal text-[#8e919f]">
                      {item.description}
                    </p>
                  </div>
                  <p className="mt-3 text-[14px] font-semibold leading-normal text-[#8e919f]">
                    {item.date}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-[44px] flex justify-center">
          <div className="flex items-center gap-1">
            <span className="h-1 w-[30px] bg-black" />
            <span className="h-1 w-[30px] bg-black/30" />
            <span className="h-1 w-[30px] bg-black/30" />
          </div>
        </div>

        <div className="mt-10 flex justify-center">
          <Link
            href="/resources"
            className="flex h-[34px] items-center justify-center gap-[5px] rounded-[3px] bg-[#222943] px-4 text-[16px] font-medium text-white"
          >
            Learn more
            <span aria-hidden="true" className="-rotate-45 text-[18px] leading-none">
              →
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
}
