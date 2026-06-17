import { TopNavBar } from "@/components/TopNavBar";
import { Footer } from "@/components/Footer";

export default function PublicLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <TopNavBar />
      <div className="flex-1">
        {children}
      </div>
      <Footer />
    </>
  );
}
