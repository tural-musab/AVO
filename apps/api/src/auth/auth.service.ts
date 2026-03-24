import { Injectable, Inject, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SupabaseClient } from '@supabase/supabase-js';
import { SUPABASE_CLIENT } from '../supabase/supabase.module';

@Injectable()
export class AuthService {
  constructor(
    @Inject(SUPABASE_CLIENT) private readonly supabase: SupabaseClient,
    private readonly jwtService: JwtService,
  ) {}

  async signIn(email: string, password: string) {
    const { data, error } = await this.supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error || !data.user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = {
      sub: data.user.id,
      email: data.user.email,
    };

    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: data.user.id,
        email: data.user.email,
      },
    };
  }

  async signUp(email: string, password: string, name: string) {
    const { data, error } = await this.supabase.auth.signUp({
      email,
      password,
      options: {
        data: { name },
      },
    });

    if (error) throw new Error(error.message);

    return {
      user: {
        id: data.user?.id,
        email: data.user?.email,
      },
      message: 'Check your email for verification link',
    };
  }

  async validateUser(userId: string) {
    const { data, error } = await this.supabase.auth.admin.getUserById(userId);
    if (error || !data.user) return null;
    return data.user;
  }
}
