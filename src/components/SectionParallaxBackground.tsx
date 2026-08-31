"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

interface SectionParallaxBackgroundProps {
  imageSrc: string;
  imageAlt?: string;
  overlayOpacity?: number; // e.g. 0.88 - 0.94 to maintain white-only / warm-neutral background readability
  overlayColor?: string; // default warm neutral / cream tint
  yShiftPercent?: number; // default 20%
}

export default function SectionParallaxBackground({
  imageSrc,
  imageAlt = "Background visual",
  overlayOpacity = 0.91,
  overlayColor = "bg-[#F5F1E9]",
  yShiftPercent = 20,
}: SectionParallaxBackgroundProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (!containerRef.current || !imgRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        imgRef.current,
        { yPercent: -yShiftPercent / 2 },
        {
          yPercent: yShiftPercent / 2,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 1.0, // Smooth scroll integration
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [yShiftPercent]);

  return (
    <div
      ref={containerRef}
      className="absolute inset-0 z-0 overflow-hidden pointer-events-none select-none"
    >
      {/* Parallax Image */}
      <img
        ref={imgRef}
        src={imageSrc}
        alt={imageAlt}
        className="w-full h-[130%] -top-[15%] relative object-cover object-center scale-105 filter grayscale-[20%]"
        loading="lazy"
      />
      {/* Luxury Tint / Scrim Overlay to ensure text readability */}
      <div
        className={`absolute inset-0 ${overlayColor}`}
        style={{ opacity: overlayOpacity }}
      />
    </div>
  );
}
