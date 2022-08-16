import { Test, TestingModule } from "@nestjs/testing";
import { ConfigModule } from "@nestjs/config";
import { SchoolService } from "./school.service";
import { SchoolRepository } from "./repository/school.repository";
import { CommonModule } from "../common/common.module";
import { SchoolInputDto, SchoolUpdateDto } from "./dto";

describe("SchoolService", () => {
  let service: SchoolService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({ isGlobal: true, envFilePath: ".env" }),
        CommonModule,
      ],
      providers: [SchoolService, SchoolRepository],
    }).compile();

    service = module.get<SchoolService>(SchoolService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it(" getSchoolById ", async () => {
    const result = await service.getSchool(1);
    console.log("result=>" + JSON.stringify(result));
    expect(result).toBeDefined();
  });

  it(" createSchool ", async () => {
    const param = new SchoolInputDto();
    param.name = "서울초등학교";
    param.etc = "서울초등학교 입니다.";

    const result = await service.createSchool(param);
    console.log("result=>" + JSON.stringify(result));
    expect(result).toBeDefined();
  });

  it(" updateSchool ", async () => {
    const param = new SchoolUpdateDto();
    param.name = "서울초등학교1";
    param.etc = "서울초등학교 입니다.";
    param.id = 100;

    const result = await service.updateSchool(param);
    console.log("result=>" + JSON.stringify(result));
    expect(result).toBeDefined();
  });

  it(" getSchoolClass ", async () => {
    const result = await service.getSchoolClass(1);
    console.log("result=> " + JSON.stringify(result));
    expect(result).toBeDefined();
  });

  it(" getSchoolClassLikeName ", async () => {
    const result = await service.getSchoolClassLikeName("서울초등학교1");
    console.log("result=> " + JSON.stringify(result));
    expect(result).toBeDefined();
  });

  it(" getSchoolFromSubQueryLikeName ", async () => {
    const result = await service.getSchoolFromSubQueryLikeName("서울초등학교1");
    console.log("result=> " + JSON.stringify(result));
    expect(result).toBeDefined();
  });

  it(" getSchoolClassLeftJoin ", async () => {
    const result = await service.getSchoolClassLeftJoin(1);
    console.log("result=> " + JSON.stringify(result));
    expect(result).toBeDefined();
  });

  it(" getSchoolClassInnerJoin ", async () => {
    const result = await service.getSchoolClassInnerJoin(1);
    console.log("result=> " + JSON.stringify(result));
    expect(result).toBeDefined();
  });

  it(" getSchoolClassPage ", async () => {
    const result = await service.getSchoolClassPage(1, 3);
    console.log("result=> " + JSON.stringify(result));
    expect(result).toBeDefined();
  });
});
