import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Pokemon {
  @PrimaryGeneratedColumn()   'id':         number;
  @Column()                   'Name':       string;
  @Column({ nullable: true }) 'Type 1':     string;
  @Column({ nullable: true }) 'Type 2':     string;
  @Column({ nullable: true }) 'Total':      number;
  @Column({ nullable: true }) 'HP':         number;
  @Column({ nullable: true }) 'Attack':     number;
  @Column({ nullable: true }) 'Defense':    number;
  @Column({ nullable: true }) 'Sp. Atk':    number;
  @Column({ nullable: true }) 'Sp. Def':    number;
  @Column({ nullable: true }) 'Speed':      number;
  @Column({ nullable: true }) 'Generation': number;
  @Column({ nullable: true }) 'Legendary': boolean;
}
