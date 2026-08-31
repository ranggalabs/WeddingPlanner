"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { createPortal } from "react-dom";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { scrollToTarget } from "@/lib/scrollTo";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);
  const isAnimating = useRef(false);

  useEffect(() => {
    setMounted(true);
    const handleScroll = () => { if (isOpen) setIsOpen(false); };
    const handleKeyDown = (e: KeyboardEvent) => { if (e.key === "Escape") setIsOpen(false); };
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen]);

  /**
   * NECTAR PAGE TRANSITION — Full-screen overlay:
   *
   * Step 1: Overlay fades/appears IN (covers entire screen)  — 400ms
   * Step 2: scrollToTarget fires (while screen is covered)
   * Step 3: Overlay fades/disappears OUT (reveals new section) — 500ms
   * Step 4: Per-image staggered clip-path reveal on target section
   */
  const triggerTransition = useCallback((target: string | number) => {
    if (isAnimating.current) {
      // Fallback if already animating
      scrollToTarget(target);
      return;
    }

    const overlay = overlayRef.current;
    if (!overlay) {
      scrollToTarget(target);
      return;
    }

    isAnimating.current = true;

    const cleanId =
      typeof target === "string" ? target.replace(/^(\/)?#/, "") : null;

    // ── STEP 1: Cover the screen ────────────────────────────────────────────
    // Force overlay to be visible and fully opaque
    overlay.style.transition = "none";
    overlay.style.opacity = "0";
    overlay.style.display = "block";
    overlay.style.pointerEvents = "all";

    // Force reflow so "opacity: 0, display: block" is committed
    void overlay.offsetHeight;

    // Now animate to fully opaque
    overlay.style.transition = "opacity 0.38s ease-in";
    overlay.style.opacity = "1";

    // ── STEP 2: After cover completes → scroll ──────────────────────────────
    setTimeout(() => {
      // Scroll while screen is completely covered
      scrollToTarget(target);

      // Brief pause for scroll to settle
      setTimeout(() => {
        // ── STEP 3: Reveal the new section ───────────────────────────────────
        overlay.style.transition = "opacity 0.5s ease-out";
        overlay.style.opacity = "0";

        // ── STEP 4: After overlay exits → trigger per-image reveal ───────────
        setTimeout(() => {
          overlay.style.display = "none";
          overlay.style.pointerEvents = "none";
          isAnimating.current = false;

          if (cleanId) {
            const section = document.getElementById(cleanId);
            if (section) {
              const containers = Array.from(
                section.querySelectorAll<HTMLElement>(".mask-reveal-container")
              );
              // Reset then stagger reveal
              containers.forEach((c) =>
                c.classList.remove("revealed", "reveal-delay-1", "reveal-delay-2", "reveal-delay-3")
              );
              void section.offsetWidth;
              containers.forEach((c, i) => {
                setTimeout(() => {
                  c.classList.add("revealed");
                }, i * 150);
              });
            }
          }
        }, 520);
      }, 80);
    }, 420);
  }, []);

  const handleNav = (
    e: React.MouseEvent<HTMLAnchorElement>,
    target: string | number
  ) => {
    e.preventDefault();
    setIsOpen(false);
    // Small delay so menu drawer closes first (avoids visual conflict)
    setTimeout(() => triggerTransition(target), 50);
  };

  const menuDrawer = isOpen ? (
    <div
      className="fixed inset-0 z-[9500] flex bg-[#2A281F]/40 backdrop-blur-md"
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
              { num: "01.", label: "Beranda",            target: 0 as string | number },
              { num: "02.", label: "Kenapa Bali",        target: "intro-section" },
              { num: "03.", label: "Layanan Utama",      target: "layanan" },
              { num: "04.", label: "Paket Layanan",      target: "paket" },
              { num: "05.", label: "Venue Pilihan",      target: "venue" },
              { num: "06.", label: "Testimoni Pasangan", target: "testimoni" },
              { num: "07.", label: "Hubungi Kami",       target: "kontak-section" },
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

      {mounted &&
        createPortal(
          <>
            {/*
              ─── PAGE TRANSITION OVERLAY ───
              Full-screen solid overlay. Starts hidden (display:none).
              On nav click: fades in to opacity 1 (covers screen),
              scroll fires while covered, then fades out (reveals new section).
            */}
            <div
              ref={overlayRef}
              aria-hidden="true"
              style={{
                position: "fixed",
                inset: 0,
                zIndex: 9000,
                display: "none",
                pointerEvents: "none",
                opacity: 0,
                background: "#2A281F",
              }}
            />

            {/* Menu drawer sits above overlay */}
            {menuDrawer}
          </>,
          document.body
        )}
    </>
  );
}
