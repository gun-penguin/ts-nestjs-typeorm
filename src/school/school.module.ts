import { Module } from "@nestjs/common";
import { CommonModule } from "../common/common.module";
import { ClassService } from "./class.service";
import { ClassRepository } from "./repository/class.repository";
import { SchoolRepository } from "./repository/school.repository";
import { StudentRepository } from "./repository/student.repository";
import { SchoolService } from "./school.service";
import { StudentService } from "./student.service";

@Module({
  imports: [CommonModule],
  providers: [
    SchoolRepository,
    SchoolService,
    ClassRepository,
    ClassService,
    StudentRepository,
    StudentService,
  ],
})
export class SchoolModule {}
