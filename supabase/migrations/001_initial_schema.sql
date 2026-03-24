-- =====================================================
-- AVO — Initial Database Schema
-- Migration: 001_initial_schema
-- Sprint 1 Scope: Core venue, table, menu, order entities
-- =====================================================

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- =====================================================
-- VENUES
-- =====================================================
CREATE TYPE venue_type AS ENUM (
  'restaurant',
  'cafe',
  'bar',
  'food_hall',
  'multi_brand'
);

CREATE TABLE venues (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  owner_id    UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  name        TEXT NOT NULL,
  slug        TEXT NOT NULL UNIQUE,
  type        venue_type NOT NULL DEFAULT 'restaurant',
  settings    JSONB DEFAULT '{}',
  is_active   BOOLEAN DEFAULT true,
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  updated_at  TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_venues_owner_id ON venues(owner_id);
CREATE INDEX idx_venues_slug ON venues(slug);

-- =====================================================
-- TABLES
-- =====================================================
CREATE TYPE table_status AS ENUM ('available', 'occupied', 'reserved', 'closed');

CREATE TABLE tables (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  venue_id    UUID NOT NULL REFERENCES venues(id) ON DELETE CASCADE,
  number      INTEGER NOT NULL,
  capacity    INTEGER DEFAULT 4,
  status      table_status DEFAULT 'available',
  qr_code     TEXT,
  qr_svg      TEXT,
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(venue_id, number)
);

CREATE INDEX idx_tables_venue_id ON tables(venue_id);

-- =====================================================
-- MENUS
-- =====================================================
CREATE TABLE menus (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  venue_id    UUID NOT NULL REFERENCES venues(id) ON DELETE CASCADE,
  name        TEXT NOT NULL,
  is_active   BOOLEAN DEFAULT true,
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  updated_at  TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_menus_venue_id ON menus(venue_id);

-- =====================================================
-- MENU ITEMS
-- =====================================================
CREATE TABLE menu_items (
  id           UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  menu_id      UUID NOT NULL REFERENCES menus(id) ON DELETE CASCADE,
  name         TEXT NOT NULL,
  description  TEXT,
  price        NUMERIC(10, 2) NOT NULL CHECK (price >= 0),
  category     TEXT NOT NULL,
  is_available BOOLEAN DEFAULT true,
  image_url    TEXT,
  sort_order   INTEGER DEFAULT 0,
  created_at   TIMESTAMPTZ DEFAULT NOW(),
  updated_at   TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_menu_items_menu_id ON menu_items(menu_id);
CREATE INDEX idx_menu_items_category ON menu_items(category);

-- =====================================================
-- ORDERS
-- =====================================================
CREATE TYPE order_status AS ENUM (
  'pending',
  'confirmed',
  'preparing',
  'ready',
  'served',
  'cancelled'
);

CREATE TABLE orders (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  venue_id    UUID NOT NULL REFERENCES venues(id) ON DELETE CASCADE,
  table_id    UUID NOT NULL REFERENCES tables(id),
  status      order_status DEFAULT 'pending',
  total       NUMERIC(10, 2) NOT NULL DEFAULT 0,
  notes       TEXT,
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  updated_at  TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_orders_venue_id ON orders(venue_id);
CREATE INDEX idx_orders_table_id ON orders(table_id);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_created_at ON orders(created_at DESC);

-- =====================================================
-- ORDER ITEMS
-- =====================================================
CREATE TABLE order_items (
  id            UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  order_id      UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
  menu_item_id  UUID NOT NULL REFERENCES menu_items(id),
  quantity      INTEGER NOT NULL CHECK (quantity > 0),
  price         NUMERIC(10, 2) NOT NULL,
  notes         TEXT,
  created_at    TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_order_items_order_id ON order_items(order_id);

-- =====================================================
-- STAFF PROFILES
-- =====================================================
CREATE TYPE staff_role AS ENUM (
  'super_admin',
  'venue_admin',
  'manager',
  'waiter',
  'kitchen'
);

CREATE TABLE staff_profiles (
  id          UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id     UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  venue_id    UUID NOT NULL REFERENCES venues(id) ON DELETE CASCADE,
  role        staff_role NOT NULL DEFAULT 'waiter',
  is_active   BOOLEAN DEFAULT true,
  created_at  TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(user_id, venue_id)
);

CREATE INDEX idx_staff_profiles_venue_id ON staff_profiles(venue_id);
CREATE INDEX idx_staff_profiles_user_id ON staff_profiles(user_id);

-- =====================================================
-- ROW LEVEL SECURITY (RLS)
-- =====================================================

-- Enable RLS on all tables
ALTER TABLE venues ENABLE ROW LEVEL SECURITY;
ALTER TABLE tables ENABLE ROW LEVEL SECURITY;
ALTER TABLE menus ENABLE ROW LEVEL SECURITY;
ALTER TABLE menu_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE order_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE staff_profiles ENABLE ROW LEVEL SECURITY;

-- Venues: owner can do everything
CREATE POLICY "venue_owner_all" ON venues
  FOR ALL USING (auth.uid() = owner_id);

-- Venues: staff can read their venue
CREATE POLICY "venue_staff_read" ON venues
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM staff_profiles
      WHERE staff_profiles.venue_id = venues.id
        AND staff_profiles.user_id = auth.uid()
        AND staff_profiles.is_active = true
    )
  );

-- Tables: venue owner can manage
CREATE POLICY "tables_owner_all" ON tables
  FOR ALL USING (
    EXISTS (SELECT 1 FROM venues WHERE venues.id = tables.venue_id AND venues.owner_id = auth.uid())
  );

-- Tables: staff can read
CREATE POLICY "tables_staff_read" ON tables
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM staff_profiles
      WHERE staff_profiles.venue_id = tables.venue_id
        AND staff_profiles.user_id = auth.uid()
        AND staff_profiles.is_active = true
    )
  );

-- Menus: public read (for guest QR view)
CREATE POLICY "menus_public_read" ON menus
  FOR SELECT USING (is_active = true);

-- Menus: owner can manage
CREATE POLICY "menus_owner_all" ON menus
  FOR ALL USING (
    EXISTS (SELECT 1 FROM venues WHERE venues.id = menus.venue_id AND venues.owner_id = auth.uid())
  );

-- Menu items: public read
CREATE POLICY "menu_items_public_read" ON menu_items
  FOR SELECT USING (is_available = true);

-- Menu items: owner can manage
CREATE POLICY "menu_items_owner_all" ON menu_items
  FOR ALL USING (
    EXISTS (
      SELECT 1 FROM menus
      JOIN venues ON venues.id = menus.venue_id
      WHERE menus.id = menu_items.menu_id
        AND venues.owner_id = auth.uid()
    )
  );

-- Orders: anyone can insert (guest ordering)
CREATE POLICY "orders_guest_insert" ON orders
  FOR INSERT WITH CHECK (true);

-- Orders: staff can read and update
CREATE POLICY "orders_staff_read_update" ON orders
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM staff_profiles
      WHERE staff_profiles.venue_id = orders.venue_id
        AND staff_profiles.user_id = auth.uid()
        AND staff_profiles.is_active = true
    )
  );

