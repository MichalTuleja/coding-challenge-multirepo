import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Pokemon {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  'Name': string;

  @Column()
  'Type 1': string;

  @Column()
  'Type 2': string;

  @Column()
  'Total': number;

  @Column()
  'HP': number;

  @Column()
  'Attack': number;

  @Column()
  'Defense': number;

  @Column()
  'Sp. Atk': number;

  @Column()
  'Sp. Def': number;

  @Column()
  'Speed': number;

  @Column()
  'Generation': number;

  @Column({ default: true })
  'Legendary': boolean;
}
