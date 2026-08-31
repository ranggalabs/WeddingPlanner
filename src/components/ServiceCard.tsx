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
      className={`group bg-white rounded-[24px] sm:rounded-[32px] md:rounded-[36px] p-4 sm:p-6 lg:p-7 border border-[#EDEAE3] shadow-xl flex flex-col lg:flex-row gap-5 sm:gap-6 lg:gap-8 items-stretch transition-all duration-500 w-full max-w-5xl mx-auto hover:shadow-[0_30px_70px_rgba(42,40,31,0.12)] ${className}`}
    >
      {/* Left Column (50% width): Editorial Text Content with Hover Shift */}
      <div className="w-full lg:w-1/2 flex flex-col justify-between order-2 lg:order-1 py-1">
        <div>
          <span className="text-[10px] sm:text-xs uppercase tracking-[0.25em] text-[#8A8477] font-semibold block mb-1 sm:mb-1.5">
            {service.tag}
          </span>

          {/* Title shifts subtly upward on card hover */}
          <h3 className="font-libre-caslon text-xl sm:text-2xl md:text-3xl font-normal text-[#2A281F] mb-2 sm:mb-2.5 leading-tight transition-transform duration-500 ease-out group-hover:-translate-y-1">
            {service.title}
          </h3>

          <p className="text-xs sm:text-sm text-[#8A8477] font-light leading-relaxed mb-3 sm:mb-4 max-w-xl">
            {service.description}
          </p>

          <div className="border-t border-[#EDEAE3] pt-2.5 sm:pt-3 mb-4 sm:mb-5">
            <p className="text-[10px] sm:text-xs uppercase tracking-wider font-semibold text-[#2A281F] mb-1.5 sm:mb-2">
              Cakupan Pelayanan:
            </p>
            <ul className="space-y-1 sm:space-y-1.5">
              {service.features.map((feature, i) => (
                <li key={i} className="text-[11px] sm:text-xs text-[#2A281F] flex items-center space-x-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#2A281F] shrink-0" />
                  <span className="font-normal">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Link
          href="/#kontak-section"
          className="inline-flex items-center space-x-2 text-[11px] sm:text-xs uppercase tracking-widest font-semibold text-[#2A281F] border border-[#2A281F] px-5 sm:px-6 py-2.5 rounded-full hover:bg-[#2A281F] hover:text-white transition-all duration-300 cursor-pointer w-fit shadow-sm"
        >
          <span>Diskusi Perencanaan</span>
          <ArrowRight size={13} className="group-hover:translate-x-1.5 transition-transform duration-300" />
        </Link>
      </div>

      {/* Right Column (50% width): Photo Container with Scale(1.12) Hover Zoom */}
      <div className="w-full lg:w-1/2 aspect-[4/3] lg:aspect-[3/4] min-h-[200px] sm:min-h-[240px] md:min-h-[280px] lg:min-h-[300px] relative rounded-xl sm:rounded-2xl overflow-hidden bg-[#EDEAE3] order-1 lg:order-2 shadow-md">
        {/* Floating Editorial Badge on Photo */}
        <span className="absolute top-3 left-3 sm:top-3.5 sm:left-3.5 z-10 px-2.5 py-0.5 sm:px-3 sm:py-0.5 rounded-full bg-[#2A281F]/75 backdrop-blur-md text-white text-[9px] sm:text-[10px] uppercase tracking-widest font-semibold border border-white/20 shadow-md pointer-events-none">
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
    </div>
  );
}
