export type RouteRisk = "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
export type ScenarioId = "normal" | "partial" | "full" | "capacity";

export type Commodity = {
  id: string;
  name: string;
  category: string;
  exposure: number;
  unit: string;
  description: string;
};

export type GeoPoint = {
  lat: number;
  lng: number;
};

export type Port = {
  id: string;
  name: string;
  country: string;
  region: string;
  x: number;
  y: number;
  location?: GeoPoint;
};

export type Supplier = {
  id: string;
  name: string;
  country: string;
  portId: string;
  portName: string;
  commodityId: string;
  x: number;
  y: number;
  location?: GeoPoint;
  exposure: number;
  dependency: number;
  risk: RouteRisk;
  status: "stable" | "exposed" | "critical";
};

export type Consumer = {
  id: string;
  name: string;
  country: string;
  commodityId: string;
  portId: string;
  x: number;
  y: number;
  location?: GeoPoint;
  demand: number;
  dependency: number;
  routeIds: string[];
};

export type Chokepoint = {
  id: string;
  name: string;
  region: string;
  x: number;
  y: number;
  location?: GeoPoint;
  exposure: number;
  status: "open" | "restricted" | "disrupted";
};

export type Route = {
  id: string;
  supplierId: string;
  consumerId: string;
  commodityId: string;
  origin: string;
  destination: string;
  originPort: string;
  destinationPort: string;
  originPortId: string;
  destinationPortId: string;
  chokepointId?: string;
  vessel: string;
  transitDays: number;
  capacity: number;
  utilization: number;
  risk: RouteRisk;
  status: "normal" | "disrupted" | "rerouted";
  alternativeRouteId?: string;
  transitDelta: number;
  costDeltaPct: number;
  demandCoveredPct: number;
  riskReasons: string[];
  waypoints: (GeoPoint | [number, number])[];
};

export type Scenario = {
  id: ScenarioId;
  name: string;
  disruptionActive: boolean;
  label: string;
  volumeShockPct: number;
  delayDays: number;
  routeImpact: number;
  description: string;
};

export const PORTS: Port[] = [
  { id: "port-ras-tanura", name: "Ras Tanura", country: "Saudi Arabia", region: "Persian Gulf", x: 300, y: 260, location: { lat: 26.64, lng: 50.04 } },
  { id: "port-ras-laffan", name: "Ras Laffan", country: "Qatar", region: "Persian Gulf", x: 340, y: 248, location: { lat: 25.22, lng: 51.57 } },
  { id: "port-jubail", name: "Jubail", country: "Saudi Arabia", region: "Persian Gulf", x: 318, y: 266, location: { lat: 27.01, lng: 49.65 } },
  { id: "port-hormuz", name: "Strait of Hormuz", country: "Iran / Oman", region: "Chokepoint", x: 420, y: 300, location: { lat: 26.57, lng: 56.25 } },
  { id: "port-mumbai", name: "Mumbai", country: "India", region: "Indian Ocean", x: 690, y: 360, location: { lat: 19.08, lng: 72.88 } },
  { id: "port-dahej", name: "Dahej", country: "India", region: "Indian Ocean", x: 718, y: 332, location: { lat: 21.77, lng: 72.18 } },
  { id: "port-kuwait", name: "Kuwait Port", country: "Kuwait", region: "Persian Gulf", x: 336, y: 282, location: { lat: 29.38, lng: 47.97 } },
  { id: "port-suez", name: "Suez", country: "Egypt", region: "Red Sea / Suez", x: 500, y: 188, location: { lat: 29.97, lng: 32.55 } },
  { id: "port-yanbu", name: "Yanbu", country: "Saudi Arabia", region: "Red Sea", x: 462, y: 214, location: { lat: 24.22, lng: 38.07 } },
  { id: "port-alex", name: "Alexandria", country: "Egypt", region: "Mediterranean", x: 560, y: 156, location: { lat: 31.29, lng: 30.20 } },
  { id: "port-lagos", name: "Lagos", country: "Nigeria", region: "West Africa", x: 230, y: 440, location: { lat: 6.46, lng: 3.39 } },
  { id: "port-rotterdam", name: "Rotterdam", country: "Netherlands", region: "Europe", x: 470, y: 102, location: { lat: 51.92, lng: 4.28 } },
  { id: "port-singapore", name: "Singapore", country: "Singapore", region: "Asia", x: 860, y: 420, location: { lat: 1.35, lng: 103.82 } },
  { id: "port-shanghai", name: "Shanghai", country: "China", region: "Asia", x: 918, y: 280, location: { lat: 31.23, lng: 121.47 } },
  { id: "port-fujairah", name: "Fujairah", country: "UAE", region: "Gulf of Oman", x: 430, y: 332, location: { lat: 25.13, lng: 56.34 } },
];

