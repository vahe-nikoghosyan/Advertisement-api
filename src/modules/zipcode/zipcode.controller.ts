import { Controller, Get, Query } from '@nestjs/common';
import { ApiTags, ApiOperation } from '@nestjs/swagger';
import { ZipCodeService } from './zipcode.service';
import { ZipCode } from './entities/zipcode.entity';
import { PageDto } from '../../common/dtos/page.dto';
import { PageOptionsDto } from '../../common/dtos/page-options.dto';
import { ApiPaginatedResponse } from '../../common/decorators/api-paginated-response.decorator';

@ApiTags('Zip Codes')
@Controller('zipcodes')
export class ZipCodeController {
  constructor(private readonly zipCodeService: ZipCodeService) {}

  @Get()
  @ApiOperation({
    summary: 'Retrieve all zip codes with pagination, filtering, and sorting',
  })
  @ApiPaginatedResponse(ZipCode)
  async findAll(
    @Query() pageOptionsDto: PageOptionsDto
  ): Promise<PageDto<ZipCode>> {
    return this.zipCodeService.findAll(pageOptionsDto);
  }
}
