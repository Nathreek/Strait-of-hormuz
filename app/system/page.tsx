import Topbar from "@/components/Topbar";
import PageHeader from "@/components/PageHeader";

const LAYERS = [
  {
    name: "Signal ingestion",
    items: [
      "AIS vessel tracking + port congestion feeds",
      "War-risk insurance premium indices",
      "Freight rate benchmarks (Baltic Exchange)",
      "News/sanctions feed for chokepoint status",
    ],
  },
  {
    name: "Decision engine",
    items: [
      "Route scoring (time · cost · capacity · risk)",
      "Supplier matching against open contracts",
      "Exposure calculator per shipment",
      "Hedge trigger rules",
    ],
  },
  {
    name: "Workflow layer",
    items: [
      "Reroute Orchestrator (assign & confirm)",
      "EnergySwap (source & contract)",
      "HedgeAI (propose & approve)",
      "Notifications to freight desk, counterparties, insurers",
    ],
  },
  {
    name: "Product surface",
    items: [
      "Ops Deck dashboard",
      "Shared cargo ledger",
      "Audit trail for every reroute/hedge decision",
    ],
  },
];

const GTM = [
  {
    title: "Who buys it",
    body:
      "Mid-size energy traders, refiners, and shipping desks — large enough to have real Gulf-transit exposure, too small to run a 24/7 in-house routing and risk desk the way a supermajor does.",
  },
  {
    title: "How it's sold",
    body:
      "Land during a live disruption with a free 30-day 'continuity mode' scoped to at-risk cargo only, priced per shipment routed. Expand into a flat seat license once the desk relies on it daily, closure or not.",
  },
  {
    title: "Why it sticks",
    body:
      "The audit trail becomes the record insurers and counterparties expect after a force-majeure event. Once a firm's reroute and hedge history lives in the ledger, switching costs rise fast.",
  },
  {
    title: "Early wedge",
    body:
      "Partner with a war-risk insurance underwriter so a HedgeAI-documented decision trail qualifies for a premium discount — makes the product pay for itself independent of a closure happening.",
  },
];

export default function SystemPage() {
  return (
    <>
      <Topbar />
      <div className="max-w-6xl mx-auto px-5 md:px-10 py-8 md:py-10">
        <PageHeader
          eyebrow="04 · System & Workflow"
          title="What has to happen behind the console for a reroute to actually clear."
          description="The product surface is three modules, but they all sit on one shared decision engine so a reroute, a sourcing change, and a hedge are never made from different pictures of reality."
        />

        <div className="border border-steel/20 rounded-md bg-abyss2/60 p-5 md:p-6">
          <p className="label-eyebrow text-steel mb-4">Architecture</p>
          <div className="space-y-3">
            {LAYERS.map((layer, i) => (
              <div key={layer.name}>
                <div className="border border-steel/25 rounded-md p-4">
                  <p className="font-mono text-[11px] text-signal">
                    L{i + 1} — {layer.name.toUpperCase()}
                  </p>
                  <div className="grid sm:grid-cols-2 gap-2 mt-2">
                    {layer.items.map((it) => (
                      <p key={it} className="text-xs text-mist font-mono leading-relaxed">
                        · {it}
                      </p>
                    ))}
                  </div>
                </div>
                {i < LAYERS.length - 1 && (
                  <div className="flex justify-center py-1.5">
                    <span className="text-steel font-mono text-xs">↓</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="border border-steel/20 rounded-md bg-abyss2/60 p-5 md:p-6 mt-5">
          <p className="label-eyebrow text-steel mb-4">Core workflow — from disruption to cleared cargo</p>
          <ol className="grid md:grid-cols-5 gap-3">
            {[
              ["Detect", "Chokepoint status changes; affected shipments flagged automatically."],
              ["Score", "Every alternate route or supplier is ranked for that specific cargo."],
              ["Decide", "Ops desk confirms a reroute or sourcing switch in one action."],
              ["Cover", "HedgeAI proposes the financial instrument the decision now needs."],
              ["Record", "Freight desk, counterparties, and insurers notified; ledger updated."],
            ].map(([t, d], i) => (
              <li key={t} className="border-t-2 border-signal/40 pt-3">
                <p className="font-mono text-[11px] text-steel">{String(i + 1).padStart(2, "0")}</p>
                <p className="text-sm text-chart mt-1">{t}</p>
                <p className="text-xs text-mist mt-1 leading-relaxed">{d}</p>
              </li>
            ))}
          </ol>
        </div>

        <div className="grid md:grid-cols-2 gap-4 mt-5">
          {GTM.map((g) => (
            <div key={g.title} className="border border-steel/20 rounded-md bg-abyss2/60 p-5">
              <p className="font-display text-chart text-base">{g.title}</p>
              <p className="text-sm text-mist mt-2 leading-relaxed">{g.body}</p>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}
