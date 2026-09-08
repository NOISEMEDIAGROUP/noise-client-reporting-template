import { cp, mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(root, "..");
const out = path.join(projectRoot, "pages-dist");
const base = "/noise-client-reporting-template/";

await mkdir(out, { recursive: true });
await cp(path.join(projectRoot, "dist", "client"), out, { recursive: true });

const workerUrl = new URL("../dist/server/index.js", import.meta.url);
workerUrl.searchParams.set("pages", Date.now().toString());
const { default: worker } = await import(workerUrl.href);
const response = await worker.fetch(
  new Request("http://localhost/", { headers: { accept: "text/html" } }),
  { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
  { waitUntil() {}, passThroughOnException() {} },
);

if (!response.ok) throw new Error(`Static render failed: ${response.status}`);
let html = await response.text();
html = html.replaceAll('href="/', `href="${base}`).replaceAll('src="/', `src="${base}`);
await writeFile(path.join(out, "index.html"), `<!doctype html>${html}`, "utf8");
