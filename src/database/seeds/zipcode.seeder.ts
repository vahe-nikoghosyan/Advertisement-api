import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { Logger } from '@nestjs/common';
import { ZipCode } from '../../modules/zipcode/entities/zipcode.entity';

export default class ZipCodeSeeder implements Seeder {
  private readonly logger = new Logger(ZipCodeSeeder.name);

  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager
  ): Promise<void> {
    const repository = dataSource.getRepository(ZipCode);

    this.logger.log('Seeding zip codes...');
    await repository.insert([
      { code: '90001' },
      { code: '10001' },
      { code: '60601' },
    ]);
    this.logger.log('Inserted predefined zip codes.');

    const zipCodeFactory = factoryManager.get(ZipCode);
    await zipCodeFactory.saveMany(5);
    this.logger.log('Inserted 5 random zip codes using the factory.');
  }
}
