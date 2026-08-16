"use client";

import { useState } from "react";
import Topbar from "@/components/Topbar";
import PageHeader from "@/components/PageHeader";
import { HEDGES } from "@/lib/data";

const statusStyle: Record<string, string> = {
  active: "bg-good/15 text-good",
  proposed: "bg-signal/15 text-signal",
  expired: "bg-steel/15 text-mist",
};

export default function HedgePage() {
  const [hedges, setHedges] = useState(HEDGES);

  const approveHedge = (id: string) => {
    setHedges((current) =>
      current.map((hedge) =>
        hedge.id === id ? { ...hedge, status: "active" } : hedge,
      ),
    );
  };

  return (
    <>
      <Topbar />
      <div className="max-w-6xl mx-auto px-5 md:px-10 py-8 md:py-10">
        <PageHeader
          eyebrow="03 · HedgeAI"
          title="Financial cover for the exposure operations can't route away."
          description="HedgeAI doesn't replace the reroute decision — it reacts to it. Every reroute or sourcing change in the console can trigger a proposed hedge here, so financial exposure never sits unmanaged while cargo is in flux."
        />

        <div className="border border-steel/20 rounded-md bg-abyss2/60 p-5 mb-6">
          <p className="label-eyebrow text-steel mb-3">Where hedges come from</p>
          <div className="flex flex-col md:flex-row items-stretch gap-3 text-xs font-mono">
            <div className="flex-1 border border-steel/20 rounded-sm p-3 text-mist">
              Reroute Orchestrator confirms a diversion with added transit days
            </div>
            <div className="flex items-center justify-center text-steel">→</div>
            <div className="flex-1 border border-steel/20 rounded-sm p-3 text-mist">
              HedgeAI prices the added freight-rate and commodity-price exposure
            </div>
            <div className="flex items-center justify-center text-steel">→</div>
            <div className="flex-1 border border-signal/30 rounded-sm p-3 text-signal bg-signal/5">
              A proposed instrument appears below for desk approval
            </div>
          </div>
        </div>

        <div className="space-y-4">
          {hedges.map((h) => (
            <div key={h.id} className="border border-steel/20 rounded-md bg-abyss2/60 p-5 shadow-[0_0_0_1px_rgba(224,147,44,0.06)]">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-xs text-steel">{h.id}</span>
                    <span
                      className={`text-[10px] font-mono px-2 py-0.5 rounded-full uppercase ${statusStyle[h.status]}`}
                    >
                      {h.status}
                    </span>
                  </div>
                  <p className="font-display text-chart text-lg mt-1">{h.instrument}</p>
                  <p className="text-xs text-mist mt-1">{h.strategy}</p>
                </div>
                {h.status === "proposed" && (
                  <button
                    onClick={() => approveHedge(h.id)}
                    className="shrink-0 bg-signal text-abyss text-xs font-medium px-4 py-2 rounded-sm hover:bg-[#f4af5a] transition-colors"
                  >
                    Approve hedge
                  </button>
                )}
              </div>

              <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mt-4 pt-4 border-t border-steel/15">
                <div>
                  <p className="font-mono text-[10px] text-steel uppercase">Underlying</p>
                  <p className="text-sm text-chart mt-1">{h.underlying}</p>
                </div>
                <div>
                  <p className="font-mono text-[10px] text-steel uppercase">Notional</p>
                  <p className="text-sm text-chart mt-1">{h.notionalKbbl.toLocaleString()} kbbl</p>
                </div>
                <div>
                  <p className="font-mono text-[10px] text-steel uppercase">Strike</p>
                  <p className="text-sm text-chart mt-1">{h.strike}</p>
                </div>
                <div>
                  <p className="font-mono text-[10px] text-steel uppercase">Expiry</p>
                  <p className="text-sm text-chart mt-1">{h.expiry}</p>
                </div>
              </div>
              <p className="text-xs text-mist mt-3 leading-relaxed border-t border-steel/15 pt-3">
                {h.rationale}
              </p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
