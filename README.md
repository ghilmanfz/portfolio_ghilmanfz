# Portfolio - Creative Web Design

A modern portfolio website inspired by [juncie.com](https://juncie.com/), built with Next.js 14, TypeScript, Tailwind CSS, and Framer Motion.

## Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Animations:** Framer Motion
- **Icons:** Lucide React + Simple Icons CDN
- **Fonts:** Inter + JetBrains Mono (Google Fonts)

## Pages

| Route | Description |
|-------|-------------|
| `/` | Home - Hero, About, Services, Tech Universe, Featured Projects, Contact |
| `/about` | About - Story, Stats, Technologies, Career Highlights, Core Values |
| `/experience` | Experience - Timeline, Core Expertise |
| `/work` | Work - Project gallery with filters |
| `/contact` | Contact - Contact form |

## Getting Started

```bash
# Install dependencies
npm install

# Run development server
npm run dev

# Build for production
npm run build

# Start production server
npm start
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout with Navbar & Footer
│   ├── page.tsx            # Home page
│   ├── globals.css         # Global styles & Tailwind
│   ├── about/page.tsx      # About page
│   ├── experience/page.tsx # Experience page
│   ├── work/page.tsx       # Work/Portfolio page
│   └── contact/page.tsx    # Contact page
├── components/
│   ├── Navbar.tsx           # Sticky navigation
│   ├── Hero.tsx             # Hero section with animations
│   ├── About.tsx            # About me section
│   ├── Services.tsx         # Services grid
│   ├── TechUniverse.tsx     # Tech stack with tabs
│   ├── FeaturedProjects.tsx # Project showcase
│   ├── ContactForm.tsx      # Contact form
│   ├── Footer.tsx           # Footer
│   └── AnimateInView.tsx    # Reusable animation wrapper
└── data/
    ├── services.ts          # Services data
    ├── techStack.ts         # Technology stack data
    ├── projects.ts          # Projects data
    └── experience.ts        # Experience & expertise data
```

## Customization

- Edit data files in `src/data/` to update content
- Modify colors in `tailwind.config.ts`
- Replace placeholder images with actual photos in components
- Update contact email in `ContactForm.tsx`

## Features

- 🌙 Dark theme
- ✨ Smooth scroll animations (Framer Motion)
- 📱 Fully responsive (mobile-first)
- 🎨 Glass-morphism card effects
- 🔍 Project filtering system
- 📬 Contact form → redirect ke WhatsApp + deteksi negara dari IP
- 🏷️ Tech stack with categorized tabs
- ⏱️ Experience timeline

---

## 📤 Cara Push ke GitHub

### Pertama kali (repository baru / kosong)

```bash
git init
git add .
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/ghilmanfz/portfolio_ghilmanfz.git
git push -u origin main
```

---

### Push biasa (setelah ada perubahan)

```bash
# 1. Cek file apa saja yang berubah
git status

# 2. Stage semua perubahan
git add .

# 3. Commit dengan pesan yang jelas
git commit -m "deskripsi perubahan kamu"

# 4. Push ke GitHub
git push origin main
```

---

### Push ke repository yang sudah ada isinya (pertama kali dari lokal baru)

Situasi: repository di GitHub sudah ada isinya, tapi kamu belum pernah push dari komputer ini.

```bash
# 1. Pastikan remote sudah terset
git remote -v

# Kalau belum ada, tambahkan:
git remote add origin https://github.com/ghilmanfz/portfolio_ghilmanfz.git

# 2. Pull dulu untuk sinkron dengan GitHub (hindari konflik)
git pull origin main --allow-unrelated-histories

# 3. Selesaikan konflik jika ada, lalu:
git add .
git commit -m "merge with remote"

# 4. Push
git push origin main
```

---

### ⚠️ Force push (ganti semua isi GitHub dengan versi lokal)

> Hati-hati! Ini akan **menimpa** semua yang ada di GitHub.
> Gunakan hanya kalau kamu yakin versi lokal adalah yang benar.

```bash
git push origin main --force
```

Atau kalau ingin mulai dari history bersih (tanpa history lama):

```bash
# Buat branch baru tanpa history
git checkout --orphan clean-main

# Stage dan commit semua file
git add .
git commit -m "clean commit"

# Force push branch baru ke main di GitHub
git push origin clean-main:main --force

# Sekarang lokal kamu sudah di branch clean-main, rename ke main
# (jalankan npm run dev dulu untuk cek, lalu push biasa berikutnya)
```

---

### Upload gambar baru (setelah tambah gambar via Admin Panel)

Karena gambar di-simpan di `public/images/`, setiap kali upload gambar baru lewat admin, perlu di-commit agar muncul di Netlify/produksi:

```bash
git add public/images public/cv
git commit -m "chore: add new uploaded images"
git push origin main
```

Setelah push, Netlify akan otomatis redeploy dan gambar akan muncul.

---

### Tips

| Perintah | Fungsi |
|---|---|
| `git status` | Lihat file yang berubah |
| `git log --oneline` | Lihat history commit |
| `git diff` | Lihat detail perubahan |
| `git restore .` | Batalkan semua perubahan yang belum di-commit |
| `git remote -v` | Cek URL remote origin |

