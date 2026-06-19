"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";

interface WarrantyClaim {
  id: number;
  name: string;
  whatsapp: string;
  trackingId: string;
  description: string;
  status: string;
  createdAt: string;
}

export default function AdminWarrantyPage() {
  const [claims, setClaims] = useState<WarrantyClaim[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchClaims();
  }, []);

  const fetchClaims = async () => {
    try {
      const res = await fetch("/api/admin/warranty");
      if (!res.ok) throw new Error("Gagal mengambil data klaim garansi");
      const data = await res.json();
      setClaims(data);
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const updateStatus = async (id: number, newStatus: string) => {
    try {
      const res = await fetch(`/api/admin/warranty/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (!res.ok) throw new Error("Gagal mengupdate status");
      toast.success("Status berhasil diupdate");
      fetchClaims();
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const deleteClaim = async (id: number) => {
    if (!confirm("Yakin ingin menghapus klaim ini?")) return;
    try {
      const res = await fetch(`/api/admin/warranty/${id}`, { method: "DELETE" });
      if (!res.ok) throw new Error("Gagal menghapus klaim");
      toast.success("Klaim berhasil dihapus");
      fetchClaims();
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "MENUNGGU": return "bg-tertiary-container text-on-tertiary-container";
      case "DIPROSES": return "bg-primary-container text-on-primary-container";
      case "SELESAI": return "bg-secondary-container text-on-secondary-container";
      case "DITOLAK": return "bg-error-container text-on-error-container";
      default: return "bg-surface-container text-on-surface-variant";
    }
  };

  if (isLoading) {
    return <div className="p-8 text-center text-on-surface-variant font-body-md">Loading klaim garansi...</div>;
  }

  return (
    <div className="p-4 md:p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="font-headline-md text-on-surface">Manajemen Klaim Garansi</h1>
          <p className="font-body-md text-on-surface-variant">Kelola daftar klaim garansi dari pelanggan.</p>
        </div>
      </div>

      <div className="bg-surface border border-outline-variant rounded-xl overflow-hidden overflow-x-auto">
        <table className="w-full text-left border-collapse min-w-[800px]">
          <thead>
            <tr className="bg-surface-container-low border-b border-outline-variant font-label-bold text-on-surface">
              <th className="p-4">Tanggal</th>
              <th className="p-4">ID Servis (Nota)</th>
              <th className="p-4">Pelanggan</th>
              <th className="p-4">Keluhan</th>
              <th className="p-4">Status</th>
              <th className="p-4">Aksi</th>
            </tr>
          </thead>
          <tbody className="font-body-md text-on-surface-variant">
            {claims.map((claim) => (
              <tr key={claim.id} className="border-b border-outline-variant hover:bg-surface-container-lowest transition-colors">
                <td className="p-4">{new Date(claim.createdAt).toLocaleDateString("id-ID")}</td>
                <td className="p-4 font-label-bold text-primary">{claim.trackingId}</td>
                <td className="p-4">
                  <div>{claim.name}</div>
                  <div className="text-sm">
                    <a href={`https://wa.me/${claim.whatsapp}`} target="_blank" rel="noreferrer" className="text-tertiary hover:underline">
                      {claim.whatsapp}
                    </a>
                  </div>
                </td>
                <td className="p-4 max-w-xs truncate" title={claim.description}>{claim.description}</td>
                <td className="p-4">
                  <select 
                    value={claim.status}
                    onChange={(e) => updateStatus(claim.id, e.target.value)}
                    className={`px-3 py-1.5 rounded-full font-label-bold text-xs border-none outline-none cursor-pointer appearance-none ${getStatusColor(claim.status)}`}
                  >
                    <option value="MENUNGGU">Menunggu</option>
                    <option value="DIPROSES">Diproses</option>
                    <option value="SELESAI">Selesai</option>
                    <option value="DITOLAK">Ditolak</option>
                  </select>
                </td>
                <td className="p-4 flex items-center gap-2">
                  <button onClick={() => deleteClaim(claim.id)} className="text-error hover:bg-error-container/20 p-2 rounded transition-colors" title="Hapus">
                    <span className="material-symbols-outlined text-[20px]">delete</span>
                  </button>
                </td>
              </tr>
            ))}
            {claims.length === 0 && (
              <tr>
                <td colSpan={6} className="p-8 text-center text-on-surface-variant font-body-md">
                  Belum ada klaim garansi yang diajukan.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
