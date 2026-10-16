-- ============================================================
-- InfluxBridge — Initial Database Schema
-- Step 1: Extensions, enums, and profiles
-- ============================================================

create extension if not exists "pgcrypto";

-- ============================================================
-- ENUMS
-- ============================================================

create type public.user_role as enum (
  'ADMIN',
  'COMPANY',
  'INFLUENCER'
);

create type public.company_status as enum (
  'ACTIVE',
  'INACTIVE',
  'SUSPENDED'
);

create type public.company_member_role as enum (
  'OWNER',
  'MEMBER'
);

create type public.influencer_verification_status as enum (
  'PENDING',
  'APPROVED',
  'REJECTED'
);

create type public.influencer_profile_status as enum (
  'DRAFT',
  'SUBMITTED',
  'ACTIVE',
  'SUSPENDED',
  'ARCHIVED'
);

-- ============================================================
-- PROFILES
-- Links Supabase Auth users to application-level roles.
-- ============================================================

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,

  role public.user_role not null,

  full_name text,
  avatar_url text,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index profiles_role_idx
  on public.profiles(role);

-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================

alter table public.profiles enable row level security;

-- Users can read their own profile.
create policy "profiles_select_own"
on public.profiles
for select
to authenticated
using (
  id = auth.uid()
);

-- Users can update their own non-sensitive profile fields.
create policy "profiles_update_own"
on public.profiles
for update
to authenticated
using (
  id = auth.uid()
)
with check (
  id = auth.uid()
);
-- ============================================================
-- COMPANIES
-- ============================================================

