# 7 Hermetic Labs Public Communications

This repository contains the public information front door for `7hermeticlabs.info` and its communications studio. The studio preserves the project-first information architecture, eight project lanes, focused contribution workspace, validation, campaign projection, contributor scorecard, asset libraries, HALT build shelf, and playtest history migrated from the 7HermeticLaws Social Health site.

## Run locally

Requires Node.js 20 or newer. The public runtime is dependency-free.

On Windows, double-click `Start 7 Hermetic Labs.bat`. It resolves its own directory, checks Node/npm, builds the site, waits for the landing page, studio, stylesheets, and scripts to respond, and then opens the public page in the default browser. Keep the console open; Ctrl+C stops the preview. An optional `PORT` environment variable changes the default port (4173).

For development:

```powershell
npm install
npm run check
npm run serve
```

Local landing page: `http://127.0.0.1:4173/`

Local communications studio: `http://127.0.0.1:4173/studio/`

`npm run build` produces the static deployment candidate in `dist/public`.

## GitHub Pages

The canonical repository is `https://github.com/Hermetic-Labs/7hermeticlabs.info`. Pushes to `main` build and deploy the static site through GitHub Actions. The custom-domain and GoDaddy DNS plan is in `docs/GITHUB_PAGES_AND_DNS.md`.

## Repository map

- `src/public/index.html` and `landing.css` — public information front door.
- `src/public/studio/index.html` — portfolio console and signed-link contributor workspace.
- `src/public/site.js` — project configuration, project-scoped campaign projection, contribution workflow, asset tools, and focus behavior.
- `src/public/scorecard.js` — signed contributor scorecard rendering and refresh behavior.
- `src/public/site.css` and `scorecard.css` — migrated responsive visual systems.
- `src/public/assets` — project, build/playtest, and 7 Hermetic Labs identity assets.
- `tests/migration.browser.mjs` — migrated donor browser acceptance suite with deterministic Graph fixtures.
- `tests/launcher.test.mjs` — local readiness and safe browser-opening checks.
- `docs/DONOR_BASELINE.md` — canonical donor source, routes, contracts, and rollback anchor.
- `docs/SECURITY.md` — current public/signed-link boundary and deployment requirements.
- `docs/DEPLOYMENT_AND_RETIREMENT.md` — domain, release, and donor cutover gates.
- `docs/GITHUB_PAGES_AND_DNS.md` — GitHub Pages workflow and Namecheap DNS records.

## External behavior

The communications studio reads the existing sanitized contributor-board endpoint. A valid signed contributor URL reads the existing public scorecard endpoint. The repository contains no API secret, provider token, password, or publishing credential. Contribution drafts stay in browser storage until the contributor explicitly opens and sends the prepared email. The interface performs no automatic publishing or account writes.

The GitHub Pages workflow publishes the build. The landing page and studio are currently public. A later hosting layer can place `/studio/` behind Microsoft Entra without changing the public front door.