export const CHOKEPOINTS: Chokepoint[] = [
  { id: "chokepoint-hormuz", name: "Strait of Hormuz", region: "Gulf of Oman", x: 430, y: 300, location: { lat: 26.57, lng: 56.25 }, exposure: 92, status: "disrupted" },
  { id: "chokepoint-suez", name: "Suez Canal", region: "North Africa", x: 510, y: 175, location: { lat: 29.97, lng: 32.55 }, exposure: 41, status: "open" },
  { id: "chokepoint-bab-el-mandeb", name: "Bab el-Mandeb", region: "Red Sea", x: 470, y: 272, location: { lat: 12.63, lng: 43.32 }, exposure: 36, status: "open" },
];

export const COMMODITIES: Commodity[] = [
  { id: "commodity-crude", name: "Crude oil", category: "Energy", exposure: 62, unit: "kbbl", description: "High-volume flows via Gulf routes to Asia and Europe." },
  { id: "commodity-lng", name: "LNG", category: "Gas", exposure: 74, unit: "mtpa", description: "Qatari and Gulf gas exports routed through the Strait and Arabian Sea." },
  { id: "commodity-petrochem", name: "Petrochemicals", category: "Industrial", exposure: 46, unit: "kt", description: "Feedstock and refined products for regional manufacturing." },
];

export const SUPPLIERS: Supplier[] = [
  { id: "supplier-saudi", name: "Saudi Aramco Gulf Export Hub", country: "Saudi Arabia", portId: "port-ras-tanura", portName: "Ras Tanura", commodityId: "commodity-crude", x: 292, y: 256, location: { lat: 26.64, lng: 50.04 }, exposure: 7100, dependency: 81, risk: "CRITICAL", status: "critical" },
  { id: "supplier-qatar", name: "QatarEnergy LNG North Field", country: "Qatar", portId: "port-ras-laffan", portName: "Ras Laffan", commodityId: "commodity-lng", x: 344, y: 240, location: { lat: 25.22, lng: 51.57 }, exposure: 6200, dependency: 88, risk: "CRITICAL", status: "critical" },
  { id: "supplier-kuwait", name: "Kuwait National Petroleum", country: "Kuwait", portId: "port-kuwait", portName: "Kuwait Port", commodityId: "commodity-crude", x: 336, y: 282, location: { lat: 29.38, lng: 47.97 }, exposure: 4100, dependency: 71, risk: "HIGH", status: "exposed" },
  { id: "supplier-uae", name: "Fujairah Alternate Export Terminal", country: "UAE", portId: "port-fujairah", portName: "Fujairah", commodityId: "commodity-petrochem", x: 424, y: 330, location: { lat: 25.13, lng: 56.34 }, exposure: 2100, dependency: 52, risk: "MEDIUM", status: "stable" },
];

