"use client";

import { useEffect, useRef, ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export type LayerDepth = "deep" | "back" | "base" | "fore" | "custom";

interface ParallaxLayerProps {
  children: ReactNode;
  depth?: LayerDepth;
  speed?: number;
  yDistance?: number;
  className?: string;
}

export default function ParallaxLayer({
  children,
  depth = "back",
  speed,
  yDistance,
  className = "",
}: ParallaxLayerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const targetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (!containerRef.current || !targetRef.current) return;

    let startY = 0;
    let endY = 0;

    switch (depth) {
      case "deep":
        startY = -90;
        endY = 90;
        break;
      case "back":
        startY = -45;
        endY = 45;
        break;
      case "base":
        return;
      case "fore":
        startY = 45;
        endY = -45;
        break;
      case "custom":
        const dist = yDistance ?? 50;
        startY = -dist;
        endY = dist;
        break;
    }

    if (yDistance !== undefined) {
      if (depth === "fore") {
        startY = yDistance;
        endY = -yDistance;
      } else {
        startY = -yDistance;
        endY = yDistance;
      }
    }

    const ctx = gsap.context(() => {
      gsap.fromTo(
        targetRef.current,
        { y: startY },
        {
          y: endY,
          ease: "none",
          scrollTrigger: {
            trigger: containerRef.current,
            start: "top bottom",
            end: "bottom top",
            scrub: 0.6, // Tighter scrub with Lenis for immediate responsiveness
            invalidateOnRefresh: true,
          },
        }
      );
    }, containerRef);

    return () => ctx.revert();
  }, [depth, speed, yDistance]);

  return (
    <div ref={containerRef} className={className}>
      <div ref={targetRef} className="w-full h-full will-change-transform">
        {children}
      </div>
    </div>
  );
}
