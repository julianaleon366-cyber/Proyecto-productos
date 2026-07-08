import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { BolsaProvider } from "./lib/BolsaContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "KAPRICHO — Dermocosmética de España a Colombia",
  description:
    "Personal shopper internacional. Marcas como La Roche-Posay, Eucerin, Sesderma y The Ordinary, traídas desde España a Colombia.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-white text-zinc-900">
        <BolsaProvider>{children}</BolsaProvider>
      </body>
    </html>
  );
}
