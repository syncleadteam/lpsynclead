import { supabase } from "@/integrations/supabase/client";
import type {
  FormState,
  ModuleCode,
  SubmitResult,
} from "@/types/lead";

function agentModulesFor(qty: NonNullable<FormState["agents_quantity"]>): ModuleCode[] {
  if (qty === "1_agente") return ["attendance_agent"];
  if (qty === "2_agentes") return ["attendance_agent", "sales_agent"];
  return ["attendance_agent", "sales_agent", "support_agent"];
}

function selectedFeatureModules(toggles: FormState["toggles"]): ModuleCode[] {
  return (Object.entries(toggles) as [ModuleCode, boolean][])
    .filter(([, v]) => v)
    .map(([k]) => k);
}

export async function submitLead(state: FormState): Promise<SubmitResult> {
  if (!state.agents_quantity) throw new Error("Quantidade de agentes obrigatória");

  const allCodes: ModuleCode[] = [
    ...agentModulesFor(state.agents_quantity),
    ...selectedFeatureModules(state.toggles),
  ];

  const { data, error } = await supabase.rpc("submit_landing_infrastructure_lead", {
    _client: state.client,
    _agents_quantity: state.agents_quantity,
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
