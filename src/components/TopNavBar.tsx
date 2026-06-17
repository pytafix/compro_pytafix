"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";

export function TopNavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const links = [
    { name: "Home", href: "/" },
    { name: "Layanan", href: "/layanan" },
    { name: "Tentang", href: "/tentang-kami" },
    { name: "Sparepart", href: "/sparepart" },
    { name: "Cek Status", href: "/cek-status-servis" },
    { name: "Kontak", href: "/kontak" },
  ];

  return (
    <nav className="bg-surface/80 backdrop-blur-md fixed top-0 w-full z-50 border-b border-outline-variant shadow-sm">
      <div className="flex justify-between items-center h-20 px-4 md:px-8 lg:px-margin-desktop max-w-container-max mx-auto">
        <Link href="/" className="flex items-center gap-3 md:gap-4" onClick={() => setIsOpen(false)}>
          <img
            alt="Pytafix Logo"
            className="h-8 w-8 md:h-10 md:w-10 object-contain"
            src="https://lh3.googleusercontent.com/aida-public/AB6AXuCQ2XCyFMq2ez6nHxNFn1J0rMFjLFCRkfUehmr4PXwtKLtXdYQggWqKl3Nbx5JHYNAG4OTeYIArtxXVph7OV7OmoKGgZpXnz47UKyqDTWCjKIyWMAOy_dQugLsbd8EK6HnnwqivPu_yvzUIiZYUPwPJ7QpRS0FduXNbag5BYx65GkRmVa2N58MygzXusvYOQcqEySmetOl0EkHLIp4ub8iRBabbGvDDMAltDjMWvsS4ELSIYD6qpRoTfPHXNO5xNGJqq4GSTGYeYti6"
          />
          <span className="font-headline-md text-xl md:text-headline-md font-bold text-primary">
            Pytafix
          </span>
        </Link>
        
        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-4 lg:gap-8">
          {links.map((link) => (
            <Link 
              key={link.name} 
              href={link.href} 
              className={`font-label-bold text-label-bold transition-colors duration-200 ${
                pathname === link.href 
                  ? "text-primary border-b-2 border-primary pb-1" 
                  : "text-on-surface-variant hover:text-primary"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </div>
        
        <Link 
          href="/booking-servis" 
          className="hidden md:flex bg-primary text-on-primary font-label-bold text-label-bold px-4 lg:px-6 py-2.5 lg:py-3 rounded hover:opacity-90 hover:shadow-md transition-all items-center justify-center cursor-pointer"
        >
          Booking Sekarang
        </Link>

        {/* Mobile Toggle */}
        <button 
          className="md:hidden text-primary p-2 focus:outline-none" 
          onClick={() => setIsOpen(!isOpen)}
          aria-label="Toggle Menu"
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
        >
          <span className="material-symbols-outlined text-[32px] transition-transform duration-300">
            {isOpen ? "close" : "menu"}
          </span>
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {isOpen && (
        <div id="mobile-menu" className="md:hidden absolute top-20 left-0 w-full bg-surface/95 backdrop-blur-md border-b border-outline-variant shadow-lg flex flex-col items-center py-6 gap-6 animate-in slide-in-from-top-2">
          {links.map((link) => (
            <Link 
              key={link.name} 
              href={link.href} 
              className={`font-label-bold text-lg ${
                pathname === link.href ? "text-primary" : "text-on-surface-variant"
              }`}
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <Link 
            href="/booking-servis" 
            onClick={() => setIsOpen(false)} 
            className="w-full bg-primary text-on-primary font-label-bold text-label-bold px-6 py-3 rounded shadow-sm text-center mt-4 mx-6 max-w-[calc(100%-3rem)] cursor-pointer"
          >
            Booking Sekarang
          </Link>
        </div>
      )}
    </nav>
  );
}
