import type { Metadata } from "next";
import { Oswald, Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

const oswald = Oswald({
  subsets: ["latin"],
  variable: "--font-oswald",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
  style: ["normal", "italic"],
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
    <html lang="pt" className={`${oswald.variable} ${playfair.variable} ${inter.variable}`}>
      <body className="bg-ink text-cream-200 antialiased font-sans">{children}</body>
    </html>
  );
}
