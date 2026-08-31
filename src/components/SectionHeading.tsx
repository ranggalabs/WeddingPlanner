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
    <div className={`mb-4 sm:mb-6 md:mb-8 ${centered ? "text-center" : "text-left"}`}>
      <span className="text-[10px] sm:text-xs uppercase tracking-[0.2em] text-[#8A8477] font-medium block mb-1 sm:mb-1.5">
        {subtitle}
      </span>
      <h2 className="font-libre-caslon text-xl sm:text-2xl md:text-3xl lg:text-4xl font-normal text-[#2A281F] leading-tight max-w-3xl mx-auto">
        {title}
      </h2>
      {description && (
        <p className="text-xs sm:text-sm text-[#8A8477] font-light max-w-xl mx-auto mt-2 sm:mt-2.5 leading-relaxed">
          {description}
        </p>
      )}
    </div>
  );
}
