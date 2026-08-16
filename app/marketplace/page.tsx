"use client";

import { useMemo, useState } from "react";
import Topbar from "@/components/Topbar";
import PageHeader from "@/components/PageHeader";
import { SUPPLIERS, COMMODITIES, getScenario } from "@/lib/data";
import { useSimulation } from "@/components/SimulationContext";

type SortKey = "dependency" | "exposure" | "country";

export default function MarketplacePage() {
  const { scenario } = useSimulation();
  const [sortKey, setSortKey] = useState<SortKey>("dependency");
  const [onlyExposed, setOnlyExposed] = useState(false);
  const [requestedSuppliers, setRequestedSuppliers] = useState<string[]>([]);

  const rows = useMemo(() => {
    let list = [...SUPPLIERS];
    if (onlyExposed) list = list.filter((s) => s.status !== "stable");
    if (scenario.disruptionActive) {
      list = list.map((supplier) => ({
        ...supplier,
        exposure: Math.round(supplier.exposure * (1 + scenario.volumeShockPct / 100)),
        dependency: Math.min(99, supplier.dependency + 7),
      }));
    }
    return list.sort((a, b) => {
      if (sortKey === "exposure") return b.exposure - a.exposure;
      if (sortKey === "country") return a.country.localeCompare(b.country);
      return b.dependency - a.dependency;
    });
  }, [onlyExposed, scenario, sortKey]);

  return (
    <>
      <Topbar />
      <div className="max-w-6xl mx-auto px-5 md:px-10 py-8 md:py-10">
        <PageHeader
          eyebrow="Alternatives"
          title="Supply and demand are shifting as routes tighten and availability falls."
        />

        <div className="flex flex-wrap items-center gap-3 mb-4">
          <span className="label-eyebrow text-steel">Sort by</span>
          {([
            ["dependency", "Dependency"],
            ["exposure", "Exposure"],
            ["country", "Country"],
          ] as [SortKey, string][]).map(([key, label]) => (
            <button
              key={key}
              onClick={() => setSortKey(key)}
              className={`px-3 py-1.5 rounded-full text-xs font-mono border transition-colors ${
                sortKey === key
                  ? "border-signal text-signal bg-signal/10"
                  : "border-steel/25 text-mist hover:border-steel/50"
              }`}
            >
              {label}
            </button>
          ))}
          <label className="flex items-center gap-2 ml-auto text-xs font-mono text-mist cursor-pointer">
            <input
              type="checkbox"
              checked={onlyExposed}
              onChange={(e) => setOnlyExposed(e.target.checked)}
              className="accent-signal"
            />
            Show exposed suppliers only
          </label>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          {rows.map((s) => (
            <div key={s.id} className="border border-steel/20 rounded-md bg-abyss2/60 p-5">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <p className="font-display text-chart text-lg">{s.name}</p>
                  <p className="text-xs text-mist mt-1">{s.country}</p>
                </div>
                <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full uppercase ${s.status === "critical" ? "bg-alert/15 text-alert" : s.status === "exposed" ? "bg-signal/15 text-signal" : "bg-good/15 text-good"}`}>
                  {s.status}
                </span>
              </div>

              <p className="font-mono text-xs text-steel mt-3">
                {COMMODITIES.find((item) => item.id === s.commodityId)?.name ?? "Product"}
              </p>

              <div className="grid grid-cols-3 gap-2 mt-4 pt-4 border-t border-steel/15">
                <div>
                  <p className="font-mono text-[10px] text-steel uppercase">Exposure</p>
                  <p className="font-display text-chart text-base">{s.exposure.toLocaleString()} t</p>
                </div>
                <div>
                  <p className="font-mono text-[10px] text-steel uppercase">Dependency</p>
                  <p className="font-display text-chart text-base">{s.dependency}%</p>
                </div>
                <div>
                  <p className="font-mono text-[10px] text-steel uppercase">Route risk</p>
                  <p className="font-mono text-[11px] text-mist mt-1.5 leading-tight">{s.risk}</p>
                </div>
              </div>

              <div className="flex items-center justify-between mt-4">
                <span className="font-mono text-[11px] text-mist">{s.portName}</span>
                <button
                  onClick={() =>
                    setRequestedSuppliers((current) =>
                      current.includes(s.id) ? current : [...current, s.id],
                    )
                  }
                  className={`text-xs font-medium transition-colors ${
                    requestedSuppliers.includes(s.id)
                      ? "text-good"
                      : "text-signal hover:text-[#f4af5a]"
                  }`}
                >
                  {requestedSuppliers.includes(s.id) ? "Allocation requested" : "Request allocation →"}
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 border border-steel/20 rounded-md bg-abyss2/60 p-5">
          <p className="label-eyebrow text-steel mb-2">Market impact</p>
          <div className="grid md:grid-cols-4 gap-4 mt-3">
            {[
              ["01", "Demand shift", `${scenario.name} raises throughput tension on the most exposed exporters.`],
              ["02", "Origin risk", "Alternative supply remains available but requires longer transit and higher freight premiums."],
              ["03", "Price signal", "Exposure-driven premiums are elevated on LNG and crude tied to the Gulf corridor."],
              ["04", "Hedge check", `${getScenario(scenario.id).description}`],
            ].map(([n, t, d]) => (
              <div key={n} className="border-l border-steel/25 pl-3">
                <p className="font-mono text-[11px] text-signal">{n}</p>
                <p className="text-sm text-chart mt-1">{t}</p>
                <p className="text-xs text-mist mt-1 leading-relaxed">{d}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}
