import { Seeder, SeederFactoryManager } from 'typeorm-extension';
import { DataSource } from 'typeorm';
import { Logger } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { User, UserRole } from '../../modules/user/entities/user.entity';

export default class UserSeeder implements Seeder {
  private readonly logger = new Logger(UserSeeder.name);

  public async run(
    dataSource: DataSource,
    factoryManager: SeederFactoryManager
  ): Promise<void> {
    const repository = dataSource.getRepository(User);

    this.logger.log('Seeding users...');

    const adminPassword = await bcrypt.hash('admin123', 10);
    const userPassword = await bcrypt.hash('user123', 10);

    await repository.insert([
      { username: 'admin', password: adminPassword, role: UserRole.ADMIN },
      { username: 'user', password: userPassword, role: UserRole.USER },
    ]);

    this.logger.log('Inserted admin and regular user.');
  }
}
