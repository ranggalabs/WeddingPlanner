# todo.md — Progress Tracker

Update file ini di akhir tiap mission. Hapus/ringkas entri lama yang sudah selesai kalau daftar mulai panjang — jangan biarkan menumpuk.

## Mission roadmap

- [x] **Mission 1 — Scaffold**: Next.js + font Libre Caslon Display/Inter + design tokens (CSS variables warna) + install Lenis & GSAP
- [x] **Mission 2 — Komponen dasar**: Navbar, Button, ServiceCard (2 kolom dengan Stacking Card effect), PhotoGrid, StickyButton
- [x] **Mission 3 — Halaman Home**: semua section tersusun sesuai DESIGN.md §5 (hero → teaser harga → hooks → grid → service card stacking → paket → venue grid → testimoni → contact form)
- [x] **Mission 4 — Penyesuaian CSS/visual**: Penggantian font heading dari Fraunces ke Libre Caslon Display (Google Fonts) di seluruh komponen & halaman (DECISIONS.md #011).
- [x] **Mission 5 — Animasi & Interaksi**: Multi-Layer Parallax Scroll di seluruh section (`ParallaxLayer.tsx`: Deep, Back, Base, Fore depth layers), Lenis Ultra-Heavy Damped Smooth Scroll (`lerp: 0.038`, `wheelMultiplier: 0.65`, `smoothWheel: true` khusus sensasi berat 1:1 Sarah Haywood), GSAP ScrollTrigger parallax sinkron dengan Lenis ticker, Auto-scroll Photo Ticker (`embla-carousel-react` + `embla-carousel-auto-scroll`), Stacking Card Effect di Layanan Utama (DECISIONS.md #012)
- [x] **Mission 6 — Halaman lain**: Galeri, Jurnal/Blog, Kontak (sudah diimplementasikan)
- [ ] **Mission 7 — CMS integration**: sambungkan ke backend/API, ganti data dummy jadi data dari database

## Catatan status terakhir
- **Harmonisasi CSS (`globals.css`) & Curtain Elevation**:
  - Palet background solid selang-seling terkonfigurasi rapi: Hero (`#2A281F` base/scrim), Intro (`#FFFFFF`), Layanan (`#F5F1E9`), Paket (`#FFFFFF`), Venue (`#F5F1E9`), Testimoni (`#FFFFFF`), Kontak (`#F5F1E9`), Footer (`#2A281F`).
  - Ditambahkan utility class `.curtain-shadow-top` dan `.curtain-shadow-bottom` untuk efek bayangan tirai elevasi yang lembut.
  - Dioptimalkan transisi foto `.photo-zoom-image` dengan kurva `cubic-bezier(0.16, 1, 0.3, 1)` agar zoom halus tanpa lag saat berpadu dengan momentum scroll Lenis.
  - Scrim overlay (`hero-scrim`, `venue-scrim`) dan link underline animation (`link-underline`).
- **Redesain Editorial Modern-Luxury (`#layanan`, `#paket`, `#venue`)**:
  - **Layanan Utama (`ServiceCard.tsx`)**: Layout 50-50 seimbang, tinggi foto editorial lapang (`min-h-[420px]`), badge nomor editorial melayang, checklist bullet charcoal, dan link interaktif *"Diskusi Perencanaan →"*.
  - **Paket Layanan (`PackageCard.tsx`)**: Header foto tinggi (`h-64 sm:h-68`), badge status *"Paling Populer"* / *"Eksklusif"*, tipografi harga `Libre Caslon Display` tegas, dan tombol CTA full-width elegan.
  - **3:4 Portrait Ratio & Inner Window Parallax Scroll (`PhotoGrid.tsx`)**: Mengimplementasikan rasio foto `3:4 Portrait Vertikal` (768×1024) persis seperti referensi `sarahhaywood.com/weddings` (Destinations) dengan efek *GSAP Inner Window Parallax* (`h-[130%] -top-[15%]`, `yPercent: -15`, `scrub: 0.6`).
- **4 Venue Ikonik Bali**: Alila Villas Cliff Pavilion, Mandapa Jungle Sanctuary, The Mulia Glasshouse Pavilion, dan Bulgari Resort Ocean Terrace.
- **Overlapping Curtain Scroll Architecture (1:1 Sarah Haywood)**:
  - Hero fixed pin di background layer (`sticky top-0 z-10 h-screen`).
  - Setiap section berikutnya (02 Cerita, 03 Layanan, 04 Paket, 05 Venue, 06 Testimoni, 07 Kontak) meluncur naik dan menumpuk secara alami (`relative z-20 s/d z-70`) dengan bayangan elevasi tirai (`curtain-shadow-top` & `rounded-t-[36px] sm:rounded-t-[48px]`).
  - Seluruh isi konten, card, foto 3:4 portrait, checklist, dan tombol CTA kini dapat di-scroll 100% penuh hingga bagian terbawah tanpa ada yang terpotong prematur atau membeku di viewport!
  - Footer fixed di bagian paling dasar (`z-0`) yang tersingkap saat tirai formulir kontak terangkat ke atas.
- **Continuous Curtain Sheet Stacking Scroll & Generous Bottom Clearance**:
  - Setiap section (01 Hero, 02 Cerita, 03 Layanan, 04 Paket, 05 Venue, 06 Testimoni, 07 Kontak) menggunakan `sticky top-0` dengan ascending `z-index` (10 s/d 70), `min-h-screen`, dan `curtain-shadow-top shadow-[0_-30px_60px_rgba(0,0,0,0.22)]`.
  - Ditambahkan **jarak bawah yang sangat lega (*generous bottom clearance*)**: `pt-16 sm:pt-20 md:pt-24 pb-24 sm:pb-28 md:pb-36` di setiap section dan `pb-28 sm:pb-36 md:pb-44 mb-[380px]` di Kontak sehingga seluruh card terlihat lapang, santai, dan megah saat bertumpuk.
  - Section baru selalu masuk meluncur dari bawah menutupi section sebelumnya secara bertumpuk, dan Section Kontak menyingkap Footer di dasarnya (`fixed bottom-0 z-0`).
- **Efek Background Hover Zoom `scale(1.12)` & Title Upward Shift pada ServiceCard (`#layanan`)**:
  - Parallax scrub pada foto kartu layanan disederhanakan dan digantikan dengan efek **Background Hover Zoom & Scale**: saat kursor disorotkan ke atas kartu portofolio, gambar latar belakang membesar perlahan (**`transform: scale(1.12)`** dengan kurva `cubic-bezier(0.16, 1, 0.3, 1)`).
  - Teks judul (`<h3>`) secara responsif bergeser sedikit ke atas (**`group-hover:-translate-y-1.5`**) untuk memberikan sensasi kedalaman editorial modern.
  - Kartu tetap tampil dengan layout vertikal penuh (Card 1 di atas, Card 2 di bawahnya) serta transisi *Continuous Curtain Stacking Scroll* yang mulus.
- **Pure Single-Page Architecture**: 0 Build Errors (`npm run build` lulus).
- Server dev berjalan di http://localhost:3000.
