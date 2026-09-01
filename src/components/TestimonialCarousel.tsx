"use client";

import { useRef, useState, MouseEvent } from "react";
import { ChevronLeft, ChevronRight, Quote } from "lucide-react";

export interface TestimonialItem {
  id: string;
  avatar: string;
  coupleName: string;
  locationYear: string;
  quote: string;
}

interface TestimonialCarouselProps {
  testimonials: TestimonialItem[];
}

export default function TestimonialCarousel({ testimonials }: TestimonialCarouselProps) {
  const carouselRef = useRef<HTMLDivElement>(null);
  const [isMouseDown, setIsMouseDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const handleMouseDown = (e: MouseEvent<HTMLDivElement>) => {
    if (!carouselRef.current) return;
    setIsMouseDown(true);
    setStartX(e.pageX - carouselRef.current.offsetLeft);
    setScrollLeft(carouselRef.current.scrollLeft);
  };

  const handleMouseLeave = () => {
    setIsMouseDown(false);
  };

  const handleMouseUp = () => {
    setIsMouseDown(false);
  };

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!isMouseDown || !carouselRef.current) return;
    e.preventDefault();
    const x = e.pageX - carouselRef.current.offsetLeft;
    const walk = (x - startX) * 1.8;
    carouselRef.current.scrollLeft = scrollLeft - walk;
  };

  const scroll = (direction: "left" | "right") => {
    if (!carouselRef.current) return;
    const scrollAmount = window.innerWidth < 640 ? 300 : 400;
    carouselRef.current.scrollBy({
      left: direction === "left" ? -scrollAmount : scrollAmount,
      behavior: "smooth",
    });
  };

  return (
    <div className="relative w-full">
      {/* Controls */}
      <div className="flex justify-end items-center space-x-2.5 mb-6 px-2">
        <button
          onClick={() => scroll("left")}
          className="w-11 h-11 rounded-full border border-[#EDEAE3] bg-white text-[#2A281F] hover:bg-[#2A281F] hover:text-white transition-colors cursor-pointer flex items-center justify-center shadow-sm"
          aria-label="Previous testimonial"
        >
          <ChevronLeft size={18} />
        </button>
        <button
          onClick={() => scroll("right")}
          className="w-11 h-11 rounded-full border border-[#EDEAE3] bg-white text-[#2A281F] hover:bg-[#2A281F] hover:text-white transition-colors cursor-pointer flex items-center justify-center shadow-sm"
          aria-label="Next testimonial"
        >
          <ChevronRight size={18} />
        </button>
      </div>

      {/* Draggable & Touch-enabled Carousel Container */}
      <div
        ref={carouselRef}
        onMouseDown={handleMouseDown}
        onMouseLeave={handleMouseLeave}
        onMouseUp={handleMouseUp}
        onMouseMove={handleMouseMove}
        className="flex space-x-6 overflow-x-auto no-scrollbar snap-x snap-proximity py-4 px-2 cursor-grab active:cursor-grabbing select-none"
        style={{ scrollSnapType: "x proximity", WebkitOverflowScrolling: "touch" }}
      >
        {testimonials.map((item) => (
          <div
            key={item.id}
            className="flex-none w-[280px] sm:w-[340px] md:w-[380px] lg:w-[420px] snap-start bg-white rounded-3xl p-5 sm:p-6 lg:p-7 border border-[#EDEAE3] shadow-lg flex flex-col justify-between hover:shadow-xl transition-all duration-300"
          >
            <div>
              <Quote size={24} className="text-[#8A8477]/30 mb-3" />
              <p className="font-libre-caslon text-sm sm:text-base lg:text-lg text-[#2A281F] font-normal leading-relaxed mb-5 italic line-clamp-4">
                "{item.quote}"
              </p>
            </div>

            <div className="flex items-center space-x-3.5 pt-3.5 border-t border-[#EDEAE3]">
              <img
                src={item.avatar}
                alt={item.coupleName}
                className="w-10 h-10 sm:w-11 sm:h-11 rounded-full object-cover border border-[#EDEAE3]"
              />
              <div>
                <h4 className="font-libre-caslon text-sm sm:text-base font-medium text-[#2A281F]">
                  {item.coupleName}
                </h4>
                <p className="text-[10px] sm:text-xs uppercase tracking-wider text-[#8A8477]">
                  {item.locationYear}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
