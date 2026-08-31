"use client";

import { ArrowUpRight } from "lucide-react";
import ParallaxLayer from "@/components/ParallaxLayer";
import { scrollToTarget } from "@/lib/scrollTo";

export default function Footer() {
  const handleNav = (e: React.MouseEvent<HTMLAnchorElement>, target: string | number) => {
    e.preventDefault();
    scrollToTarget(target);
  };

  return (
    <footer className="fixed bottom-0 left-0 right-0 z-0 bg-[#2A281F] text-white pt-16 pb-12 px-6 min-h-[380px] flex flex-col justify-between overflow-hidden">
      {/* Deep Background Monogram Watermark */}
      <ParallaxLayer depth="deep" yDistance={40} className="absolute -bottom-8 right-0 pointer-events-none select-none opacity-[0.03] z-0 whitespace-nowrap">
        <span className="font-libre-caslon text-[140px] md:text-[220px] leading-none text-white font-normal">
          BALI WED
        </span>
      </ParallaxLayer>

      <div className="relative z-10 max-w-6xl mx-auto w-full grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-white/10 mt-4">
        {/* Brand Column */}
        <div className="md:col-span-5 space-y-3">
          <a
            href="/"
            onClick={(e) => handleNav(e, 0)}
            className="font-libre-caslon text-2xl tracking-tight text-white block cursor-pointer"
          >
            BALI WED
          </a>
          <p className="text-xs text-white/70 font-light max-w-sm leading-relaxed">
            Luxury destination wedding organizer di Bali. Kami memadukan keindahan alam Bali, arsitektur tropis, dan estetika modern editorial untuk merayakan cinta Anda.
          </p>
          <div className="pt-1 text-xs text-white/50">
            Seminyak, Kuta Utara, Badung, Bali 80361
          </div>
        </div>

        {/* Navigation Links (Chronological Order) */}
        <div className="md:col-span-3 space-y-2.5">
          <p className="text-[11px] uppercase tracking-widest text-white/50 font-semibold mb-3">
            Navigasi Halaman
          </p>
          <ul className="space-y-2 text-xs text-white/80">
            <li>
              <a
                href="/#intro-section"
                onClick={(e) => handleNav(e, "intro-section")}
                className="hover:text-white transition-colors cursor-pointer"
              >
                02. Kenapa Bali
              </a>
            </li>
            <li>
              <a
                href="/#layanan"
                onClick={(e) => handleNav(e, "layanan")}
                className="hover:text-white transition-colors cursor-pointer"
              >
                03. Layanan Utama
              </a>
            </li>
            <li>
              <a
                href="/#paket"
                onClick={(e) => handleNav(e, "paket")}
                className="hover:text-white transition-colors cursor-pointer"
              >
                04. Paket Layanan
              </a>
            </li>
            <li>
              <a
                href="/#venue"
                onClick={(e) => handleNav(e, "venue")}
                className="hover:text-white transition-colors cursor-pointer"
              >
                05. Venue Pilihan
              </a>
            </li>
            <li>
              <a
                href="/#testimoni"
                onClick={(e) => handleNav(e, "testimoni")}
                className="hover:text-white transition-colors cursor-pointer"
              >
                06. Testimoni Pasangan
              </a>
            </li>
            <li>
              <a
                href="/#kontak-section"
                onClick={(e) => handleNav(e, "kontak-section")}
                className="hover:text-white transition-colors cursor-pointer"
              >
                07. Hubungi Kami
              </a>
            </li>
          </ul>
        </div>

        {/* Direct Concierge & Social */}
        <div className="md:col-span-4 space-y-3">
          <p className="text-[11px] uppercase tracking-widest text-white/50 font-semibold mb-3">
            Hubungi Concierge
          </p>
          <p className="text-xs text-white/80 font-light">
            Informasi ketersediaan tanggal & jadwal konsultasi tatap muka / video call.
          </p>

          <div className="space-y-2 pt-1">
            <a
              href="mailto:concierge@baliwed.com"
              className="text-xs text-white font-medium flex items-center space-x-1 hover:underline"
            >
              <span>concierge@baliwed.com</span>
              <ArrowUpRight size={13} />
            </a>
            <a
              href="https://wa.me/6281234567890"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-white font-medium flex items-center space-x-1 hover:underline"
            >
              <span>+62 812 3456 7890 (WhatsApp)</span>
              <ArrowUpRight size={13} />
            </a>
          </div>

          <div className="pt-3 flex items-center space-x-4 text-xs text-white/60">
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-white">
              Instagram
            </a>
            <span>•</span>
            <a href="https://pinterest.com" target="_blank" rel="noopener noreferrer" className="hover:text-white">
              Pinterest
            </a>
            <span>•</span>
            <a href="https://vimeo.com" target="_blank" rel="noopener noreferrer" className="hover:text-white">
              Vimeo
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="relative z-10 max-w-6xl mx-auto w-full pt-6 flex flex-col sm:flex-row items-center justify-between text-[11px] text-white/40 space-y-2 sm:space-y-0">
        <p>© {new Date().getFullYear()} Bali Wed. Single Source of Truth Editorial Design.</p>
        <p className="tracking-widest uppercase">Bali • Indonesia</p>
      </div>
    </footer>
  );
}
