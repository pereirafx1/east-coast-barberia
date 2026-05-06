import type { Metadata } from "next";
import { Bebas_Neue, Barlow_Condensed, Special_Elite, Inter } from "next/font/google";
import "./globals.css";

const bebasNeue = Bebas_Neue({
  subsets: ["latin"],
  variable: "--font-bebas",
  display: "swap",
  weight: "400",
});

const barlowCondensed = Barlow_Condensed({
  subsets: ["latin"],
  variable: "--font-barlow",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
});

const specialElite = Special_Elite({
  subsets: ["latin"],
  variable: "--font-special",
  display: "swap",
  weight: "400",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "East Coast Barberia | Setúbal",
  description:
    "Barbearia premium em Setúbal. Cortes clássicos, barbas e tratamentos para o homem moderno.",
  keywords: "barbearia, setúbal, corte de cabelo, barba, east coast",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="pt"
      className={`${bebasNeue.variable} ${barlowCondensed.variable} ${specialElite.variable} ${inter.variable}`}
    >
      <body className="bg-ink text-cream-200 antialiased font-sans">{children}</body>
    </html>
  );
}
