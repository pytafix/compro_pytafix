"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X } from "lucide-react";

type NavItem = {
  name: string;
  href?: string;
  children?: { name: string; href: string }[];
};

const navItems: NavItem[] = [
  { name: "Home", href: "/" },
  { 
    name: "Layanan", 
    children: [
      { name: "Semua Layanan", href: "/layanan" },
      { name: "Booking Servis", href: "/booking-servis" },
      { name: "Cek Status Servis", href: "/cek-status-servis" },
      { name: "Klaim Garansi", href: "/klaim-garansi" },
    ] 
  },
  {
    name: "Produk & Promo",
    children: [
      { name: "Sparepart", href: "/sparepart" },
      { name: "Jual Beli", href: "/jual-beli" },
      { name: "Promo", href: "/promo" },
    ]
  },
  { 
    name: "Informasi", 
    children: [
      { name: "Tentang Kami", href: "/tentang-kami" },
      { name: "Portofolio", href: "/portofolio" },
      { name: "Testimoni", href: "/testimoni" },
      { name: "Artikel", href: "/artikel" },
      { name: "FAQ", href: "/faq" },
    ] 
  },
  { 
    name: "Bantuan", 
    children: [
      { name: "Kontak", href: "/kontak" },
      { name: "Syarat & Ketentuan", href: "/syarat-ketentuan" },
      { name: "Kebijakan Privasi", href: "/kebijakan-privasi" },
    ] 
  },
];

