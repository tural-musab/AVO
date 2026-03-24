import { Controller, Get, Post, Patch, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { StaffService, AddStaffDto, StaffRole } from './staff.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('staff')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('staff')
export class StaffController {
  constructor(private readonly staffService: StaffService) {}

  @Post()
  @ApiOperation({ summary: 'Add staff member to venue' })
  add(@Body() dto: AddStaffDto) {
    return this.staffService.addStaff(dto);
  }

  @Get('venue/:venueId')
  @ApiOperation({ summary: 'Get all staff for a venue' })
  getByVenue(@Param('venueId') venueId: string) {
    return this.staffService.getStaffByVenue(venueId);
  }

  @Patch(':id/role')
  @ApiOperation({ summary: 'Update staff role' })
  updateRole(@Param('id') id: string, @Body('role') role: StaffRole) {
    return this.staffService.updateRole(id, role);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Deactivate staff member' })
  remove(@Param('id') id: string) {
    return this.staffService.removeStaff(id);
  }
}
