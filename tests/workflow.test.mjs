import test from "node:test";
import assert from "node:assert/strict";
import {
  SEED,
  applyDemoTransition,
  deriveStage,
  nextDemoTransition,
  readinessChecks,
  validateSeed
} from "../src/data/workspace-data.js";
import { ConnectorUnavailableError, createDisconnectedAdapters } from "../src/adapters/contracts.js";

test("synthetic seed is internally consistent", () => {
  assert.deepEqual(validateSeed(), []);
  assert.equal(SEED.meta.dataMode, "synthetic_demo");
  assert.equal(SEED.meta.externalConnections, false);
});

test("stage distinguishes publication from verified outcome", () => {
  const published = SEED.contentItems.find((item) => item.id === "cnt-004");
  const verified = SEED.contentItems.find((item) => item.id === "cnt-005");
  assert.equal(deriveStage(published), "published");
  assert.equal(deriveStage(verified), "verified_outcome");
});

test("readiness gate exposes missing source material", () => {
  const item = SEED.contentItems.find((entry) => entry.id === "cnt-003");
  const failed = readinessChecks(item).filter((check) => !check.pass).map((check) => check.key);
  assert.ok(failed.includes("approval"));
  assert.ok(failed.includes("asset"));
  assert.ok(failed.includes("accessibility"));
  assert.ok(failed.includes("time"));
});

test("demo transitions follow independent review, publication, and outcome states", () => {
  const source = SEED.contentItems.find((item) => item.id === "cnt-004");
  const transition = nextDemoTransition(source);
  assert.deepEqual(
    { dimension: transition.dimension, from: transition.from, to: transition.to },
    { dimension: "outcomeStatus", from: "pending_verification", to: "verified" }
  );
  const updated = applyDemoTransition(source, transition);
  assert.equal(updated.publicationStatus, "published");
  assert.equal(updated.outcomeStatus, "verified");
  assert.ok(updated.verifiedAt);
});

test("transition rejects a stale source state", () => {
  const source = SEED.contentItems.find((item) => item.id === "cnt-001");
  assert.throws(
    () => applyDemoTransition(source, { dimension: "reviewStatus", from: "draft", to: "in_review" }),
    /source does not match/
  );
});

test("disconnected external adapters fail closed", async () => {
  const adapters = createDisconnectedAdapters();
  await assert.rejects(adapters.publishing.publish({}), ConnectorUnavailableError);
  await assert.rejects(adapters.identity.getSession(), /not configured/);
  assert.equal(adapters.identity.mode, "unresolved");
});
