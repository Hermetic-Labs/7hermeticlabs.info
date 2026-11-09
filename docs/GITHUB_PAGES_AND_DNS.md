# GitHub Pages and DNS

## Publishing home

- Repository: `https://github.com/Hermetic-Labs/7hermeticlabs.info`
- Pages source: GitHub Actions workflow in `.github/workflows/pages.yml`
- Canonical domain: `7hermeticlabs.info`
- `www` policy: redirect through the configured GitHub Pages custom domain

Every push to `main` builds `dist/public` and deploys that static artifact to GitHub Pages.

## GoDaddy DNS records

The domain uses GoDaddy nameservers `ns43.domaincontrol.com` and `ns44.domaincontrol.com`. The intended web records are:

| Type | Host | Value | TTL |
| --- | --- | --- | --- |
| A | `@` | `185.199.108.153` | Automatic |
| A | `@` | `185.199.109.153` | Automatic |
| A | `@` | `185.199.110.153` | Automatic |
| A | `@` | `185.199.111.153` | Automatic |
| CNAME | `www` | `hermetic-labs.github.io` | Automatic |

Optional IPv6 records:

| Type | Host | Value | TTL |
| --- | --- | --- | --- |
| AAAA | `@` | `2606:50c0:8000::153` | Automatic |
| AAAA | `@` | `2606:50c0:8001::153` | Automatic |
| AAAA | `@` | `2606:50c0:8002::153` | Automatic |
| AAAA | `@` | `2606:50c0:8003::153` | Automatic |

## Parking records to remove

GoDaddy also created these parking A records, which conflict with GitHub Pages and must not remain at the apex:

- A `@` → `15.197.148.33`
- A `@` → `3.33.130.190`

Preserve unrelated verification or mail records if they are added later.

## Activation sequence

1. Let the first Pages workflow finish successfully at the GitHub-provided URL.
2. Keep `7hermeticlabs.info` configured as the repository's custom domain.
3. Keep the four GitHub A records and the `www` CNAME; remove only the two GoDaddy parking A records.
4. Wait for GitHub's DNS check to pass.
5. Enable **Enforce HTTPS** in the repository's Pages settings after the certificate is issued.
6. Verify the apex, `www` redirect, site assets, public Graph projection, and signed scorecard mode.

GitHub's current custom-domain guidance: <https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site>
