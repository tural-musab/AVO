import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { VenuesModule } from './venues/venues.module';
import { TablesModule } from './tables/tables.module';
import { MenusModule } from './menus/menus.module';
import { OrdersModule } from './orders/orders.module';
import { StaffModule } from './staff/staff.module';
import { HealthController } from './health.controller';
import { SupabaseModule } from './supabase/supabase.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    SupabaseModule,
    AuthModule,
    VenuesModule,
    TablesModule,
    MenusModule,
    OrdersModule,
    StaffModule,
  ],
  controllers: [HealthController],
})
export class AppModule {}
