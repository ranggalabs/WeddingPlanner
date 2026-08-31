"use client";

import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { scrollToTarget } from "@/lib/scrollTo";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Overlay lives ENTIRELY outside React — appended directly to document.body
  // so React state updates / re-renders can NEVER reset its styles.
  const overlayEl = useRef<HTMLDivElement | null>(null);
  const isAnimating = useRef(false);

  useEffect(() => {
    setMounted(true);

    // Create overlay element imperatively, attach to body
    const el = document.createElement("div");
    el.setAttribute("aria-hidden", "true");
    el.id = "bw-page-transition";
    el.style.cssText = [
      "position:fixed",
      "inset:0",
      "z-index:9000",
      "display:none",
      "opacity:0",
      "background:#2A281F",
      "pointer-events:none",
    ].join(";");
    document.body.appendChild(el);
    overlayEl.current = el;

    return () => {
      if (document.body.contains(el)) document.body.removeChild(el);
      overlayEl.current = null;
    };
  }, []);

  useEffect(() => {
    const onScroll = () => { if (isOpen) setIsOpen(false); };
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setIsOpen(false); };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("keydown", onKey);
    };
  }, [isOpen]);

  /**
   * PAGE TRANSITION — full-screen overlay fade:
   *
   * 1. overlay fades IN (opacity 0→1, 400ms)  → screen covered
   * 2. scrollToTarget fires (hidden behind overlay)
   * 3. overlay fades OUT (opacity 1→0, 500ms) → new section revealed
   * 4. staggered per-image clip-path wipe on target section
   */
  function runTransition(target: string | number) {
    if (isAnimating.current) {
      scrollToTarget(target);
      return;
    }

    const el = overlayEl.current;
    if (!el) {
      scrollToTarget(target);
      return;
    }

    isAnimating.current = true;
    const cleanId =
      typeof target === "string" ? target.replace(/^(\/)?#/, "") : null;

    // ── Step 1: Make overlay visible and start fade IN ──────────────────────
    el.style.display = "block";
    el.style.opacity = "0";
    el.style.transition = "none";
    el.style.pointerEvents = "all";

    // Force browser to paint display:block BEFORE we add the transition
    void el.offsetHeight;

    el.style.transition = "opacity 0.4s ease-in";
    el.style.opacity = "1";

    // ── Step 2: After fade-in completes → scroll ─────────────────────────────
    setTimeout(() => {
      scrollToTarget(target);

      // ── Step 3: Fade OUT to reveal new section ───────────────────────────
      setTimeout(() => {
        el.style.transition = "opacity 0.5s ease-out";
        el.style.opacity = "0";

        // ── Step 4: Hide overlay + trigger per-image reveal ──────────────────
        setTimeout(() => {
          el.style.display = "none";
          el.style.pointerEvents = "none";
          isAnimating.current = false;

          if (!cleanId) return;
          const section = document.getElementById(cleanId);
          if (!section) return;

          const containers = Array.from(
            section.querySelectorAll<HTMLElement>(".mask-reveal-container")
          );
          // Reset first, then stagger reveal
          containers.forEach((c) =>
            c.classList.remove("revealed", "reveal-delay-1", "reveal-delay-2", "reveal-delay-3")
          );
          void section.offsetWidth;
          containers.forEach((c, i) => {
            setTimeout(() => c.classList.add("revealed"), i * 150);
          });
        }, 520);
      }, 80);
    }, 430);
  }

  const handleNav = (
    e: React.MouseEvent<HTMLAnchorElement>,
    target: string | number
  ) => {
    e.preventDefault();
    setIsOpen(false);       // close menu drawer
    runTransition(target);  // start overlay immediately (React re-renders can't touch overlayEl)
  };

  const menuDrawer = isOpen ? (
    <div className="fixed inset-0 z-[9500] flex bg-[#2A281F]/40 backdrop-blur-md">
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

      {/* Menu drawer portal (z-9500, above the overlay) */}
      {mounted && menuDrawer ? createPortal(menuDrawer, document.body) : null}
    </>
  );
}
