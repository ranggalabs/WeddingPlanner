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
    <div className={`mb-3 sm:mb-5 md:mb-6 ${centered ? "text-center" : "text-left"}`}>
      <span className="text-fluid-caption uppercase text-[#8A8477] font-medium block mb-1 sm:mb-1.5">
        {subtitle}
      </span>
      <h2 className="font-libre-caslon text-fluid-h2 font-normal text-[#2A281F] max-w-4xl mx-auto">
        {title}
      </h2>
      {description && (
        <p className="text-fluid-body text-[#8A8477] font-light max-w-2xl mx-auto mt-1.5 sm:mt-2">
          {description}
        </p>
      )}
    </div>
  );
}
