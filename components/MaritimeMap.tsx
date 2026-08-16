"use client";

import { useMemo, useState } from "react";
import { CHOKEPOINTS, CONSUMERS, ROUTES, SUPPLIERS, getAffectedRoutes, getScenario } from "@/lib/data";
import { useSimulation } from "@/components/SimulationContext";

function buildPath(waypoints: any[]) {
  return waypoints.map((wp, index) => {
    const [x, y] = "lat" in wp && "lng" in wp ? [wp.lng * 100, wp.lat * 100] : wp;
    return `${index === 0 ? "M" : "L"} ${x} ${y}`;
  }).join(" ");
}

export default function MaritimeMap() {
  const {
    scenario,
    selectedSupplierId,
    setSelectedSupplierId,
    selectedConsumerId,
    setSelectedConsumerId,
    selectedRouteId,
    setSelectedRouteId,
    selectedChokepointId,
    setSelectedChokepointId,
    affectedRoutes,
  } = useSimulation();
  const [hoveredRouteId, setHoveredRouteId] = useState<string | null>(null);

  const visibleRoutes = useMemo(() => {
    const base = scenario.disruptionActive ? affectedRoutes : ROUTES.filter((route) => route.status !== "normal");
    return base.length ? base : ROUTES;
  }, [affectedRoutes, scenario.disruptionActive]);

  const selectedRoute = visibleRoutes.find((route) => route.id === selectedRouteId) ?? ROUTES.find((route) => route.id === selectedRouteId) ?? null;
  const hoveredRoute = visibleRoutes.find((route) => route.id === hoveredRouteId) ?? selectedRoute;

  return (
    <div className="relative overflow-hidden rounded-md border border-steel/20 bg-[#071922]">
      <div className="flex items-center justify-between border-b border-steel/15 px-4 py-3">
        <div>
          <p className="label-eyebrow text-signal">Maritime Dependency Map</p>
          <p className="font-display text-chart text-lg">Global Route Exposure Map</p>
        </div>
        <span className="font-mono text-[11px] text-mist">{scenario.name.toUpperCase()} MODE</span>
      </div>

      <div className="relative">
        <svg viewBox="0 0 980 540" className="w-full h-[500px]" role="img" aria-label="Map of maritime supply chain routes around the Arabian Sea, Hormuz, Red Sea, and Indian subcontinent">
          <defs>
            <linearGradient id="ocean" x1="0" x2="1" y1="0" y2="1">
              <stop offset="0%" stopColor="#0c2230" />
              <stop offset="100%" stopColor="#081a26" />
            </linearGradient>
          </defs>

          <rect width="980" height="540" fill="url(#ocean)" />

          <g opacity="0.7">
            <path d="M0,120 L240,90 L380,120 L520,110 L620,142 L700,128 L980,150 L980,0 L0,0 Z" fill="#0e2c3a" />
            <path d="M190,420 L300,410 L420,440 L610,400 L760,430 L980,480 L980,540 L0,540 L0,440 Z" fill="#0e2c3a" />
          </g>

          <g stroke="#9FB4BD" strokeOpacity="0.08" strokeWidth="1">
            {Array.from({ length: 9 }).map((_, index) => (
              <line key={`h-${index}`} x1="0" x2="980" y1={70 + index * 50} y2={70 + index * 50} />
            ))}
            {Array.from({ length: 12 }).map((_, index) => (
              <line key={`v-${index}`} y1="0" y2="540" x1={80 + index * 70} x2={80 + index * 70} />
            ))}
          </g>

          <g fontSize="11" fill="#87A4B1" fontFamily="IBM Plex Mono, monospace" letterSpacing="1.3">
            <text x="215" y="100">PERSIAN GULF</text>
            <text x="610" y="88">ARABIAN SEA</text>
            <text x="742" y="210">INDIAN OCEAN</text>
            <text x="540" y="230">RED SEA</text>
            <text x="420" y="150">MEDITERRANEAN</text>
            <text x="180" y="462">AFRICA</text>
            <text x="836" y="474">ASIA</text>
          </g>

          <g>
            {SUPPLIERS.map((supplier) => {
              const isSelected = selectedSupplierId === supplier.id;
              return (
                <g key={supplier.id} onClick={() => setSelectedSupplierId(supplier.id)} style={{ cursor: "pointer" }}>
                  <circle cx={supplier.x} cy={supplier.y} r={isSelected ? 11 : 8} fill={supplier.status === "critical" ? "#C1482E" : supplier.status === "exposed" ? "#E0932C" : "#5E8B6B"} opacity={isSelected ? 1 : 0.9} />
                  {isSelected && <circle cx={supplier.x} cy={supplier.y} r={16} fill="none" stroke="#F3C371" strokeDasharray="4 5" />}
                  <text x={supplier.x + 12} y={supplier.y - 10} fill="#EDE7D6" fontSize="11" fontFamily="IBM Plex Mono, monospace">{supplier.name}</text>
                </g>
              );
            })}
          </g>

          <g>
            {CHOKEPOINTS.map((chokepoint) => {
              const isSelected = selectedChokepointId === chokepoint.id;
              return (
                <g key={chokepoint.id} onClick={() => setSelectedChokepointId(chokepoint.id)} style={{ cursor: "pointer" }}>
                  <rect x={chokepoint.x - 8} y={chokepoint.y - 8} width="16" height="16" rx="3" fill={chokepoint.status === "disrupted" ? "#C1482E" : "#5C7A8A"} opacity={isSelected ? 1 : 0.75} />
                  <text x={chokepoint.x + 14} y={chokepoint.y + 4} fill="#EDE7D6" fontSize="10" fontFamily="IBM Plex Mono, monospace">{chokepoint.name}</text>
                </g>
              );
            })}
          </g>

          <g>
            {CONSUMERS.map((consumer) => {
              const isSelected = selectedConsumerId === consumer.id;
              return (
                <g key={consumer.id} onClick={() => setSelectedConsumerId(consumer.id)} style={{ cursor: "pointer" }}>
                  <circle cx={consumer.x} cy={consumer.y} r={isSelected ? 10 : 7} fill="#5C7A8A" opacity={isSelected ? 1 : 0.8} />
                  {isSelected && <circle cx={consumer.x} cy={consumer.y} r={16} fill="none" stroke="#A7C5D6" strokeDasharray="4 5" />}
                  <text x={consumer.x + 12} y={consumer.y - 10} fill="#EDE7D6" fontSize="11" fontFamily="IBM Plex Mono, monospace">{consumer.name}</text>
                </g>
              );
            })}
          </g>

          <g>
            {ROUTES.map((route) => {
              const isSelected = selectedRouteId === route.id;
              const isDisrupted = route.status === "disrupted" || scenario.disruptionActive;
              const isAffected = affectedRoutes.some((item) => item.id === route.id);
              const path = buildPath(route.waypoints);
              const muted = selectedRouteId && !isSelected && route.id !== selectedRouteId;
              return (
                <g key={route.id}>
                  <path
                    d={path}
                    fill="none"
                    stroke={isSelected ? "#F3C371" : isDisrupted || isAffected ? "#C1482E" : "#5E8B6B"}
                    strokeWidth={isSelected ? 3.2 : 2}
                    strokeLinecap="round"
                    opacity={muted ? 0.2 : isDisrupted || isAffected ? 0.9 : 0.7}
                    onMouseEnter={() => setHoveredRouteId(route.id)}
                    onMouseLeave={() => setHoveredRouteId(null)}
                    onClick={() => setSelectedRouteId(route.id)}
                    style={{ cursor: "pointer" }}
                  />
                  <circle r="3" fill="#EDE7D6" opacity={0.8}>
                    <animateMotion dur="6s" repeatCount="indefinite" path={path} rotate="auto" begin={`${route.id.length * 0.4}s`} />
                  </circle>
                </g>
              );
            })}
          </g>
        </svg>

        <div className="pointer-events-none absolute right-4 top-4 w-64 rounded-md border border-steel/20 bg-abyss2/80 p-3 backdrop-blur-sm">
          <p className="label-eyebrow text-steel">Selected corridor</p>
          {hoveredRoute ? (
            <>
              <p className="font-display text-chart text-base mt-1">{hoveredRoute.origin} → {hoveredRoute.destination}</p>
              <p className="font-mono text-[11px] text-mist mt-1">
                {hoveredRoute.vessel}
              </p>
              <div className="mt-2 grid grid-cols-2 gap-2 text-[11px] text-mist font-mono">
                <div><span className="text-steel">Transit</span><br />{hoveredRoute.transitDays}d</div>
                <div><span className="text-steel">Risk</span><br />{hoveredRoute.risk}</div>
                <div><span className="text-steel">Util.</span><br />{hoveredRoute.utilization}%</div>
                <div><span className="text-steel">Status</span><br />{hoveredRoute.status}</div>
              </div>
            </>
          ) : (
            <p className="text-sm text-mist mt-2">Hover a route to inspect cargo flow and risk.</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-px border-t border-steel/15 bg-steel/15">
        <button onClick={() => setSelectedChokepointId("chokepoint-hormuz")} className="bg-abyss2 px-3 py-3 text-left">
          <p className="label-eyebrow text-alert">Chokepoint</p>
          <p className="font-display text-chart text-base mt-1">Strait of Hormuz</p>
        </button>
        <button onClick={() => setSelectedSupplierId("supplier-qatar")} className="bg-abyss2 px-3 py-3 text-left">
          <p className="label-eyebrow text-signal">Supplier</p>
          <p className="font-display text-chart text-base mt-1">Qatar LNG</p>
        </button>
        <button onClick={() => setSelectedConsumerId("consumer-india")} className="bg-abyss2 px-3 py-3 text-left">
          <p className="label-eyebrow text-steel">Consumer</p>
          <p className="font-display text-chart text-base mt-1">India</p>
        </button>
        <button onClick={() => setSelectedRouteId("route-qatar-india")} className="bg-abyss2 px-3 py-3 text-left">
          <p className="label-eyebrow text-good">Active route</p>
          <p className="font-display text-chart text-base mt-1">Qatar → India</p>
        </button>
      </div>
    </div>
  );
}
