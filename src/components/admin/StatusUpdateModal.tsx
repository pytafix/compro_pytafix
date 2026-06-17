"use client";

import { useState } from "react";
import { toast } from "sonner";

export interface RequestData {
  id: number;
  trackingId: string;
  name: string;
  whatsapp: string;
  deviceType: string;
  serviceType: string;
  problemDesc: string;
  status: string;
  technicianName: string | null;
  technicianNotes: string | null;
  createdAt: string;
}

interface StatusUpdateModalProps {
  request: RequestData;
  onClose: () => void;
  onSuccess: () => void;
}

export function StatusUpdateModal({ request, onClose, onSuccess }: StatusUpdateModalProps) {
  const [status, setStatus] = useState(request.status);
  const [technicianName, setTechnicianName] = useState(request.technicianName || "");
  const [technicianNotes, setTechnicianNotes] = useState(request.technicianNotes || "");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch(`/api/admin/requests/${request.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          status,
          technicianName: technicianName.trim() || null,
          technicianNotes: technicianNotes.trim() || null,
        }),
      });

      if (res.ok) {
        toast.success(`Status ${request.trackingId} berhasil diperbarui.`);
        onSuccess();
      } else {
        toast.error("Gagal memperbarui status.");
      }
    } catch (err) {
      toast.error("Terjadi kesalahan koneksi.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-surface w-full max-w-lg rounded-xl shadow-xl border border-outline-variant overflow-hidden flex flex-col max-h-[90vh]">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-outline-variant bg-surface-container-lowest">
          <div>
            <h2 className="font-headline-sm text-headline-sm text-on-surface">Update Status Servis</h2>
            <p className="font-label-sm text-label-sm text-on-surface-variant font-mono mt-1">
              {request.trackingId} - {request.name}
            </p>
          </div>
          <button onClick={onClose} className="p-2 rounded-full hover:bg-surface-container transition-colors text-on-surface-variant cursor-pointer">
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>

        {/* Form Body */}
        <div className="p-6 overflow-y-auto">
          <form id="update-form" onSubmit={handleSubmit} className="space-y-6">
            
            {/* Context Info */}
            <div className="bg-surface-container-low p-4 rounded-lg border border-outline-variant">
              <p className="font-label-sm text-label-sm text-outline mb-1">Kendala ({request.deviceType}):</p>
              <p className="font-body-md text-body-md text-on-surface">{request.problemDesc}</p>
            </div>

            {/* Status Dropdown */}
            <div className="space-y-2">
              <label className="font-label-bold text-label-bold text-on-surface block" htmlFor="status">
                Status Terkini
              </label>
              <select
                id="status"
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="w-full bg-surface border border-outline-variant rounded px-4 py-3 font-body-md text-on-surface focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all cursor-pointer"
              >
                <option value="DITERIMA">1 - Diterima</option>
                <option value="DIAGNOSA">2 - Diagnosa</option>
                <option value="DIKERJAKAN">3 - Sedang Dikerjakan</option>
                <option value="SELESAI">4 - Selesai</option>
              </select>
            </div>

            {/* Technician Info */}
            <div className="grid grid-cols-1 gap-6">
              <div className="space-y-2">
                <label className="font-label-bold text-label-bold text-on-surface block" htmlFor="techName">
                  Nama Teknisi Penanggung Jawab
                </label>
                <input
                  id="techName"
                  type="text"
                  value={technicianName}
                  onChange={(e) => setTechnicianName(e.target.value)}
                  placeholder="Misal: Budi S."
                  className="w-full bg-surface border border-outline-variant rounded px-4 py-3 font-body-md text-on-surface focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                />
              </div>

              <div className="space-y-2">
                <label className="font-label-bold text-label-bold text-on-surface block" htmlFor="notes">
                  Catatan Teknisi (Terlihat oleh pelanggan)
                </label>
                <textarea
                  id="notes"
                  value={technicianNotes}
                  onChange={(e) => setTechnicianNotes(e.target.value)}
                  rows={3}
                  placeholder="Jelaskan kondisi perbaikan secara singkat..."
                  className="w-full bg-surface border border-outline-variant rounded px-4 py-3 font-body-md text-on-surface focus:ring-2 focus:ring-primary focus:border-primary outline-none transition-all"
                ></textarea>
              </div>
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-outline-variant bg-surface-container-lowest flex justify-end gap-3 mt-auto">
          <button
            type="button"
            onClick={onClose}
            className="px-6 py-2 rounded font-label-bold text-label-bold border border-outline-variant hover:bg-surface-container transition-colors text-on-surface cursor-pointer"
          >
            Batal
          </button>
          <button
            type="submit"
            form="update-form"
            disabled={isSubmitting}
            className="px-6 py-2 rounded font-label-bold text-label-bold bg-primary text-on-primary hover:bg-on-primary-fixed-variant transition-colors disabled:opacity-70 disabled:cursor-not-allowed flex items-center gap-2 cursor-pointer"
          >
            {isSubmitting ? "Menyimpan..." : "Simpan Perubahan"}
          </button>
        </div>

      </div>
    </div>
  );
}
