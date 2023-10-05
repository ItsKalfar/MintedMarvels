"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useGlobalContext } from "@/context/GlobalContext";
import Drawer from "./drawer";

import { AiOutlineMenuFold, AiOutlineClose } from "react-icons/ai";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import SellNFT from "./sell-nft-dialog";
import { Button } from "./ui/button";

export default function MobileNav() {
  const { currentAccount, connectWallet } = useGlobalContext();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setIsDrawerOpen((prevState) => !prevState);
  };

  return (
    <nav className="container flex flex-row items-center justify-between lg:hidden p-8">
      <Link href="/">
        <h1 className="self-center text-xl font-semibold whitespace-nowrap">
          Minted Marvels
        </h1>
      </Link>
      <div className="flex flex-row items-center">
        {currentAccount ? (
          <SellNFT />
        ) : (
          <Button onClick={() => connectWallet()}>Connect</Button>
        )}

        <AiOutlineMenuFold
          className="scale-125 ml-3 hover:cursor-pointer"
          onClick={toggleDrawer}
        />

        <Drawer isOpen={isDrawerOpen} setIsOpen={setIsDrawerOpen}>
          <div>
            <div className="flex flex-row items-center justify-between mb-4">
              <div></div>
              <AiOutlineClose
                className="scale-125 ml-3 hover:cursor-pointer"
                onClick={toggleDrawer}
              />
            </div>
            <h2 className="mb-2">Minted Marvels</h2>
            <p>Discover, Collect, Create: Your Gateway to the NFT Universe</p>

            <Link
              href="/mynfts"
              className="flex flex-1 items-center justify-between py-4 font-medium transition-all border-b"
              onClick={toggleDrawer}
            >
              My NFTS
            </Link>

            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>Categories</AccordionTrigger>
                <AccordionContent onClick={toggleDrawer}>
                  <Link href="/art">Art</Link>
                </AccordionContent>
                <AccordionContent onClick={toggleDrawer}>
                  <Link href="/gaming">Gaming</Link>
                </AccordionContent>
                <AccordionContent onClick={toggleDrawer}>
                  <Link href="/photography">Photography</Link>
                </AccordionContent>
                <AccordionContent onClick={toggleDrawer}>
                  <Link href="/memberships">Memberships</Link>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>Learn More</AccordionTrigger>
                <AccordionContent onClick={toggleDrawer}>
                  <Link
                    href={"https://github.com/ItsKalfar/MintedMarvels"}
                    target="_blank"
                  >
                    Source Code
                  </Link>
                </AccordionContent>
                <AccordionContent onClick={toggleDrawer}>
                  <Link href={"https://github.com/ItsKalfar"} target="_blank">
                    GitHub
                  </Link>
                </AccordionContent>
                <AccordionContent onClick={toggleDrawer}>
                  <Link
                    href={"https://www.linkedin.com/in/sagar-gund-037b72255/"}
                    target="_blank"
                  >
                    LinkedIn
                  </Link>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </Drawer>
      </div>
    </nav>
  );
}
