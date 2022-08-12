import { Injectable } from "@nestjs/common";
import { BaseService } from "../common/service/base.service";
import { ClassDto, ClassInputDto, ClassUpdateDto } from "./dto";
import { ClassRepository } from "./repository/class.repository";
import { ClassEntity } from "src/common/db/entity/school";

@Injectable()
export class ClassService extends BaseService {
  constructor(private classRepository: ClassRepository) {
    super();
  }

  async getClassBySchoolId(schoolId: number): Promise<ClassDto[]> {
    const info = await this.schoolDbNoTran(async (manager) => {
      return await this.classRepository.getClassBySchoolId(manager, schoolId);
    });

    return ClassDto.toDtoList(info);
  }

  async getClassById(id: number): Promise<ClassDto> {
    const info = await this.schoolDbNoTran(async (manager) => {
      return await this.classRepository.getClassById(manager, id);
    });

    return ClassDto.toDto(info);
  }

  async createClass(input: ClassInputDto): Promise<boolean> {
    const classId = await this.schoolDbTran(async (manager) => {
      const db = await this.classRepository.getClassByGradeClass(
        manager,
        input.schoolId,
        input.grade,
        input.class
      );

      if (db) {
        throw new Error("이미 존재하는 반");
      }

      return await this.classRepository.createClass(manager, input);
    });

    return classId > 0 ? true : false;
  }

  async updateClass(classUpdate: ClassUpdateDto): Promise<boolean> {
    const result = await this.schoolDbNoTran(async (manager) => {
      const db = await this.classRepository.getClassByGradeClass(
        manager,
        classUpdate.schoolId,
        classUpdate.grade,
        classUpdate.class
      );

      if (db) {
        throw new Error("이미 존재하는 반");
      }

      return await this.classRepository.updateClass(manager, classUpdate);
    });

    return result ? result : false;
  }

  async getClassSchool(id: number): Promise<ClassDto> {
    const info = await this.schoolDbNoTran(async (manager) => {
      return await this.classRepository.getClassSchoolById(manager, id);
    });

    return ClassDto.toDto(info);
  }

  async getClassStudent(id: number): Promise<ClassDto> {
    const info = await this.schoolDbNoTran(async (manager) => {
      return await this.classRepository.getClassStudentById(manager, id);
    });

    return ClassDto.toDto(info);
  }

  async getClassStudentSchool(id: number): Promise<ClassDto> {
    const info = await this.schoolDbNoTran(async (manager) => {
      return await this.classRepository.getClassStudentSchoolById(manager, id);
    });

    return ClassDto.toDto(info);
  }

  async getListClassStudentCount(schoolId: number): Promise<ClassDto[]> {
    const info = await this.schoolDbNoTran(async (manager) => {
      const list: ClassEntity[] =
        await this.classRepository.getAllClassStudentBySchoolId(
          manager,
          schoolId
        );
      const countList =
        await this.classRepository.getAllClassStudentCountBySchoolId(
          manager,
          schoolId
        );
      return { list, countList };
    });

    const dtoList = ClassDto.toDtoList(info.list);
    return ClassDto.setStudentCount(dtoList, info.countList);
  }
}
