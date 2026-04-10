-- ============================================
-- EleFEL: Licenses table migration
-- Run this in Neon SQL Editor
-- ============================================

-- 1. Create licenses table
CREATE TABLE IF NOT EXISTS licenses (
  id           bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  license_key  text        NOT NULL UNIQUE,
  client_name  text        NOT NULL,
  client_email text        NOT NULL DEFAULT '',
  client_phone text        NOT NULL DEFAULT '',
  status       text        NOT NULL DEFAULT 'active'
                           CHECK (status IN ('active', 'inactive')),
  created_at   timestamptz NOT NULL DEFAULT now(),
  expires_at   timestamptz NOT NULL,
  notes        text        NOT NULL DEFAULT ''
);

-- 2. Indexes for common queries
CREATE INDEX IF NOT EXISTS idx_licenses_license_key ON licenses (license_key);
CREATE INDEX IF NOT EXISTS idx_licenses_status      ON licenses (status);
CREATE INDEX IF NOT EXISTS idx_licenses_created_at  ON licenses (created_at DESC);
