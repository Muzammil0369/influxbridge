-- Allow authenticated company members to discover active creator profiles.
-- Keep draft, submitted, suspended and archived profiles private from companies.
create policy "influencer_profiles_select_active_for_company"
on public.influencer_profiles
for select
to authenticated
using (
  profile_status = 'ACTIVE'
  and exists (
    select 1
    from public.company_members cm
    where cm.user_id = auth.uid()
  )
);

-- Expose social-account summary data only for active creators while the
-- viewer is a member of a company. Creator owners and admins retain existing policies.
create policy "social_accounts_select_active_for_company"
on public.social_accounts
for select
to authenticated
using (
  exists (
    select 1
    from public.influencer_profiles ip
    where ip.id = social_accounts.influencer_id
      and ip.profile_status = 'ACTIVE'
  )
  and exists (
    select 1
    from public.company_members cm
    where cm.user_id = auth.uid()
  )
);
