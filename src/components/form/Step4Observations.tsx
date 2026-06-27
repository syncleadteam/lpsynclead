interface Props {
  value: string;
  onChange: (v: string) => void;
}

export function Step4Observations({ value, onChange }: Props) {
  return (
    <div className="space-y-6">
      <div>
        <div className="text-[10px] uppercase tracking-widest text-primary font-medium mb-2">
          Etapa 3 de 3
        </div>
        <h3 className="font-display text-2xl md:text-3xl font-light text-foreground mb-2">
          Observações{" "}
          <span className="text-xs uppercase tracking-widest text-muted-foreground align-middle ml-2 px-2 py-1 rounded-full border border-white/10">
            opcional
          </span>
        </h3>
        <p className="text-sm text-muted-foreground max-w-lg">
          Compartilhe informações adicionais sobre seu projeto, integrações existentes, volume de
          atendimento ou qualquer detalhe que ajude na implantação.
        </p>
      </div>
      <div>
        <label className="text-xs font-medium text-muted-foreground uppercase tracking-widest block mb-2">
          Observações gerais
        </label>
        <textarea
          value={value}
          onChange={(e) => onChange(e.target.value)}
          rows={6}
          maxLength={2000}
          placeholder="Ex.: Temos cerca de 500 atendimentos por dia, usamos o CRM XYZ e precisamos integrar com o sistema de agendamento."
          className="w-full px-4 py-3 rounded-lg bg-white/[0.02] border border-white/10 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary focus:bg-white/[0.04] transition-all resize-none"
        />
      </div>
    </div>
  );
}
