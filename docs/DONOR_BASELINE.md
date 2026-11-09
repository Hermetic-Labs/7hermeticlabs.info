# Donor baseline: 7HermeticLaws Social Health

## Canonical source

The actual public Social Health framework was found at:

`D:\Minimax\sites\hermetic\7HermeticLaws.com\social-health`

The Git repository root is `D:\Minimax\sites\hermetic\7HermeticLaws.com`. The preserved baseline is commit:

`71caa76` — **Refresh Social Health portfolio with Data Center Direct and R&D**

At inspection time, local `main` and `origin/main` both pointed to that commit. The donor worktree also contained unrelated uncommitted `package.json`/VRF changes; Blankit did not modify or copy those changes. The commit is the rollback anchor. The original site, DNS, and repository were not changed.

Important naming evidence: the framework is hosted under `7HermeticLaws.com/social-health/`, even though surrounding conversations sometimes called it the “7HermeticLabs” social framework. The source itself is the authority.

## Source-backed route and modes

- `/social-health/` — static public-safe Social Health console (`noindex`, `nofollow`, `noarchive`).
- `/social-health/?contributor=<id>&expires=<ms>&signature=<signature>` — contributor scorecard mode. The client exchanges the signed query for a scorecard from the Graph public API.
- `https://graph.7hermeticlabs.com/public/contributor-board` — sanitized campaign/assignment projection used by the public campaign pulse.
- `https://graph.7hermeticlabs.com/public/contributor-scorecard/:id` — signed contributor scorecard read.

## UI and information architecture

The donor contains two major presentation modes.

### Public-safe console

1. Hero and three-stage release boundary: private work → approved signal → recorded response.
2. Status rail: source discipline, visibility, authority, and Graph read state.
3. Portfolio map with eight fixed project lanes and project-specific vocabulary.
4. Project summary panel with primary job, public state, next gate, products, and an entry into a focused contribution studio.
5. Project-specific identity/iconology, campaign pulse, and sanitized assignments.
6. A five-step contribution studio: scope → source/evidence → build → safety review → handoff.
7. HALT-specific build shelf and detailed playtesting evidence/history.
8. Truth pipeline, authority model, channel matrix, privacy boundary, and closing operating summary.

### Contributor scorecard

1. Current campaign summary, objective, audience, platforms, and date range.
2. This-week score, prior score/rank, and active assignment count.
3. Weekly goals with target/progress/status.
4. Wins and improvement notes.
5. Assignment lifecycle, milestone track, revision number, operator feedback, and next action.
6. Manager note and freshness timestamp.

## Donor data contracts and workflows

The site-side JavaScript includes fixed project presentation data. Sanitized campaign and assignment data are read from Hermetic Graph. The supporting canonical backend was found at `D:\Minimax\Puter\mcp-azure-deployments\hermetic-graph-mcp` (package version `1.21.4`).

The backend confirms these reusable contracts:

- Campaign: id/code, title, summary/details, objective, audience, platforms, status, start/end, contributors, owner, tags.
- Assignment: project/campaign relationship, code, contributor, channel, priority, specification, acceptance criteria, formats, references, due date, lifecycle state, revisions, artifacts, milestones, feedback, and calendar relationship.
- Assignment lifecycle: `draft → sent → acknowledged/replied/submitted → changes_requested/resubmitted → accepted → completed`, with blocked/cancelled branches and append-only timeline events.
- Content calendar: title, channels, body, alt text, media/supporting references, schedule, approval state, publication state, owner, notes, version, review state, blockers, sources, content hash, context scopes, and publication receipt.
- Review/publish gate: approval, source/legal basis where applicable, no open blockers or holds, required approvals complete, destination verified, and no attempt to mutate an already published draft.
- Contributor scorecard: weekly goals, score, rank/cohort, wins, improvements, manager note, assignments, milestones, feedback, and next action.

## Dependencies deliberately not migrated as live bindings

- Hermetic Graph company endpoint and tool profiles.
- Susan-specific ownership, email address, and operator language.
- Outlook social calendar and Microsoft Graph.
- SharePoint lists and asset paths.
- Azure Blob control store.
- Meta, LinkedIn, YouTube, Discord, or any other social-provider credentials/accounts.
- Project-specific private records, contacts, campaign copy, unpublished assets, build packages, and playtest evidence.
- Signed contributor links and their secret material.
- Hermetic Labs logos, project marks, and company-specific visual language.

## Styling and assets

The donor is a dark, high-contrast console with neon signal green and an RGB identity. Its source includes a 7HL RGB mark plus project-specific marks, media, build links, and an IP library. Blankit retained only the structural idea of an RGB signal and created an original red/green/blue folded-cover identity on a neutral bone/charcoal system. No donor logo or project asset was copied.

## Evidence and rollback

The donor has its own Playwright acceptance suite in `test-social-health.mjs`, covering desktop/mobile behavior, fixed project lanes, campaign projection, workspace isolation, draft persistence, handoff preparation, Graph degradation, scorecard rendering, and overflow. The donor remains preserved at commit `71caa76`; rollback is `git checkout 71caa76 -- social-health` within a clean recovery worktree, not a destructive reset of an active worktree.

Baseline SHA-256 manifest captured during extraction:

| File | SHA-256 |
| --- | --- |
| `social-health/index.html` | `1333F8FD5BCAC11245A016CCF9288FF671D1E13EB23452B016D347103768E545` |
| `social-health/site.js` | `7627D7EC88A61650A3E09FE1695A2C3C0E89B4CCB140A7793F5CD35CD9162C48` |
| `social-health/site.css` | `15527F093D09908A110D121E0B3A708B3EBE4DD61FA09E9CAB0699D5ECC41F59` |
| `social-health/scorecard.js` | `13CDA458DD16A7F2E49482F2FC087F80C7BCEAEADBF7CB0F2A8BEDF1BAC70BEB` |
| `social-health/scorecard.css` | `F90CF1610959A08A968CADD9B0553E8F405D4D96CF9330BA2B6181DF8A4F6D8E` |
| `test-social-health.mjs` | `5199C1BD7B3309BEF9DD48E0E16ACEE5507BA51E6170136975B83F180EE826F5` |

