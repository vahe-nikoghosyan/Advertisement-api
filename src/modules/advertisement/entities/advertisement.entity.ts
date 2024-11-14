import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from 'typeorm';
import { City } from '../../city/entities/city.entity';
import { ZipCode } from '../../zipcode/entities/zipcode.entity';

@Entity('advertisements')
export class Advertisement {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  address: string;

  @Column({ type: 'decimal' })
  price: number;

  @Column()
  rooms: number;

  @Column()
  bathrooms: number;

  @Column({ name: 'living_sq_ft' })
  livingSqFt: number;

  @Column({ type: 'text', nullable: true })
  otherDetails: string;

  @ManyToOne(() => City, (city) => city.advertisements, { eager: true })
  @JoinColumn({ name: 'city_id' })
  city: City;

  @ManyToOne(() => ZipCode, (zipcode) => zipcode.advertisements, {
    eager: true,
  })
  @JoinColumn({ name: 'zip_code_id' })
  zipCode: ZipCode;
}
