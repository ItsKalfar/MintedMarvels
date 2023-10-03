"use client";
import React from "react";
import { IoIosArrowBack } from "react-icons/io";
import { SellNFT } from "./sell-nft-dialog";
import { useGlobalContext } from "@/context/GlobalContext";
import Link from "next/link";

export const PageHeading: React.FC<{
  heading: string;
  subheading: string;
  backUrl: string;
}> = ({ heading, subheading, backUrl }) => {
  const { currentAccount } = useGlobalContext();
  return (
    <div className="bg-gray-300 dark:bg-gray-900 p-4 flex items-center justify-between rounded-lg mb-2">
      <div className="flex items-center space-x-4">
        <Link href={backUrl}>
          <IoIosArrowBack size={24} />
        </Link>
        <div>
          <h1 className="sm:text-md text-xl w-full font-semibold lg:text-lg mb-2">
            {heading}
          </h1>
          <p className="text-sm w-full">{subheading}</p>
        </div>
      </div>
      <div className="hidden lg:flex">{currentAccount && <SellNFT />}</div>
    </div>
  );
};
