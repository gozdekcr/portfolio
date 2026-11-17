# Gözde Kacar · Portfolio

My personal portfolio: a single-page site with a 3D project gallery, an experience timeline, competitions and a learning path.

🔗 **Live:** https://gozdekcr.github.io/portfolio

## Tech stack

- [React](https://react.dev) + [Vite](https://vite.dev)
- [Tailwind CSS](https://tailwindcss.com) v4
- [Framer Motion](https://motion.dev) for animations
- [Lucide](https://lucide.dev) icons
- Deployed to GitHub Pages with GitHub Actions

## Project structure

```
src/
├── sections/          # One file per page section
│   ├── Hero.jsx
│   ├── About.jsx
│   ├── projects/      # 3D gallery, mobile carousel, project modal
│   ├── Experience.jsx
│   ├── Events.jsx
│   ├── LearningPath.jsx
│   └── Contact.jsx
├── components/        # Shared pieces: Navbar, UI helpers, icons
├── data/              # All site content lives here
├── hooks/             # Custom React hooks
├── App.jsx
└── main.jsx
public/
└── images/            # Hero illustration, avatar, social preview
```

All text content (projects, experience, events, learning path) is in `src/data/`, so the site can be updated without touching components.

## Run locally

```bash
npm install
npm run dev
```

Then open http://localhost:5173/portfolio/

## Deploy

Every push to `main` builds the site and deploys it to GitHub Pages automatically (`.github/workflows/deploy.yml`).
