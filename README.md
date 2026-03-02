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
- 📬 Contact form with service selection
- 🏷️ Tech stack with categorized tabs
- ⏱️ Experience timeline
