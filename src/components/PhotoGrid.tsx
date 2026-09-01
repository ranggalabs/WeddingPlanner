"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ArrowUpRight, MapPin, Users } from "lucide-react";
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
      className="flex md:grid md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 lg:gap-7 xl:gap-8 w-full overflow-x-auto md:overflow-x-visible no-scrollbar pb-2 md:pb-0 snap-x snap-mandatory"
    >
      {photos.map((photo, index) => (
        <div key={photo.id} className="min-w-[75vw] sm:min-w-[45vw] md:min-w-0 snap-center flex flex-col shrink-0 md:shrink">
          <Link
            href="/#kontak-section"
            className="venue-card-item reveal-item aspect-[4/5] sm:aspect-[3/4] min-h-[190px] sm:min-h-[280px] md:min-h-[340px] lg:min-h-[380px] xl:min-h-[420px] rounded-2xl sm:rounded-3xl bg-[#EDEAE3] relative group cursor-pointer overflow-hidden shadow-xl border border-[#EDEAE3] transition-all duration-500 block hover:-translate-y-2 hover:shadow-[0_30px_60px_-15px_rgba(42,40,31,0.3)] w-full"
            style={{ transitionDelay: `${index * 80}ms` }}
          >
          {/* Inner Parallax Image & Mask Reveal Container */}
          <div className="mask-reveal-container absolute inset-0 overflow-hidden w-full h-full">
            <img
              src={photo.src}
              alt={photo.alt}
              className="mask-reveal-img inner-parallax-image w-full h-[130%] -top-[15%] relative object-cover object-center group-hover:scale-110 transition-transform duration-700 ease-out"
              loading="lazy"
            />
          </div>

          {/* Photo-First Bottom Gradient Scrim Overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/95 via-black/45 to-transparent rounded-3xl p-4 sm:p-5 lg:p-5.5 flex flex-col justify-between text-white z-10">
            {/* Top Floating Badge & Arrow Indicator */}
            <div className="flex items-center justify-between w-full">
              <span className="px-2.5 py-0.5 rounded-full bg-white/20 backdrop-blur-md text-[9px] uppercase tracking-[0.18em] font-medium border border-white/20 shadow-sm flex items-center space-x-1">
                <MapPin size={10} className="shrink-0" />
                <span>Bali</span>
              </span>

              <span className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-white/15 backdrop-blur-md flex items-center justify-center text-white border border-white/20 group-hover:bg-white group-hover:text-[#2A281F] transition-all duration-300 shadow-md">
                <ArrowUpRight size={15} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </span>
            </div>

            {/* Bottom Venue Information with Hover Elevation */}
            <div className="space-y-1.5 group-hover:-translate-y-1.5 transition-transform duration-300 ease-out">
              {photo.location && (
                <span className="text-[9px] sm:text-[10px] uppercase tracking-[0.2em] text-white/80 font-medium block">
                  {photo.location}
                </span>
              )}
              <h4 className="font-libre-caslon text-base sm:text-lg lg:text-xl font-normal text-white leading-snug drop-shadow-md">
                {photo.alt}
              </h4>
              {photo.capacity && (
                <div className="flex items-center space-x-1.5 text-xs text-white/80 font-light pt-0.5">
                  <Users size={12} className="text-white/70 shrink-0" />
                  <span>{photo.capacity}</span>
                </div>
              )}
            </div>
          </div>
        </Link>
        </div>
      ))}
    </div>
  );
}
