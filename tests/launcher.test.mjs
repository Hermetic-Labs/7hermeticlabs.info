import test from "node:test";
import assert from "node:assert/strict";
import { createServer } from "node:http";
import { localPublicPreviewUrl, openReadyPreview } from "../scripts/open-preview.mjs";

async function fixture(t, missingPath) {
  const requests = [];
  const server = createServer((request, response) => {
    requests.push(request.url);
    const entries = {
      "/": ["text/html", "<title>7 Hermetic Labs — Public Communications</title>"],
      "/studio/": ["text/html", "<title>7 Hermetic Labs — Communications Studio</title>"],
      "/landing.css": ["text/css", ".signal-card {}"],
      "/site.css": ["text/css", ":root {}"],
      "/scorecard.css": ["text/css", ".contributor-workspace {}"],
      "/site.js": ["text/javascript", "const projects = {};"],
      "/scorecard.js": ["text/javascript", "// contributor scorecard"]
    };
    const [type, body] = entries[request.url] || ["text/plain", "missing"];
    response.writeHead(request.url === missingPath ? 404 : 200, { "Content-Type": type });
    response.end(body);
  });
  await new Promise((resolve) => server.listen(0, "127.0.0.1", resolve));
  t.after(() => new Promise((resolve) => server.close(resolve)));
  return { requests, origin: `http://127.0.0.1:${server.address().port}/` };
}

test("browser opens once, only the public root, after all readiness responses", async (t) => {
  const { requests, origin } = await fixture(t);
  const opened = [];
  await openReadyPreview(origin, async (url) => {
    assert.deepEqual(requests, ["/", "/studio/", "/landing.css", "/site.css", "/scorecard.css", "/site.js", "/scorecard.js"]);
    opened.push(url);
  });
  assert.deepEqual(opened, [origin]);
});

test("a transient loopback fetch failure is retried before browser launch", async (t) => {
  const { origin } = await fixture(t);
  let attempts = 0;
  const opened = [];
  await openReadyPreview(origin, async (url) => opened.push(url), async (...args) => {
    attempts += 1;
    if (attempts === 1) throw new TypeError("fetch failed");
    return fetch(...args);
  });
  assert.equal(attempts, 8);
  assert.deepEqual(opened, [origin]);
});

test("missing page or asset prevents browser launch", async (t) => {
  for (const missing of ["/", "/studio/", "/landing.css", "/site.css", "/scorecard.css", "/site.js", "/scorecard.js"]) {
    const { origin } = await fixture(t, missing);
    let opened = false;
    await assert.rejects(openReadyPreview(origin, async () => { opened = true; }), /readiness check failed/);
    assert.equal(opened, false);
  }
});

test("nonlocal and private URLs cannot be opened by the readiness helper", async () => {
  for (const url of ["https://example.com/", "http://127.0.0.1:4173/workspace/"]) {
    await assert.rejects(openReadyPreview(url, async () => assert.fail("must not open")), /Only the local 7 Hermetic Labs public page/);
  }
});

test("default HTTP port normalization remains a valid public preview URL", () => {
  assert.equal(localPublicPreviewUrl("http://127.0.0.1:80/").href, "http://127.0.0.1/");
});

test("browser handoff failure reaches the caller for readable failure handling", async (t) => {
  const { origin } = await fixture(t);
  await assert.rejects(openReadyPreview(origin, async () => { throw new Error("No default browser"); }), /No default browser/);
});
