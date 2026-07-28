"use client";

import { useEffect, useState } from "react";
import { toast } from "sonner";
import type { WarrantyStatus } from "@prisma/client";
import { getAllowedWarrantyStatuses } from "@/lib/warranty";

interface WarrantyClaim {
  id: string;
  name: string;
  whatsapp: string;
  trackingId: string;
  description: string;
  status: WarrantyStatus;
  createdAt: string;
}

interface WarrantyResponse {
  items: WarrantyClaim[];
  pagination: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
}

export default function AdminWarrantyPage() {
  const [claims, setClaims] = useState<WarrantyClaim[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [statusFilter, setStatusFilter] = useState("ALL");
  const [searchInput, setSearchInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    let cancelled = false;
    const loadData = async () => {
      setIsLoading(true);
      try {
        const params = new URLSearchParams({
          page: String(page),
          pageSize: "20",
          status: statusFilter,
        });
        if (searchQuery) params.set("query", searchQuery);
        const res = await fetch(`/api/admin/warranty?${params.toString()}`, {
          credentials: "include",
        });
        if (res.ok) {
          const data = (await res.json()) as WarrantyResponse;
          if (!cancelled) {
            if (data.pagination.page > data.pagination.totalPages) {
              setPage(data.pagination.totalPages);
              return;
            }
            setClaims(data.items);
            setTotal(data.pagination.total);
            setTotalPages(data.pagination.totalPages);
          }
        } else {
          if (!cancelled) toast.error("Gagal mengambil data.");
        }
      } catch (err) {
        if (!cancelled) toast.error("Kesalahan jaringan.");
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    };
    loadData();
    return () => { cancelled = true; };
  }, [page, refreshKey, searchQuery, statusFilter]);

  const submitSearch = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setPage(1);
    setSearchQuery(searchInput.trim());
  };

  const updateStatus = async (id: string, newStatus: WarrantyStatus) => {
    try {
      const res = await fetch(`/api/admin/warranty/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: newStatus }),
      });
      if (!res.ok) throw new Error("Gagal mengupdate status");
      toast.success("Status berhasil diupdate");
      setRefreshKey((current) => current + 1);
    } catch (error: unknown) {
      toast.error(error instanceof Error ? error.message : "Terjadi kesalahan");
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
    <main className="p-4 md:p-8">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="font-headline-md text-on-surface">Manajemen Klaim Garansi</h1>
          <p className="font-body-md text-on-surface-variant">Kelola daftar klaim garansi dari pelanggan.</p>
        </div>
      </div>

      <div className="mb-6 rounded-xl border border-outline-variant bg-surface p-4">
        <form onSubmit={submitSearch} className="flex flex-col gap-3 lg:flex-row">
          <label className="flex-1">
            <span className="sr-only">Cari klaim garansi</span>
            <input
              type="search"
              value={searchInput}
              onChange={(event) => setSearchInput(event.target.value)}
              placeholder="Cari ID servis, pelanggan, WhatsApp, atau deskripsi"
              className="w-full rounded-lg border border-outline-variant bg-surface px-4 py-3 text-on-surface outline-none focus:ring-2 focus:ring-primary"
            />
          </label>
          <label>
            <span className="sr-only">Filter status klaim</span>
            <select
              value={statusFilter}
              onChange={(event) => {
                setStatusFilter(event.target.value);
                setPage(1);
              }}
              className="w-full rounded-lg border border-outline-variant bg-surface px-4 py-3 text-on-surface outline-none focus:ring-2 focus:ring-primary lg:w-52"
            >
              <option value="ALL">Semua status</option>
              <option value="MENUNGGU">Menunggu</option>
              <option value="DIPROSES">Diproses</option>
              <option value="SELESAI">Selesai</option>
              <option value="DITOLAK">Ditolak</option>
            </select>
          </label>
          <button
            type="submit"
            className="rounded-lg bg-primary px-5 py-3 font-label-bold text-on-primary"
          >
            Cari
          </button>
        </form>
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
                  <select id={`warranty-status-${claim.trackingId}`}
                    value={claim.status}
                    onChange={(e) => updateStatus(claim.id, e.target.value as WarrantyStatus)}
                    disabled={getAllowedWarrantyStatuses(claim.status).length === 1}
                    className={`px-3 py-1.5 rounded-full font-label-bold text-xs border-none outline-none cursor-pointer appearance-none ${getStatusColor(claim.status)}`}
                  >
                    {getAllowedWarrantyStatuses(claim.status).map((status) => (
                      <option key={status} value={status}>
                        {status === "MENUNGGU"
                          ? "Menunggu"
                          : status === "DIPROSES"
                            ? "Diproses"
                            : status === "SELESAI"
                              ? "Selesai"
                              : "Ditolak"}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
            {claims.length === 0 && (
              <tr>
                <td colSpan={5} className="p-8 text-center text-on-surface-variant font-body-md">
                  Belum ada klaim garansi yang diajukan.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="mt-6 flex flex-col items-center justify-between gap-3 sm:flex-row">
        <p className="text-sm text-on-surface-variant">{total} klaim ditemukan</p>
        <div className="flex items-center gap-3">
          <button
            type="button"
            disabled={page <= 1}
            onClick={() => setPage((current) => Math.max(1, current - 1))}
            className="rounded-lg border border-outline-variant px-4 py-2 font-label-bold text-on-surface disabled:cursor-not-allowed disabled:opacity-40"
          >
            Sebelumnya
          </button>
          <span className="text-sm text-on-surface-variant">
            Halaman {page} dari {totalPages}
          </span>
          <button
            type="button"
            disabled={page >= totalPages}
            onClick={() => setPage((current) => Math.min(totalPages, current + 1))}
            className="rounded-lg border border-outline-variant px-4 py-2 font-label-bold text-on-surface disabled:cursor-not-allowed disabled:opacity-40"
          >
            Berikutnya
          </button>
        </div>
      </div>
    </main>
  );
}
