import { StudentEntity } from "../../common/db/entity/school";
import { ClassDto } from "./class.dto";

export class StudentDto {
  id: number;
  name: string;
  classId: number;
  class: ClassDto;

  static toDtoList(entity: StudentEntity[]): StudentDto[] {
    if (!entity) {
      return null;
    }

    const list: StudentDto[] = [];
    for (const item of entity) {
      list.push(StudentDto.toDto(item));
    }

    return list;
  }

  static toDto(entity: StudentEntity): StudentDto {
    if (!entity) {
      return null;
    }

    const dto = new StudentDto();
    dto.id = entity.id;
    dto.name = entity.name;
    dto.classId = entity.classId;
    dto.class = ClassDto.toDto(entity.class);

    return dto;
  }
}
