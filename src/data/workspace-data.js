export const WORKFLOW = Object.freeze({
  review: ["draft", "in_review", "changes_requested", "approved"],
  publication: ["not_ready", "ready", "scheduled", "published"],
  outcome: ["not_measured", "pending_verification", "verified"],
  reviewTransitions: {
    draft: ["in_review"],
    in_review: ["changes_requested", "approved"],
    changes_requested: ["in_review"],
    approved: []
  },
  publicationTransitions: {
    not_ready: ["ready"],
    ready: ["scheduled"],
    scheduled: ["published"],
    published: []
  },
  outcomeTransitions: {
    not_measured: ["pending_verification"],
    pending_verification: ["verified"],
    verified: []
  }
});

export const SEED = Object.freeze({
  meta: {
    dataMode: "synthetic_demo",
    generatedFor: "Blankit framework review",
    externalConnections: false,
    authentication: "unresolved_adapter_boundary",
    notice: "All records are synthetic. No social account, analytics source, inbox, or publishing provider is connected."
  },
  brandProfile: {
    name: "Blankit",
    expansion: "Business Language and Networking Kit",
    tagline: "We got you covered.",
    voice: [
      { name: "Clear before clever", note: "Make the next action obvious. Keep the language human." },
      { name: "Useful confidence", note: "State what is known. Label what is planned, synthetic, or unverified." },
      { name: "Proof over polish", note: "Tie public claims to a source, owner, and review state." },
      { name: "Warm restraint", note: "Sound capable and approachable without hype or filler." }
    ],
    avoid: ["unsupported superlatives", "invented outcomes", "generic innovation language", "copy-paste captions"]
  },
  projects: [
    {
      id: "scope-blankit",
      code: "BLK",
      name: "Blankit brand",
      state: "framework_review",
      description: "The public identity and operating language for the Business Language and Networking Kit.",
      primaryJob: "Explain the coverage system without claiming unimplemented services.",
      publicBoundary: "Only adopted brand language and approved public pages.",
      nextGate: "Founder approval of scope, identity, and primary offer.",
      channels: ["Website", "LinkedIn"],
      voice: "Clear, useful, warm, restrained",
      assetIds: ["ast-001", "ast-002"]
    },
    {
      id: "scope-fieldnote",
      code: "FLD",
      name: "Fieldnote Studio",
      state: "synthetic_demo",
      description: "A fictional service-business lane used to prove client isolation and contribution handoffs.",
      primaryJob: "Turn practical field knowledge into useful public education.",
      publicBoundary: "Synthetic examples only; no real client, account, or contact data.",
      nextGate: "Replace the demo with an authorized client scope.",
      channels: ["Instagram", "Newsletter"],
      voice: "Direct, practical, neighborly",
      assetIds: ["ast-003"]
    },
    {
      id: "scope-civic",
      code: "CVC",
      name: "Civic coverage pilot",
      state: "reserved_demo",
      description: "A fictional public-impact lane demonstrating evidence, consent, corrections, and outcome checks.",
      primaryJob: "Make community work legible without overstating participation or impact.",
      publicBoundary: "No names, partner claims, or outcome language without source evidence.",
      nextGate: "Define a real project owner and evidence policy.",
      channels: ["Website", "Newsletter"],
      voice: "Factual, accessible, accountable",
      assetIds: []
    }
  ],
  campaigns: [
    {
      id: "cmp-cover-story",
      projectId: "scope-blankit",
      title: "The coverage story",
      objective: "Explain how consistent language connects a business presence.",
      audience: "Owner-led service businesses preparing to delegate communications.",
      status: "planning",
      owner: "Operator (unassigned)",
      channels: ["LinkedIn", "Website"],
      outcome: "A qualified conversation request with a traceable source.",
      contentIds: ["cnt-001", "cnt-002"]
    },
    {
      id: "cmp-local-impact",
      projectId: "scope-civic",
      title: "Visible local impact",
      objective: "Document a community contribution without inflating the result.",
      audience: "Local partners and community organizations.",
      status: "active_demo",
      owner: "Operator (unassigned)",
      channels: ["Instagram", "Newsletter"],
      outcome: "Partner-confirmed distribution plus a verified follow-up note.",
      contentIds: ["cnt-003", "cnt-004"]
    }
  ],
  contentItems: [
    {
      id: "cnt-001",
      title: "One language system, fewer dropped threads",
      campaignId: "cmp-cover-story",
      format: "Carousel outline",
      channels: ["LinkedIn"],
      owner: "Future operator",
      reviewStatus: "in_review",
      publicationStatus: "not_ready",
      outcomeStatus: "not_measured",
      scheduledAt: null,
      claimSource: "Synthetic positioning workshop note",
      assetIds: ["ast-001"],
      altText: "Five folded panels connect brand language, campaigns, channels, relationships, and outcomes.",
      body: "A sample Blankit explainer showing how a business language system can keep public work coherent.",
      nextAction: "Review wording against the final service scope."
    },
    {
      id: "cnt-002",
      title: "What coverage actually means",
      campaignId: "cmp-cover-story",
      format: "Website article brief",
      channels: ["Website"],
      owner: "Future operator",
      reviewStatus: "approved",
      publicationStatus: "ready",
      outcomeStatus: "not_measured",
      scheduledAt: "2026-11-16T15:00:00.000Z",
      claimSource: "Founder brief; framework vocabulary",
      assetIds: ["ast-002"],
      altText: "Red, green, and blue woven bands form a protective cover above a business brief.",
      body: "A synthetic article brief that defines coverage as organized language, presence, campaigns, network, and impact.",
      nextAction: "Confirm destination before scheduling."
    },
    {
      id: "cnt-003",
      title: "Partner kit handoff",
      campaignId: "cmp-local-impact",
      format: "Photo caption draft",
      channels: ["Instagram", "Newsletter"],
      owner: "Future operator",
      reviewStatus: "draft",
      publicationStatus: "not_ready",
      outcomeStatus: "not_measured",
      scheduledAt: null,
      claimSource: "Synthetic partner scenario",
      assetIds: [],
      altText: "",
      body: "Synthetic copy awaiting an approved image, partner consent, and a factual handoff count.",
      nextAction: "Collect consent, approved visual, and source evidence."
    },
    {
      id: "cnt-004",
      title: "Thirty-day impact follow-up",
      campaignId: "cmp-local-impact",
      format: "Outcome note",
      channels: ["Newsletter"],
      owner: "Future operator",
      reviewStatus: "approved",
      publicationStatus: "published",
      outcomeStatus: "pending_verification",
      scheduledAt: "2026-10-28T14:00:00.000Z",
      publishedAt: "2026-10-28T14:06:00.000Z",
      claimSource: "Synthetic operator exercise",
      assetIds: ["ast-003"],
      altText: "A simple follow-up card with a check box and partner confirmation line.",
      body: "A synthetic published-state record used to demonstrate that publication is not the same as a verified outcome.",
      nextAction: "Attach partner confirmation before marking the outcome verified."
    },
    {
      id: "cnt-005",
      title: "Operator welcome note",
      campaignId: null,
      format: "Internal SOP message",
      channels: ["Internal"],
      owner: "Founder",
      reviewStatus: "approved",
      publicationStatus: "published",
      outcomeStatus: "verified",
      scheduledAt: "2026-11-03T14:00:00.000Z",
      publishedAt: "2026-11-03T14:00:00.000Z",
      verifiedAt: "2026-11-03T14:05:00.000Z",
      claimSource: "Synthetic onboarding exercise",
      assetIds: [],
      altText: "",
      body: "A synthetic internal example showing a completed, verified workflow.",
      nextAction: "None—retain as a training example."
    }
  ],
  channelPlans: [
    { channel: "Website", role: "Source of truth", cadence: "As evidence changes", state: "planned", connection: "none" },
    { channel: "LinkedIn", role: "Professional narrative", cadence: "1–2 useful posts weekly", state: "planning_only", connection: "none" },
    { channel: "Instagram", role: "Visual field notes", cadence: "Only when visual proof exists", state: "planning_only", connection: "none" },
    { channel: "Newsletter", role: "Relationship follow-through", cadence: "Monthly candidate", state: "planning_only", connection: "none" }
  ],
  assets: [
    { id: "ast-001", name: "Coverage bands study", type: "SVG concept", state: "review", rights: "Original Blankit study", source: "Local framework" },
    { id: "ast-002", name: "Primary folded-B mark", type: "SVG logo", state: "approved_for_framework", rights: "Original Blankit study", source: "Local framework" },
    { id: "ast-003", name: "Impact follow-up card", type: "Synthetic reference", state: "demo_only", rights: "Synthetic", source: "Local framework" }
  ],
  tasks: [
    { id: "tsk-001", title: "Confirm service boundary", owner: "Founder", status: "waiting", due: "Decision gate", handoff: "Operator receives adopted scope" },
    { id: "tsk-002", title: "Approve primary logo direction", owner: "Founder", status: "ready_for_review", due: "Founder review", handoff: "Designer prepares final exports" },
    { id: "tsk-003", title: "Select authentication approach", owner: "Founder + technical lead", status: "blocked_by_decision", due: "Before any private deployment", handoff: "Implementer configures owned sign-in" },
    { id: "tsk-004", title: "Choose public hosting meaning of ‘Google’", owner: "Founder", status: "blocked_by_decision", due: "Before deployment", handoff: "Technical lead prepares hosting path" }
  ],
  sops: [
    { id: "sop-001", title: "Create a content item", summary: "Record objective, audience, proof, channel, asset, alt text, owner, and next action before review." },
    { id: "sop-002", title: "Review without ambiguity", summary: "Separate copy approval from publication readiness. A review pass does not schedule or publish anything." },
    { id: "sop-003", title: "Prepare publication", summary: "Require an approved draft, rights-cleared asset, alt text, destination, time, and an explicit human authorization." },
    { id: "sop-004", title: "Verify an outcome", summary: "After publication, attach evidence and record what actually happened. Never infer impact from reach alone." },
    { id: "sop-005", title: "Correct the record", summary: "Add a correction event with reason, owner, time, and superseded version. Do not silently overwrite published history." }
  ],
  audit: [
    { id: "evt-004", at: "2026-11-03T14:05:00.000Z", actor: "Synthetic operator", action: "Outcome verified", object: "Operator welcome note", note: "Training acceptance recorded; no external system involved." },
    { id: "evt-003", at: "2026-10-28T14:06:00.000Z", actor: "Synthetic operator", action: "Publication recorded", object: "Thirty-day impact follow-up", note: "Demo state only; no provider receipt exists." },
    { id: "evt-002", at: "2026-10-27T16:30:00.000Z", actor: "Synthetic reviewer", action: "Copy approved", object: "Thirty-day impact follow-up", note: "Outcome verification remains open." },
    { id: "evt-001", at: "2026-10-27T14:00:00.000Z", actor: "Synthetic operator", action: "Draft created", object: "Thirty-day impact follow-up", note: "Created from a synthetic scenario." }
  ],
  contributorScorecard: {
    contributor: "Synthetic contributor",
    campaignId: "cmp-cover-story",
    thisWeek: {
      weekOf: "2026-11-09",
      score: 64,
      summary: "One review-ready contribution is moving; the evidence note still needs tightening.",
      goals: [
        { title: "Deliver one sourced carousel outline", current: 1, target: 1, unit: "draft", status: "completed" },
        { title: "Resolve claim-source comments", current: 2, target: 3, unit: "comments", status: "in_progress" }
      ]
    },
    lastWeek: {
      weekOf: "2026-11-02",
      score: 58,
      rank: null,
      summary: "The first outline arrived on time; source notes were incomplete.",
      wins: ["Clear opening structure", "Accessible visual description included"],
      improvements: ["Attach the proof note before review", "Use the project vocabulary library"]
    },
    managerNote: "Synthetic coaching note: keep the strongest claim tied to a named source and leave publishing decisions to the operator.",
    assignments: [
      {
        id: "asg-001",
        code: "BLK-001",
        projectId: "scope-blankit",
        campaignId: "cmp-cover-story",
        title: "Coverage-story carousel outline",
        lifecycleStatus: "changes_requested",
        dueAt: "2026-11-12T22:00:00.000Z",
        revisionRound: 1,
        feedback: "Tighten the opening claim and attach the founder-brief source note.",
        nextAction: "Revise the opening and resubmit the source note.",
        milestones: { sentAt: "2026-11-06T14:00:00.000Z", submittedAt: "2026-11-08T16:30:00.000Z", acceptedAt: null },
        publication: { calendarLinked: false }
      }
    ]
  },
  contributionTypes: ["Social copy", "Campaign concept", "Visual direction", "Source/evidence note", "Outcome follow-up"],
  safetyChecks: [
    "The project scope and assignment code match.",
    "Every material claim has a source or is labeled as an idea.",
    "The draft contains no private contact, credential, or account data.",
    "Approval, scheduling, publication, and outcome verification remain separate."
  ]
});

