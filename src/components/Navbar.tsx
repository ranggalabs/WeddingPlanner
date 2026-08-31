"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { scrollToTarget } from "@/lib/scrollTo";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  const handleNav = (e: React.MouseEvent<HTMLAnchorElement>, target: string | number) => {
    e.preventDefault();
    setIsOpen(false);

    // Trigger Clip-Path & Mask Reveal Animations on the destination section
    const targetElement =
      typeof target === "string" ? document.getElementById(target) : null;

    if (targetElement) {
      targetElement.classList.remove("nectar-mask-reveal");
      // Force reflow to restart CSS animation
      void targetElement.offsetWidth;
      targetElement.classList.add("nectar-mask-reveal");

      setTimeout(() => {
        targetElement.classList.remove("nectar-mask-reveal");
      }, 1200);
    }

    scrollToTarget(target);
  };

  return (
    <>
      <header className="absolute top-5 left-0 right-0 z-20 flex justify-center px-4">
        <nav className="glass-nav rounded-full px-5 sm:px-6 py-2.5 sm:py-3 flex items-center justify-between w-full max-w-4xl shadow-sm transition-all duration-300">
          {/* Left: Menu Button */}
          <button
            onClick={() => setIsOpen(true)}
            className="flex items-center space-x-2 text-xs uppercase tracking-widest text-[#2A281F] font-medium hover:opacity-70 transition-opacity cursor-pointer py-1"
          >
            <Menu size={16} />
            <span>Menu</span>
          </button>

          {/* Center Logo */}
          <a
            href="/"
            onClick={(e) => handleNav(e, 0)}
            className="font-libre-caslon text-lg md:text-xl font-medium tracking-tight text-[#2A281F] cursor-pointer"
          >
            BALI WED
          </a>

          {/* Right: Konsultasi CTA */}
          <a
            href="/#kontak-section"
            onClick={(e) => handleNav(e, "kontak-section")}
            className="inline-flex text-xs uppercase tracking-wider font-semibold text-[#2A281F] border border-[#2A281F]/30 rounded-full px-4 py-1.5 hover:bg-[#2A281F] hover:text-white transition-colors cursor-pointer"
          >
            Konsultasi
          </a>
        </nav>
      </header>

      {/* Slide-out Menu Overlay (Chronological Editorial Order 01 to 07) */}
      {isOpen && (
        <div className="fixed inset-0 z-50 flex bg-[#2A281F]/40 backdrop-blur-md animate-fade-in">
          <div className="w-full max-w-md bg-[#F5F1E9] h-full p-8 md:p-12 flex flex-col justify-between shadow-2xl relative">
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-6 right-6 p-2 text-[#2A281F] hover:opacity-70 transition-opacity cursor-pointer"
              aria-label="Close menu"
            >
              <X size={24} />
            </button>

            <div>
              <p className="text-xs uppercase tracking-widest text-[#8A8477] mb-8 font-medium">
                Bali Wed — Navigasi Halaman
              </p>

              <ul className="space-y-4 sm:space-y-5">
                <li>
                  <a
                    href="/"
                    onClick={(e) => handleNav(e, 0)}
                    className="font-libre-caslon text-2xl sm:text-3xl text-[#2A281F] hover:translate-x-2 transition-transform inline-flex items-baseline space-x-3 group cursor-pointer"
                  >
                    <span className="text-xs font-sans uppercase tracking-widest text-[#8A8477] group-hover:text-[#2A281F]">
                      01.
                    </span>
                    <span>Beranda</span>
                  </a>
                </li>
                <li>
                  <a
                    href="/#intro-section"
                    onClick={(e) => handleNav(e, "intro-section")}
                    className="font-libre-caslon text-2xl sm:text-3xl text-[#2A281F] hover:translate-x-2 transition-transform inline-flex items-baseline space-x-3 group cursor-pointer"
                  >
                    <span className="text-xs font-sans uppercase tracking-widest text-[#8A8477] group-hover:text-[#2A281F]">
                      02.
                    </span>
                    <span>Kenapa Bali</span>
                  </a>
                </li>
                <li>
                  <a
                    href="/#layanan"
                    onClick={(e) => handleNav(e, "layanan")}
                    className="font-libre-caslon text-2xl sm:text-3xl text-[#2A281F] hover:translate-x-2 transition-transform inline-flex items-baseline space-x-3 group cursor-pointer"
                  >
                    <span className="text-xs font-sans uppercase tracking-widest text-[#8A8477] group-hover:text-[#2A281F]">
                      03.
                    </span>
                    <span>Layanan Utama</span>
                  </a>
                </li>
                <li>
                  <a
                    href="/#paket"
                    onClick={(e) => handleNav(e, "paket")}
                    className="font-libre-caslon text-2xl sm:text-3xl text-[#2A281F] hover:translate-x-2 transition-transform inline-flex items-baseline space-x-3 group cursor-pointer"
                  >
                    <span className="text-xs font-sans uppercase tracking-widest text-[#8A8477] group-hover:text-[#2A281F]">
                      04.
                    </span>
                    <span>Paket Layanan</span>
                  </a>
                </li>
                <li>
                  <a
                    href="/#venue"
                    onClick={(e) => handleNav(e, "venue")}
                    className="font-libre-caslon text-2xl sm:text-3xl text-[#2A281F] hover:translate-x-2 transition-transform inline-flex items-baseline space-x-3 group cursor-pointer"
                  >
                    <span className="text-xs font-sans uppercase tracking-widest text-[#8A8477] group-hover:text-[#2A281F]">
                      05.
                    </span>
                    <span>Venue Pilihan</span>
                  </a>
                </li>
                <li>
                  <a
                    href="/#testimoni"
                    onClick={(e) => handleNav(e, "testimoni")}
                    className="font-libre-caslon text-2xl sm:text-3xl text-[#2A281F] hover:translate-x-2 transition-transform inline-flex items-baseline space-x-3 group cursor-pointer"
                  >
                    <span className="text-xs font-sans uppercase tracking-widest text-[#8A8477] group-hover:text-[#2A281F]">
                      06.
                    </span>
                    <span>Testimoni Pasangan</span>
                  </a>
                </li>
                <li>
                  <a
                    href="/#kontak-section"
                    onClick={(e) => handleNav(e, "kontak-section")}
                    className="font-libre-caslon text-2xl sm:text-3xl text-[#2A281F] hover:translate-x-2 transition-transform inline-flex items-baseline space-x-3 group cursor-pointer"
                  >
                    <span className="text-xs font-sans uppercase tracking-widest text-[#8A8477] group-hover:text-[#2A281F]">
                      07.
                    </span>
                    <span>Hubungi Kami</span>
                  </a>
                </li>
              </ul>
            </div>

            <div className="border-t border-[#8A8477]/20 pt-6 space-y-3">
              <p className="text-xs text-[#8A8477] tracking-wide">
                Destination Wedding Specialist in Bali
              </p>
              <a
                href="https://wa.me/6281234567890"
                target="_blank"
                rel="noopener noreferrer"
                className="text-xs uppercase tracking-wider font-semibold text-[#2A281F] flex items-center space-x-1"
              >
                <span>WhatsApp Concierge</span>
                <ArrowUpRight size={14} />
              </a>
            </div>
          </div>

          <div className="flex-1" onClick={() => setIsOpen(false)} />
        </div>
      )}
    </>
  );
}
