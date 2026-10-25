"use client";

import { useEffect, useState } from "react";
import { site } from "@/data/site";

const format = new Intl.DateTimeFormat("fr-FR", {
  timeZone: site.timeZone,
  hour: "2-digit",
  minute: "2-digit",
});

/** Current time in Lomé. Renders a placeholder on the server, then ticks. */
export function LiveClock() {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const tick = () => setTime(format.format(new Date()));
    tick();
    const id = window.setInterval(tick, 10_000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <time className="tabular" aria-live="off">
      {time ?? "--:--"}
    </time>
  );
}
