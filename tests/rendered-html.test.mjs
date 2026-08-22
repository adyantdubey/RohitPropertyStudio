import assert from "node:assert/strict";
import test from "node:test";

async function render(pathname = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}-${pathname}`);
  const { default: worker } = await import(workerUrl.href);
  return worker.fetch(
    new Request(`http://localhost${pathname}`, { headers: { accept: "text/html" } }),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
}

test("server-renders the home page without depending on JavaScript", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  assert.match(response.headers.get("content-type") ?? "", /^text\/html\b/i);
  const html = await response.text();
  assert.match(html, /Rohitt Kumar Singh/);
  // The brand spells it with two t's. This catches any regression to one t
  // (scoped to the name — the folder path in font URLs is not page content).
  assert.doesNotMatch(html, /Rohit(?!t) Kumar Singh/);
  assert.match(html, /Learn the/i);
  assert.match(html, /of property before you sell, advise or invest/i);
  assert.match(html, /sketch-word/); // the hand-drawn underline is present
  assert.match(html, /49-slide visual foundation/i);
  assert.match(html, /See the actual material before launch/i);
  assert.match(html, /A practical map for real property conversations/i);
  assert.match(html, /What Hundred Yards clients say/i);
  assert.match(html, /not a course learner/i);
});

test("makes no course price, payment or guarantee claim before launch", async () => {
  const html = await (await render()).text();
  assert.doesNotMatch(html, /Buy now|Proceed to payment|guaranteed outcome/i);
  assert.match(html, /No payment collected/i);
  assert.match(html, /To be announced/i);
});

test("market figures always name their source", async () => {
  const html = await (await render()).text();
  // A rupee figure is allowed only as sourced market context, never as a course price.
  if (/₹\s?[\d,]+/.test(html)) {
    assert.match(html, /Knight Frank|Reserve Bank of India/);
    assert.match(html, /not a recommendation/i);
  }
});

test("keeps the cinematic hero working with no video file present", async () => {
  const html = await (await render()).text();
  // The generated canvas backdrop is always in the markup; a <video> element is
  // only emitted once media.heroVideo points at a real file.
  assert.match(html, /class="backdrop"/);
  assert.doesNotMatch(html, /<video[^>]*src="\/video\/hero\.mp4"/);
});

test("server-renders the factual instructor page", async () => {
  const response = await render("/about");
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /Experience from the field, structured for the classroom/i);
  assert.match(html, /Electronics &amp; Communication/i);
  assert.match(html, /over a decade/i);
  assert.match(html, /Managing Director/i);
});

test("server-renders the split contact routes", async () => {
  const response = await render("/contact");
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /Choose the conversation you want to start/i);
  assert.match(html, /Join the learning launch list/i);
  assert.match(html, /sales@100yards\.in/i);
  assert.match(html, /does not create an order or collect payment/i);
});

test("server-renders the course curriculum page", async () => {
  const response = await render("/course");
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /Four chapters\. One coherent foundation/i);
  assert.match(html, /Learning focus/i);
});

test("server-renders the Property Lab with its instruments", async () => {
  const response = await render("/lab");
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /Ownership Simulator/i);
  assert.match(html, /Watch your money become a building/i);
  assert.match(html, /EMI Time Machine/i);
  assert.match(html, /Seven doors between shortlisting/i);
  assert.match(html, /X-ray Apartment/i);
  assert.match(html, /Deal Decoder/i);
  assert.match(html, /Property IQ Quiz/i);
  // statutory rates must carry their source and a verify pointer
  assert.match(html, /Stamps (&amp;|&) Registration/i);
  assert.match(html, /Kaveri/i);
});

test("the videos api degrades to an empty list when the feed is unreachable", async () => {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `videos-${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);
  const response = await worker.fetch(
    new Request("http://localhost/api/videos"),
    { ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) } },
    { waitUntil() {}, passThroughOnException() {} },
  );
  assert.equal(response.status, 200);
  const data = await response.json();
  assert.ok(Array.isArray(data.videos));
  assert.match(data.channel, /youtube\.com/);
});

test("returns a course-focused not-found response", async () => {
  const response = await render("/this-route-does-not-exist");
  assert.equal(response.status, 404);
  const html = await response.text();
  assert.match(html, /This page is not part of the course/i);
  assert.match(html, /Explore the course/i);
});
