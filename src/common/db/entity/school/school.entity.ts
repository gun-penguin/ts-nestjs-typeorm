import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import { ClassEntity } from "./class.entity";
import { SchoolBaseEntity } from "./school-base.entity";

@Entity("school")
export class SchoolEntity extends SchoolBaseEntity {
  @PrimaryGeneratedColumn("increment")
  id: number;

  @Column({ type: "varchar", length: 50, comment: "이름" })
  name: string;

  @Column({ type: "varchar", length: 100, comment: "etc" })
  etc: string;

  @OneToMany((type) => ClassEntity, (classInfo) => classInfo.school)
  classList: ClassEntity[];
}
