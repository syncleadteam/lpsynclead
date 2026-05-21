
## Objetivo
1. Tornar o menu (Header) flutuante, acompanhando o scroll da página.
2. Criar alternância de cores de fundo entre todas as seções da landing page.

## Mudanças

### 1. Header flutuante (`src/components/landing/Header.tsx`)
- Envolver o `<nav>` em um wrapper `<header>` com `fixed top-0 left-0 right-0 z-50`.
- Adicionar fundo translúcido com blur: `bg-background/70 backdrop-blur-lg border-b border-white/5`.
- Reduzir levemente o padding vertical para um header mais compacto em scroll (`py-4`).
- Ajustar o `Hero` (ou o container raiz) com `pt-20` para compensar a altura do header fixo e evitar que o conteúdo fique escondido atrás dele.

### 2. Alternância de fundo das seções (`src/routes/index.tsx`)
Aplicar padrão zebra entre as seções, alternando entre `bg-background` (padrão) e `bg-card/30` (sutilmente mais claro):

```
Hero            → bg-background
PainSection     → bg-card/30
SolutionSection → bg-background
BenefitsSection → bg-card/30
HowItWorks      → bg-background
LeadForm        → bg-card/30
FaqSection      → bg-background
FinalCta        → bg-card/30
Footer          → bg-background
```

Isso substitui o esquema atual (que só alterna em algumas seções) por uma alternância completa e consistente, dando ritmo visual à página.

### 3. Pequeno ajuste de offset de âncora
Como o header fica fixo, adicionar `scroll-mt-20` (ou `scroll-margin-top`) nas seções com `id` (`#dor`, `#solucao`, `#beneficios`, `#tecnologia`, `#formulario`, `#faq`, `#contato`) para que ao clicar nos links do menu o título não fique escondido atrás do header.

## Fora de escopo
- Não alterar cores do design system, tipografia, ou conteúdo de texto.
- Não mudar a lógica do formulário nem do backend.
