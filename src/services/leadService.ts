import { supabase } from "@/integrations/supabase/client";
import type { FormState, LandingCatalog, ModuleCode, SubmitResult } from "@/types/lead";
import { includedModulesForAgents, quantityForAgentCount, selectedAgentsFor } from "@/lib/pricing";

export async function fetchLandingCatalog(): Promise<LandingCatalog> {
  const { data, error } = await supabase.rpc("get_landing_infrastructure_products");
  if (error) throw new Error(error.message);

  const products = (Array.isArray(data) ? data : []) as Array<{
    id: string;
    code: string;
    name: string;
    description: string | null;
    price: number | string;
    category: "agent" | "module";
    requiredAgents?: string[];
    position?: number;
  }>;

  const normalized = products.map((product) => ({
    id: product.id,
    code: product.code,
    name: product.name,
    description: product.description,
    price: Number(product.price),
    category: product.category,
    requiredAgents: product.requiredAgents ?? [],
    position: product.position ?? 0,
  }));

  return {
    agents: normalized.filter((product) => product.category === "agent"),
    modules: normalized.filter((product) => product.category === "module"),
  };
}

export async function submitLead(state: FormState, catalog: LandingCatalog): Promise<SubmitResult> {
  const selectedAgents = selectedAgentsFor(state.selected_agent_codes, catalog);
  const agentsQuantity = quantityForAgentCount(selectedAgents.length);

  if (!agentsQuantity) throw new Error("Selecione de 1 a 3 agentes");

  const allCodes: ModuleCode[] = [
    ...selectedAgents.map((product) => product.code),
    ...includedModulesForAgents(state.selected_agent_codes, catalog).map((product) => product.code),
  ];

  const { data, error } = await supabase.rpc("submit_landing_infrastructure_lead", {
    _client: state.client,
    _agents_quantity: agentsQuantity,
    _module_codes: allCodes,
    _observations: state.observations ?? "",
  });
  if (error) throw new Error(error.message);
  if (!data) throw new Error("Resposta vazia ao enviar orçamento");

  const result = data as {
    quoteId: string;
    leadId: string;
    companyId: string;
    contactId: string;
    activityId: string;
    modules: { code: ModuleCode; name: string; price: number | string }[];
    total: number | string;
  };

  return {
    quoteId: result.quoteId,
    leadId: result.leadId,
    companyId: result.companyId,
    contactId: result.contactId,
    activityId: result.activityId,
    modules: result.modules.map((m) => ({
      code: m.code,
      name: m.name,
      price: Number(m.price),
    })),
    total: Number(result.total),
  };
}
