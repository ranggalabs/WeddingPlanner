"use client";

import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { scrollToTarget } from "@/lib/scrollTo";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const curtainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setMounted(true);

    const handleScroll = () => {
      if (isOpen) setIsOpen(false);
    };
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  /**
   * Trigger per-image clip-path reveal on all .mask-reveal-container inside a section.
   * Staggered: each container reveals 120ms after the previous one.
   */
  function revealSectionImages(sectionId: string) {
    const section = document.getElementById(sectionId);
    if (!section) return;

    const containers = Array.from(
      section.querySelectorAll<HTMLElement>(".mask-reveal-container")
    );

    // Reset first (re-animate even if section was visited before)
    containers.forEach((c) => {
      c.classList.remove("revealed", "reveal-delay-1", "reveal-delay-2", "reveal-delay-3");
    });

    // Force reflow so removal is committed
    void section.offsetWidth;

    // Stagger reveal
    containers.forEach((c, i) => {
      const delay = i * 120;
      setTimeout(() => {
        if (i === 1) c.classList.add("reveal-delay-1");
        if (i === 2) c.classList.add("reveal-delay-2");
        if (i >= 3) c.classList.add("reveal-delay-3");
        c.classList.add("revealed");
      }, delay);
    });
  }

  /**
   * Full navigation handler:
   * 1. Close menu
   * 2. Curtain sweeps IN (left → right, covers screen, 550ms)
   * 3. Scroll to target (while screen is hidden)
   * 4. Curtain sweeps OUT (left → right, reveals new section, 580ms)
   * 5. Trigger per-image clip-path polygon reveal on landing section
   */
  const handleNav = (
    e: React.MouseEvent<HTMLAnchorElement>,
    target: string | number
  ) => {
    e.preventDefault();
    setIsOpen(false);

    const el = curtainRef.current;
    const cleanId =
      typeof target === "string" ? target.replace(/^(\/)?#/, "") : null;

    if (!el) {
      // No curtain yet — just scroll
      scrollToTarget(target);
      if (cleanId) revealSectionImages(cleanId);
      return;
    }

    // ── Phase 1: reset curtain to fully-hidden left edge (no transition) ──
    el.style.transition = "none";
    el.style.clipPath = "polygon(0 0, 0 0, 0 100%, 0 100%)";
    el.style.visibility = "visible";
    el.style.pointerEvents = "all";

    // Double rAF ensures the "none-transition" reset is committed to layout
    // before we start the sweep-in transition.
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        // ── Phase 2: sweep IN — left edge moves to right edge (covers screen) ──
        el.style.transition =
          "clip-path 0.55s cubic-bezier(0.77, 0, 0.175, 1)";
        el.style.clipPath = "polygon(0 0, 100% 0, 100% 100%, 0 100%)";

        setTimeout(() => {
          // ── Phase 3: scroll while hidden ──
          scrollToTarget(target);

          // Small pause for browser to settle on new scroll position
          setTimeout(() => {
            // ── Phase 4: sweep OUT — right edge peels away to right ──
            el.style.transition =
              "clip-path 0.58s cubic-bezier(0.22, 0.61, 0.36, 1)";
            el.style.clipPath =
              "polygon(100% 0, 100% 0, 100% 100%, 100% 100%)";

            // ── Phase 5: after curtain fully exits → trigger per-image reveal ──
            setTimeout(() => {
              el.style.visibility = "hidden";
              el.style.pointerEvents = "none";
              el.style.clipPath = "polygon(0 0, 0 0, 0 100%, 0 100%)";
              el.style.transition = "none";

              if (cleanId) revealSectionImages(cleanId);
            }, 600);
          }, 80);
        }, 580);
      });
    });
  };

  const menuDrawer = isOpen ? (
    <div
      className="fixed inset-0 z-[9500] flex bg-[#2A281F]/40 backdrop-blur-md"
      style={{ animation: "fadeIn 0.2s ease forwards" }}
    >
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
            {[
              { num: "01.", label: "Beranda", target: 0 as string | number },
              { num: "02.", label: "Kenapa Bali", target: "intro-section" },
              { num: "03.", label: "Layanan Utama", target: "layanan" },
              { num: "04.", label: "Paket Layanan", target: "paket" },
              { num: "05.", label: "Venue Pilihan", target: "venue" },
              { num: "06.", label: "Testimoni Pasangan", target: "testimoni" },
              { num: "07.", label: "Hubungi Kami", target: "kontak-section" },
            ].map(({ num, label, target }) => (
              <li key={num}>
                <a
                  href={typeof target === "number" ? "/" : `/#${target}`}
                  onClick={(e) => handleNav(e, target)}
                  className="font-libre-caslon text-2xl sm:text-3xl text-[#2A281F] hover:translate-x-2 transition-transform inline-flex items-baseline space-x-3 group cursor-pointer"
                >
                  <span className="text-xs font-sans uppercase tracking-widest text-[#8A8477] group-hover:text-[#2A281F]">
                    {num}
                  </span>
                  <span>{label}</span>
                </a>
              </li>
            ))}
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

      {/* Click backdrop to close */}
      <div className="flex-1" onClick={() => setIsOpen(false)} />
    </div>
  ) : null;

  return (
    <>
      <header className="absolute top-5 left-0 right-0 z-20 flex justify-center px-4">
        <nav className="glass-nav rounded-full px-5 sm:px-6 py-2.5 sm:py-3 flex items-center justify-between w-full max-w-4xl shadow-sm transition-all duration-300">
          <button
            onClick={() => setIsOpen(true)}
            className="flex items-center space-x-2 text-xs uppercase tracking-widest text-[#2A281F] font-medium hover:opacity-70 transition-opacity cursor-pointer py-1"
          >
            <Menu size={16} />
            <span>Menu</span>
          </button>

          <a
            href="/"
            onClick={(e) => handleNav(e, 0)}
            className="font-libre-caslon text-lg md:text-xl font-medium tracking-tight text-[#2A281F] cursor-pointer"
          >
            BALI WED
          </a>

          <a
            href="/#kontak-section"
            onClick={(e) => handleNav(e, "kontak-section")}
            className="inline-flex text-xs uppercase tracking-wider font-semibold text-[#2A281F] border border-[#2A281F]/30 rounded-full px-4 py-1.5 hover:bg-[#2A281F] hover:text-white transition-colors cursor-pointer"
          >
            Konsultasi
          </a>
        </nav>
      </header>

      {/* All portals rendered together into document.body */}
      {mounted &&
        createPortal(
          <>
            {/* ─── Fullscreen Clip-Path Curtain (nectar-mask-reveal, z-9000) ─── */}
            <div
              ref={curtainRef}
              aria-hidden="true"
              style={{
                position: "fixed",
                inset: 0,
                zIndex: 9000,
                pointerEvents: "none",
                visibility: "hidden",
                background:
                  "linear-gradient(135deg, #2A281F 0%, #1a1812 60%, #2A281F 100%)",
                clipPath: "polygon(0 0, 0 0, 0 100%, 0 100%)",
                willChange: "clip-path",
              }}
            />

            {/* ─── Slide-out Menu Drawer (z-9500, above curtain) ─── */}
            {menuDrawer}
          </>,
          document.body
        )}
    </>
  );
}
