import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { ClassEntity } from "./class.entity";
import { SchoolBaseEntity } from "./school-base.entity";

@Entity("student")
export class StudentEntity extends SchoolBaseEntity {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ type: "varchar", length: 50, comment: "이름" })
  name: string;

  @Column({ type: "int", name: "class_id" })
  classId: number;

  @ManyToOne(() => ClassEntity, (classInfo) => classInfo.studentList)
  @JoinColumn({ name: "class_id" })
  class: ClassEntity;
}
