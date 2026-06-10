import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, ManyToMany, OneToMany } from 'typeorm';
import { Class } from '../../classes/entities/class.entity';
import { StudentSubject } from 'src/users/entities/student-subject.entity';
import { Teacher } from 'src/users/entities/teacher.entity';

@Entity('subjects')
export class Subject {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string; // e.g. "Mathematics", "Physics"

  @ManyToOne(() => Class, (cls) => cls.subjects, { onDelete: 'CASCADE' })
  class: Class;

  @ManyToMany(() => Teacher, (teacher) => teacher.subjects)
  teachers: Teacher[];

  @OneToMany(() => StudentSubject, (studentSubject) => studentSubject.subject)
  students: StudentSubject[];
}
