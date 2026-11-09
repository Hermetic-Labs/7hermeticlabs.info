import { spawn } from "node:child_process";

// Called only after this process has successfully bound its loopback listener.
// Check the actual public response and its assets before handing off to Windows.
export async function openReadyPreview(origin, openBrowser = openWindowsBrowser) {
  const url = localPublicPreviewUrl(origin);
  for (const [pathname, type, marker] of [
    ["/", "text/html", "Business Language and Networking Kit"],
    ["/styles.css", "text/css", ":root"],
    ["/main.js", "text/javascript", "coverage-panel"]
  ]) {
    const response = await fetch(new URL(pathname, url), { signal: AbortSignal.timeout(5000) });
    const body = await response.text();
    if (response.status !== 200 || !response.headers.get("content-type")?.includes(type) || !body.includes(marker)) {
      throw new Error(`Public preview readiness check failed for ${pathname} (HTTP ${response.status}).`);
    }
  }
  await openBrowser(url.href);
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
    throw new Error("Only the local public BLANKIT page may be opened automatically.");
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
