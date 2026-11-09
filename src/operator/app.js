import {
  SEED,
  applyDemoTransition,
  deriveStage,
  nextDemoTransition,
  readinessChecks
} from "./data/workspace-data.js";

const STORAGE_KEY = "blankit.operator-demo.v1";
const ONBOARDING_KEY = "blankit.operator-onboarding.v1";
const CONTRIBUTION_PREFIX = "blankit.contribution-draft.v1";
const viewMeta = {
  overview: ["CONTROL DESK / SYNTHETIC DATA", "Overview"],
  content: ["CONTENT SYSTEM / STATUS TRUTH", "Content"],
  calendar: ["CADENCE / INTENT ONLY", "Calendar"],
  campaigns: ["PROJECT LANES / CAMPAIGN PULSE", "Campaigns"],
  contributions: ["DONOR-PARITY / LOCAL HANDOFF", "Contribution studio"],
  library: ["LANGUAGE / ASSETS / RIGHTS", "Brand library"],
  operations: ["SOPS / HANDOFFS / CORRECTIONS", "Operations"],
  onboarding: ["FUTURE OPERATOR / START HERE", "Operator start"]
};

const state = {
  view: "overview",
  content: loadContent(),
  audit: [...SEED.audit],
  filter: "all",
  search: "",
  selectedProject: SEED.projects[0].id,
  contributionStep: 1
};

function loadContent() {
  try {
    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) || "null");
    if (Array.isArray(stored)) return stored;
  } catch { /* Local demo state is optional. */ }
  return SEED.contentItems.map((item) => ({ ...item }));
}

function saveContent() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state.content));
}

function escapeHtml(value = "") {
  return String(value).replace(/[&<>'"]/g, (character) => ({
    "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;"
  })[character]);
}