export const CONSUMERS: Consumer[] = [
  { id: "consumer-india", name: "Indian Refining Cluster", country: "India", commodityId: "commodity-crude", portId: "port-mumbai", x: 700, y: 360, location: { lat: 19.08, lng: 72.88 }, demand: 7300, dependency: 84, routeIds: ["route-saudi-india", "route-qatar-india", "route-kuwait-india"] },
  { id: "consumer-japan", name: "Japanese LNG Import Hub", country: "Japan", commodityId: "commodity-lng", portId: "port-shanghai", x: 900, y: 285, location: { lat: 31.23, lng: 121.47 }, demand: 5200, dependency: 76, routeIds: ["route-qatar-japan"] },
  { id: "consumer-sg", name: "Singapore Feedstock Complex", country: "Singapore", commodityId: "commodity-petrochem", portId: "port-singapore", x: 856, y: 420, location: { lat: 1.35, lng: 103.82 }, demand: 3600, dependency: 68, routeIds: ["route-saudi-singapore"] },
  { id: "consumer-europe", name: "North Sea Refiners", country: "Europe", commodityId: "commodity-crude", portId: "port-rotterdam", x: 470, y: 102, location: { lat: 51.92, lng: 4.28 }, demand: 4600, dependency: 55, routeIds: ["route-saudi-europe"] },
];

