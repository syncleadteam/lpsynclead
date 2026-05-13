import { CheckCircle2, MessageCircle } from "lucide-react";
import type { SubmitResult } from "@/types/lead";

const WHATSAPP_NUMBER = "5511999999999"; // ajuste para o número comercial

function brl(v: number) {
  return v.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
}

export function SuccessScreen({ result, clientName }: { result: SubmitResult; clientName: string }) {
  const message = encodeURIComponent(
    `Olá! Sou ${clientName}. Acabei de configurar minha automação na Axon.AI (orçamento ${result.quoteId.slice(
      0,
      8,
    )}) e gostaria de avançar.`,
  );
  const whatsappUrl = `https://wa.me/${WHATSAPP_NUMBER}?text=${message}`;

  return (
    <div className="space-y-8">
      <div className="flex items-start gap-4">
        <div className="size-12 rounded-full bg-primary/10 border border-primary/30 flex items-center justify-center shrink-0">
          <CheckCircle2 className="size-6 text-primary" />
        </div>
        <div>
          <h3 className="font-display text-3xl font-light text-foreground mb-2">
            Sua automação está pronta para decolar
          </h3>
          <p className="text-sm text-muted-foreground max-w-md">
            Recebemos sua configuração. Veja abaixo o que foi montado para você.
          </p>
        </div>
      </div>

      <div className="rounded-2xl border border-white/10 bg-white/[0.02] divide-y divide-white/5">
        {result.modules.map((m) => (
          <div key={m.code} className="flex items-center justify-between p-4">
            <span className="text-sm text-foreground">{m.name}</span>
            <span className="text-sm font-mono text-muted-foreground">{brl(m.price)}</span>
          </div>
        ))}
        <div className="flex items-center justify-between p-5 bg-primary/5">
          <span className="text-xs uppercase tracking-widest text-muted-foreground">
            Investimento estimado
          </span>
          <span className="font-display text-2xl font-medium text-primary">
            {brl(result.total)}
            <span className="text-xs text-muted-foreground font-normal">/mês</span>
          </span>
        </div>
      </div>

      <a
        href={whatsappUrl}
        target="_blank"
        rel="noreferrer"
        className="w-full flex items-center justify-center gap-3 px-6 py-4 rounded-xl bg-primary text-primary-foreground font-medium hover:brightness-110 transition-all shadow-[0_0_30px_-5px_hsl(217_91%_60%/0.5)]"
      >
        <MessageCircle className="size-5" />
        Falar com especialista no WhatsApp
      </a>
      <p className="text-xs text-muted-foreground/70 text-center">
        Estimativa preliminar. Valor final pode variar conforme escopo técnico.
      </p>
    </div>
  );
}