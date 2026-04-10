-- =============================================
-- BORDERXCASH - SCHEMA SQL PURO (ORDEN CORRECTO)
-- Versión Final - Revisada y Ordenada
-- =============================================

-- =============================================
-- ENUMS
-- =============================================
CREATE TYPE kyc_status AS ENUM ('PENDING', 'VERIFIED', 'REJECTED', 'BLOCKED');
CREATE TYPE membership_tier AS ENUM ('PILOTO', 'PREMIUM', 'VIP');
CREATE TYPE ofac_status AS ENUM ('PENDING', 'CLEARED', 'FLAGGED');
CREATE TYPE membership_status AS ENUM ('ACTIVE', 'GRACE_PERIOD', 'PAUSED', 'CANCELLED');
CREATE TYPE wallet_status AS ENUM ('STUB', 'ACTIVE', 'SUSPENDED');
CREATE TYPE cashier_status AS ENUM ('ACTIVE', 'INACTIVE');
CREATE TYPE agent_status AS ENUM ('ACTIVE', 'INACTIVE', 'SUSPENDED');
CREATE TYPE spend_status AS ENUM ('PENDING', 'CONFIRMED', 'FAILED', 'REVERSED');
CREATE TYPE spend_channel AS ENUM ('CASH_VENTANILLA', 'MULTIPLICA', 'SPEI', 'CODI', 'VISA_PREPAID');
CREATE TYPE prepaid_card_status AS ENUM ('PENDING_ISSUE', 'ACTIVE', 'SUSPENDED', 'CANCELLED');
CREATE TYPE webhook_source AS ENUM ('INSTITUTION_MX', 'BANK_SPONSOR_US', 'CARD_PROCESSOR', 'BANXICO', 'INTERNAL');
CREATE TYPE webhook_result AS ENUM ('ACCEPTED', 'REJECTED_DUPLICATE', 'REJECTED_INVALID');
CREATE TYPE remittance_status AS ENUM ('PENDING', 'PROCESSING', 'SETTLED', 'FAILED');
CREATE TYPE funding_status AS ENUM ('PENDING', 'CONFIRMED', 'FAILED', 'REVERSED');
CREATE TYPE system_role AS ENUM ('SUPER_ADMIN', 'ADMIN', 'OPERATIONS', 'COMPLIANCE', 'FINANCE', 'VIEWER');
CREATE TYPE system_user_status AS ENUM ('ACTIVE', 'INACTIVE', 'SUSPENDED');
CREATE TYPE audit_action AS ENUM ('CREATE', 'UPDATE', 'DELETE', 'CONFIRM', 'REVERSE', 'CANCEL', 'APPROVE', 'REJECT');

-- =============================================
-- TABLAS (ORDEN CORRECTO)
-- =============================================

