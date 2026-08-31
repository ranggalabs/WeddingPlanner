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
      className={`group bg-white rounded-[28px] sm:rounded-[36px] md:rounded-[44px] p-6 sm:p-8 lg:p-10 xl:p-12 border border-[#EDEAE3] shadow-2xl flex flex-col lg:flex-row gap-6 sm:gap-8 lg:gap-10 xl:gap-12 items-stretch transition-all duration-500 w-full max-w-6xl mx-auto hover:shadow-[0_30px_70px_rgba(42,40,31,0.12)] ${className}`}
    >
      {/* Left Column (50% width): Editorial Text Content with Hover Shift */}
      <div className="w-full lg:w-1/2 flex flex-col justify-between order-2 lg:order-1 py-1 sm:py-2">
        <div>
          <span className="text-[11px] sm:text-xs uppercase tracking-[0.25em] text-[#8A8477] font-semibold block mb-2 sm:mb-2.5">
            {service.tag}
          </span>

          {/* Title shifts subtly upward on card hover */}
          <h3 className="font-libre-caslon text-2xl sm:text-3xl md:text-4xl lg:text-[38px] font-normal text-[#2A281F] mb-3 sm:mb-4 leading-tight transition-transform duration-500 ease-out group-hover:-translate-y-1.5">
            {service.title}
          </h3>

          <p className="text-xs sm:text-sm md:text-base text-[#8A8477] font-light leading-relaxed mb-4 sm:mb-6 max-w-xl">
            {service.description}
          </p>

          <div className="border-t border-[#EDEAE3] pt-4 mb-6 sm:mb-8">
            <p className="text-[11px] sm:text-xs uppercase tracking-wider font-semibold text-[#2A281F] mb-2.5 sm:mb-3">
              Cakupan Pelayanan:
            </p>
            <ul className="space-y-2 sm:space-y-2.5">
              {service.features.map((feature, i) => (
                <li key={i} className="text-xs sm:text-sm text-[#2A281F] flex items-center space-x-2.5 sm:space-x-3">
                  <span className="w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full bg-[#2A281F] shrink-0" />
                  <span className="font-normal">{feature}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Link
          href="/#kontak-section"
          className="inline-flex items-center space-x-2.5 sm:space-x-3 text-xs sm:text-sm uppercase tracking-widest font-semibold text-[#2A281F] border border-[#2A281F] px-6 sm:px-8 py-3 sm:py-3.5 rounded-full hover:bg-[#2A281F] hover:text-white transition-all duration-300 cursor-pointer w-fit shadow-sm"
        >
          <span>Diskusi Perencanaan</span>
          <ArrowRight size={14} className="group-hover:translate-x-1.5 transition-transform duration-300" />
        </Link>
      </div>

      {/* Right Column (50% width): 3:4 Portrait (768x1024) Photo Container with Scale(1.12) Hover Zoom */}
      <div className="w-full lg:w-1/2 aspect-[3/4] min-h-[280px] sm:min-h-[340px] md:min-h-[400px] lg:min-h-[440px] relative rounded-2xl sm:rounded-3xl overflow-hidden bg-[#EDEAE3] order-1 lg:order-2 shadow-xl">
        {/* Floating Editorial Badge on Photo */}
        <span className="absolute top-3.5 left-3.5 sm:top-4 sm:left-4 z-10 px-3 py-0.5 sm:px-3.5 sm:py-1 rounded-full bg-[#2A281F]/75 backdrop-blur-md text-white text-[10px] sm:text-xs uppercase tracking-widest font-semibold border border-white/20 shadow-md pointer-events-none">
          {service.tag}
        </span>

        {/* Background Image: smooth scale(1.12) zoom on card hover */}
        <img
          src={service.imageSrc}
          alt={service.imageAlt}
          width={768}
          height={1024}
          className="w-full h-full object-cover object-center rounded-2xl sm:rounded-3xl transition-transform duration-700 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:scale-[1.12]"
          loading="lazy"
        />
      </div>
    </div>
  );
}
