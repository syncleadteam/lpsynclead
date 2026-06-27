import { MessageCircle } from "lucide-react";

const WHATSAPP_NUMBER = "5511999999999";
const WHATSAPP_MESSAGE =
  "Olá! Quero entender como a Axon.AI pode automatizar o atendimento da minha empresa.";

export function FinalCta() {
  const href = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(WHATSAPP_MESSAGE)}`;
  return (
    <section id="contato" className="py-14 md:py-20 px-6">
      <div
        className="relative max-w-4xl mx-auto rounded-3xl border border-white/10 p-10 md:p-16 text-center overflow-hidden"
        style={{ background: "var(--gradient-primary)" }}
      >
        <div className="absolute inset-0 bg-background/70 backdrop-blur-xl" />
        <div className="relative">
          <span className="text-xs uppercase tracking-widest text-primary font-semibold">
            Última chamada
          </span>
          <h2 className="font-display text-3xl md:text-5xl font-light mt-4 mb-6 text-foreground leading-tight">
            Pare de perder leads.{" "}
            <span
              className="italic font-normal bg-clip-text text-transparent"
              style={{ backgroundImage: "var(--gradient-primary)" }}
            >
              Comece a vender no automático.
            </span>
          </h2>
          <p className="text-muted-foreground text-base md:text-lg max-w-xl mx-auto mb-10">
            Fale agora com nossa equipe pelo WhatsApp — e veja nosso próprio chatbot em ação.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-medium text-primary-foreground transition-all hover:brightness-110"
              style={{ background: "var(--gradient-primary)", boxShadow: "var(--shadow-glow)" }}
            >
              <MessageCircle size={18} />
              Falar no WhatsApp
            </a>
            <a
              href="#formulario"
              className="inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl font-medium border border-white/15 bg-card/40 text-foreground hover:border-primary/40 transition-all"
            >
              Configurar minha automação
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
