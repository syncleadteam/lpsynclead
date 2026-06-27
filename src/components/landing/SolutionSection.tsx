import { Filter, Clock3, Plug } from "lucide-react";

const items = [
  {
    icon: Filter,
    title: "Triagem Inteligente",
    desc: "O agente qualifica em segundos quem é curioso e quem é comprador real, encaminhando apenas leads quentes para o time.",
  },
  {
    icon: Clock3,
    title: "Disponibilidade 24/7",
    desc: "Atendimento instantâneo de domingo a domingo. Sem feriado, sem pausa para o café e sem fila.",
  },
  {
    icon: Plug,
    title: "Integração Total",
    desc: "Conecta com WhatsApp, Instagram, Google Sheets, RD Station e outras ferramentas que você já usa no dia a dia.",
  },
];

export function SolutionSection() {
  return (
    <section id="solucao" className="py-14 md:py-20 px-6 max-w-5xl mx-auto">
      <div className="mb-14 max-w-2xl">
        <span className="text-xs uppercase tracking-widest text-primary font-medium">
          A solução
        </span>
        <h2 className="font-display text-3xl md:text-5xl font-light mt-4 text-foreground">
          Um agente de IA que <span className="italic">trabalha por você</span>.
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {items.map(({ icon: Icon, title, desc }) => (
          <div
            key={title}
            className="relative rounded-2xl border border-white/5 bg-card/40 p-6 overflow-hidden group"
          >
            <div
              className="absolute -top-12 -right-12 w-32 h-32 rounded-full opacity-20 blur-2xl group-hover:opacity-40 transition-opacity"
              style={{ background: "var(--gradient-primary)" }}
            />
            <div
              className="relative inline-flex items-center justify-center w-12 h-12 rounded-xl mb-4"
              style={{ background: "var(--gradient-primary)" }}
            >
              <Icon className="text-primary-foreground" size={22} />
            </div>
            <h3 className="relative font-display text-lg font-medium text-foreground mb-2">
              {title}
            </h3>
            <p className="relative text-sm text-muted-foreground leading-relaxed">{desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
