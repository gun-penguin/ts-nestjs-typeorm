import { DateTime } from "luxon";
import { BaseEntity, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { DateTimeTransformer } from "../../transformer/date-time-transformer";

export abstract class SchoolBaseEntity extends BaseEntity {
  @CreateDateColumn({
    name: "created_at",
    comment: "생성일",
    type: "timestamp",
    transformer: new DateTimeTransformer(),
  })
  createdAt: DateTime;

  @UpdateDateColumn({
    name: "updated_at",
    comment: "수정일",
    type: "timestamp",
    transformer: new DateTimeTransformer(),
  })
  updatedAt: DateTime;
}
