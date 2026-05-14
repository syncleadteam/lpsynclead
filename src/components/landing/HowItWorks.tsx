const steps = [
  {
    n: "01",
    title: "Configure",
    desc: "Responda 9 perguntas rápidas e nossa engine monta sua arquitetura ideal de agentes.",
  },
  {
    n: "02",
    title: "Treinamos a IA",
    desc: "Indexamos seu conhecimento, FAQs e processos para respostas precisas com a sua voz.",
  },
  {
    n: "03",
    title: "Conectamos ao seu WhatsApp",
    desc: "Integração direta com seu número e CRM. Resultados mensuráveis em dias, não meses.",
  },
];

export function HowItWorks() {
  return (
    <section id="tecnologia" className="py-14 md:py-20 px-6 max-w-5xl mx-auto">
      <div className="mb-16 max-w-2xl">
        <span className="text-xs uppercase tracking-widest text-primary font-medium">
          Como funciona
        </span>
        <h2 className="font-display text-3xl md:text-5xl font-light mt-4 text-foreground">
          Da configuração ao deploy em <span className="italic">3 passos</span>.
        </h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
        {steps.map((s) => (
          <div key={s.n} className="space-y-4">
            <div className="font-display text-primary text-sm font-mono">{s.n}</div>
            <h3 className="font-display text-xl font-medium text-foreground">{s.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}