export function Header() {
  return (
    <nav className="flex items-center justify-between px-6 md:px-8 py-6 max-w-7xl mx-auto">
      <div className="font-display text-2xl font-semibold tracking-tighter italic text-foreground">
        AXON<span className="text-primary">.AI</span>
      </div>
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
        className="px-5 py-2 rounded-full border border-white/10 text-sm font-medium hover:bg-white/5 transition-all"
      >
        Começar
      </a>
    </nav>
  );
}