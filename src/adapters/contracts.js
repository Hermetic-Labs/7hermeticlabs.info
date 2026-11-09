export class ConnectorUnavailableError extends Error {
  constructor(capability) {
    super(`${capability} is not configured. Blankit remains in local demo mode.`);
    this.name = "ConnectorUnavailableError";
    this.capability = capability;
  }
}

function unavailable(capability) {
  return async () => { throw new ConnectorUnavailableError(capability); };
}

export function createDisconnectedAdapters() {
  return Object.freeze({
    identity: Object.freeze({
      mode: "unresolved",
      getSession: unavailable("identity.getSession"),
      requireRole: unavailable("identity.requireRole")
    }),
    portfolio: Object.freeze({
      listProjects: unavailable("portfolio.listProjects"),
      listCampaigns: unavailable("portfolio.listCampaigns")
    }),
    contributor: Object.freeze({
      getScorecard: unavailable("contributor.getScorecard"),
      listAssignments: unavailable("contributor.listAssignments"),
      appendTimelineEvent: unavailable("contributor.appendTimelineEvent")
    }),
    calendar: Object.freeze({
      listItems: unavailable("calendar.listItems"),
      createDraft: unavailable("calendar.createDraft"),
      updateDraft: unavailable("calendar.updateDraft")
    }),
    assets: Object.freeze({
      listReferences: unavailable("assets.listReferences"),
      verifyRights: unavailable("assets.verifyRights")
    }),
    publishing: Object.freeze({
      schedule: unavailable("publishing.schedule"),
      publish: unavailable("publishing.publish"),
      verifyReceipt: unavailable("publishing.verifyReceipt")
    }),
    audit: Object.freeze({
      listEvents: unavailable("audit.listEvents"),
      appendEvent: unavailable("audit.appendEvent")
    })
  });
}

export const ADAPTER_RULES = Object.freeze([
  "Identity and authorization are required before private remote access.",
  "Connector configuration, authorization, target verification, and proven reads are separate states.",
  "Scheduling, publishing, messaging, and deletion require explicit human authority at the action boundary.",
  "Every external write returns a durable receipt before Blankit records success.",
  "Secrets live in the selected hosting secret store, never in source, browser storage, seed data, or logs.",
  "A disconnected adapter fails closed and never simulates external success."
]);

