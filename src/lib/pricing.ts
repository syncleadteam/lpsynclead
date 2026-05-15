import type { AgentsQuantity, ModuleCode } from "@/types/lead";

export const MODULE_PRICES: Record<ModuleCode, number> = {
  attendance_agent: 497,
  sales_agent: 597,
  support_agent: 497,
  faq_ai: 197,
  technical_ai: 297,
  auto_scheduling: 247,
  automatic_reminders: 147,
  whatsapp_group_notifications: 197,
  media_sending: 197,
  bulk_messaging: 297,
  followup: 197,
};

export const AGENT_MODULES_BY_QTY: Record<AgentsQuantity, ModuleCode[]> = {
  "1_agente": ["attendance_agent"],
  "2_agentes": ["attendance_agent", "sales_agent"],
  "3_agentes": ["attendance_agent", "sales_agent", "support_agent"],
};

export function agentsTotal(qty: AgentsQuantity): number {
  return AGENT_MODULES_BY_QTY[qty].reduce((sum, c) => sum + MODULE_PRICES[c], 0);
}

export function brl(v: number): string {
  return v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}
