"use client";

import { useEffect } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import PriceTeaserStrip from "@/components/PriceTeaserStrip";
import SectionHeading from "@/components/SectionHeading";
import PhotoTicker, { PhotoTickerItem } from "@/components/PhotoTicker";
import ServiceCard, { ServiceItem } from "@/components/ServiceCard";
import PackageCard, { PackageItem } from "@/components/PackageCard";
import PhotoGrid, { PhotoItem } from "@/components/PhotoGrid";
import TestimonialCarousel, { TestimonialItem } from "@/components/TestimonialCarousel";
import ContactFormSection from "@/components/ContactFormSection";
import Footer from "@/components/Footer";
import StickyCTAButton from "@/components/StickyCTAButton";

const tickerPhotos: PhotoTickerItem[] = [
  {
    id: "p-1",
    src: "https://images.unsplash.com/photo-1519741497674-611481863552?q=85&w=1200&auto=format&fit=crop",
    alt: "Sunset Wedding in Uluwatu",
    location: "Uluwatu Clifftop",
  },
  {
    id: "p-2",
    src: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=85&w=1200&auto=format&fit=crop",
    alt: "Tropical Ubud Romance",
    location: "Ubud Rainforest",
  },
  {
    id: "p-3",
    src: "https://images.unsplash.com/photo-1532712938310-34cb3982ef74?q=85&w=1200&auto=format&fit=crop",
    alt: "White Sand Nusa Dua Ceremony",
    location: "Nusa Dua Coast",
  },
  {
    id: "p-4",
    src: "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=85&w=1200&auto=format&fit=crop",
    alt: "Modern Minimalist Aisle",
    location: "Canggu Estate",
  },
  {
    id: "p-5",
    src: "https://images.unsplash.com/photo-1469371670807-013ccf25f16a?q=85&w=1200&auto=format&fit=crop",
    alt: "Floral Artistry and Scenography",
    location: "Jimbaran Bay",
  },
  {
    id: "p-6",
    src: "https://images.unsplash.com/photo-1520854221256-17451cc331bf?q=85&w=1200&auto=format&fit=crop",
    alt: "Champagne Toast Celebration",
    location: "Seminyak Luxury Villa",
  },
];

const services: ServiceItem[] = [
  {
    id: "s-1",
    tag: "Layanan 01",
    title: "Full Planning & Design",
    description:
      "Perencanaan komprehensif dari pencarian venue, kurasi vendor terbaik, konsep tata visual & dekorasi, hingga koordinasi penuh di hari-H.",
    features: [
      "Kurasi venue privat eksklusif di Bali",
      "Perancangan konsep visual & moodboard editorial",
      "Manajemen budget & negosiasi vendor terpercaya",
      "Pengawasan rundown & logistik 100% pada hari-H",
    ],
    imageSrc:
      "https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=85&w=768&h=1024&auto=format&fit=crop",
    imageAlt: "Full Planning and Editorial Wedding Decor",
  },
  {
    id: "s-2",
    tag: "Layanan 02",
    title: "Destination Concierge",
    description:
      "Layanan eksklusif untuk pasangan dan tamu internasional: akomodasi villa mewah, transportasi VIP, hingga welcome dinner & after party.",
    features: [
      "Hospitality & akomodasi privat seluruh tamu",
      "Rangkaian pre-wedding event & sunset cocktail",
      "Armada logistik & transportasi kepulauan",
      "Pengalaman budaya Bali autentik & personal",
    ],
    imageSrc:
      "https://images.unsplash.com/photo-1545232979-fbf68fe9b10d?q=85&w=768&h=1024&auto=format&fit=crop",
    imageAlt: "Destination Wedding Concierge Experience",
  },
];

