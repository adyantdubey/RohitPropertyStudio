"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

function sendEvent(event: string, path: string) {
  const payload = JSON.stringify({ event, path });
  if (navigator.sendBeacon) {
    navigator.sendBeacon("/api/events", new Blob([payload], { type: "application/json" }));
    return;
  }
  void fetch("/api/events", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: payload,
    keepalive: true,
  });
}

export function EventTracker() {
  const pathname = usePathname();

  useEffect(() => {
    const click = (event: MouseEvent) => {
      const target = event.target instanceof Element ? event.target.closest<HTMLElement>("[data-track]") : null;
      const eventName = target?.dataset.track;
      if (eventName) sendEvent(eventName, pathname);
    };
    const custom = (event: Event) => {
      const detail = (event as CustomEvent<{ event?: string }>).detail;
      if (detail?.event) sendEvent(detail.event, pathname);
    };
    document.addEventListener("click", click, { capture: true });
    window.addEventListener("academy:track", custom);
    return () => {
      document.removeEventListener("click", click, { capture: true });
      window.removeEventListener("academy:track", custom);
    };
  }, [pathname]);

  return null;
}
