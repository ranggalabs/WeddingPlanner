# DESIGN.md — Bali Wedding Organizer

Dokumen ini adalah sumber kebenaran tunggal (single source of truth) untuk desain visual website. Semua AI coding agent (Google Antigravity, Claude Code, dll) dan AI generatif visual (Google Stitch, Midjourney, dll) WAJIB merujuk ke dokumen ini agar hasil konsisten. Jangan berimprovisasi di luar spesifikasi yang tertulis di sini.

---

## 1. Brand brief

Wedding organizer yang berbasis di Bali, menjual destination wedding. Positioning: modern-luxury editorial, bukan tradisional/ramai. Pesan utama: "Bali bukan sekadar lokasi, tapi cerita yang akan diingat."

**Prinsip desain utama: PHOTO-FIRST**
- Foto adalah konten utama (80% ruang halaman), bukan teks.
- Teks hanya berfungsi sebagai label/caption singkat, menimpa langsung di atas foto (bukan di dalam card/panel) — kecuali disebutkan lain di bawah.
- Pengecualian: section **Paket Layanan** dan **card layanan** (wedding planning, venue & dekorasi) — di sini teks boleh lebih deskriptif karena ini titik keputusan (decision point), bukan titik "menjual mimpi".

---

## 2. Warna — FINAL: white-only palette (revisi dari draf awal)

> Catatan penting untuk agent: draf awal project ini sempat memakai palet warna (teal/gold/terracotta). Itu SUDAH DIBATALKAN. Versi final memakai palet putih/netral saja seperti di bawah ini.

| Nama | Hex | Fungsi |
|---|---|---|
| Putih | `#FFFFFF` | Background dasar utama |
| Warm sand | `#F5F1E9` | Background alternatif section (paket, testimoni) |
| Warm gray terang | `#EDEAE3` | Background pembungkus card group, divider |
| Charcoal teks | `#2A281F` | Warna teks utama & elemen gelap solid (card highlight, tombol, navbar teks) |
| Muted brown teks sekunder | `#8A8477` | Teks sekunder/deskripsi, placeholder input |
| Placeholder foto (SEBELUM foto asli terpasang) | gradasi `#2b2620` → `#7d7358` (warm neutral gelap) | HANYA dipakai sebagai placeholder. Begitu foto asli terpasang, warna ini tidak lagi relevan — foto asli yang menentukan warna visual halaman. |
| Glass putih | `rgba(255,255,255,0.5–0.55)` | Kaca glassmorphism, blur 12–16px, dipakai SANGAT selektif (lihat aturan di bawah) |

**Aturan pemakaian warna (WAJIB diikuti):**
1. TIDAK ADA warna aksen berwarna (tidak ada teal, gold, terracotta, atau warna lain). Hanya putih, warm neutral, dan charcoal.
2. Glassmorphism HANYA dipakai untuk elemen yang mengambang LANGSUNG di atas foto (navbar di atas hero photo). JANGAN pakai glass di atas background putih/polos — efeknya tidak akan terlihat dan hanya menambah kompleksitas tanpa manfaat visual.
3. Teks di atas hero/foto TIDAK memakai card/panel — teks langsung menimpa foto, dibantu gradient scrim gelap tipis (`linear-gradient(to top, rgba(0,0,0,0.55), rgba(0,0,0,0.05) 45%, transparent 65%)`) di belakangnya untuk keterbacaan, BUKAN kotak/panel solid.

---

## 3. Tipografi (WAJIB, jangan diganti)

> Revisi: heading awalnya Fraunces, DIGANTI ke Libre Caslon Display — alternatif gratis dengan karakter paling dekat dengan Meno Banner (font referensi sarahhaywood.com, berbayar/tidak dipakai di project ini). Lihat DECISIONS.md #011.

- **Heading / editorial voice**: `Libre Caslon Display` (Google Fonts), dipakai untuk semua judul.
- **Body / UI text**: `Inter` (Google Fonts), dipakai untuk navbar, caption, deskripsi, form, tombol.
- Import via `next/font/google` di Next.js.

---

## 4. Komponen kunci (checklist implementasi)