const packages: PackageItem[] = [
  {
    id: "pkg-1",
    name: "Intimate Elegance",
    price: "Rp 75.000.000",
    tagline: "Untuk 20 – 50 Tamu Undangan",
    description:
      "Didesain khusus untuk perayaan hangat yang intim dan penuh makna bersama keluarga serta sahabat terdekat.",
    features: [
      "Tim perencana & koordinator hari-H (5 personil)",
      "Konsep dekorasi bunga tropis modern kontemporer",
      "Sesi foto & video sinematik 8 jam",
      "Rundown & koordinasi vendor lokal terkurasi",
    ],
    imageSrc:
      "https://images.unsplash.com/photo-1519741497674-611481863552?q=85&w=1200&auto=format&fit=crop",
    imageAlt: "Intimate Elegance Wedding Package",
  },
  {
    id: "pkg-2",
    name: "Grand Bali Celebration",
    price: "Rp 165.000.000",
    tagline: "Untuk 100 – 250 Tamu Undangan",
    description:
      "Paket terpopuler untuk pesta megah di ballroom, beachfront resort, atau cliffside amphitheater dengan spektakel visual istimewa.",
    isFeatured: true,
    features: [
      "Tim perencana profesional penuh (12 personil)",
      "Panggung custom, lighting ambient, sound system kelas konser",
      "Dokumentasi sinematik multi-kamera & drone 4K",
      "Manajemen RSVP & concierge akomodasi tamu VIP",
    ],
    imageSrc:
      "https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=85&w=1200&auto=format&fit=crop",
    imageAlt: "Grand Bali Celebration Wedding Package",
  },
  {
    id: "pkg-3",
    name: "Royal Destination Experience",
    price: "Rp 320.000.000",
    tagline: "Multi-Day Luxury Experience (300+ Tamu)",
    description:
      "Perayaan multi-hari tanpa batas: mulai dari Sunset Welcome Dinner di yacht, Upacara Adat/Chapel, hingga After Party eksklusif.",
    features: [
      "Dedicated senior wedding director 24/7",
      "Multi-day events (Welcome Dinner & After Party)",
      "Custom structural installation & fireworks",
      "Concierge armada mobil mewah VIP",
    ],
    imageSrc:
      "https://images.unsplash.com/photo-1544078751-58fee2d8a03b?q=85&w=1200&auto=format&fit=crop",
    imageAlt: "Royal Luxury Wedding Experience",
  },
];

const venueGridPhotos: PhotoItem[] = [
  {
    id: "v-1",
    src: "https://images.unsplash.com/photo-1571896349842-33c89424de2d?q=85&w=1200&auto=format&fit=crop",
    alt: "Alila Villas Cliff Pavilion",
    location: "ULUWATU • OCEAN CLIFFSIDE",
    capacity: "Kapasitas hingga 150 tamu",
  },
  {
    id: "v-2",
    src: "https://images.unsplash.com/photo-1544078751-58fee2d8a03b?q=85&w=1200&auto=format&fit=crop",
    alt: "Mandapa Jungle Sanctuary",
    location: "UBUD • RAINFOREST VALLEY",
    capacity: "Kapasitas hingga 80 tamu",
  },
  {
    id: "v-3",
    src: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=85&w=1200&auto=format&fit=crop",
    alt: "The Mulia Glasshouse Pavilion",
    location: "NUSA DUA • BEACHFRONT CHAPEL",
    capacity: "Kapasitas hingga 250 tamu",
  },
  {
    id: "v-4",
    src: "https://images.unsplash.com/photo-1583939003579-730e3918a45a?q=85&w=1200&auto=format&fit=crop",
    alt: "Bulgari Resort Ocean Terrace",
    location: "PECATU • LUXURY CLIFFTOP",
    capacity: "Kapasitas hingga 120 tamu",
  },
];

const testimonials: TestimonialItem[] = [
  {
    id: "t-1",
    coupleName: "Clarissa & Jonathan",
    locationYear: "Uluwatu Clifftop • 2025",
    avatar:
      "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=300&auto=format&fit=crop",
    quote:
      "Kami berbasis di Melbourne dan awalnya cemas mengatur pernikahan jarak jauh. Tim Bali Wed membuat seluruh proses terasa begitu tenang dan terorganisir sempurna. Momen sunset di Uluwatu sungguh magis.",
  },
  {
    id: "t-2",
    coupleName: "Nadine & Richard",
    locationYear: "Ubud Rainforest Estate • 2024",
    avatar:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=300&auto=format&fit=crop",
    quote:
      "Setiap detail bunga, pencahayaan, dan rundown acara dieksekusi dengan presisi editorial yang luar biasa. Para tamu dari 8 negara berbeda memuji kelancaran acara kami.",
  },
  {
    id: "t-3",
    coupleName: "Sarah & Dimas",
    locationYear: "Nusa Dua Private Chapel • 2024",
    avatar:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=300&auto=format&fit=crop",
    quote:
      "Pendekatan foto-first mereka sangat terasa. Setiap sudut dekorasi dan alur acara dibuat sangat alami dan sinematik.",
  },
];

