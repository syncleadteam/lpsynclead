import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqs = [
  {
    q: "O atendimento não fica muito robótico?",
    a: "Não. Treinamos a IA com seu tom de voz, vocabulário, perguntas frequentes e processos. O cliente sente que está conversando com alguém da sua equipe, mas com disponibilidade 24 horas por dia, 7 dias por semana.",
  },
  {
    q: "Funciona para o meu nicho?",
    a: "Sim. Já rodamos automações em saúde, estética, educação, e-commerce, serviços B2B, imobiliário, infoprodutos e SaaS. A engine se adapta ao seu fluxo comercial — não o contrário.",
  },
  {
    q: "É difícil de configurar?",
    a: "Não. Você preenche este formulário, a gente conecta seu WhatsApp/CRM e treina a IA com seu material. Em poucos dias, tudo está no ar — sem você precisar mexer em código.",
  },
  {
    q: "E se a IA não souber responder algo?",
    a: "Ela transfere a conversa para um humano automaticamente, com todo o contexto já resumido. Nada se perde, nada fica solto.",
  },
  {
    q: "Meus dados ficam seguros?",
    a: "Sim. Toda comunicação é criptografada e os dados ficam em infraestrutura compatível com LGPD. Você é dono total das conversas e pode exportar quando quiser.",
  },
];

export function FaqSection() {
  return (
    <section id="faq" className="py-14 md:py-20 px-6 max-w-3xl mx-auto">
      <div className="mb-12 text-center">
        <span className="text-xs uppercase tracking-widest text-primary font-medium">FAQ</span>
        <h2 className="font-display text-3xl md:text-5xl font-light mt-4 text-foreground">
          Dúvidas <span className="italic">frequentes</span>.
        </h2>
      </div>
      <Accordion type="single" collapsible className="w-full space-y-3">
        {faqs.map((f, i) => (
          <AccordionItem
            key={i}
            value={`item-${i}`}
            className="border border-white/5 rounded-xl bg-card/40 px-5 [&>h3]:!my-0"
          >
            <AccordionTrigger className="font-display text-base md:text-lg text-left hover:no-underline">
              {f.q}
            </AccordionTrigger>
            <AccordionContent className="text-sm text-muted-foreground leading-relaxed">
              {f.a}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  );
}
