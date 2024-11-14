import 'dotenv/config';
import { DataSource, DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';
import { Advertisement } from '../modules/advertisement/entities/advertisement.entity';
import { City } from '../modules/city/entities/city.entity';
import { ZipCode } from '../modules/zipcode/entities/zipcode.entity';
import { User } from '../modules/user/entities/user.entity';

const options: DataSourceOptions & SeederOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT, 10),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: [Advertisement, City, ZipCode, User],
  synchronize: process.env.NODE_ENV === 'development',

  seeds: ['src/database/seeds/**/*{.ts,.js}'],
  factories: ['src/database/factories/**/*{.ts,.js}'],
};

export const dataSource = new DataSource(options);
