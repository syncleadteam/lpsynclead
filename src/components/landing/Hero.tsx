export function Hero() {
  return (
    <header className="pt-12 md:pt-20 pb-12 md:pb-16 px-6 text-center max-w-4xl mx-auto">
      <span className="px-3 py-1 rounded-full border border-primary/30 bg-primary/10 text-primary text-xs font-semibold tracking-wider uppercase mb-6 inline-block italic">
        Automação de próxima geração
      </span>
      <h1 className="font-display text-4xl md:text-7xl font-light leading-[1.05] mb-8 text-foreground text-balance">
        Sua empresa no{" "}
        <span
          className="italic font-normal bg-clip-text text-transparent"
          style={{ backgroundImage: "var(--gradient-primary)" }}
        >
          piloto automático
        </span>{" "}
        com IA
      </h1>
      <p className="text-muted-foreground text-base md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
        Configure seu ecossistema de atendimento inteligente em minutos. Agentes autônomos que
        atendem, vendem, agendam e oferecem suporte 24 horas por dia, 7 dias por semana — direto no
        WhatsApp.
      </p>
      <a
        href="#formulario"
        className="inline-flex items-center gap-2 px-8 py-4 text-primary-foreground font-medium rounded-xl hover:brightness-110 transition-all"
        style={{ background: "var(--gradient-primary)", boxShadow: "var(--shadow-glow)" }}
      >
        Configurar minha automação
      </a>
    </header>
  );
}
