"use client";

interface SectionHeadingProps {
  subtitle: string;
  title: string;
  description?: string;
  centered?: boolean;
}

export default function SectionHeading({
  subtitle,
  title,
  description,
  centered = true,
}: SectionHeadingProps) {
  return (
    <div className={`mb-6 sm:mb-8 md:mb-10 lg:mb-12 ${centered ? "text-center" : "text-left"}`}>
      <span className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-[#8A8477] font-medium block mb-1.5 sm:mb-2.5">
        {subtitle}
      </span>
      <h2 className="font-libre-caslon text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-normal text-[#2A281F] leading-tight max-w-3xl mx-auto">
        {title}
      </h2>
      {description && (
        <p className="text-xs sm:text-sm md:text-base text-[#8A8477] font-light max-w-xl mx-auto mt-3 sm:mt-4 leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}
