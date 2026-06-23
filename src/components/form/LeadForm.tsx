import { AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useLeadForm, TOTAL_STEPS } from "@/hooks/useLeadForm";
import { StepShell } from "./StepShell";
import { Step1Client } from "./Step1Client";
import { Step2Agents } from "./Step2Agents";
import { Step3Modules } from "./Step3Modules";
import { Step4Observations } from "./Step4Observations";
import { SuccessScreen } from "./SuccessScreen";

const stepperGroups = [
  { label: "Perfil", steps: [1] },
  { label: "Agentes", steps: [2] },
  { label: "Módulos", steps: [3] },
  { label: "Observações", steps: [4] },
  { label: "Enviar", steps: [] as number[] },
];

export function LeadForm() {
  const f = useLeadForm();

  const activeGroup = f.result
    ? 4
    : stepperGroups.findIndex((g) => g.steps.includes(f.step));

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
                      value={f.state.agents_quantity}
                      catalog={f.catalog}
                      onChange={f.setAgents}
                      error={f.errors.agents_quantity}
                    />
                  )}
                  {f.step === 3 && f.state.agents_quantity && (
                    <Step3Modules
                      agentsQuantity={f.state.agents_quantity}
                      catalog={f.catalog}
                      toggles={f.state.toggles}
                      onToggle={f.setToggle}
                    />
                  )}
                  {f.step === 4 && (
                    <Step4Observations
                      value={f.state.observations}
                      onChange={f.setObservations}
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
