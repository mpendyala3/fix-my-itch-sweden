# Solve real-world problems

Next.js version of the curated Sweden-first founder intelligence site.

What this repo now contains:
- Next.js App Router source in `app/`
- static export config for GitHub Pages
- `docs/` as the deployment artifact for Pages
- a category-first homepage with exactly 10 problems per category
- an `/architecture` route plus preserved legacy `architecture.html`

Core product rule:
- only 10 public problems per category
- no public all-problems library

Commands:
- `npm install`
- `npm run dev`
- `npm run build:pages`

GitHub Pages serves from `docs/` on the `main` branch.
