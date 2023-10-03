import React from "react";
import Link from "next/link";

import { AiOutlineMenuFold } from "react-icons/ai";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { SellNFT } from "./sell-nft-dialog";

export default function MobileNav() {
  return (
    <Sheet>
      <nav className="container flex flex-row items-center justify-between lg:hidden p-8">
        <Link href="/">
          <h1 className="self-center text-xl font-semibold whitespace-nowrap">
            Minted Marvels
          </h1>
        </Link>
        <div className="flex flex-row items-center">
          <SellNFT />
          <SheetTrigger asChild>
            <AiOutlineMenuFold className="scale-125 ml-3" />
          </SheetTrigger>
          <SheetContent>
            <SheetHeader>
              <SheetTitle>Minted Marvels</SheetTitle>
              <SheetDescription>
                Discover, Collect, Create: Your Gateway to the NFT Universe
              </SheetDescription>
            </SheetHeader>

            <SheetClose asChild>
              <Link
                href="/mynfts"
                className="flex flex-1 items-center justify-between py-4 font-medium transition-all border-b"
              >
                My NFTS
              </Link>
            </SheetClose>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>Categories</AccordionTrigger>
                <AccordionContent>
                  <SheetClose asChild>
                    <Link href="/art">Art</Link>
                  </SheetClose>
                </AccordionContent>
                <AccordionContent>
                  <SheetClose asChild>
                    <Link href="/gaming">Gaming</Link>
                  </SheetClose>
                </AccordionContent>
                <AccordionContent>
                  <SheetClose asChild>
                    <Link href="/photography">Photography</Link>
                  </SheetClose>
                </AccordionContent>
                <AccordionContent>
                  <SheetClose asChild>
                    <Link href="/memberships">Memberships</Link>
                  </SheetClose>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="item-3">
                <AccordionTrigger>Contact</AccordionTrigger>
                <AccordionContent>
                  <SheetClose asChild>
                    <Link href={"/"}>GitHub</Link>
                  </SheetClose>
                </AccordionContent>
                <AccordionContent>
                  <SheetClose asChild>
                    <Link href={"/"}>LinkedIn</Link>
                  </SheetClose>
                </AccordionContent>
                <AccordionContent>
                  <SheetClose asChild>
                    <Link href={"/"}>Twitter</Link>
                  </SheetClose>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </SheetContent>
        </div>
      </nav>
    </Sheet>
  );
}
