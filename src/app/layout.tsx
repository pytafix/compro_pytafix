import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import { TopNavBar } from "@/components/TopNavBar";
import { Footer } from "@/components/Footer";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Pytafix - Expert Electronic Repair",
  description: "Servis Jujur, Garansi Pasti untuk Laptop, HP, dan Komputer Anda",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="h-full">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={`${manrope.variable} antialiased h-full flex flex-col pt-20`}
      >
        <TopNavBar />
        <div className="flex-1">
          {children}
        </div>
        <Footer />
      </body>
    </html>
  );
}
