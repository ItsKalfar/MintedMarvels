"use client";
import { Balancer } from "react-wrap-balancer";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/section-heading";
import { CategoryCard } from "@/components/category-card";
import { useGlobalContext } from "@/context/GlobalContext";

import art from "@/assets/art.jpg";
import photography from "@/assets/photography.jpg";
import music from "@/assets/music.jpg";
import membership from "@/assets/membership.jpg";
import gaming from "@/assets/gaming.jpg";
import { NFTCard } from "@/components/nft-card";

const CategoriesList = [
  { categoryName: "Art", url: "/art", imageUrl: art },
  { categoryName: "Photography", url: "/photography", imageUrl: photography },
  { categoryName: "Gaming", url: "/gaming", imageUrl: gaming },
  { categoryName: "Memberships", url: "/memberships", imageUrl: membership },
];

export default function Home() {
  const { allItems } = useGlobalContext();
  return (
    <>
      <section
        id="hero"
        aria-labelledby="hero-heading"
        className="mx-auto flex w-full max-w-[64rem] flex-col items-center justify-center gap-4 pb-8 pt-6 text-center md:pb-12 md:pt-10 lg:py-36"
      >
        <h1 className="text-3xl font-bold leading-tight tracking-tighter md:text-5xl lg:text-6xl lg:leading-[1.1]">
          Discover, Collect, Create: Your Gateway to the NFT Universe
        </h1>
        <Balancer className="max-w-[42rem] leading-normal text-muted-foreground sm:text-xl sm:leading-8">
          Explore a Realm of Digital Art, One-of-a-Kind Collectibles, and
          Limitless Creative Horizons
        </Balancer>

        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link href="/art">
            <Button>Buy</Button>
          </Link>
          <Link href="/mynfts">
            <Button>Sell</Button>
          </Link>
        </div>
      </section>
      <section
        id="categories"
        aria-labelledby="categories"
        className="mx-auto flex w-full max-w-[64rem] flex-col items-center justify-center gap-4 pb-8 pt-6 text-center md:pb-12 md:pt-10 lg:py-28"
      >
        <Heading
          mainHeading="Discover Our Categories"
          subHeading="Uncover a World of Unique NFT Categories, Each with Its Own Stories and Artistry"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {CategoriesList.map((category) => {
            const { categoryName, imageUrl, url } = category;
            return (
              <div key={categoryName}>
                <CategoryCard
                  categoryName={categoryName}
                  url={url}
                  imageUrl={imageUrl}
                />
              </div>
            );
          })}
        </div>
      </section>
      <section
        id="latest"
        aria-labelledby="latest-nfts"
        className="mx-auto flex w-full max-w-[64rem] flex-col items-center justify-center gap-4 pb-8 pt-6 text-center md:pb-12 md:pt-10 lg:py-28"
      >
        <Heading
          mainHeading="Unveiling The NFT Renaissance"
          subHeading="Embrace the Future with Our Latest NFT Creations and Unearth Digital Art's New Golden Age"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {allItems.slice(0, 4).map((item) => {
            if (!item.sold) {
              return (
                <div key={item.itemId}>
                  <NFTCard {...item} />
                </div>
              );
            }
          })}
        </div>
      </section>
    </>
  );
}
