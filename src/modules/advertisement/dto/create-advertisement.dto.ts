import { IsNumber, IsString, IsNotEmpty, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAdvertisementDto {
  @ApiProperty({ description: 'Address of the property' })
  @IsString()
  @IsNotEmpty()
  address: string;

  @ApiProperty({ description: 'Price of the property', example: 100000 })
  @IsNumber()
  price: number;

  @ApiProperty({ description: 'Number of rooms in the property', example: 3 })
  @IsNumber()
  rooms: number;

  @ApiProperty({
    description: 'Number of bathrooms in the property',
    example: 2,
  })
  @IsNumber()
  bathrooms: number;

  @ApiProperty({ description: 'Living area in square feet', example: 1500 })
  @IsNumber()
  livingSqFt: number;

  @ApiProperty({
    description: 'Additional details about the property',
    required: false,
  })
  @IsString()
  @IsOptional()
  otherDetails?: string;

  @ApiProperty({
    description: 'ID of the city associated with the property',
    example: 1,
  })
  @IsNumber()
  cityId: number;

  @ApiProperty({
    description: 'ID of the zip code associated with the property',
    example: 1,
  })
  @IsNumber()
  zipCodeId: number;
}