create table public.companies (
  id uuid primary key default gen_random_uuid(),

  name text not null,
  legal_name text,

  website_url text,
  description text,

  status public.company_status not null default 'ACTIVE',

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index companies_status_idx
  on public.companies(status);


-- ============================================================
-- COMPANY MEMBERS
-- ============================================================

create table public.company_members (
  company_id uuid not null
    references public.companies(id)
    on delete cascade,

  user_id uuid not null
    references public.profiles(id)
    on delete cascade,

  role public.company_member_role not null default 'MEMBER',

  created_at timestamptz not null default now(),

  primary key (company_id, user_id)
);

create index company_members_user_idx
  on public.company_members(user_id);


-- ============================================================
-- INFLUENCER PROFILES
-- ============================================================

create table public.influencer_profiles (
  id uuid primary key references public.profiles(id) on delete cascade,

  display_name text not null,

  bio text,
  location text,

  niche text,
  languages text[],

  verification_status public.influencer_verification_status
    not null default 'PENDING',

  profile_status public.influencer_profile_status
    not null default 'DRAFT',

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index influencer_profiles_verification_idx
  on public.influencer_profiles(verification_status);

create index influencer_profiles_status_idx
  on public.influencer_profiles(profile_status);


-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================

alter table public.companies enable row level security;

alter table public.company_members enable row level security;

alter table public.influencer_profiles enable row level security;


-- ============================================================
-- COMPANY POLICIES
-- ============================================================

create policy "companies_select_member"
on public.companies
for select
to authenticated
using (
  exists (
    select 1
    from public.company_members cm
    where cm.company_id = companies.id
      and cm.user_id = auth.uid()
  )
);


create policy "company_members_select_own"
on public.company_members
for select
to authenticated
using (
  user_id = auth.uid()
);


-- ============================================================
-- INFLUENCER POLICIES
-- ============================================================

create policy "influencer_profiles_select_own"
on public.influencer_profiles
for select
to authenticated
using (
  id = auth.uid()
);


create policy "influencer_profiles_insert_own"
on public.influencer_profiles
for insert
to authenticated
with check (
  id = auth.uid()
);


create policy "influencer_profiles_update_own"
on public.influencer_profiles
for update
to authenticated
using (
  id = auth.uid()
)
with check (
  id = auth.uid()
);
-- ============================================================
-- SOCIAL ACCOUNTS
-- ============================================================

create type public.social_platform as enum (
  'X',
  'INSTAGRAM',
  'YOUTUBE',
  'TIKTOK'
);

create table public.social_accounts (
  id uuid primary key default gen_random_uuid(),

  influencer_id uuid not null
    references public.influencer_profiles(id)
    on delete cascade,

  platform public.social_platform not null,

  username text not null,
  profile_url text,

  followers_count bigint not null default 0,
  engagement_rate numeric(5,2),

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  unique (influencer_id, platform)
);

create index social_accounts_influencer_idx
  on public.social_accounts(influencer_id);


-- ============================================================
-- LEADS
-- ============================================================

create table public.leads (
  id uuid primary key default gen_random_uuid(),

  company_name text not null,
  contact_name text,
  contact_email text,

  website_url text,

  budget numeric(12,2),
  currency text not null default 'USD',

  source text,
  notes text,

  status text not null default 'NEW',

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index leads_status_idx
  on public.leads(status);

create index leads_created_at_idx
  on public.leads(created_at desc);


-- ============================================================
-- CAMPAIGNS
-- ============================================================

create type public.campaign_status as enum (
  'ACTIVE',
  'IN_REVIEW',
  'COMPLETED'
);

create type public.campaign_phase as enum (
  'BRIEF',
  'CREATOR_ASSIGNMENT',
  'DELIVERABLES',
  'REVIEW',
  'PUBLICATION',
  'PERFORMANCE',
  'PAYMENT',
  'COMPLETED'
);

create table public.campaigns (
  id uuid primary key default gen_random_uuid(),

  company_id uuid not null
    references public.companies(id)
    on delete restrict,

  name text not null,
  description text,

  budget numeric(12,2),
  currency text not null default 'USD',

  status public.campaign_status not null default 'ACTIVE',
  phase public.campaign_phase not null default 'BRIEF',

  start_date date,
  deadline date,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  check (
    deadline is null
    or start_date is null
    or deadline >= start_date
  )
);

create index campaigns_company_idx
  on public.campaigns(company_id);

create index campaigns_status_idx
  on public.campaigns(status);

create index campaigns_phase_idx
  on public.campaigns(phase);

create index campaigns_deadline_idx
  on public.campaigns(deadline);


-- ============================================================
-- CAMPAIGN CREATORS
-- ============================================================

create type public.campaign_creator_status as enum (
  'INVITED',
  'ACCEPTED',
  'DECLINED',
  'ACTIVE',
  'COMPLETED',
  'REMOVED'
);

create table public.campaign_creators (
  id uuid primary key default gen_random_uuid(),

  campaign_id uuid not null
    references public.campaigns(id)
    on delete cascade,

  influencer_id uuid not null
    references public.influencer_profiles(id)
    on delete restrict,

  status public.campaign_creator_status
    not null default 'INVITED',

  assigned_at timestamptz not null default now(),

  unique (campaign_id, influencer_id)
);

create index campaign_creators_campaign_idx
  on public.campaign_creators(campaign_id);

create index campaign_creators_influencer_idx
  on public.campaign_creators(influencer_id);


-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================

alter table public.social_accounts enable row level security;

alter table public.leads enable row level security;

alter table public.campaigns enable row level security;

alter table public.campaign_creators enable row level security;


-- ============================================================
-- SOCIAL ACCOUNT POLICIES
-- ============================================================

create policy "social_accounts_select_own"
on public.social_accounts
for select
to authenticated
using (
  influencer_id = auth.uid()
);

create policy "social_accounts_insert_own"
on public.social_accounts
for insert
to authenticated
with check (
  influencer_id = auth.uid()
);

create policy "social_accounts_update_own"
on public.social_accounts
for update
to authenticated
using (
  influencer_id = auth.uid()
)
with check (
  influencer_id = auth.uid()
);


-- ============================================================
-- CAMPAIGN POLICIES
-- ============================================================

create policy "campaigns_select_company_member"
on public.campaigns
for select
to authenticated
using (
  exists (
    select 1
    from public.company_members cm
    where cm.company_id = campaigns.company_id
      and cm.user_id = auth.uid()
  )
);


create policy "campaign_creators_select_company_or_influencer"
on public.campaign_creators
for select
to authenticated
using (
  exists (
    select 1
    from public.campaigns c
    join public.company_members cm
      on cm.company_id = c.company_id
    where c.id = campaign_creators.campaign_id
      and cm.user_id = auth.uid()
  )
  or
  influencer_id = auth.uid()
);
-- ============================================================
-- DELIVERABLES
-- ============================================================

create type public.deliverable_status as enum (
  'NOT_STARTED',
  'DRAFT_SUBMITTED',
  'IN_REVIEW',
  'REVISION_REQUESTED',
  'APPROVED',
  'PUBLISHED',
  'COMPLETED'
);

create table public.deliverables (
  id uuid primary key default gen_random_uuid(),

  campaign_id uuid not null
    references public.campaigns(id)
    on delete cascade,

  influencer_id uuid not null
    references public.influencer_profiles(id)
    on delete restrict,

  title text not null,
  description text,

  status public.deliverable_status
    not null default 'NOT_STARTED',

  content_url text,
  submitted_at timestamptz,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index deliverables_campaign_idx
  on public.deliverables(campaign_id);

create index deliverables_influencer_idx
  on public.deliverables(influencer_id);

create index deliverables_status_idx
  on public.deliverables(status);


-- ============================================================
-- CONVERSATIONS
-- ============================================================

create table public.conversations (
  id uuid primary key default gen_random_uuid(),

  campaign_id uuid
    references public.campaigns(id)
    on delete set null,

  subject text,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);


-- ============================================================
-- CONVERSATION PARTICIPANTS
-- ============================================================

create table public.conversation_participants (
  conversation_id uuid not null
    references public.conversations(id)
    on delete cascade,

  user_id uuid not null
    references public.profiles(id)
    on delete cascade,

  joined_at timestamptz not null default now(),

  primary key (conversation_id, user_id)
);

create index conversation_participants_user_idx
  on public.conversation_participants(user_id);


-- ============================================================
-- MESSAGES
-- ============================================================

create table public.messages (
  id uuid primary key default gen_random_uuid(),

  conversation_id uuid not null
    references public.conversations(id)
    on delete cascade,

  sender_id uuid not null
    references public.profiles(id)
    on delete restrict,

  body text not null,

  created_at timestamptz not null default now(),

  check (length(trim(body)) > 0)
);

create index messages_conversation_created_idx
  on public.messages(conversation_id, created_at);


-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================

alter table public.deliverables enable row level security;

alter table public.conversations enable row level security;

alter table public.conversation_participants enable row level security;

alter table public.messages enable row level security;


-- ============================================================
-- DELIVERABLE POLICIES
-- ============================================================

create policy "deliverables_select_company_or_influencer"
on public.deliverables
for select
to authenticated
using (
  influencer_id = auth.uid()
  or
  exists (
    select 1
    from public.campaigns c
    join public.company_members cm
      on cm.company_id = c.company_id
    where c.id = deliverables.campaign_id
      and cm.user_id = auth.uid()
  )
);


create policy "deliverables_insert_own"
on public.deliverables
for insert
to authenticated
with check (
  influencer_id = auth.uid()
);


create policy "deliverables_update_own"
on public.deliverables
for update
to authenticated
using (
  influencer_id = auth.uid()
)
with check (
  influencer_id = auth.uid()
);


-- ============================================================
-- CONVERSATION POLICIES
-- ============================================================

create policy "conversations_select_participant"
on public.conversations
for select
to authenticated
using (
  exists (
    select 1
    from public.conversation_participants cp
    where cp.conversation_id = conversations.id
      and cp.user_id = auth.uid()
  )
);


create policy "conversation_participants_select_own"
on public.conversation_participants
for select
to authenticated
using (
  user_id = auth.uid()
);


create policy "messages_select_participant"
on public.messages
for select
to authenticated
using (
  exists (
    select 1
    from public.conversation_participants cp
    where cp.conversation_id = messages.conversation_id
      and cp.user_id = auth.uid()
  )
);


create policy "messages_insert_participant"
on public.messages
for insert
to authenticated
with check (
  sender_id = auth.uid()
  and
  exists (
    select 1
    from public.conversation_participants cp
    where cp.conversation_id = messages.conversation_id
      and cp.user_id = auth.uid()
  )
);
-- ============================================================
-- PAYMENT RECORDS
-- ============================================================

create type public.payment_status as enum (
  'PENDING',
  'PROCESSING',
  'PAID',
  'FAILED',
  'CANCELLED'
);

create table public.payment_records (
  id uuid primary key default gen_random_uuid(),

  campaign_id uuid not null
    references public.campaigns(id)
    on delete restrict,

  influencer_id uuid
    references public.influencer_profiles(id)
    on delete restrict,

  amount numeric(12,2) not null,
  currency text not null default 'USD',

  status public.payment_status not null default 'PENDING',

  reference text,

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),

  check (amount >= 0)
);

create index payment_records_campaign_idx
  on public.payment_records(campaign_id);

create index payment_records_influencer_idx
  on public.payment_records(influencer_id);

create index payment_records_status_idx
  on public.payment_records(status);


-- ============================================================
-- NOTIFICATIONS
-- ============================================================

create table public.notifications (
  id uuid primary key default gen_random_uuid(),

  user_id uuid not null
    references public.profiles(id)
    on delete cascade,

  title text not null,
  body text not null,

  read_at timestamptz,

  created_at timestamptz not null default now()
);

create index notifications_user_idx
  on public.notifications(user_id);

create index notifications_unread_idx
  on public.notifications(user_id, read_at);


-- ============================================================
-- CAMPAIGN METRICS
-- ============================================================

create table public.campaign_metrics (
  id uuid primary key default gen_random_uuid(),

  campaign_id uuid not null
    references public.campaigns(id)
    on delete cascade,

  metric_date date not null,

  impressions bigint not null default 0,
  reach bigint not null default 0,
  engagements bigint not null default 0,
  clicks bigint not null default 0,

  created_at timestamptz not null default now(),

  unique (campaign_id, metric_date),

  check (impressions >= 0),
  check (reach >= 0),
  check (engagements >= 0),
  check (clicks >= 0)
);

create index campaign_metrics_campaign_idx
  on public.campaign_metrics(campaign_id);

create index campaign_metrics_date_idx
  on public.campaign_metrics(metric_date);


-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================

alter table public.payment_records enable row level security;

alter table public.notifications enable row level security;

alter table public.campaign_metrics enable row level security;


-- ============================================================
-- PAYMENT POLICIES
-- ============================================================

create policy "payment_records_select_company_or_influencer"
on public.payment_records
for select
to authenticated
using (
  influencer_id = auth.uid()
  or
  exists (
    select 1
    from public.campaigns c
    join public.company_members cm
      on cm.company_id = c.company_id
    where c.id = payment_records.campaign_id
      and cm.user_id = auth.uid()
  )
);


-- ============================================================
-- NOTIFICATION POLICIES
-- ============================================================

create policy "notifications_select_own"
on public.notifications
for select
to authenticated
using (
  user_id = auth.uid()
);


create policy "notifications_update_own"
on public.notifications
for update
to authenticated
using (
  user_id = auth.uid()
)
with check (
  user_id = auth.uid()
);


-- ============================================================
-- CAMPAIGN METRICS POLICIES
-- ============================================================

create policy "campaign_metrics_select_company_or_creator"
on public.campaign_metrics
for select
to authenticated
using (
  exists (
    select 1
    from public.campaigns c
    join public.company_members cm
      on cm.company_id = c.company_id
    where c.id = campaign_metrics.campaign_id
      and cm.user_id = auth.uid()
  )
  or
  exists (
    select 1
    from public.campaign_creators cc
    where cc.campaign_id = campaign_metrics.campaign_id
      and cc.influencer_id = auth.uid()
  )
);
-- ============================================================
-- DOCUMENTS
-- ============================================================

create table public.documents (
  id uuid primary key default gen_random_uuid(),

  owner_id uuid not null
    references public.profiles(id)
    on delete restrict,

  campaign_id uuid
    references public.campaigns(id)
    on delete set null,

  file_name text not null,
  storage_path text not null,

  mime_type text,
  file_size bigint,

  created_at timestamptz not null default now(),

  check (file_size is null or file_size >= 0)
);

create index documents_owner_idx
  on public.documents(owner_id);

create index documents_campaign_idx
  on public.documents(campaign_id);


-- ============================================================
-- AUDIT LOGS
-- ============================================================

create table public.audit_logs (
  id uuid primary key default gen_random_uuid(),

  actor_id uuid
    references public.profiles(id)
    on delete set null,

  action text not null,

  entity_type text,
  entity_id uuid,

  metadata jsonb not null default '{}'::jsonb,

  created_at timestamptz not null default now()
);

create index audit_logs_actor_idx
  on public.audit_logs(actor_id);

create index audit_logs_entity_idx
  on public.audit_logs(entity_type, entity_id);

create index audit_logs_created_at_idx
  on public.audit_logs(created_at desc);


-- ============================================================
-- ROW LEVEL SECURITY
-- ============================================================

alter table public.documents enable row level security;

alter table public.audit_logs enable row level security;


-- ============================================================
-- DOCUMENT POLICIES
-- ============================================================

create policy "documents_select_own"
on public.documents
for select
to authenticated
using (
  owner_id = auth.uid()
);


create policy "documents_insert_own"
on public.documents
for insert
to authenticated
with check (
  owner_id = auth.uid()
);


-- ============================================================
-- AUDIT LOG POLICIES
-- ============================================================

-- Normal authenticated users cannot read audit logs.
-- Administrative access will be implemented through
-- controlled server-side/admin policies.

-- ============================================================
-- ADMIN SECURITY HELPER
-- ============================================================
--
-- This function checks the application role of the currently
-- authenticated user.
--
-- SECURITY DEFINER allows the function to safely inspect
-- profiles even when profiles has Row Level Security enabled.
--

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.profiles
    where id = auth.uid()
      and role = 'ADMIN'
  );
$$;


-- ============================================================
-- ADMIN POLICIES
-- ============================================================
--
-- Admin access is granted through the database role stored
-- in profiles, not through a browser-controlled value.
--

create policy "profiles_admin_select"
on public.profiles
for select
to authenticated
using (
  public.is_admin()
);

create policy "profiles_admin_update"
on public.profiles
for update
to authenticated
using (
  public.is_admin()
)
with check (
  public.is_admin()
);


create policy "companies_admin_all"
on public.companies
for all
to authenticated
using (
  public.is_admin()
)
with check (
  public.is_admin()
);


create policy "company_members_admin_all"
on public.company_members
for all
to authenticated
using (
  public.is_admin()
)
with check (
  public.is_admin()
);


create policy "influencer_profiles_admin_all"
on public.influencer_profiles
for all
to authenticated
using (
  public.is_admin()
)
with check (
  public.is_admin()
);


create policy "social_accounts_admin_all"
on public.social_accounts
for all
to authenticated
using (
  public.is_admin()
)
with check (
  public.is_admin()
);


create policy "leads_admin_all"
on public.leads
for all
to authenticated
using (
  public.is_admin()
)
with check (
  public.is_admin()
);


create policy "campaigns_admin_all"
on public.campaigns
for all
to authenticated
using (
  public.is_admin()
)
with check (
  public.is_admin()
);


create policy "campaign_creators_admin_all"
on public.campaign_creators
for all
to authenticated
using (
  public.is_admin()
)
with check (
  public.is_admin()
);


create policy "deliverables_admin_all"
on public.deliverables
for all
to authenticated
using (
  public.is_admin()
)
with check (
  public.is_admin()
);


create policy "conversations_admin_all"
on public.conversations
for all
to authenticated
using (
  public.is_admin()
)
with check (
  public.is_admin()
);


create policy "conversation_participants_admin_all"
on public.conversation_participants
for all
to authenticated
using (
  public.is_admin()
)
with check (
  public.is_admin()
);


create policy "messages_admin_all"
on public.messages
for all
to authenticated
using (
  public.is_admin()
)
with check (
  public.is_admin()
);


create policy "payment_records_admin_all"
on public.payment_records
for all
to authenticated
using (
  public.is_admin()
)
with check (
  public.is_admin()
);


create policy "notifications_admin_all"
on public.notifications
for all
to authenticated
using (
  public.is_admin()
)
with check (
  public.is_admin()
);


create policy "campaign_metrics_admin_all"
on public.campaign_metrics
for all
to authenticated
using (
  public.is_admin()
)
with check (
  public.is_admin()
);


create policy "documents_admin_all"
on public.documents
for all
to authenticated
using (
  public.is_admin()
)
with check (
  public.is_admin()
);


create policy "audit_logs_admin_select"
on public.audit_logs
for select
to authenticated
using (
  public.is_admin()
);