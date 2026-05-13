import { Check } from "lucide-react";

interface Props {
  title: string;
  description?: string;
  value: boolean;
  onChange: (v: boolean) => void;
}

export function ToggleQuestion({ title, description, value, onChange }: Props) {
  return (
    <div className="space-y-6">
      <div>
        <h3 className="font-display text-2xl md:text-3xl font-light text-foreground mb-3">
          {title}
        </h3>
        {description && (
          <p className="text-sm text-muted-foreground max-w-md">{description}</p>
        )}
      </div>
      <div className="grid grid-cols-2 gap-4 max-w-md">
        <button
          type="button"
          onClick={() => onChange(true)}
          className={`group relative p-6 rounded-xl border transition-all text-left ${
            value
              ? "border-primary bg-primary/5 shadow-[0_0_30px_-10px_hsl(217_91%_60%/0.5)]"
              : "border-white/10 bg-white/[0.02] hover:border-white/20"
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="font-display text-lg">Sim</span>
            <div
              className={`size-5 rounded-full flex items-center justify-center transition-all ${
                value ? "bg-primary" : "border border-white/20"
              }`}
            >
              {value && <Check className="size-3 text-primary-foreground" strokeWidth={3} />}
            </div>
          </div>
          <span className="text-xs text-muted-foreground">Ativar este módulo</span>
        </button>
        <button
          type="button"
          onClick={() => onChange(false)}
          className={`group relative p-6 rounded-xl border transition-all text-left ${
            !value
              ? "border-white/30 bg-white/[0.04]"
              : "border-white/10 bg-white/[0.02] hover:border-white/20"
          }`}
        >
          <div className="flex items-center justify-between mb-2">
            <span className="font-display text-lg">Não</span>
            <div
              className={`size-5 rounded-full flex items-center justify-center transition-all ${
                !value ? "bg-foreground" : "border border-white/20"
              }`}
            >
              {!value && <Check className="size-3 text-background" strokeWidth={3} />}
            </div>
          </div>
          <span className="text-xs text-muted-foreground">Pular por enquanto</span>
        </button>
      </div>
    </div>
  );
}