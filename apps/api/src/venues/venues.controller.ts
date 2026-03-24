import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
  Request,
} from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { VenuesService } from './venues.service';
import { CreateVenueDto } from './dto/create-venue.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('venues')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller('venues')
export class VenuesController {
  constructor(private readonly venuesService: VenuesService) {}

  @Post()
  @ApiOperation({ summary: 'Create a new venue' })
  create(@Body() dto: CreateVenueDto, @Request() req: any) {
    return this.venuesService.create(dto, req.user.id);
  }

  @Get()
  @ApiOperation({ summary: 'List all venues for the current user' })
  findAll(@Request() req: any) {
    return this.venuesService.findAll(req.user.id);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get venue by ID' })
  findOne(@Param('id') id: string) {
    return this.venuesService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update venue' })
  update(@Param('id') id: string, @Body() dto: Partial<CreateVenueDto>) {
    return this.venuesService.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Delete venue' })
  remove(@Param('id') id: string) {
    return this.venuesService.remove(id);
  }
}
