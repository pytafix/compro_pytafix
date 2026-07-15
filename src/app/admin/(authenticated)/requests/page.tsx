"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import { TableSkeleton } from "@/components/admin/TableSkeleton";

interface ServiceRequest {
  id: string;
  trackingId: string;
  name: string;
  whatsapp: string;
  address: string;
  deviceType: string;
  serviceType: string;
  problemDesc: string;
  status: string;
  createdAt: string;
  technicianName: string | null;
  technicianNotes: string | null;
}

export default function AdminRequests() {
  const [requests, setRequests] = useState<ServiceRequest[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  // Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  
  // Form State
  const [formData, setFormData] = useState({
    name: "",
    whatsapp: "",
    address: "",
    deviceType: "",
    serviceType: "Lainnya",
    problemDesc: "",
    status: "DITERIMA",
    technicianName: "",
    technicianNotes: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchRequests = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/admin/requests");
      if (res.ok) {
        setRequests(await res.json());
      }
    } catch {
      toast.error("Gagal mengambil data resi");
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    let cancelled = false;
    const loadData = async () => {
      try {
        const res = await fetch("/api/admin/requests", { credentials: "include" });
        if (res.status === 401) {
          // handled by middleware
          return;
        }
        if (res.ok) {
          const data = await res.json();
          if (!cancelled) setRequests(data);
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
  }, []);

  const openModal = (req?: ServiceRequest) => {
    if (req) {
      setEditingId(req.id);
      setFormData({
        name: req.name,
        whatsapp: req.whatsapp,
        address: req.address || "",
        deviceType: req.deviceType,
        serviceType: req.serviceType || "Lainnya",
        problemDesc: req.problemDesc,
        status: req.status,
        technicianName: req.technicianName || "",
        technicianNotes: req.technicianNotes || ""
      });
    } else {
      setEditingId(null);
      setFormData({
        name: "",
        whatsapp: "",
        address: "",
        deviceType: "",
        serviceType: "Lainnya",
        problemDesc: "",
        status: "DITERIMA",
        technicianName: "",
        technicianNotes: ""
      });
    }
    setIsModalOpen(true);
  };

  const closeModal = () => setIsModalOpen(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const url = editingId ? `/api/admin/requests/${editingId}` : `/api/admin/requests`;
      const method = editingId ? "PATCH" : "POST";

      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        toast.success(`Resi berhasil ${editingId ? "diperbarui" : "dibuat"}`);
        closeModal();
        fetchRequests();
      } else {
        toast.error("Gagal menyimpan data");
      }
    } catch {
      toast.error("Terjadi kesalahan");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Apakah Anda yakin ingin menghapus resi ini?")) return;
    try {
      const res = await fetch(`/api/admin/requests/${id}`, { method: "DELETE" });
      if (res.ok) {
        toast.success("Resi berhasil dihapus");
        fetchRequests();
      } else {
        toast.error("Gagal menghapus resi");
      }
    } catch {
      toast.error("Terjadi kesalahan");
    }
  };

  return (
    <div className="min-h-screen bg-surface-container-lowest">
      <main className="p-4 md:p-6 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
          <h2 className="font-headline-md text-headline-md text-on-surface">Manajemen Resi (Tiket)</h2>
          <button 
            onClick={() => openModal()}
            className="flex items-center gap-2 bg-primary px-4 py-2 rounded text-on-primary font-label-bold text-label-bold hover:bg-on-primary-fixed-variant transition-colors cursor-pointer"
          >
            <span className="material-symbols-outlined text-[20px]">add</span>
            Buat Resi Manual
          </button>
        </div>

        <div className="bg-surface border border-outline-variant rounded-xl shadow-sm overflow-hidden overflow-x-auto">
          {isLoading ? (
            <div className="p-6">
              <TableSkeleton />
            </div>
          ) : requests.length === 0 ? (
            <div className="p-12 text-center text-on-surface-variant">
              <span className="material-symbols-outlined text-[48px] mb-4 opacity-50">receipt_long</span>
              <p className="font-body-lg">Belum ada data tiket masuk.</p>
            </div>
          ) : (
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                <tr className="bg-surface-container-lowest border-b border-outline-variant">
                  <th className="px-6 py-4 font-label-bold text-label-bold text-on-surface-variant">ID Resi</th>
                  <th className="px-6 py-4 font-label-bold text-label-bold text-on-surface-variant">Pelanggan</th>
                  <th className="px-6 py-4 font-label-bold text-label-bold text-on-surface-variant">Perangkat & Kendala</th>
                  <th className="px-6 py-4 font-label-bold text-label-bold text-on-surface-variant">Status</th>
                  <th className="px-6 py-4 font-label-bold text-label-bold text-on-surface-variant text-right">Aksi</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline-variant">
                {requests.map((req) => (
                  <tr key={req.id} className="hover:bg-surface-container-lowest/50 transition-colors">
                    <td className="px-6 py-4">
                      <span className="font-label-bold text-primary">{req.trackingId}</span>
                      <div className="text-xs text-on-surface-variant mt-1">
                        {new Date(req.createdAt).toLocaleDateString("id-ID")}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-label-bold text-on-surface">{req.name}</div>
                      <div className="text-sm text-on-surface-variant">{req.whatsapp}</div>
                    </td>
                    <td className="px-6 py-4 max-w-xs">
                      <div className="font-label-bold text-on-surface truncate">{req.deviceType}</div>
                      <div className="text-sm text-on-surface-variant truncate" title={req.problemDesc}>{req.problemDesc}</div>
                    </td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex px-3 py-1 rounded-full font-label-bold text-[12px]
                        ${req.status === 'SELESAI' ? 'bg-[#dcfce7] text-[#166534]' : 
                          req.status === 'DIPROSES' || req.status === 'DIKERJAKAN' || req.status === 'DIAGNOSA' ? 'bg-[#fef9c3] text-[#854d0e]' : 
                          'bg-secondary-container text-on-secondary-container'}
                      `}>
                        {req.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right space-x-2">
                      <button onClick={() => openModal(req)} className="p-2 rounded-full hover:bg-secondary-container text-secondary transition-colors" title="Edit Status" aria-label="Edit Status">
                        <span className="material-symbols-outlined text-[20px]">edit</span>
                      </button>
                      <button onClick={() => handleDelete(req.id)} className="p-2 rounded-full hover:bg-error-container text-error transition-colors" title="Hapus" aria-label="Hapus">
                        <span className="material-symbols-outlined text-[20px]">delete</span>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </main>

      {/* Form Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
          <div className="bg-surface w-full max-w-xl rounded-xl shadow-xl border border-outline-variant overflow-hidden flex flex-col max-h-[90vh]">
            <div className="flex items-center justify-between px-6 py-4 border-b border-outline-variant">
              <h2 className="font-headline-sm text-headline-sm text-on-surface">
                {editingId ? "Update Status Resi" : "Buat Resi Manual"}
              </h2>
              <button onClick={closeModal} className="p-2 rounded-full hover:bg-surface-container text-on-surface-variant transition-colors cursor-pointer" aria-label="Tutup">
                <span className="material-symbols-outlined">close</span>
              </button>
            </div>

            <div className="p-6 overflow-y-auto">
              <form id="request-form" onSubmit={handleSubmit} className="space-y-4">
                
                {/* User details only editable when creating new */}
                {!editingId && (
                  <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="request-name" className="block font-label-bold text-label-bold text-on-surface mb-1">Nama Pelanggan</label>
                        <input id="request-name" type="text" required value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-surface border border-outline-variant rounded px-3 py-2 font-body-md focus:ring-2 focus:ring-primary outline-none" />
                      </div>
                      <div>
                        <label htmlFor="request-whatsapp" className="block font-label-bold text-label-bold text-on-surface mb-1">WhatsApp</label>
                        <input id="request-whatsapp" type="text" required value={formData.whatsapp} onChange={e => setFormData({...formData, whatsapp: e.target.value})} className="w-full bg-surface border border-outline-variant rounded px-3 py-2 font-body-md focus:ring-2 focus:ring-primary outline-none" />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="request-address" className="block font-label-bold text-label-bold text-on-surface mb-1">Alamat Lengkap</label>
                      <input id="request-address" type="text" required value={formData.address} onChange={e => setFormData({...formData, address: e.target.value})} className="w-full bg-surface border border-outline-variant rounded px-3 py-2 font-body-md focus:ring-2 focus:ring-primary outline-none" />
                    </div>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="request-deviceType" className="block font-label-bold text-label-bold text-on-surface mb-1">Tipe Perangkat</label>
                        <input id="request-deviceType" type="text" required value={formData.deviceType} onChange={e => setFormData({...formData, deviceType: e.target.value})} className="w-full bg-surface border border-outline-variant rounded px-3 py-2 font-body-md focus:ring-2 focus:ring-primary outline-none" />
                      </div>
                      <div>
                        <label htmlFor="request-serviceType" className="block font-label-bold text-label-bold text-on-surface mb-1">Tipe Layanan</label>
                        <input id="request-serviceType" type="text" required value={formData.serviceType} onChange={e => setFormData({...formData, serviceType: e.target.value})} className="w-full bg-surface border border-outline-variant rounded px-3 py-2 font-body-md focus:ring-2 focus:ring-primary outline-none" />
                      </div>
                    </div>
                    <div>
                      <label htmlFor="request-problemDesc" className="block font-label-bold text-label-bold text-on-surface mb-1">Deskripsi Kendala</label>
                      <textarea id="request-problemDesc" required rows={2} value={formData.problemDesc} onChange={e => setFormData({...formData, problemDesc: e.target.value})} className="w-full bg-surface border border-outline-variant rounded px-3 py-2 font-body-md focus:ring-2 focus:ring-primary outline-none"></textarea>
                    </div>
                  </>
                )}

                {/* Status and Tech info editable always */}
                <div className="bg-surface-container p-4 rounded-xl space-y-4">
                  <div>
                    <label htmlFor="request-status" className="block font-label-bold text-label-bold text-on-surface mb-1">Status Progres</label>
                    <select id="request-status"
                      value={formData.status} 
                      onChange={e => setFormData({...formData, status: e.target.value})} 
                      className="w-full bg-surface border border-outline-variant rounded px-3 py-2 font-body-md focus:ring-2 focus:ring-primary outline-none"
                    >
                      <option value="DITERIMA">Diterima</option>
                      <option value="DIAGNOSA">Sedang Didiagnosa</option>
                      <option value="DIKERJAKAN">Sedang Dikerjakan</option>
                      <option value="MENUNGGU_SPAREPART">Menunggu Sparepart</option>
                      <option value="SELESAI">Selesai (Bisa Diambil)</option>
                      <option value="DIBATALKAN">Dibatalkan</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="request-technicianName" className="block font-label-bold text-label-bold text-on-surface mb-1">Nama Teknisi (Opsional)</label>
                    <input id="request-technicianName" type="text" value={formData.technicianName} onChange={e => setFormData({...formData, technicianName: e.target.value})} className="w-full bg-surface border border-outline-variant rounded px-3 py-2 font-body-md focus:ring-2 focus:ring-primary outline-none" placeholder="Nama yang mengerjakan" />
                  </div>
                  <div>
                    <label htmlFor="request-technicianNotes" className="block font-label-bold text-label-bold text-on-surface mb-1">Catatan Teknisi (Internal)</label>
                    <textarea id="request-technicianNotes" rows={2} value={formData.technicianNotes} onChange={e => setFormData({...formData, technicianNotes: e.target.value})} className="w-full bg-surface border border-outline-variant rounded px-3 py-2 font-body-md focus:ring-2 focus:ring-primary outline-none" placeholder="Catatan tambahan..."></textarea>
                  </div>
                </div>
              </form>
            </div>

            <div className="px-6 py-4 border-t border-outline-variant bg-surface-container-lowest flex justify-end gap-3">
              <button type="button" onClick={closeModal} className="px-6 py-2 rounded font-label-bold border border-outline-variant hover:bg-surface-container transition-colors text-on-surface cursor-pointer">Batal</button>
              <button type="submit" form="request-form" disabled={isSubmitting} className="px-6 py-2 rounded font-label-bold bg-primary text-on-primary hover:bg-on-primary-fixed-variant transition-colors disabled:opacity-70 disabled:cursor-not-allowed cursor-pointer">
                {isSubmitting ? "Menyimpan..." : "Simpan Resi"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
