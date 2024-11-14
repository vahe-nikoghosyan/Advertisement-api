import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Advertisement } from './modules/advertisement/entities/advertisement.entity';
import { City } from './modules/city/entities/city.entity';
import { ZipCode } from './modules/zipcode/entities/zipcode.entity';
import { AdvertisementModule } from './modules/advertisement/advertisement.module';
import { AuthModule } from './modules/auth/auth.module';
import { User } from './modules/user/entities/user.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: process.env.NODE_ENV
        ? `.env.${process.env.NODE_ENV}`
        : '.env',
    }),
    TypeOrmModule.forRootAsync({
      useFactory: () => ({
        type: 'postgres',
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT, 10),
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        entities: [Advertisement, City, ZipCode, User],
        synchronize: process.env.NODE_ENV === 'development',
      }),
    }),
    AdvertisementModule,
    AuthModule,
  ],
})
export class AppModule {}
