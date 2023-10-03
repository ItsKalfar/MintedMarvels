"use client";

import React from "react";
import { PageHeading } from "@/components/page-heading";
import { useGlobalContext } from "@/context/GlobalContext";
import { NFTCard } from "@/components/nft-card";

export default function Memberships() {
  const { allItems } = useGlobalContext();
  return (
    <section>
      <PageHeading
        heading="Exclusive Membership NFTs"
        subheading="Unlock Premium Access and Perks with Membership NFTs"
        backUrl="/"
      />
      <div className="mx-auto flex w-full flex-col gap-4 pb-8 text-center md:pb-12 md:pt-10 lg:py-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
          {allItems.map((item) => {
            if (item.category === "Membership") {
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
