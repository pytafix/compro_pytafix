import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "./globals.css";
import { Toaster } from "sonner";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://pytafix.com"),
  title: {
    default: "Pytafix - Pusat Servis Laptop, HP, dan Komputer di Malang",
    template: "%s | Pytafix",
  },
  description: "Pytafix adalah pusat perbaikan elektronik terpercaya di Malang. Menyediakan servis laptop, smartphone, dan komputer dengan teknisi bersertifikat, jujur, dan bergaransi resmi.",
  keywords: ["Service Laptop Malang", "Service HP Malang", "Reparasi Komputer", "Ganti LCD", "Service Apple Malang"],
  openGraph: {
    title: "Pytafix - Pusat Servis Laptop & HP Malang",
    description: "Servis jujur, garansi pasti. Konsultasi kerusakan perangkat Anda sekarang!",
    url: "https://pytafix.com",
    siteName: "Pytafix",
    locale: "id_ID",
    type: "website",
  },
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
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "LocalBusiness",
              "name": "Pytafix",
              "image": "https://pytafix.com/logo.png",
              "url": "https://pytafix.com",
              "telephone": "+6281234567890",
              "address": {
                "@type": "PostalAddress",
                "streetAddress": "Jl. Teknologi No. 1",
                "addressLocality": "Malang",
                "addressRegion": "Jawa Timur",
                "postalCode": "65141",
                "addressCountry": "ID"
              },
              "geo": {
                "@type": "GeoCoordinates",
                "latitude": -7.983908,
                "longitude": 112.621391
              },
              "priceRange": "$$",
              "description": "Pusat perbaikan elektronik terpercaya di Malang. Melayani servis laptop, smartphone, dan komputer bergaransi."
            })
          }}
        />
      </head>
      <body
        className={`${manrope.variable} antialiased h-full flex flex-col pt-20`}
      >
        {children}
        <Toaster position="bottom-right" richColors />
      </body>
    </html>
  );
}
