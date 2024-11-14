import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdvertisementService } from './advertisement.service';
import { AdvertisementController } from './advertisement.controller';
import { Advertisement } from './entities/advertisement.entity';
import { City } from '../city/entities/city.entity';
import { ZipCode } from '../zipcode/entities/zipcode.entity';
import { CityModule } from '../city/city.module';
import { ZipCodeModule } from '../zipcode/zipcode.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Advertisement, City, ZipCode]),
    CityModule,
    ZipCodeModule,
  ],
  controllers: [AdvertisementController],
  providers: [AdvertisementService],
})
export class AdvertisementModule {}
