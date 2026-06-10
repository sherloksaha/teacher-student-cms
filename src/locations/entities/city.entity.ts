import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { State } from './state.entity';
import { Area } from './area.entity';
@Entity('cities')
export class City {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => State, (state) => state.cities, { onDelete: 'CASCADE' })
  state: State;

  @OneToMany(() => Area, (area) => area.city)
  areas: Area[];
}