- [ ] **Navbar**: pill shape, glass putih transparan (blur 14px), posisi fixed/sticky di atas hero saat scroll pertama, logo tengah, menu kiri ("MENU"), link kanan (termasuk link langsung ke section "Paket").
- [ ] **Hero**: foto full-bleed, teks (judul + subjudul) menimpa langsung di atas foto dengan gradient scrim di belakangnya, TANPA card/panel.
- [ ] **Price teaser strip**: strip solid gelap (`#2A281F`) tepat di bawah hero, isi: teks harga mulai dari + link "lihat paket" yang lompat ke section Paket. Selalu ada di setiap halaman yang punya hero, bukan cuma Home.
- [ ] **Section heading**: label kecil uppercase letter-spacing (warna `#8A8477`) + judul besar Libre Caslon Display, rata tengah.
- [ ] **Photo grid (4 kolom)**: aspect-ratio 1:1, gap kecil (~7px), border-radius 6px, animasi hover-zoom (`scale(1.04)`) dan scroll-reveal (stagger, delay ~60-90ms antar item).
- [ ] **Service card (editorial, 2 kolom)**: background putih, dalam pembungkus `#EDEAE3`. Kolom kiri = judul + deskripsi (lebar ~55%, teks panjang wrap ke bawah, TIDAK menyentuh foto). Kolom kanan = foto (area terpisah, tidak tertimpa teks apa pun). Dipakai untuk section layanan (wedding planning, venue & dekorasi).
- [ ] **Package card**: layout SAMA seperti service card (teks kiri, foto kanan) — bukan card vertikal biasa. 3 card berjejer vertikal: nama paket + harga (baris atas, align kiri-kanan) + deskripsi singkat di kolom kiri, foto di kolom kanan. Paket tengah/unggulan pakai background solid charcoal `#2A281F` dengan badge putih "paling diminati", 2 paket lain background putih border tipis.
- [ ] **Testimonial carousel**: horizontal scroll dengan `scroll-snap-type: x proximity`, draggable via mouse (mousedown/mousemove/mouseup mengubah `scrollLeft`) dan native touch-swipe di mobile. Tiap card: avatar (foto bulat), nama pasangan, lokasi+tahun nikah, kutipan singkat.
- [ ] **Contact form**: nama lengkap, email (dengan ikon), tanggal pernikahan + jumlah tamu (2 kolom sejajar), textarea visi pernikahan, tombol submit solid charcoal, plus link alternatif "chat via WhatsApp" di bawah tombol.
- [ ] **Sticky CTA button**: floating, fixed di pojok kanan bawah viewport, teks "Konsultasi Gratis", selalu terlihat selama scroll di SELURUH halaman (bukan cuma Home). Ini SATU-SATUNYA sticky button — jangan tambah sticky button lain di tempat lain (hindari kesan "banyak tombol jualan").
- [ ] **Underline link animation**: semua link teks (bukan tombol solid) pakai underline yang tumbuh dari kiri ke kanan saat hover (`background-size` 0% → 100%), bukan underline statis.
- [ ] **Auto-scroll photo ticker** (referensi sarahhaywood.com, elemen intro gallery di bawah hero): baris foto yang auto-scroll terus-menerus ke kiri dengan kecepatan konstan (seperti ticker/marquee), BUKAN carousel per-slide biasa.
  - Tinggi foto fixed per breakpoint, LEBAR foto mengikuti rasio asli (jangan crop paksa ke rasio seragam): desktop/tablet ≥1000px → `height: 50vh`; 690–1000px → `height: 40vh`; ≤690px (mobile) → `height: 250px` fixed.
  - Auto-scroll berjalan otomatis saat idle (`autoplay: true`).
  - Ada indikator drag custom (lingkaran kecil mengikuti kursor, bukan tombol panah).
  - Saat user klik-tahan/sentuh, auto-scroll BERHENTI otomatis dan user bisa geser manual (drag mouse atau swipe touch) ke kiri/kanan.
  - Saat dilepas, auto-scroll boleh lanjut lagi setelah jeda singkat.
  - Implementasi: pakai library carousel yang support drag+autoplay (misal Flickity, Embla Carousel, atau Swiper.js) — jangan bikin dari nol kalau tidak perlu, supaya perilaku drag/momentum-nya matang dan tidak buggy.

---

