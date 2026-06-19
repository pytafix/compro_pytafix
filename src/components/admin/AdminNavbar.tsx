"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";

export function AdminNavbar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
    toast.success("Berhasil logout.");
  };

    const navLinks = [
      { label: "Tiket Servis", href: "/admin/dashboard", icon: "inbox" },
      { label: "Layanan", href: "/admin/services", icon: "build" },
      { label: "Sparepart", href: "/admin/spareparts", icon: "inventory_2" },
      { label: "Klaim Garansi", href: "/admin/warranty", icon: "shield" },
      { label: "Promo", href: "/admin/promos", icon: "sell" },
      { label: "Portofolio", href: "/admin/portfolios", icon: "collections" },
      { label: "Artikel", href: "/admin/articles", icon: "article" },
      { label: "FAQ", href: "/admin/faqs", icon: "help" },
      { label: "Testimoni", href: "/admin/testimonials", icon: "star" },
      { label: "Pengaturan", href: "/admin/settings", icon: "settings" },
    ];

  return (
    <header className="bg-surface border-b border-outline-variant px-4 sm:px-6 py-4 flex flex-col gap-4 sticky top-0 z-40">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined text-primary text-[28px]" style={{ fontVariationSettings: "'FILL' 1" }}>
            admin_panel_settings
          </span>
          <h1 className="font-headline-sm text-headline-sm text-on-surface">Pytafix Admin</h1>
        </div>
        
        <button
          onClick={handleLogout}
          className="flex items-center justify-center gap-2 text-error hover:bg-error-container/20 px-3 py-1.5 sm:px-4 sm:py-2 rounded transition-colors font-label-bold text-label-bold cursor-pointer"
        >
          <span className="material-symbols-outlined text-[20px]">logout</span>
          <span className="hidden sm:inline">Logout</span>
        </button>
      </div>

      <nav className="flex gap-2 overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 hide-scrollbar">
        {navLinks.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`flex items-center gap-2 px-4 py-2 rounded-full font-label-bold text-label-bold transition-colors whitespace-nowrap shrink-0 ${
                isActive 
                  ? "bg-primary-container text-on-primary-container" 
                  : "text-on-surface hover:bg-surface-container"
              }`}
            >
              <span className="material-symbols-outlined text-[18px]" style={isActive ? { fontVariationSettings: "'FILL' 1" } : {}}>
                {link.icon}
              </span>
              {link.label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
