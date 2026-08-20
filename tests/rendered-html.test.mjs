import assert from "node:assert/strict";
import test from "node:test";

async function render(pathname = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}-${pathname}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`http://localhost${pathname}`, {
      headers: { accept: "text/html" },
    }),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("server-renders the finished Rohit home experience", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /Rohit — Real Estate Education for Clearer Decisions/i);
  assert.match(html, /Property,/i);
  assert.match(html, /read clearly\./i);
  assert.match(html, /Explore the Decision System/i);
  assert.match(html, /The Property Decision System/i);
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton|Starter Project/i);
});

test("server-renders an independently described product page", async () => {
  const response = await render("/courses/before-you-buy-field-guide");
  assert.equal(response.status, 200);
  const html = await response.text();

  assert.match(html, /<title>Before You Buy — Rohit<\/title>/i);
  assert.match(html, /The Property Due Diligence Field Guide/i);
  assert.match(html, /₹799/i);
  assert.doesNotMatch(html, /public\/og\.png|codex-preview/i);
});

test("returns a branded not-found response", async () => {
  const response = await render("/this-route-does-not-exist");
  assert.equal(response.status, 404);
  const html = await response.text();
  assert.match(html, /This property/i);
  assert.match(html, /doesn’t exist/i);
});
