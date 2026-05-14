ALTER TABLE public.quotes ADD COLUMN IF NOT EXISTS observations TEXT;

INSERT INTO public.automation_modules (code, name, description, base_price, category)
SELECT 'followup', 'Follow Up', 'Acompanhamento automático de leads e clientes após contato', 197.00, category
FROM public.automation_modules WHERE code = 'faq_ai'
ON CONFLICT DO NOTHING;