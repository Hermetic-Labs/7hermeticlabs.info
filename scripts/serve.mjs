import { createServer } from "node:http";
import { readFile, stat } from "node:fs/promises";
import { extname, join, normalize, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(fileURLToPath(new URL("../dist", import.meta.url)));
const port = Number(process.env.PORT || 4173);
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
  if (pathname === "/") return join(root, "public", "index.html");
  if (pathname === "/workspace" || pathname === "/workspace/") return join(root, "operator", "index.html");
  if (pathname.startsWith("/workspace/")) return join(root, "operator", pathname.slice(11));
  return join(root, "public", pathname);
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

server.listen(port, "127.0.0.1", () => {
  console.log(`Blankit local preview: http://127.0.0.1:${port}`);
  console.log(`Operator workspace: http://127.0.0.1:${port}/workspace/`);
});

