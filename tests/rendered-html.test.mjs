import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

async function render() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request("http://localhost/", { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("renders the interactive performance story", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /<title>Performance, explained\. \| Noise Client Reporting<\/title>/i);
  assert.match(html, /More revenue\./);
  assert.match(html, /Overall performance/);
  assert.match(html, /Campaign breakdown/);
  assert.match(html, /Top-performing creative/);
  assert.match(html, /Live action register/);
  assert.match(html, /The report becomes the plan\./);
  assert.match(html, /Result brought to life/);
  assert.match(html, /Show supporting metrics/);
  assert.match(html, /Priority actions for the next reporting period/);
  assert.match(html, /aria-label="Report page navigation"/);
  assert.match(html, /class="horizontal-story"/);
  assert.match(html, /aria-label="Horizontal performance report"/);
  assert.match(html, /noise-logo-black\.png/);
  assert.equal((html.match(/data-story-panel="true"/g) ?? []).length, 11);
  assert.doesNotMatch(html, /Open report notes|Working notes/);
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton/i);
});

test("keeps public image paths compatible with the GitHub Pages subdirectory", async () => {
  const [pageSource, workflow] = await Promise.all([
    readFile(new URL("../app/page.tsx", import.meta.url), "utf8"),
    readFile(new URL("../.github/workflows/pages.yml", import.meta.url), "utf8"),
  ]);

  assert.match(pageSource, /NEXT_PUBLIC_REPORT_BASE_PATH/);
  assert.match(pageSource, /reportAsset\("noise-logo-black\.png"\)/);
  assert.match(pageSource, /reportAsset\("indian-creative-triptych\.png"\)/);
  assert.doesNotMatch(pageSource, /src="\/(?:noise-logo-black|indian-creative-triptych)\.png"/);
  assert.match(workflow, /NEXT_PUBLIC_REPORT_BASE_PATH: \/noise-client-reporting-template/);
});
