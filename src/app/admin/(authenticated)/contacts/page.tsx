"use client";

import { FormEvent, useEffect, useState } from "react";
import { toast } from "sonner";
import { formatWhatsAppDisplay, normalizeWhatsApp } from "@/lib/whatsapp";

type ContactMessage = {
  id: string;
  name: string;
  email: string;
  whatsapp: string;
  subject: string;
  message: string;
  read: boolean;
  createdAt: string;
};

type ContactResponse = {
  items: ContactMessage[];
  unreadCount: number;
  pagination: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
};

type MessageFilter = "all" | "unread" | "read";

export default function AdminContactsPage() {
  const [messages, setMessages] = useState<ContactMessage[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<MessageFilter>("unread");
  const [searchInput, setSearchInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [total, setTotal] = useState(0);
  const [unreadCount, setUnreadCount] = useState(0);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    let cancelled = false;
    const loadMessages = async () => {
      setIsLoading(true);
      try {
        const params = new URLSearchParams({
          page: String(page),
          pageSize: "20",
          status: filter,
        });
        if (searchQuery) params.set("query", searchQuery);

        const response = await fetch(`/api/admin/contacts?${params.toString()}`, {
          credentials: "include",
        });
        if (!response.ok) throw new Error("Gagal mengambil pesan kontak.");

        const data = (await response.json()) as ContactResponse;
        if (!cancelled) {
          if (data.pagination.page > data.pagination.totalPages) {
            setPage(data.pagination.totalPages);
            return;
          }
          setMessages(data.items);
          setUnreadCount(data.unreadCount);
          setTotal(data.pagination.total);
          setTotalPages(data.pagination.totalPages);
        }
      } catch (error) {
        if (!cancelled) {
          toast.error(error instanceof Error ? error.message : "Terjadi kesalahan.");
        }
      } finally {
        if (!cancelled) setIsLoading(false);
      }
    };

    void loadMessages();
    return () => {
      cancelled = true;
    };
  }, [filter, page, refreshKey, searchQuery]);

  const submitSearch = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setPage(1);
    setSearchQuery(searchInput.trim());
  };

  const changeFilter = (nextFilter: MessageFilter) => {
    setFilter(nextFilter);
    setPage(1);
  };

  const updateReadState = async (message: ContactMessage, read: boolean) => {
    try {
      const response = await fetch(`/api/admin/contacts/${message.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ read }),
      });
      if (!response.ok) throw new Error("Gagal memperbarui status pesan.");
      toast.success(read ? "Pesan ditandai sudah dibaca." : "Pesan ditandai belum dibaca.");
      setRefreshKey((current) => current + 1);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Terjadi kesalahan.");
    }
  };

  return (
    <main className="mx-auto w-full max-w-7xl p-4 md:p-8">
      <header className="mb-8">
        <div className="flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
          <div>
            <h1 className="font-headline-md text-on-surface">Pesan Kontak</h1>
            <p className="mt-1 text-on-surface-variant">
              Tinjau pesan dari formulir kontak dan lanjutkan percakapan melalui kanal pelanggan.
            </p>
          </div>
          <span className="w-fit rounded-full bg-primary-container px-4 py-2 font-label-bold text-on-primary-container">
            {unreadCount} belum dibaca
          </span>
        </div>
      </header>

      <section className="mb-6 rounded-xl border border-outline-variant bg-surface p-4">
        <form className="flex flex-col gap-3 lg:flex-row" onSubmit={submitSearch}>
          <label className="flex-1">
            <span className="sr-only">Cari pesan kontak</span>
            <input
              type="search"
              value={searchInput}
              onChange={(event) => setSearchInput(event.target.value)}
              placeholder="Cari nama, subjek, WhatsApp, email, atau isi pesan"
              className="w-full rounded-lg border border-outline-variant bg-surface px-4 py-3 text-on-surface outline-none focus:ring-2 focus:ring-primary"
            />
          </label>
          <button
            type="submit"
            className="rounded-lg bg-primary px-5 py-3 font-label-bold text-on-primary"
          >
            Cari
          </button>
        </form>

        <div className="mt-4 flex flex-wrap gap-2" aria-label="Filter status pesan">
          {([
            ["unread", "Belum dibaca"],
            ["all", "Semua"],
            ["read", "Sudah dibaca"],
          ] as const).map(([value, label]) => (
            <button
              key={value}
              type="button"
              onClick={() => changeFilter(value)}
              aria-pressed={filter === value}
              className={`rounded-full px-4 py-2 font-label-bold transition-colors ${
                filter === value
                  ? "bg-secondary-container text-on-secondary-container"
                  : "bg-surface-container text-on-surface-variant hover:text-on-surface"
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </section>

      {isLoading ? (
        <div className="rounded-xl border border-outline-variant bg-surface p-12 text-center text-on-surface-variant">
          Memuat pesan kontak...
        </div>
      ) : messages.length === 0 ? (
        <div className="rounded-xl border border-outline-variant bg-surface p-12 text-center">
          <span className="material-symbols-outlined text-[48px] text-outline" aria-hidden="true">
            mark_email_read
          </span>
          <h2 className="mt-3 font-headline-sm text-on-surface">Tidak ada pesan pada filter ini</h2>
          <p className="mt-2 text-on-surface-variant">
            Ubah filter atau kata pencarian untuk melihat pesan lainnya.
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {messages.map((message) => {
            const whatsapp = normalizeWhatsApp(message.whatsapp);
            return (
              <article
                key={message.id}
                className={`rounded-xl border bg-surface p-5 shadow-sm ${
                  message.read ? "border-outline-variant" : "border-primary"
                }`}
              >
                <div className="flex flex-col justify-between gap-4 md:flex-row md:items-start">
                  <div className="min-w-0">
                    <div className="flex flex-wrap items-center gap-2">
                      <h2 className="font-headline-sm text-on-surface">{message.subject}</h2>
                      {!message.read && (
                        <span className="rounded-full bg-primary-container px-3 py-1 text-xs font-bold text-on-primary-container">
                          Baru
                        </span>
                      )}
                    </div>
                    <p className="mt-2 font-label-bold text-on-surface">{message.name}</p>
                    <p className="text-sm text-on-surface-variant">
                      {new Date(message.createdAt).toLocaleString("id-ID", {
                        dateStyle: "medium",
                        timeStyle: "short",
                        timeZone: "Asia/Jakarta",
                      })}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => updateReadState(message, !message.read)}
                    className="inline-flex shrink-0 items-center justify-center gap-2 rounded-lg border border-outline-variant px-4 py-2 font-label-bold text-primary hover:bg-primary-container"
                  >
                    <span className="material-symbols-outlined text-[19px]" aria-hidden="true">
                      {message.read ? "mark_email_unread" : "mark_email_read"}
                    </span>
                    {message.read ? "Tandai belum dibaca" : "Tandai sudah dibaca"}
                  </button>
                </div>

                <p className="mt-5 whitespace-pre-wrap break-words rounded-lg bg-surface-container-low p-4 text-on-surface">
                  {message.message}
                </p>

                <div className="mt-4 flex flex-wrap gap-3">
                  <a
                    href={`https://wa.me/${whatsapp}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-4 py-2 font-label-bold text-white"
                  >
                    <span className="material-symbols-outlined text-[18px]" aria-hidden="true">
                      chat
                    </span>
                    {formatWhatsAppDisplay(message.whatsapp)}
                  </a>
                  {message.email && (
                    <a
                      href={`mailto:${message.email}`}
                      className="inline-flex items-center gap-2 rounded-full border border-primary px-4 py-2 font-label-bold text-primary"
                    >
                      <span className="material-symbols-outlined text-[18px]" aria-hidden="true">
                        mail
                      </span>
                      {message.email}
                    </a>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      )}

      <footer className="mt-6 flex flex-col items-center justify-between gap-3 sm:flex-row">
        <p className="text-sm text-on-surface-variant">
          {total} pesan ditemukan
        </p>
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
      </footer>
    </main>
  );
}
