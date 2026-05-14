import { Check } from "lucide-react";
import type { AgentsQuantity, FormState } from "@/types/lead";

type ModuleKey = keyof FormState["toggles"];
type AgentKind = "atendimento" | "vendas" | "suporte";

interface ModuleDef {
  key: ModuleKey;
  name: string;
  tip: string;
  agents: AgentKind[];
}

const MODULES: ModuleDef[] = [
  { key: "faq_ai", name: "FAQ Inteligente", tip: "Respostas automáticas a perguntas frequentes", agents: ["atendimento", "vendas", "suporte"] },
  { key: "whatsapp_group_notifications", name: "Resumo em Grupo WhatsApp", tip: "Síntese diária de atendimentos em grupos", agents: ["atendimento", "vendas", "suporte"] },
  { key: "followup", name: "Follow Up", tip: "Acompanhamento automático de leads e clientes após contato", agents: ["atendimento", "vendas", "suporte"] },
  { key: "auto_scheduling", name: "Agendamento Automático", tip: "Marcação de reuniões e serviços sem intervenção humana", agents: ["atendimento", "vendas", "suporte"] },
  { key: "automatic_reminders", name: "Lembretes Automáticos", tip: "Notificações proativas de compromissos e prazos", agents: ["vendas", "suporte"] },
  { key: "technical_ai", name: "Base Técnica Avançada", tip: "Documentação e respostas técnicas detalhadas", agents: ["vendas", "suporte"] },
  { key: "media_sending", name: "Envio de Mídia", tip: "Compartilhamento de imagens, documentos e vídeos", agents: ["vendas", "suporte"] },
  { key: "bulk_messaging", name: "Disparo em Massa", tip: "Envio de mensagens para listas segmentadas", agents: ["vendas"] },
];

const AGENTS_BY_QTY: Record<AgentsQuantity, AgentKind[]> = {
  "1_agente": ["atendimento"],
  "2_agentes": ["atendimento", "vendas"],
  "3_agentes": ["atendimento", "vendas", "suporte"],
};

interface Props {
  agentsQuantity: AgentsQuantity;
  toggles: FormState["toggles"];
  onToggle: (key: ModuleKey, value: boolean) => void;
}

export function Step3Modules({ agentsQuantity, toggles, onToggle }: Props) {
  const selectedAgents = AGENTS_BY_QTY[agentsQuantity];
  const visible = MODULES.filter((m) => m.agents.some((a) => selectedAgents.includes(a)));

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
        {visible.map((m) => {
          const active = toggles[m.key];
          return (
            <button
              key={m.key}
              type="button"
              onClick={() => onToggle(m.key, !active)}
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
              <p className="text-xs text-muted-foreground leading-relaxed">{m.tip}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
}