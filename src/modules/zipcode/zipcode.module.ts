import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ZipCodeService } from './zipcode.service';
import { ZipCodeController } from './zipcode.controller';
import { ZipCode } from './entities/zipcode.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ZipCode])],
  controllers: [ZipCodeController],
  providers: [ZipCodeService],
  exports: [ZipCodeService],
})
export class ZipCodeModule {}
