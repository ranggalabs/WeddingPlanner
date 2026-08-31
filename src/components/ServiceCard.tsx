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
      className={`group bg-white rounded-2xl sm:rounded-3xl p-4 sm:p-5 lg:p-6 border border-[#EDEAE3] shadow-md flex flex-col justify-between transition-all duration-500 w-full hover:shadow-xl ${className}`}
    >
      {/* Top Section: Photo */}
      <div className="w-full h-36 sm:h-44 md:h-48 relative rounded-xl sm:rounded-2xl overflow-hidden bg-[#EDEAE3] mb-3 sm:mb-4 shadow-sm">
        {/* Floating Editorial Badge on Photo */}
        <span className="absolute top-2.5 left-2.5 sm:top-3 sm:left-3 z-10 px-2.5 py-0.5 rounded-full bg-[#2A281F]/75 backdrop-blur-md text-white text-[9px] sm:text-[10px] uppercase tracking-widest font-semibold border border-white/20 shadow-md pointer-events-none">
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
          <h3 className="font-libre-caslon text-lg sm:text-xl md:text-2xl font-normal text-[#2A281F] mb-1.5 sm:mb-2 leading-tight transition-transform duration-500 ease-out group-hover:-translate-y-1">
            {service.title}
          </h3>

          <p className="text-xs sm:text-sm text-[#8A8477] font-light leading-relaxed mb-3 sm:mb-4 line-clamp-2">
            {service.description}
          </p>

          <div className="border-t border-[#EDEAE3] pt-2 mb-4">
            <p className="text-[10px] sm:text-[11px] uppercase tracking-wider font-semibold text-[#2A281F] mb-1.5">
              Cakupan Pelayanan:
            </p>
            <ul className="space-y-1">
              {service.features.map((feature, i) => (
                <li key={i} className="text-[11px] sm:text-xs text-[#2A281F] flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#2A281F] shrink-0" />
                  <span className="truncate">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Link
          href="/#kontak-section"
          className="inline-flex items-center justify-center space-x-2 text-[11px] sm:text-xs uppercase tracking-widest font-semibold text-[#2A281F] border border-[#2A281F] px-4 py-2 sm:py-2.5 rounded-full hover:bg-[#2A281F] hover:text-white transition-all duration-300 cursor-pointer w-full shadow-sm"
        >
          <span>Diskusi Perencanaan</span>
          <ArrowRight size={13} className="group-hover:translate-x-1.5 transition-transform duration-300" />
        </Link>
      </div>
    </div>
  );
}
