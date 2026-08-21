import { env } from "cloudflare:workers";

const allowedEvents = new Set([
  "early_access_cta",
  "early_access_completed",
  "course_preview_opened",
  "area_tool_used",
  "payment_tool_used",
  "whatsapp_clicked",
  "hundred_yards_clicked",
]);

export async function POST(request: Request) {
  try {
    const body = await request.json() as { event?: unknown; path?: unknown };
    const event = typeof body.event === "string" ? body.event.slice(0, 64) : "";
    const path = typeof body.path === "string" && body.path.startsWith("/") ? body.path.slice(0, 160) : "/";
    if (!allowedEvents.has(event)) return new Response(null, { status: 204 });

    // Optional chaining so a missing binding is a no-op rather than a throw.
    env.ACADEMY_ANALYTICS?.writeDataPoint({
      blobs: [event, path],
      doubles: [1],
      indexes: ["academy"],
    });
  } catch {
    // Analytics must never block the visitor experience.
  }
  return new Response(null, { status: 204, headers: { "Cache-Control": "no-store" } });
}
