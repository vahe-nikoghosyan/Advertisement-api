import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Advertisement } from '../../advertisement/entities/advertisement.entity';

@Entity('cities')
export class City {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string;

  @OneToMany(() => Advertisement, (advertisement) => advertisement.city)
  advertisements: Advertisement[];
}
