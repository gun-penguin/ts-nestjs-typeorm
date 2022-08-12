import { Injectable } from "@nestjs/common";
import { ClassEntity } from "../../common/db/entity/school";
import { EntityManager } from "typeorm";
import { DateTime } from "luxon";
import { ClassInputDto, ClassUpdateDto } from "../dto";
import { IClassStudentCount } from "src/common/db/entity/school/raw";

@Injectable()
export class ClassRepository {
  async getClassBySchoolId(
    manager: EntityManager,
    schoolId: number
  ): Promise<ClassEntity[]> {
    return await manager
      .createQueryBuilder(ClassEntity, "c")
      .where("c.schoolId = :schoolId", { schoolId })
      .orderBy("c.id", "ASC")
      .getMany();
  }

  async getClassById(manager: EntityManager, id: number): Promise<ClassEntity> {
    return await manager
      .createQueryBuilder(ClassEntity, "c")
      .where("c.id = :id", { id })
      .getOne();
  }

  async getClassByGradeClass(
    manager: EntityManager,
    schoolId: number,
    grade: string,
    cls: string
  ): Promise<ClassEntity> {
    return await manager
      .createQueryBuilder(ClassEntity, "c")
      .where("c.schoolId = :schoolId", { schoolId })
      .andWhere("c.grade = :grade", { grade })
      .andWhere("c.class = :cls", { cls })
      .getOne();
  }

  async createClass(
    manager: EntityManager,
    input: ClassInputDto
  ): Promise<number> {
    const values = new ClassEntity();
    values.schoolId = input.schoolId;
    values.grade = input.grade;
    values.class = input.class;
    values.createdAt = DateTime.local();
    values.updatedAt = DateTime.local();

    const intoFiled = [
      "id",
      "schoolId",
      "grade",
      "class",
      "createdAt",
      "updatedAt",
    ];

    const result = await manager
      .createQueryBuilder()
      .insert()
      .into(ClassEntity, intoFiled)
      .values(values)
      .execute();

    return result.identifiers[0]["id"];
  }

  async updateClass(
    manager: EntityManager,
    update: ClassUpdateDto
  ): Promise<boolean> {
    const updateParam = {
      updatedAt: DateTime.local(),
    };
    if (update.schoolId) {
      updateParam["schoolId"] = update.schoolId;
    }

    if (update.grade) {
      updateParam["grade"] = update.grade;
    }

    if (update.class) {
      updateParam["class"] = update.class;
    }

    const result = await manager
      .createQueryBuilder()
      .update(ClassEntity)
      .set(updateParam)
      .where("id = :id", { id: update.id })
      .execute();

    return result.affected > 0 ? true : false;
  }

  // 조인으로 학급 학교 정보 가져오기
  async getClassSchoolById(
    manager: EntityManager,
    id: number
  ): Promise<ClassEntity> {
    return await manager
      .createQueryBuilder(ClassEntity, "c")
      .select(["c.id", "c.class", "c.grade", "s.id", "s.name"])
      .leftJoin("c.school", "s")
      .where("c.id = :id", { id })
      .getOne();
  }

  // 조인으로 학급 학생 정보 가져오기
  async getClassStudentById(
    manager: EntityManager,
    id: number
  ): Promise<ClassEntity> {
    return await manager
      .createQueryBuilder(ClassEntity, "c")
      .select(["c.id", "c.class", "c.grade", "s.id", "s.name"])
      .leftJoin("c.studentList", "s")
      .where("c.id = :id", { id })
      .orderBy("s.id", "DESC")
      .getOne();
  }

  // 조인으로 학교의 모든 학급 정보 가져오기
  async getAllClassStudentBySchoolId(
    manager: EntityManager,
    id: number
  ): Promise<ClassEntity[]> {
    return await manager
      .createQueryBuilder(ClassEntity, "c")
      .select(["c.id", "c.class", "c.grade", "s.id", "s.name"])
      .leftJoin("c.studentList", "s")
      .where("c.schoolId = :id", { id })
      .orderBy("c.id", "ASC")
      .addOrderBy("s.id", "DESC")
      .getMany();
  }

  // 학교의 모든 학급 학생 수 가져오기
  async getAllClassStudentCountBySchoolId(
    manager: EntityManager,
    id: number
  ): Promise<IClassStudentCount[]> {
    return await manager
      .createQueryBuilder(ClassEntity, "c")
      .select("c.id", "id")
      .addSelect("COUNT(s.id)", "studentCount")
      .leftJoin("c.studentList", "s")
      .where("c.schoolId = :id", { id })
      .groupBy("c.id")
      .orderBy("c.id", "ASC")
      .getRawMany();
  }

  // 조인으로 학급 학생 정보 가져오기
  async getClassStudentSchoolById(
    manager: EntityManager,
    id: number
  ): Promise<ClassEntity> {
    return await manager
      .createQueryBuilder(ClassEntity, "c")
      .select([
        "c.id",
        "c.class",
        "c.grade",
        "sc.id",
        "sc.name",
        "st.id",
        "st.name",
      ])
      .leftJoin("c.school", "sc")
      .leftJoin("c.studentList", "st")
      .where("c.id = :id", { id })
      .orderBy("st.id", "DESC")
      .getOne();
  }
}
