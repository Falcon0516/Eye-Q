import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";
import LenisProvider from "@/components/LenisProvider";
import Navbar from "@/components/Navbar";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-headline",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Eye-Q — Phone-First AI for iQOO 15",
  description:
    "Eye-Q is an on-device AI companion running on the iQOO 15's NPU. Scene description, OCR, translation, voice commands, and accessibility — all offline, all on one phone.",
  keywords: [
    "Eye-Q",
    "iQOO 15",
    "on-device AI",
    "hackathon",
    "accessibility",
    "NPU",
    "offline AI",
  ],
  openGraph: {
    title: "Eye-Q — Phone-First AI",
    description:
      "One device. Real intelligence. Zero cloud. Built for iQOO Hackathon 2026.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable}`}>
      <body className="font-body">
        <LenisProvider>
          <Navbar />
          <main>{children}</main>
        </LenisProvider>
      </body>
    </html>
  );
}
