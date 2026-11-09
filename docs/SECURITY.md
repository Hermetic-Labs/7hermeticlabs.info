# Security and access boundary

## Current surface

The site builds one static public artifact with a public landing page and two studio presentation modes inherited from Social Health:

- the public-safe project console;
- the contributor scorecard, activated only when a URL supplies `contributor`, `expires`, and `signature` parameters.

The browser sends those signed values to the existing public Graph scorecard endpoint. The backend remains responsible for signature validation and expiry. No signing secret, account credential, provider token, or session secret is stored in this repository.

The public console reads only the existing sanitized contributor-board endpoint. Contribution drafts use project-keyed browser storage. Opening a prepared email is an explicit contributor action; the site does not send messages or publish content automatically.

## Deployment requirements

Before a private studio is introduced at `studio.7hermeticlabs.info`:

1. Confirm the canonical host and whether the current `noindex` policy remains.
2. Permit the chosen 7 Hermetic Labs origin on the public Graph endpoints or provide a same-origin read proxy.
3. Verify signed-link success, incomplete-link handling, expired/invalid access, and unavailable-service behavior from the deployed origin.
4. Confirm every external build/reference URL remains intended for public use.
5. Verify CSP, referrer policy, TLS, caching, and rollback behavior on the chosen host.
6. Keep private Graph, provider, inbox, calendar, and publishing capabilities outside the static artifact.

Any future administrative or write-capable surface requires a separate authenticated design with least-privilege roles, secure sessions, CSRF protection, rate limits, secret storage, durable audit records, revocation, and backup/recovery testing.
