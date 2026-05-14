import logo from "@/assets/logo.png";

export function Header() {
  return (
    <nav className="flex items-center justify-between px-6 md:px-8 py-6 max-w-7xl mx-auto">
      <a href="#" className="flex items-center gap-2">
        <img src={logo} alt="Axon.AI" className="h-8 w-auto" />
      </a>
      <div className="hidden md:flex gap-8 text-sm font-medium text-muted-foreground">
        <a href="#dor" className="hover:text-foreground transition-colors">O problema</a>
        <a href="#solucao" className="hover:text-foreground transition-colors">A solução</a>
        <a href="#beneficios" className="hover:text-foreground transition-colors">Resultados</a>
        <a href="#tecnologia" className="hover:text-foreground transition-colors">Como funciona</a>
        <a href="#faq" className="hover:text-foreground transition-colors">Dúvidas frequentes</a>
        <a href="#contato" className="hover:text-foreground transition-colors">Fale conosco</a>
      </div>
      <a
        href="#formulario"
        className="px-5 py-2 rounded-full text-sm font-medium text-primary-foreground transition-all hover:opacity-90"
        style={{ background: "var(--gradient-primary)" }}
      >
        Começar
      </a>
    </nav>
  );
}