export const ROUTES: Route[] = [
  {
    id: "route-saudi-india",
    supplierId: "supplier-saudi",
    consumerId: "consumer-india",
    commodityId: "commodity-crude",
    origin: "Saudi Arabia",
    destination: "India",
    originPort: "Ras Tanura",
    destinationPort: "Mumbai",
    originPortId: "port-ras-tanura",
    destinationPortId: "port-mumbai",
    chokepointId: "chokepoint-hormuz",
    vessel: "VLCC Al Riyadh",
    transitDays: 8.4,
    capacity: 92,
    utilization: 84,
    risk: "CRITICAL",
    status: "disrupted",
    alternativeRouteId: "route-saudi-india-alt",
    transitDelta: 3.2,
    costDeltaPct: 18,
    demandCoveredPct: 79,
    riskReasons: ["92% chokepoint dependency", "84% route utilization", "Limited alternative capacity"],
    waypoints: [
      { lat: 26.64, lng: 50.04 },
      { lat: 26.70, lng: 51.50 },
      { lat: 26.57, lng: 56.25 },
      { lat: 25.50, lng: 60.00 },
      { lat: 22.00, lng: 65.00 },
      { lat: 20.00, lng: 70.00 },
      { lat: 19.08, lng: 72.88 },
    ],
  },
  {
    id: "route-qatar-india",
    supplierId: "supplier-qatar",
    consumerId: "consumer-india",
    commodityId: "commodity-lng",
    origin: "Qatar",
    destination: "India",
    originPort: "Ras Laffan",
    destinationPort: "Dahej",
    originPortId: "port-ras-laffan",
    destinationPortId: "port-dahej",
    chokepointId: "chokepoint-hormuz",
    vessel: "QFlex Al Wakrah",
    transitDays: 8.1,
    capacity: 96,
    utilization: 88,
    risk: "CRITICAL",
    status: "disrupted",
    alternativeRouteId: "route-qatar-india-alt",
    transitDelta: 4.5,
    costDeltaPct: 23,
    demandCoveredPct: 68,
    riskReasons: ["Qatari LNG exports dependent on the Strait", "High utilization of the single route", "Tight alternative berth availability"],
    waypoints: [
      { lat: 25.22, lng: 51.57 },
      { lat: 26.00, lng: 54.00 },
      { lat: 26.57, lng: 56.25 },
      { lat: 25.50, lng: 59.00 },
      { lat: 23.00, lng: 65.00 },
      { lat: 21.77, lng: 72.18 },
    ],
  },
  {
    id: "route-kuwait-india",
    supplierId: "supplier-kuwait",
    consumerId: "consumer-india",
    commodityId: "commodity-crude",
    origin: "Kuwait",
    destination: "India",
    originPort: "Kuwait Port",
    destinationPort: "Mumbai",
    originPortId: "port-kuwait",
    destinationPortId: "port-mumbai",
    chokepointId: "chokepoint-hormuz",
    vessel: "Suezmax Noura",
    transitDays: 9.6,
    capacity: 74,
    utilization: 76,
    risk: "HIGH",
    status: "disrupted",
    alternativeRouteId: "route-kuwait-india-alt",
    transitDelta: 3.9,
    costDeltaPct: 16,
    demandCoveredPct: 57,
    riskReasons: ["Transits through the Strait", "Route concentration in the Gulf", "Reduced emergency berth capacity"],
    waypoints: [
      { lat: 29.38, lng: 47.97 },
      { lat: 28.00, lng: 49.00 },
      { lat: 27.00, lng: 52.00 },
      { lat: 26.57, lng: 56.25 },
      { lat: 24.00, lng: 62.00 },
      { lat: 20.00, lng: 70.00 },
      { lat: 19.08, lng: 72.88 },
    ],
  },
  {
    id: "route-saudi-europe",
    supplierId: "supplier-saudi",
    consumerId: "consumer-europe",
    commodityId: "commodity-crude",
    origin: "Saudi Arabia",
    destination: "Europe",
    originPort: "Ras Tanura",
    destinationPort: "Rotterdam",
    originPortId: "port-ras-tanura",
    destinationPortId: "port-rotterdam",
    chokepointId: "chokepoint-suez",
    vessel: "Very Large Crude Carrier MT Amal",
    transitDays: 21.1,
    capacity: 68,
    utilization: 63,
    risk: "MEDIUM",
    status: "normal",
    alternativeRouteId: "route-saudi-europe-alt",
    transitDelta: 1.6,
    costDeltaPct: 8,
    demandCoveredPct: 51,
    riskReasons: ["Long-haul routing via Suez", "Moderate diversion risk", "Regional supply concentration"],
    waypoints: [
      { lat: 26.64, lng: 50.04 },
      { lat: 25.50, lng: 45.00 },
      { lat: 23.00, lng: 40.00 },
      { lat: 21.54, lng: 39.17 },
      { lat: 20.00, lng: 35.00 },
      { lat: 17.00, lng: 33.00 },
      { lat: 12.63, lng: 43.32 },
      { lat: 29.97, lng: 32.55 },
      { lat: 31.29, lng: 30.20 },
      { lat: 40.00, lng: 20.00 },
      { lat: 45.00, lng: 10.00 },
      { lat: 51.92, lng: 4.28 },
    ],
  },
  {
    id: "route-qatar-japan",
    supplierId: "supplier-qatar",
    consumerId: "consumer-japan",
    commodityId: "commodity-lng",
    origin: "Qatar",
    destination: "Japan",
    originPort: "Ras Laffan",
    destinationPort: "Shanghai",
    originPortId: "port-ras-laffan",
    destinationPortId: "port-shanghai",
    chokepointId: "chokepoint-hormuz",
    vessel: "Q-Max Zephyr",
    transitDays: 16.3,
    capacity: 86,
    utilization: 79,
    risk: "HIGH",
    status: "disrupted",
    alternativeRouteId: "route-qatar-japan-alt",
    transitDelta: 5.1,
    costDeltaPct: 27,
    demandCoveredPct: 62,
    riskReasons: ["Hormuz dependence in final leg", "Long-lane LNG economics", "Potential schedule compression on return cargo"],
    waypoints: [
      { lat: 25.22, lng: 51.57 },
      { lat: 26.00, lng: 54.00 },
      { lat: 26.57, lng: 56.25 },
      { lat: 25.00, lng: 65.00 },
      { lat: 20.00, lng: 75.00 },
      { lat: 15.00, lng: 85.00 },
      { lat: 10.00, lng: 95.00 },
      { lat: 5.00, lng: 105.00 },
      { lat: 20.00, lng: 115.00 },
      { lat: 31.23, lng: 121.47 },
    ],
  },
  {
    id: "route-saudi-singapore",
    supplierId: "supplier-saudi",
    consumerId: "consumer-sg",
    commodityId: "commodity-petrochem",
    origin: "Saudi Arabia",
    destination: "Singapore",
    originPort: "Jubail",
    destinationPort: "Singapore",
    originPortId: "port-jubail",
    destinationPortId: "port-singapore",
    chokepointId: "chokepoint-hormuz",
    vessel: "MR Chemical Carrier Luma",
    transitDays: 11.8,
    capacity: 62,
    utilization: 71,
    risk: "HIGH",
    status: "disrupted",
    alternativeRouteId: "route-saudi-singapore-alt",
    transitDelta: 2.7,
    costDeltaPct: 14,
    demandCoveredPct: 59,
    riskReasons: ["High dependency on a narrow Gulf frontage", "Commodity concentration in singular export route", "Capacity squeeze during rerouting"],
    waypoints: [
      { lat: 27.01, lng: 49.65 },
      { lat: 27.00, lng: 52.00 },
      { lat: 26.57, lng: 56.25 },
      { lat: 24.00, lng: 62.00 },
      { lat: 18.00, lng: 75.00 },
      { lat: 10.00, lng: 90.00 },
      { lat: 5.00, lng: 100.00 },
      { lat: 1.35, lng: 103.82 },
    ],
  },
  {
    id: "route-saudi-india-alt",
    supplierId: "supplier-saudi",
    consumerId: "consumer-india",
    commodityId: "commodity-crude",
    origin: "Saudi Arabia",
    destination: "India",
    originPort: "Yanbu",
    destinationPort: "Mumbai",
    originPortId: "port-yanbu",
    destinationPortId: "port-mumbai",
    chokepointId: "chokepoint-bab-el-mandeb",
    vessel: "VLCC Westbound Agnes",
    transitDays: 11.6,
    capacity: 71,
    utilization: 64,
    risk: "MEDIUM",
    status: "rerouted",
    alternativeRouteId: undefined,
    transitDelta: 3.2,
    costDeltaPct: 18,
    demandCoveredPct: 61,
    riskReasons: ["Alternative route via Red Sea", "Higher transit time", "Moderate congestion risk"],
    waypoints: [
      { lat: 24.22, lng: 38.07 },
      { lat: 22.00, lng: 40.00 },
      { lat: 18.00, lng: 43.00 },
      { lat: 12.63, lng: 43.32 },
      { lat: 8.00, lng: 50.00 },
      { lat: 10.00, lng: 60.00 },
      { lat: 15.00, lng: 68.00 },
      { lat: 19.08, lng: 72.88 },
    ],
  },
  {
    id: "route-qatar-india-alt",
    supplierId: "supplier-qatar",
    consumerId: "consumer-india",
    commodityId: "commodity-lng",
    origin: "Qatar",
    destination: "India",
    originPort: "Fujairah",
    destinationPort: "Dahej",
    originPortId: "port-fujairah",
    destinationPortId: "port-dahej",
    chokepointId: "chokepoint-bab-el-mandeb",
    vessel: "LNGC East Wind",
    transitDays: 12.6,
    capacity: 64,
    utilization: 70,
    risk: "MEDIUM",
    status: "rerouted",
    transitDelta: 4.5,
    costDeltaPct: 23,
    demandCoveredPct: 54,
    riskReasons: ["Alternative rerouting via Oman", "Higher freight and insurance", "Lower berth certainty"],
    waypoints: [
      { lat: 25.13, lng: 56.34 },
      { lat: 24.00, lng: 58.00 },
      { lat: 20.00, lng: 62.00 },
      { lat: 15.00, lng: 65.00 },
      { lat: 10.00, lng: 68.00 },
      { lat: 21.77, lng: 72.18 },
    ],
  },
  {
    id: "route-saudi-europe-alt",
    supplierId: "supplier-saudi",
    consumerId: "consumer-europe",
    commodityId: "commodity-crude",
    origin: "Saudi Arabia",
    destination: "Europe",
    originPort: "Yanbu",
    destinationPort: "Rotterdam",
    originPortId: "port-yanbu",
    destinationPortId: "port-rotterdam",
    chokepointId: "chokepoint-suez",
    vessel: "Suezmax Horizon",
    transitDays: 22.7,
    capacity: 70,
    utilization: 61,
    risk: "LOW",
    status: "rerouted",
    transitDelta: 1.6,
    costDeltaPct: 8,
    demandCoveredPct: 53,
    riskReasons: ["Diversified discharge port", "Less dependence on Gulf frontage", "Stable Suez handling"],
    waypoints: [
      { lat: 24.22, lng: 38.07 },
      { lat: 22.00, lng: 36.00 },
      { lat: 20.00, lng: 34.00 },
      { lat: 17.00, lng: 33.00 },
      { lat: 29.97, lng: 32.55 },
      { lat: 31.29, lng: 30.20 },
      { lat: 40.00, lng: 20.00 },
      { lat: 45.00, lng: 10.00 },
      { lat: 51.92, lng: 4.28 },
    ],
  },
];

