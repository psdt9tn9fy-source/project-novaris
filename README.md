# PROJECT NOVARIS

노바리스 학원도시 — an interactive worldbuilding archive built with React, TypeScript, Vite and GSAP.

## Run

Requires Node.js 22+.

```sh
npm ci
npm run dev
npm test
npm run build
```

The existing repository is `psdt9tn9fy-source/project-novaris`. Phase-one work is preserved on `feat/novaris-phase-one`.

## Included

- Short cinematic opening with Skip, Escape, session persistence and reduced-motion support.
- Seven-part landing page with an original SVG architectural city and responsive scroll treatments.
- Six academy selector tabs with pointer and keyboard support, and direct academy routes.
- Conceptual city map with seven selectable nodes and contextual details.
- Character search and affiliation filtering with clear empty states and a reusable profile component.
- World records in accessible native dialogs; Academies, Personnel and World pages.
- Self-hosted Latin fonts, system Korean fonts, local assets and no runtime third-party media dependency.

## Content editing

Canonical records live in `src/data/world.ts`:

- `academies`: confirmed names plus provisional interface colors/symbols. Fill in `description` only after approval.
- `characters`: add confirmed adult profiles (20+). Set `portrait` to an asset-relative path, such as `characters/name.webp`, and place it under `public/assets/`.
- `records`: organizations, lore and future history records; keep dates null until confirmed.

The actual character dataset is intentionally empty. No placeholder person or invented event is published. Academy colors, English spellings and conceptual city geometry are provisional design choices.

## Structure

```text
src/App.tsx                routes, landing sections and record reader
src/components/            intro, identity, academy, city and profile interfaces
src/data/world.ts          editable content and search function
src/styles.css             responsive design system and reduced-motion rules
public/assets/              original, replaceable SVG/media
public/licenses/            bundled font licenses
scripts/generate-city.py   deterministic SVG city generator
.github/workflows/pages.yml  validation and Pages deployment
```

## GitHub Pages

The workflow runs tests and builds the site with `/project-novaris/` as its asset base. Hash routes support direct entry and reload without server rewrite rules.

In the repository's **Settings → Pages → Build and deployment**, select **GitHub Actions** as Source once. The connector used for implementation cannot change this repository-level setting. After activation, a push to `main` or `feat/novaris-phase-one` deploys the same tested artifact; pull requests validate without deploying. If the `github-pages` environment restricts branches, allow the intended deployment branch.

Expected URL after a successful deployment: `https://psdt9tn9fy-source.github.io/project-novaris/`. This URL is not proof of publication; check the workflow result and live page.

For a custom domain/root deployment, set `VITE_BASE_PATH=/` in the workflow. For a local production build matching Pages:

```sh
VITE_BASE_PATH=/project-novaris/ npm run build
```

Research, visual choices and licensing: [docs/DESIGN.md](docs/DESIGN.md). Verification results: [docs/VERIFICATION.md](docs/VERIFICATION.md).
