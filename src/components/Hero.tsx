"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import { ArrowDown } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import ParallaxLayer from "@/components/ParallaxLayer";

export default function Hero() {
  const heroRef = useRef<HTMLElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (!heroRef.current || !imgRef.current) return;

    const ctx = gsap.context(() => {
      gsap.to(imgRef.current, {
        yPercent: 25, // Deep Background photo moves at ~0.5x speed creating depth
        ease: "none",
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={heroRef}
      className="relative w-full flex-1 min-h-[540px] sm:min-h-[580px] flex items-end justify-center overflow-hidden pb-6 sm:pb-10"
    >
      {/* Deep Background Layer: Hero Image with Mask Reveal */}
      <div className="mask-reveal-container absolute inset-0 z-0 overflow-hidden">
        <img
          ref={imgRef}
          src="https://images.unsplash.com/photo-1519741497674-611481863552?q=85&w=2000&auto=format&fit=crop"
          alt="Bali Destination Wedding"
          className="mask-reveal-img w-full h-[120%] -top-[10%] relative object-cover object-center scale-105"
        />
        {/* Scrim Gradient for Legibility */}
        <div className="absolute inset-0 hero-scrim z-10" />
      </div>

      {/* Base & Fore Layer Content */}
      <div className="relative z-20 w-full max-w-5xl mx-auto px-6 pb-4 sm:pb-8 text-white flex flex-col items-center text-center">
        <ParallaxLayer depth="fore" yDistance={25} className="mb-3">
          <p className="text-[11px] sm:text-xs uppercase tracking-[0.25em] text-white/80 font-medium px-4 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 inline-block">
            Luxury Destination Wedding Organizer
          </p>
        </ParallaxLayer>

        <h1 className="font-libre-caslon text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-normal leading-[1.1] max-w-4xl mb-4 sm:mb-6 drop-shadow-sm">
          Bali bukan sekadar lokasi, tapi cerita yang akan diingat.
        </h1>

        <p className="text-xs sm:text-sm md:text-base text-white/90 max-w-2xl font-light leading-relaxed mb-6 sm:mb-8">
          Mengkurasi pernikahan impian di tebing Uluwatu, ketenangan Ubud, hingga pesisir pantai Nusa Dua dengan pendekatan modern editorial.
        </p>

        <ParallaxLayer depth="fore" yDistance={35}>
          <Link
            href="/#intro-section"
            className="flex items-center space-x-2 text-xs uppercase tracking-widest text-white/90 hover:text-white transition-opacity group cursor-pointer"
          >
            <span>Jelajahi Pengalaman</span>
            <ArrowDown size={14} className="group-hover:translate-y-1 transition-transform" />
          </Link>
        </ParallaxLayer>
      </div>
    </section>
  );
}
