"use client";

import { useState, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import { Menu, X, ArrowUpRight } from "lucide-react";
import { scrollToTarget } from "@/lib/scrollTo";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Two-layer curtain refs (like Sarah Haywood Salient nectar-mask-reveal):
  // Layer A: the opaque "curtain" panel that sweeps from bottom → top
  // Layer B: inner content that stays visible as curtain exits
  const curtainARef = useRef<HTMLDivElement>(null);
  const curtainBRef = useRef<HTMLDivElement>(null);

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
   * NECTAR MASK REVEAL — Sarah Haywood style
   *
   * Two curtain panels animate in sequence:
   *
   * 1. Panel A (dark, solid) sweeps UP from bottom — covers full screen (500ms)
   * 2. While covered: scroll() to target section
   * 3. Panel A sweeps UP OFF the screen — revealing the new section (500ms)
   *    Meanwhile Panel B (accent color, slightly delayed) follows behind giving a
   *    "double-curtain wipe" depth effect exactly like Salient nectar-mask-reveal.
   *
   * After curtain fully exits:
   * 4. Per-image clip-path staggered reveal fires on target section images.
   */
  function triggerCurtainReveal(target: string | number) {
    const a = curtainARef.current;
    const b = curtainBRef.current;
    if (!a || !b) {
      scrollToTarget(target);
      return;
    }

    const cleanId =
      typeof target === "string" ? target.replace(/^(\/)?#/, "") : null;

    // ── RESET BOTH PANELS (instant, no transition) ──────────────────────────
    const reset = (el: HTMLDivElement) => {
      el.style.transition = "none";
      el.style.transform = "translateY(100%)"; // parked below viewport
      el.style.visibility = "visible";
    };
    reset(a);
    reset(b);
    void a.offsetWidth; // force reflow

    // ── PHASE 1: Panel A sweeps UP from bottom → full screen (500ms) ────────
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        a.style.transition = "transform 0.52s cubic-bezier(0.77, 0, 0.175, 1)";
        a.style.transform = "translateY(0%)";

        // Panel B follows 80ms behind Panel A (depth / double-curtain effect)
        setTimeout(() => {
          b.style.transition = "transform 0.52s cubic-bezier(0.77, 0, 0.175, 1)";
          b.style.transform = "translateY(0%)";
        }, 80);

        // ── PHASE 2: scroll while screen is covered ────────────────────────
        setTimeout(() => {
          scrollToTarget(target);

          // ── PHASE 3: Panel A sweeps UP off screen → reveals new section ──
          setTimeout(() => {
            a.style.transition = "transform 0.54s cubic-bezier(0.77, 0, 0.175, 1)";
            a.style.transform = "translateY(-100%)";

            // Panel B exits 70ms after A — creates trailing depth effect
            setTimeout(() => {
              b.style.transition = "transform 0.54s cubic-bezier(0.77, 0, 0.175, 1)";
              b.style.transform = "translateY(-100%)";
            }, 70);

            // ── PHASE 4: after curtains exit → trigger per-image reveal ────
            setTimeout(() => {
              // Hide and reset both panels
              a.style.visibility = "hidden";
              b.style.visibility = "hidden";
              a.style.transition = "none";
              b.style.transition = "none";
              a.style.transform = "translateY(100%)";
              b.style.transform = "translateY(100%)";

              // Staggered clip-path reveal on images in the target section
              if (cleanId) {
                const section = document.getElementById(cleanId);
                if (section) {
                  const containers = Array.from(
                    section.querySelectorAll<HTMLElement>(".mask-reveal-container")
                  );
                  // Reset reveal state
                  containers.forEach((c) =>
                    c.classList.remove("revealed", "reveal-delay-1", "reveal-delay-2", "reveal-delay-3")
                  );
                  void section.offsetWidth; // force reflow

                  // Fire staggered reveals
                  containers.forEach((c, i) => {
                    setTimeout(() => {
                      if (i === 1) c.classList.add("reveal-delay-1");
                      if (i === 2) c.classList.add("reveal-delay-2");
                      if (i >= 3) c.classList.add("reveal-delay-3");
                      c.classList.add("revealed");
                    }, i * 130);
                  });
                }
              }
            }, 600);
          }, 80);
        }, 540);
      });
    });
  }

  const handleNav = (
    e: React.MouseEvent<HTMLAnchorElement>,
    target: string | number
  ) => {
    e.preventDefault();
    setIsOpen(false);
    triggerCurtainReveal(target);
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
              { num: "01.", label: "Beranda",            target: 0 as string | number },
              { num: "02.", label: "Kenapa Bali",         target: "intro-section" },
              { num: "03.", label: "Layanan Utama",       target: "layanan" },
              { num: "04.", label: "Paket Layanan",       target: "paket" },
              { num: "05.", label: "Venue Pilihan",       target: "venue" },
              { num: "06.", label: "Testimoni Pasangan",  target: "testimoni" },
              { num: "07.", label: "Hubungi Kami",        target: "kontak-section" },
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
              ── NECTAR MASK REVEAL CURTAINS (Sarah Haywood / Salient style) ──
              Two panels that sweep from bottom → cover screen → exit to top.
              Panel A (foreground, dark charcoal)
              Panel B (background, slightly lighter — depth/trailing effect)
              Both parked off-screen below at translateY(100%) initially.
            */}

            {/* Panel A — foreground curtain */}
            <div
              ref={curtainARef}
              aria-hidden="true"
              style={{
                position: "fixed",
                inset: 0,
                zIndex: 9100,
                pointerEvents: "none",
                visibility: "hidden",
                background: "#2A281F",
                transform: "translateY(100%)",
                willChange: "transform",
              }}
            />

            {/* Panel B — trailing depth curtain */}
            <div
              ref={curtainBRef}
              aria-hidden="true"
              style={{
                position: "fixed",
                inset: 0,
                zIndex: 9050,
                pointerEvents: "none",
                visibility: "hidden",
                background: "#8A8477",
                transform: "translateY(100%)",
                willChange: "transform",
              }}
            />

            {/* Menu drawer (above curtains) */}
            {menuDrawer}
          </>,
          document.body
        )}
    </>
  );
}
