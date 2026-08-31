# 💍 Bali Wed — Destination Wedding Organizer (Bali)

> **Modern Luxury Destination Wedding Organizer Landing Page**  
> Didesain dengan standar editorial visual kelas dunia (terinspirasi dari *Sarah Haywood Weddings*), mengusung arsitektur *Continuous Curtain Sheet Stacking Scroll*, *Photo-First Storytelling*, dan *Lenis Heavy Damped Momentum Scrolling*.

---

## 📋 Daftar Isi

1. [Gambaran Proyek](#-gambaran-proyek)
2. [Tech Stack & Library](#-tech-stack--library)
3. [Panduan Memulai (Quick Start)](#-panduan-memulai-quick-start)
4. [Struktur Direktori & Arsitektur](#-struktur-direktori--arsitektur)
5. [Komponen Utama & Perannya](#-komponen-utama--perannya)
6. [Design System & Konvensi Wajib](#-design-system--konvensi-wajib)
7. [Aturan & Larangan Keras (Golden Rules)](#-aturan--larangan-keras-golden-rules)
8. [Panduan Pengembangan (Untuk Developer Junior)](#-panduan-pengembangan-untuk-developer-junior)
9. [Available Scripts](#-available-scripts)
10. [Dokumentasi Tambahan](#-dokumentasi-tambahan)

---

## 🌟 Gambaran Proyek

Website ini adalah landing page resmi untuk **Bali Wed** — penyedia jasa perencana pernikahan (*destination wedding organizer*) premium di Bali. Website berfokus pada:
- **Pengalaman Visual Mewah & Tenang**: Menampilkan keindahan venue eksklusif Bali (Uluwatu, Ubud, Nusa Dua, Seminyak).
- **Interaksi Halus & Berbobot**: Scroll berbobot tinggi (*heavy damped inertia*), transisi foto bertumpuk (*curtain stacking*), dan zoom hover sinematik.
- **Konversi Elegan & Non-Intrusif**: Menghindari pop-up berisik, menggunakan 1 floating CTA persisten dan navigasi anchor yang mulus.

---

## 🛠 Tech Stack & Library

| Kategori | Teknologi / Library | Keterangan |
| :--- | :--- | :--- |
| **Framework** | [Next.js 16](https://nextjs.org/) (App Router) | Server-side rendering, SEO optimal, font optimization |
| **Bahasa** | [TypeScript 5](https://www.typescriptlang.org/) | Strict mode aktif untuk keamanan tipe |
| **Styling** | [Tailwind CSS v4](https://tailwindcss.com/) | Menggunakan CSS variables & `@theme inline` tokens |
| **Smooth Scroll** | [Lenis](https://lenis.darkroom.engineering/) (`lenis`) | Momentum scroll ultra-heavy (`lerp: 0.038`, `wheelMultiplier: 0.65`) |
| **Animasi & Parallax** | [GSAP](https://greensock.com/gsap/) + ScrollTrigger | Parallax viewport & sinkronisasi scroll ticker |
| **Photo Slider** | [Embla Carousel](https://www.embla-carousel.com/) + Auto Scroll | Infinite ticker galeri horizontal tanpa jeda |
| **Ikon** | [Lucide React](https://lucide.dev/) | Ikon minimalis & konsisten |
| **Tipografi** | Google Fonts via `next/font/google` | `Libre Caslon Display` (Heading Serif) & `Inter` (Body Sans) |

---

## 🚀 Panduan Memulai (Quick Start)

### 1. Prasyarat Sistem
Pastikan perangkat kamu sudah terpasang:
- **Node.js**: Versi `18.18.0` ke atas (Direkomendasikan Node.js `20.x` LTS atau `22.x`)
- **Package Manager**: `npm`, `pnpm`, atau `yarn`
- **Git**

### 2. Instalasi Proyek
Clone repository dan pasang dependency:

```bash
# 1. Masuk ke direktori proyek
cd WeddingPlanner

# 2. Pasang semua dependensi
npm install
```

### 3. Menjalankan Server Pengembangan
```bash
npm run dev
```
Buka browser dan akses **[http://localhost:3000](http://localhost:3000)**. Halaman akan langsung me-reload otomatis saat kamu mengubah kode (*Fast Refresh*).

### 4. Menjalankan Build Produksi & Type Check
Sebelum membuat commit atau Pull Request, pastikan tidak ada error TypeScript maupun Next.js build:
```bash
npm run build
```

---

## 📁 Struktur Direktori & Arsitektur

```text
WeddingPlanner/
├── public/                     # Aset statis (gambar lokal, favicon, ikon)
├── src/
│   ├── app/
│   │   ├── favicon.ico
│   │   ├── globals.css         # Token desain (CSS variables), utilitas tirai, Lenis styles
│   │   ├── layout.tsx          # Root layout: konfigurasi font Libre Caslon/Inter & LenisProvider
│   │   └── page.tsx            # Halaman utama (Single Page Application dengan anchor sections)
│   ├── components/             # Reusable UI components
│   │   ├── ContactFormSection.tsx  # Section 07: Formulir kontak & estimasi budget
│   │   ├── Footer.tsx              # Section 08: Fixed reveal footer
│   │   ├── Hero.tsx                # Section 01: Hero cover dengan gradient scrim & fixed pin
│   │   ├── LenisProvider.tsx       # Wrapper inisialisasi Lenis & GSAP ticker
│   │   ├── Navbar.tsx              # Header navigasi transparan/glassmorphism
│   │   ├── PackageCard.tsx         # Kartu paket pernikahan editorial 2 kolom
│   │   ├── ParallaxLayer.tsx       # Reusable multi-depth parallax container
│   │   ├── PhotoGrid.tsx           # Section 05: Grid venue 3:4 portrait + inner parallax
│   │   ├── PhotoTicker.tsx         # Section 02/Gallery: Auto-scroll infinite photo ticker
│   │   ├── PriceTeaserStrip.tsx    # Strip teaser harga transparan setelah hero
│   │   ├── SectionHeading.tsx      # Komponen heading standar editorial (nomor, judul, subtitle)
│   │   ├── SectionParallaxBackground.tsx # Background parallax per-section
│   │   ├── ServiceCard.tsx         # Section 03: Kartu layanan 2 kolom + hover zoom & upward shift
│   │   ├── StickyCTAButton.tsx     # Floating button persisten di pojok kanan bawah
│   │   └── TestimonialCarousel.tsx # Section 06: Draggable carousel ulasan pasangan
│   └── lib/
│       └── scrollTo.ts         # Helper smooth scrolling Lenis berbasis ID hash (#layanan, dll)
├── AGENTS.md                   # Aturan ketat & arsitektur proyek untuk AI Agent / Developer
├── DECISIONS.md                # Log keputusan arsitektural & desain final
├── DESIGN.md                   # Spesifikasi detail UI/UX, token desain, & copy teks
├── todo.md                     # Roadmap & status pengerjaan mission
├── package.json
├── tsconfig.json
└── next.config.ts
```

---

## 🧩 Komponen Utama & Perannya

| Komponen | File | Deskripsi & Catatan Teknis |
| :--- | :--- | :--- |
| **LenisProvider** | `LenisProvider.tsx` | Mengatur inertia smooth scroll ke seluruh halaman dan menyelaraskan GSAP ScrollTrigger dengan Lenis frame ticker. |
| **Hero** | `Hero.tsx` | Tampilan awal layar penuh (`h-screen`). Foto latar diberi gradient scrim (`hero-scrim`) agar teks putih terbaca jelas tanpa menggunakan kotak card. |
| **PhotoTicker** | `PhotoTicker.tsx` | Slider foto berjalan otomatis menggunakan `embla-carousel-auto-scroll`. User dapat menahan kursor / swipe untuk pause dan drag manual. |
| **ServiceCard** | `ServiceCard.tsx` | Menampilkan layanan dalam 2 kolom seimbang (kiri: deskripsi, kanan: foto). Memiliki interaksi hover `scale(1.12)` pada foto dan translasi judul ke atas. |
| **PackageCard** | `PackageCard.tsx` | Menampilkan tier harga. Paket Signature/Unggulan diberi aksen kartu gelap kontras (`#2A281F`) dengan teks putih dan badge *"Paling Diminati"*. |
| **PhotoGrid** | `PhotoGrid.tsx` | Menampilkan 4 venue ikonik Bali dengan rasio **3:4 Portrait** (768×1024) serta efek *Inner Window Parallax* saat di-scroll. |
| **TestimonialCarousel** | `TestimonialCarousel.tsx` | Carousel horizontal testimonial dengan touch/mouse swipe, navigasi panah kiri/kanan, dan indikator titik. |
| **ContactFormSection** | `ContactFormSection.tsx` | Form interaktif dengan pilihan venue, tanggal, rentang tamu, dan budget. |
| **Footer** | `Footer.tsx` | Menggunakan arsitektur `fixed bottom-0 z-0` yang tersingkap saat section kontak terangkat naik. |
| **StickyCTAButton** | `StickyCTAButton.tsx` | Tombol mengambang tunggal di sudut kanan bawah untuk konsultasi cepat via WhatsApp / anchor form kontak. |

---

## 🎨 Design System & Konvensi Wajib

Project ini menerapkan aturan desain yang sangat ketat untuk menjaga estetika **Modern Luxury Destination**:

### 1. Palet Warna (Strict Neutral Only)
Dilarang keras menambahkan warna aksen jenuh (seperti biru laut, hijau toska, emas terang, atau terakota). Gunakan token CSS yang tersedia:

| Nama Token | Hex Code | Utility Class Tailwind / CSS Variable | Penggunaan |
| :--- | :--- | :--- | :--- |
| **White** | `#FFFFFF` | `bg-white`, `text-white`, `--color-white` | Latar section ganjil, card, teks di atas background gelap |
| **Warm Sand** | `#F5F1E9` | `bg-[#F5F1E9]`, `--color-warm-sand` | Latar section genap (Layanan, Venue, Kontak) |
| **Warm Gray** | `#EDEAE3` | `border-[#EDEAE3]`, `--color-warm-gray` | Border pemisah tipis, outline kartu |
| **Charcoal** | `#2A281F` | `text-[#2A281F]`, `bg-[#2A281F]`, `--color-charcoal` | Teks utama, background footer, kartu signature |
| **Muted Brown** | `#8A8477` | `text-[#8A8477]`, `--color-muted-brown` | Teks sekunder, label kategori, subjudul kecil |

### 2. Tipografi
- **Headings (`h1`, `h2`, `h3`)**: `Libre Caslon Display` (`font-serif` / `.font-libre-caslon`). Karakter serif display mewah dan tegas.
- **Body & UI Elements**: `Inter` (`font-sans` / `.font-inter`). Sangat mudah dibaca pada ukuran kecil hingga sedang.

### 3. Arsitektur Tirai Bertumpuk (Overlapping Curtain Scroll)
Halaman menggunakan teknik stacking layer bertingkat dengan `sticky top-0` dan penataan `z-index`:
```text
Layer 1 (Hero):        sticky top-0   z-10
Layer 2 (Cerita/Hero): sticky top-0   z-20   (bg-white, curtain-shadow-top)
Layer 3 (Layanan):     sticky top-0   z-30   (bg-[#F5F1E9], curtain-shadow-top)
Layer 4 (Paket):       sticky top-0   z-40   (bg-white, curtain-shadow-top)
Layer 5 (Venue):       sticky top-0   z-50   (bg-[#F5F1E9], curtain-shadow-top)
Layer 6 (Testimoni):   sticky top-0   z-60   (bg-white, curtain-shadow-top)
Layer 7 (Kontak):      sticky top-0   z-70   (bg-[#F5F1E9], curtain-shadow-top, margin-bottom reveal)
Layer 0 (Footer):      fixed bottom-0 z-0    (bg-[#2A281F])
```

---

## 🚫 Aturan & Larangan Keras (Golden Rules)

Harap perhatikan daftar larangan berikut sebelum melakukan modifikasi kode:

1. ❌ **JANGAN menambahkan warna aksen baru** (jangan ada warna biru, merah, gold berkilau, ungu, dll).
2. ❌ **JANGAN meletakkan box / card putih di belakang teks Hero**. Teks hero diletakkan langsung di atas foto dengan bantuan class `.hero-scrim`.
3. ❌ **JANGAN menggunakan efek Glassmorphism di atas background solid**. Efek blur/transparan (`.glass-nav`) HANYA diizinkan ketika berada mengambang di atas foto.
4. ❌ **JANGAN membuat lebih dari 1 floating / sticky button**. Cukup gunakan 1 tombol CTA di kanan bawah untuk menjaga nuansa mewah yang tidak agresif (*non-hard-sell*).
5. ❌ **JANGAN mengganti rasio foto venue sembarangan**. Format utama portofolio dan venue adalah rasio **3:4 Portrait Vertikal** (768×1024) untuk mempertahankan nuansa majalah editorial.

---

## 💡 Panduan Pengembangan (Untuk Developer Junior)

### Cara Menambahkan Section Baru
Jika kamu diminta menambahkan section baru (misalnya section FAQ atau Press/Liputan Media):
1. **Pilih warna latar**: Selang-selingkan antara `#FFFFFF` dan `#F5F1E9`.
2. **Gunakan wrapper tirai**: Berikan class `sticky top-0`, `min-h-screen`, `curtain-shadow-top`, `rounded-t-[36px] sm:rounded-t-[48px]`, dan `z-index` yang berurutan.
3. **Tambahkan clearance bawah**: Berikan padding bawah yang lega (`pb-28 sm:pb-36`) agar konten tidak tertutup section berikutnya saat menumpuk.
4. **Gunakan SectionHeading**: Selalu gunakan komponen `<SectionHeading number="0X" subtitle="..." title="..." />` untuk menjaga konsistensi hierarki judul.

### Cara Menggunakan Smooth Scroll Anchor Link
Jika membuat tombol atau navigasi ke section tertentu di halaman:
```tsx
import { scrollToId } from "@/lib/scrollTo";

// Contoh penggunaan pada tombol:
<button onClick={() => scrollToId("paket")}>
  Lihat Paket Kami
</button>
```

### Integrasi Form Kontak ke Backend / API (Mission 7)
Saat ini formulir pada `ContactFormSection.tsx` menggunakan state lokal React (`useState`). Untuk menyambungkan ke API:
1. Buat endpoint backend (misal route handler `/api/contact` atau webhook CRM / WhatsApp API).
2. Di dalam handler `handleSubmit` pada `ContactFormSection.tsx`, kirim data payload form menggunakan `fetch()` atau `axios`.
3. Tampilkan pesan feedback sukses/gagal yang elegan sesuai tone warna brand.

---

## 📜 Available Scripts

Di dalam root direktori proyek, kamu dapat menjalankan perintah berikut:

- `npm run dev` — Menjalankan Next.js development server dengan Turbopack di `http://localhost:3000`.
- `npm run build` — Mengompilasi aplikasi Next.js untuk lingkungan produksi serta memvalidasi tipe TypeScript.
- `npm run start` — Menjalankan server Next.js production build secara lokal.
- `npm run lint` — Menjalankan ESLint untuk mengecek kepatuhan kode.

---

## 📚 Dokumentasi Tambahan

Untuk panduan mendalam lainnya, silakan pelajari file-file dokumentasi berikut:
- **[`DESIGN.md`](./DESIGN.md)**: Spesifikasi visual lengkap, breakdown per section, copy text, dan aturan transisi.
- **[`DECISIONS.md`](./DECISIONS.md)**: Riwayat keputusan teknis & arsitektur final (jangan diubah tanpa diskusi arsitek).
- **[`AGENTS.md`](./AGENTS.md)**: Standar kerja coding agent dan guardrails proyek.
- **[`todo.md`](./todo.md)**: Status pengerjaan mission saat ini dan backlog berikutnya.

---

*Dibuat dengan ❤️ untuk perayaan cinta terbaik di Pulau Dewata, Bali.*

