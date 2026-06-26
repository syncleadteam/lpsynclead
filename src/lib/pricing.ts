import type { AgentsQuantity, LandingCatalog, LandingProduct } from "@/types/lead";

const includedModuleCodesByAgent: Record<string, string[]> = {
  attendance_agent: ["faq_ai", "auto_scheduling", "whatsapp_group_notifications"],
  sales_agent: [
    "faq_ai",
    "auto_scheduling",
    "whatsapp_group_notifications",
    "technical_ai",
    "automatic_reminders",
    "media_sending",
    "bulk_messaging",
  ],
  support_agent: [
    "faq_ai",
    "auto_scheduling",
    "whatsapp_group_notifications",
    "technical_ai",
    "automatic_reminders",
    "media_sending",
    "bulk_messaging",
  ],
};

export function agentCountFor(qty: AgentsQuantity): number {
  if (qty === "1_agente") return 1;
  if (qty === "2_agentes") return 2;
  return 3;
}

export function quantityForAgentCount(count: number): AgentsQuantity | null {
  if (count === 1) return "1_agente";
  if (count === 2) return "2_agentes";
  if (count === 3) return "3_agentes";
  return null;
}

export function agentModulesFor(qty: AgentsQuantity, catalog: LandingCatalog): LandingProduct[] {
  return catalog.agents.slice(0, agentCountFor(qty));
}

export function includedModulesForAgent(
  agentCode: string,
  catalog: LandingCatalog,
): LandingProduct[] {
  const includedCodes = includedModuleCodesByAgent[agentCode] ?? [];
  return includedCodes
    .map((code) => catalog.modules.find((module) => module.code === code))
    .filter((module): module is LandingProduct => Boolean(module));
}

export function includedModulesForAgents(
  agentCodes: string[],
  catalog: LandingCatalog,
): LandingProduct[] {
  const byCode = new Map<string, LandingProduct>();

  for (const agentCode of agentCodes) {
    for (const module of includedModulesForAgent(agentCode, catalog)) {
      byCode.set(module.code, module);
    }
  }

  return [...byCode.values()].sort((a, b) => a.position - b.position);
}

export function selectedAgentsFor(agentCodes: string[], catalog: LandingCatalog): LandingProduct[] {
  const selected = new Set(agentCodes);
  return catalog.agents.filter((agent) => selected.has(agent.code));
}

export function agentsTotal(qty: AgentsQuantity, catalog: LandingCatalog): number {
  return agentModulesFor(qty, catalog).reduce((sum, product) => sum + product.price, 0);
}

export function selectedAgentsTotal(agentCodes: string[], catalog: LandingCatalog): number {
  return selectedAgentsFor(agentCodes, catalog).reduce((sum, product) => sum + product.price, 0);
}

export function includedModulesTotal(agentCodes: string[], catalog: LandingCatalog): number {
  return includedModulesForAgents(agentCodes, catalog).reduce(
    (sum, product) => sum + product.price,
    0,
  );
}

export function brl(v: number): string {
  return v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}
