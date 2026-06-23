import { Check } from "lucide-react";
import type { AgentsQuantity, FormState, LandingCatalog } from "@/types/lead";
import { agentModulesFor, agentsTotal, brl } from "@/lib/pricing";

type ModuleKey = keyof FormState["toggles"];

interface Props {
  agentsQuantity: AgentsQuantity;
  catalog: LandingCatalog;
  toggles: FormState["toggles"];
  onToggle: (key: ModuleKey, value: boolean) => void;
}

export function Step3Modules({ agentsQuantity, catalog, toggles, onToggle }: Props) {
  const selectedAgentCodes = agentModulesFor(agentsQuantity, catalog).map((product) => product.code);
  const visible = catalog.modules.filter(
    (module) =>
      module.requiredAgents.length === 0 ||
      module.requiredAgents.some((agentCode) => selectedAgentCodes.includes(agentCode)),
  );
  const featuresTotal = visible
    .filter((m) => toggles[m.code])
    .reduce((sum, m) => sum + m.price, 0);
  const agentTotal = agentsTotal(agentsQuantity, catalog);
  const grandTotal = agentTotal + featuresTotal;

  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-display text-2xl md:text-3xl font-light text-foreground mb-2">
          Escolha os módulos da sua automação
        </h3>
        <p className="text-sm text-muted-foreground">
          Ative apenas o que faz sentido para sua operação. Você pode ajustar depois.
        </p>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {visible.length === 0 && (
          <div className="rounded-xl border border-white/10 bg-white/[0.02] p-4 text-sm text-muted-foreground sm:col-span-2">
            Nenhum modulo ativo no CRM para os agentes selecionados.
          </div>
        )}
        {visible.map((m) => {
          const active = toggles[m.code];
          const price = m.price;
          return (
            <button
              key={m.code}
              type="button"
              onClick={() => onToggle(m.code, !active)}
              className={`text-left p-4 rounded-xl border transition-all ${
                active
                  ? "border-primary bg-primary/5 shadow-[0_0_25px_-10px_hsl(217_91%_60%/0.5)]"
                  : "border-white/10 bg-white/[0.02] hover:border-white/20"
              }`}
            >
              <div className="flex items-start justify-between gap-3 mb-2">
                <span className="font-medium text-sm text-foreground">{m.name}</span>
                <span
                  className={`size-5 rounded-md flex items-center justify-center shrink-0 mt-0.5 ${
                    active ? "bg-primary" : "border border-white/20"
                  }`}
                >
                  {active && <Check className="size-3 text-primary-foreground" strokeWidth={3} />}
                </span>
              </div>
              <p className="text-xs text-muted-foreground leading-relaxed">{m.description}</p>
              <p className={`mt-3 font-mono text-xs ${active ? "text-primary" : "text-muted-foreground"}`}>
                {brl(price)}<span className="text-muted-foreground">/mês</span>
              </p>
            </button>
          );
        })}
      </div>
      <div className="flex items-center justify-between p-4 rounded-xl border border-primary/30 bg-primary/5">
        <div>
          <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Investimento estimado</div>
          <div className="text-xs text-muted-foreground mt-0.5">
            Agentes {brl(agentTotal)} + Módulos {brl(featuresTotal)}
          </div>
        </div>
        <div className="font-display text-2xl font-medium text-primary">
          {brl(grandTotal)}<span className="text-xs text-muted-foreground font-normal">/mês</span>
        </div>
      </div>
    </div>
  );
}
