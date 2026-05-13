import { AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useLeadForm, TOTAL_STEPS } from "@/hooks/useLeadForm";
import { StepShell } from "./StepShell";
import { Step1Client } from "./Step1Client";
import { Step2Agents } from "./Step2Agents";
import { ToggleQuestion } from "./ToggleQuestion";
import { SuccessScreen } from "./SuccessScreen";

const stepperGroups = [
  { label: "Perfil & Escopo", steps: [1] },
  { label: "Agentes & Módulos", steps: [2, 3, 4, 5, 6, 7, 8, 9] },
  { label: "Resumo & Ativação", steps: [] },
];

export function LeadForm() {
  const f = useLeadForm();

  const activeGroup = f.result
    ? 2
    : stepperGroups.findIndex((g) => g.steps.includes(f.step));

  async function handleNext() {
    if (f.step < TOTAL_STEPS) {
      f.next();
      return;
    }
    try {
      await f.submit();
    } catch (e) {
      toast.error(e instanceof Error ? e.message : "Erro ao enviar");
    }
  }

  return (
    <div id="formulario" className="bg-zinc-900/50 border border-white/5 rounded-3xl p-1 overflow-hidden shadow-2xl">
      <div className="grid grid-cols-1 md:grid-cols-12">
        {/* Sidebar */}
        <aside className="md:col-span-4 p-8 md:p-10 bg-zinc-900/80 border-b md:border-b-0 md:border-r border-white/5">
          <div className="space-y-8">
            <div>
              <div className="size-10 rounded-xl bg-primary/20 flex items-center justify-center mb-6">
                <div className="size-2 rounded-full bg-primary animate-pulse" />
              </div>
              <h2 className="font-display text-2xl font-medium mb-2 text-foreground">
                Configurador
              </h2>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Personalize sua infraestrutura de atendimento sob medida.
              </p>
            </div>

            <div className="space-y-4">
              {stepperGroups.map((g, i) => {
                const isActive = i === activeGroup;
                const isDone = i < activeGroup;
                return (
                  <div
                    key={g.label}
                    className={`flex items-center gap-4 transition-colors ${
                      isActive ? "text-primary" : isDone ? "text-foreground" : "text-muted-foreground"
                    }`}
                  >
                    <span
                      className={`size-6 rounded-full border flex items-center justify-center text-[10px] font-bold ${
                        isActive
                          ? "border-primary bg-primary/10"
                          : isDone
                            ? "border-foreground bg-foreground/10"
                            : "border-white/20"
                      }`}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="text-sm font-medium">{g.label}</span>
                  </div>
                );
              })}
            </div>

            {!f.result && (
              <div className="pt-6 border-t border-white/5">
                <div className="flex justify-between text-[10px] uppercase tracking-widest text-muted-foreground mb-2">
                  <span>Etapa {f.step}/{TOTAL_STEPS}</span>
                  <span>{f.progress}%</span>
                </div>
                <div className="h-1 bg-white/5 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-primary transition-all duration-500"
                    style={{ width: `${f.progress}%` }}
                  />
                </div>
              </div>
            )}
          </div>
        </aside>

        {/* Content */}
        <div className="md:col-span-8 p-8 md:p-12 bg-black/20 min-h-[520px] flex flex-col">
          <div className="flex-1">
            <AnimatePresence mode="wait">
              {f.result ? (
                <StepShell k="success">
                  <SuccessScreen result={f.result} clientName={f.state.client.client_name} />
                </StepShell>
              ) : (
                <StepShell k={f.step}>
                  {f.step === 1 && (
                    <Step1Client
                      data={f.state.client}
                      errors={f.errors}
                      onChange={f.updateClient}
                    />
                  )}
                  {f.step === 2 && (
                    <Step2Agents
                      value={f.state.agents_quantity}
                      onChange={f.setAgents}
                      error={f.errors.agents_quantity}
                    />
                  )}
                  {f.step === 3 && (
                    <ToggleQuestion
                      title="Quer que a IA responda dúvidas frequentes?"
                      description="Treinamos a IA com seu FAQ para resolver as perguntas mais comuns instantaneamente."
                      value={f.state.toggles.faq_ai}
                      onChange={(v) => f.setToggle("faq_ai", v)}
                    />
                  )}
                  {f.step === 4 && (
                    <ToggleQuestion
                      title="Quer que a IA tenha repertório técnico avançado?"
                      description="Base de conhecimento profunda sobre seus produtos, serviços e processos."
                      value={f.state.toggles.technical_ai}
                      onChange={(v) => f.setToggle("technical_ai", v)}
                    />
                  )}
                  {f.step === 5 && (
                    <ToggleQuestion
                      title="Quer agendamentos automáticos?"
                      description="A IA marca, remarca e cancela compromissos direto na sua agenda."
                      value={f.state.toggles.auto_scheduling}
                      onChange={(v) => f.setToggle("auto_scheduling", v)}
                    />
                  )}
                  {f.step === 6 && (
                    <ToggleQuestion
                      title="Quer lembretes automáticos para clientes?"
                      description="Reduz no-show e mantém engajamento sem esforço manual."
                      value={f.state.toggles.automatic_reminders}
                      onChange={(v) => f.setToggle("automatic_reminders", v)}
                    />
                  )}
                  {f.step === 7 && (
                    <ToggleQuestion
                      title="Quer notificações em grupo do WhatsApp?"
                      description="Resumos diários, alertas e leads quentes direto no grupo do time."
                      value={f.state.toggles.whatsapp_group_notifications}
                      onChange={(v) => f.setToggle("whatsapp_group_notifications", v)}
                    />
                  )}
                  {f.step === 8 && (
                    <ToggleQuestion
                      title="Quer envio automático de PDFs, imagens e arquivos?"
                      description="A IA envia catálogos, contratos e mídias no momento certo da conversa."
                      value={f.state.toggles.media_sending}
                      onChange={(v) => f.setToggle("media_sending", v)}
                    />
                  )}
                  {f.step === 9 && (
                    <ToggleQuestion
                      title="Quer ativação ou disparo em massa de contatos?"
                      description="Campanhas segmentadas com controle de fluxo e personalização."
                      value={f.state.toggles.bulk_messaging}
                      onChange={(v) => f.setToggle("bulk_messaging", v)}
                    />
                  )}
                </StepShell>
              )}
            </AnimatePresence>
          </div>

          {!f.result && (
            <div className="flex items-center justify-between pt-8 mt-8 border-t border-white/10">
              <button
                type="button"
                onClick={f.back}
                disabled={f.step === 1 || f.submitting}
                className="flex items-center gap-2 text-xs font-medium uppercase tracking-widest text-muted-foreground hover:text-foreground transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
              >
                <ArrowLeft className="size-4" />
                Voltar
              </button>
              <button
                type="button"
                onClick={handleNext}
                disabled={f.submitting}
                className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-medium rounded-xl hover:brightness-110 transition-all shadow-[0_0_20px_-5px_hsl(217_91%_60%/0.5)] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {f.submitting ? (
                  <>
                    <Loader2 className="size-4 animate-spin" />
                    Enviando...
                  </>
                ) : f.step === TOTAL_STEPS ? (
                  <>
                    Finalizar
                    <ArrowRight className="size-4" />
                  </>
                ) : (
                  <>
                    Próximo
                    <ArrowRight className="size-4" />
                  </>
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}