export const SCENARIOS: Scenario[] = [
  { id: "normal", name: "Normal Operations", disruptionActive: false, label: "Baseline trade flow", volumeShockPct: 0, delayDays: 0, routeImpact: 0, description: "Routine tanker traffic, full Gulf access, and stable route utilization." },
  { id: "partial", name: "Hormuz Partial Disruption", disruptionActive: true, label: "Ships delayed at chokepoint", volumeShockPct: 18, delayDays: 3.2, routeImpact: 41, description: "Partial closure slows transit via the Strait and raises utilization on alternative corridors." },
  { id: "full", name: "Hormuz Full Disruption", disruptionActive: true, label: "Strait closed", volumeShockPct: 35, delayDays: 7.4, routeImpact: 68, description: "The Strait is closed and cargoes shift to longer, riskier alternatives." },
  { id: "capacity", name: "Shipping Capacity Shock", disruptionActive: true, label: "Vessel tightness", volumeShockPct: 28, delayDays: 5.8, routeImpact: 56, description: "Freight capacity is constrained while demand stays elevated." },
];

export function getScenario(id: ScenarioId) {
  return SCENARIOS.find((scenario) => scenario.id === id) ?? SCENARIOS[1];
}

export function calculateRouteRisk(route: Route, scenario: Scenario): { level: RouteRisk; reasons: string[] } {
  let score = 0;

  if (route.chokepointId === "chokepoint-hormuz") score += 38;
  if (route.status === "disrupted") score += 18;
  score += Math.min(26, route.utilization * 0.25);
  score += route.alternativeRouteId ? 10 : 16;
  score += route.costDeltaPct * 0.42;
  score += scenario.disruptionActive ? scenario.routeImpact * 0.24 : 0;

  if (score >= 90) return { level: "CRITICAL", reasons: route.riskReasons };
  if (score >= 65) return { level: "HIGH", reasons: route.riskReasons };
  if (score >= 42) return { level: "MEDIUM", reasons: route.riskReasons };
  return { level: "LOW", reasons: ["No material chokepoint or capacity constraint identified."] };
}

