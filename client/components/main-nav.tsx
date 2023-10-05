"use client";
import React from "react";
import { cn } from "@/lib/utils";
import { useGlobalContext } from "@/context/GlobalContext";
import { FiSun, FiMoon } from "react-icons/fi";
import Link from "next/link";
import { useTheme } from "next-themes";
import { FaEthereum } from "react-icons/fa";

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { Button } from "./ui/button";

const components: { title: string; href: string; description: string }[] = [
  {
    title: "Art",
    href: "/art",
    description: "Unique artworks, digital expressions, and creative wonders.",
  },
  {
    title: "Photography",
    href: "/photography",
    description:
      "Captured moments, life's snapshots, and visual stories as collectible NFTs.",
  },
  {
    title: "Memberships",
    href: "/memberships",
    description: "Unlock exclusive content, perks, and privileges.",
  },
  {
    title: "Gaming",
    href: "/gaming",
    description: "Tokenized adventures, in-game assets, and digital treasures.",
  },
];

const ListItem = React.forwardRef<
  React.ElementRef<"a">,
  React.ComponentPropsWithoutRef<"a">
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <a
          ref={ref}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </a>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

export const Navbar: React.FC = () => {
  const { theme, setTheme } = useTheme();
  const { connectWallet, currentAccount, ethBalance, zthBalance } =
    useGlobalContext();
  return (
    <nav className="hidden container lg:flex flex-row items-center justify-between p-8">
      <Link href="/">
        <h1 className="self-center text-2xl font-semibold whitespace-nowrap">
          Minted Marvels
        </h1>
      </Link>
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Categories</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px] ">
                {components.map((component) => (
                  <ListItem
                    key={component.title}
                    title={component.title}
                    href={component.href}
                  >
                    {component.description}
                  </ListItem>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <Link href="/mynfts" legacyBehavior passHref>
              <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                My NFTS
              </NavigationMenuLink>
            </Link>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Learn More</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[350px] lg:grid-cols-1">
                <ListItem
                  href="https://github.com/ItsKalfar/MintedMarvels"
                  title="Source Code"
                  target="_blank"
                >
                  Styles for headings, paragraphs, lists...etc
                </ListItem>
                <ListItem
                  href="https://github.com/ItsKalfar"
                  title="GitHub"
                  target="_blank"
                >
                  GitHub
                </ListItem>
                <ListItem
                  href="https://www.linkedin.com/in/sagar-gund-037b72255/"
                  title="LinkedIn"
                  target="_blank"
                >
                  GitHub
                </ListItem>
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      <div className="flex flex-row items-center justify-between">
        {currentAccount !== null ? (
          <Button className="mr-2">
            {currentAccount.substring(0, 6) +
              "..." +
              currentAccount.substring(38, 42)}
          </Button>
        ) : (
          <Button onClick={() => connectWallet()} className="mr-2">
            Connect Wallet
          </Button>
        )}
        {currentAccount && (
          <Button className="mr-2">
            <FaEthereum className="mr-1" /> {ethBalance}
          </Button>
        )}
        {currentAccount && (
          <Button className="mr-2 flex flex-row">
            {zthBalance + " " + "ZTH"}
          </Button>
        )}

        {theme === "light" ? (
          <Button
            variant="outline"
            size="icon"
            onClick={() => setTheme("dark")}
          >
            <FiSun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
          </Button>
        ) : (
          <Button
            variant="outline"
            size="icon"
            onClick={() => setTheme("light")}
          >
            <FiMoon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
          </Button>
        )}
      </div>
    </nav>
  );
};
