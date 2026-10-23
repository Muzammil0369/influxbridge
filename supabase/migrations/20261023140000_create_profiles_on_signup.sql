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

  return new;
end;
$$;

revoke all on function public.handle_new_auth_user() from public, anon, authenticated;

drop trigger if exists on_auth_user_created_influxbridge on auth.users;
create trigger on_auth_user_created_influxbridge
after insert on auth.users
for each row execute function public.handle_new_auth_user();
