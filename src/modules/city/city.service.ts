import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { City } from './entities/city.entity';
import { PageOptionsDto } from '../../common/dtos/page-options.dto';
import { PageDto } from '../../common/dtos/page.dto';
import { PageMetaDto } from '../../common/dtos/page-meta.dto';

@Injectable()
export class CityService {
  constructor(
    @InjectRepository(City)
    private readonly cityRepository: Repository<City>
  ) {}

  async findAll(pageOptionsDto: PageOptionsDto): Promise<PageDto<City>> {
    const queryBuilder = this.cityRepository
      .createQueryBuilder('city')
      .orderBy('city.id', pageOptionsDto.order)
      .skip(pageOptionsDto.skip)
      .take(pageOptionsDto.take);

    const itemCount = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();

    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });
    return new PageDto(entities, pageMetaDto);
  }
}
