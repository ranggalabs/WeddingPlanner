"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";

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
      className={`group bg-white rounded-2xl sm:rounded-3xl p-3.5 sm:p-4 md:p-5 border border-[#EDEAE3] shadow-md flex flex-col justify-between transition-all duration-500 w-full hover:shadow-xl ${className}`}
    >
      {/* Top Section: Photo */}
      <div className="w-full h-28 sm:h-32 md:h-36 relative rounded-xl sm:rounded-2xl overflow-hidden bg-[#EDEAE3] mb-2.5 sm:mb-3 shadow-sm">
        {/* Floating Editorial Badge on Photo */}
        <span className="absolute top-2 left-2 sm:top-2.5 sm:left-2.5 z-10 px-2.5 py-0.5 rounded-full bg-[#2A281F]/75 backdrop-blur-md text-white text-[8px] sm:text-[9px] uppercase tracking-widest font-semibold border border-white/20 shadow-md pointer-events-none">
          {service.tag}
        </span>

        {/* Background Image: smooth scale(1.12) zoom on card hover */}
        <img
          src={service.imageSrc}
          alt={service.imageAlt}
          width={768}
          height={1024}
          className="w-full h-full object-cover object-center rounded-xl sm:rounded-2xl transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.12]"
          loading="lazy"
        />
      </div>

      {/* Bottom Section: Text Content */}
      <div className="flex flex-col justify-between flex-1">
        <div>
          <h3 className="font-libre-caslon text-base sm:text-lg md:text-xl font-normal text-[#2A281F] mb-1 sm:mb-1.5 leading-tight transition-transform duration-500 ease-out group-hover:-translate-y-1">
            {service.title}
          </h3>

          <p className="text-[11px] sm:text-xs text-[#8A8477] font-light leading-relaxed mb-2 sm:mb-3 line-clamp-2">
            {service.description}
          </p>

          <div className="border-t border-[#EDEAE3] pt-2 mb-3">
            <p className="text-[9px] sm:text-[10px] uppercase tracking-wider font-semibold text-[#2A281F] mb-1">
              Cakupan Pelayanan:
            </p>
            <ul className="space-y-0.5 sm:space-y-1">
              {service.features.map((feature, i) => (
                <li key={i} className="text-[10px] sm:text-[11px] text-[#2A281F] flex items-center space-x-1.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#2A281F] shrink-0" />
                  <span className="truncate">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Link
          href="/#kontak-section"
          className="inline-flex items-center justify-center space-x-1.5 text-[10px] sm:text-[11px] uppercase tracking-widest font-semibold text-[#2A281F] border border-[#2A281F] px-3.5 py-2 rounded-full hover:bg-[#2A281F] hover:text-white transition-all duration-300 cursor-pointer w-full shadow-sm"
        >
          <span>Diskusi Perencanaan</span>
          <ArrowRight size={12} className="group-hover:translate-x-1.5 transition-transform duration-300" />
        </Link>
      </div>
    </div>
  );
}
