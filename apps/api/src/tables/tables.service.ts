import { Injectable, Inject } from '@nestjs/common';
import { SupabaseClient } from '@supabase/supabase-js';
import * as QRCode from 'qrcode';
import { SUPABASE_CLIENT } from '../supabase/supabase.module';

export interface CreateTableDto {
  venue_id: string;
  number: number;
  capacity?: number;
}

@Injectable()
export class TablesService {
  constructor(
    @Inject(SUPABASE_CLIENT) private readonly supabase: SupabaseClient,
  ) {}

  async create(dto: CreateTableDto, appUrl: string) {
    // Generate QR code URL pointing to the guest menu
    const qrUrl = `${appUrl}/${dto.venue_id}/table/${dto.number}`;
    const qrSvg = await QRCode.toString(qrUrl, { type: 'svg' });

    const { data, error } = await this.supabase
      .from('tables')
      .insert({
        ...dto,
        qr_code: qrUrl,
        qr_svg: qrSvg,
        status: 'available',
      })
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data;
  }

  async findByVenue(venueId: string) {
    const { data, error } = await this.supabase
      .from('tables')
      .select('*')
      .eq('venue_id', venueId)
      .order('number');

    if (error) throw new Error(error.message);
    return data;
  }

  async updateStatus(id: string, status: 'available' | 'occupied' | 'reserved') {
    const { data, error } = await this.supabase
      .from('tables')
      .update({ status })
      .eq('id', id)
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data;
  }

  async remove(id: string) {
    const { error } = await this.supabase.from('tables').delete().eq('id', id);
    if (error) throw new Error(error.message);
    return { success: true };
  }
}
