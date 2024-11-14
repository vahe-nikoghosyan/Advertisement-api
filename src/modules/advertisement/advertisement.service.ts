import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAdvertisementDto } from './dto/create-advertisement.dto';
import { UpdateAdvertisementDto } from './dto/update-advertisement.dto';
import { Advertisement } from './entities/advertisement.entity';
import { City } from '../city/entities/city.entity';
import { ZipCode } from '../zipcode/entities/zipcode.entity';
import { PageOptionsDto } from '../../common/dtos/page-options.dto';
import { PageDto } from '../../common/dtos/page.dto';
import { PageMetaDto } from '../../common/dtos/page-meta.dto';

@Injectable()
export class AdvertisementService {
  constructor(
    @InjectRepository(Advertisement)
    private advertisementRepository: Repository<Advertisement>,
    @InjectRepository(City)
    private cityRepository: Repository<City>,
    @InjectRepository(ZipCode)
    private zipCodeRepository: Repository<ZipCode>
  ) {}

  async create(
    createAdvertisementDto: CreateAdvertisementDto
  ): Promise<Advertisement> {
    const city = await this.cityRepository.findOneBy({
      id: createAdvertisementDto.cityId,
    });
    const zipCode = await this.zipCodeRepository.findOneBy({
      id: createAdvertisementDto.zipCodeId,
    });

    if (!city || !zipCode) {
      throw new NotFoundException('City or ZipCode not found');
    }

    const advertisement = this.advertisementRepository.create({
      ...createAdvertisementDto,
      city,
      zipCode,
    });

    return this.advertisementRepository.save(advertisement);
  }
  async findAll(
    pageOptionsDto: PageOptionsDto
  ): Promise<PageDto<Advertisement>> {
    const queryBuilder = this.advertisementRepository
      .createQueryBuilder('advertisement')
      .leftJoinAndSelect('advertisement.city', 'city')
      .leftJoinAndSelect('advertisement.zipCode', 'zipCode')
      .orderBy('advertisement.id', pageOptionsDto.order)
      .skip(pageOptionsDto.skip)
      .take(pageOptionsDto.take);

    const itemCount = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();

    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });
    return new PageDto(entities, pageMetaDto);
  }

  async findOne(id: number): Promise<Advertisement> {
    const advertisement = await this.advertisementRepository.findOne({
      where: { id },
    });
    if (!advertisement) {
      throw new NotFoundException(`Advertisement with ID ${id} not found`);
    }
    return advertisement;
  }

  async update(
    id: number,
    updateAdvertisementDto: UpdateAdvertisementDto
  ): Promise<Advertisement> {
    const advertisement = await this.findOne(id);

    if (updateAdvertisementDto.cityId) {
      const city = await this.cityRepository.findOneBy({
        id: updateAdvertisementDto.cityId,
      });
      if (!city) throw new NotFoundException('City not found');
      advertisement.city = city;
    }

    if (updateAdvertisementDto.zipCodeId) {
      const zipCode = await this.zipCodeRepository.findOneBy({
        id: updateAdvertisementDto.zipCodeId,
      });
      if (!zipCode) throw new NotFoundException('ZipCode not found');
      advertisement.zipCode = zipCode;
    }

    Object.assign(advertisement, updateAdvertisementDto);

    return this.advertisementRepository.save(advertisement);
  }

  async remove(id: number): Promise<void> {
    await this.advertisementRepository.delete(id);
  }
}
