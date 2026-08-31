import type { Metadata } from "next";
import { Libre_Caslon_Display, Inter } from "next/font/google";
import "./globals.css";
import LenisProvider from "@/components/LenisProvider";

const libreCaslon = Libre_Caslon_Display({
  variable: "--font-libre-caslon",
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Bali Wed — Destination Wedding Organizer Bali",
  description: "Modern luxury destination wedding organizer di Bali. Bali bukan sekadar lokasi, tapi cerita yang akan diingat.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="id"
      className={`${libreCaslon.variable} ${inter.variable} antialiased selection:bg-[#2A281F] selection:text-white`}
    >
      <body className="min-h-screen bg-white text-[#2A281F] font-inter">
        <LenisProvider>{children}</LenisProvider>
      </body>
    </html>
  );
}

