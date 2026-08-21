import assert from "node:assert/strict";
import test from "node:test";

async function render(pathname = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}-${pathname}`);
  const { default: worker } = await import(workerUrl.href);
  return worker.fetch(new Request(`http://localhost${pathname}`, { headers: { accept: "text/html" } }), { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } }, { waitUntil() {}, passThroughOnException() {} });
}

test("server-renders the course-first Rohit home page", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);
  const html = await response.text();
  assert.match(html, /Rohit Kumar Singh/i);
  assert.doesNotMatch(html, />Rohitt Kumar Singh</i);
  assert.match(html, /Learn the language of property before you sell, advise or invest/i);
  assert.match(html, /49-slide visual foundation/i);
  assert.match(html, /See the actual material before launch/i);
  assert.match(html, /Join early access on WhatsApp/i);
  assert.match(html, /Hundred Yards client feedback/i);
  assert.match(html, /not course reviews/i);
  assert.doesNotMatch(html, /₹|Buy now|Proceed to payment|guaranteed outcome/i);
});

test("server-renders Rohit's factual instructor page", async () => {
  const response = await render("/about");
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /Experience from the field, structured for the classroom/i);
  assert.match(html, /Electronics &amp; Communication/i);
  assert.match(html, /over a decade/i);
  assert.match(html, /Managing Director/i);
});

test("server-renders direct course contact options", async () => {
  const response = await render("/contact");
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /Course early access/i);
  assert.match(html, /Join the course launch list/i);
  assert.match(html, /sales@100yards\.in/i);
  assert.match(html, /No payment is collected today/i);
});

test("returns a course-focused not-found response", async () => {
  const response = await render("/this-route-does-not-exist");
  assert.equal(response.status, 404);
  const html = await response.text();
  assert.match(html, /This page is not part of the course/i);
  assert.match(html, /Explore the course/i);
});
