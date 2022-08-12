import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from "typeorm";
import { SchoolBaseEntity } from "./school-base.entity";
import { SchoolEntity } from "./school.entity";
import { StudentEntity } from "./student.entity";

@Entity("class")
export class ClassEntity extends SchoolBaseEntity {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ type: "varchar", length: 10, comment: "학년" })
  grade: string;

  @Column({ type: "varchar", length: 10, comment: "반" })
  class: string;

  @Column({ type: "int", name: "school_id" })
  schoolId: number;

  @ManyToOne(() => SchoolEntity, (school) => school.classList)
  @JoinColumn({ name: "school_id" })
  school: SchoolEntity;

  @OneToMany((type) => StudentEntity, (studentInfo) => studentInfo.class)
  studentList: StudentEntity[];
}
