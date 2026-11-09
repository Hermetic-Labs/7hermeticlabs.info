# Deployment and donor cutover

## BLANKIT destination decisions

The selected static host is GitHub Pages, deployed from the public `MrDwayneTillman/blankit.dev` repository by GitHub Actions. Before domain cutover, confirm:

- the `blankit.dev` DNS owner and canonical apex/`www` policy;
- the GitHub Pages deployment for `dist/public` and its rollback mechanism;
- whether the inherited `noindex, nofollow, noarchive` policy remains for launch;
- Graph CORS or same-origin proxy support for the BLANKIT host;
- public build/download/reference URLs that should remain unchanged;
- analytics, privacy, CSP, and cache policy;
- ownership of the BLANKIT email destination if the existing assignment recipient will change.

The exact Namecheap additions and preserved iCloud Mail records are documented in `GITHUB_PAGES_AND_DNS.md`.

## Release gates

1. The donor rollback commit remains `71caa76e3549bae7bb22330b857c13593f8ee41e`.
2. The migrated donor browser suite and launcher checks pass.
3. Desktop and mobile visual review confirm the project map, all project workspaces, HALT build/playtest content, asset tools, contribution validation, and scorecard modes.
4. The deployed BLANKIT origin can read the sanitized board and signed scorecard endpoint with the intended failure states.
5. `blankit.dev` serves the correct canonical metadata, assets, TLS certificate, and indexing policy.
6. The old route remains available during a rollback window.

After those gates pass: deploy BLANKIT, verify the live route and signed-link mode, observe both routes in parallel, redirect the old public route, monitor, and retire it only after the rollback window closes.
