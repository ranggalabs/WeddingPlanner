"use client";

import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export interface ServiceItem {
  id: string;
  tag: string;
  title: string;
  description: string;
  features: string[];
  imageSrc: string;
  imageAlt: string;
}

interface ServiceCardProps {
  service: ServiceItem;
  className?: string;
  style?: React.CSSProperties;
}

export default function ServiceCard({ service, className = "", style }: ServiceCardProps) {
  return (
    <div
      style={style}
      className={`group bg-white rounded-3xl p-4 sm:p-5 lg:p-6 xl:p-6.5 border border-[#EDEAE3] shadow-lg flex flex-col justify-between transition-all duration-500 w-full hover:shadow-2xl hover:border-[#2A281F]/20 ${className}`}
    >
      {/* Top Section: Photo with Mask Reveal */}
      <div className="mask-reveal-container w-full h-40 sm:h-48 md:h-52 lg:h-56 xl:h-64 relative rounded-2xl overflow-hidden bg-[#EDEAE3] mb-3.5 sm:mb-4 lg:mb-5 shadow-md">
        {/* Floating Editorial Badge on Photo */}
        <div className="absolute top-3 left-3 sm:top-3.5 sm:left-3.5 z-10 flex items-center space-x-2">
          <span className="px-3 py-1 rounded-full bg-[#2A281F]/80 backdrop-blur-md text-white text-[9px] sm:text-[10px] lg:text-xs uppercase tracking-[0.2em] font-medium border border-white/20 shadow-md pointer-events-none">
            {service.tag}
          </span>
        </div>

        {/* Background Image */}
        <img
          src={service.imageSrc}
          alt={service.imageAlt}
          width={768}
          height={1024}
          className="mask-reveal-img w-full h-full object-cover object-center rounded-2xl transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-105"
          loading="lazy"
        />
      </div>

      {/* Bottom Section: Text Content & Features */}
      <div className="flex flex-col justify-between flex-1">
        <div>
          <h3 className="font-libre-caslon text-lg sm:text-xl lg:text-2xl font-normal text-[#2A281F] mb-1.5 sm:mb-2 leading-tight transition-transform duration-300 group-hover:text-[#1a1914]">
            {service.title}
          </h3>

          <p className="text-xs sm:text-sm text-[#8A8477] font-light leading-relaxed mb-3 sm:mb-4">
            {service.description}
          </p>

          <div className="border-t border-[#EDEAE3] pt-2.5 sm:pt-3 mb-4 sm:mb-5">
            <p className="text-[10px] sm:text-[11px] uppercase tracking-[0.18em] font-semibold text-[#2A281F] mb-2">
              Cakupan Pelayanan:
            </p>
            <ul className="grid grid-cols-1 gap-1.5 sm:gap-2">
              {service.features.map((feature, i) => (
                <li key={i} className="text-xs sm:text-sm text-[#2A281F]/90 flex items-start space-x-2">
                  <CheckCircle2 size={14} className="text-[#8A8477] group-hover:text-[#2A281F] shrink-0 mt-0.5 transition-colors duration-300" />
                  <span className="leading-snug">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Link
          href="/#kontak-section"
          className="inline-flex items-center justify-center space-x-2 text-xs sm:text-sm uppercase tracking-[0.18em] font-semibold text-[#2A281F] border border-[#2A281F] px-4 py-2.5 sm:py-3 rounded-full hover:bg-[#2A281F] hover:text-white transition-all duration-300 cursor-pointer w-full shadow-sm group/btn"
        >
          <span>Diskusi Perencanaan</span>
          <ArrowRight size={14} className="group-hover/btn:translate-x-1.5 transition-transform duration-300" />
        </Link>
      </div>
    </div>
  );
}
