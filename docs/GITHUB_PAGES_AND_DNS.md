# GitHub Pages and DNS

## Publishing home

- Repository: `https://github.com/MrDwayneTillman/blankit.dev`
- Pages source: GitHub Actions workflow in `.github/workflows/pages.yml`
- Canonical domain: `blankit.dev`
- `www` policy: redirect through the configured GitHub Pages custom domain

Every push to `main` builds `dist/public` and deploys that static artifact to GitHub Pages.

## Namecheap DNS records to add

The domain currently uses `dns1.registrar-servers.com` and `dns2.registrar-servers.com`. In Namecheap Advanced DNS, add these web records:

| Type | Host | Value | TTL |
| --- | --- | --- | --- |
| A | `@` | `185.199.108.153` | Automatic |
| A | `@` | `185.199.109.153` | Automatic |
| A | `@` | `185.199.110.153` | Automatic |
| A | `@` | `185.199.111.153` | Automatic |
| CNAME | `www` | `mrdwaynetillman.github.io` | Automatic |

Optional IPv6 records:

| Type | Host | Value | TTL |
| --- | --- | --- | --- |
| AAAA | `@` | `2606:50c0:8000::153` | Automatic |
| AAAA | `@` | `2606:50c0:8001::153` | Automatic |
| AAAA | `@` | `2606:50c0:8002::153` | Automatic |
| AAAA | `@` | `2606:50c0:8003::153` | Automatic |

## Records to preserve

Do not replace or remove the existing iCloud Mail records:

- MX `@` → `mx01.mail.icloud.com` (priority 10)
- MX `@` → `mx02.mail.icloud.com` (priority 10)
- TXT `@` → `v=spf1 include:icloud.com ~all`

Preserve any Apple domain-verification, DKIM, or other mail records visible in the Namecheap control panel even if a public resolver does not currently return them.

## Activation sequence

1. Let the first Pages workflow finish successfully at the GitHub-provided URL.
2. Keep `blankit.dev` configured as the repository's custom domain.
3. Add the DNS records above without changing the mail records.
4. Wait for GitHub's DNS check to pass.
5. Enable **Enforce HTTPS** in the repository's Pages settings after the certificate is issued.
6. Verify the apex, `www` redirect, site assets, public Graph projection, and signed scorecard mode.

GitHub's current custom-domain guidance: <https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site>
