-- Store a public logo URL for each company. Influencer avatars use profiles.avatar_url.
alter table public.companies
  add column if not exists logo_url text;

-- Separate public buckets for brand logos and creator avatars.
insert into storage.buckets (id, name, public, file_size_limit, allowed_mime_types)
values
  ('company-logos', 'company-logos', true, 5242880, array['image/png','image/jpeg','image/webp','image/avif']),
  ('influencer-avatars', 'influencer-avatars', true, 5242880, array['image/png','image/jpeg','image/webp','image/avif'])
on conflict (id) do update
set public = excluded.public,
    file_size_limit = excluded.file_size_limit,
    allowed_mime_types = excluded.allowed_mime_types;

-- Public display is required for logos/avatars used in public-facing profiles.
drop policy if exists "public read company logos" on storage.objects;
create policy "public read company logos"
on storage.objects for select
to public
using (bucket_id = 'company-logos');

drop policy if exists "public read influencer avatars" on storage.objects;
create policy "public read influencer avatars"
on storage.objects for select
to public
using (bucket_id = 'influencer-avatars');

-- Authenticated users may manage only files in a folder named with their own auth UID.
drop policy if exists "users upload own company logo" on storage.objects;
create policy "users upload own company logo"
on storage.objects for insert
to authenticated
with check (
  bucket_id = 'company-logos'
  and (storage.foldername(name))[1] = auth.uid()::text
);

drop policy if exists "users update own company logo" on storage.objects;
create policy "users update own company logo"
on storage.objects for update
to authenticated
using (
  bucket_id = 'company-logos'
  and (storage.foldername(name))[1] = auth.uid()::text
)
with check (
  bucket_id = 'company-logos'
  and (storage.foldername(name))[1] = auth.uid()::text
);

drop policy if exists "users delete own company logo" on storage.objects;
create policy "users delete own company logo"
on storage.objects for delete
to authenticated
using (
  bucket_id = 'company-logos'
  and (storage.foldername(name))[1] = auth.uid()::text
);

drop policy if exists "users upload own influencer avatar" on storage.objects;
create policy "users upload own influencer avatar"
on storage.objects for insert
to authenticated
with check (
  bucket_id = 'influencer-avatars'
  and (storage.foldername(name))[1] = auth.uid()::text
);

drop policy if exists "users update own influencer avatar" on storage.objects;
create policy "users update own influencer avatar"
on storage.objects for update
to authenticated
using (
  bucket_id = 'influencer-avatars'
  and (storage.foldername(name))[1] = auth.uid()::text
)
with check (
  bucket_id = 'influencer-avatars'
  and (storage.foldername(name))[1] = auth.uid()::text
);

drop policy if exists "users delete own influencer avatar" on storage.objects;
create policy "users delete own influencer avatar"
on storage.objects for delete
to authenticated
using (
  bucket_id = 'influencer-avatars'
  and (storage.foldername(name))[1] = auth.uid()::text
);
