import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ZipCode } from './entities/zipcode.entity';
import { PageDto } from '../../common/dtos/page.dto';
import { PageOptionsDto } from '../../common/dtos/page-options.dto';
import { PageMetaDto } from '../../common/dtos/page-meta.dto';

@Injectable()
export class ZipCodeService {
  constructor(
    @InjectRepository(ZipCode)
    private readonly zipCodeRepository: Repository<ZipCode>
  ) {}

  async findAll(pageOptionsDto: PageOptionsDto): Promise<PageDto<ZipCode>> {
    const queryBuilder = this.zipCodeRepository
      .createQueryBuilder('zipCode')
      .orderBy('zipCode.id', pageOptionsDto.order)
      .skip(pageOptionsDto.skip)
      .take(pageOptionsDto.take);

    const itemCount = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();

    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });
    return new PageDto(entities, pageMetaDto);
  }
}