export function getAffectedRoutes(routes: Route[], scenario: Scenario) {
  return routes.filter((route) => {
    if (route.status === "disrupted") return true;
    if (scenario.disruptionActive && route.chokepointId === "chokepoint-hormuz") return true;
    if (scenario.id === "full" && route.origin.toLowerCase().includes("saudi")) return true;
    return false;
  });
}

export function getAffectedSuppliers(routes: Route[], suppliers: Supplier[], scenario: Scenario) {
  const routeIds = new Set(getAffectedRoutes(routes, scenario).map((route) => route.supplierId));
  return suppliers.filter((supplier) => routeIds.has(supplier.id));
}

export function getAffectedConsumers(routes: Route[], consumers: Consumer[], scenario: Scenario) {
  const routeIds = new Set(getAffectedRoutes(routes, scenario).map((route) => route.consumerId));
  return consumers.filter((consumer) => routeIds.has(consumer.id));
}

export function getAffectedCommodities(routes: Route[], commodities: Commodity[], scenario: Scenario) {
  const ids = new Set(getAffectedRoutes(routes, scenario).map((route) => route.commodityId));
  return commodities.filter((commodity) => ids.has(commodity.id));
}

export function calculateExposure(routes: Route[], scenario: Scenario) {
  const affected = getAffectedRoutes(routes, scenario);
  const totalVolume = affected.reduce((sum, route) => sum + route.capacity * 110, 0);
  const economicExposureUsd = affected.reduce((sum, route) => sum + route.costDeltaPct * 1500000, 0);
  const additionalTransitDays = affected.reduce((sum, route) => sum + route.transitDelta, 0) / Math.max(1, affected.length);

  return {
    totalVolume,
    economicExposureUsd,
    additionalTransitDays,
    riskIndex: Math.min(100, Math.round((affected.length / routes.length) * 100 + scenario.volumeShockPct)),
  };
}

