-- Allow an authenticated creator to respond only to their own pending invitation.
-- Creators may change INVITED to ACCEPTED or DECLINED, but cannot use this
-- policy to modify another creator's assignment or set unrelated statuses.
ALTER TABLE public.campaign_creators ENABLE ROW LEVEL SECURITY;

DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1
    FROM pg_policies
    WHERE schemaname = 'public'
      AND tablename = 'campaign_creators'
      AND policyname = 'Creators can respond to own campaign invitations'
  ) THEN
    CREATE POLICY "Creators can respond to own campaign invitations"
      ON public.campaign_creators
      FOR UPDATE
      TO authenticated
      USING (
        influencer_id = (SELECT auth.uid())
        AND status = 'INVITED'
      )
      WITH CHECK (
        influencer_id = (SELECT auth.uid())
        AND status IN ('ACCEPTED', 'DECLINED')
      );
  END IF;
END
$$;
