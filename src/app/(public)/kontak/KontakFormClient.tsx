"use client";

import { useState } from "react";
import { toast } from "sonner";

export default function KontakForm() {
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    whatsapp: "",
    subject: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Pesan kamu sudah terkirim! Kami akan menghubungi segera.");
        setForm({ name: "", email: "", whatsapp: "", subject: "", message: "" });
      } else {
        toast.error(data.error || "Gagal mengirim pesan.");
      }
    } catch {
      toast.error("Terjadi kesalahan. Coba lagi.");
    } finally {
      setLoading(false);
    }
  };

  const inputClass = "w-full bg-surface border border-outline-variant rounded-lg px-4 py-3 font-body-md text-body-md text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-colors";

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="contact-name" className="block font-label-md text-on-surface mb-1.5">Nama Lengkap *</label>
        <input
          id="contact-name"
          type="text"
          required
          className={inputClass}
          placeholder="Masukkan nama kamu"
          value={form.name}
          onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="contact-email" className="block font-label-md text-on-surface mb-1.5">Email</label>
          <input
            id="contact-email"
            type="email"
            className={inputClass}
            placeholder="opsional@email.com"
            value={form.email}
            onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
          />
        </div>
        <div>
          <label htmlFor="contact-whatsapp" className="block font-label-md text-on-surface mb-1.5">WhatsApp *</label>
          <input
            id="contact-whatsapp"
            type="tel"
            required
            className={inputClass}
            placeholder="08xxxxxxxxxx"
            value={form.whatsapp}
            onChange={(e) => setForm((f) => ({ ...f, whatsapp: e.target.value }))}
          />
        </div>
      </div>

      <div>
        <label htmlFor="contact-subject" className="block font-label-md text-on-surface mb-1.5">Subjek *</label>
        <input
          id="contact-subject"
          type="text"
          required
          className={inputClass}
          placeholder="Topik yang ingin dibahas"
          value={form.subject}
          onChange={(e) => setForm((f) => ({ ...f, subject: e.target.value }))}
        />
      </div>

      <div>
        <label htmlFor="contact-message" className="block font-label-md text-on-surface mb-1.5">Pesan *</label>
        <textarea
          id="contact-message"
          required
          rows={4}
          className={`${inputClass} resize-none`}
          placeholder="Jelaskan keluhan atau pertanyaan kamu..."
          value={form.message}
          onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))}
        />
      </div>

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-primary text-on-primary font-label-bold text-label-bold px-8 py-4 rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {loading ? "Mengirim..." : "Kirim Pesan"}
      </button>
    </form>
  );
}