CREATE TABLE customers (
    id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    customer_id       TEXT UNIQUE NOT NULL,
    email             TEXT UNIQUE NOT NULL,
    google_id         TEXT UNIQUE,
    phone_mx          TEXT NOT NULL,
    address_mx        TEXT NOT NULL,
    curp              TEXT,
    id_type           TEXT NOT NULL,
    full_name         TEXT NOT NULL,
    referred_by_id    UUID REFERENCES customers(id),
    ofac_status       ofac_status DEFAULT 'PENDING',
    kyc_status        kyc_status DEFAULT 'PENDING',
    kyc_verified_at   TIMESTAMPTZ,
    data_consent      BOOLEAN DEFAULT false,
    data_consent_at   TIMESTAMPTZ,
    created_at        TIMESTAMPTZ DEFAULT NOW(),
    updated_at        TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE system_users (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email           TEXT UNIQUE NOT NULL,
    full_name       TEXT NOT NULL,
    role            system_role DEFAULT 'VIEWER',
    status          system_user_status DEFAULT 'ACTIVE',
    password_hash   TEXT,
    last_login_at   TIMESTAMPTZ,
    created_at      TIMESTAMPTZ DEFAULT NOW(),
    updated_at      TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE audit_logs (
    id            BIGSERIAL PRIMARY KEY,
    system_user_id UUID REFERENCES system_users(id),
    table_name    TEXT NOT NULL,
    record_id     TEXT NOT NULL,
    action        audit_action NOT NULL,
    old_data      JSONB,
    new_data      JSONB,
    description   TEXT,
    ip_address    INET,
    user_agent    TEXT,
    created_at    TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE agents (
    agent_id           UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name               TEXT NOT NULL,
    address_mx         TEXT NOT NULL,
    country            TEXT NOT NULL,
    jurisdiction       TEXT NOT NULL,
    daily_limit_usd    NUMERIC(15,2) NOT NULL,
    per_txn_limit_usd  NUMERIC(15,2) NOT NULL,
    status             agent_status DEFAULT 'ACTIVE',
    can_approve_ctr    BOOLEAN DEFAULT false,
    created_at         TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE cashier_users (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    agent_id        UUID NOT NULL REFERENCES agents(agent_id),
    email           TEXT UNIQUE NOT NULL,
    username        TEXT UNIQUE NOT NULL,           -- ← Agregado
    password_hash   TEXT NOT NULL,                  -- ← Agregado
    full_name       TEXT NOT NULL,
    status          cashier_status DEFAULT 'ACTIVE',
    last_login_at   TIMESTAMPTZ,
    created_at      TIMESTAMPTZ DEFAULT NOW(),
    updated_at      TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE memberships (
    id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    customer_id       UUID UNIQUE NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
    tier              membership_tier DEFAULT 'PILOTO',
    status            membership_status DEFAULT 'ACTIVE',
    monthly_fee_usd   NUMERIC(10,2) DEFAULT 6.00,
    starts_at         TIMESTAMPTZ NOT NULL,
    renews_at         TIMESTAMPTZ NOT NULL,
    auto_renew        BOOLEAN DEFAULT true,
    created_at        TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE fx_rates (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    rate_standard   NUMERIC(10,4) NOT NULL,
    rate_tier1      NUMERIC(10,4) NOT NULL,
    rate_tier2      NUMERIC(10,4) NOT NULL,
    rate_tier3      NUMERIC(10,4) NOT NULL,
    valid_from      TIMESTAMPTZ NOT NULL,
    valid_until     TIMESTAMPTZ,
    updated_by_id   UUID NOT NULL REFERENCES system_users(id),
    notes           TEXT,
    created_at      TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE wallets_mxn (
    id                       UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    customer_id              UUID UNIQUE NOT NULL REFERENCES customers(id) ON DELETE CASCADE,
    balance_mxn_available    NUMERIC(15,2) DEFAULT 0 CHECK (balance_mxn_available >= 0),
    balance_mxn_pending      NUMERIC(15,2) DEFAULT 0 CHECK (balance_mxn_pending >= 0),
    status                   wallet_status DEFAULT 'STUB',
    codi_enabled             BOOLEAN DEFAULT false,
    clabe                    TEXT,
    institution_mx_ref       TEXT,
    last_updated             TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE webhook_receipts (
    id              UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    receipt_id      TEXT UNIQUE NOT NULL,
    idempotency_key TEXT NOT NULL,
    source_system   webhook_source NOT NULL,
    external_ref    TEXT,
    result          webhook_result,
    processed_at    TIMESTAMPTZ,
    raw_payload     JSONB,
    created_at      TIMESTAMPTZ DEFAULT NOW(),

    UNIQUE (idempotency_key, source_system)
);

CREATE TABLE funding_events (
    id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    folio             TEXT UNIQUE NOT NULL,
    customer_id       UUID NOT NULL REFERENCES customers(id),
    amount_usd        NUMERIC(15,2) NOT NULL CHECK (amount_usd > 0),
    fx_rate_locked    NUMERIC(10,4) NOT NULL,
    mxn_equivalent    NUMERIC(15,2) NOT NULL,
    status            funding_status DEFAULT 'PENDING',
    agent_id          UUID NOT NULL REFERENCES agents(agent_id),
    cashier_user_id   UUID NOT NULL REFERENCES cashier_users(id),
    webhook_receipt_id UUID REFERENCES webhook_receipts(id),
    legacy            BOOLEAN DEFAULT false,
    created_at        TIMESTAMPTZ DEFAULT NOW(),
    confirmed_at      TIMESTAMPTZ
);

CREATE TABLE prepaid_cards (
    card_id         UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    customer_id     UUID NOT NULL REFERENCES customers(id),
    wallet_mxn_id   UUID NOT NULL REFERENCES wallets_mxn(id),
    card_last4      TEXT NOT NULL,
    network         TEXT DEFAULT 'VISA',
    processor_ref   TEXT NOT NULL,
    status          prepaid_card_status DEFAULT 'PENDING_ISSUE',
    daily_limit_mxn NUMERIC(15,2),
    issued_at       TIMESTAMPTZ,
    expires_at      TIMESTAMPTZ NOT NULL,
    created_at      TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE beneficiaries (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    customer_id UUID NOT NULL REFERENCES customers(id),
    clabe_mx    TEXT,
    alias       TEXT,
    bank_name   TEXT,
    verified    BOOLEAN DEFAULT false,
    created_at  TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE spend_mxn (
    id                UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    folio             TEXT UNIQUE NOT NULL,
    customer_id       UUID NOT NULL REFERENCES customers(id),
    amount_mxn        NUMERIC(15,2) NOT NULL CHECK (amount_mxn > 0),
    channel           spend_channel NOT NULL,
    status            spend_status DEFAULT 'PENDING',
    card_id           UUID REFERENCES prepaid_cards(card_id),
    beneficiary_id    UUID REFERENCES beneficiaries(id),
    codi_ref          TEXT,
    spei_clabe        TEXT,
    webhook_receipt_id UUID REFERENCES webhook_receipts(id),
    created_at        TIMESTAMPTZ DEFAULT NOW(),
    completed_at      TIMESTAMPTZ
);

CREATE TABLE remittance_transactions (
    remittance_id   UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    customer_id     UUID NOT NULL REFERENCES customers(id),
    funding_event_id UUID UNIQUE NOT NULL REFERENCES funding_events(id),
    spend_mxn_id    UUID UNIQUE REFERENCES spend_mxn(id),
    status          remittance_status DEFAULT 'PENDING',
    settled_at      TIMESTAMPTZ,
    created_at      TIMESTAMPTZ DEFAULT NOW()
);

CREATE TABLE ledger_entries (
    id            UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    customer_id   UUID REFERENCES customers(id),
    amount_mxn    NUMERIC(15,2) NOT NULL,
    type          TEXT NOT NULL,
    reference_type TEXT NOT NULL,
    reference_id  TEXT,
    description   TEXT,
    created_at    TIMESTAMPTZ DEFAULT NOW(),
    created_by    TEXT
);

CREATE TABLE kyc_logs (
    id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    customer_id UUID NOT NULL REFERENCES customers(id),
    action      TEXT NOT NULL,
    result      TEXT NOT NULL,
    metadata    JSONB,
    created_at  TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- ÍNDICES
-- =============================================
CREATE INDEX idx_customers_email ON customers(email);
CREATE INDEX idx_customers_kyc_status ON customers(kyc_status);
CREATE INDEX idx_funding_events_customer_id ON funding_events(customer_id);
CREATE INDEX idx_funding_events_status ON funding_events(status);
CREATE INDEX idx_funding_events_created_at ON funding_events(created_at);
CREATE INDEX idx_spend_mxn_customer_id ON spend_mxn(customer_id);
CREATE INDEX idx_spend_mxn_status ON spend_mxn(status);
CREATE INDEX idx_wallet_mxn_customer_id ON wallets_mxn(customer_id);
CREATE INDEX idx_audit_logs_table_name ON audit_logs(table_name);
CREATE INDEX idx_audit_logs_record_id ON audit_logs(record_id);
CREATE INDEX idx_audit_logs_created_at ON audit_logs(created_at);

-- =============================================
-- AUDIT TRAIL TRIGGERS
-- =============================================

CREATE OR REPLACE FUNCTION audit_trigger_function()
RETURNS TRIGGER AS $$
DECLARE
    current_user_uuid UUID := '00000000-0000-0000-0000-000000000000';
    audit_action_value audit_action;
BEGIN
    -- Obtener usuario actual (si está seteado en la sesión)
    BEGIN
        current_user_uuid := current_setting('app.current_user_id', true)::UUID;
    EXCEPTION 
        WHEN OTHERS THEN
            current_user_uuid := '00000000-0000-0000-0000-000000000000'::UUID;
    END;

    -- Mapear TG_OP a tu enum audit_action
    CASE TG_OP
        WHEN 'INSERT' THEN audit_action_value := 'CREATE';
        WHEN 'UPDATE' THEN audit_action_value := 'UPDATE';
        WHEN 'DELETE' THEN audit_action_value := 'DELETE';
        ELSE audit_action_value := 'CREATE';  -- fallback
    END CASE;

    INSERT INTO audit_logs (
        system_user_id,
        table_name,
        record_id,
        action,                    -- ahora sí es del tipo correcto
        old_data,
        new_data,
        description,
        ip_address,
        user_agent
    ) VALUES (
        current_user_uuid,
        TG_TABLE_NAME,
        COALESCE(NEW.id::text, OLD.id::text),
        audit_action_value,        -- ← aquí usamos la variable mapeada
        CASE WHEN TG_OP = 'DELETE' THEN row_to_json(OLD)::jsonb ELSE NULL END,
        CASE WHEN TG_OP IN ('INSERT', 'UPDATE') THEN row_to_json(NEW)::jsonb ELSE NULL END,
        TG_OP || ' on ' || TG_TABLE_NAME,
        inet_client_addr(),
        current_setting('app.user_agent', true)
    );

    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;


-- Triggers en tablas críticas
CREATE TRIGGER audit_customers
    AFTER INSERT OR UPDATE OR DELETE ON customers
    FOR EACH ROW EXECUTE FUNCTION audit_trigger_function();

CREATE TRIGGER audit_funding_events
    AFTER INSERT OR UPDATE OR DELETE ON funding_events
    FOR EACH ROW EXECUTE FUNCTION audit_trigger_function();

CREATE TRIGGER audit_spend_mxn
    AFTER INSERT OR UPDATE OR DELETE ON spend_mxn
    FOR EACH ROW EXECUTE FUNCTION audit_trigger_function();

CREATE TRIGGER audit_wallets_mxn
    AFTER UPDATE ON wallets_mxn
    FOR EACH ROW EXECUTE FUNCTION audit_trigger_function();

CREATE TRIGGER audit_fx_rates
    AFTER UPDATE ON fx_rates
    FOR EACH ROW EXECUTE FUNCTION audit_trigger_function();

CREATE TRIGGER audit_system_users
    AFTER INSERT OR UPDATE ON system_users
    FOR EACH ROW EXECUTE FUNCTION audit_trigger_function();

-- =============================================
-- COMENTARIOS
-- =============================================
COMMENT ON TABLE system_users IS 'Usuarios administradores y personal interno';
COMMENT ON TABLE audit_logs IS 'Auditoría para cumplimiento regulatorio';
COMMENT ON TABLE funding_events IS 'Depósitos desde EUA';
COMMENT ON TABLE spend_mxn IS 'Canjes y retiros en México';