# DECISIONS.md — Log Keputusan Final

Setiap entri = keputusan yang SUDAH final, jangan dipertanyakan ulang oleh agent kecuali diminta eksplisit oleh pemilik project. Format: singkat, 2-3 baris per entri.

---

**001 — Tech stack terpisah untuk landing page vs admin dashboard**
Landing page pakai Next.js (butuh SSR/SSG untuk SEO). Admin dashboard pakai React+Vite+TS terpisah (tidak butuh SEO, SPA biasa cukup). Keduanya konsumsi API yang sama dari backend Express/Fastify — backend TIDAK ditaruh di dalam Next.js API routes.

**002 — Prinsip desain: photo-first**
Foto mendominasi ~80% tiap halaman, teks jadi caption singkat. Pengecualian: section Paket & card layanan (wedding planning, venue&dekorasi) boleh lebih deskriptif karena ini decision point, bukan bagian "menjual mimpi".

**003 — Palet warna: white-only (SUPERSEDES draf awal teal/gold/terracotta)**
Draf awal sempat pakai palet warna (teal laut, gold, terracotta). Ini SUDAH DIBATALKAN. Final: putih, warm sand, warm gray, charcoal saja — tanpa warna aksen berwarna. Lihat DESIGN.md §2 untuk hex lengkap.

**004 — Glassmorphism dipakai selektif, bukan di semua tempat**
Glass effect (blur+transparan) HANYA untuk elemen yang mengambang di atas foto (contoh: navbar di atas hero). Tidak dipakai di atas background polos.

**005 — Hero: teks langsung di foto, tanpa card**
Awalnya hero pakai glass card untuk teks. Diubah: teks judul+subjudul menimpa langsung di atas foto, dibantu gradient scrim gelap tipis untuk keterbacaan — bukan panel/kotak.

**006 — Service card & package card: layout editorial 2 kolom**
Terinspirasi dari sarahhaywood.com/weddings. Kolom kiri = judul+deskripsi (lebar terbatas, teks panjang wrap ke bawah, tidak menyentuh foto). Kolom kanan = foto, area terpisah. Dipakai untuk card layanan DAN card paket (bukan cuma salah satu).

**007 — Section Paket: 3 card berjejer, bukan tabel harga**
Format sama seperti service card (teks kiri, foto kanan). Paket tengah (signature) di-highlight dengan background solid gelap + badge "paling diminati".

**008 — Konversi: 1 sticky button saja, bukan banyak CTA**
Floating button "Konsultasi Gratis" di pojok kanan bawah, persisten di seluruh halaman. Sengaja dibatasi 1 saja (bukan banyak tombol) untuk menghindari kesan hard-sell. Ditambah: teaser harga strip setelah hero + link "Paket" di navbar sebagai jalur konversi sekunder.

**009 — Testimoni: carousel horizontal draggable, bukan grid statis**
Ditaruh di bawah section Venue Wedding. Draggable via mouse-drag (desktop) dan native swipe (mobile), pakai scroll-snap.

**010 — Animasi: referensi sarahhaywood.com**
Smooth scroll (Lenis), scroll parallax (GSAP ScrollTrigger), stagger entrance saat scroll, hover zoom di semua foto, underline animasi kiri-ke-kanan di link. Semua client-side, tidak mengganggu SSR/SEO.

**011 — Font heading: Libre Caslon Display (SUPERSEDES Fraunces)**
Font asli sarahhaywood.com adalah Meno Banner (Lipton Letter Design/The Type Founders) — berbayar, hanya lewat Adobe Fonts atau beli lisensi web langsung. Project ini TIDAK memakai Meno Banner. Diganti ke `Libre Caslon Display` (Google Fonts, gratis), alternatif dengan karakter oldstyle-display paling dekat. Font body (Inter) tidak berubah.

**012 — Auto-scroll photo ticker (komponen baru, referensi sarahhaywood.com)**
Baris foto auto-scroll ke kiri terus-menerus (bukan carousel per-slide), tinggi foto fixed per breakpoint tapi lebar mengikuti rasio asli foto. User bisa klik-tahan untuk stop auto-scroll dan drag manual, dengan indikator drag custom (lingkaran ikuti kursor). Detail teknis lengkap ada di DESIGN.md §4. Pakai library carousel matang (Flickity/Embla/Swiper), jangan build custom dari nol.
