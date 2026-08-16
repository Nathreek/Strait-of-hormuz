"use client";

import { useMemo, useState } from "react";
import Topbar from "@/components/Topbar";
import PageHeader from "@/components/PageHeader";
import { ROUTES, SHIPMENTS, type Route } from "@/lib/data";

const riskTone: Record<string, string> = {
  LOW: "text-good border-good/30",
  MEDIUM: "text-signal border-signal/30",
  HIGH: "text-alert border-alert/30",
  CRITICAL: "text-alert border-alert/40 bg-alert/10",
};

function score(route: Route) {
  const riskPenalty = { LOW: 0, MEDIUM: 9, HIGH: 18, CRITICAL: 28 }[route.risk] ?? 0;
  return 100 - route.costDeltaPct * 0.8 - route.transitDelta * 2.5 - riskPenalty + (route.capacity - route.utilization) * 0.6;
}

export default function ReroutePage() {
  const unassigned = SHIPMENTS.filter((s) => s.status === "at risk");
  const [selectedShipment, setSelectedShipment] = useState(unassigned[0]?.id ?? SHIPMENTS[0].id);
  const [selectedRoute, setSelectedRoute] = useState<string | null>(null);
  const [confirmed, setConfirmed] = useState(false);

  const shipment = SHIPMENTS.find((s) => s.id === selectedShipment) ?? SHIPMENTS[0];

  const ranked = useMemo(() => {
    return [...ROUTES]
      .filter((route) => route.status !== "normal" || route.chokepointId === "chokepoint-hormuz")
      .sort((a, b) => score(b) - score(a));
  }, []);

  const selectedRouteData = ranked.find((route) => route.id === selectedRoute) ?? ranked[0];

  return (
    <>
      <Topbar />
      <div className="max-w-6xl mx-auto px-5 md:px-10 py-8 md:py-10">
        <PageHeader
          eyebrow="01 · Reroute Orchestrator"
          title="Assign each at-risk shipment to the route that preserves supply continuity."
          description="The orchestrator compares alternative corridors by added transit time, cost, capacity, and chokepoint dependence, then recommends the least-disruptive path for the specific cargo under review."
        />

        <div className="border border-steel/20 rounded-md bg-abyss2/60 p-5 mb-5">
          <p className="label-eyebrow text-steel mb-3">Select shipment</p>
          <div className="flex flex-wrap gap-2">
            {unassigned.map((s) => (
              <button
                key={s.id}
                disabled={confirmed && selectedShipment !== s.id}
                onClick={() => {
                  if (!confirmed) {
                    setSelectedShipment(s.id);
                    setSelectedRoute(null);
                  }
                }}
                className={`px-3.5 py-2 rounded-sm border text-left transition-colors ${
                  selectedShipment === s.id ? "border-signal bg-signal/10" : "border-steel/25 hover:border-steel/50"
                } ${confirmed && selectedShipment !== s.id ? "opacity-50 cursor-not-allowed" : ""}`}
              >
                <p className="font-mono text-xs text-chart">{s.id}</p>
                <p className="text-xs text-mist mt-0.5">{s.cargo}</p>
              </button>
            ))}
          </div>
          <p className="font-mono text-xs text-steel mt-3">
            {shipment.origin} → {shipment.destination} · {shipment.volumeKbbl.toLocaleString()} kbbl · contracted via {shipment.contractedRoute}
          </p>
        </div>

        <div className="mb-2 flex items-center justify-between">
          <p className="label-eyebrow text-steel">Compare ranked alternatives</p>
          <p className="font-mono text-[11px] text-mist">RANKED BY TIME · COST · CAPACITY · RISK</p>
        </div>

        <div className="grid md:grid-cols-2 gap-4 mb-5">
          {ranked.map((route, index) => (
            <button
              key={route.id}
              disabled={confirmed && selectedRoute !== route.id}
              onClick={() => {
                if (!confirmed) {
                  setSelectedRoute(route.id);
                }
              }}
              className={`text-left border rounded-md p-5 transition-colors bg-abyss2/60 ${
                selectedRouteData?.id === route.id ? "border-signal ring-1 ring-signal/40" : "border-steel/20 hover:border-steel/40"
              } ${confirmed && selectedRoute !== route.id ? "opacity-50 cursor-not-allowed" : ""}`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    {index === 0 && (
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-signal/15 text-signal uppercase">Recommended</span>
                    )}
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full border uppercase ${riskTone[route.risk]}`}>
                      {route.risk} risk
                    </span>
                  </div>
                  <p className="font-display text-chart text-lg mt-2">{route.originPort} → {route.destinationPort}</p>
                  <p className="text-xs text-mist mt-1 max-w-sm">{route.origin} to {route.destination} via {route.chokepointId ? "alternate corridor" : "direct route"}</p>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-2 mt-4 pt-4 border-t border-steel/15">
                <div>
                  <p className="font-mono text-[10px] text-steel uppercase">Delay</p>
                  <p className="font-display text-chart text-base">+{route.transitDelta}d</p>
                </div>
                <div>
                  <p className="font-mono text-[10px] text-steel uppercase">Cost</p>
                  <p className="font-display text-chart text-base">+{route.costDeltaPct}%</p>
                </div>
                <div>
                  <p className="font-mono text-[10px] text-steel uppercase">Capacity</p>
                  <p className="font-display text-chart text-base">{route.capacity}%</p>
                </div>
                <div>
                  <p className="font-mono text-[10px] text-steel uppercase">Status</p>
                  <p className="font-mono text-[11px] text-mist mt-1.5 leading-tight">{route.status}</p>
                </div>
              </div>
            </button>
          ))}
        </div>

        <div className="border border-steel/20 rounded-md bg-abyss2/60 p-5">
          <p className="label-eyebrow text-steel mb-3">Confirm reroute</p>
          {!selectedRouteData ? (
            <p className="text-sm text-mist">Pick a route above to see the workflow that fires next.</p>
          ) : confirmed ? (
            <div className="text-sm">
              <p className="text-good font-medium">
                ✓ {shipment.id} reassigned to {selectedRouteData.originPort} → {selectedRouteData.destinationPort}
              </p>
              <p className="text-mist mt-2 font-mono text-xs leading-relaxed">
                Triggered automatically: charter request sent to freight desk · revised ETA logged · route insurance rider drafted · hedge desk flagged for the additional transit and premium spread.
              </p>
            </div>
          ) : (
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <p className="text-sm text-mist">
                Reassign <span className="text-chart font-mono">{shipment.id}</span> to <span className="text-signal font-mono">{selectedRouteData.originPort} → {selectedRouteData.destinationPort}</span>. This update moves the cargo away from the exposed Hormuz corridor and triggers the alternate-route workflow.
              </p>
              <button
                onClick={() => setConfirmed(true)}
                className="shrink-0 bg-signal text-abyss font-medium text-sm px-5 py-2.5 rounded-sm hover:bg-signal/90 transition-colors"
              >
                Confirm reroute
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
