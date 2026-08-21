CREATE TABLE IF NOT EXISTS early_access_leads (
  id TEXT PRIMARY KEY NOT NULL,
  name TEXT NOT NULL,
  email TEXT,
  phone TEXT,
  interest TEXT NOT NULL,
  source_path TEXT NOT NULL DEFAULT '/contact',
  consent_at TEXT NOT NULL,
  created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
  CHECK (length(name) BETWEEN 2 AND 100),
  CHECK (email IS NOT NULL OR phone IS NOT NULL)
);

CREATE UNIQUE INDEX IF NOT EXISTS idx_early_access_email
  ON early_access_leads(email)
  WHERE email IS NOT NULL;

CREATE INDEX IF NOT EXISTS idx_early_access_created
  ON early_access_leads(created_at DESC);

CREATE INDEX IF NOT EXISTS idx_early_access_interest
  ON early_access_leads(interest);
