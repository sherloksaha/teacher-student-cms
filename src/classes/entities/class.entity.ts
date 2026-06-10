import { Subject } from 'src/subjects/entities/subject.entity';
import { Student } from 'src/users/entities/student.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';


@Entity('classes')
export class Class {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  name: string; // e.g. "Class 9", "Class 10"

  @OneToMany(() => Student, (student) => student.class)
  students: Student[];

  @OneToMany(() => Subject, (subject) => subject.class)
  subjects: Subject[];
}
