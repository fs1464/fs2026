/*
  # Funding Module Schema

  Creates the complete data model for the Funding tab with three sub-modules:
  Deals (founders <-> investors), Cohorts (incubators/accelerators),
  and Grants (grant providers). Includes bookmarks and analytics events.

  1. New Tables
    - `deals` - Investment deal listings posted by founders/investors with
      business details, revenue, funding ask, equity, stage, industry.
    - `cohorts` - Incubator/accelerator cohort programs with benefits,
      deadlines, eligibility, and application info.
    - `grants` - Grant opportunities listed by organizations with eligibility
      and deadline info.
    - `funding_bookmarks` - Per-user saved listings across all 3 entity types.
    - `funding_events` - Append-only analytics log (impressions, clicks,
      saves, applications).

  2. Security
    - RLS enabled on ALL tables.
    - Public (authenticated) read access only to records where status='active'
      (or where the caller owns the record).
    - Only owners can insert / update / delete their records.
    - Bookmarks and events are scoped to the acting user.

  3. Indexes
    - Performance indexes on created_at, funding_ask, deadline, status,
      and owner columns for fast filtering/pagination.

  4. Important Notes
    - `status` uses a text check constraint for forward-compatible extension.
    - `funding_events` is append-only; no update/delete policies are defined.
    - Bookmarks use a composite unique constraint to guarantee idempotency.
*/

CREATE TABLE IF NOT EXISTS deals (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_by uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  business_name text NOT NULL DEFAULT '',
  description text NOT NULL DEFAULT '',
  revenue numeric NOT NULL DEFAULT 0,
  funding_ask numeric NOT NULL DEFAULT 0,
  equity_offered numeric NOT NULL DEFAULT 0,
  stage text NOT NULL DEFAULT 'idea' CHECK (stage IN ('idea','mvp','early','growth','scale')),
  industry text NOT NULL DEFAULT '',
  location text NOT NULL DEFAULT '',
  traction_metrics jsonb NOT NULL DEFAULT '{}'::jsonb,
  attachments jsonb NOT NULL DEFAULT '[]'::jsonb,
  status text NOT NULL DEFAULT 'draft' CHECK (status IN ('draft','active','closed')),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_deals_status_created ON deals(status, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_deals_funding_ask ON deals(funding_ask);
CREATE INDEX IF NOT EXISTS idx_deals_created_by ON deals(created_by);

ALTER TABLE deals ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view active deals"
  ON deals FOR SELECT TO authenticated
  USING (status = 'active' OR auth.uid() = created_by);

CREATE POLICY "Users insert own deals"
  ON deals FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Users update own deals"
  ON deals FOR UPDATE TO authenticated
  USING (auth.uid() = created_by)
  WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Users delete own deals"
  ON deals FOR DELETE TO authenticated
  USING (auth.uid() = created_by);

CREATE TABLE IF NOT EXISTS cohorts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_by uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  organization_name text NOT NULL DEFAULT '',
  program_name text NOT NULL DEFAULT '',
  description text NOT NULL DEFAULT '',
  benefits jsonb NOT NULL DEFAULT '[]'::jsonb,
  equity_taken numeric DEFAULT 0,
  stipend numeric DEFAULT 0,
  start_date date,
  end_date date,
  application_deadline date,
  location text NOT NULL DEFAULT '',
  eligibility_criteria jsonb NOT NULL DEFAULT '[]'::jsonb,
  application_link text NOT NULL DEFAULT '',
  status text NOT NULL DEFAULT 'active' CHECK (status IN ('draft','active','closed','expired')),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_cohorts_status_deadline ON cohorts(status, application_deadline);
CREATE INDEX IF NOT EXISTS idx_cohorts_created_by ON cohorts(created_by);

ALTER TABLE cohorts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view active cohorts"
  ON cohorts FOR SELECT TO authenticated
  USING (status = 'active' OR auth.uid() = created_by);

CREATE POLICY "Users insert own cohorts"
  ON cohorts FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Users update own cohorts"
  ON cohorts FOR UPDATE TO authenticated
  USING (auth.uid() = created_by)
  WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Users delete own cohorts"
  ON cohorts FOR DELETE TO authenticated
  USING (auth.uid() = created_by);

CREATE TABLE IF NOT EXISTS grants (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_by uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title text NOT NULL DEFAULT '',
  provider_name text NOT NULL DEFAULT '',
  description text NOT NULL DEFAULT '',
  grant_amount numeric NOT NULL DEFAULT 0,
  eligibility jsonb NOT NULL DEFAULT '[]'::jsonb,
  deadline date,
  application_link text NOT NULL DEFAULT '',
  tags jsonb NOT NULL DEFAULT '[]'::jsonb,
  status text NOT NULL DEFAULT 'active' CHECK (status IN ('draft','active','closed','expired')),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_grants_status_deadline ON grants(status, deadline);
CREATE INDEX IF NOT EXISTS idx_grants_created_by ON grants(created_by);

ALTER TABLE grants ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public can view active grants"
  ON grants FOR SELECT TO authenticated
  USING (status = 'active' OR auth.uid() = created_by);

CREATE POLICY "Users insert own grants"
  ON grants FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Users update own grants"
  ON grants FOR UPDATE TO authenticated
  USING (auth.uid() = created_by)
  WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Users delete own grants"
  ON grants FOR DELETE TO authenticated
  USING (auth.uid() = created_by);

CREATE TABLE IF NOT EXISTS funding_bookmarks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  entity_type text NOT NULL CHECK (entity_type IN ('deal','cohort','grant')),
  entity_id uuid NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, entity_type, entity_id)
);

CREATE INDEX IF NOT EXISTS idx_funding_bookmarks_user ON funding_bookmarks(user_id, entity_type);

ALTER TABLE funding_bookmarks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users view own bookmarks"
  ON funding_bookmarks FOR SELECT TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users create own bookmarks"
  ON funding_bookmarks FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users delete own bookmarks"
  ON funding_bookmarks FOR DELETE TO authenticated
  USING (auth.uid() = user_id);

CREATE TABLE IF NOT EXISTS funding_events (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
  entity_type text NOT NULL CHECK (entity_type IN ('deal','cohort','grant')),
  entity_id uuid NOT NULL,
  event_type text NOT NULL CHECK (event_type IN ('impression','click','save','application')),
  metadata jsonb NOT NULL DEFAULT '{}'::jsonb,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS idx_funding_events_entity ON funding_events(entity_type, entity_id, created_at DESC);
CREATE INDEX IF NOT EXISTS idx_funding_events_user ON funding_events(user_id);

ALTER TABLE funding_events ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users insert own events"
  ON funding_events FOR INSERT TO authenticated
  WITH CHECK (user_id IS NULL OR auth.uid() = user_id);

CREATE POLICY "Owners view events for their entities"
  ON funding_events FOR SELECT TO authenticated
  USING (
    auth.uid() = user_id
    OR (entity_type = 'deal' AND EXISTS (SELECT 1 FROM deals d WHERE d.id = entity_id AND d.created_by = auth.uid()))
    OR (entity_type = 'cohort' AND EXISTS (SELECT 1 FROM cohorts c WHERE c.id = entity_id AND c.created_by = auth.uid()))
    OR (entity_type = 'grant' AND EXISTS (SELECT 1 FROM grants g WHERE g.id = entity_id AND g.created_by = auth.uid()))
  );
