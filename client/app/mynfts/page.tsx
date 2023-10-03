"use client";

import React from "react";
import { PageHeading } from "@/components/page-heading";
import { useGlobalContext } from "@/context/GlobalContext";
import { NFTCard } from "@/components/nft-card";

export default function MyNFTS() {
  const { currentAccount, allItems } = useGlobalContext();
  return (
    <>
      <section>
        <PageHeading
          heading="Collector's Corner: My NFT Showcase"
          subheading="Curate Your Personal NFT Exhibition - These Are Your Digital Artifacts"
          backUrl="/"
        />
        {currentAccount ? (
          <div className="mx-auto flex w-full flex-col gap-4 pb-8 text-center md:pb-12 md:pt-10 lg:py-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {allItems.map((item) => {
                if (currentAccount === item.owner) {
                  return (
                    <div key={item.itemId}>
                      <NFTCard {...item} />
                    </div>
                  );
                }
              })}
            </div>
          </div>
        ) : (
          <div className="text-center flex flex-col items-center">
            <h2 className="mb-2">Please Connect Wallet</h2>
            <p className="w-[370px]">
              Unlock the Power of Your Digital Assets. Connect Your Wallet to
              Begin Selling Today!
            </p>
          </div>
        )}
      </section>
    </>
  );
}
