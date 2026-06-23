import { Check } from "lucide-react";
import type { AgentsQuantity, LandingCatalog } from "@/types/lead";
import { agentsTotal, brl } from "@/lib/pricing";

interface Props {
  value: AgentsQuantity | null;
  catalog: LandingCatalog;
  onChange: (v: AgentsQuantity) => void;
  error?: string;
}

const quantities: AgentsQuantity[] = ["1_agente", "2_agentes", "3_agentes"];

export function Step2Agents({ value, catalog, onChange, error }: Props) {
  const options = quantities
    .filter((qty, index) => catalog.agents.length >= index + 1)
    .map((qty, index) => {
      const agents = catalog.agents.slice(0, index + 1);
      return {
        value: qty,
        count: String(index + 1).padStart(2, "0"),
        label: agents.map((agent) => agent.name.replace(/^Agente de\s+/i, "")).join(" + "),
        desc: agents.map((agent) => agent.description).filter(Boolean).join(" | "),
      };
    });

  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-display text-2xl md:text-3xl font-light text-foreground mb-2">
          Quantos agentes no coração da sua automação?
        </h3>
        <p className="text-sm text-muted-foreground">
          Cada agente é um especialista treinado para uma função.
        </p>
      </div>
      <div className="space-y-3">
        {options.length === 0 && (
          <div className="rounded-xl border border-white/10 bg-white/[0.02] p-5 text-sm text-muted-foreground">
            Nenhum agente ativo no CRM para exibir no formulario.
          </div>
        )}
        {options.map((opt) => {
          const selected = value === opt.value;
          const price = agentsTotal(opt.value, catalog);
          return (
            <button
              key={opt.value}
              type="button"
              onClick={() => onChange(opt.value)}
              className={`w-full p-5 rounded-xl border text-left transition-all flex items-center gap-5 ${
                selected
                  ? "border-primary bg-primary/5 shadow-[0_0_30px_-10px_hsl(217_91%_60%/0.5)]"
                  : "border-white/10 bg-white/[0.02] hover:border-white/20"
              }`}
            >
              <span
                className={`font-display text-3xl font-light tabular-nums ${
                  selected ? "text-primary" : "text-muted-foreground"
                }`}
              >
                {opt.count}
              </span>
              <span className="flex-1 min-w-0">
                <span className="block font-medium text-foreground">{opt.label}</span>
                <span className="block text-xs text-muted-foreground mt-0.5">{opt.desc}</span>
              </span>
              <span className="hidden sm:flex flex-col items-end shrink-0">
                <span className={`font-mono text-sm ${selected ? "text-primary" : "text-foreground"}`}>
                  {brl(price)}
                </span>
                <span className="text-[10px] uppercase tracking-widest text-muted-foreground">/mês</span>
              </span>
              <span
                className={`size-5 rounded-full flex items-center justify-center shrink-0 ${
                  selected ? "bg-primary" : "border border-white/20"
                }`}
              >
                {selected && <Check className="size-3 text-primary-foreground" strokeWidth={3} />}
              </span>
            </button>
          );
        })}
      </div>
      {error && <p className="text-xs text-primary">{error}</p>}
    </div>
  );
}
