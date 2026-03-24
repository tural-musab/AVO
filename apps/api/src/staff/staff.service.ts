import { Injectable, Inject } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import { SUPABASE_CLIENT } from '../supabase/supabase.module';

export type StaffRole = 'venue_admin' | 'manager' | 'waiter' | 'kitchen';

export interface AddStaffDto {
  venue_id: string;
  user_id: string;
  role: StaffRole;
}

@Injectable()
export class StaffService {
  constructor(
    @Inject(SUPABASE_CLIENT) private readonly supabase: SupabaseClient,
  ) {}

  async addStaff(dto: AddStaffDto) {
    const { data, error } = await this.supabase
      .from('staff_profiles')
      .insert({ ...dto, is_active: true })
      .select()
      .single();
    if (error) throw new Error(error.message);
    return data;
  }

  async getStaffByVenue(venueId: string) {
    const { data, error } = await this.supabase
      .from('staff_profiles')
      .select('*')
      .eq('venue_id', venueId)
      .eq('is_active', true);
    if (error) throw new Error(error.message);
    return data;
  }

  async updateRole(id: string, role: StaffRole) {
    const { data, error } = await this.supabase
      .from('staff_profiles')
      .update({ role })
      .eq('id', id)
      .select()
      .single();
    if (error) throw new Error(error.message);
    return data;
  }

  async removeStaff(id: string) {
    const { error } = await this.supabase
      .from('staff_profiles')
      .update({ is_active: false })
      .eq('id', id);
    if (error) throw new Error(error.message);
    return { success: true };
  }
}
