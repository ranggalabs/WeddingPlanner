"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight } from "lucide-react";
import Link from "next/link";

export interface PhotoItem {
  id: string;
  src: string;
  alt: string;
  location?: string;
  category?: string;
  capacity?: string;
}

interface PhotoGridProps {
  photos: PhotoItem[];
  enableParallax?: boolean;
}

export default function PhotoGrid({ photos, enableParallax = true }: PhotoGridProps) {
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (!gridRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          }
        });
      },
      { threshold: 0.15 }
    );

    const items = gridRef.current.querySelectorAll<HTMLElement>(".venue-card-item");
    items.forEach((item) => observer.observe(item));

    if (enableParallax) {
      const ctx = gsap.context(() => {
        items.forEach((card) => {
          const img = card.querySelector(".inner-parallax-image");
          if (!img) return;

          gsap.fromTo(
            img,
            { yPercent: 12 },
            {
              yPercent: -15,
              ease: "none",
              scrollTrigger: {
                trigger: card,
                start: "top bottom",
                end: "bottom top",
                scrub: 0.6,
              },
            }
          );
        });
      }, gridRef);

      return () => {
        observer.disconnect();
        ctx.revert();
      };
    }

    return () => observer.disconnect();
  }, [enableParallax]);

  return (
    <div
      ref={gridRef}
      className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-6 xl:gap-8 w-full"
    >
      {photos.map((photo, index) => (
        <Link
          key={photo.id}
          href="/#kontak-section"
          className="venue-card-item reveal-item aspect-[3/4] min-h-[260px] sm:min-h-[300px] md:min-h-[340px] lg:min-h-[360px] rounded-3xl bg-[#EDEAE3] relative group cursor-pointer overflow-hidden shadow-xl border border-[#EDEAE3] transition-all duration-500 block hover:-translate-y-2 hover:shadow-[0_30px_60px_-15px_rgba(42,40,31,0.25)]"
          style={{ transitionDelay: `${index * 80}ms` }}
        >
          {/* Inner Parallax Image & Mask Reveal Container */}
          <div className="mask-reveal-container absolute inset-0 overflow-hidden w-full h-full">
            <img
              src={photo.src}
              alt={photo.alt}
              className="mask-reveal-img inner-parallax-image w-full h-[130%] -top-[15%] relative object-cover object-center group-hover:scale-105 transition-transform duration-700 ease-out"
              loading="lazy"
            />
          </div>

          {/* Photo-First Bottom Gradient Scrim Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent rounded-3xl p-5 sm:p-6 flex flex-col justify-between text-white z-10">
            {/* Top Right Floating Arrow Indicator */}
            <div className="flex justify-end">
              <span className="w-8 h-8 rounded-full bg-white/15 backdrop-blur-md flex items-center justify-center text-white border border-white/20 group-hover:bg-white group-hover:text-[#2A281F] transition-colors duration-300 shadow-sm">
                <ArrowUpRight size={14} />
              </span>
            </div>

            {/* Bottom Venue Information with Hover Elevation */}
            <div className="space-y-1 group-hover:-translate-y-1 transition-transform duration-300 ease-out">
              {photo.location && (
                <span className="text-[10px] uppercase tracking-[0.2em] text-white/80 font-medium block mb-1">
                  {photo.location}
                </span>
              )}
              <h4 className="font-libre-caslon text-lg sm:text-xl font-normal text-white leading-tight drop-shadow-sm">
                {photo.alt}
              </h4>
              {photo.capacity && (
                <p className="text-xs text-white/70 font-light pt-0.5">
                  {photo.capacity}
                </p>
              )}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
