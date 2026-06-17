import { Metadata } from "next";
import prisma from "@/lib/prisma";
import { SparepartClient } from "@/components/SparepartClient";

export const metadata: Metadata = {
  title: "Jual Sparepart & Aksesoris Laptop di Malang | Pytafix",
  description: "Beli berbagai macam suku cadang (sparepart) original untuk komputer dan laptop Anda. Tersedia RAM, SSD, baterai, dan lainnya.",
};

export default async function SparepartPage() {
  const spareparts = await prisma.sparepart.findMany({
    orderBy: { createdAt: "desc" },
  });

  return (
    <main className="min-h-screen bg-surface-container-lowest">
      {/* Premium Hero Section */}
      <section className="relative pt-24 pb-32 px-6 overflow-hidden">
        {/* Background Gradient Blob */}
        <div className="absolute top-0 left-0 w-full h-[800px] overflow-hidden -z-10">
          <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-primary/10 blur-[100px] rounded-full pointer-events-none"></div>
          <div className="absolute top-40 -left-40 w-[500px] h-[500px] bg-secondary-container/20 blur-[100px] rounded-full pointer-events-none"></div>
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface-container/50 backdrop-blur-md border border-outline-variant mb-6 shadow-sm">
             <span className="material-symbols-outlined text-primary text-[20px]">verified</span>
             <span className="font-label-bold text-sm text-on-surface">100% Original Parts</span>
          </div>
          <h1 className="font-display-lg text-display-lg text-on-surface mb-6 leading-tight">
            Katalog Sparepart & <br/> <span className="text-primary">Aksesoris Premium</span>
          </h1>
          <p className="font-body-xl text-body-xl text-on-surface-variant max-w-2xl mx-auto">
            Tingkatkan performa perangkat Anda dengan suku cadang original. Dilengkapi garansi pemasangan untuk setiap pembelian.
          </p>
        </div>
      </section>

      {/* Client Component for Interactive Grid */}
      <SparepartClient initialSpareparts={spareparts} />
    </main>
  );
}
