import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { SUPABASE_CLIENT } from '../supabase/supabase.module';

export interface CreateMenuDto {
  venue_id: string;
  name: string;
  is_active?: boolean;
}

export interface CreateMenuItemDto {
  menu_id: string;
  name: string;
  description?: string;
  price: number;
  category: string;
  is_available?: boolean;
  image_url?: string;
}

@Injectable()
export class MenusService {
  constructor(
    @Inject(SUPABASE_CLIENT) private readonly supabase: SupabaseClient,
  ) {}

  // --- Menu CRUD ---
  async createMenu(dto: CreateMenuDto) {
    const { data, error } = await this.supabase
      .from('menus')
      .insert({ ...dto, is_active: dto.is_active ?? true })
      .select()
      .single();
    if (error) throw new Error(error.message);
    return data;
  }

  async getMenusByVenue(venueId: string) {
    const { data, error } = await this.supabase
      .from('menus')
      .select('*, menu_items(*)')
      .eq('venue_id', venueId)
      .order('created_at');
    if (error) throw new Error(error.message);
    return data;
  }

  async getActiveMenu(venueId: string) {
    const { data, error } = await this.supabase
      .from('menus')
      .select('*, menu_items(*)')
      .eq('venue_id', venueId)
      .eq('is_active', true)
      .single();
    if (error || !data) throw new NotFoundException('No active menu found');
    return data;
  }

  // --- Menu Item CRUD ---
  async createItem(dto: CreateMenuItemDto) {
    const { data, error } = await this.supabase
      .from('menu_items')
      .insert({ ...dto, is_available: dto.is_available ?? true })
      .select()
      .single();
    if (error) throw new Error(error.message);
    return data;
  }

  async updateItem(id: string, dto: Partial<CreateMenuItemDto>) {
    const { data, error } = await this.supabase
      .from('menu_items')
      .update(dto)
      .eq('id', id)
      .select()
      .single();
    if (error) throw new Error(error.message);
    return data;
  }

  async toggleItemAvailability(id: string, is_available: boolean) {
    return this.updateItem(id, { is_available });
  }

  async deleteItem(id: string) {
    const { error } = await this.supabase.from('menu_items').delete().eq('id', id);
    if (error) throw new Error(error.message);
    return { success: true };
  }
}
