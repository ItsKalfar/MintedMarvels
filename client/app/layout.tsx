import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/toaster";

import { GlobalContextProvider } from "@/context/GlobalContext";
import { Navbar } from "@/components/main-nav";
import MobileNav from "@/components/mobile-nav";
import Footer from "@/components/footer";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "MintedMarvels",
  description:
    "MintedMarvels is an exclusive NFT marketplace, offering a curated collection of rare digital assets, showcasing the finest in art, entertainment, and creativity on the blockchain",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <GlobalContextProvider>
      <html lang="en">
        <body className={inter.className}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <Navbar />
            <MobileNav />
            <main className="container min-h-screen">{children}</main>
            <Toaster />
            <Footer />
          </ThemeProvider>
        </body>
      </html>
    </GlobalContextProvider>
  );
}
