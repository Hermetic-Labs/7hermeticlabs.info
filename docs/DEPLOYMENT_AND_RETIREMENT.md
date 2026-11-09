# Deployment decisions and donor retirement gate

## External decisions still required

### Private source hosting

- Confirm GitHub organization or owner account.
- Confirm private repository name (recommended working name: `blankit-platform`).
- Confirm administrators, branch protection, backup, and secret-scanning policy.
- Confirm whether the donor-to-Blankit history should be recorded only in documentation or via a private migration branch.

### Public deployment

“Up on Google” is unresolved. The founder must choose whether this means:

- hosting on Google Cloud/Firebase;
- making the site discoverable in Google Search;
- using Google Workspace for operations;
- or another Google product.

Also choose the public host, build command/output (`npm run build`, `dist/public`), staging environment, analytics/privacy policy, and rollback owner.

### Search indexing

Choose whether `blankit.dev` should be indexed at launch, which pages belong in the sitemap, the canonical host (`www` or apex), Search Console ownership, and whether structured data is desired. The operator workspace must remain `noindex` and access-controlled.

### DNS

Confirm registrar/DNS owner, chosen host records, apex/`www` redirect, TLS path, email records, and rollback TTL before changing anything.

### Authentication and private hosting

Select the owned authentication implementation described in `SECURITY.md`, the private origin/route, roles, invitation/recovery flow, session duration, audit retention, and backup process.

### Social connectors

For each desired provider, name the owning account/app, least-privilege scopes, operator roles, approval boundary, secret store, token renewal owner, publishing receipt format, and revocation procedure.

## Donor retirement gate

The founder has authorized eventual retirement of the old Hermetic Labs-facing Social Health surface, but not premature deletion. Do not change its title/logo, archive its route, or alter its DNS until all gates pass:

1. Donor inventory and rollback commit `71caa76` are preserved.
2. Blankit achieves documented functional parity with accepted gaps.
3. Automated checks and desktop/mobile QA pass.
4. Authentication and authorization protect the private workspace.
5. The final public/private deployment destination and domain path are confirmed and successfully deployed.
6. Production reads, controlled writes, receipts, backup, and rollback are verified.
7. Only then replace or retire the donor-visible surface in a dedicated change with a redirect and rollback plan.

Recommended retirement sequence: freeze donor content → snapshot route/assets/API contracts → deploy Blankit → verify canonical URLs and access → run parallel read-only observation → redirect old public route → monitor → archive only after the rollback window.

