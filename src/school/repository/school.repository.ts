import { Injectable } from "@nestjs/common";
import { SchoolEntity, ClassEntity } from "../../common/db/entity/school";
import { EntityManager } from "typeorm";
import { DateTime } from "luxon";
import { SchoolInputDto, SchoolUpdateDto } from "../dto";
import {
  ISchoolClassCount,
  ISchoolRaw,
} from "../../common/db/entity/school/raw";
import { JoinAttribute } from "typeorm/query-builder/JoinAttribute";

@Injectable()
export class SchoolRepository {
  async getSchoolById(
    manager: EntityManager,
    id: number
  ): Promise<SchoolEntity> {
    return await manager
      .createQueryBuilder(SchoolEntity, "s")
      .where("s.id = :id", { id })
      .getOne();
  }

  async getSchoolByName(
    manager: EntityManager,
    name: string
  ): Promise<SchoolEntity> {
    return await manager
      .createQueryBuilder(SchoolEntity, "s")
      .where("s.name = :name", { name })
      .getOne();
  }

  // From 서브쿼리
  async getSchoolFromSubQueryLikeName(
    manager: EntityManager,
    name: string
  ): Promise<ISchoolRaw[]> {
    const subQ = await manager
      .createQueryBuilder(SchoolEntity, "s1")
      .select("s1.id", "id")
      .addSelect("s1.name", "name")
      .where("s1.name LIKE :schoolName", { schoolName: `%${name}%` });

    return await manager
      .createQueryBuilder()
      .select("s.id", "id")
      .addSelect("s.name", "name")
      .from("(" + subQ.getQuery() + ")", "s")
      .setParameters(subQ.getParameters())
      .orderBy("s.id", "ASC")
      .getRawMany();
  }

  // innerJoin 서브쿼리
  async getSchoolClassLikeName(
    manager: EntityManager,
    name: string
  ): Promise<SchoolEntity[]> {
    const subQ = await manager
      .createQueryBuilder(SchoolEntity, "s1")
      .select("s1.id", "id")
      .where("s1.name LIKE :schoolName", { schoolName: `%${name}%` });

    return await manager
      .createQueryBuilder(SchoolEntity, "s")
      .select(["s.id", "s.name", "c.id", "c.class", "c.grade"])
      .innerJoin("(" + subQ.getQuery() + ")", "s2", "s.id = s2.id")
      .leftJoin("s.classList", "c")
      .setParameters(subQ.getParameters())
      .orderBy("s.id", "ASC")
      .addOrderBy("c.id", "DESC")
      .getMany();
  }

  // 일반적 조인
  async getSchoolClassById(
    manager: EntityManager,
    id: number
  ): Promise<SchoolEntity> {
    return await manager
      .createQueryBuilder(SchoolEntity, "s")
      .select(["s.id", "s.name", "c.id", "c.class", "c.grade"])
      .leftJoin("s.classList", "c")
      .where("s.id = :id", { id })
      .orderBy("s.id", "ASC")
      .addOrderBy("c.id", "DESC")
      .getOne();
  }

  // 일반적 조인 및 필드외의 값 가져오기
  async getSchoolClassCountById(
    manager: EntityManager,
    id: number
  ): Promise<ISchoolClassCount> {
    return await manager
      .createQueryBuilder(SchoolEntity, "s")
      .select("s.id", "id")
      .addSelect("COUNT(c.id)", "classCount")
      .leftJoin("s.classList", "c")
      .where("s.id = :id", { id })
      .groupBy("s.id")
      .getRawOne();
  }

  // leftJoinAndMapMany 사용
  async getSchoolClassLeftJoinById(
    manager: EntityManager,
    id: number
  ): Promise<SchoolEntity> {
    const result = await manager
      .createQueryBuilder(SchoolEntity, "s")
      .leftJoinAndMapMany(
        "s.classList",
        ClassEntity,
        "c",
        "c.schoolId = s.id and s.id = :sid",
        { sid: id }
      )
      .where("s.id = :id", { id })
      .orderBy("s.id", "ASC")
      .addOrderBy("c.id", "DESC")
      .getOne();

    return result;
  }

  // innerJoinAndMapMany 사용
  async getSchoolClassInnerJoinById(
    manager: EntityManager,
    id: number
  ): Promise<SchoolEntity> {
    const result = await manager
      .createQueryBuilder(SchoolEntity, "s")
      .innerJoinAndMapMany(
        "s.classList",
        ClassEntity,
        "c",
        "c.schoolId = s.id and s.id = :sid",
        { sid: id }
      )
      .where("s.id = :id", { id })
      .orderBy("s.id", "ASC")
      .addOrderBy("c.id", "DESC")
      .getOne();

    return result;
  }

  // page 사용
  async getSchoolClassPageTotalCount(manager: EntityManager): Promise<number> {
    return await manager.createQueryBuilder(SchoolEntity, "s1").getCount();
  }

  // page 사용
  async getSchoolClassPage(
    manager: EntityManager,
    pageNumber: number = 1,
    pageSize: number = 10
  ): Promise<SchoolEntity[]> {
    const list = await manager
      .createQueryBuilder(SchoolEntity, "s1")
      .select("s1.id", "id")
      .orderBy("s1.id", "ASC")
      .skip(pageSize * (pageNumber - 1))
      .take(pageSize)
      .getRawMany();

    const ids = list.map((item) => {
      return item.id;
    });

    return ids && ids.length > 0
      ? await manager
          .createQueryBuilder(SchoolEntity, "s")
          .select(["s.id", "s.name", "c.id", "c.class", "c.grade"])
          .leftJoin("s.classList", "c")
          .where("s.id IN (:...ids)", { ids })
          .orderBy("s.id", "ASC")
          .addOrderBy("c.id", "DESC")
          .getMany()
      : null;
  }

  async createSchool(
    manager: EntityManager,
    schoolInput: SchoolInputDto
  ): Promise<number> {
    const school = new SchoolEntity();
    school.name = schoolInput.name;
    school.etc = schoolInput.etc ? schoolInput.etc : null;
    school.createdAt = DateTime.local();
    school.updatedAt = DateTime.local();

    const intoFiled = ["id", "name", "createdAt", "updatedAt"];
    if (school.etc) {
      intoFiled.push("etc");
    }

    const result = await manager
      .createQueryBuilder()
      .insert()
      .into(SchoolEntity, intoFiled)
      .values(school)
      .execute();

    return result.identifiers[0]["id"];
  }

  async updateSchool(
    manager: EntityManager,
    schoolUpdate: SchoolUpdateDto
  ): Promise<boolean> {
    const updateParam = {
      name: schoolUpdate.name,
      updatedAt: DateTime.local(),
    };
    if (schoolUpdate.etc) {
      updateParam["etc"] = schoolUpdate.etc;
    }

    const result = await manager
      .createQueryBuilder()
      .update(SchoolEntity)
      .set(updateParam)
      .where("id = :id", { id: schoolUpdate.id })
      .execute();

    return result.affected > 0 ? true : false;
  }
}
