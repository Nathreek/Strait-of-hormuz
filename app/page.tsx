"use client";

import Link from "next/link";
import Topbar from "@/components/Topbar";
import PageHeader from "@/components/PageHeader";
import StatusRail from "@/components/StatusRail";
import MaritimeMap from "@/components/MaritimeMap";
import RouteLedger from "@/components/RouteLedger";
import { SHIPMENTS, ROUTES, SUPPLIERS, CONSUMERS, COMMODITIES, getAffectedRoutes, getScenario } from "@/lib/data";
import { useSimulation } from "@/components/SimulationContext";

const statusStyle: Record<string, string> = {
  "at risk": "bg-alert/15 text-alert",
  rerouted: "bg-signal/15 text-signal",
  "in transit": "bg-steel/15 text-mist",
  delivered: "bg-good/15 text-good",
};

export default function DashboardPage() {
  const { scenario, setScenarioId, setSelectedRouteId, setSelectedSupplierId, setSelectedConsumerId, setSelectedChokepointId, selectedRouteId } = useSimulation();
  const atRisk = SHIPMENTS.filter((s) => s.status === "at risk");
  const activeScenario = getScenario(scenario.id);

  const dashboardStats = {
    exposedSuppliers: SUPPLIERS.filter((supplier) => supplier.status === "critical" || supplier.status === "exposed").length,
    exposedConsumers: CONSUMERS.filter((consumer) => consumer.dependency > 65).length,
    routesAtRisk: getAffectedRoutes(ROUTES, activeScenario).length,
    commoditiesAffected: COMMODITIES.filter((commodity) => commodity.exposure > 45).length,
  };

  const selectedRoute = ROUTES.find((route) => route.id === selectedRouteId) ?? ROUTES[0];

  return (
    <>
      <Topbar />
      <div className="max-w-6xl mx-auto px-5 md:px-10 py-8 md:py-10">
        <PageHeader
          eyebrow="Operation Deck"
          title="Maritime disruption exposure is now visible across the network."
          description="The dashboard connects physical shipping corridors to supplier dependency and consumer impact so the whole operating story stays coherent from chokepoint disruption to recovery planning."
        />

        <div className="mb-5 flex flex-wrap items-center gap-2">
          {["normal", "partial", "full", "capacity"].map((scenarioId) => {
            const selected = scenario.id === scenarioId;
            return (
              <button
                key={scenarioId}
                onClick={() => {
                  const next = getScenario(scenarioId as any);
                  if (next) {
                    setScenarioId(scenarioId as typeof scenario.id);
                    setSelectedRouteId(next.disruptionActive ? "route-qatar-india" : "route-saudi-europe");
                    setSelectedSupplierId(next.disruptionActive ? "supplier-qatar" : "supplier-saudi");
                    setSelectedConsumerId(next.disruptionActive ? "consumer-india" : "consumer-europe");
                    setSelectedChokepointId(next.disruptionActive ? "chokepoint-hormuz" : "chokepoint-suez");
                  }
                }}
                className={`px-3 py-1.5 rounded-full text-[11px] font-mono border ${selected ? "border-signal bg-signal/10 text-signal" : "border-steel/25 text-mist hover:border-steel/50"}`}
              >
                {getScenario(scenarioId as any).name}
              </button>
            );
          })}
        </div>

        <StatusRail />

        <div className="mt-6 grid lg:grid-cols-[1.6fr_0.7fr] gap-5">
          <MaritimeMap />
          <div className="border border-steel/20 rounded-md bg-abyss2/60 p-4">
            <p className="label-eyebrow text-steel">Selected route</p>
            <h2 className="font-display text-chart text-xl mt-2">{selectedRoute.origin} → {selectedRoute.destination}</h2>
            <p className="text-sm text-mist mt-2">{selectedRoute.vessel}</p>
            <div className="mt-4 space-y-3 text-sm text-mist">
              <div className="flex justify-between gap-3"><span>Transit</span><span className="font-mono text-chart">{selectedRoute.transitDays}d</span></div>
              <div className="flex justify-between gap-3"><span>Capacity</span><span className="font-mono text-chart">{selectedRoute.capacity}%</span></div>
              <div className="flex justify-between gap-3"><span>Utilization</span><span className="font-mono text-chart">{selectedRoute.utilization}%</span></div>
              <div className="flex justify-between gap-3"><span>Risk</span><span className="font-mono text-chart">{selectedRoute.risk}</span></div>
              <div className="flex justify-between gap-3"><span>Status</span><span className="font-mono text-chart">{selectedRoute.status}</span></div>
            </div>
            <div className="mt-4 border-t border-steel/15 pt-3">
              <p className="label-eyebrow text-signal">Why risk is elevated</p>
              <ul className="mt-2 space-y-2 text-xs text-mist leading-relaxed">
                {selectedRoute.riskReasons.map((reason) => <li key={reason}>• {reason}</li>)}
              </ul>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-5 mt-6">
          <div className="lg:col-span-2">
            <RouteLedger />
          </div>

          <div className="border border-alert/25 rounded-md bg-abyss2/60 flex flex-col">
            <div className="px-5 pt-4">
              <p className="label-eyebrow text-alert">Needs a decision</p>
              <p className="font-display text-chart text-lg mt-0.5">{atRisk.length} shipments unassigned</p>
            </div>
            <div className="flex-1 divide-y divide-steel/15 mt-3">
              {atRisk.map((s) => (
                <div key={s.id} className="px-5 py-3">
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-xs text-chart">{s.id}</span>
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full uppercase ${statusStyle[s.status]}`}>{s.status}</span>
                  </div>
                  <p className="text-sm text-mist mt-1">{s.cargo}</p>
                  <p className="font-mono text-[11px] text-steel mt-0.5">{s.origin} → {s.destination} · {s.volumeKbbl.toLocaleString()} kbbl</p>
                </div>
              ))}
            </div>
            <Link href="/reroute" className="m-4 text-center text-sm font-medium bg-signal text-abyss rounded-sm py-2.5 hover:bg-signal/90 transition-colors">Assign a route</Link>
          </div>
        </div>

        <div className="mt-6 grid md:grid-cols-2 xl:grid-cols-4 gap-4">
          <div className="rounded-md border border-steel/20 bg-abyss2/60 p-4"><p className="label-eyebrow text-steel">Exposed suppliers</p><p className="font-display text-chart text-2xl mt-2">{dashboardStats.exposedSuppliers}</p></div>
          <div className="rounded-md border border-steel/20 bg-abyss2/60 p-4"><p className="label-eyebrow text-steel">Exposed consumers</p><p className="font-display text-chart text-2xl mt-2">{dashboardStats.exposedConsumers}</p></div>
          <div className="rounded-md border border-steel/20 bg-abyss2/60 p-4"><p className="label-eyebrow text-steel">Routes at risk</p><p className="font-display text-chart text-2xl mt-2">{dashboardStats.routesAtRisk}</p></div>
          <div className="rounded-md border border-steel/20 bg-abyss2/60 p-4"><p className="label-eyebrow text-steel">Commodities affected</p><p className="font-display text-chart text-2xl mt-2">{dashboardStats.commoditiesAffected}</p></div>
        </div>

        <div className="mt-6 border border-steel/20 rounded-md bg-abyss2/60 overflow-hidden">
          <div className="px-5 py-4 border-b border-steel/15 flex items-center justify-between"><p className="font-display text-chart text-lg">Cargo ledger</p><span className="font-mono text-[11px] text-mist">{SHIPMENTS.length} SHIPMENTS TRACKED</span></div>
          <div className="overflow-x-auto"><table className="w-full text-sm"><thead><tr className="text-left label-eyebrow text-steel"><th className="px-5 py-2.5 font-normal">Shipment</th><th className="px-5 py-2.5 font-normal">Cargo</th><th className="px-5 py-2.5 font-normal">Route</th><th className="px-5 py-2.5 font-normal">ETA Delta</th><th className="px-5 py-2.5 font-normal">Status</th></tr></thead><tbody className="divide-y divide-steel/10">{SHIPMENTS.map((s) => (<tr key={s.id} className="hover:bg-steel/5"><td className="px-5 py-3 font-mono text-xs text-chart">{s.id}</td><td className="px-5 py-3 text-mist">{s.cargo}</td><td className="px-5 py-3 text-mist font-mono text-xs">{s.assignedRoute ?? "— unassigned —"}</td><td className="px-5 py-3 font-mono text-xs text-steel">{s.etaDaysDelta > 0 ? `+${s.etaDaysDelta}d` : "—"}</td><td className="px-5 py-3"><span className={`text-[10px] font-mono px-2 py-0.5 rounded-full uppercase ${statusStyle[s.status]}`}>{s.status}</span></td></tr>))}</tbody></table></div>
        </div>
      </div>
    </>
  );
}
