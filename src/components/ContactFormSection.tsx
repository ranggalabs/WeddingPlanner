"use client";

import { useState, FormEvent } from "react";
import SectionHeading from "@/components/SectionHeading";
import { Mail, Calendar, Users, Send, CheckCircle2, MessageCircle } from "lucide-react";

export default function ContactFormSection() {
  const [submitted, setSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    weddingDate: "",
    guestCount: "",
    vision: "",
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section
      id="kontak-section"
      className="sticky top-0 z-[70] w-full min-h-screen bg-[#F5F1E9] curtain-shadow-top shadow-[0_-30px_60px_rgba(0,0,0,0.22)] rounded-t-[36px] sm:rounded-t-[48px] pt-12 sm:pt-16 md:pt-20 pb-16 sm:pb-20 md:pb-24 px-4 sm:px-6 md:px-8 flex flex-col justify-start sm:justify-center"
    >
      <div className="max-w-4xl mx-auto w-full">
        <SectionHeading
          subtitle="MULAI PERJALANAN ANDA"
          title="Mari Rencanakan Pernikahan Impian Anda di Bali"
          description="Tim concierge kami akan menghubungi Anda dalam waktu 24 jam untuk diskusi privat mengenai lokasi, konsep, dan estimasi investasi."
        />

        <div className="bg-white rounded-3xl p-5 sm:p-6 md:p-7 border border-[#EDEAE3] shadow-xl">
          {submitted ? (
            <div className="text-center py-6 sm:py-8 space-y-3">
              <CheckCircle2 size={36} className="mx-auto text-[#2A281F]" />
              <h3 className="font-libre-caslon text-lg sm:text-xl md:text-2xl text-[#2A281F]">
                Terima Kasih, Pesan Anda Telah Terkirim.
              </h3>
              <p className="text-xs sm:text-sm text-[#8A8477] max-w-md mx-auto font-light">
                Wedding Consultant Bali Wed akan segera menghubungi email{" "}
                <span className="font-semibold text-[#2A281F]">{formData.email}</span> untuk jadwal konsultasi perdana.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-3 text-xs uppercase tracking-wider font-semibold text-[#2A281F] underline cursor-pointer"
              >
                Kirim Pesan Lain
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-3.5">
              {/* Full Name */}
              <div>
                <label className="block text-[10px] sm:text-[11px] uppercase tracking-wider text-[#2A281F] font-semibold mb-1">
                  Nama Lengkap *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Contoh: Maya Anggraini & Julian"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                  className="w-full px-4 h-10 bg-[#F5F1E9]/50 border border-[#EDEAE3] rounded-xl text-xs sm:text-sm text-[#2A281F] placeholder-[#8A8477] focus:outline-none focus:border-[#2A281F] transition-colors"
                />
              </div>

              {/* Email with Icon */}
              <div>
                <label className="block text-[10px] sm:text-[11px] uppercase tracking-wider text-[#2A281F] font-semibold mb-1">
                  Alamat Email *
                </label>
                <div className="relative">
                  <Mail
                    size={15}
                    className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8A8477]"
                  />
                  <input
                    type="email"
                    required
                    placeholder="nama@domain.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full pl-10 pr-4 h-10 bg-[#F5F1E9]/50 border border-[#EDEAE3] rounded-xl text-xs sm:text-sm text-[#2A281F] placeholder-[#8A8477] focus:outline-none focus:border-[#2A281F] transition-colors"
                  />
                </div>
              </div>

              {/* 2-Column: Wedding Date + Guest Count */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-[10px] sm:text-[11px] uppercase tracking-wider text-[#2A281F] font-semibold mb-1">
                    Estimasi Tanggal Pernikahan
                  </label>
                  <div className="relative">
                    <Calendar
                      size={15}
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8A8477]"
                    />
                    <input
                      type="date"
                      value={formData.weddingDate}
                      onChange={(e) =>
                        setFormData({ ...formData, weddingDate: e.target.value })
                      }
                      className="w-full pl-10 pr-4 h-10 bg-[#F5F1E9]/50 border border-[#EDEAE3] rounded-xl text-xs sm:text-sm text-[#2A281F] focus:outline-none focus:border-[#2A281F] transition-colors"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-[10px] sm:text-[11px] uppercase tracking-wider text-[#2A281F] font-semibold mb-1">
                    Estimasi Jumlah Tamu
                  </label>
                  <div className="relative">
                    <Users
                      size={15}
                      className="absolute left-3.5 top-1/2 -translate-y-1/2 text-[#8A8477]"
                    />
                    <select
                      value={formData.guestCount}
                      onChange={(e) =>
                        setFormData({ ...formData, guestCount: e.target.value })
                      }
                      className="w-full pl-10 pr-4 h-10 bg-[#F5F1E9]/50 border border-[#EDEAE3] rounded-xl text-xs sm:text-sm text-[#2A281F] focus:outline-none focus:border-[#2A281F] transition-colors"
                    >
                      <option value="">Pilih perkiraan tamu</option>
                      <option value="1-50">Intimate (1 – 50 Tamu)</option>
                      <option value="50-150">Medium (50 – 150 Tamu)</option>
                      <option value="150-300">Grand (150 – 300 Tamu)</option>
                      <option value="300+">Royal Exclusive (300+ Tamu)</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Textarea Vision */}
              <div>
                <label className="block text-[10px] sm:text-[11px] uppercase tracking-wider text-[#2A281F] font-semibold mb-1">
                  Visi Pernikahan Impian Anda
                </label>
                <textarea
                  rows={2}
                  placeholder="Ceritakan gambaran lokasi impian (tebing, pantai, sawah), gaya dekorasi, atau momen khusus yang Anda harapkan..."
                  value={formData.vision}
                  onChange={(e) => setFormData({ ...formData, vision: e.target.value })}
                  className="w-full px-4 py-2.5 bg-[#F5F1E9]/50 border border-[#EDEAE3] rounded-xl text-xs sm:text-sm text-[#2A281F] placeholder-[#8A8477] focus:outline-none focus:border-[#2A281F] transition-colors"
                />
              </div>

              {/* Submit Button (Solid Charcoal) */}
              <button
                type="submit"
                className="w-full bg-[#2A281F] text-white text-xs uppercase tracking-widest font-semibold h-11 rounded-full hover:bg-[#1e1c15] transition-colors flex items-center justify-center space-x-2 cursor-pointer shadow-md"
              >
                <span>Kirim Formulir Konsultasi</span>
                <Send size={13} />
              </button>

              {/* WhatsApp Alternative Link */}
              <div className="text-center pt-1">
                <a
                  href="https://wa.me/6281234567890?text=Halo%20Bali%20Wed,%20saya%20ingin%20konsultasi%20pernikahan%20di%20Bali"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center space-x-2 text-xs uppercase tracking-wider text-[#8A8477] hover:text-[#2A281F] transition-colors link-underline font-medium"
                >
                  <MessageCircle size={13} className="text-[#2A281F]" />
                  <span>Atau Chat Langsung via WhatsApp Concierge →</span>
                </a>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