export function TopNavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [openAccordion, setOpenAccordion] = useState<string | null>(null);
  const pathname = usePathname();

  const toggleAccordion = (name: string) => {
    setOpenAccordion(prev => prev === name ? null : name);
  };

  const closeMenu = () => {
    setIsOpen(false);
    setOpenAccordion(null);
  };

  // Close menu on route change
  useEffect(() => {
    closeMenu();
  }, [pathname]);

  // Helper to check if a nav item is active (including its children)
  const isActive = (item: NavItem) => {
    if (item.href && pathname === item.href) return true;
    if (item.children?.some(child => pathname === child.href)) return true;
    return false;
  };

  return (
    <>
      <nav className="bg-surface/80 backdrop-blur-md fixed top-0 w-full z-50 border-b border-outline-variant shadow-sm">
        <div className="flex justify-between items-center h-20 px-4 md:px-8 lg:px-margin-desktop max-w-container-max mx-auto">
          <Link href="/" className="flex items-center gap-3 md:gap-4" onClick={closeMenu}>
            <span className="font-headline-md text-xl md:text-headline-md font-bold text-primary">
              Pytafix
            </span>
          </Link>
          
          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-4 lg:gap-8 h-full">
            {navItems.map((item) => (
              <div key={item.name} className="relative group h-full flex items-center">
                {item.href ? (
                  <Link 
                    href={item.href} 
                    className={`flex items-center gap-1 font-label-bold text-label-bold transition-colors duration-200 h-full border-b-2 ${
                      isActive(item)
                        ? "text-primary border-primary" 
                        : "text-on-surface-variant hover:text-primary border-transparent"
                    }`}
                  >
                    {item.name}
                  </Link>
                ) : (
                  <button 
                    aria-haspopup="true"
                    aria-expanded={false}
                    className={`flex items-center gap-1 font-label-bold text-label-bold transition-colors duration-200 h-full border-b-2 ${
                      isActive(item)
                        ? "text-primary border-primary" 
                        : "text-on-surface-variant hover:text-primary border-transparent group-hover:text-primary"
                    }`}
                  >
                    {item.name}
                    <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
                  </button>
                )}
                
                {/* Desktop Dropdown */}
                {item.children && (
                  <div className="absolute top-full left-0 hidden group-hover:block group-focus-within:block pt-1 z-50">
                    <div className="bg-surface border border-outline-variant rounded-xl shadow-lg w-56 py-2 flex flex-col overflow-hidden animate-in fade-in slide-in-from-top-2">
                      {item.children.map((child) => (
                        <Link
                          key={child.name}
                          href={child.href}
                          className={`px-4 py-3 text-sm transition-colors hover:bg-primary/5 ${
                            pathname === child.href ? "text-primary font-bold bg-primary/5" : "text-on-surface-variant"
                          }`}
                        >
                          {child.name}
                        </Link>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
          
          <div className="hidden md:flex items-center gap-4">
            <Link 
              href="/booking-servis" 
              className="bg-primary text-on-primary font-label-bold text-label-bold px-4 lg:px-6 py-2.5 lg:py-3 rounded hover:opacity-90 hover:shadow-md transition-all items-center justify-center cursor-pointer"
            >
              Booking Sekarang
            </Link>
          </div>

          {/* Mobile Toggle */}
          <div className="flex items-center md:hidden gap-2">
            <button 
              className="text-primary p-2 focus:outline-none" 
              onClick={() => setIsOpen(!isOpen)}
              aria-label="Toggle Menu"
              aria-expanded={isOpen}
              aria-controls="mobile-menu"
            >
              {isOpen ? <X className="w-8 h-8" /> : <Menu className="w-8 h-8" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Fullscreen Overlay */}
      {isOpen && (
        <div className="md:hidden fixed inset-0 z-[60] bg-surface flex flex-col animate-in slide-in-from-bottom-4">
          <div className="flex justify-between items-center h-20 px-4 border-b border-outline-variant/30">
            <Link href="/" className="flex items-center gap-3" onClick={closeMenu}>
              <span className="font-headline-md text-xl font-bold text-primary">
                Pytafix
              </span>
            </Link>
            <button 
              className="text-primary p-2 focus:outline-none" 
              onClick={closeMenu}
            >
              <X className="w-8 h-8" />
            </button>
          </div>
          
          <div className="flex flex-col py-6 px-6 gap-2 flex-1 overflow-y-auto">
            {navItems.map((item) => (
              <div key={item.name} className="flex flex-col border-b border-outline-variant/30 last:border-0">
                {item.href ? (
                  <Link 
                    href={item.href} 
                    className={`font-headline-sm text-lg py-4 font-bold ${
                      pathname === item.href ? "text-primary" : "text-on-surface-variant"
                    }`}
                    onClick={closeMenu}
                  >
                    {item.name}
                  </Link>
                ) : (
                  <>
                    <button 
                      onClick={() => toggleAccordion(item.name)}
                      aria-expanded={openAccordion === item.name}
                      aria-controls={`accordion-${item.name}`}
                      className={`flex justify-between items-center w-full font-headline-sm text-lg py-4 font-bold ${
                        isActive(item) || openAccordion === item.name ? "text-primary" : "text-on-surface-variant"
                      }`}
                    >
                      {item.name}
                      <ChevronDown className={`w-5 h-5 transition-transform ${openAccordion === item.name ? "rotate-180" : ""}`} />
                    </button>
                    
                    {/* Mobile Accordion Content */}
                    {openAccordion === item.name && (
                      <div id={`accordion-${item.name}`} className="flex flex-col gap-2 pb-4 px-4 animate-in fade-in slide-in-from-top-1">
                        {item.children?.map((child) => (
                          <Link
                            key={child.name}
                            href={child.href}
                            className={`py-2 text-base transition-colors ${
                              pathname === child.href ? "text-primary font-bold" : "text-on-surface-variant"
                            }`}
                            onClick={closeMenu}
                          >
                            {child.name}
                          </Link>
                        ))}
                      </div>
                    )}
                  </>
                )}
              </div>
            ))}
            
            <Link 
              href="/booking-servis" 
              onClick={closeMenu} 
              className="w-full bg-primary text-on-primary font-label-bold text-lg px-6 py-4 rounded-xl shadow-md hover:shadow-lg transition-all text-center mt-6 cursor-pointer"
            >
              Booking Sekarang
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
