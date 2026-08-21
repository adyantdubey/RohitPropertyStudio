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
  assert.match(html, /Find the right property\. Move with clarity\./i);
  assert.match(html, /Explore property advisory/i);
  assert.match(html, /Explore the Academy/i);
  assert.match(html, /CURRENT PROPERTY OPPORTUNITIES/i);
  assert.match(html, /49-slide/i);
  assert.doesNotMatch(html, /codex-preview|react-loading-skeleton|Starter Project/i);
});

test("server-renders an honest coming-soon field-guide page", async () => {
  const response = await render("/courses/before-you-buy-field-guide");
  assert.equal(response.status, 200);
  const html = await response.text();

  assert.match(html, /<title>Before You Buy — Coming soon — Rohitt Kumar Singh<\/title>/i);
  assert.match(html, /The Property Due Diligence Field Guide/i);
  assert.match(html, /Join the first-access list/i);
  assert.match(html, /Checkout and payment are not live yet/i);
  assert.doesNotMatch(html, /₹799|Buy now|Proceed to payment/i);
  assert.doesNotMatch(html, /public\/og\.png|codex-preview/i);
});

test("server-renders the prepared training deck without exposing commerce", async () => {
  const response = await render("/courses/basics-of-real-estate-training-deck");
  assert.equal(response.status, 200);
  const html = await response.text();

  assert.match(html, /Basics of Real Estate/i);
  assert.match(html, /49-slide visual foundation/i);
  assert.match(html, /A practical foundation in the language of real estate/i);
  assert.match(html, /Join the launch list/i);
  assert.doesNotMatch(html, />\s*(?:Buy now|Proceed to payment|Instant download)\s*</i);
});

test("returns a branded not-found response", async () => {
  const response = await render("/this-route-does-not-exist");
  assert.equal(response.status, 404);
  const html = await response.text();
  assert.match(html, /This address/i);
  assert.match(html, /isn(?:&apos;|&#x27;|’)t on the plan/i);
});
