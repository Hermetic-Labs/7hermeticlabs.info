# BLANKIT

**Business Language and Networking Kit**  
*We got you covered.*

This repository is the local extraction and rebrand framework for `blankit.dev`. It separates a future public brand surface from a private operator workspace and preserves the useful information architecture of the existing 7HermeticLaws Social Health system without copying credentials, live bindings, private company records, or Hermetic branding.

## Run locally

Requires Node.js 20 or newer. There are no package dependencies.

```powershell
npm run check
npm run serve
```

- Public landing: `http://127.0.0.1:4173/`
- Local-only operator workspace: `http://127.0.0.1:4173/workspace/`

The build produces two separate outputs:

- `dist/public` — candidate for a later public deployment after hosting, indexing, and DNS decisions.
- `dist/operator` — **must remain local/private** until the authentication decision gate in `docs/SECURITY.md` is complete.

## Repository map

- `src/public` — BLANKIT public brand and landing surface.
- `src/operator` — local operator workspace extracted from the donor workflows.
- `src/data/workspace-data.js` — single source of truth for synthetic demo records and lifecycle semantics.
- `src/adapters/contracts.js` — fail-closed boundaries for identity, portfolio, contributor, calendar, asset, publishing, and audit integrations.
- `tests` — data, lifecycle, and disconnected-adapter checks.
- `docs/DONOR_BASELINE.md` — exact donor inventory and source evidence.
- `docs/DONOR_TO_BLANKIT.md` — capability-by-capability migration map.
- `docs/OPERATOR_HANDBOOK.md` — first-day and recurring operating SOPs.
- `docs/SECURITY.md` — authentication and connector decision gate.
- `docs/DEPLOYMENT_AND_RETIREMENT.md` — external decisions and gated donor retirement plan.

## What is real versus synthetic

The interface, workflow rules, adapter contracts, documentation, and original RGB folded-cover brand system are implemented locally. Every campaign, content item, project lane, scorecard, outcome, task, and audit entry shown in the workspace is clearly synthetic. No social provider, inbox, analytics source, calendar, authentication service, DNS record, or hosting destination is connected.

