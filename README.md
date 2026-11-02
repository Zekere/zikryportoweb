# Zikry Dwi Maulana — Midnight Teal Portfolio

Portfolio Next.js App Router (TypeScript, Tailwind, Motion, next-intl, next-themes) dengan Dark Mode dan Bahasa Indonesia sebagai pilihan awal.

## Menjalankan di VS Code

```bash
npm install
npm run dev
```

Buka http://localhost:3000 (Indonesia), atau http://localhost:3000/en (English).

## Pembaruan yang disertakan

- Nama dan layout Hero: **ZIKRY** / **DWI MAULANA**, terpusat dan responsif.
- Logo monogram menjadi **Z.** (Navbar dan Footer).
- Hero memakai placeholder foto sampai aset tersedia, tanpa request gambar yang tidak ada.
- Skills: logo hanya untuk Frontend dan Backend & Database (`react-icons`), Mobile serta Design & Tools tetap teks.
- Pengaturan `src/proxy.ts` untuk next-intl.
- ThemeProvider default dark.

## Daftar file gambar

- `public/images/profile/hero-portrait.webp` — foto Hero. Sesudah file tersedia, ubah `showPortrait: true` di `src/data/profile.ts`.
- `public/images/illustrations/developer-minimal.svg` — ilustrasi About (saat ini About menggunakan placeholder CSS).
- `public/images/projects/absensi-web.webp` — screenshot website absensi.
- `public/images/projects/nexttoys-mobile.webp` — screenshot Android NextToys.
- `public/images/designs/affinity-poster-01.webp` — contoh karya desain Affinity.

## Update konten

- `src/data/profile.ts` — identitas, foto, status, email.
- `src/data/socials.ts` — URL Instagram, GitHub, LinkedIn.
- `src/data/projects.ts` — proyek dan karya desain.
- `src/data/skills.ts` — teknologi serta status pembelajaran.
- `src/messages/id.json` dan `en.json` — teks dua bahasa.

**Catatan:** data proyek serta tautan sosial contoh perlu dilengkapi sebelum publikasi. Proyek ini dibuat agar berjalan tanpa gambar; gambar belum dipakai kecuali foto Hero setelah diaktifkan.
