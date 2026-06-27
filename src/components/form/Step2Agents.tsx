import { Check } from "lucide-react";
import type { LandingCatalog } from "@/types/lead";
import {
  brl,
  includedModulesForAgent,
  includedModulesForAgents,
  includedModulesTotal,
  selectedAgentsTotal,
} from "@/lib/pricing";

interface Props {
  selectedAgentCodes: string[];
  catalog: LandingCatalog;
  onToggle: (agentCode: string, selected: boolean) => void;
  error?: string;
}

export function Step2Agents({ selectedAgentCodes, catalog, onToggle, error }: Props) {
  const selected = new Set(selectedAgentCodes);
  const agentTotal = selectedAgentsTotal(selectedAgentCodes, catalog);
  const modules = includedModulesForAgents(selectedAgentCodes, catalog);
  const modulesTotal = includedModulesTotal(selectedAgentCodes, catalog);
  const grandTotal = agentTotal + modulesTotal;

  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-display text-2xl md:text-3xl font-light text-foreground mb-2">
          Quais agentes sua operação precisa?
        </h3>
        <p className="text-sm text-muted-foreground">
          Selecione os especialistas. Os módulos inclusos em cada agente já entram automaticamente.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-3 lg:grid-cols-3">
        {catalog.agents.length === 0 && (
          <div className="rounded-xl border border-white/10 bg-white/[0.02] p-5 text-sm text-muted-foreground lg:col-span-3">
            Nenhum agente ativo no CRM para exibir no formulario.
          </div>
        )}
        {catalog.agents.map((agent, index) => {
          const isSelected = selected.has(agent.code);
          const includedModules = includedModulesForAgent(agent.code, catalog);
          const previousModuleCodes = new Set(
            catalog.agents
              .slice(0, index)
              .flatMap((previousAgent) =>
                includedModulesForAgent(previousAgent.code, catalog).map((module) => module.code),
              ),
          );
          const visibleModules = includedModules.filter(
            (module) => !previousModuleCodes.has(module.code),
          );
          const includedTotal = includedModules.reduce((sum, module) => sum + module.price, 0);
          const price = agent.price + includedTotal;
          const agentName =
            agent.code === "support_agent"
              ? "Agente de Vendas com Suporte Automatizado"
              : agent.name;

          return (
            <button
              key={agent.code}
              type="button"
              onClick={() => onToggle(agent.code, !isSelected)}
              className={`flex h-full w-full flex-col items-stretch rounded-xl border p-5 text-left align-top transition-all ${
                isSelected
                  ? "border-primary bg-primary/5 shadow-[0_0_30px_-10px_hsl(217_91%_60%/0.5)]"
                  : "border-white/10 bg-white/[0.02] hover:border-white/20"
              }`}
            >
              <span className="flex h-full flex-col items-stretch gap-4">
                <span className="flex items-start justify-between gap-4">
                  <span
                    className={`font-display text-3xl font-light tabular-nums ${
                      isSelected ? "text-primary" : "text-muted-foreground"
                    }`}
                  >
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span
                    className={`flex size-5 shrink-0 items-center justify-center rounded-full ${
                      isSelected ? "bg-primary" : "border border-white/20"
                    }`}
                  >
                    {isSelected && (
                      <Check className="size-3 text-primary-foreground" strokeWidth={3} />
                    )}
                  </span>
                </span>

                <span>
                  <span className="block font-medium text-foreground">{agentName}</span>
                  {agent.description ? (
                    <span className="mt-1 block text-xs text-muted-foreground">
                      {agent.description}
                    </span>
                  ) : null}
                </span>

                <span>
                  <span className="text-[10px] font-medium uppercase tracking-widest text-muted-foreground">
                    {index === 0 ? "Módulos inclusos" : "Novos módulos inclusos"}
                  </span>
                  <span className="mt-2 flex flex-col gap-2">
                    {visibleModules.length === 0 ? (
                      <span className="rounded-md border border-white/10 px-2 py-1 text-xs text-muted-foreground">
                        Módulos em definição
                      </span>
                    ) : (
                      visibleModules.map((module) => (
                        <span
                          key={module.code}
                          className="rounded-md border border-white/10 bg-white/[0.03] px-3 py-2 text-xs text-muted-foreground"
                        >
                          <span className="block font-medium text-foreground">{module.name}</span>
                          {module.description ? (
                            <span className="mt-1 block leading-relaxed">{module.description}</span>
                          ) : null}
                        </span>
                      ))
                    )}
                  </span>
                </span>

                <span className="border-t border-white/10 pt-4">
                  <span className="block text-xs text-muted-foreground">
                    Agente + módulos inclusos
                  </span>
                  <span
                    className={`mt-1 block font-mono text-sm ${
                      isSelected ? "text-primary" : "text-foreground"
                    }`}
                  >
                    {brl(price)}
                    <span className="text-muted-foreground">/mês</span>
                  </span>
                </span>
              </span>
            </button>
          );
        })}
      </div>
      {error && <p className="text-xs text-primary">{error}</p>}
      <div className="flex items-center justify-between rounded-xl border border-primary/30 bg-primary/5 p-4">
        <div>
          <div className="text-[10px] uppercase tracking-widest text-muted-foreground">
            Investimento estimado
          </div>
          <div className="mt-0.5 text-xs text-muted-foreground">
            Agentes {brl(agentTotal)} + módulos inclusos {brl(modulesTotal)}
          </div>
          {modules.length > 0 ? (
            <div className="mt-1 text-xs text-muted-foreground">
              {modules.length} módulos inclusos na configuração
            </div>
          ) : null}
        </div>
        <div className="font-display text-2xl font-medium text-primary">
          {brl(grandTotal)}
          <span className="text-xs font-normal text-muted-foreground">/mês</span>
        </div>
      </div>
    </div>
  );
}
