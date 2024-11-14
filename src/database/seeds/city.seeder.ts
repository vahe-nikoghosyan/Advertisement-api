import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { Logger } from '@nestjs/common';
import { City } from '../../modules/city/entities/city.entity';

export default class CitySeeder implements Seeder {
  private readonly logger = new Logger(CitySeeder.name);

  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager
  ): Promise<void> {
    const repository = dataSource.getRepository(City);

    this.logger.log('Seeding cities...');
    await repository.insert([
      { name: 'Los Angeles' },
      { name: 'New York' },
      { name: 'Chicago' },
    ]);
    this.logger.log('Inserted predefined cities.');

    const cityFactory = factoryManager.get(City);
    await cityFactory.saveMany(10);
    this.logger.log('Inserted 10 random cities using the factory.');
  }
}
