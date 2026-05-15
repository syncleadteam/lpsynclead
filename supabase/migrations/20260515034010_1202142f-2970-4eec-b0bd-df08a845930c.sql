CREATE OR REPLACE FUNCTION public.submit_lead_quote(
  _client jsonb,
  _agents_quantity agents_quantity_enum,
  _module_codes text[],
  _observations text
)
RETURNS jsonb
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  v_client_id uuid;
  v_quote_id uuid;
  v_total numeric := 0;
  v_modules jsonb;
BEGIN
  INSERT INTO public.clients (client_name, phone, email, company_name, business_sector)
  VALUES (
    _client->>'client_name',
    _client->>'phone',
    _client->>'email',
    _client->>'company_name',
    _client->>'business_sector'
  )
  RETURNING id INTO v_client_id;

  INSERT INTO public.quotes (client_id, agents_quantity, status, observations)
  VALUES (v_client_id, _agents_quantity, 'rascunho', NULLIF(trim(_observations), ''))
  RETURNING id INTO v_quote_id;

  WITH ins AS (
    INSERT INTO public.quote_modules (quote_id, module_id, module_price)
    SELECT v_quote_id, m.id, m.base_price
    FROM public.automation_modules m
    WHERE m.code = ANY(_module_codes)
    RETURNING module_id, module_price
  )
  SELECT
    COALESCE(SUM(i.module_price), 0),
    COALESCE(jsonb_agg(jsonb_build_object('code', m.code, 'name', m.name, 'price', i.module_price) ORDER BY m.category, m.code), '[]'::jsonb)
  INTO v_total, v_modules
  FROM ins i
  JOIN public.automation_modules m ON m.id = i.module_id;

  UPDATE public.quotes
  SET subtotal = v_total, total_price = v_total
  WHERE id = v_quote_id;

  INSERT INTO public.sales_pipeline (client_id, current_stage)
  VALUES (v_client_id, 'novo_lead');

  RETURN jsonb_build_object(
    'quoteId', v_quote_id,
    'modules', v_modules,
    'total', v_total
  );
END;
$$;

GRANT EXECUTE ON FUNCTION public.submit_lead_quote(jsonb, agents_quantity_enum, text[], text) TO anon, authenticated;