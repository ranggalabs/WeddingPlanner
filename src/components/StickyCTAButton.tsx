"use client";

import { CalendarCheck } from "lucide-react";
import { scrollToTarget } from "@/lib/scrollTo";

export default function StickyCTAButton() {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    scrollToTarget("kontak-section");
  };

  return (
    <div className="fixed bottom-5 right-5 sm:bottom-6 sm:right-6 z-50">
      <a
        href="/#kontak-section"
        onClick={handleClick}
        className="bg-[#2A281F] text-white text-[11px] sm:text-xs uppercase tracking-wider font-semibold py-2.5 px-5 rounded-full shadow-xl flex items-center space-x-2 hover:bg-[#1a1914] hover:scale-105 transition-all duration-300 border border-white/20 cursor-pointer group"
      >
        <CalendarCheck size={15} className="group-hover:rotate-12 transition-transform" />
        <span>Konsultasi Gratis</span>
      </a>
    </div>
  );
}
