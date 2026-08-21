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

test("server-renders the personalized Rohitt home experience", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);

  const html = await response.text();
  assert.match(html, /Rohitt Kumar Singh/i);
  assert.match(html, /Real estate,/i);
  assert.match(html, /led with clarity\./i);
  assert.match(html, /Buy or invest with Hundred Yards/i);
  assert.match(html, /Learn with Rohitt/i);
  assert.match(html, /PREPARED \/ THE 100 YARDS TRAINING DECK/i);
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton|Starter Project/i);
});

test("server-renders an honest coming-soon field-guide page", async () => {
  const response = await render("/courses/before-you-buy-field-guide");
  assert.equal(response.status, 200);
  const html = await response.text();

  assert.match(html, /<title>Before You Buy — Coming soon — Rohitt Kumar Singh<\/title>/i);
  assert.match(html, /The Property Due Diligence Field Guide/i);
  assert.match(html, /There is no finished PDF/i);
  assert.doesNotMatch(html, /₹799|Buy now|Proceed to payment/i);
  assert.doesNotMatch(html, /public\/og\.png|codex-preview/i);
});

test("server-renders the prepared training deck without exposing commerce", async () => {
  const response = await render("/courses/basics-of-real-estate-training-deck");
  assert.equal(response.status, 200);
  const html = await response.text();

  assert.match(html, /Basics of Real Estate/i);
  assert.match(html, /49-slide PowerPoint/i);
  assert.match(html, /The training resource exists\. The storefront does not\./i);
  assert.doesNotMatch(html, />\s*(?:Buy now|Proceed to payment|Instant download)\s*</i);
});

test("returns a branded not-found response", async () => {
  const response = await render("/this-route-does-not-exist");
  assert.equal(response.status, 404);
  const html = await response.text();
  assert.match(html, /This address/i);
  assert.match(html, /isn(?:&apos;|&#x27;|’)t on the plan/i);
});
