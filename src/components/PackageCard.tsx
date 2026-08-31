"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
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
      className={`rounded-2xl sm:rounded-3xl p-3.5 sm:p-4 lg:p-4.5 flex flex-col justify-between transition-all duration-300 relative group ${
        isDark
          ? "bg-[#2A281F] text-white shadow-xl ring-1 ring-white/10"
          : "bg-white text-[#2A281F] border border-[#EDEAE3] shadow-md"
      } ${className}`}
    >
      <div>
        {/* Header Photo Container with Inner Parallax */}
        <div className="w-full h-24 sm:h-28 lg:h-32 rounded-xl overflow-hidden relative mb-2.5 sm:mb-3 bg-[#EDEAE3]">
          {/* Status Badge */}
          {isDark ? (
            <span className="absolute top-2 right-2 z-10 bg-white text-[#2A281F] text-[8px] sm:text-[9px] uppercase tracking-widest font-semibold px-2 py-0.5 rounded-full shadow-md">
              Paling Populer
            </span>
          ) : (
            <span className="absolute top-2 right-2 z-10 bg-[#2A281F]/75 backdrop-blur-md text-white text-[8px] sm:text-[9px] uppercase tracking-widest font-medium px-2 py-0.5 rounded-full border border-white/10 shadow-sm">
              Eksklusif
            </span>
          )}

          <img
            ref={imgRef}
            src={pkg.imageSrc}
            alt={pkg.imageAlt}
            className="w-full h-[125%] -top-[12.5%] relative object-cover rounded-xl group-hover:scale-105 transition-transform duration-700 ease-out"
            loading="lazy"
          />
        </div>

        {/* Card Body */}
        <div className="mb-2">
          <p
            className={`text-[8px] sm:text-[9px] uppercase tracking-[0.2em] font-medium mb-0.5 ${
              isDark ? "text-white/70" : "text-[#8A8477]"
            }`}
          >
            {pkg.tagline}
          </p>

          <h3
            className={`font-libre-caslon text-sm sm:text-base lg:text-lg font-normal leading-tight mb-0.5 ${
              isDark ? "text-white" : "text-[#2A281F]"
            }`}
          >
            {pkg.name}
          </h3>

          <div className="mb-1.5">
            <span
              className={`font-libre-caslon text-sm sm:text-base lg:text-lg font-normal ${
                isDark ? "text-white" : "text-[#2A281F]"
              }`}
            >
              {pkg.price}
            </span>
          </div>

          <p
            className={`text-[11px] sm:text-xs font-light leading-relaxed mb-2 line-clamp-2 ${
              isDark ? "text-white/80" : "text-[#8A8477]"
            }`}
          >
            {pkg.description}
          </p>
        </div>

        {/* Features Checklist */}
        <div className="border-t pt-2 mb-3 border-current/10">
          <p
            className={`text-[9px] sm:text-[10px] uppercase tracking-wider font-semibold mb-1 ${
              isDark ? "text-white/90" : "text-[#2A281F]"
            }`}
          >
            Termasuk dalam paket:
          </p>
          <ul className="space-y-0.5 sm:space-y-1">
            {pkg.features.map((feature, i) => (
              <li
                key={i}
                className={`text-[10px] sm:text-[11px] flex items-center space-x-1.5 ${
                  isDark ? "text-white/90" : "text-[#2A281F]"
                }`}
              >
                <Check
                  size={11}
                  className={`${isDark ? "text-white" : "text-[#2A281F]"} shrink-0`}
                />
                <span className="truncate">{feature}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Full-width Action CTA Button */}
      <Link
        href={`/#kontak-section?package=${encodeURIComponent(pkg.name)}`}
        className={`w-full py-2 px-3.5 rounded-full text-[10px] sm:text-[11px] uppercase tracking-widest font-semibold flex items-center justify-center space-x-1.5 transition-all duration-300 cursor-pointer shadow-sm ${
          isDark
            ? "bg-white text-[#2A281F] hover:bg-white/90"
            : "bg-transparent text-[#2A281F] border border-[#2A281F] hover:bg-[#2A281F] hover:text-white"
        }`}
      >
        <span>Pilih Paket Ini</span>
        <ArrowRight size={12} className="group-hover:translate-x-1 transition-transform" />
      </Link>
    </div>
  );
}
