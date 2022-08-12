import { Injectable } from "@nestjs/common";
import { BaseService } from "../common/service/base.service";
import { SchoolRepository } from "./repository/school.repository";
import { SchoolDto, SchoolUpdateDto } from "./dto/";
import { SchoolInputDto } from "./dto/school-input.dto";
import { ISchoolRaw } from "src/common/db/entity/school/raw";

@Injectable()
export class SchoolService extends BaseService {
  constructor(private schoolRepository: SchoolRepository) {
    super();
  }

  async getSchool(id: number): Promise<SchoolDto> {
    const info = await this.schoolDbNoTran(async (manager) => {
      return await this.schoolRepository.getSchoolById(manager, id);
    });

    return SchoolDto.toDto(info);
  }

  async getSchoolClass(id: number): Promise<SchoolDto> {
    const info = await this.schoolDbNoTran(async (manager) => {
      return await this.schoolRepository.getSchoolClassById(manager, id);
    });

    return SchoolDto.toDto(info);
  }

  async getSchoolClassLikeName(name: string): Promise<SchoolDto[]> {
    const info = await this.schoolDbNoTran(async (manager) => {
      return await this.schoolRepository.getSchoolClassLikeName(manager, name);
    });

    return SchoolDto.toDtoList(info);
  }

  async getSchoolFromSubQueryLikeName(name: string): Promise<ISchoolRaw[]> {
    const info = await this.schoolDbNoTran(async (manager) => {
      return await this.schoolRepository.getSchoolFromSubQueryLikeName(
        manager,
        name
      );
    });

    return info;
  }

  async getSchoolClassCount(id: number): Promise<SchoolDto> {
    const info = await this.schoolDbNoTran(async (manager) => {
      const school = await this.schoolRepository.getSchoolClassById(
        manager,
        id
      );
      const countInfo = await this.schoolRepository.getSchoolClassCountById(
        manager,
        id
      );

      return { school, countInfo };
    });

    const dto = SchoolDto.toDto(info.school);
    dto.classCount = info.countInfo.classCount;
    return dto;
  }

  async getSchoolClassLeftJoin(id: number): Promise<SchoolDto> {
    const info = await this.schoolDbNoTran(async (manager) => {
      return await this.schoolRepository.getSchoolClassLeftJoinById(
        manager,
        id
      );
    });

    return SchoolDto.toDto(info);
  }

  async getSchoolClassInnerJoin(id: number): Promise<SchoolDto> {
    const info = await this.schoolDbNoTran(async (manager) => {
      return await this.schoolRepository.getSchoolClassInnerJoinById(
        manager,
        id
      );
    });

    return SchoolDto.toDto(info);
  }

  async createSchool(schoolInput: SchoolInputDto): Promise<boolean> {
    const schoolId = await this.schoolDbTran(async (manager) => {
      const db = await this.schoolRepository.getSchoolByName(
        manager,
        schoolInput.name
      );

      if (db) {
        throw new Error("같은 이름의 학교 존재");
      }

      return await this.schoolRepository.createSchool(manager, schoolInput);
    });

    return schoolId > 0 ? true : false;
  }

  async updateSchool(schoolUpdate: SchoolUpdateDto): Promise<boolean> {
    return await this.schoolDbNoTran(async (manager) => {
      return await this.schoolRepository.updateSchool(manager, schoolUpdate);
    });
  }
}
