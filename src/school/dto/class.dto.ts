import { IClassStudentCount } from "src/common/db/entity/school/raw";
import { ClassEntity } from "../../common/db/entity/school";
import { SchoolDto } from "./school.dto";
import { StudentDto } from "./student.dto";

export class ClassDto {
  id: number;
  schoolId: number;
  grade: string;
  class: string;
  school: SchoolDto;
  studentList: StudentDto[];
  studentCount: number;

  static toDtoList(entity: ClassEntity[]): ClassDto[] {
    if (!entity) {
      return null;
    }

    const list: ClassDto[] = [];
    for (const item of entity) {
      list.push(ClassDto.toDto(item));
    }

    return list;
  }

  static toDto(entity: ClassEntity): ClassDto {
    if (!entity) {
      return null;
    }

    const dto = new ClassDto();
    dto.id = entity.id;
    dto.schoolId = entity.schoolId;
    dto.grade = entity.grade;
    dto.class = entity.class;
    dto.school = SchoolDto.toDto(entity.school);
    dto.studentList = StudentDto.toDtoList(entity.studentList);

    return dto;
  }

  static setStudentCount(
    list: ClassDto[],
    countList: IClassStudentCount[]
  ): ClassDto[] {
    if (!list) {
      return null;
    }

    for (const dto of list) {
      for (const count of countList) {
        if (count.id == dto.id) {
          dto.studentCount = count.studentCount;
          break;
        }
      }
    }

    return list;
  }
}
