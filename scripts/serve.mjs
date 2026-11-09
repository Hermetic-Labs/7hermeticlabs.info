import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { extname, join, normalize, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { openReadyPreview } from "./open-preview.mjs";

const root = resolve(fileURLToPath(new URL("../dist/public", import.meta.url)));
const port = Number(process.env.PORT || 4173);
if (!Number.isInteger(port) || port < 1 || port > 65535) {
  console.error("The preview PORT must be a whole number from 1 to 65535.");
  process.exit(1);
}
const types = {
  ".html": "text/html; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".js": "text/javascript; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".webmanifest": "application/manifest+json"
};

function resolveRequest(urlPath) {
  const pathname = decodeURIComponent(urlPath.split("?")[0]);
  if (pathname === "/") return join(root, "index.html");
  return join(root, pathname);
}

const server = createServer(async (request, response) => {
  try {
    let target = normalize(resolveRequest(request.url || "/"));
    if (!target.startsWith(root)) throw new Error("Invalid path");
    const info = await stat(target).catch(() => null);
    if (info?.isDirectory()) target = join(target, "index.html");
    const body = await readFile(target);
    response.writeHead(200, {
      "Content-Type": types[extname(target)] || "application/octet-stream",
      "Cache-Control": "no-store",
      "X-Content-Type-Options": "nosniff"
    });
    response.end(body);
  } catch {
    response.writeHead(404, { "Content-Type": "text/plain; charset=utf-8" });
    response.end("Not found");
  }
});

server.on("error", (error) => {
  console.error(error.code === "EADDRINUSE"
    ? `The 7 Hermetic Labs preview could not start: port ${port} is already in use. Stop the other preview or choose another PORT. No browser was opened.`
    : `The 7 Hermetic Labs preview could not start: ${error.message}`);
  process.exitCode = 1;
});

server.listen(port, "127.0.0.1", async () => {
  console.log(`7 Hermetic Labs local preview: http://127.0.0.1:${port}`);
  if (process.argv.includes("--open")) {
    try {
      await openReadyPreview(`http://127.0.0.1:${port}/`);
      console.log("Public page ready; opened in your default browser. Keep this console open while using the site.");
    } catch (error) {
      console.error(`The 7 Hermetic Labs preview could not open: ${error.message}`);
      server.close();
      process.exitCode = 1;
    }
  }
});

