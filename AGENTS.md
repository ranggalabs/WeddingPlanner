# AGENTS.md — Bali Wedding Organizer

Aturan kerja untuk AI coding agent (Antigravity, Claude Code, dll) di project ini. Baca `DESIGN.md` untuk semua keputusan visual/UI — jangan diulang di sini, jangan dideskripsikan ulang.

## Sebelum mulai kerja
- Baca `docs/DECISIONS.md` — jangan mempertanyakan ulang atau membalikkan keputusan yang sudah tercatat final di sana.
- Baca `tasks/todo.md` — cek status mission terakhir sebelum mulai yang baru.

## Tech stack (jangan diganti tanpa persetujuan eksplisit)
- Landing page: Next.js (App Router, TypeScript)
- Admin dashboard: React + Vite + TypeScript (project terpisah, jangan digabung ke Next.js)
- Backend: Node.js + Express/Fastify + TypeScript + Prisma + PostgreSQL
- Media storage: Cloudinary/S3

## Konvensi kode
- TypeScript strict mode.
- Warna HANYA dari CSS variables yang sudah didefinisikan di design tokens — jangan hardcode hex baru, jangan improvisasi warna aksen (lihat larangan di bawah).
- Font: Libre Caslon Display (heading) & Inter (body) via `next/font/google` — jangan ganti/tambah font lain. (Revisi: sebelumnya Fraunces, lihat DECISIONS.md #011)
- Komponen reusable ditaruh di `components/`, jangan duplikasi style yang sama di banyak file.

## Larangan keras (sering jadi sumber error di project ini)
- JANGAN tambahkan warna aksen berwarna (teal, gold, terracotta, dsb). Palet final: white-only + charcoal + warm neutral (lihat DESIGN.md §2).
- JANGAN taruh card/panel di belakang teks hero. Teks hero menimpa langsung di atas foto + gradient scrim.
- JANGAN pakai efek glassmorphism di atas background polos/putih — hanya di atas foto.
- JANGAN buat lebih dari 1 sticky/floating button di halaman yang sama.

## Setelah selesai satu mission
- Jalankan dev server, screenshot/verifikasi hasil secara visual sebelum lapor selesai.
- Update `tasks/todo.md` — centang mission yang selesai.
- Kalau ada keputusan besar baru yang diambil selama proses (misal ganti library), catat singkat di `docs/DECISIONS.md`.
