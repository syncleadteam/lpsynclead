import type { ClientData } from "@/types/lead";

interface Props {
  data: ClientData;
  errors: Record<string, string>;
  onChange: (patch: Partial<ClientData>) => void;
}

const fields: { key: keyof ClientData; label: string; placeholder: string; type?: string }[] = [
  { key: "client_name", label: "Seu nome", placeholder: "João Silva" },
  { key: "phone", label: "Celular / WhatsApp", placeholder: "(11) 99999-9999" },
  { key: "email", label: "Email", placeholder: "voce@empresa.com", type: "email" },
  { key: "company_name", label: "Nome da empresa", placeholder: "Acme Ltda" },
  { key: "business_sector", label: "Ramo de atuação", placeholder: "Saúde, e-commerce, jurídico..." },
];

export function Step1Client({ data, errors, onChange }: Props) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-display text-2xl md:text-3xl font-light text-foreground mb-2">
          Vamos começar pelo básico
        </h3>
        <p className="text-sm text-muted-foreground">
          Estes dados aparecem no seu orçamento personalizado.
        </p>
      </div>
      <div className="space-y-4">
        {fields.map((f) => (
          <div key={f.key}>
            <label className="text-xs font-medium text-muted-foreground uppercase tracking-widest block mb-2">
              {f.label}
            </label>
            <input
              type={f.type ?? "text"}
              value={data[f.key]}
              onChange={(e) => onChange({ [f.key]: e.target.value } as Partial<ClientData>)}
              placeholder={f.placeholder}
              className="w-full px-4 py-3 rounded-lg bg-white/[0.02] border border-white/10 text-foreground placeholder:text-muted-foreground/50 focus:outline-none focus:border-primary focus:bg-white/[0.04] transition-all"
            />
            {errors[f.key] && (
              <p className="mt-1.5 text-xs text-destructive">{errors[f.key]}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}