"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight, CheckCircle2, Sparkles } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export interface PackageItem {
  id: string;
  name: string;
  price: string;
  tagline: string;
  description: string;
  isFeatured?: boolean;
  features: string[];
  imageSrc: string;
  imageAlt: string;
}

interface PackageCardProps {
  pkg: PackageItem;
  className?: string;
  style?: React.CSSProperties;
  layout?: "horizontal" | "vertical";
}

export default function PackageCard({
  pkg,
  className = "",
  style,
  layout = "vertical",
}: PackageCardProps) {
  const isDark = pkg.isFeatured;
  const cardRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (!cardRef.current || !imgRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        imgRef.current,
        { yPercent: 10 },
        {
          yPercent: -12,
          ease: "none",
          scrollTrigger: {
            trigger: cardRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.6,
          },
        }
      );
    }, cardRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={cardRef}
      style={style}
      className={`rounded-2xl sm:rounded-3xl p-3.5 sm:p-5 lg:p-5.5 xl:p-6 flex flex-col justify-between transition-all duration-500 relative group hover:shadow-2xl ${
        isDark
          ? "bg-[#2A281F] text-white shadow-xl ring-2 ring-[#2A281F]/20 md:-translate-y-1.5"
          : "bg-white text-[#2A281F] border border-[#EDEAE3] shadow-lg hover:border-[#2A281F]/20"
      } ${className}`}
    >
      <div>
        {/* Header Photo Container with Inner Parallax & Mask Reveal */}
        <div className="mask-reveal-container w-full h-24 sm:h-40 md:h-44 lg:h-48 xl:h-52 rounded-xl sm:rounded-2xl overflow-hidden relative mb-2.5 sm:mb-4 bg-[#EDEAE3] shadow-sm">
          {/* Status Badge */}
          {isDark ? (
            <span className="absolute top-2 right-2 sm:top-3 sm:right-3 z-10 bg-white text-[#2A281F] text-[8px] sm:text-[10px] uppercase tracking-[0.18em] font-semibold px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full shadow-md flex items-center space-x-1">
              <Sparkles size={10} className="text-[#2A281F] shrink-0" />
              <span>Paling Populer</span>
            </span>
          ) : (
            <span className="absolute top-2 right-2 sm:top-3 sm:right-3 z-10 bg-[#2A281F]/80 backdrop-blur-md text-white text-[8px] sm:text-[10px] uppercase tracking-[0.18em] font-medium px-2.5 py-0.5 sm:px-3 sm:py-1 rounded-full border border-white/10 shadow-sm">
              Eksklusif
            </span>
          )}

          <img
            ref={imgRef}
            src={pkg.imageSrc}
            alt={pkg.imageAlt}
            className="mask-reveal-img w-full h-[125%] -top-[12.5%] relative object-cover rounded-xl sm:rounded-2xl group-hover:scale-105 transition-transform duration-700 ease-out"
            loading="lazy"
          />
        </div>

        {/* Card Body */}
        <div className="mb-1.5 sm:mb-3">
          <p
            className={`text-[8px] sm:text-[10px] uppercase tracking-[0.2em] font-medium mb-0.5 sm:mb-1 ${
              isDark ? "text-white/75" : "text-[#8A8477]"
            }`}
          >
            {pkg.tagline}
          </p>

          <h3
            className={`font-libre-caslon text-base sm:text-xl lg:text-2xl font-normal leading-tight mb-1 ${
              isDark ? "text-white" : "text-[#2A281F]"
            }`}
          >
            {pkg.name}
          </h3>

          <div className="mb-1.5 sm:mb-2">
            <span
              className={`font-libre-caslon text-sm sm:text-lg lg:text-xl font-medium ${
                isDark ? "text-white" : "text-[#2A281F]"
              }`}
            >
              {pkg.price}
            </span>
          </div>

          <p
            className={`text-[11px] sm:text-[13px] font-light leading-relaxed mb-2 sm:mb-3 line-clamp-2 ${
              isDark ? "text-white/80" : "text-[#8A8477]"
            }`}
          >
            {pkg.description}
          </p>
        </div>

        {/* Features Checklist */}
        <div className="border-t pt-2 sm:pt-3 mb-2.5 sm:mb-4 border-current/10">
          <p
            className={`text-[9px] sm:text-[10px] uppercase tracking-wider font-semibold mb-1.5 sm:mb-2 ${
              isDark ? "text-white/90" : "text-[#2A281F]"
            }`}
          >
            Termasuk dalam paket:
          </p>
          <ul className="space-y-1 sm:space-y-1.5">
            {pkg.features.map((feature, i) => (
              <li
                key={i}
                className={`text-[11px] sm:text-[12.5px] flex items-start space-x-1.5 sm:space-x-2 ${
                  isDark ? "text-white/90" : "text-[#2A281F]/90"
                }`}
              >
                <CheckCircle2
                  size={13}
                  className={`${isDark ? "text-white" : "text-[#8A8477] group-hover:text-[#2A281F]"} shrink-0 mt-0.5 transition-colors`}
                />
                <span className="leading-snug truncate">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Full-width Action CTA Button */}
      <Link
        href={`/#kontak-section?package=${encodeURIComponent(pkg.name)}`}
        className={`w-full py-2 sm:py-2.5 px-3.5 sm:px-4 rounded-full text-[11px] sm:text-sm uppercase tracking-[0.16em] font-semibold flex items-center justify-center space-x-1.5 sm:space-x-2 transition-all duration-300 cursor-pointer shadow-sm group/btn ${
          isDark
            ? "bg-white text-[#2A281F] hover:bg-white/90 shadow-md"
            : "bg-transparent text-[#2A281F] border border-[#2A281F] hover:bg-[#2A281F] hover:text-white"
        }`}
      >
        <span>Pilih Paket Ini</span>
        <ArrowRight size={13} className="group-hover/btn:translate-x-1.5 transition-transform duration-300" />
      </Link>
    </div>
  );
}
