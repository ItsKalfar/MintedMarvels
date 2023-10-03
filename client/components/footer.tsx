"use client";

import React from "react";
import Link from "next/link";

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="p-8">
      <div className="container flex flex-col lg:flex-row items-center justify-between">
        <Link
          href="/"
          className="flex items-center justify-center mb-4 sm:mb-0 "
        >
          <span className="self-center text-2xl font-semibold whitespace-nowrap text-black dark:text-white">
            Minted Marvels
          </span>
        </Link>
        <NavigationMenu>
          <NavigationMenuList className="flex flex-col">
            <NavigationMenuItem>
              <Link href="/mynfts" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Art
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/photography" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Photography
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/memberships" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Memberships
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
            <NavigationMenuItem>
              <Link href="/gaming" legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  Gaming
                </NavigationMenuLink>
              </Link>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>
      </div>
      <hr className="my-6 border-gray-200 mx-auto lg:my-8" />
      <span className="block text-sm text-gray-500 text-center">
        © {currentYear}{" "}
        <Link href="/" className="hover:underline">
          Minted Marvels
        </Link>
        . All Rights Reserved.
      </span>
    </footer>
  );
}
