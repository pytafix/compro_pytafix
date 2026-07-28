import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/react";
import "./globals.css";
import { Toaster } from "sonner";
import { CONTACT, LEGAL_ENTITY_NAME, SITE_DESCRIPTION, SITE_NAME, SITE_URL, SOCIAL } from "@/lib/config";
import { serializeJsonLd } from "@/lib/json-ld";


const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
});

const enableVercelTelemetry = process.env.VERCEL === "1";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Servis Laptop, HP & Komputer di Malang | Pytafix",
    template: `%s | ${SITE_NAME}`,
  },
  description: SITE_DESCRIPTION,
  applicationName: SITE_NAME,
  category: "electronics repair",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  verification: process.env.GOOGLE_SITE_VERIFICATION
    ? { google: process.env.GOOGLE_SITE_VERIFICATION }
    : undefined,
  openGraph: {
    title: "Servis Laptop, HP & Komputer di Malang | Pytafix",
    description: SITE_DESCRIPTION,
    url: SITE_URL,
    siteName: SITE_NAME,
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
    images: ["/images/og-banner.png"],
  },
  alternates: {
    canonical: SITE_URL,
  },
  icons: {
    icon: [{ url: "/icon.png", type: "image/png", sizes: "512x512" }],
    apple: [{ url: "/apple-icon.png", type: "image/png", sizes: "180x180" }],
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
        {/* eslint-disable-next-line @next/next/no-page-custom-font */}
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:wght,FILL@100..700,0..1&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={`${manrope.variable} antialiased min-h-full flex flex-col`}
      >
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: serializeJsonLd({
                "@context": "https://schema.org",
                "@graph": [
                  {
                    "@type": "Organization",
                    "@id": `${SITE_URL}/#organization`,
                    "name": SITE_NAME,
                    "legalName": LEGAL_ENTITY_NAME,
                    "url": SITE_URL,
                    "description": SITE_DESCRIPTION,
                    "logo": {
                      "@type": "ImageObject",
                      "url": `${SITE_URL}/logo.png`,
                    },
                    "sameAs": Object.values(SOCIAL),
                  },
                  {
                    "@type": "ProfessionalService",
                    "@id": `${SITE_URL}/#localbusiness`,
                    "name": SITE_NAME,
                    "image": `${SITE_URL}/images/og-banner.png`,
                    "url": SITE_URL,
                    "telephone": `+${CONTACT.whatsapp}`,
                    "email": CONTACT.email,
                    "parentOrganization": { "@id": `${SITE_URL}/#organization` },
                    "areaServed": {
                      "@type": "AdministrativeArea",
                      "name": CONTACT.serviceArea,
                    },
                    ...(CONTACT.locationVerified
                      ? {
                          "address": {
                            "@type": "PostalAddress",
                            ...CONTACT.postalAddress,
                          },
                        }
                      : {}),
                    ...(CONTACT.geo
                      ? {
                          "geo": {
                            "@type": "GeoCoordinates",
                            "latitude": CONTACT.geo.latitude,
                            "longitude": CONTACT.geo.longitude,
                          },
                        }
                      : {}),
                    "hasMap": CONTACT.mapsUrl,
                    "description": SITE_DESCRIPTION,
                    "openingHoursSpecification": [
                      {
                        "@type": "OpeningHoursSpecification",
                        "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
                        "opens": CONTACT.hours.opens,
                        "closes": CONTACT.hours.closes,
                      },
                    ],
                  },
                ],
              }),
            }}
          />
          {children}
          {enableVercelTelemetry ? (
            <>
              <Analytics />
              <SpeedInsights />
            </>
          ) : null}
          <Toaster position="bottom-right" richColors />
      </body>
    </html>
  );
}
