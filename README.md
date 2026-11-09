# BLANKIT

**Business Language and Networking Kit**  
*We got you covered.*

This repository contains the BLANKIT migration of the 7HermeticLaws Social Health site. The donor's project-first information architecture, eight project lanes, focused contribution workspace, validation, campaign projection, contributor scorecard, asset libraries, HALT build shelf, and playtest history are preserved under the BLANKIT identity.

## Run locally

Requires Node.js 20 or newer. The public runtime is dependency-free.

On Windows, double-click `Start BLANKIT.bat`. It resolves its own directory, checks Node/npm, builds the site, waits for the migrated HTML, stylesheets, and scripts to respond, and then opens the public page in the default browser. Keep the console open; Ctrl+C stops the preview. An optional `PORT` environment variable changes the default port (4173).

For development:

```powershell
npm install
npm run check
npm run serve
```

Local URL: `http://127.0.0.1:4173/`

`npm run build` produces the static deployment candidate in `dist/public`.

## GitHub Pages

The canonical repository is `https://github.com/MrDwayneTillman/blankit.dev`. Pushes to `main` build and deploy the static site through GitHub Actions. The custom-domain and Namecheap record plan is in `docs/GITHUB_PAGES_AND_DNS.md`.

## Repository map

- `src/public/index.html` — migrated public console and signed-link contributor workspace.
- `src/public/site.js` — project configuration, project-scoped campaign projection, contribution workflow, asset tools, and focus behavior.
- `src/public/scorecard.js` — signed contributor scorecard rendering and refresh behavior.
- `src/public/site.css` and `scorecard.css` — migrated responsive visual systems.
- `src/public/assets` — project, build/playtest, and BLANKIT identity assets used by the migrated surface.
- `tests/migration.browser.mjs` — migrated donor browser acceptance suite with deterministic Graph fixtures.
- `tests/launcher.test.mjs` — local readiness and safe browser-opening checks.
- `docs/DONOR_BASELINE.md` — canonical donor source, routes, contracts, and rollback anchor.
- `docs/SECURITY.md` — current public/signed-link boundary and deployment requirements.
- `docs/DEPLOYMENT_AND_RETIREMENT.md` — domain, release, and donor cutover gates.
- `docs/GITHUB_PAGES_AND_DNS.md` — GitHub Pages workflow and Namecheap DNS records.

## External behavior

The public console reads the existing sanitized contributor-board endpoint. A valid signed contributor URL reads the existing public scorecard endpoint. The repository contains no API secret, provider token, password, or publishing credential. Contribution drafts stay in browser storage until the contributor explicitly opens and sends the prepared email. The interface performs no automatic publishing or account writes.

The GitHub Pages workflow publishes the build. DNS activation for `blankit.dev` is tracked separately so the existing iCloud Mail records remain intact.
