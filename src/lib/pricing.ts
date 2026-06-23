import type { AgentsQuantity, LandingCatalog, LandingProduct } from "@/types/lead";

export function agentCountFor(qty: AgentsQuantity): number {
  if (qty === "1_agente") return 1;
  if (qty === "2_agentes") return 2;
  return 3;
}

export function agentModulesFor(qty: AgentsQuantity, catalog: LandingCatalog): LandingProduct[] {
  return catalog.agents.slice(0, agentCountFor(qty));
}

export function agentsTotal(qty: AgentsQuantity, catalog: LandingCatalog): number {
  return agentModulesFor(qty, catalog).reduce((sum, product) => sum + product.price, 0);
}

export function brl(v: number): string {
  return v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}
