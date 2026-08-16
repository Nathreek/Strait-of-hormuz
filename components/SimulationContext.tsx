"use client";

import { createContext, useContext, useMemo, useState } from "react";
import {
  ROUTES,
  SCENARIOS,
  SUPPLIERS,
  CONSUMERS,
  COMMODITIES,
  getAffectedRoutes,
  getAffectedSuppliers,
  getAffectedConsumers,
  getAffectedCommodities,
  calculateExposure,
  getScenario,
  type ScenarioId,
  type RouteRisk,
} from "@/lib/data";

export type SimulationContextValue = {
  scenario: (typeof SCENARIOS)[number];
  setScenarioId: (id: ScenarioId) => void;
  announcement: string;
  selectedSupplierId: string | null;
  setSelectedSupplierId: (id: string | null) => void;
  selectedConsumerId: string | null;
  setSelectedConsumerId: (id: string | null) => void;
  selectedRouteId: string | null;
  setSelectedRouteId: (id: string | null) => void;
  selectedCommodityId: string | null;
  setSelectedCommodityId: (id: string | null) => void;
  selectedChokepointId: string | null;
  setSelectedChokepointId: (id: string | null) => void;
  disruptionActive: boolean;
  toggleDisruption: () => void;
  activeRoutes: typeof ROUTES;
  affectedRoutes: typeof ROUTES;
  affectedSuppliers: typeof SUPPLIERS;
  affectedConsumers: typeof CONSUMERS;
  affectedCommodities: typeof COMMODITIES;
  kpis: ReturnType<typeof calculateExposure> & {
    routesAtRisk: number;
    exposedSuppliers: number;
    exposedConsumers: number;
    commoditiesAffected: number;
  };
  riskFilter: RouteRisk | "ALL";
  setRiskFilter: (risk: RouteRisk | "ALL") => void;
  showDisruptedOnly: boolean;
  setShowDisruptedOnly: (value: boolean) => void;
  routeVisibility: boolean;
  setRouteVisibility: (value: boolean) => void;
};

const SimulationContext = createContext<SimulationContextValue | null>(null);

export function SimulationProvider({ children }: { children: React.ReactNode }) {
  const [scenarioId, setScenarioIdState] = useState<ScenarioId>("partial");
  const [selectedSupplierId, setSelectedSupplierId] = useState<string | null>("supplier-qatar");
  const [selectedConsumerId, setSelectedConsumerId] = useState<string | null>("consumer-india");
  const [selectedRouteId, setSelectedRouteId] = useState<string | null>("route-qatar-india");
  const [selectedCommodityId, setSelectedCommodityId] = useState<string | null>("commodity-lng");
  const [selectedChokepointId, setSelectedChokepointId] = useState<string | null>("chokepoint-hormuz");
  const [riskFilter, setRiskFilter] = useState<RouteRisk | "ALL">("ALL");
  const [showDisruptedOnly, setShowDisruptedOnly] = useState(false);
  const [routeVisibility, setRouteVisibility] = useState(true);

  const scenario = getScenario(scenarioId);
  const activeRoutes = ROUTES.filter((route) => {
    if (!routeVisibility) return false;
    if (showDisruptedOnly && route.status === "normal") return false;
    if (riskFilter !== "ALL" && route.risk !== riskFilter) return false;
    if (selectedCommodityId && route.commodityId !== selectedCommodityId) return false;
    return true;
  });

  const affectedRoutes = getAffectedRoutes(ROUTES, scenario);
  const affectedSuppliers = getAffectedSuppliers(ROUTES, SUPPLIERS, scenario);
  const affectedConsumers = getAffectedConsumers(ROUTES, CONSUMERS, scenario);
  const affectedCommodities = getAffectedCommodities(ROUTES, COMMODITIES, scenario);

  const kpis = useMemo(() => {
    const exposure = calculateExposure(ROUTES, scenario);
    return {
      ...exposure,
      routesAtRisk: affectedRoutes.length,
      exposedSuppliers: affectedSuppliers.length,
      exposedConsumers: affectedConsumers.length,
      commoditiesAffected: affectedCommodities.length,
    };
  }, [affectedCommodities.length, affectedConsumers.length, affectedRoutes.length, affectedSuppliers.length, scenario]);

  const announcement = useMemo(() => {
    if (scenario.disruptionActive) {
      return `${scenario.name}: major maritime disruption is active and key Gulf-linked routes are being reassessed.`;
    }
    return `${scenario.name}: baseline operations remain stable with limited route exposure.`;
  }, [scenario]);

  const setScenarioId = (id: ScenarioId) => {
    setScenarioIdState(id);
    const nextScenario = getScenario(id);
    if (nextScenario.disruptionActive) {
      setSelectedChokepointId("chokepoint-hormuz");
      setSelectedSupplierId("supplier-qatar");
      setSelectedConsumerId("consumer-india");
      setSelectedRouteId("route-qatar-india");
    }
  };

  const toggleDisruption = () => {
    const nextScenarioId = scenario.disruptionActive ? "normal" : "partial";
    setScenarioIdState(nextScenarioId);
    setSelectedChokepointId("chokepoint-hormuz");
  };

  const value = {
    scenario,
    setScenarioId,
    announcement,
    selectedSupplierId,
    setSelectedSupplierId,
    selectedConsumerId,
    setSelectedConsumerId,
    selectedRouteId,
    setSelectedRouteId,
    selectedCommodityId,
    setSelectedCommodityId,
    selectedChokepointId,
    setSelectedChokepointId,
    disruptionActive: scenario.disruptionActive,
    toggleDisruption,
    activeRoutes,
    affectedRoutes,
    affectedSuppliers,
    affectedConsumers,
    affectedCommodities,
    kpis,
    riskFilter,
    setRiskFilter,
    showDisruptedOnly,
    setShowDisruptedOnly,
    routeVisibility,
    setRouteVisibility,
  } satisfies SimulationContextValue;

  return <SimulationContext.Provider value={value}>{children}</SimulationContext.Provider>;
}

export function useSimulation() {
  const context = useContext(SimulationContext);
  if (!context) throw new Error("useSimulation must be used within SimulationProvider");
  return context;
}
