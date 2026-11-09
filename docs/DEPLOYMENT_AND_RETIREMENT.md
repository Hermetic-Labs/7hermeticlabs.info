# Deployment and donor cutover

## 7 Hermetic Labs destination

The selected public host is GitHub Pages, deployed from `Hermetic-Labs/7hermeticlabs.info` by GitHub Actions. The public front door lives at the apex; the communications studio currently lives at `/studio/` in the same static build.

- the `7hermeticlabs.info` apex and `www` resolve only to GitHub Pages;
- the GitHub Pages deployment for `dist/public` and its rollback mechanism;
- whether the inherited `noindex, nofollow, noarchive` policy remains for launch;
- Graph CORS or same-origin proxy support for the 7 Hermetic Labs host;
- public build/download/reference URLs that should remain unchanged;
- analytics, privacy, CSP, and cache policy;
- ownership of the communications email destination if the existing assignment recipient changes.

The exact GoDaddy records are documented in `GITHUB_PAGES_AND_DNS.md`.

## Release gates

1. The donor rollback commit remains `71caa76e3549bae7bb22330b857c13593f8ee41e`.
2. The migrated donor browser suite and launcher checks pass.
3. Desktop and mobile visual review confirm the project map, all project workspaces, HALT build/playtest content, asset tools, contribution validation, and scorecard modes.
4. The deployed studio can read the sanitized board and signed scorecard endpoint with the intended failure states.
5. `7hermeticlabs.info` serves the front door, canonical metadata, assets, TLS certificate, and intended indexing policy.
6. The old route remains available during a rollback window.

After those gates pass: verify the landing page, `/studio/`, and signed-link mode; observe the old and new routes in parallel; redirect the old public route; and retire it only after the rollback window closes. Microsoft Entra can later protect a dedicated studio host without changing the public front door.
