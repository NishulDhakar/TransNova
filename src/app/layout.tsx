import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import Header from "@/components/Header";
import Preloader from "@/components/Preloader";
import { Analytics } from "@vercel/analytics/next"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: "TransNova | Premium Logistics",
  description: "Precision Engineering in Motion.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable} font-sans antialiased bg-background text-foreground selection:bg-accent-yellow selection:text-foreground`}>
        <div className="noise-overlay" />
        <Preloader />
        <SmoothScroll>
          <Header />
          {children}
        </SmoothScroll>
        <Analytics />
      </body>
    </html>
  );
}
