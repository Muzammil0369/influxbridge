-- InfluxBridge: restrict public API permissions on profiles.
-- This is a forward migration; do not modify the initial schema.

-- Remove browser/API access for anonymous users.
REVOKE SELECT, INSERT, UPDATE, DELETE, TRUNCATE, REFERENCES, TRIGGER
ON TABLE public.profiles FROM anon;

-- Remove broad authenticated permissions, then grant only what the app needs.
REVOKE INSERT, DELETE, TRUNCATE, REFERENCES, TRIGGER, UPDATE
ON TABLE public.profiles FROM authenticated;

-- Clear any separately granted column privileges as well.
REVOKE SELECT (id, role, full_name, avatar_url, created_at, updated_at),
        INSERT (id, role, full_name, avatar_url, created_at, updated_at),
        UPDATE (id, role, full_name, avatar_url, created_at, updated_at),
        REFERENCES (id, role, full_name, avatar_url, created_at, updated_at)
ON TABLE public.profiles FROM anon, authenticated;

-- Signed-in users can read rows permitted by RLS.
GRANT SELECT ON TABLE public.profiles TO authenticated;

-- Signed-in users can edit only ordinary profile fields.
-- The role and id columns are intentionally excluded.
GRANT UPDATE (full_name, avatar_url, updated_at)
ON TABLE public.profiles TO authenticated;