export function deriveStage(item) {
  if (item.outcomeStatus === "verified") return "verified_outcome";
  if (item.publicationStatus === "published") return "published";
  if (item.publicationStatus === "scheduled") return "scheduled";
  if (item.reviewStatus === "approved") return "approved";
  if (item.reviewStatus === "in_review" || item.reviewStatus === "changes_requested") return "in_review";
  return "planned";
}

export function readinessChecks(item, seed = SEED) {
  const assets = item.assetIds.map((id) => seed.assets.find((asset) => asset.id === id)).filter(Boolean);
  const externalChannels = item.channels.filter((channel) => channel !== "Internal");
  return [
    { key: "approval", label: "Copy is approved", pass: item.reviewStatus === "approved" },
    { key: "source", label: "Claim source is recorded", pass: Boolean(item.claimSource?.trim()) },
    { key: "channel", label: "Destination is defined", pass: item.channels.length > 0 },
    { key: "asset", label: "Required assets are referenced", pass: externalChannels.length === 0 || assets.length > 0 },
    { key: "accessibility", label: "Alt text is present", pass: externalChannels.length === 0 || Boolean(item.altText?.trim()) },
    { key: "time", label: "Publishing time is set", pass: Boolean(item.scheduledAt) }
  ];
}

export function nextDemoTransition(item, seed = SEED) {
  if (item.reviewStatus === "draft" || item.reviewStatus === "changes_requested") {
    return { dimension: "reviewStatus", from: item.reviewStatus, to: "in_review", label: "Send to review" };
  }
  if (item.reviewStatus === "in_review") {
    return { dimension: "reviewStatus", from: "in_review", to: "approved", label: "Approve demo copy" };
  }
  if (item.publicationStatus === "not_ready") {
    const blockers = readinessChecks(item, seed).filter((check) => !check.pass && check.key !== "time");
    if (blockers.length) return { blocked: true, label: "Resolve readiness", blockers };
    return { dimension: "publicationStatus", from: "not_ready", to: "ready", label: "Mark ready" };
  }
  if (item.publicationStatus === "ready") {
    if (!item.scheduledAt) return { blocked: true, label: "Set schedule", blockers: [{ label: "Publishing time is set" }] };
    return { dimension: "publicationStatus", from: "ready", to: "scheduled", label: "Schedule demo" };
  }
  if (item.publicationStatus === "scheduled") {
    return { dimension: "publicationStatus", from: "scheduled", to: "published", label: "Record demo publication" };
  }
  if (item.outcomeStatus === "not_measured") {
    return { dimension: "outcomeStatus", from: "not_measured", to: "pending_verification", label: "Open outcome check" };
  }
  if (item.outcomeStatus === "pending_verification") {
    return { dimension: "outcomeStatus", from: "pending_verification", to: "verified", label: "Verify demo outcome" };
  }
  return null;
}

