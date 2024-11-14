import {
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Controller,
  Query,
} from '@nestjs/common';

import { AdvertisementService } from './advertisement.service';
import { CreateAdvertisementDto } from './dto/create-advertisement.dto';
import { UpdateAdvertisementDto } from './dto/update-advertisement.dto';

import { RolesGuard } from '../auth/roles.guard';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';

import { Roles } from '../auth/roles.decorator';
import { UserRole } from '../user/entities/user.entity';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { PageOptionsDto } from '../../common/dtos/page-options.dto';
import { Advertisement } from './entities/advertisement.entity';
import { PageDto } from '../../common/dtos/page.dto';
import { ApiPaginatedResponse } from '../../common/decorators/api-paginated-response.decorator';

@ApiTags('Advertisements')
@ApiBearerAuth()
@UseGuards(JwtAuthGuard, RolesGuard)
@Controller('advertisements')
export class AdvertisementController {
  constructor(private readonly advertisementService: AdvertisementService) {}

  @Post()
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Create an advertisement (Admin only)' })
  create(@Body() createAdvertisementDto: CreateAdvertisementDto) {
    return this.advertisementService.create(createAdvertisementDto);
  }

  @Get()
  @ApiOperation({ summary: 'Get all advertisements' })
  @ApiPaginatedResponse(Advertisement)
  async findAll(
    @Query() pageOptionsDto: PageOptionsDto
  ): Promise<PageDto<Advertisement>> {
    return this.advertisementService.findAll(pageOptionsDto);
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get an advertisement by ID' })
  findOne(@Param('id') id: number) {
    return this.advertisementService.findOne(id);
  }

  @Patch(':id')
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Update an advertisement (Admin only)' })
  update(
    @Param('id') id: number,
    @Body() updateAdvertisementDto: UpdateAdvertisementDto
  ) {
    return this.advertisementService.update(id, updateAdvertisementDto);
  }

  @Delete(':id')
  @Roles(UserRole.ADMIN)
  @ApiOperation({ summary: 'Delete an advertisement (Admin only)' })
  remove(@Param('id') id: number) {
    return this.advertisementService.remove(id);
  }
}
