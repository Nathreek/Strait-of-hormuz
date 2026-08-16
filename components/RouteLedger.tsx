"use client";

import { ROUTES, SUPPLIERS, CONSUMERS, getAlternativeRoutes } from "@/lib/data";
import { useSimulation } from "@/components/SimulationContext";

export default function RouteLedger() {
  const { selectedRouteId, setSelectedRouteId, scenario } = useSimulation();

  return (
    <div className="relative rounded-md border border-steel/25 bg-abyss2/70 overflow-hidden">
      <div className="flex items-center justify-between px-5 pt-4">
        <div>
          <p className="label-eyebrow text-signal">Route ledger</p>
          <p className="font-display text-chart text-lg mt-0.5">Dependency paths</p>
        </div>
        <span className="font-mono text-[11px] text-mist">UPDATED {scenario.name.toUpperCase()}</span>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="text-left label-eyebrow text-steel">
              <th className="px-4 py-3 font-normal">Supplier</th>
              <th className="px-4 py-3 font-normal">Origin</th>
              <th className="px-4 py-3 font-normal">Commodity</th>
              <th className="px-4 py-3 font-normal">Consumer</th>
              <th className="px-4 py-3 font-normal">Status</th>
              <th className="px-4 py-3 font-normal">Transit</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-steel/10">
            {ROUTES.map((route) => {
              const supplier = SUPPLIERS.find((item) => item.id === route.supplierId);
              const consumer = CONSUMERS.find((item) => item.id === route.consumerId);
              const alt = getAlternativeRoutes(route.id, ROUTES);
              const selected = selectedRouteId === route.id;
              return (
                <tr
                  key={route.id}
                  onClick={() => setSelectedRouteId(route.id)}
                  className={`cursor-pointer transition-colors ${selected ? "bg-signal/10" : "hover:bg-steel/5"}`}
                >
                  <td className="px-4 py-3 text-chart font-medium">{supplier?.name ?? route.origin}</td>
                  <td className="px-4 py-3 font-mono text-[11px] text-mist">{route.originPort}</td>
                  <td className="px-4 py-3 text-mist">{route.commodityId}</td>
                  <td className="px-4 py-3 text-mist">{consumer?.name ?? route.destination}</td>
                  <td className="px-4 py-3">
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full uppercase ${route.status === "disrupted" ? "bg-alert/15 text-alert" : route.status === "rerouted" ? "bg-signal/15 text-signal" : "bg-good/15 text-good"}`}>
                      {route.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 font-mono text-[11px] text-steel">{route.transitDays}d {alt.length ? "/ alt" : ""}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
