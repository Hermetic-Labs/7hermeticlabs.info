import { cp, mkdir, rm } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(root, "dist");

await rm(dist, { recursive: true, force: true });
await mkdir(path.join(dist, "operator", "data"), { recursive: true });
await cp(path.join(root, "src", "public"), path.join(dist, "public"), { recursive: true });
await cp(path.join(root, "src", "operator"), path.join(dist, "operator"), { recursive: true });
await cp(
  path.join(root, "src", "data", "workspace-data.js"),
  path.join(dist, "operator", "data", "workspace-data.js")
);

console.log("Built dist/public (deployable later) and dist/operator (local-only).");

