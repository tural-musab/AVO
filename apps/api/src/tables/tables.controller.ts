import { Controller, Get, Post, Patch, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { TablesService, CreateTableDto } from './tables.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ConfigService } from '@nestjs/config';

@ApiTags('tables')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('tables')
export class TablesController {
  constructor(
    private readonly tablesService: TablesService,
    private readonly configService: ConfigService,
  ) {}

  @Post()
  @ApiOperation({ summary: 'Create table with QR code' })
  create(@Body() dto: CreateTableDto) {
    const appUrl = this.configService.get<string>('APP_URL', 'http://localhost:3000');
    return this.tablesService.create(dto, appUrl);
  }

  @Get('venue/:venueId')
  @ApiOperation({ summary: 'Get all tables for a venue' })
  findByVenue(@Param('venueId') venueId: string) {
    return this.tablesService.findByVenue(venueId);
  }

  @Patch(':id/status')
  @ApiOperation({ summary: 'Update table status' })
  updateStatus(
    @Param('id') id: string,
    @Body('status') status: 'available' | 'occupied' | 'reserved',
  ) {
    return this.tablesService.updateStatus(id, status);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.tablesService.remove(id);
  }
}
