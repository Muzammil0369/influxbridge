-- Add structured campaign brief fields used by Admin → Campaigns matching.
-- Additive and safe for existing campaign rows; existing values remain intact.
ALTER TABLE public.campaigns
  ADD COLUMN IF NOT EXISTS target_niche text,
  ADD COLUMN IF NOT EXISTS target_country text,
  ADD COLUMN IF NOT EXISTS target_city text,
  ADD COLUMN IF NOT EXISTS target_audience text,
  ADD COLUMN IF NOT EXISTS platforms text[] NOT NULL DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS content_formats text[] NOT NULL DEFAULT '{}',
  ADD COLUMN IF NOT EXISTS start_date date,
  ADD COLUMN IF NOT EXISTS end_date date,
  ADD COLUMN IF NOT EXISTS is_in_person_event boolean NOT NULL DEFAULT false;

COMMENT ON COLUMN public.campaigns.target_niche IS 'Target creator niche used for transparent creator matching.';
COMMENT ON COLUMN public.campaigns.target_country IS 'Target audience or campaign country.';
COMMENT ON COLUMN public.campaigns.target_city IS 'Target city; required for in-person/event campaigns.';
COMMENT ON COLUMN public.campaigns.target_audience IS 'Description of the campaign target audience.';
COMMENT ON COLUMN public.campaigns.platforms IS 'Requested social platforms, e.g. Instagram, TikTok, YouTube.';
COMMENT ON COLUMN public.campaigns.content_formats IS 'Requested deliverable formats, e.g. Reels, Stories, Shorts, in-person appearance.';
COMMENT ON COLUMN public.campaigns.is_in_person_event IS 'Whether creators must attend an in-person event.';