export default function Home() {
  /**
   * IntersectionObserver: auto-reveal .mask-reveal-container images
   * when each sticky section scrolls into the viewport during normal scroll.
   * This ensures images are visible even without menu navigation.
   */
  useEffect(() => {
    const sectionIds = [
      "intro-section",
      "layanan",
      "paket",
      "venue",
      "testimoni",
      "kontak-section",
    ];

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const section = entry.target as HTMLElement;
            const containers = Array.from(
              section.querySelectorAll<HTMLElement>(".mask-reveal-container")
            );
            containers.forEach((c, i) => {
              // Only auto-reveal if not already revealed (don't override menu nav animation)
              if (!c.classList.contains("revealed")) {
                setTimeout(() => c.classList.add("revealed"), i * 100);
              }
            });
          }
        });
      },
      { threshold: 0.15 }
    );

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);
  return (
    <main className="min-h-screen bg-[#2A281F] text-[#2A281F] relative">
      {/* Section 1: Hero & Teaser with Navbar (Layer 1: Sticky Base Screen) */}
      <div className="sticky top-0 z-10 w-full min-h-screen flex flex-col justify-between overflow-hidden relative bg-[#2A281F]">
        <Navbar />
        <Hero />
        <PriceTeaserStrip />
      </div>

      {/* Section 2: Intro & Photo Ticker (Layer 2: Curtain Sheet 1) */}
      <section
        id="intro-section"
        className="sticky top-0 z-20 w-full min-h-[100dvh] bg-white curtain-shadow-top shadow-[0_-30px_60px_rgba(0,0,0,0.22)] rounded-t-[32px] sm:rounded-t-[48px] pt-6 sm:pt-10 md:pt-14 pb-8 sm:pb-14 md:pb-18 flex flex-col justify-center overflow-hidden"
      >
        <div className="px-4 sm:px-6 md:px-8 max-w-7xl mx-auto mb-3 sm:mb-6 md:mb-8 w-full">
          <SectionHeading
            subtitle="KENAPA BALI"
            title="Setiap Pernikahan Punya Cerita Sendiri"
            description="Dari desiran ombak Samudra Hindia hingga ketenangan bentang alam Ubud, kami merangkai lanskap ikonik Bali menjadi panggung abadi momen terbaik hidup Anda."
          />
        </div>
        <div className="w-full">
          <PhotoTicker photos={tickerPhotos} />
        </div>
      </section>

      {/* Section 3: Layanan Utama (Layer 3: Stacking Cards with Sticky Curtain Transition to Paket) */}
      <section
        id="layanan"
        className="sticky top-0 z-30 w-full min-h-[100dvh] bg-[#F5F1E9] curtain-shadow-top shadow-[0_-30px_60px_rgba(0,0,0,0.22)] rounded-t-[32px] sm:rounded-t-[48px] pt-4 sm:pt-8 md:pt-10 pb-12 sm:pb-12 md:pb-14 px-4 sm:px-6 md:px-8 lg:px-12 flex flex-col justify-center overflow-hidden"
      >
        <div className="max-w-6xl xl:max-w-7xl mx-auto w-full flex flex-col justify-center my-auto">
          <div className="mb-2 sm:mb-4 md:mb-6">
            <SectionHeading
              subtitle="KELEBIHAN LAYANAN"
              title="Pendekatan Editorial Dalam Setiap Detail"
              description="Kami memadukan ketelitian perencanaan profesional dengan kebebasan seni dekorasi modern untuk menciptakan momen abadi."
            />
          </div>

          {/* Service Cards Container: smooth swipeable on mobile, 2-column grid on desktop */}
          <div className="flex md:grid md:grid-cols-2 gap-4 sm:gap-6 lg:gap-8 w-full items-stretch overflow-x-auto md:overflow-x-visible no-scrollbar py-1 pb-3 md:pb-0 snap-x snap-mandatory touch-pan-x" style={{ WebkitOverflowScrolling: "touch" }}>
            <div className="min-w-[82vw] sm:min-w-[70vw] md:min-w-0 snap-center flex flex-col shrink-0 md:shrink">
              <ServiceCard service={services[0]} className="shadow-xl w-full h-full" />
            </div>
            <div className="min-w-[82vw] sm:min-w-[70vw] md:min-w-0 snap-center flex flex-col shrink-0 md:shrink">
              <ServiceCard service={services[1]} className="shadow-xl w-full h-full" />
            </div>
          </div>
        </div>
      </section>

      {/* Section 4: Paket Layanan (Layer 4: Curtain Sheet 3 - Generous Clearance for All Cards & CTAs) */}
      <section
        id="paket"
        className="sticky top-0 z-40 w-full min-h-[100dvh] bg-white curtain-shadow-top shadow-[0_-30px_60px_rgba(0,0,0,0.22)] rounded-t-[32px] sm:rounded-t-[48px] pt-4 sm:pt-8 md:pt-10 pb-12 sm:pb-12 md:pb-14 px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 flex flex-col justify-center overflow-hidden"
      >
        <div className="max-w-7xl mx-auto w-full flex flex-col justify-center my-auto">
          <div className="mb-2 sm:mb-4 md:mb-5">
            <SectionHeading
              subtitle="PENELUSURAN INVESTASI"
              title="Kurasi Paket Layanan Pernikahan"
              description="Pilih skema perencanaan yang sesuai dengan skala perayaan dan visi unik yang Anda impikan."
            />
          </div>
          {/* Package Cards: smooth swipeable on mobile, 3-column grid on desktop */}
          <div className="flex md:grid md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 lg:gap-6 items-stretch w-full overflow-x-auto md:overflow-x-visible no-scrollbar py-1 pb-3 md:pb-0 snap-x snap-mandatory touch-pan-x" style={{ WebkitOverflowScrolling: "touch" }}>
            {packages.map((pkg) => (
              <div key={pkg.id} className="min-w-[82vw] sm:min-w-[65vw] md:min-w-0 snap-center flex flex-col shrink-0 md:shrink">
                <PackageCard pkg={pkg} layout="vertical" className="h-full shadow-xl" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 5: Venue Wedding (Layer 5: Curtain Sheet 4 - Generous Clearance for 3:4 Portrait Grid) */}
      <section
        id="venue"
        className="sticky top-0 z-50 w-full min-h-[100dvh] bg-[#F5F1E9] curtain-shadow-top shadow-[0_-30px_60px_rgba(0,0,0,0.22)] rounded-t-[32px] sm:rounded-t-[48px] pt-4 sm:pt-8 md:pt-10 pb-12 sm:pb-12 md:pb-14 px-4 sm:px-6 md:px-8 lg:px-10 xl:px-12 flex flex-col justify-center overflow-hidden"
      >
        <div className="max-w-7xl 2xl:max-w-[1400px] mx-auto w-full flex flex-col justify-center my-auto">
          <div className="mb-2 sm:mb-4 md:mb-5">
            <SectionHeading
              subtitle="LOKASI IKONIK"
              title="Venue Wedding Pilihan di Bali"
              description="Koleksi kemitraan eksklusif bersama resort bintang lima, private estate, dan chapel terkemuka."
            />
          </div>
          <PhotoGrid photos={venueGridPhotos} />
        </div>
      </section>

      {/* Section 6: Testimoni Pasangan (Layer 6: Curtain Sheet 5 - Generous Clearance for Reviews) */}
      <section
        id="testimoni"
        className="sticky top-0 z-[60] w-full min-h-[100dvh] bg-white curtain-shadow-top shadow-[0_-30px_60px_rgba(0,0,0,0.22)] rounded-t-[32px] sm:rounded-t-[48px] pt-4 sm:pt-8 md:pt-10 pb-8 sm:pb-12 md:pb-14 px-4 sm:px-6 md:px-8 lg:px-12 flex flex-col justify-center overflow-hidden"
      >
        <div className="max-w-7xl mx-auto w-full flex flex-col justify-center my-auto">
          <div className="mb-2 sm:mb-4 md:mb-5">
            <SectionHeading
              subtitle="CERITA PASANGAN"
              title="Kesan Abadi Dari Pasangan Kami"
              description="Pengalaman jujur dari pasangan yang telah mempercayakan perayaan hari bahagia mereka bersama Bali Wed."
            />
          </div>
          <TestimonialCarousel testimonials={testimonials} />
        </div>
      </section>

      {/* Section 7: Contact Us (Layer 7: Final Lifting Curtain Sheet) */}
      <ContactFormSection />

      {/* Floating Sticky CTA Button */}
      <StickyCTAButton />

      {/* Section 8: Footer (Layer 0: Fixed Beneath Curtain Sheet) */}
      <Footer />
    </main>
  );
}