export function getAlternativeRoutes(routeId: string, routes: Route[]) {
  const selected = routes.find((route) => route.id === routeId);
  if (!selected || !selected.alternativeRouteId) return [];
  return routes.filter((route) => route.id === selected.alternativeRouteId);
}

export const SHIPMENTS = [
  { id: "SH-2291", cargo: "Crude oil", volumeKbbl: 950, origin: "Ras Tanura, SA", destination: "Rotterdam, NL", contractedRoute: "Strait of Hormuz", status: "at risk", etaDaysDelta: 0, assignedRoute: "Route to Europe" },
  { id: "SH-2288", cargo: "LNG", volumeKbbl: 610, origin: "Ras Laffan, QA", destination: "Dahej, IN", contractedRoute: "Strait of Hormuz", status: "rerouted", etaDaysDelta: 9, assignedRoute: "Qatar → India alt" },
  { id: "SH-2276", cargo: "Petrochemicals", volumeKbbl: 210, origin: "Jubail, SA", destination: "Singapore, SG", contractedRoute: "Strait of Hormuz", status: "in transit", etaDaysDelta: 4, assignedRoute: "Saudi → Singapore alt" },
  { id: "SH-2301", cargo: "Crude oil", volumeKbbl: 1100, origin: "Kuwait Port, KW", destination: "Mumbai, IN", contractedRoute: "Strait of Hormuz", status: "at risk", etaDaysDelta: 0, assignedRoute: null },
  { id: "SH-2255", cargo: "Naphtha", volumeKbbl: 340, origin: "Fujairah, AE", destination: "Busan, KR", contractedRoute: "Oman route", status: "delivered", etaDaysDelta: 12, assignedRoute: "Route via Oman" },
] as const;

export const KPIS = {
  straitCapacityPct: 12,
  daysDisrupted: 14,
  shipmentsAtRisk: 11,
  shipmentsRerouted: 7,
  volumeExposedKbbl: 18500,
  volumeHedgedPct: 58,
  avgCostDeltaPct: 19,
};

export type HedgePosition = {
  id: string;
  instrument: string;
  underlying: string;
  notionalKbbl: number;
  strategy: string;
  strike: number;
  expiry: string;
  status: "active" | "proposed" | "expired";
  rationale: string;
};

export const HEDGES: HedgePosition[] = [
  {
    id: "HP-101",
    instrument: "Brent Crude Call Option",
    underlying: "ICE Brent",
    notionalKbbl: 950,
    strategy: "Price ceiling for Saudi exposure",
    strike: 92,
    expiry: "2026-09-15",
    status: "active",
    rationale: "Funds the added cost of rerouting Saudi crude and caps the downside should the market tighten while transit time climbs.",
  },
  {
    id: "HP-102",
    instrument: "VLCC Freight Swap",
    underlying: "Baltic TD3C",
    notionalKbbl: 1100,
    strategy: "Freight lock for longer baseline routes",
    strike: 46000,
    expiry: "2026-09-30",
    status: "proposed",
    rationale: "Covers the elevated charter cost as traffic is pushed away from the Strait and around Africa or via the Red Sea.",
  },
  {
    id: "HP-103",
    instrument: "LNG War-Risk Collar",
    underlying: "Qatari LNG premium index",
    notionalKbbl: 610,
    strategy: "Premium cap for LNG supply continuity",
    strike: 0.9,
    expiry: "2026-08-31",
    status: "active",
    rationale: "This limits insurance premium exposure while alternative LNG routes are negotiated and freight remains elevated.",
  },
];
