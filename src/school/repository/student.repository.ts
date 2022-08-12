import { Injectable } from "@nestjs/common";
import { StudentEntity } from "../../common/db/entity/school";
import { EntityManager } from "typeorm";
import { DateTime } from "luxon";
import { StudentInputDto, StudentUpdateDto } from "../dto";

@Injectable()
export class StudentRepository {
  async getStudentById(
    manager: EntityManager,
    id: number
  ): Promise<StudentEntity> {
    return await manager
      .createQueryBuilder(StudentEntity, "s")
      .where("s.id = :id", { id })
      .getOne();
  }

  // 조인으로 학생 학급 정보 가져오기
  async getStudentClassById(
    manager: EntityManager,
    id: number
  ): Promise<StudentEntity> {
    return await manager
      .createQueryBuilder(StudentEntity, "s")
      .select(["s.id", "s.name", "s.classId", "c.id", "c.class", "c.grade"])
      .leftJoin("s.class", "c")
      .where("c.id = :id", { id })
      .getOne();
  }

  async createStudent(
    manager: EntityManager,
    input: StudentInputDto
  ): Promise<number> {
    const values = new StudentEntity();
    values.classId = input.classId;
    values.name = input.name;
    values.createdAt = DateTime.local();
    values.updatedAt = DateTime.local();

    const intoFiled = ["id", "classId", "name", "createdAt", "updatedAt"];

    const result = await manager
      .createQueryBuilder()
      .insert()
      .into(StudentEntity, intoFiled)
      .values(values)
      .execute();

    return result.identifiers[0]["id"];
  }

  async updateStudent(
    manager: EntityManager,
    update: StudentUpdateDto
  ): Promise<boolean> {
    const updateParam = {
      updatedAt: DateTime.local(),
    };
    if (update.classId) {
      updateParam["classId"] = update.classId;
    }

    if (update.name) {
      updateParam["name"] = update.name;
    }

    const result = await manager
      .createQueryBuilder()
      .update(StudentEntity)
      .set(updateParam)
      .where("id = :id", { id: update.id })
      .execute();

    return result.affected > 0 ? true : false;
  }
}
