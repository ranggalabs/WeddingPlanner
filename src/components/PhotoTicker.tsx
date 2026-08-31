"use client";

import { useEffect, useState, useRef } from "react";
import useEmblaCarousel from "embla-carousel-react";
import AutoScroll from "embla-carousel-auto-scroll";
import { MoveHorizontal } from "lucide-react";

export interface PhotoTickerItem {
  id: string;
  src: string;
  alt: string;
  location?: string;
}

interface PhotoTickerProps {
  photos: PhotoTickerItem[];
}

export default function PhotoTicker({ photos }: PhotoTickerProps) {
  const [emblaRef, emblaApi] = useEmblaCarousel(
    {
      loop: true,
      dragFree: true,
      align: "start",
    },
    [
      AutoScroll({
        speed: 1.2,
        stopOnInteraction: true,
        stopOnMouseEnter: false,
        stopOnFocusIn: true,
      }),
    ]
  );

  // Custom Cursor follow state
  const containerRef = useRef<HTMLDivElement>(null);
  const [cursorPos, setCursorPos] = useState({ x: 0, y: 0 });
  const [isHovered, setIsHovered] = useState(false);
  const [isDragging, setIsDragging] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    setCursorPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  useEffect(() => {
    if (!emblaApi) return;

    const autoScroll = emblaApi.plugins()?.autoScroll;

    const onPointerDown = () => {
      setIsDragging(true);
      autoScroll?.stop();
    };

    const onPointerUp = () => {
      setIsDragging(false);
      // Resume autoscroll after short delay ~2.5s
      setTimeout(() => {
        autoScroll?.play();
      }, 2500);
    };

    emblaApi.on("pointerDown", onPointerDown);
    emblaApi.on("pointerUp", onPointerUp);

    return () => {
      emblaApi.off("pointerDown", onPointerDown);
      emblaApi.off("pointerUp", onPointerUp);
    };
  }, [emblaApi]);

  // Duplicate photos array to ensure seamless infinite looping if photos count is small
  const displayPhotos = photos.length < 8 ? [...photos, ...photos, ...photos] : photos;

  return (
    <div
      ref={containerRef}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onMouseMove={handleMouseMove}
      className="relative w-full overflow-hidden select-none group cursor-grab active:cursor-grabbing py-6 bg-[#F5F1E9]/30 border-y border-[#EDEAE3]"
    >
      {/* Custom Drag Floating Cursor Indicator */}
      {isHovered && (
        <div
          className="pointer-events-none absolute z-30 transform flex items-center justify-center space-x-1.5 px-4 py-2 rounded-full bg-[#2A281F]/90 backdrop-blur-sm text-white text-[10px] uppercase tracking-widest font-semibold shadow-2xl transition-transform duration-75 ease-out"
          style={{
            left: `${cursorPos.x}px`,
            top: `${cursorPos.y}px`,
            transform: `translate(-50%, -50%) scale(${isDragging ? 0.92 : 1})`,
          }}
        >
          <MoveHorizontal size={14} />
          <span>{isDragging ? "DRAGGING" : "DRAG"}</span>
        </div>
      )}

      {/* Embla Viewport */}
      <div className="overflow-hidden w-full" ref={emblaRef}>
        <div className="flex gap-8 md:gap-12">
          {displayPhotos.map((photo, index) => (
            <div
              key={`${photo.id}-${index}`}
              className="flex-none mr-8 md:mr-12 h-[260px] min-[690px]:h-[42vh] min-[1000px]:h-[50vh] photo-zoom-container rounded-2xl overflow-hidden bg-[#EDEAE3] relative group/item shadow-md border border-[#EDEAE3]"
            >
              <img
                src={photo.src}
                alt={photo.alt}
                className="h-full w-auto object-cover rounded-2xl photo-zoom-image block"
                loading="lazy"
              />
              {photo.location && (
                <div className="absolute bottom-3 left-3 bg-[#2A281F]/70 backdrop-blur-md text-white text-[10px] uppercase tracking-wider font-medium px-3 py-1 rounded-full opacity-0 group-hover/item:opacity-100 transition-opacity">
                  {photo.location}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
