import { spawn } from "node:child_process";
import { get } from "node:http";

// Called only after this process has successfully bound its loopback listener.
// Check the actual public response and its assets before handing off to Windows.
export async function openReadyPreview(origin, openBrowser = openWindowsBrowser, fetchPreview = fetchLocalPreview) {
  const url = localPublicPreviewUrl(origin);
  for (const [pathname, type, marker] of [
    ["/", "text/html", "7 Hermetic Labs — Public Communications"],
    ["/studio/", "text/html", "7 Hermetic Labs — Communications Studio"],
    ["/landing.css", "text/css", ".signal-card"],
    ["/site.css", "text/css", ":root"],
    ["/scorecard.css", "text/css", ".contributor-workspace"],
    ["/site.js", "text/javascript", "const projects"],
    ["/scorecard.js", "text/javascript", "contributor scorecard"]
  ]) {
    let response;
    let lastFetchError;
    for (let attempt = 0; attempt < 10; attempt += 1) {
      try {
        response = await fetchPreview(new URL(pathname, url), { signal: AbortSignal.timeout(5000) });
        break;
      } catch (error) {
        lastFetchError = error;
        if (attempt < 9) await new Promise((resolve) => setTimeout(resolve, 100));
      }
    }
    if (!response) {
      throw new Error(`Public preview could not be reached for ${pathname}: ${lastFetchError?.message || "fetch failed"}.`);
    }
    const body = await response.text();
    const status = response.status ?? response.statusCode;
    const contentType = typeof response.headers?.get === "function"
      ? response.headers.get("content-type")
      : response.headers?.["content-type"];
    if (status !== 200 || !contentType?.includes(type) || !body.includes(marker)) {
      throw new Error(`Public preview readiness check failed for ${pathname} (HTTP ${status}).`);
    }
  }
  await openBrowser(url.href);
}

function fetchLocalPreview(url) {
  return new Promise((resolve, reject) => {
    const request = get(url, { timeout: 5000 }, (response) => {
      const chunks = [];
      response.on("data", (chunk) => chunks.push(chunk));
      response.once("end", () => resolve({
        statusCode: response.statusCode,
        headers: response.headers,
        text: async () => Buffer.concat(chunks).toString("utf8")
      }));
    });
    request.once("timeout", () => request.destroy(new Error("Local readiness request timed out.")));
    request.once("error", reject);
  });
}

export function localPublicPreviewUrl(origin) {
  const url = new URL(origin);
  if (
    url.protocol !== "http:" ||
    url.hostname !== "127.0.0.1" ||
    url.pathname !== "/" ||
    url.username ||
    url.password ||
    url.search ||
    url.hash
  ) {
    throw new Error("Only the local 7 Hermetic Labs public page may be opened automatically.");
  }
  return url;
}

function openWindowsBrowser(url) {
  if (process.platform !== "win32") throw new Error("Automatic browser opening is supported by the Windows launcher only.");
  // URL parsing normalizes default port 80 away; validate its components instead
  // of requiring a literal :port segment in the final string.
  const safeUrl = localPublicPreviewUrl(url).href;
  return new Promise((resolve, reject) => {
    const child = spawn("powershell.exe", [
      "-NoProfile", "-NonInteractive", "-Command",
      `$ErrorActionPreference = 'Stop'; Start-Process -FilePath '${safeUrl}'`
    ], { windowsHide: true, stdio: ["ignore", "ignore", "pipe"] });
    let details = "";
    child.stderr.on("data", (chunk) => { details += chunk; });
    child.once("error", reject);
    child.once("exit", (code) => code === 0 ? resolve() : reject(new Error(details.trim() || `Windows browser handoff failed (${code}).`)));
  });
}
