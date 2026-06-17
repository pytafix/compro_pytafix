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
  ];

  return (
    <header className="bg-surface border-b border-outline-variant px-6 py-4 flex flex-col sm:flex-row sm:items-center justify-between sticky top-0 z-40 gap-4 sm:gap-0">
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-3 border-r border-outline-variant pr-6">
          <span className="material-symbols-outlined text-primary text-[28px]" style={{ fontVariationSettings: "'FILL' 1" }}>
            admin_panel_settings
          </span>
          <h1 className="font-headline-sm text-headline-sm text-on-surface">Pytafix Admin</h1>
        </div>
        
        <nav className="flex gap-2 overflow-x-auto pb-1 sm:pb-0">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`flex items-center gap-2 px-4 py-2 rounded-full font-label-bold text-label-bold transition-colors whitespace-nowrap ${
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
      </div>

      <button
        onClick={handleLogout}
        className="flex items-center justify-center gap-2 text-error hover:bg-error-container/20 px-4 py-2 rounded transition-colors font-label-bold text-label-bold cursor-pointer whitespace-nowrap"
      >
        <span className="material-symbols-outlined text-[20px]">logout</span>
        Logout
      </button>
    </header>
  );
}
