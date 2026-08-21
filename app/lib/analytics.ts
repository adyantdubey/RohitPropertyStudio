import { env } from "cloudflare:workers";

/**
 * Analytics Engine is optional.
 *
 * The `analytics_engine_datasets` binding is not declared in wrangler.jsonc, because
 * enabling Analytics Engine requires a paid Workers plan and the deploy fails outright
 * (error 10089) while it is declared but not enabled on the account.
 *
 * Every call here is therefore a no-op until the binding exists. To turn tracking on
 * later: enable Analytics Engine on the account, then add this back to wrangler.jsonc —
 *
 *   "analytics_engine_datasets": [
 *     { "binding": "ACADEMY_ANALYTICS", "dataset": "rohit_academy_events" }
 *   ]
 *
 * No application code needs to change; events start flowing on the next deploy.
 */
type AnalyticsSink = {
  writeDataPoint: (point: { blobs: string[]; doubles: number[]; indexes: string[] }) => void;
};

function sink(): AnalyticsSink | undefined {
  return (env as unknown as { ACADEMY_ANALYTICS?: AnalyticsSink }).ACADEMY_ANALYTICS;
}

/** Records one event. Never throws — analytics must not affect a visitor or a lead. */
export function recordEvent(...blobs: string[]): void {
  try {
    sink()?.writeDataPoint({ blobs, doubles: [1], indexes: ["academy"] });
  } catch {
    // Binding missing, quota reached, or write rejected. Nothing here is worth an error.
  }
}
