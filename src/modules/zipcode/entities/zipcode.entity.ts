import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Advertisement } from '../../advertisement/entities/advertisement.entity';

@Entity('zip-codes')
export class ZipCode {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  code: string;

  @OneToMany(() => Advertisement, (advertisement) => advertisement.zipCode)
  advertisements: Advertisement[];
}
