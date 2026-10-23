-- Preserve a numeric budget in the dedicated leads.budget column while retaining
-- the original budget range in notes for display and later review.
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
  budget_number numeric(12,2);
  budget_digits text;
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

  -- Numeric values and ranges such as "$1,000–$2,000" are supported.
  -- Store the first amount numerically; the full entered value remains in notes.
  budget_digits := regexp_replace(coalesce(safe_budget, ''), ',', '', 'g');
  IF budget_digits ~ '[0-9]+([.][0-9]{1,2})?' THEN
    budget_number := substring(budget_digits from '([0-9]+([.][0-9]{1,2})?)')::numeric;
    IF budget_number < 0 OR budget_number > 9999999999.99 THEN
      RAISE EXCEPTION 'Budget is outside the supported range.';
    END IF;
  END IF;

  INSERT INTO public.leads (
    company_name, contact_email, website_url, budget, currency, notes, source, status
  ) VALUES (
    safe_company,
    safe_email,
    safe_website,
    budget_number,
    'USD',
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

-- Save influencer inquiries as leads too, so they are visible in Admin > Leads
-- and do not depend on the visitor having a configured email application.
CREATE OR REPLACE FUNCTION public.submit_public_influencer_inquiry(
  p_name text,
  p_email text,
  p_niche text,
  p_profile text,
  p_message text
)
RETURNS uuid
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, pg_temp
AS $function$
DECLARE
  new_lead_id uuid;
  safe_name text := btrim(coalesce(p_name, ''));
  safe_email text := lower(btrim(coalesce(p_email, '')));
  safe_niche text := nullif(btrim(coalesce(p_niche, '')), '');
  safe_profile text := nullif(btrim(coalesce(p_profile, '')), '');
  safe_message text := btrim(coalesce(p_message, ''));
BEGIN
  IF length(safe_name) < 2 OR length(safe_name) > 160 THEN
    RAISE EXCEPTION 'Please provide a name between 2 and 160 characters.';
  END IF;
  IF length(safe_email) > 254 OR safe_email !~* '^[A-Z0-9._%+\-]+@[A-Z0-9.\-]+\.[A-Z]{2,}$' THEN
    RAISE EXCEPTION 'Please provide a valid email address.';
  END IF;
  IF length(coalesce(safe_niche, '')) > 120 OR length(coalesce(safe_profile, '')) > 500 THEN
    RAISE EXCEPTION 'Niche or social profile is too long.';
  END IF;
  IF safe_profile IS NOT NULL AND safe_profile !~* '^https?://' THEN
    RAISE EXCEPTION 'Social profile URL must begin with http:// or https://.';
  END IF;
  IF length(safe_message) < 5 OR length(safe_message) > 3000 THEN
    RAISE EXCEPTION 'Message must be between 5 and 3000 characters.';
  END IF;

  INSERT INTO public.leads (
    company_name, contact_email, website_url, notes, source, status
  ) VALUES (
    safe_name,
    safe_email,
    safe_profile,
    concat_ws(E'\n\n',
      'Inquiry type: Influencer',
      CASE WHEN safe_niche IS NOT NULL THEN 'Niche: ' || safe_niche END,
      CASE WHEN safe_profile IS NOT NULL THEN 'Social profile: ' || safe_profile END,
      'Message: ' || safe_message
    ),
    'influencer_website',
    'NEW'
  )
  RETURNING id INTO new_lead_id;

  RETURN new_lead_id;
END;
$function$;

REVOKE ALL ON FUNCTION public.submit_public_influencer_inquiry(text, text, text, text, text) FROM PUBLIC, anon, authenticated;
GRANT EXECUTE ON FUNCTION public.submit_public_influencer_inquiry(text, text, text, text, text) TO anon, authenticated;
