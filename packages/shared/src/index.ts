// AVO Shared Types — used by both apps/web and apps/api

// ========== Enums ==========
export type VenueType = 'restaurant' | 'cafe' | 'bar' | 'food_hall' | 'multi_brand';
export type TableStatus = 'available' | 'occupied' | 'reserved';
export type OrderStatus = 'pending' | 'confirmed' | 'preparing' | 'ready' | 'served' | 'cancelled';
export type StaffRole = 'super_admin' | 'venue_admin' | 'manager' | 'waiter' | 'kitchen';

// ========== Core Models ==========
export interface Venue {
  id: string;
  owner_id: string;
  name: string;
  slug: string;
  type: VenueType;
  settings?: Record<string, unknown>;
  created_at: string;
}

export interface Table {
  id: string;
  venue_id: string;
  number: number;
  capacity?: number;
  status: TableStatus;
  qr_code: string;
  qr_svg?: string;
  created_at: string;
}

export interface Menu {
  id: string;
  venue_id: string;
  name: string;
  is_active: boolean;
  created_at: string;
  menu_items?: MenuItem[];
}

export interface MenuItem {
  id: string;
  menu_id: string;
  name: string;
  description?: string;
  price: number;
  category: string;
  is_available: boolean;
  image_url?: string;
  sort_order?: number;
}

export interface Order {
  id: string;
  venue_id: string;
  table_id: string;
  status: OrderStatus;
  total: number;
  notes?: string;
  created_at: string;
  updated_at?: string;
  order_items?: OrderItem[];
}

export interface OrderItem {
  id: string;
  order_id: string;
  menu_item_id: string;
  quantity: number;
  price: number;
  notes?: string;
  menu_items?: Pick<MenuItem, 'name' | 'price'>;
}

export interface StaffProfile {
  id: string;
  user_id: string;
  venue_id: string;
  role: StaffRole;
  is_active: boolean;
  created_at: string;
}

// ========== API Response Types ==========
export interface ApiResponse<T> {
  data: T;
  error?: string;
}

export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
}

// ========== Cart Types (Frontend) ==========
export interface CartItem {
  menuItem: MenuItem;
  quantity: number;
  notes?: string;
}

export interface Cart {
  items: CartItem[];
  venueId: string;
  tableId: string;
}
