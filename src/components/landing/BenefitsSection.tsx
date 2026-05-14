import { TrendingDown, Zap, Infinity as InfinityIcon } from "lucide-react";

const benefits = [
  {
    icon: TrendingDown,
    title: "Redução de Custos",
    desc: "Diminua a necessidade de uma equipe gigante de suporte. Sua IA cobre o volume sem aumentar folha.",
    metric: "-70%",
    label: "em custo operacional",
  },
  {
    icon: Zap,
    title: "Zero Leads Perdidos",
    desc: "Todo contato é respondido em menos de 1 minuto, qualquer hora, qualquer canal.",
    metric: "<1min",
    label: "de tempo de resposta",
  },
  {
    icon: InfinityIcon,
    title: "Escalabilidade Real",
    desc: "Atenda 1.000 pessoas com a mesma qualidade de quem atende 10. Cresça sem reestruturar.",
    metric: "100x",
    label: "de capacidade simultânea",
  },
];

export function BenefitsSection() {
  return (
    <section id="beneficios" className="py-14 md:py-20 px-6 max-w-5xl mx-auto">
      <div className="mb-14 max-w-2xl">
        <span className="text-xs uppercase tracking-widest text-primary font-medium">
          Resultados
        </span>
        <h2 className="font-display text-3xl md:text-5xl font-light mt-4 text-foreground">
          O ROI que sua operação <span className="italic">precisa ver</span>.
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {benefits.map(({ icon: Icon, title, desc, metric, label }) => (
          <div
            key={title}
            className="rounded-2xl border border-white/5 bg-card/40 p-6 hover:border-accent/40 transition-colors"
          >
            <Icon className="text-accent mb-4" size={28} />
            <div
              className="font-display text-4xl font-light bg-clip-text text-transparent mb-1"
              style={{ backgroundImage: "var(--gradient-primary)" }}
            >
              {metric}
            </div>
            <div className="text-xs uppercase tracking-wider text-muted-foreground mb-4">
              {label}
            </div>
            <h3 className="font-display text-lg font-medium text-foreground mb-2">{title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}