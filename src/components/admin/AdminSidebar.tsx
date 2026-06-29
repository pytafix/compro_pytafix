"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { toast } from "sonner";
import { useState } from "react";

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    router.push("/admin/login");
    toast.success("Berhasil logout.");
  };

  const navLinks = [
    { label: "Tiket Servis", href: "/admin/requests", icon: "inbox" },
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

  const SidebarContent = () => (
    <div className="flex flex-col h-full bg-surface border-r border-outline-variant w-64">
      <div className="p-6 border-b border-outline-variant flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span className="material-symbols-outlined text-primary text-[28px]" style={{ fontVariationSettings: "'FILL' 1" }}>
            admin_panel_settings
          </span>
          <h1 className="font-headline-sm text-headline-sm text-on-surface">Pytafix Admin</h1>
        </div>
        <button 
          className="md:hidden text-on-surface-variant hover:text-on-surface"
          onClick={() => setIsMobileMenuOpen(false)}
        >
          <span className="material-symbols-outlined">close</span>
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto py-4 px-3 flex flex-col gap-1 hide-scrollbar">
        {navLinks.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setIsMobileMenuOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl font-label-bold text-label-bold transition-colors ${
                isActive 
                  ? "bg-primary-container text-on-primary-container" 
                  : "text-on-surface-variant hover:bg-surface-container hover:text-on-surface"
              }`}
            >
              <span className="material-symbols-outlined text-[20px]" style={isActive ? { fontVariationSettings: "'FILL' 1" } : {}}>
                {link.icon}
              </span>
              {link.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-4 border-t border-outline-variant">
        <button
          onClick={handleLogout}
          className="w-full flex items-center justify-center gap-2 text-error hover:bg-error-container/20 px-4 py-3 rounded-xl transition-colors font-label-bold text-label-bold cursor-pointer"
        >
          <span className="material-symbols-outlined text-[20px]">logout</span>
          Logout
        </button>
      </div>
    </div>
  );

  return (
    <>
      {/* Mobile Top Bar */}
      <div className="md:hidden bg-surface border-b border-outline-variant p-4 flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center gap-3">
          <button 
            onClick={() => setIsMobileMenuOpen(true)}
            className="text-on-surface hover:text-primary transition-colors"
          >
            <span className="material-symbols-outlined text-[28px]">menu</span>
          </button>
          <span className="font-headline-sm text-headline-sm text-on-surface">Pytafix Admin</span>
        </div>
        <button onClick={handleLogout} className="text-error">
          <span className="material-symbols-outlined text-[24px]">logout</span>
        </button>
      </div>

      {/* Mobile Overlay */}
      {isMobileMenuOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 md:hidden backdrop-blur-sm"
          onClick={() => setIsMobileMenuOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <aside className={`fixed inset-y-0 left-0 z-50 transform ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out md:translate-x-0 md:static md:h-screen shrink-0`}>
        <SidebarContent />
      </aside>
    </>
  );
}
