import { DateTime } from "luxon";
import { SchoolEntity } from "../../common/db/entity/school";
import { ClassDto } from "./class.dto";

export class SchoolDto {
  id: number;
  name: string;
  etc: string;
  updatedAt: DateTime;
  classList: ClassDto[];
  classCount: number;

  static toDtoList(entity: SchoolEntity[]): SchoolDto[] {
    if (!entity) {
      return null;
    }

    const list: SchoolDto[] = [];
    for (const item of entity) {
      list.push(SchoolDto.toDto(item));
    }

    return list;
  }

  static toDto(entity: SchoolEntity): SchoolDto {
    if (!entity) {
      return null;
    }

    const dto = new SchoolDto();
    dto.id = entity.id;
    dto.name = entity.name;
    dto.etc = entity.etc;
    dto.updatedAt = entity.updatedAt;
    dto.classList = ClassDto.toDtoList(entity.classList);

    return dto;
  }
}