function label(value = "") {
  return String(value).replaceAll("_", " ").replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function formatDate(value, options = {}) {
  if (!value) return "Not set";
  return new Intl.DateTimeFormat("en-US", {
    month: "short", day: "numeric", year: options.year ? "numeric" : undefined,
    hour: options.time ? "numeric" : undefined, minute: options.time ? "2-digit" : undefined,
    timeZone: "America/New_York"
  }).format(new Date(value));
}

function stagePill(stage) {
  return `<span class="stage-pill stage-${escapeHtml(stage)}">${escapeHtml(label(stage))}</span>`;
}

function campaignFor(item) {
  return SEED.campaigns.find((campaign) => campaign.id === item.campaignId);
}

function projectForId(id) {
  return SEED.projects.find((project) => project.id === id);
}

function toast(message) {
  const element = document.querySelector("#toast");
  element.textContent = message;
  element.classList.add("show");
  clearTimeout(toast.timer);
  toast.timer = setTimeout(() => element.classList.remove("show"), 2600);
}

function renderIntro(title, copy, note = "") {
  return `<div class="view-intro"><div><h2>${escapeHtml(title)}</h2><p>${escapeHtml(copy)}</p></div>${note ? `<div class="view-note">${note}</div>` : ""}</div>`;
}

function queueRow(item) {
  const campaign = campaignFor(item);
  const stage = deriveStage(item);
  return `<div class="queue-row">
    <div class="queue-title"><b>${escapeHtml(item.title)}</b><small>${escapeHtml(item.format)}</small></div>
    <div class="queue-channel"><span class="mini-label">${escapeHtml(item.channels.join(" · "))}</span></div>
    <div>${stagePill(stage)}</div>
    <div class="queue-owner"><span class="mini-label">${escapeHtml(campaign?.title || "Internal")}</span></div>
    <button type="button" data-open-item="${escapeHtml(item.id)}" aria-label="Open ${escapeHtml(item.title)}">→</button>
  </div>`;
}

function renderOverview() {
  const stages = state.content.map(deriveStage);
  const needsReview = stages.filter((stage) => stage === "planned" || stage === "in_review").length;
  const approved = stages.filter((stage) => stage === "approved").length;
  const published = stages.filter((stage) => stage === "published").length;
  const verified = stages.filter((stage) => stage === "verified_outcome").length;
  const attention = state.content.filter((item) => {
    const next = nextDemoTransition(item);
    return next?.blocked || item.outcomeStatus === "pending_verification";
  });
  return `${renderIntro(
    "What needs a human next?",
    "A bounded view of synthetic work across projects, review, publication, and outcome verification.",
    `<b>DATA MODE</b>Synthetic demo · saved only in this browser`
  )}
  <section class="metric-grid" aria-label="Workflow summary">
    <article class="metric amber"><div class="metric-head"><span>Needs review</span><i class="metric-dot"></i></div><strong>${needsReview}</strong><p>Draft or review work—not approved.</p></article>
    <article class="metric green"><div class="metric-head"><span>Approved</span><i class="metric-dot"></i></div><strong>${approved}</strong><p>Copy passed; release remains separate.</p></article>
    <article class="metric red"><div class="metric-head"><span>Published</span><i class="metric-dot"></i></div><strong>${published}</strong><p>Recorded state; outcome still open.</p></article>
    <article class="metric"><div class="metric-head"><span>Verified outcome</span><i class="metric-dot"></i></div><strong>${verified}</strong><p>Evidence attached in the synthetic record.</p></article>
  </section>
  <div class="dashboard-grid">
    <section class="panel"><header class="panel-head"><div><h3>Work queue</h3><p>STATUS IS A CLAIM—KEEP IT PRECISE</p></div><button type="button" data-go-view="content">View all</button></header>${state.content.slice(0, 5).map(queueRow).join("")}</section>
    <aside class="panel"><header class="panel-head"><div><h3>Needs attention</h3><p>BLOCKERS AND OPEN VERIFICATION</p></div></header><div class="attention-list">${attention.map((item) => {
      const next = nextDemoTransition(item);
      const copy = next?.blocked ? next.blockers.map((blocker) => blocker.label).join(" · ") : "Published; outcome evidence is not verified.";
      return `<div class="attention-item"><span class="attention-icon">!</span><div><b>${escapeHtml(item.title)}</b><p>${escapeHtml(copy)}</p><button type="button" data-open-item="${item.id}">Inspect record</button></div></div>`;
    }).join("") || `<div class="empty-state">No open blockers in the synthetic queue.</div>`}</div></aside>
  </div>`;
}

function renderContent() {
  const stageOptions = ["all", "planned", "in_review", "approved", "scheduled", "published", "verified_outcome"];
  const query = state.search.toLowerCase();
  const items = state.content.filter((item) => {
    const matchesStage = state.filter === "all" || deriveStage(item) === state.filter;
    const haystack = `${item.title} ${item.body} ${item.channels.join(" ")} ${campaignFor(item)?.title || ""}`.toLowerCase();
    return matchesStage && (!query || haystack.includes(query));
  });
  return `${renderIntro("Every item, with its real state.", "Search and filter the local synthetic catalog. Open an item to inspect its independent review, publication, and outcome states.")}
  <div class="toolbar"><input id="content-search" type="search" value="${escapeHtml(state.search)}" placeholder="Search titles, channels, or campaigns" aria-label="Search content"><div class="filter-pills">${stageOptions.map((stage) => `<button type="button" data-filter="${stage}" aria-pressed="${state.filter === stage}">${label(stage)}</button>`).join("")}</div></div>
  <div class="data-table-wrap"><table class="data-table"><thead><tr><th>Content item</th><th>Project / campaign</th><th>Review</th><th>Publication</th><th>Outcome</th><th>Scheduled</th></tr></thead><tbody>${items.map((item) => {
    const campaign = campaignFor(item);
    const project = projectForId(campaign?.projectId);
    return `<tr data-open-item="${item.id}" tabindex="0"><td class="title-cell"><b>${escapeHtml(item.title)}</b><small>${escapeHtml(item.format)} · ${escapeHtml(item.channels.join(", "))}</small></td><td>${escapeHtml(project?.name || "Internal")}<br><span class="mini-label">${escapeHtml(campaign?.title || "No campaign")}</span></td><td><span class="state-tag">${escapeHtml(label(item.reviewStatus))}</span></td><td><span class="state-tag">${escapeHtml(label(item.publicationStatus))}</span></td><td><span class="state-tag">${escapeHtml(label(item.outcomeStatus))}</span></td><td>${escapeHtml(formatDate(item.scheduledAt, { time: true }))}</td></tr>`;
  }).join("")}</tbody></table>${items.length ? "" : `<div class="empty-state">No content matches this view.</div>`}</div>`;
}

function renderCalendar() {
  const monday = new Date("2026-11-09T12:00:00-05:00");
  const days = Array.from({ length: 5 }, (_, index) => {
    const date = new Date(monday); date.setDate(date.getDate() + index); return date;
  });
  return `${renderIntro("Cadence without false certainty.", "This planning board demonstrates intended timing. It is not connected to a calendar or publishing queue.", `<b>CALENDAR ADAPTER</b>Not configured`)}
  <div class="calendar-board">${days.map((day) => {
    const items = state.content.filter((item) => item.scheduledAt && new Date(item.scheduledAt).toDateString() === day.toDateString());
    return `<section class="calendar-day"><header class="day-head"><b>${day.toLocaleDateString("en-US", { weekday: "short" })}</b><small>${day.toLocaleDateString("en-US", { month: "short", day: "numeric" })}</small></header>${items.map((item) => `<article class="calendar-card ${deriveStage(item)}" data-open-item="${item.id}" tabindex="0"><time>${formatDate(item.scheduledAt, { time: true })}</time><b>${escapeHtml(item.title)}</b><small>${escapeHtml(item.channels.join(" · "))} · ${escapeHtml(label(deriveStage(item)))}</small></article>`).join("") || `<p class="mini-label">No planned item</p>`}</section>`;
  }).join("")}</div>`;
}

function renderCampaigns() {
  const selected = projectForId(state.selectedProject);
  const scopedCampaigns = SEED.campaigns.filter((campaign) => campaign.projectId === selected.id);
  return `${renderIntro("Project lanes keep truth separate.", "The donor’s fixed portfolio map is now a data-driven scope model. Choose a synthetic project to see only its campaigns, channels, assets, and boundary.", `<b>ADAPTER STATE</b>No public campaign projection`)}
  <div class="toolbar"><div class="filter-pills">${SEED.projects.map((project) => `<button type="button" data-project="${project.id}" aria-pressed="${project.id === selected.id}">${escapeHtml(project.code)} · ${escapeHtml(project.name)}</button>`).join("")}</div></div>
  <section class="panel" style="margin-bottom:14px"><div class="panel-head"><div><h3>${escapeHtml(selected.name)}</h3><p>${escapeHtml(label(selected.state))}</p></div>${stagePill(selected.state)}</div><div style="padding:20px;display:grid;grid-template-columns:1.2fr 1fr 1fr;gap:20px"><div><span class="mini-label">PRIMARY JOB</span><p style="font-size:10px;line-height:1.6">${escapeHtml(selected.primaryJob)}</p></div><div><span class="mini-label">PUBLIC BOUNDARY</span><p style="font-size:10px;line-height:1.6">${escapeHtml(selected.publicBoundary)}</p></div><div><span class="mini-label">NEXT GATE</span><p style="font-size:10px;line-height:1.6">${escapeHtml(selected.nextGate)}</p></div></div></section>
  <div class="card-grid">${scopedCampaigns.map((campaign) => `<article class="campaign-card"><div class="campaign-card-head"><span class="mini-label">${escapeHtml(campaign.id.toUpperCase())}</span>${stagePill(campaign.status)}</div><h3>${escapeHtml(campaign.title)}</h3><p>${escapeHtml(campaign.objective)}</p><div class="channel-chips">${campaign.channels.map((channel) => `<span>${escapeHtml(channel)}</span>`).join("")}</div><div class="campaign-meta"><div><small>Audience</small><b>${escapeHtml(campaign.audience)}</b></div><div><small>Outcome definition</small><b>${escapeHtml(campaign.outcome)}</b></div><div><small>Owner</small><b>${escapeHtml(campaign.owner)}</b></div><div><small>Assignments</small><b>${SEED.contributorScorecard.assignments.filter((item) => item.campaignId === campaign.id).length} synthetic</b></div></div></article>`).join("") || `<div class="panel empty-state">No campaign is assigned to this project lane.</div>`}</div>`;
}

function contributionDraft(projectId) {
  try { return JSON.parse(localStorage.getItem(`${CONTRIBUTION_PREFIX}.${projectId}`) || "{}"); } catch { return {}; }
}

function contributionSteps() {
  return ["Scope", "Evidence", "Build", "Safety review", "Handoff"];
}

function renderContributions() {
  const project = projectForId(state.selectedProject);
  const draft = contributionDraft(project.id);
  const steps = contributionSteps();
  const step = state.contributionStep;
  const stepMarkup = steps.map((name, index) => `<button type="button" data-contribution-step="${index + 1}" aria-current="${step === index + 1 ? "step" : "false"}"><span>${String(index + 1).padStart(2, "0")}</span>${escapeHtml(name)}</button>`).join("");
  let content = "";
  if (step === 1) content = `<label>Project lane<select name="projectId" data-draft-field><option value="">Select a project</option>${SEED.projects.map((item) => `<option value="${item.id}" ${item.id === project.id ? "selected" : ""}>${escapeHtml(item.name)}</option>`).join("")}</select></label><label>Assignment code<input name="assignmentCode" data-draft-field value="${escapeHtml(draft.assignmentCode || "")}" placeholder="Example: BLK-002"></label><label>Contribution type<select name="type" data-draft-field><option value="">Choose a type</option>${SEED.contributionTypes.map((type) => `<option ${draft.type === type ? "selected" : ""}>${escapeHtml(type)}</option>`).join("")}</select></label><div class="detail-copy"><b>${escapeHtml(project.name)}</b><br>${escapeHtml(project.description)}<br><small>Boundary: ${escapeHtml(project.publicBoundary)}</small></div>`;
  if (step === 2) content = `<label>Source or evidence reference<input name="source" data-draft-field value="${escapeHtml(draft.source || "")}" placeholder="Local file, approved URL, or named source"></label><label>Audience<input name="audience" data-draft-field value="${escapeHtml(draft.audience || "")}" placeholder="Who should this help?"></label><label>Material claim<textarea name="claim" data-draft-field rows="5" placeholder="State one claim the source can support.">${escapeHtml(draft.claim || "")}</textarea></label><p class="mini-label">A source reference is not an approval. Review still happens in step 4.</p>`;
  if (step === 3) content = `<label>Channel treatment<div class="channel-chips studio-channels">${["Website", "LinkedIn", "Instagram", "Newsletter", "Internal"].map((channel) => `<button type="button" data-draft-channel="${channel}" aria-pressed="${(draft.channels || []).includes(channel)}">${channel}</button>`).join("")}</div></label><label>Draft copy<textarea name="copy" data-draft-field rows="9" placeholder="Write the contribution draft here.">${escapeHtml(draft.copy || "")}</textarea></label><label>Alt text or accessibility note<textarea name="altText" data-draft-field rows="3" placeholder="Describe the useful visual information.">${escapeHtml(draft.altText || "")}</textarea></label>`;
  if (step === 4) content = `<div class="studio-checks">${SEED.safetyChecks.map((check, index) => `<label><input type="checkbox" name="check${index}" data-draft-check ${draft.checks?.[index] ? "checked" : ""}><span><b>${escapeHtml(check)}</b></span></label>`).join("")}</div><div class="detail-copy">Completing these checks prepares a local handoff packet. It does not approve, schedule, publish, send, or verify an outcome.</div>`;
  if (step === 5) {
    const packet = buildHandoffPacket(project, draft);
    content = `<div class="handoff-packet"><p class="mini-label">LOCAL HANDOFF PACKET</p><pre>${escapeHtml(packet)}</pre></div><div class="detail-action"><p>No recipient or external connector is configured. Copying keeps the decision with the operator.</p><button class="primary-action" type="button" data-action="copy-handoff">Copy packet</button></div>`;
  }
  return `${renderIntro("Build from a named scope and source.", "This recreates the donor contribution studio as a project-agnostic, local handoff workflow. Drafts are isolated by project and never leave the browser automatically.", `<b>WORKFLOW PARITY</b>Scope → evidence → build → review → handoff`)}
  <div class="toolbar"><div class="filter-pills">${SEED.projects.map((item) => `<button type="button" data-project="${item.id}" aria-pressed="${item.id === project.id}">${escapeHtml(item.code)}</button>`).join("")}</div></div>
  <div class="contribution-layout">
    <aside class="contribution-steps">${stepMarkup}</aside>
    <section class="panel contribution-form"><header class="panel-head"><div><h3>${escapeHtml(steps[step - 1])}</h3><p>${escapeHtml(project.name)} · LOCAL DRAFT</p></div><button type="button" data-action="clear-contribution">Clear project draft</button></header><form id="contribution-form">${content}<div class="studio-nav"><button type="button" data-contribution-step="${Math.max(1, step - 1)}" ${step === 1 ? "disabled" : ""}>← Back</button><span>Step ${step} of ${steps.length}</span><button type="button" data-contribution-step="${Math.min(5, step + 1)}" ${step === 5 ? "disabled" : ""}>Next →</button></div></form></section>
    <aside class="panel contributor-preview"><header class="panel-head"><div><h3>Contributor view</h3><p>SYNTHETIC SCORECARD PARITY</p></div></header>${renderScorecardCompact()}</aside>
  </div>`;
}

function buildHandoffPacket(project, draft) {
  return [
    `BLANKIT contribution handoff — ${project.code}`,
    `Assignment: ${draft.assignmentCode || "Not set"}`,
    `Project: ${project.name}`,
    `Type: ${draft.type || "Not set"}`,
    `Audience: ${draft.audience || "Not set"}`,
    `Channels: ${(draft.channels || []).join(", ") || "Not set"}`,
    `Source: ${draft.source || "Not set"}`,
    `Claim: ${draft.claim || "Not set"}`,
    "",
    "Draft:", draft.copy || "Not set",
    "", `Accessibility note: ${draft.altText || "Not set"}`,
    "", "State: local draft prepared for human review; not approved or published."
  ].join("\n");
}

function renderScorecardCompact() {
  const card = SEED.contributorScorecard;
  const assignment = card.assignments[0];
  return `<div style="padding:18px"><span class="mini-label">${escapeHtml(card.contributor)}</span><h3 style="font-family:var(--serif);font-weight:400;margin:8px 0 18px">Weekly contribution view</h3><div class="campaign-meta"><div><small>This week</small><b>${card.thisWeek.score} score</b></div><div><small>Last week</small><b>${card.lastWeek.score} score</b></div></div><div class="attention-item"><span class="attention-icon">1</span><div><b>${escapeHtml(assignment.title)}</b><p>${escapeHtml(label(assignment.lifecycleStatus))} · ${escapeHtml(assignment.nextAction)}</p></div></div><div class="detail-copy"><b>Manager note</b><br>${escapeHtml(card.managerNote)}</div><p class="mini-label">A real contributor view requires the future owned-auth adapter. Signed donor links are not active here.</p></div>`;
}

function saveContributionField(target) {
  const projectId = state.selectedProject;
  const draft = contributionDraft(projectId);
  if (target.matches("[data-draft-field]")) draft[target.name] = target.value;
  if (target.matches("[data-draft-check]")) {
    draft.checks ||= [];
    const index = Number(target.name.replace("check", ""));
    draft.checks[index] = target.checked;
  }
  localStorage.setItem(`${CONTRIBUTION_PREFIX}.${projectId}`, JSON.stringify(draft));
}

function renderLibrary() {
  return `${renderIntro("A usable language and asset library.", "The brand system keeps wording, assets, rights, and usage state close to the work. These entries are original or synthetic local studies.")}
  <div class="library-grid"><section class="panel"><header class="panel-head"><div><h3>Voice principles</h3><p>BUSINESS LANGUAGE SYSTEM</p></div></header><div class="voice-list">${SEED.brandProfile.voice.map((item, index) => `<div class="voice-item"><span>${String(index + 1).padStart(2, "0")}</span><div><b>${escapeHtml(item.name)}</b><p>${escapeHtml(item.note)}</p></div></div>`).join("")}</div></section><aside><section class="panel"><header class="panel-head"><div><h3>Asset references</h3><p>RIGHTS AND READINESS</p></div></header><div class="asset-list">${SEED.assets.map((asset) => `<div class="asset-row"><b>${escapeHtml(asset.name)}</b><p>${escapeHtml(asset.type)} · ${escapeHtml(asset.rights)}</p><small>${escapeHtml(label(asset.state))}</small></div>`).join("")}</div></section><section class="avoid-box"><h3>Avoid</h3><ul>${SEED.brandProfile.avoid.map((item) => `<li>${escapeHtml(item)}</li>`).join("")}</ul></section></aside></div>`;
}

function renderOperations() {
  return `${renderIntro("The operating memory travels with the work.", "SOPs, handoffs, decisions, corrections, and audit events make the system legible to a future operator.")}
  <div class="operations-grid"><section class="panel"><header class="panel-head"><div><h3>Core SOPs</h3><p>STANDARD OPERATING PATH</p></div></header><div class="sop-list">${SEED.sops.map((sop, index) => `<div class="sop-item"><span>${String(index + 1).padStart(2, "0")}</span><div><b>${escapeHtml(sop.title)}</b><p>${escapeHtml(sop.summary)}</p></div></div>`).join("")}</div></section><section class="panel"><header class="panel-head"><div><h3>Decisions and handoffs</h3><p>OWNERSHIP BEFORE ACTION</p></div></header><div class="task-list">${SEED.tasks.map((task) => `<div class="task-row"><div class="task-row-head"><b>${escapeHtml(task.title)}</b>${stagePill(task.status)}</div><p>${escapeHtml(task.owner)} · ${escapeHtml(task.due)}<br>Handoff: ${escapeHtml(task.handoff)}</p></div>`).join("")}</div></section><section class="panel audit-panel"><header class="panel-head"><div><h3>Correction and audit trail</h3><p>APPEND EVENTS—DO NOT ERASE HISTORY</p></div></header><div class="audit-list">${state.audit.map((event) => `<div class="audit-row"><time>${escapeHtml(formatDate(event.at, { time: true, year: true }))}</time><span>${escapeHtml(event.actor)}</span><div><b>${escapeHtml(event.action)} · ${escapeHtml(event.object)}</b><p>${escapeHtml(event.note)}</p></div></div>`).join("")}</div></section></div>`;
}

function renderOnboarding() {
  const checks = [
    ["Read the security boundary", "Know why the operator workspace stays local until owned authentication is selected."],
    ["Learn the status vocabulary", "Review approval, publication state, and outcome verification as separate dimensions."],
    ["Open every project lane", "Understand how language, sources, assets, and campaign work stay isolated by project."],
    ["Run one contribution handoff", "Prepare a synthetic packet without sending or publishing anything."],
    ["Review the correction trail", "Practice appending an event instead of rewriting published history."],
    ["Confirm the decision gates", "Do not connect accounts, deploy the console, or touch DNS without an adopted plan."]
  ];
  let completed = [];
  try { completed = JSON.parse(localStorage.getItem(ONBOARDING_KEY) || "[]"); } catch { /* optional */ }
  return `${renderIntro("A first day that explains the system.", "The operator should be able to understand the boundary, find the work, follow the states, and prepare a safe handoff without founder memory.")}
  <div class="onboarding-layout"><section class="panel"><header class="panel-head"><div><h3>Operator start checklist</h3><p>${completed.length} OF ${checks.length} COMPLETED LOCALLY</p></div></header><div class="checklist">${checks.map((item, index) => `<label class="check-item"><input type="checkbox" data-onboarding="${index}" ${completed.includes(index) ? "checked" : ""}><span><b>${escapeHtml(item[0])}</b><p>${escapeHtml(item[1])}</p></span></label>`).join("")}</div></section><aside class="start-card"><h3>Before you operate</h3><p>Blankit is a framework, not a connected service. The future operator must receive explicit authority, a real account, and the approved connector scope.</p><ol><li>No live connector means no live claim.</li><li>No approval means no schedule.</li><li>No receipt means no publication record.</li><li>No evidence means no verified outcome.</li></ol><button type="button" data-action="reset-demo">Reset all local demo changes</button></aside></div>`;
}

function render() {
  const [kicker, title] = viewMeta[state.view];
  document.querySelector("#view-kicker").textContent = kicker;
  document.querySelector("#view-title").textContent = title;
  document.querySelectorAll("[data-view]").forEach((button) => button.setAttribute("aria-current", button.dataset.view === state.view ? "page" : "false"));
  const views = {
    overview: renderOverview, content: renderContent, calendar: renderCalendar,
    campaigns: renderCampaigns, contributions: renderContributions,
    library: renderLibrary, operations: renderOperations, onboarding: renderOnboarding
  };
  document.querySelector("#workspace-main").innerHTML = views[state.view]();
}

function openItem(id) {
  const item = state.content.find((entry) => entry.id === id);
  if (!item) return;
  const campaign = campaignFor(item);
  const project = projectForId(campaign?.projectId);
  const checks = readinessChecks(item);
  const transition = nextDemoTransition(item);
  const dialog = document.querySelector("#detail-dialog");
  document.querySelector("#detail-content").innerHTML = `<header class="detail-hero"><p>${escapeHtml(project?.name || "Internal")} / ${escapeHtml(campaign?.title || "No campaign")}</p><h2>${escapeHtml(item.title)}</h2>${stagePill(deriveStage(item))}</header><div class="detail-body"><div class="detail-grid"><div class="detail-field"><small>Review state</small><b>${escapeHtml(label(item.reviewStatus))}</b></div><div class="detail-field"><small>Publication state</small><b>${escapeHtml(label(item.publicationStatus))}</b></div><div class="detail-field"><small>Outcome state</small><b>${escapeHtml(label(item.outcomeStatus))}</b></div><div class="detail-field"><small>Owner</small><b>${escapeHtml(item.owner)}</b></div><div class="detail-field"><small>Channels</small><b>${escapeHtml(item.channels.join(", "))}</b></div><div class="detail-field"><small>Claim source</small><b>${escapeHtml(item.claimSource)}</b></div></div><div class="detail-copy">${escapeHtml(item.body)}</div><div class="readiness"><h3>Publication readiness</h3>${checks.map((check) => `<div class="check-row ${check.pass ? "" : "fail"}"><span>${check.pass ? "✓" : "×"}</span>${escapeHtml(check.label)}</div>`).join("")}</div><div class="detail-action"><p>${transition?.blocked ? `Blocked: ${transition.blockers.map((blocker) => blocker.label).join("; ")}` : "Synthetic status exercise only. No external action occurs."}</p><button class="primary-action" type="button" data-advance-item="${item.id}" ${!transition || transition.blocked ? "disabled" : ""}>${escapeHtml(transition?.label || "Workflow complete")}</button></div></div>`;
  dialog.showModal();
}

function advanceItem(id) {
  const index = state.content.findIndex((entry) => entry.id === id);
  const current = state.content[index];
  const transition = nextDemoTransition(current);
  if (!transition || transition.blocked) return;
  const updated = applyDemoTransition(current, transition);
  state.content[index] = updated;
  state.audit.unshift({ id: `evt-local-${Date.now()}`, at: new Date().toISOString(), actor: "Local synthetic operator", action: `${label(transition.dimension)}: ${label(transition.from)} → ${label(transition.to)}`, object: updated.title, note: "Local demo transition only; no external system involved." });
  saveContent();
  document.querySelector("#detail-dialog").close();
  render();
  toast(`Synthetic record advanced to ${label(deriveStage(updated))}.`);
}

function showSecurity() {
  const dialog = document.querySelector("#detail-dialog");
  document.querySelector("#detail-content").innerHTML = `<div class="security-dialog"><h2>Authentication is a decision gate.</h2><p><strong>This workspace is local-only.</strong> Before any private deployment, Blankit needs an owned identity boundary implemented with proven authentication, password hashing or federated identity, secure sessions, recovery, rate limits, audit logging, and role-based authorization.</p><ul><li>No Entra dependency is assumed.</li><li>No passwords or production accounts are stored here.</li><li>Public hosting must exclude the operator build until the gate is complete.</li><li>Provider connectors require separate authorization and least-privilege review.</li></ul><p>See <strong>docs/SECURITY.md</strong> for the full gate.</p></div>`;
  dialog.showModal();
}

document.addEventListener("click", async (event) => {
  const view = event.target.closest("[data-view]")?.dataset.view;
  if (view) { state.view = view; render(); document.querySelector("#workspace-main").focus(); return; }
  const goView = event.target.closest("[data-go-view]")?.dataset.goView;
  if (goView) { state.view = goView; render(); return; }
  const itemId = event.target.closest("[data-open-item]")?.dataset.openItem;
  if (itemId) { openItem(itemId); return; }
  const filter = event.target.closest("[data-filter]")?.dataset.filter;
  if (filter) { state.filter = filter; render(); document.querySelector("#content-search")?.focus(); return; }
  const projectId = event.target.closest("[data-project]")?.dataset.project;
  if (projectId) { state.selectedProject = projectId; state.contributionStep = 1; render(); return; }
  const step = event.target.closest("[data-contribution-step]")?.dataset.contributionStep;
  if (step) { state.contributionStep = Number(step); render(); return; }
  const channel = event.target.closest("[data-draft-channel]")?.dataset.draftChannel;
  if (channel) {
    const draft = contributionDraft(state.selectedProject); draft.channels ||= [];
    draft.channels = draft.channels.includes(channel) ? draft.channels.filter((item) => item !== channel) : [...draft.channels, channel];
    localStorage.setItem(`${CONTRIBUTION_PREFIX}.${state.selectedProject}`, JSON.stringify(draft)); render(); return;
  }
  const advance = event.target.closest("[data-advance-item]")?.dataset.advanceItem;
  if (advance) { advanceItem(advance); return; }
  const action = event.target.closest("[data-action]")?.dataset.action;
  if (action === "close-dialog") document.querySelector("#detail-dialog").close();
  if (action === "show-security") showSecurity();
  if (action === "focus-search") { state.view = "content"; render(); document.querySelector("#content-search")?.focus(); }
  if (action === "clear-contribution") { localStorage.removeItem(`${CONTRIBUTION_PREFIX}.${state.selectedProject}`); render(); toast("Local project draft cleared."); }
  if (action === "copy-handoff") {
    const project = projectForId(state.selectedProject);
    await navigator.clipboard.writeText(buildHandoffPacket(project, contributionDraft(project.id)));
    toast("Local handoff packet copied. Nothing was sent.");
  }
  if (action === "reset-demo") {
    localStorage.removeItem(STORAGE_KEY); localStorage.removeItem(ONBOARDING_KEY);
    SEED.projects.forEach((project) => localStorage.removeItem(`${CONTRIBUTION_PREFIX}.${project.id}`));
    state.content = SEED.contentItems.map((item) => ({ ...item })); state.audit = [...SEED.audit]; render(); toast("Local demo state reset.");
  }
  if (event.target.closest(".mobile-nav-toggle")) {
    const button = event.target.closest(".mobile-nav-toggle");
    const nav = document.querySelector("#workspace-nav");
    const open = !nav.classList.contains("open"); nav.classList.toggle("open", open); button.setAttribute("aria-expanded", String(open));
  }
});

document.addEventListener("input", (event) => {
  if (event.target.id === "content-search") { state.search = event.target.value; render(); document.querySelector("#content-search")?.focus(); }
  saveContributionField(event.target);
});

document.addEventListener("change", (event) => {
  saveContributionField(event.target);
  if (event.target.matches("[data-onboarding]")) {
    const selected = [...document.querySelectorAll("[data-onboarding]:checked")].map((input) => Number(input.dataset.onboarding));
    localStorage.setItem(ONBOARDING_KEY, JSON.stringify(selected)); render();
  }
  if (event.target.name === "projectId" && event.target.value) { state.selectedProject = event.target.value; state.contributionStep = 1; render(); }
});

document.addEventListener("keydown", (event) => {
  const row = event.target.closest("[data-open-item]");
  if (row && (event.key === "Enter" || event.key === " ")) { event.preventDefault(); openItem(row.dataset.openItem); }
});

document.querySelector("#detail-dialog").addEventListener("click", (event) => {
  if (event.target === event.currentTarget) event.currentTarget.close();
});

render();