## 5. Struktur halaman FINAL

### Home (urutan wajib, jangan diubah urutannya)
1. Navbar (glass, sticky)
2. Hero — foto full-bleed, teks langsung di foto (judul + subjudul)
3. Price teaser strip
4. Section heading + deskripsi singkat ("setiap pernikahan punya cerita sendiri")
5. Photo grid 4 kolom ("kenapa Bali" — venue-venue ikonik)
6. 2 service card editorial (wedding planning, venue & dekorasi) dalam pembungkus abu muda
7. Section Paket Layanan — 3 package card (format sama seperti service card)
8. Heading "VENUE WEDDING" + photo grid 4 kolom lagi
9. Section Testimoni — heading + carousel draggable (minimal 4 dummy data)
10. Section Contact Us — form lengkap (lihat komponen di atas)
11. Sticky CTA button (persisten dari section 1 sampai akhir)

### Galeri
1. Navbar
2. Heading + filter kategori (pill button: semua/pantai/tebing/sawah/tradisional)
3. Grid masonry foto (rasio campuran 4:5/1:1/3:4, TANPA glass/overlay teks kecuali link "muat lebih banyak")

### Jurnal/Blog
1. Navbar
2. 1 artikel unggulan besar (foto + kategori label + judul)
3. Grid artikel lain (2 kolom, foto + kategori + judul singkat)

### Kontak (halaman khusus, terpisah dari section Contact di Home — untuk multi-page nav)
Sama seperti section Contact Us di Home, tapi jadi halaman berdiri sendiri dengan hero kecil di atasnya.

---

## 6. Panduan foto (KRITIS)

- **Pencahayaan**: golden hour / natural warm light, hindari flash/studio-look.
- **Color grading**: warm, sedikit desaturasi di shadow — konsisten di semua foto seolah dari satu photographer.
- **Gaya**: candid-editorial, bukan pose kaku katalog.
- **Lokasi**: Uluwatu (tebing), Ubud (sawah), Nusa Dua (pantai), resort/villa tepi laut.
- **Jangan** paksakan "pasangan yang sama" berulang di semua foto (foto AI-generate akan selalu beda orang) — fokus konsistensi ke lighting & color grading, bukan wajah.
- **Rasio**: variasikan (hero lebar, grid 1:1, service/package card foto mendekati persegi, galeri masonry campuran) — jangan semua foto rasio sama.

---

## 7. Prompt untuk Google Stitch (copy-paste langsung, sudah update ke palet white-only)

```
Design a modern luxury destination wedding website for a Bali-based wedding
organizer called "Bali Wed". Follow these rules strictly and consistently
across every page/screen — do not invent new colors or fonts.

DESIGN PRINCIPLE: Photo-first, ~80% of each screen is photography. Text
overlays photos DIRECTLY (no card/panel) except in the Packages and Service
sections, which use plain white/light backgrounds with denser text and a
two-column layout (text left, photo right, photo never overlapped by text).

COLOR PALETTE — WHITE-ONLY, no colored accents at all:
- White: #FFFFFF
- Warm sand background: #F5F1E9
- Warm gray wrapper background: #EDEAE3
- Charcoal (text, solid dark elements, buttons): #2A281F
- Muted brown secondary text: #8A8477
- Glass panels (ONLY on top of photos, e.g. navbar): white 50-55% opacity,
  backdrop blur 12-16px, 0.5px white border at 65% opacity

TYPOGRAPHY: Headings in Libre Caslon Display (serif). Body/UI text in
Inter (sans-serif).

HERO: full-bleed photo, title and subtitle text directly overlaid on the
photo (no card), with a dark gradient scrim behind the text for legibility.
Glass navbar (pill-shaped, blurred, floating) on top of the hero photo.

PHOTOGRAPHY STYLE: golden hour warm natural light, candid editorial (not
catalog poses), warm slightly desaturated color grading, consistent across
every image. Bali locations only: Uluwatu clifftop, Ubud rice terraces,
Nusa Dua beach, oceanfront resort/villa. Vary aspect ratios, do not use
identical square crops everywhere.

SECTIONS TO GENERATE (same navbar/colors/fonts across all):
1. Home — hero (as above) → price teaser strip (solid dark bar, price +
   "see packages" link) → heading + short intro text → 4-photo grid → two
   editorial service cards (title+description on the left in a constrained
   column, photo on the right, wrapped in a light gray container) →
   Packages section: 3 stacked cards in the same left-text/right-photo
   layout, middle one highlighted with a solid dark background and a white
   "most popular" badge → "Venue Wedding" heading + another 4-photo grid →
   testimonials as a horizontally scrollable card carousel (avatar, couple
   name, location+year, short quote) → contact section with a form (name,
   email, wedding date, guest count, message textarea, submit button, and
   a WhatsApp link below it). A floating "Konsultasi Gratis" button stays
   fixed in the bottom-right corner across the whole page.
2. Gallery — filter pills at top, masonry photo grid below, no overlays.
3. Journal/Blog — one large featured article card, grid of smaller article
   cards below.

CONSISTENCY REQUIREMENT: Same navbar, same white-only color system, same
fonts, same glass rule (glass only directly over photos) on every page.
```