CREATE POLICY "orders_staff_update" ON orders
  FOR UPDATE USING (
    EXISTS (
      SELECT 1 FROM staff_profiles
      WHERE staff_profiles.venue_id = orders.venue_id
        AND staff_profiles.user_id = auth.uid()
        AND staff_profiles.is_active = true
    )
  );

-- Order items: guest can insert
CREATE POLICY "order_items_guest_insert" ON order_items
  FOR INSERT WITH CHECK (true);

-- Order items: staff can read
CREATE POLICY "order_items_staff_read" ON order_items
  FOR SELECT USING (
    EXISTS (
      SELECT 1 FROM orders
      JOIN staff_profiles ON staff_profiles.venue_id = orders.venue_id
      WHERE orders.id = order_items.order_id
        AND staff_profiles.user_id = auth.uid()
        AND staff_profiles.is_active = true
    )
  );

-- Staff profiles: owner can manage
CREATE POLICY "staff_profiles_owner_all" ON staff_profiles
  FOR ALL USING (
    EXISTS (SELECT 1 FROM venues WHERE venues.id = staff_profiles.venue_id AND venues.owner_id = auth.uid())
  );

-- Staff can read their own profile
CREATE POLICY "staff_profiles_self_read" ON staff_profiles
  FOR SELECT USING (auth.uid() = user_id);

-- =====================================================
-- UPDATED_AT TRIGGER
-- =====================================================
CREATE OR REPLACE FUNCTION update_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER set_updated_at_venues
  BEFORE UPDATE ON venues
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER set_updated_at_menus
  BEFORE UPDATE ON menus
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER set_updated_at_menu_items
  BEFORE UPDATE ON menu_items
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();

CREATE TRIGGER set_updated_at_orders
  BEFORE UPDATE ON orders
  FOR EACH ROW EXECUTE FUNCTION update_updated_at();
