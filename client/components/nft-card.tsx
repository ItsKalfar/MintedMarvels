import React from "react";
import Link from "next/link";
import { useGlobalContext } from "@/context/GlobalContext";
import { Button } from "./ui/button";

export const NFTCard: React.FC<{
  price: string;
  category: string;
  itemId: number;
  owner: string;
  tokenId: number;
  seller: string;
  name: string;
  image: string;
  description: string;
  sold: boolean;
}> = ({ price, itemId, name, image, category, sold }) => {
  const { buyItem } = useGlobalContext();
  return (
    <div className="rounded-lg max-w-[350px] dark:border-gray-500 border-2 overflow-hidden hover:scale-105 transition-transform duration-300">
      <img src={image} alt={`NFT Image - ${name}`} className="w-full h-auto" />

      <div className="p-4">
        <h3 className="text-xl font-semibold">{name}</h3>
        <p className="text-sm font-medium">{category}</p>

        <div className="flex flex-col items-center justify-center mt-8">
          {sold ? (
            <div className="w-full flex justify-center items-center">
              <span className="bg-red-500 text-white py-1 px-2 rounded-full text-xs text-center my-2">
                Sold
              </span>
            </div>
          ) : (
            <div className="w-full flex justify-between items-center">
              <p className="text-sm font-semibold">{price.toString()} ZTH</p>

              <Button onClick={() => buyItem(itemId, price)} variant="outline">
                Buy
              </Button>
            </div>
          )}
        </div>
        <div className="mt-4">
          <Link href={`/${itemId}`} className="hover:underline">
            See more
          </Link>
        </div>
      </div>
    </div>
  );
};
