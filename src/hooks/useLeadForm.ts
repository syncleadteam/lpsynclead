import { useCallback, useMemo, useState } from "react";
import { clientSchema, initialFormState, type FormState, type SubmitResult } from "@/types/lead";
import { submitLead } from "@/services/leadService";

export const TOTAL_STEPS = 4;

export function useLeadForm() {
  const [step, setStep] = useState(1);
  const [state, setState] = useState<FormState>(initialFormState);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [result, setResult] = useState<SubmitResult | null>(null);

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
    return true;
  }, [step, state]);

  const next = useCallback(() => {
    if (!validateStep()) return;
    setStep((s) => Math.min(s + 1, TOTAL_STEPS));
  }, [validateStep]);

  const back = useCallback(() => setStep((s) => Math.max(s - 1, 1)), []);

  const submit = useCallback(async () => {
    if (submitting) return;
    setSubmitting(true);
    try {
      const res = await submitLead(state);
      setResult(res);
      return res;
    } finally {
      setSubmitting(false);
    }
  }, [state, submitting]);

  const progress = useMemo(() => Math.round((step / TOTAL_STEPS) * 100), [step]);

  return {
    step,
    state,
    errors,
    submitting,
    result,
    progress,
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