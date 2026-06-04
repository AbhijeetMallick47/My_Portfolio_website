<div align="center">

# Abhijeet Mallick — 3D Developer Portfolio

A premium, fully responsive personal portfolio with a real‑time WebGL hero, scroll‑driven motion and glassmorphic UI — built to showcase both **UI/UX craft** and **technical depth**.

[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-blue?logo=typescript&logoColor=white)](https://www.typescriptlang.org)
[![Vite](https://img.shields.io/badge/Vite-8-646CFF?logo=vite&logoColor=white)](https://vite.dev)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-v4-38BDF8?logo=tailwindcss&logoColor=white)](https://tailwindcss.com)
[![Three.js](https://img.shields.io/badge/Three.js-R3F-000000?logo=threedotjs&logoColor=white)](https://threejs.org)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-12-EF008F?logo=framer&logoColor=white)](https://www.framer.com/motion/)

![Portfolio preview](public/og-image.svg)

</div>

---

## ✨ Features

- **Real‑time 3D hero** — a morphing, glowing crystalline orb (`MeshDistortMaterial`) with a holographic wireframe shell, orbiting shapes and an ambient particle field.
- **Mouse‑parallax scene** — the whole 3D scene tilts toward the cursor and the camera dollies for depth, using framerate‑independent damping.
- **Scroll‑driven motion** — fade‑in + rise reveals, staggered children, a self‑drawing experience timeline, parallax background blobs and a hero that lifts/fades on scroll.
- **Interactive cards** — 3D tilt + a cursor‑following spotlight glow on project and skill cards.
- **Premium micro‑interactions** — magnetic buttons, an animated nav pill, a skill marquee and a layered, glossy logo mark.
- **Working contact form** — submissions are delivered straight to my inbox via [Web3Forms](https://web3forms.com) (no backend required), with inline validation, a loading state and success/error feedback.
- **Dark / light mode** — persisted theme toggle.
- **Performance‑first** — the WebGL bundle is lazy‑loaded, DPR is capped (lower on mobile), and geometry/particle counts scale down on small screens.
- **Accessible & SEO‑ready** — semantic HTML, keyboard focus rings, a skip link, `prefers-reduced-motion` support, and Open Graph / Twitter metadata.

---

## 🛠 Tech Stack

| Concern    | Tool                                                                                  |
| ---------- | ------------------------------------------------------------------------------------- |
| Framework  | [React 19](https://react.dev) + [Vite](https://vite.dev) (TypeScript)                 |
| Styling    | [Tailwind CSS v4](https://tailwindcss.com) (utility‑first, design tokens)             |
| Animation  | [Framer Motion](https://www.framer.com/motion/)                                       |
| 3D / WebGL | [Three.js](https://threejs.org) · [React Three Fiber](https://r3f.docs.pmnd.rs) · [Drei](https://drei.docs.pmnd.rs) |
| Forms      | [Web3Forms](https://web3forms.com)                                                    |

---

## 🚀 Getting Started

> Requires **Node 18+** (developed on Node 22).

```bash
# 1. Install dependencies
npm install

# 2. Start the dev server (http://localhost:5173)
npm run dev

# 3. Production build
npm run build

# 4. Preview the production build locally
npm run preview
```

---

## 📁 Project Structure

```
src/
├── 3d/             # React Three Fiber scene & objects
│   ├── HeroCanvas.tsx   # <Canvas> wrapper: Suspense, DPR caps, perf monitor
│   ├── Scene.tsx        # Composes the full hero scene
│   ├── CrystalOrb.tsx   # Central morphing, glowing orb (hero centrepiece)
│   ├── FloatingBits.tsx # Orbiting geometric shapes (depth layering)
│   ├── Lights.tsx       # Ambient + directional + coloured rim lights
│   └── Rig.tsx          # Mouse‑parallax camera / tilt rig
├── components/     # Reusable UI (Navbar, Button, Card, Field, Icons, …)
├── sections/       # Page sections: Hero, About, Skills, Projects,
│                   #   Experience, Contact, Footer
├── hooks/          # useTheme · useMediaQuery · useActiveSection
├── utils/          # data.ts (all content) · motion.ts · cn.ts
├── index.css       # Tailwind import + design tokens + component utilities
├── App.tsx         # Assembles loader, background, nav & all sections
└── main.tsx        # React entry point
```

---

## 🎨 Personalising the Content

**Everything is data‑driven.** Open [`src/utils/data.ts`](src/utils/data.ts) and edit a single file to change the profile, stats, skills, projects, experience, achievements and social links — every section reads from it. No JSX edits required for content.

Design tokens (colours, fonts, animations) live in [`src/index.css`](src/index.css) under the `@theme` block.

---

## 📬 Contact Form Setup (Web3Forms)

The contact form sends submissions to your email with **no backend**:

1. Go to [web3forms.com](https://web3forms.com), enter your email, and copy the free **Access Key**.
2. Add it via either:
   - **`.env` file** (recommended) in the project root:
     ```bash
     VITE_WEB3FORMS_KEY=your-access-key-here
     ```
   - **or** paste it directly into `web3formsAccessKey` in [`src/utils/data.ts`](src/utils/data.ts).
3. Restart the dev server. Submissions now arrive in your inbox, with the sender's email set as reply‑to.

> The access key is safe to expose on the client — it only allows submitting to your configured inbox.

---

## ☁️ Deployment

This is a static Vite app and deploys anywhere:

- **Vercel / Netlify** — import the repo; build command `npm run build`, output directory `dist`. Add `VITE_WEB3FORMS_KEY` as an environment variable.
- **GitHub Pages** — deploy the `dist/` folder (set Vite's `base` if hosting under a subpath).

---

## 👤 Author

**Abhijeet Mallick** — Front‑End Developer · B.Tech (IT), NIT Kurukshetra

- 📧 [abhijeetmallick.gusknp2022@gmail.com](mailto:abhijeetmallick.gusknp2022@gmail.com)
- 💼 [LinkedIn](https://www.linkedin.com/) <!-- TODO: add your exact profile URL -->
- 🐙 [GitHub](https://github.com/) <!-- TODO: add your exact profile URL -->

---

## 📄 License

Released under the [MIT License](LICENSE). Feel free to use it as a template for your own portfolio — just swap the content in `src/utils/data.ts` with your own.
