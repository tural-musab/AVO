import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { SUPABASE_CLIENT } from '../supabase/supabase.module';

export type OrderStatus = 'pending' | 'confirmed' | 'preparing' | 'ready' | 'served' | 'cancelled';

export interface CreateOrderDto {
  venue_id: string;
  table_id: string;
  items: {
    menu_item_id: string;
    quantity: number;
    price: number;
    notes?: string;
  }[];
  notes?: string;
}

@Injectable()
export class OrdersService {
  constructor(
    @Inject(SUPABASE_CLIENT) private readonly supabase: SupabaseClient,
  ) {}

  async create(dto: CreateOrderDto) {
    const total = dto.items.reduce((sum, i) => sum + i.price * i.quantity, 0);

    // Create order
    const { data: order, error: orderErr } = await this.supabase
      .from('orders')
      .insert({
        venue_id: dto.venue_id,
        table_id: dto.table_id,
        status: 'pending',
        total,
        notes: dto.notes,
      })
      .select()
      .single();

    if (orderErr) throw new Error(orderErr.message);

    // Create order items
    const orderItems = dto.items.map((item) => ({
      order_id: order.id,
      menu_item_id: item.menu_item_id,
      quantity: item.quantity,
      price: item.price,
      notes: item.notes,
    }));

    const { error: itemsErr } = await this.supabase
      .from('order_items')
      .insert(orderItems);

    if (itemsErr) throw new Error(itemsErr.message);

    return this.findOne(order.id);
  }

  async findOne(id: string) {
    const { data, error } = await this.supabase
      .from('orders')
      .select('*, order_items(*, menu_items(name, price))')
      .eq('id', id)
      .single();

    if (error || !data) throw new NotFoundException(`Order ${id} not found`);
    return data;
  }

  async findByVenue(venueId: string, status?: OrderStatus) {
    let query = this.supabase
      .from('orders')
      .select('*, order_items(*, menu_items(name)), tables(number)')
      .eq('venue_id', venueId)
      .order('created_at', { ascending: false });

    if (status) {
      query = query.eq('status', status);
    }

    const { data, error } = await query;
    if (error) throw new Error(error.message);
    return data;
  }

  async updateStatus(id: string, status: OrderStatus) {
    const { data, error } = await this.supabase
      .from('orders')
      .update({ status, updated_at: new Date().toISOString() })
      .eq('id', id)
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data;
  }

  async getActiveOrders(venueId: string) {
    return this.findByVenue(venueId, 'pending');
  }
}
