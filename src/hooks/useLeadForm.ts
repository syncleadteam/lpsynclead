import { useCallback, useEffect, useMemo, useState } from "react";
import {
  clientSchema,
  initialFormState,
  type FormState,
  type LandingCatalog,
  type SubmitResult,
} from "@/types/lead";
import { fetchLandingCatalog, submitLead } from "@/services/leadService";

export const TOTAL_STEPS = 4;

export function useLeadForm() {
  const [step, setStep] = useState(1);
  const [state, setState] = useState<FormState>(initialFormState);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<SubmitResult | null>(null);
  const [catalog, setCatalog] = useState<LandingCatalog>({ agents: [], modules: [] });
  const [catalogLoading, setCatalogLoading] = useState(true);
  const [catalogError, setCatalogError] = useState<string | null>(null);

  const loadCatalog = useCallback(async () => {
    setCatalogLoading(true);
    setCatalogError(null);
    try {
      const nextCatalog = await fetchLandingCatalog();
      setCatalog(nextCatalog);
      setState((current) => {
        const allowedCodes = new Set(nextCatalog.modules.map((product) => product.code));
        const toggles = Object.fromEntries(
          Object.entries(current.toggles).filter(([code]) => allowedCodes.has(code)),
        );
        return { ...current, toggles };
      });
    } catch (error) {
      setCatalogError(error instanceof Error ? error.message : "Nao foi possivel carregar produtos.");
    } finally {
      setCatalogLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadCatalog();
  }, [loadCatalog]);

  const updateClient = useCallback(
    (patch: Partial<FormState["client"]>) =>
      setState((s) => ({ ...s, client: { ...s.client, ...patch } })),
    [],
  );

  const setAgents = useCallback(
    (q: FormState["agents_quantity"]) => setState((s) => ({ ...s, agents_quantity: q })),
    [],
  );

  const setToggle = useCallback(
    (key: keyof FormState["toggles"], value: boolean) =>
      setState((s) => ({ ...s, toggles: { ...s.toggles, [key]: value } })),
    [],
  );

  const setObservations = useCallback(
    (v: string) => setState((s) => ({ ...s, observations: v })),
    [],
  );

  const validateStep = useCallback((): boolean => {
    setErrors({});
    if (step === 1) {
      const r = clientSchema.safeParse(state.client);
      if (!r.success) {
        const errs: Record<string, string> = {};
        for (const issue of r.error.issues) {
          errs[issue.path.join(".")] = issue.message;
        }
        setErrors(errs);
        return false;
      }
    }
    if (step === 2 && !state.agents_quantity) {
      setErrors({ agents_quantity: "Selecione uma opção" });
      return false;
    }
    if (step === 2 && catalog.agents.length === 0) {
      setErrors({ agents_quantity: "Nenhum agente ativo no CRM" });
      return false;
    }
    if (
      step === 2 &&
      state.agents_quantity &&
      ((state.agents_quantity === "2_agentes" && catalog.agents.length < 2) ||
        (state.agents_quantity === "3_agentes" && catalog.agents.length < 3))
    ) {
      setErrors({ agents_quantity: "Esta quantidade nao esta ativa no CRM" });
      return false;
    }
    return true;
  }, [step, state, catalog.agents.length]);

  const next = useCallback(() => {
    if (!validateStep()) return;
    setStep((s) => Math.min(s + 1, TOTAL_STEPS));
  }, [validateStep]);

  const back = useCallback(() => setStep((s) => Math.max(s - 1, 1)), []);

  const submit = useCallback(async () => {
    if (submitting) return;
    setSubmitting(true);
    try {
      const res = await submitLead(state, catalog);
      setResult(res);
      return res;
    } finally {
      setSubmitting(false);
    }
  }, [state, catalog, submitting]);

  const progress = useMemo(() => Math.round((step / TOTAL_STEPS) * 100), [step]);

  return {
    step,
    state,
    errors,
    submitting,
    result,
    catalog,
    catalogLoading,
    catalogError,
    progress,
    loadCatalog,
    updateClient,
    setAgents,
    setToggle,
    setObservations,
    next,
    back,
    submit,
    setStep,
  };
}
