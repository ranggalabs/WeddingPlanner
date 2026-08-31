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
        yPercent: 20, // Deep Background photo moves smoothly creating depth
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
      className="relative w-full flex-1 min-h-[500px] sm:min-h-[540px] flex items-center justify-center overflow-hidden pt-16 sm:pt-20 pb-4 sm:pb-6"
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

      {/* Base & Fore Layer Content (Unified, cohesive text flow) */}
      <div className="relative z-20 w-full max-w-4xl mx-auto px-6 text-white flex flex-col items-center text-center my-auto">
        <div className="mb-2.5 sm:mb-3">
          <p className="text-[10px] sm:text-xs uppercase tracking-[0.25em] text-white/85 font-medium px-3.5 py-1 rounded-full bg-white/10 backdrop-blur-md border border-white/20 inline-block shadow-sm">
            Luxury Destination Wedding Organizer
          </p>
        </div>

        <h1 className="font-libre-caslon text-2xl sm:text-4xl md:text-5xl lg:text-6xl font-normal leading-[1.15] max-w-3xl mb-3 sm:mb-4 drop-shadow-md">
          Bali bukan sekadar lokasi, tapi cerita yang akan diingat.
        </h1>

        <p className="text-xs sm:text-sm md:text-base text-white/90 max-w-xl font-light leading-relaxed mb-4 sm:mb-6">
          Mengkurasi pernikahan impian di tebing Uluwatu, ketenangan Ubud, hingga pesisir pantai Nusa Dua dengan pendekatan modern editorial.
        </p>

        <div>
          <Link
            href="/#intro-section"
            className="inline-flex items-center space-x-2 text-[11px] sm:text-xs uppercase tracking-widest text-white/90 hover:text-white transition-all group cursor-pointer border border-white/20 bg-white/10 backdrop-blur-sm px-4 py-1.5 rounded-full hover:bg-white/20 shadow-sm"
          >
            <span>Jelajahi Pengalaman</span>
            <ArrowDown size={13} className="group-hover:translate-y-1 transition-transform" />
          </Link>
        </div>
      </div>
    </section>
  );
}
