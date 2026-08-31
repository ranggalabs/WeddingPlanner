"use client";

import { ArrowRight } from "lucide-react";
import { scrollToTarget } from "@/lib/scrollTo";

export default function PriceTeaserStrip() {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    scrollToTarget("paket");
  };

  return (
    <div className="w-full relative z-30 bg-[#2A281F]/95 backdrop-blur-md text-white py-3.5 sm:py-4 px-6 border-t border-white/10 shadow-[0_-12px_35px_rgba(0,0,0,0.3)]">
      <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-3 text-center sm:text-left">
        {/* Left Side: Live Badge + Price Teaser Text */}
        <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2.5 sm:gap-3">
          <span className="inline-flex items-center space-x-1.5 px-2.5 py-0.5 rounded-full bg-white/10 text-[10px] uppercase tracking-widest font-medium text-white/90 border border-white/10">
            <span className="w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
            <span>Investasi 2025/2026</span>
          </span>

          <p className="text-xs sm:text-[13px] tracking-wide text-white/90 font-light">
            Paket Kurasi Full Destination Wedding di Bali mulai dari{" "}
            <span className="font-semibold text-white font-libre-caslon text-sm sm:text-base tracking-normal">
              Rp 75.000.000
            </span>
          </p>
        </div>

        {/* Right Side: Interactive Editorial Action Link */}
        <a
          href="/#paket"
          onClick={handleClick}
          className="inline-flex items-center space-x-2 text-xs uppercase tracking-wider font-semibold text-white px-4 py-1.5 rounded-full bg-white/10 hover:bg-white hover:text-[#2A281F] transition-all duration-300 group cursor-pointer border border-white/15 shadow-sm shrink-0"
        >
          <span>Lihat Paket Layanan</span>
          <ArrowRight size={13} className="group-hover:translate-x-1 transition-transform" />
        </a>
      </div>
    </div>
  );
}
