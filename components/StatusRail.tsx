"use client";

import { useSimulation } from "@/components/SimulationContext";

function Gauge({
  label,
  value,
  suffix = "",
  tone = "signal",
}: {
  label: string;
  value: number;
  suffix?: string;
  tone?: "signal" | "alert" | "good" | "steel";
}) {
  const toneMap: Record<string, string> = {
    signal: "text-signal",
    alert: "text-alert",
    good: "text-good",
    steel: "text-mist",
  };
  const pct = Math.min(100, Math.max(0, value));
  return (
    <div className="px-5 py-4 border-r border-steel/15 last:border-r-0 flex-1 min-w-[150px]">
      <p className="label-eyebrow text-steel">{label}</p>
      <p className={`font-display text-3xl mt-1 ${toneMap[tone]}`}>
        {value}
        <span className="text-base font-mono text-mist ml-0.5">{suffix}</span>
      </p>
      <div className="h-1 bg-steel/15 rounded-full mt-2 overflow-hidden">
        <div
          className={`h-full rounded-full ${
            tone === "alert" ? "bg-alert" : tone === "good" ? "bg-good" : "bg-signal"
          }`}
          style={{ width: `${suffix === "%" ? pct : Math.min(100, pct * 4)}%` }}
        />
      </div>
    </div>
  );
}

export default function StatusRail() {
  const { scenario, kpis } = useSimulation();

  return (
    <div className="flex flex-wrap border border-steel/20 rounded-md bg-abyss2/60 divide-y md:divide-y-0 divide-steel/15">
      <Gauge label="Strait Capacity" value={Math.max(4, 100 - kpis.riskIndex)} suffix="%" tone="alert" />
      <Gauge label="Days Disrupted" value={scenario.disruptionActive ? 14 : 2} suffix="d" tone="steel" />
      <Gauge label="Shipments At Risk" value={kpis.routesAtRisk + 3} suffix="" tone="alert" />
      <Gauge label="Rerouted" value={kpis.routesAtRisk > 0 ? Math.min(9, kpis.routesAtRisk + 2) : 2} suffix="" tone="good" />
      <Gauge label="Exposure Hedged" value={Math.min(90, 50 + Math.round(kpis.riskIndex / 3))} suffix="%" tone="signal" />
      <Gauge label="Avg. Cost Delta" value={Math.min(35, Math.round(kpis.additionalTransitDays * 4 + 8))} suffix="%" tone="steel" />
    </div>
  );
}
