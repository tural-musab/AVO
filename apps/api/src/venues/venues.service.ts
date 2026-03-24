import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { SUPABASE_CLIENT } from '../supabase/supabase.module';
import { CreateVenueDto } from './dto/create-venue.dto';

@Injectable()
export class VenuesService {
  constructor(
    @Inject(SUPABASE_CLIENT) private readonly supabase: SupabaseClient,
  ) {}

  async create(dto: CreateVenueDto, ownerId: string) {
    const { data, error } = await this.supabase
      .from('venues')
      .insert({ ...dto, owner_id: ownerId })
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data;
  }

  async findAll(ownerId: string) {
    const { data, error } = await this.supabase
      .from('venues')
      .select('*')
      .eq('owner_id', ownerId)
      .order('created_at', { ascending: false });

    if (error) throw new Error(error.message);
    return data;
  }

  async findOne(id: string) {
    const { data, error } = await this.supabase
      .from('venues')
      .select('*, tables(*), menus(*)')
      .eq('id', id)
      .single();

    if (error || !data) throw new NotFoundException(`Venue ${id} not found`);
    return data;
  }

  async findBySlug(slug: string) {
    const { data, error } = await this.supabase
      .from('venues')
      .select('*, menus(*, menu_items(*))')
      .eq('slug', slug)
      .single();

    if (error || !data) throw new NotFoundException(`Venue '${slug}' not found`);
    return data;
  }

  async update(id: string, dto: Partial<CreateVenueDto>) {
    const { data, error } = await this.supabase
      .from('venues')
      .update(dto)
      .eq('id', id)
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data;
  }

  async remove(id: string) {
    const { error } = await this.supabase
      .from('venues')
      .delete()
      .eq('id', id);

    if (error) throw new Error(error.message);
    return { success: true };
  }
}
