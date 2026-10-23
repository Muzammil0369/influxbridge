-- Safely accept public website enquiries without granting anonymous users direct table access.
CREATE OR REPLACE FUNCTION public.submit_public_lead(
  p_company_name text,
  p_contact_email text,
  p_website_url text,
  p_services text,
  p_budget text,
  p_duration text,
  p_project_overview text
)
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $function$
DECLARE
  new_lead_id uuid;
  safe_company text := btrim(coalesce(p_company_name, ''));
  safe_email text := lower(btrim(coalesce(p_contact_email, '')));
  safe_website text := nullif(btrim(coalesce(p_website_url, '')), '');
  safe_services text := nullif(btrim(coalesce(p_services, '')), '');
  safe_budget text := nullif(btrim(coalesce(p_budget, '')), '');
  safe_duration text := nullif(btrim(coalesce(p_duration, '')), '');
  safe_overview text := btrim(coalesce(p_project_overview, ''));
BEGIN
  IF length(safe_company) < 2 OR length(safe_company) > 160 THEN
    RAISE EXCEPTION 'Please provide a company name between 2 and 160 characters.';
  END IF;
  IF length(safe_email) > 254 OR safe_email !~* '^[A-Z0-9._%+\-]+@[A-Z0-9.\-]+\.[A-Z]{2,}$' THEN
    RAISE EXCEPTION 'Please provide a valid work email address.';
  END IF;
  IF safe_website IS NOT NULL AND (length(safe_website) > 300 OR safe_website !~* '^https?://') THEN
    RAISE EXCEPTION 'Website must begin with http:// or https://.';
  END IF;
  IF length(safe_overview) < 10 OR length(safe_overview) > 5000 THEN
    RAISE EXCEPTION 'Project overview must be between 10 and 5000 characters.';
  END IF;
  IF length(coalesce(safe_services, '')) > 500 OR length(coalesce(safe_budget, '')) > 120 OR length(coalesce(safe_duration, '')) > 120 THEN
    RAISE EXCEPTION 'One or more optional fields are too long.';
  END IF;

  INSERT INTO public.leads (
    company_name, contact_email, website_url, notes, source, status
  ) VALUES (
    safe_company,
    safe_email,
    safe_website,
    concat_ws(E'\n\n',
      CASE WHEN safe_services IS NOT NULL THEN 'Services requested: ' || safe_services END,
      CASE WHEN safe_budget IS NOT NULL THEN 'Estimated budget: ' || safe_budget END,
      CASE WHEN safe_duration IS NOT NULL THEN 'Campaign duration: ' || safe_duration END,
      'Project overview: ' || safe_overview
    ),
    'website',
    'NEW'
  )
  RETURNING id INTO new_lead_id;

  RETURN new_lead_id;
END;
$function$;

REVOKE ALL ON FUNCTION public.submit_public_lead(text, text, text, text, text, text, text) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.submit_public_lead(text, text, text, text, text, text, text) TO anon, authenticated;
