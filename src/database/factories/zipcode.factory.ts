import { setSeederFactory } from 'typeorm-extension';
import { ZipCode } from '../../modules/zipcode/entities/zipcode.entity';

export default setSeederFactory(ZipCode, (faker) => {
  const zipCode = new ZipCode();
  zipCode.code = faker.location.zipCode();
  return zipCode;
});
