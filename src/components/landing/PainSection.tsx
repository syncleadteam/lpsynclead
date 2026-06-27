import { Clock, MoonStar, UserX } from "lucide-react";

const pains = [
  {
    icon: Clock,
    title: "Resposta lenta = venda perdida",
    desc: "A cada minuto sem resposta, a chance de conversão cai. Seu lead já está falando com o concorrente.",
  },
  {
    icon: MoonStar,
    title: "Leads esfriando à noite",
    desc: "Fora do horário comercial, finais de semana e feriados — seu funil simplesmente para de girar.",
  },
  {
    icon: UserX,
    title: "Follow-up que ninguém faz",
    desc: "Sua equipe esquece, prioriza errado e perde contexto. O lead some, e ninguém percebe.",
  },
];

export function PainSection() {
  return (
    <section id="dor" className="py-14 md:py-20 px-6 max-w-5xl mx-auto">
      <div className="mb-14 max-w-3xl">
        <span className="text-xs uppercase tracking-widest text-primary font-medium">
          O problema
        </span>
        <h2 className="font-display text-3xl md:text-5xl font-light mt-4 text-foreground leading-tight">
          Enquanto você dorme ou almoça, seus leads estão{" "}
          <span
            className="italic font-normal bg-clip-text text-transparent"
            style={{ backgroundImage: "var(--gradient-primary)" }}
          >
            esfriando no seu atendimento
          </span>
          .
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {pains.map(({ icon: Icon, title, desc }) => (
          <div
            key={title}
            className="relative rounded-2xl border border-white/10 p-6 overflow-hidden hover:border-primary/30 transition-colors"
            style={{ background: "var(--gradient-primary)" }}
          >
            <div className="absolute inset-0 bg-background/70 backdrop-blur-xl" />
            <div className="relative">
              <Icon className="text-primary mb-4" size={28} />
              <h3 className="font-display text-lg font-medium text-foreground mb-2">{title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
