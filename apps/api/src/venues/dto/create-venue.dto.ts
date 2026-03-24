import { IsString, IsNotEmpty, IsEnum, IsOptional, IsObject } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export enum VenueType {
  RESTAURANT = 'restaurant',
  CAFE = 'cafe',
  BAR = 'bar',
  FOOD_HALL = 'food_hall',
  MULTI_BRAND = 'multi_brand',
}

export class CreateVenueDto {
  @ApiProperty({ example: 'My Restaurant' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({ example: 'my-restaurant', description: 'URL-friendly slug' })
  @IsString()
  @IsNotEmpty()
  slug: string;

  @ApiProperty({ enum: VenueType, example: VenueType.RESTAURANT })
  @IsEnum(VenueType)
  type: VenueType;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsObject()
  settings?: Record<string, unknown>;
}
