import type { Metadata } from "next";
import "./globals.css";

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
    <html lang="pt">
      <body className="bg-dark-900 text-white antialiased">{children}</body>
    </html>
  );
}
