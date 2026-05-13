import { supabase } from "@/integrations/supabase/client";
import type {
  AgentsQuantity,
  ClientData,
  FormState,
  ModuleCode,
  SubmitResult,
} from "@/types/lead";

function agentModulesFor(qty: AgentsQuantity): ModuleCode[] {
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

  // 1. Insert client
  const { data: client, error: cErr } = await supabase
    .from("clients")
    .insert(state.client satisfies ClientData)
    .select("id")
    .single();
  if (cErr || !client) throw new Error(cErr?.message ?? "Erro ao criar cliente");

  // 2. Insert quote (rascunho)
  const { data: quote, error: qErr } = await supabase
    .from("quotes")
    .insert({
      client_id: client.id,
      agents_quantity: state.agents_quantity,
      status: "rascunho",
    })
    .select("id")
    .single();
  if (qErr || !quote) throw new Error(qErr?.message ?? "Erro ao criar orçamento");

  // 3. Lookup module ids/prices
  const allCodes: ModuleCode[] = [
    ...agentModulesFor(state.agents_quantity),
    ...selectedFeatureModules(state.toggles),
  ];

  const { data: modules, error: mErr } = await supabase
    .from("automation_modules")
    .select("id, code, name, base_price")
    .in("code", allCodes);
  if (mErr || !modules) throw new Error(mErr?.message ?? "Erro ao buscar módulos");

  // 4. Insert quote_modules batch
  const rows = modules.map((m) => ({
    quote_id: quote.id,
    module_id: m.id,
    module_price: Number(m.base_price),
  }));
  const { error: qmErr } = await supabase.from("quote_modules").insert(rows);
  if (qmErr) throw new Error(qmErr.message);

  // 5. Total + update quote
  const total = rows.reduce((sum, r) => sum + r.module_price, 0);
  const { error: upErr } = await supabase
    .from("quotes")
    .update({ subtotal: total, total_price: total })
    .eq("id", quote.id);
  if (upErr) throw new Error(upErr.message);

  // 6. Sales pipeline
  const { error: spErr } = await supabase
    .from("sales_pipeline")
    .insert({ client_id: client.id, current_stage: "novo_lead" });
  if (spErr) throw new Error(spErr.message);

  return {
    quoteId: quote.id,
    modules: modules.map((m) => ({
      code: m.code as ModuleCode,
      name: m.name,
      price: Number(m.base_price),
    })),
    total,
  };
}