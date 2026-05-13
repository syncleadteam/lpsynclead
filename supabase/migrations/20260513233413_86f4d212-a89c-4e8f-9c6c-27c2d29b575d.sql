
-- Enums
CREATE TYPE public.agents_quantity_enum AS ENUM ('1_agente', '2_agentes', '3_agentes');
CREATE TYPE public.module_category_enum AS ENUM ('agent', 'feature');

-- Clients
CREATE TABLE public.clients (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_name TEXT NOT NULL,
  phone TEXT NOT NULL,
  email TEXT NOT NULL,
  company_name TEXT NOT NULL,
  business_sector TEXT NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.clients ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can insert clients" ON public.clients FOR INSERT TO anon, authenticated WITH CHECK (true);

-- Automation modules catalog
CREATE TABLE public.automation_modules (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  description TEXT,
  base_price NUMERIC(10,2) NOT NULL DEFAULT 0,
  category public.module_category_enum NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.automation_modules ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can read modules" ON public.automation_modules FOR SELECT TO anon, authenticated USING (true);

INSERT INTO public.automation_modules (code, name, description, base_price, category) VALUES
  ('attendance_agent', 'Agente de Atendimento', 'Atendimento automatizado 24/7', 497.00, 'agent'),
  ('sales_agent', 'Agente de Vendas', 'Qualificação e fechamento de vendas', 597.00, 'agent'),
  ('support_agent', 'Agente de Suporte', 'Suporte técnico inteligente', 497.00, 'agent'),
  ('faq_ai', 'FAQ Inteligente', 'IA responde dúvidas frequentes', 197.00, 'feature'),
  ('technical_ai', 'Base Técnica Avançada', 'Repertório técnico do seu negócio', 297.00, 'feature'),
  ('auto_scheduling', 'Agendamento Automático', 'IA agenda compromissos', 247.00, 'feature'),
  ('automatic_reminders', 'Lembretes Automáticos', 'Envio de lembretes', 147.00, 'feature'),
  ('whatsapp_group_notifications', 'Grupo WhatsApp', 'Notificações e resumos em grupo', 197.00, 'feature'),
  ('media_sending', 'Envio de Mídia', 'PDFs, imagens e arquivos', 197.00, 'feature'),
  ('bulk_messaging', 'Disparo em Massa', 'Ativação e disparo de contatos', 297.00, 'feature');

-- Quotes
CREATE TABLE public.quotes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID NOT NULL REFERENCES public.clients(id) ON DELETE CASCADE,
  agents_quantity public.agents_quantity_enum NOT NULL,
  subtotal NUMERIC(10,2) NOT NULL DEFAULT 0,
  total_price NUMERIC(10,2) NOT NULL DEFAULT 0,
  status TEXT NOT NULL DEFAULT 'rascunho',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.quotes ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can insert quotes" ON public.quotes FOR INSERT TO anon, authenticated WITH CHECK (true);
CREATE POLICY "Public can update own draft quotes via id" ON public.quotes FOR UPDATE TO anon, authenticated USING (status = 'rascunho') WITH CHECK (status = 'rascunho');

-- Quote modules
CREATE TABLE public.quote_modules (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  quote_id UUID NOT NULL REFERENCES public.quotes(id) ON DELETE CASCADE,
  module_id UUID NOT NULL REFERENCES public.automation_modules(id),
  module_price NUMERIC(10,2) NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.quote_modules ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can insert quote modules" ON public.quote_modules FOR INSERT TO anon, authenticated WITH CHECK (true);

-- Sales pipeline
CREATE TABLE public.sales_pipeline (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  client_id UUID NOT NULL REFERENCES public.clients(id) ON DELETE CASCADE,
  current_stage TEXT NOT NULL DEFAULT 'novo_lead',
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.sales_pipeline ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Public can insert pipeline entries" ON public.sales_pipeline FOR INSERT TO anon, authenticated WITH CHECK (true);

CREATE INDEX idx_quotes_client_id ON public.quotes(client_id);
CREATE INDEX idx_quote_modules_quote_id ON public.quote_modules(quote_id);
CREATE INDEX idx_sales_pipeline_client_id ON public.sales_pipeline(client_id);
