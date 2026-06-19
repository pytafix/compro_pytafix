"use client";
import { TableSkeleton } from "@/components/admin/TableSkeleton";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { StatusUpdateModal, RequestData } from "@/components/admin/StatusUpdateModal";

export default function AdminDashboard() {
  const [requests, setRequests] = useState<RequestData[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedRequest, setSelectedRequest] = useState<RequestData | null>(null);
  const router = useRouter();

  const fetchRequests = async (isRefresh = false) => {
    if (isRefresh) setIsLoading(true);
    try {
      const res = await fetch("/api/admin/requests");
      if (res.status === 401) {
        // Token expired or missing
        router.push("/admin/login");
        return;
      }
      if (res.ok) {
        const data = await res.json();
        setRequests(data);
      } else {
        toast.error("Gagal mengambil data permintaan.");
      }
    } catch (err) {
      toast.error("Kesalahan jaringan.");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    fetchRequests(false);
  }, []);

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "DITERIMA": return "bg-surface-container-high text-on-surface";
      case "DIAGNOSA": return "bg-secondary-container text-on-secondary-container";
      case "DIKERJAKAN": return "bg-primary-container text-on-primary-container";
      case "SELESAI": return "bg-[#dcfce7] text-[#166534]"; // custom green
      default: return "bg-surface-container text-on-surface";
    }
  };

  return (
    <div className="min-h-screen bg-surface-container-lowest">
      {/* Main Content */}
      <main className="p-4 md:p-6 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <h2 className="font-headline-md text-headline-md text-on-surface">Daftar Tiket Servis</h2>
          <button 
            onClick={() => fetchRequests(true)}
            className="flex items-center gap-2 bg-surface-container px-4 py-2 rounded hover:bg-surface-container-high transition-colors text-on-surface font-label-bold text-label-bold cursor-pointer"
          >
            <span className="material-symbols-outlined text-[18px]">refresh</span>
            Refresh
          </button>
        </div>

        {/* Data Table */}
        <div className="bg-surface border border-outline-variant rounded-xl shadow-sm overflow-hidden overflow-x-auto">
          {isLoading ? (
            <div className="p-12 text-center text-on-surface-variant flex flex-col items-center">
              <span className="material-symbols-outlined animate-spin text-[32px] mb-4">progress_activity</span>
              <p className="font-body-md">Memuat data...</p>
            </div>
          ) : requests.length === 0 ? (
            <div className="p-12 text-center text-on-surface-variant">
              <span className="material-symbols-outlined text-[48px] mb-4 opacity-50">inbox</span>
              <p className="font-body-lg">Belum ada permintaan servis yang masuk.</p>
            </div>
          ) : (
            <table className="w-full text-left border-collapse min-w-[1000px]">
              <thead>
                <tr className="bg-surface-container-lowest border-b border-outline-variant">
                  <th className="px-6 py-4 font-label-bold text-label-bold text-on-surface-variant whitespace-nowrap">Waktu</th>
                  <th className="px-6 py-4 font-label-bold text-label-bold text-on-surface-variant whitespace-nowrap">Resi</th>
                  <th className="px-6 py-4 font-label-bold text-label-bold text-on-surface-variant whitespace-nowrap">Pelanggan</th>
                  <th className="px-6 py-4 font-label-bold text-label-bold text-on-surface-variant whitespace-nowrap">Perangkat & Kendala</th>
                  <th className="px-6 py-4 font-label-bold text-label-bold text-on-surface-variant whitespace-nowrap">Status</th>
                  <th className="px-6 py-4 font-label-bold text-label-bold text-on-surface-variant text-right whitespace-nowrap">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant">
                {requests.map((req) => (
                  <tr key={req.id} className="hover:bg-surface-container-lowest/50 transition-colors">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <p className="font-body-md text-on-surface">
                        {new Date(req.createdAt).toLocaleDateString('id-ID', { day: '2-digit', month: 'short' })}
                      </p>
                      <p className="font-label-sm text-outline">
                        {new Date(req.createdAt).toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' })}
                      </p>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap font-mono text-body-md text-primary font-medium">
                      {req.trackingId}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <p className="font-label-bold text-on-surface">{req.name}</p>
                      <a href={`https://wa.me/${req.whatsapp.replace(/^0/, '62')}`} target="_blank" rel="noreferrer" className="font-label-sm text-secondary hover:underline flex items-center gap-1 mt-1">
                        <span className="material-symbols-outlined text-[14px]">chat</span> {req.whatsapp}
                      </a>
                    </td>
                    <td className="px-6 py-4 max-w-xs">
                      <p className="font-label-bold text-on-surface capitalize">{req.deviceType} - {req.serviceType}</p>
                      <p className="font-body-sm text-on-surface-variant truncate mt-1" title={req.problemDesc}>
                        {req.problemDesc}
                      </p>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`inline-flex px-3 py-1 rounded-full font-label-bold text-label-sm ${getStatusBadgeColor(req.status)}`}>
                        {req.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right">
                      <button
                        onClick={() => setSelectedRequest(req)}
                        className="inline-flex items-center justify-center w-10 h-10 rounded-full hover:bg-secondary-container text-secondary transition-colors cursor-pointer"
                        title="Update Status"
                      >
                        <span className="material-symbols-outlined text-[20px]">edit</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </main>

      {selectedRequest && (
        <StatusUpdateModal
          request={selectedRequest}
          onClose={() => setSelectedRequest(null)}
          onSuccess={() => {
            setSelectedRequest(null);
            fetchRequests(); // Refresh table
          }}
        />
      )}
    </div>
  );
}
