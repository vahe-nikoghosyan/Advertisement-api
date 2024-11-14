import { setSeederFactory } from 'typeorm-extension';
import { City } from '../../modules/city/entities/city.entity';

export default setSeederFactory(City, (faker) => {
  const city = new City();
  city.name = faker.location.city();

  return city;
});
