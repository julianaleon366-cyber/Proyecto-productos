import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import BotonWhatsApp from "./components/BotonWhatsApp";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "KAPRICHO | Personal Shopper",
  description:
    "Tu personal shopper en España. Skincare, maquillaje, cuidado capilar, suplementos, moda y accesorios de marcas europeas, enviados directamente a Colombia.",
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
        {children}
        <BotonWhatsApp />
      </body>
    </html>
  );
}
