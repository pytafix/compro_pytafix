import type { Metadata } from "next";

export const metadata: Metadata = {
  title: {
    absolute: "Admin Pytafix",
  },
  description: null,
  alternates: {
    canonical: null,
  },
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
    },
  },
  openGraph: null,
  twitter: null,
};

export default function AdminRootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return children;
}
