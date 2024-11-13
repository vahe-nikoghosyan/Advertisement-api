import { Seed } from './seed';
import { CityEntity } from '../modules/city/entities/city.entity';
import { City } from '../database/data/cities';

export class AbilityCreateSeed extends Seed<CityEntity> {
  constructor() {
    super(CityEntity, Object.values(City));
  }
}
