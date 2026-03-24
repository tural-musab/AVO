import { Controller, Get, Post, Put, Patch, Delete, Body, Param, UseGuards } from '@nestjs/common';
import { ApiTags, ApiBearerAuth, ApiOperation } from '@nestjs/swagger';
import { MenusService, CreateMenuDto, CreateMenuItemDto } from './menus.service';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';

@ApiTags('menus')
@Controller('menus')
export class MenusController {
  constructor(private readonly menusService: MenusService) {}

  // --- Menu endpoints (auth required) ---
  @Post()
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Create menu for a venue' })
  createMenu(@Body() dto: CreateMenuDto) {
    return this.menusService.createMenu(dto);
  }

  @Get('venue/:venueId')
  @ApiOperation({ summary: 'Get menus for venue (public for guest view)' })
  getMenusByVenue(@Param('venueId') venueId: string) {
    return this.menusService.getMenusByVenue(venueId);
  }

  @Get('venue/:venueId/active')
  @ApiOperation({ summary: 'Get active menu for guest QR view' })
  getActiveMenu(@Param('venueId') venueId: string) {
    return this.menusService.getActiveMenu(venueId);
  }

  // --- Menu Item endpoints ---
  @Post('items')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Add item to menu' })
  createItem(@Body() dto: CreateMenuItemDto) {
    return this.menusService.createItem(dto);
  }

  @Put('items/:id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Update menu item' })
  updateItem(@Param('id') id: string, @Body() dto: Partial<CreateMenuItemDto>) {
    return this.menusService.updateItem(id, dto);
  }

  @Patch('items/:id/availability')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @ApiOperation({ summary: 'Toggle item availability' })
  toggleAvailability(
    @Param('id') id: string,
    @Body('is_available') is_available: boolean,
  ) {
    return this.menusService.toggleItemAvailability(id, is_available);
  }

  @Delete('items/:id')
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  deleteItem(@Param('id') id: string) {
    return this.menusService.deleteItem(id);
  }
}