---

## 8. Animasi & interaksi

Referensi gerakan: sarahhaywood.com/weddings (luxury editorial motion). WAJIB dipakai konsisten di semua halaman.

| Efek | Library/teknik | Penerapan |
|---|---|---|
| Smooth momentum scroll | `lenis` | Bungkus seluruh halaman |
| Scroll parallax | `gsap` + `ScrollTrigger` | Hero & section foto besar |
| Stagger entrance | `IntersectionObserver` + delay bertingkat (60–90ms) atau `gsap` stagger | Semua grid foto & card, saat masuk viewport |
| Hover zoom pada foto | CSS `transform: scale(1.04)` + `transition` | Semua foto (grid, service card, package card) |
| Underline animasi kiri-ke-kanan | CSS `background-size` + `transition` | Semua link teks (bukan tombol solid) |
| Drag horizontal | JS mousedown/mousemove + native touch scroll, `scroll-snap-type: x proximity` | Carousel testimoni |
| Clip-path/mask reveal (opsional, untuk hero) | CSS `clip-path: inset()` dianimasikan | Transisi masuk hero saat halaman dimuat |

Catatan SEO: semua animasi client-side, tidak menghalangi Next.js SSR/SSG merender HTML duluan — aman untuk SEO selama tidak ada teks penting yang HANYA muncul setelah animasi/interaksi tanpa fallback.

---

## 9. Roadmap implementasi untuk AI coding agent (Google Antigravity / Claude Code)

Jangan kerjakan semua sekaligus dalam satu mission. Ikuti urutan ini, minta verifikasi/screenshot di akhir tiap mission sebelum lanjut:

1. **Scaffold** — Next.js (App Router, TypeScript), setup font Libre Caslon Display+Inter, CSS variables untuk semua warna di Section 2, install Lenis + GSAP.
2. **Komponen dasar** — Navbar, Button, ServiceCard (2 kolom), PhotoGrid, StickyButton — sesuai checklist Section 4.
3. **Halaman Home** — susun sesuai urutan Section 5, pakai data dummy untuk foto (placeholder gradient warna netral dari Section 2) dan teks dummy dari mockup yang sudah dibuat.
4. **Animasi** — pasang Lenis, ScrollTrigger, stagger reveal, hover zoom, underline hover sesuai Section 8.
5. **Halaman lain** — Galeri, Jurnal/Blog, Kontak — reuse komponen dari mission 2. Terapkan juga auto-scroll photo ticker (Section 4) di halaman Galeri dan/atau section foto yang relevan di Home.
6. **CMS integration** — setelah semua UI statis final, baru sambungkan ke backend/API (di luar scope dokumen ini).

---

## 10. Catatan implementasi

- Font Libre Caslon Display & Inter tersedia gratis di Google Fonts, import via `next/font/google`.
- Efek glass murni CSS (`backdrop-filter: blur()`), tidak butuh library tambahan.
- Foto placeholder (gradasi warna netral gelap) HANYA untuk tahap development/mockup. Untuk produksi final, gunakan foto asli dokumentasi pernikahan klien atau foto profesional venue — foto AI-generated berisiko terlihat tidak autentik untuk industri yang sangat bergantung pada kepercayaan visual seperti wedding organizer.
