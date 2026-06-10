import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, ManyToMany } from 'typeorm';
import { City } from './city.entity';
import { Teacher } from 'src/users/entities/teacher.entity';
import { Student } from 'src/users/entities/student.entity';

@Entity('areas')
export class Area {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => City, (city) => city.areas, { onDelete: 'CASCADE' })
  city: City;

  @ManyToMany(() => Teacher, (teacher) => teacher.areas)
  teachers: Teacher[];

  @OneToMany(() => Student, (student) => student.area)
  students: Student[];
}
