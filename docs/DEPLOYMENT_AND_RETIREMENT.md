# Deployment and donor cutover

## BLANKIT destination decisions

Before deployment, confirm:

- the `blankit.dev` DNS owner and canonical apex/`www` policy;
- the static host for `dist/public` and its rollback mechanism;
- whether the inherited `noindex, nofollow, noarchive` policy remains for launch;
- Graph CORS or same-origin proxy support for the BLANKIT host;
- public build/download/reference URLs that should remain unchanged;
- analytics, privacy, CSP, and cache policy;
- ownership of the BLANKIT email destination if the existing assignment recipient will change.

No deployment or DNS change is part of the local migration commit.

## Release gates

1. The donor rollback commit remains `71caa76e3549bae7bb22330b857c13593f8ee41e`.
2. The migrated donor browser suite and launcher checks pass.
3. Desktop and mobile visual review confirm the project map, all project workspaces, HALT build/playtest content, asset tools, contribution validation, and scorecard modes.
4. The deployed BLANKIT origin can read the sanitized board and signed scorecard endpoint with the intended failure states.
5. `blankit.dev` serves the correct canonical metadata, assets, TLS certificate, and indexing policy.
6. The old route remains available during a rollback window.

After those gates pass: deploy BLANKIT, verify the live route and signed-link mode, observe both routes in parallel, redirect the old public route, monitor, and retire it only after the rollback window closes.
