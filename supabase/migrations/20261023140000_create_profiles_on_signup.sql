-- Create application profiles automatically for self-service signups.
-- The client may request COMPANY or INFLUENCER, but can never self-assign ADMIN.
create or replace function public.handle_new_auth_user()
returns trigger
language plpgsql
security definer
set search_path = public, pg_temp
as $$
declare
  requested_role text;
  new_company_id uuid;
begin
  requested_role := upper(coalesce(new.raw_user_meta_data ->> 'role', 'INFLUENCER'));

  if requested_role not in ('COMPANY', 'INFLUENCER') then
    requested_role := 'INFLUENCER';
  end if;

  insert into public.profiles (id, role, full_name)
  values (
    new.id,
    requested_role::public.user_role,
    nullif(trim(coalesce(new.raw_user_meta_data ->> 'full_name', '')), '')
  )
  on conflict (id) do nothing;

  if requested_role = 'COMPANY' then
    insert into public.companies (name, website_url, description)
    values (
      coalesce(nullif(trim(new.raw_user_meta_data ->> 'company_name'), ''), 'New company'),
      nullif(trim(coalesce(new.raw_user_meta_data ->> 'website_url', '')), ''),
      nullif(trim(coalesce(new.raw_user_meta_data ->> 'description', '')), '')
    )
    returning id into new_company_id;

    insert into public.company_members (company_id, user_id, role)
    values (new_company_id, new.id, 'OWNER')
    on conflict (company_id, user_id) do nothing;
  end if;

  return new;
end;
$$;

revoke all on function public.handle_new_auth_user() from public, anon, authenticated;

drop trigger if exists on_auth_user_created_influxbridge on auth.users;
create trigger on_auth_user_created_influxbridge
after insert on auth.users
for each row execute function public.handle_new_auth_user();


-- Allow a company owner to save only their own public logo URL.
create or replace function public.set_company_logo(p_logo_url text)
returns void
language plpgsql
security definer
set search_path = public, pg_temp
as $$
begin
  if auth.uid() is null then
    raise exception 'Authentication required';
  end if;

  if p_logo_url is null or length(trim(p_logo_url)) = 0 then
    raise exception 'A logo URL is required';
  end if;

  update public.companies c
  set logo_url = trim(p_logo_url),
      updated_at = now()
  where exists (
    select 1
    from public.company_members cm
    where cm.company_id = c.id
      and cm.user_id = auth.uid()
      and cm.role = 'OWNER'
  );

  if not found then
    raise exception 'No company workspace is linked to this account';
  end if;
end;
$$;

revoke all on function public.set_company_logo(text) from public, anon;
grant execute on function public.set_company_logo(text) to authenticated;
