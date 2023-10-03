"use client";

import React from "react";
import { PageHeading } from "@/components/page-heading";
import { useGlobalContext } from "@/context/GlobalContext";
import { NFTCard } from "@/components/nft-card";

export default function Art() {
  const { allItems } = useGlobalContext();
  return (
    <section>
      <PageHeading
        heading="Explore Unique NFT Artworks"
        subheading="Discover and Collect One-of-a-Kind Digital Creations"
        backUrl="/"
      />
      <div className="mx-auto flex w-full flex-col gap-4 pb-8 text-center md:pb-12 md:pt-10 lg:py-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {allItems.map((item) => {
            if (item.category === "Art") {
              return (
                <div key={item.itemId}>
                  <NFTCard {...item} />
                </div>
              );
            }
          })}
        </div>
      </div>
    </section>
  );
}