export function applyDemoTransition(item, transition) {
  if (!transition || transition.blocked) throw new Error("A valid transition is required");
  if (item[transition.dimension] !== transition.from) throw new Error("Transition source does not match current state");
  const dimension = transition.dimension.replace("Status", "");
  if (!WORKFLOW[dimension]?.includes(transition.to)) throw new Error("Unsupported transition target");
  const updated = { ...item, [transition.dimension]: transition.to };
  if (transition.dimension === "publicationStatus" && transition.to === "published") {
    updated.publishedAt = new Date().toISOString();
    updated.outcomeStatus = "pending_verification";
  }
  if (transition.dimension === "outcomeStatus" && transition.to === "verified") {
    updated.verifiedAt = new Date().toISOString();
  }
  return updated;
}

export function validateSeed(seed = SEED) {
  const errors = [];
  const campaignIds = new Set(seed.campaigns.map((campaign) => campaign.id));
  const projectIds = new Set(seed.projects.map((project) => project.id));
  const assetIds = new Set(seed.assets.map((asset) => asset.id));
  const contentIds = new Set();
  for (const item of seed.contentItems) {
    if (contentIds.has(item.id)) errors.push(`Duplicate content id: ${item.id}`);
    contentIds.add(item.id);
    if (item.campaignId && !campaignIds.has(item.campaignId)) errors.push(`Unknown campaign for ${item.id}`);
    for (const assetId of item.assetIds) if (!assetIds.has(assetId)) errors.push(`Unknown asset ${assetId} for ${item.id}`);
    if (!WORKFLOW.review.includes(item.reviewStatus)) errors.push(`Invalid review status for ${item.id}`);
    if (!WORKFLOW.publication.includes(item.publicationStatus)) errors.push(`Invalid publication status for ${item.id}`);
    if (!WORKFLOW.outcome.includes(item.outcomeStatus)) errors.push(`Invalid outcome status for ${item.id}`);
    if (item.publicationStatus === "published" && !item.publishedAt) errors.push(`Published item lacks publishedAt: ${item.id}`);
    if (item.outcomeStatus === "verified" && !item.verifiedAt) errors.push(`Verified outcome lacks verifiedAt: ${item.id}`);
  }
  for (const campaign of seed.campaigns) {
    if (!projectIds.has(campaign.projectId)) errors.push(`Unknown project for campaign ${campaign.id}`);
  }
  for (const assignment of seed.contributorScorecard.assignments) {
    if (!projectIds.has(assignment.projectId)) errors.push(`Unknown project for assignment ${assignment.id}`);
    if (!campaignIds.has(assignment.campaignId)) errors.push(`Unknown campaign for assignment ${assignment.id}`);
  }
  return errors;
}

