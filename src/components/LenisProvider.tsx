"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { scrollToTarget } from "@/lib/scrollTo";

export default function LenisProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      lerp: 0.038, // Ultra-Heavy Damping (sensasi sangat berbobot 1:1 Sarah Haywood)
      wheelMultiplier: 0.65, // Resistensi jarak per klik roda mouse
      touchMultiplier: 1.0,
      smoothWheel: true, // Wajib aktif untuk mouse fisik
      orientation: "vertical",
      gestureOrientation: "vertical",
      infinite: false,
    });

    // Global Lenis reference
    (window as any).lenis = lenis;

    // Synchronize GSAP ScrollTrigger with Lenis
    lenis.on("scroll", ScrollTrigger.update);

    const updateGSAPTicker = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(updateGSAPTicker);
    gsap.ticker.lagSmoothing(0);

    // Global Capture Click Handler for all anchor links
    const handleGlobalAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest("a");
      if (!anchor) return;

      // If the anchor is a Navbar nav link (data-nav-handled),
      // let the React onClick handler (handleNav) process it — do NOT intercept.
      if (anchor.hasAttribute("data-nav-handled")) return;

      const href = anchor.getAttribute("href");
      if (!href) return;

      // Match internal hash navigation e.g. "/#intro-section" or "#intro-section" or "/"
      if (href === "/" && window.location.pathname === "/") {
        e.preventDefault();
        e.stopPropagation();
        scrollToTarget(0);
        return;
      }

      if (href.includes("#")) {
        const hash = href.substring(href.indexOf("#"));
        if (hash && hash !== "#") {
          e.preventDefault();
          e.stopPropagation();
          scrollToTarget(hash);
        }
      }
    };

    // Use capture phase so we catch clicks before Next.js Router or other elements swallow it
    document.addEventListener("click", handleGlobalAnchorClick, { capture: true });

    // Handle initial hash on page load if present
    if (window.location.hash) {
      setTimeout(() => {
        scrollToTarget(window.location.hash);
      }, 300);
    }

    return () => {
      document.removeEventListener("click", handleGlobalAnchorClick, { capture: true } as any);
      gsap.ticker.remove(updateGSAPTicker);
      lenis.destroy();
    };
  }, []);

  return <>{children}</>;
}
