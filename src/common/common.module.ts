import { Module } from "@nestjs/common";
import { DataSourceService } from "./db/config/datasource.service";
import { BaseService } from "./service/base.service";

@Module({
  providers: [DataSourceService, BaseService],
})
export class CommonModule { }
