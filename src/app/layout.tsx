import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import "./globals.css";
import { Toaster } from "sonner";


const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.pytafix.web.id"),
  title: {
    default: "Pytafix - Pusat Servis Laptop, HP, dan Komputer di Malang",
    template: "%s | Pytafix",
  },
  description: "Pytafix adalah pusat perbaikan elektronik terpercaya di Malang. Menyediakan servis laptop, smartphone, dan komputer dengan teknisi bersertifikat, jujur, dan bergaransi resmi.",
  keywords: ["Service Laptop Malang", "Service HP Malang", "Reparasi Komputer", "Ganti LCD", "Service Apple Malang", "Service MacBook Malang", "Pytafix Malang"],
  openGraph: {
    title: "Pytafix - Pusat Servis Laptop, HP & Komputer Malang",
    description: "Servis jujur, garansi pasti. Konsultasi kerusakan perangkat elektronik Anda sekarang dengan teknisi handal di Malang!",
    url: "https://www.pytafix.web.id",
    siteName: "Pytafix",
    images: [
      {
        url: "/images/og-banner.png",
        width: 1200,
        height: 630,
        alt: "Pytafix - Servis Laptop, HP & Komputer di Malang",
      },
    ],
    locale: "id_ID",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Pytafix - Pusat Servis Laptop, HP & Komputer Malang",
    description: "Servis jujur, garansi pasti. Konsultasi kerusakan perangkat elektronik Anda sekarang!",
    images: ["/images/og-banner.png"],
  },
  alternates: {
    canonical: "https://www.pytafix.web.id",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="h-full" suppressHydrationWarning>
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={`${manrope.variable} antialiased h-full flex flex-col pt-20`}
      >
          {children}
          <Analytics />
          <SpeedInsights />
          <Toaster position="bottom-right" richColors />
      </body>
    </html>
  );
}

