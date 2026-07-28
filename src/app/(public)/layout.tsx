import { TopNavBar } from "@/components/TopNavBar";
import { Footer } from "@/components/Footer";
import { GlobalCTA } from "@/components/GlobalCTA";
import { FloatingWA } from "@/components/FloatingWA";

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="flex min-h-full flex-col pt-20">
      <TopNavBar />
      <div className="flex-1">
        {children}
      </div>
      <GlobalCTA />
      <Footer />
      <FloatingWA />
    </div>
  );
}
