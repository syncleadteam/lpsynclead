import logo from "@/assets/logo.png";

export function Header() {
  return (
    <nav className="flex items-center justify-between px-6 md:px-8 py-6 max-w-7xl mx-auto">
      <a href="#" className="flex items-center gap-2">
        <img src={logo} alt="Axon.AI" className="h-8 w-auto" />
      </a>
      <div className="hidden md:flex gap-8 text-sm font-medium text-muted-foreground">
        <a href="#tecnologia" className="hover:text-foreground transition-colors">
          Tecnologia
        </a>
        <a href="#modulos" className="hover:text-foreground transition-colors">
          Módulos
        </a>
        <a href="#formulario" className="hover:text-foreground transition-colors">
          Configurar
        </a>
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