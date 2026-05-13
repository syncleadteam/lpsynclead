## Resumo

Landing page premium "Midnight Obsidian Tech" (preto + azul elétrico, fonte Outfit/Inter) com formulário multi-step de 9 etapas que captura leads, calcula orçamento dinâmico e persiste tudo no Lovable Cloud (Supabase gerenciado).

## 1. Backend (Lovable Cloud)

Habilitar Lovable Cloud e criar via migration:

**Tabelas:**
- `clients` — id, client_name, phone, email, company_name, business_sector, created_at
- `automation_modules` — id, code (unique), name, description, base_price, category (`agent` | `feature`), created_at
- `quotes` — id, client_id (fk), agents_quantity (`1_agente`|`2_agentes`|`3_agentes`), subtotal, total_price, status (default `rascunho`), created_at
- `quote_modules` — id, quote_id (fk), module_id (fk), module_price
- `sales_pipeline` — id, client_id (fk), current_stage (default `novo_lead`), created_at

**Seed em automation_modules** (preços placeholder em BRL):
- `attendance_agent` R$ 497, `sales_agent` R$ 597, `support_agent` R$ 497
- `faq_ai` R$ 197, `technical_ai` R$ 297, `auto_scheduling` R$ 247
- `automatic_reminders` R$ 147, `whatsapp_group_notifications` R$ 197
- `media_sending` R$ 197, `bulk_messaging` R$ 297

**RLS:** habilitada nas 4 tabelas de escrita. Policies:
- `clients`, `quotes`, `quote_modules`, `sales_pipeline`: INSERT permitido para `anon` + `authenticated`. Sem SELECT/UPDATE/DELETE públicos.
- `automation_modules`: SELECT público (preciso para o front buscar IDs/preços), sem escrita.

## 2. Frontend — Estrutura de arquivos

```text
src/routes/index.tsx          → landing + formulário
src/routes/__root.tsx          → meta tags PT-BR
src/components/landing/
  Hero.tsx
  HowItWorks.tsx
  Footer.tsx
src/components/form/
  LeadForm.tsx                 → orquestrador multi-step
  ProgressBar.tsx
  StepShell.tsx                → wrapper com animação Framer Motion
  Step1Client.tsx              → nome, celular, email, empresa, ramo
  Step2Agents.tsx              → 1/2/3 agentes (cards)
  Step3to9Toggle.tsx           → componente reutilizável SIM/NÃO
  SuccessScreen.tsx            → resumo + valor + CTA WhatsApp
src/hooks/useLeadForm.ts       → estado + navegação + validação
src/services/leadService.ts    → orquestra inserts no Supabase
src/lib/supabase.ts            → re-export do client gerado
src/types/lead.ts              → Client, Quote, Module, QuoteModule, FormState
```

## 3. Fluxo de submissão (`leadService.submitLead`)

1. INSERT em `clients` → retorna `client_id`
2. INSERT em `quotes` com `client_id`, `agents_quantity`, `status='rascunho'` → retorna `quote_id`
3. SELECT em `automation_modules` filtrando pelos `code` selecionados (agentes automáticos por quantidade + módulos opcionais marcados)
4. INSERT batch em `quote_modules` (uma linha por módulo, com `module_price = base_price`)
5. UPDATE `quotes` com `subtotal` e `total_price` = soma dos `module_price`
6. INSERT em `sales_pipeline` com `client_id`, `current_stage='novo_lead'`
7. Retorna resumo (módulos + total) para a tela de sucesso

Regra de agentes automáticos:
- `1_agente` → `attendance_agent`
- `2_agentes` → `attendance_agent` + `sales_agent`
- `3_agentes` → `attendance_agent` + `sales_agent` + `support_agent`

## 4. Validação

Zod schemas em `src/types/lead.ts`:
- nome ≥ 2 chars, email válido, telefone ≥ 10 dígitos, empresa ≥ 2, ramo ≥ 2
- agents_quantity: enum dos 3 valores
- toggles: boolean

Validação por step antes de avançar; erros inline com texto vermelho.

## 5. UX

- Progress bar 1/9 a 9/9 no topo
- Animações Framer Motion: slide+fade entre steps (x: 20→0, opacity 0→1)
- Botões "Voltar" / "Próximo" em todas as etapas (exceto step 1 sem voltar)
- Estado preservado ao navegar entre etapas
- Loading state no submit (botão disabled + spinner), proteção contra double-submit
- Tela de sucesso: lista módulos escolhidos, mostra total estimado em destaque, botão WhatsApp (`https://wa.me/...?text=...` com mensagem pré-preenchida do resumo) — número configurável via constante

## 6. Visual (direção escolhida: Midnight Obsidian Tech)

Tokens em `src/styles.css` (oklch):
- background: preto profundo (#09090b)
- foreground: branco quase puro
- primary: azul elétrico (#3b82f6) com glow shadow
- muted: silver (#94a3b8)
- borders: white/5, white/10
- Fontes: Outfit (display, headings) + Inter (body), via Google Fonts no `__root.tsx`

Hero centralizado com badge "Next-Gen Automation", título grande, subtítulo. Card do formulário em grid 4/8 (sidebar com stepper visual + área do step ativo). Seção "Como funciona" em 3 passos. Footer minimalista.

## 7. SEO / Meta

Idioma PT-BR. `<html lang="pt-BR">`. Meta no root + override no index:
- title: "Axon.AI — Automação de Atendimento com IA"
- description focada em automação WhatsApp + IA
- og:title, og:description, og:type=website

## 8. Detalhes técnicos

- Cliente Supabase: usar o `@/integrations/supabase/client` gerado pelo Lovable Cloud (não criar `lib/supabase.ts` manual com URL hardcoded — usar o gerado e re-exportar se necessário para manter compatibilidade com `/lib/supabase.ts` do PRD)
- Inserts feitos do browser (RLS permite anon INSERT) — sem necessidade de server functions
- `toast` (sonner) para feedback de erro de submissão
- Responsividade: grid colapsa para 1 coluna em mobile; stepper vira horizontal compacto
- Não usar service_role em lugar nenhum

## 9. Fora de escopo (deste primeiro build)

- Painel admin / SELECT de leads (sem auth pública)
- Edição de orçamento depois de enviado
- Integração de pagamento
- Disparo automático de email/WhatsApp para o lead

---

Após sua aprovação, executo: enable Cloud → migration (tabelas + seed + RLS) → tipos TS → service → hook → componentes → landing.