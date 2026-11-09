# Donor-to-Blankit capability map

| Donor capability | Blankit destination | Current status | Notes / gap |
| --- | --- | --- | --- |
| Public-safe Social Health hero and release boundary | `src/public` plus operator boundary banner | Migrated and rebranded | Public landing explains the product; private workspace states the boundary continuously. |
| Fixed eight-project portfolio map | Operator **Campaigns** → data-driven project lanes | Migrated, standardized | Synthetic lanes prove isolation. Real lanes require authorized records. |
| Project summary: job, public state, next gate, products | Campaigns project scope panel | Migrated | Uses neutral reusable fields rather than Hermetic project assumptions. |
| Project campaign pulse from Graph | Campaigns scoped cards | Interface preserved, disconnected | `portfolio.listCampaigns` adapter is fail-closed. No live Graph read. |
| Sanitized assignments in campaign projection | Contributor scorecard and campaign counts | Migrated with synthetic data | Live projection requires identity, authorization, and a selected backend. |
| Five-step contribution studio | Operator **Contribution studio** | Migrated | Scope → evidence → build → safety review → local handoff. No automatic email send. |
| Per-project local draft isolation | Project-keyed browser storage | Migrated | Synthetic/local only; remote drafts require authenticated storage. |
| Donor `mailto:Susan@…` handoff | Copyable local handoff packet | Safely changed | Avoids a Hermetic address and prevents implied sending. Connector decision remains open. |
| Source-grounding and safety checks | Contribution studio safety review | Migrated and generalized | No product-specific medical claims or private evidence copied. |
| Truth pipeline / release boundary | Independent review, publication, outcome states | Migrated and strengthened | Publication is distinct from verified outcome. |
| Project iconology / asset rails | Operator **Brand library** | Migrated as asset references | Only original/synthetic Blankit assets. Rights and readiness remain explicit. |
| Channel matrix | Channel plans in shared data + content/channel views | Migrated | All channels say `connection: none`. |
| HALT build shelf and playtesting history | SOP/evidence model and audit trail | Generalized, content not copied | The reusable evidence/correction pattern is preserved; private product builds and findings remain with the donor. |
| Contributor scorecard signed-link mode | Synthetic contributor preview + `contributor` adapter | UI contract preserved, auth disconnected | A remote contributor portal cannot ship before owned authentication is selected. |
| Weekly goals, score, rank, wins, improvements | Synthetic scorecard model | Migrated | No invented rank or live performance claim. |
| Assignment lifecycle and milestone track | Shared data model + handoff/operations | Migrated conceptually | Backend persistence and message routing are not implemented. |
| Operator feedback and next action | Synthetic assignment record | Migrated | Real feedback requires authorized contributor identity. |
| Graph degraded/empty state | Boundary banner and fail-closed adapters | Migrated | Disconnected state is explicit and tested. |
| Outlook/SharePoint/Azure/provider integrations | Adapter contracts | Deliberately disconnected | Provider selection, credentials, and least-privilege scopes are future decisions. |
| Donor public noindex policy | Operator `noindex` plus build separation | Migrated and strengthened | Operator must not be included in a public deploy. |
| Playwright desktop/mobile acceptance | Node semantic tests + browser QA in this pass | Partially migrated | A permanent browser test dependency can be added after framework choice is adopted. |

## Parity interpretation

Blankit preserves the donor’s useful operating model and information architecture. It does not copy Hermetic company content or present disconnected features as live. Several donor capabilities are therefore present as tested local interactions plus explicit adapter contracts rather than active connectors. That is an intentional security boundary, not silent feature removal.

