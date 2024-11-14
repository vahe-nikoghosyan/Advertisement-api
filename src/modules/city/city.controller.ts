import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { CityService } from './city.service';
import { City } from './entities/city.entity';
import { PageDto } from '../../common/dtos/page.dto';
import { PageOptionsDto } from '../../common/dtos/page-options.dto';
import { ApiPaginatedResponse } from '../../common/decorators/api-paginated-response.decorator';

@ApiTags('Cities')
@Controller('cities')
export class CityController {
  constructor(private readonly cityService: CityService) {}

  @Get()
  @ApiOperation({
    summary: 'Retrieve all cities with pagination, filtering, and sorting',
  })
  @ApiPaginatedResponse(City)
  async findAll(
    @Query() pageOptionsDto: PageOptionsDto
  ): Promise<PageDto<City>> {
    return this.cityService.findAll(pageOptionsDto);
  }
}
