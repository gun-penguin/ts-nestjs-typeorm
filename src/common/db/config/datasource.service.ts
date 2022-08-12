import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { DataSource } from "typeorm";
import { join } from "path";

@Injectable()
export class DataSourceService {
  static dataSource: DataSourceService = null;
  static isInit: boolean = false;

  schoolDataSource: DataSource = null;

  constructor(private configService: ConfigService) {
    DataSourceService.dataSource = this;
  }

  static async getInstance() {
    if (!DataSourceService.isInit) {
      const schoolEntitiesDir = join(
        __dirname,
        "../entity/school/*.entity{.ts,.js}"
      );

      DataSourceService.dataSource.schoolDataSource = new DataSource({
        name: "db1",
        type: "mysql",
        username:
          DataSourceService.dataSource.configService.get<string>("DB1_USER"),
        password:
          DataSourceService.dataSource.configService.get<string>(
            "DB1_PASSWORD"
          ),
        port: DataSourceService.dataSource.configService.get<number>(
          "DB1_PORT"
        ),
        host: DataSourceService.dataSource.configService.get<string>(
          "DB1_HOST"
        ),
        database:
          DataSourceService.dataSource.configService.get<string>("DB1_NAME"),
        entities: [schoolEntitiesDir],
        synchronize: false,
        logging: ["query", "error"],
        extra: {
          connectionLimit:
            DataSourceService.dataSource.configService.get<number>(
              "DB1_CONNECTION_SIZE"
            ),
        },
        // autoLoadEntities: true,
      });

      try {
        await DataSourceService.dataSource.schoolDataSource.initialize();
        console.log("db1 Data Source has been initialized!");
      } catch (e) {
        console.error("Error during Data Source initialization db1", e);
        return;
      }

      DataSourceService.isInit = true;
    }

    return DataSourceService.dataSource;
  }
}
