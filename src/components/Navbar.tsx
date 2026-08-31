"use client";

import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { scrollToTarget } from "@/lib/scrollTo";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);
  const overlayEl = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setMounted(true);

    // Create the fullscreen overlay directly in document.body
    // Completely outside React so re-renders never touch it
    const el = document.createElement("div");
    el.id = "bw-transition-overlay";
    el.setAttribute("aria-hidden", "true");
    // Start hidden
    el.style.position = "fixed";
    el.style.top = "0";
    el.style.left = "0";
    el.style.right = "0";
    el.style.bottom = "0";
    el.style.width = "100vw";
    el.style.height = "100vh";
    el.style.zIndex = "999999"; // highest possible
    el.style.backgroundColor = "#2A281F";
    el.style.display = "none";
    el.style.opacity = "1";
    el.style.pointerEvents = "none";
    document.body.appendChild(el);
    overlayEl.current = el;

    return () => {
      if (document.body.contains(el)) document.body.removeChild(el);
      overlayEl.current = null;
    };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setIsOpen(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  function runTransition(target: string | number) {
    const el = overlayEl.current;
    const cleanId =
      typeof target === "string" ? target.replace(/^(\/)?#/, "") : null;

    if (!el) {
      // No overlay — just scroll directly
      scrollToTarget(target);
      triggerImageReveal(cleanId);
      return;
    }

    // ── PHASE 1: SNAP overlay to fully visible (NO animation, instant) ───────
    el.style.transition = "none";
    el.style.opacity = "1";
    el.style.display = "block";
    el.style.pointerEvents = "all";

    // ── PHASE 2: Wait 1 frame for paint, then scroll ─────────────────────────
    requestAnimationFrame(() => {
      // Scroll to target section (overlay is covering everything)
      scrollToTarget(target);

      // ── PHASE 3: After 300ms → fade overlay OUT revealing new section ────────
      setTimeout(() => {
        el.style.transition = "opacity 0.65s cubic-bezier(0.22, 0.61, 0.36, 1)";
        el.style.opacity = "0";

        // ── PHASE 4: After fade-out → hide overlay + trigger image reveals ─────
        setTimeout(() => {
          el.style.display = "none";
          el.style.transition = "none";
          el.style.pointerEvents = "none";
          triggerImageReveal(cleanId);
        }, 700);
      }, 300);
    });
  }

  function triggerImageReveal(cleanId: string | null) {
    if (!cleanId) return;
    const section = document.getElementById(cleanId);
    if (!section) return;

    const containers = Array.from(
      section.querySelectorAll<HTMLElement>(".mask-reveal-container")
    );
    containers.forEach((c) =>
      c.classList.remove("revealed", "reveal-delay-1", "reveal-delay-2", "reveal-delay-3")
    );
    void section.offsetWidth;
    containers.forEach((c, i) => {
      setTimeout(() => c.classList.add("revealed"), i * 150);
    });
  }

  const handleNav = (
    e: React.MouseEvent<HTMLAnchorElement>,
    target: string | number
  ) => {
    e.preventDefault();
    // Close menu immediately
    setIsOpen(false);
    // Run transition (overlay is z-999999, React re-renders don't affect it)
    runTransition(target);
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

      {mounted && menuDrawer
        ? createPortal(menuDrawer, document.body)
        : null}
    </>
  );
}
