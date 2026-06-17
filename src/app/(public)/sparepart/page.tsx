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
        {/* Background Elements */}
        <div className="absolute inset-0 bg-primary-container z-0"></div>
        <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-primary opacity-10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/3 z-0"></div>
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-tertiary opacity-10 rounded-full blur-[80px] translate-y-1/3 -translate-x-1/4 z-0"></div>
        
        {/* Pattern Overlay */}
        <div className="absolute inset-0 opacity-[0.03] z-0" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' viewBox=\'0 0 60 60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cg fill=\'none\' fill-rule=\'evenodd\'%3E%3Cg fill=\'%23000000\' fill-opacity=\'1\'%3E%3Cpath d=\'M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z\'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")' }}></div>

        <div className="relative z-10 max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface/50 backdrop-blur-sm border border-outline-variant mb-6 shadow-sm">
             <span className="material-symbols-outlined text-primary text-[20px]">verified</span>
             <span className="font-label-bold text-sm text-on-surface">100% Original Parts</span>
          </div>
          <h1 className="font-display-lg text-display-lg text-on-primary-container mb-6 leading-tight">
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
