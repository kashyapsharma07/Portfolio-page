# Kashyap Sharma — Portfolio

> Full-stack Developer & Applied AI Engineer building practical, reliable web products and retrieval-augmented AI systems.

A high-performance, editorial portfolio website built with **React**, **Three.js**, **Framer Motion**, and **Tailwind CSS**, featuring custom scroll-driven interactions, a dynamic 3D neural background, and fluid momentum scrolling.

---

## ✨ Features & Architecture

- **🌌 3D Camera Path on Scroll (`Three.js`)**:
  - Pinned WebGL canvas rendering a volumetric constellation of neural nodes and dynamic additive lattice connections.
  - Camera transitions smoothly across 4 custom stations mapped to section scroll progress with interactive mouse parallax.

- **🛹 Inertia Smooth Scrolling (`Lenis`)**:
  - Cinematic momentum scrolling integrated with hardware-composited overscroll protection.
  - Fully honors `prefers-reduced-motion` for accessible experiences.

- **🎛️ Dynamic Spotlight Hover Cards**:
  - GPU-accelerated cursor spotlight effect featuring both an ambient surface glow and radiant border illumination powered by CSS custom properties (`--mouse-x`, `--mouse-y`) without React re-render overhead.

- **↔️ Horizontal-Scroll Discipline Track**:
  - Pinned sticky container that smoothly translates vertical scroll into a horizontal cinema reel across 4 core focus areas.

- **📈 Scroll-Scrubbed Project Showcases**:
  - **Institutional RAG Chatbots**: Progressively streams synthetic token output lines and triggers Gemini-to-Groq auto-failover indicators linked to scroll depth.
  - **Industrial CCTV Safety System**: Interactive camera telemetry HUD with bounding boxes (`helmet`, `vest`) scaling and locking onto targets.
  - **Job Application Tracker**: Weekly metrics and volume bar charts dynamically growing from base to peak.

- **📍 Scroll-Linked Glowing Timeline**:
  - Self-drawing SVG path with spring physics (`useSpring`) and milestone nodes that ignite with an ember glow when entering the viewport.

---

## 🛠️ Tech Stack

- **Core**: [React 18](https://react.dev/), [Vite 5](https://vitejs.dev/)
- **3D & Graphics**: [Three.js](https://threejs.org/)
- **Animation & Motion**: [Framer Motion](https://www.framer.com/motion/)
- **Smooth Scroll**: [Lenis](https://github.com/darkroomengineering/lenis)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/), PostCSS, Autoprefixer
- **Icons**: [Lucide React](https://lucide.dev/)

---

## 🚀 Getting Started

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) (v18+ recommended) installed.

### Installation

```bash
# Clone the repository
git clone https://github.com/kashyapsharma07/Portfolio-page.git

# Navigate into the directory
cd Portfolio-page

# Install dependencies
npm install
```

### Development

Run the local development server:

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Production Build

Bundle and optimize for production:

```bash
npm run build
```

Preview the production build locally:

```bash
npm run preview
```

---

## 📁 Project Structure

```text
portfolio/
├── public/
│   ├── favicon.svg
│   ├── og.svg
│   ├── robots.txt
│   ├── sitemap.xml
│   └── Kashyap_Sharma_Resume.pdf
├── src/
│   ├── App.jsx            # Main application layout, hero, projects & navigation
│   ├── Scene3D.jsx        # Three.js 3D background with scroll-linked camera stations
│   ├── SpotlightCard.jsx  # GPU-accelerated cursor spotlight card wrapper
│   ├── Network.jsx        # Lightweight 2D canvas fallback network
│   ├── data.js            # Profile, project details, skills & timeline data
│   ├── index.css          # Design system tokens, typography & Lenis resets
│   └── main.jsx           # App entry point
├── tailwind.config.js     # Custom editorial color palette & font families
├── vite.config.js         # Vite configuration
└── package.json
```

---

## 📬 Contact & Socials

- **GitHub**: [@kashyapsharma07](https://github.com/kashyapsharma07)
- **LinkedIn**: [Kashyap Sharma](https://linkedin.com/in/kashyapsharma01)
- **Email**: [kashyaps1304@gmail.com](mailto:kashyaps1304@gmail.com)
