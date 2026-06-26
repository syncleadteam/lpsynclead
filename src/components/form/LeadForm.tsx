import { AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useLeadForm, TOTAL_STEPS } from "@/hooks/useLeadForm";
import { StepShell } from "./StepShell";
import { Step1Client } from "./Step1Client";
import { Step2Agents } from "./Step2Agents";
import { Step4Observations } from "./Step4Observations";
import { SuccessScreen } from "./SuccessScreen";

const stepperGroups = [
  { label: "Perfil", steps: [1] },
  { label: "Agentes", steps: [2] },
  { label: "Observações", steps: [3] },
  { label: "Enviar", steps: [] as number[] },
];

export function LeadForm() {
  const f = useLeadForm();

  const activeGroup = f.result ? 4 : stepperGroups.findIndex((g) => g.steps.includes(f.step));

  async function handleNext() {
    if (f.catalogLoading) {
      toast.error("Aguarde o carregamento dos produtos do CRM.");
      return;
    }
    if (f.catalogError) {
      toast.error(f.catalogError);
      return;
    }
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
    <div
      id="formulario"
      className="bg-zinc-900/50 border border-white/5 rounded-3xl p-1 overflow-hidden shadow-2xl"
    >
      <div className="flex flex-col">
        <header className="bg-zinc-900/80 border-b border-white/5 p-6 md:p-8">
          <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
              <div>
                <div className="mb-4 flex size-10 items-center justify-center rounded-xl bg-primary/20">
                  <div className="size-2 animate-pulse rounded-full bg-primary" />
                </div>
                <h2 className="font-display text-2xl font-medium text-foreground">Configurador</h2>
                <p className="mt-2 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                  Personalize sua infraestrutura de atendimento sob medida.
                </p>
              </div>

              {!f.result && (
                <div className="w-full shrink-0 md:w-52">
                  <div className="mb-2 flex justify-between text-[10px] uppercase tracking-widest text-muted-foreground">
                    <span>
                      Etapa {f.step}/{TOTAL_STEPS}
                    </span>
                    <span>{f.progress}%</span>
                  </div>
                  <div className="h-1 overflow-hidden rounded-full bg-white/5">
                    <div
                      className="h-full bg-primary transition-all duration-500"
                      style={{ width: `${f.progress}%` }}
                    />
                  </div>
                </div>
              )}
            </div>

            <nav className="grid grid-cols-2 gap-2 md:grid-cols-4">
              {stepperGroups.map((g, i) => {
                const isActive = i === activeGroup;
                const isDone = i < activeGroup;
                return (
                  <div
                    key={g.label}
                    className={`flex items-center gap-3 rounded-xl border px-3 py-3 transition-colors ${
                      isActive
                        ? "border-primary bg-primary/10 text-primary"
                        : isDone
                          ? "border-white/15 bg-white/[0.04] text-foreground"
                          : "border-white/10 bg-white/[0.02] text-muted-foreground"
                    }`}
                  >
                    <span
                      className={`flex size-6 items-center justify-center rounded-full border text-[10px] font-bold ${
                        isActive
                          ? "border-primary bg-primary/10"
                          : isDone
                            ? "border-foreground bg-foreground/10"
                            : "border-white/20"
                      }`}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="min-w-0 text-sm font-medium">{g.label}</span>
                  </div>
                );
              })}
            </nav>
          </div>
        </header>

        <div className="min-h-[520px] bg-black/20 p-6 md:p-10">
          <div className="flex-1">
            {f.catalogError && !f.result ? (
              <div className="mb-4 rounded-xl border border-primary/30 bg-primary/10 px-4 py-3 text-sm text-primary">
                {f.catalogError}
              </div>
            ) : null}
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
                      selectedAgentCodes={f.state.selected_agent_codes}
                      catalog={f.catalog}
                      onToggle={f.setAgentSelected}
                      error={f.errors.agents_quantity}
                    />
                  )}
                  {f.step === 3 && (
                    <Step4Observations value={f.state.observations} onChange={f.setObservations} />
                  )}
                </StepShell>
              )}
            </AnimatePresence>
          </div>

          {!f.result && (
            <div className="mt-8 flex items-center justify-between border-t border-white/10 pt-8">
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
                disabled={f.submitting || f.catalogLoading}
                className="flex items-center gap-2 px-6 py-3 bg-primary text-primary-foreground font-medium rounded-xl hover:brightness-110 transition-all shadow-[0_0_20px_-5px_hsl(217_91%_60%/0.5)] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {f.catalogLoading ? (
                  <>
                    <Loader2 className="size-4 animate-spin" />
                    Carregando...
                  </>
                ) : f.submitting ? (
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
