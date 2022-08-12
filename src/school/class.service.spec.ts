import { Test, TestingModule } from "@nestjs/testing";
import { ConfigModule } from "@nestjs/config";
import { CommonModule } from "../common/common.module";
import { ClassInputDto, ClassUpdateDto } from "./dto";
import { ClassService } from "./class.service";
import { ClassRepository } from "./repository/class.repository";

describe("ClassService", () => {
  let service: ClassService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({ isGlobal: true, envFilePath: ".env" }),
        CommonModule,
      ],
      providers: [ClassService, ClassRepository],
    }).compile();

    service = module.get<ClassService>(ClassService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it(" getClassBySchoolId ", async () => {
    const result = await service.getClassBySchoolId(1);
    console.log("result=> " + JSON.stringify(result));
    expect(result).toBeDefined();
  });

  it(" getClassById ", async () => {
    const result = await service.getClassById(1);
    console.log("result=> " + JSON.stringify(result));
    expect(result).toBeDefined();
  });

  it(" createClass ", async () => {
    const param = new ClassInputDto();
    param.schoolId = 1;
    param.grade = "1";
    param.class = "1";

    const result = await service.createClass(param);
    console.log("result=>" + JSON.stringify(result));
    expect(result).toBeDefined();
  });

  it(" updateClass ", async () => {
    const param = new ClassUpdateDto();
    param.id = 1;
    param.schoolId = 1;
    param.grade = "1";
    param.class = "1";

    const result = await service.updateClass(param);
    console.log("result=>" + JSON.stringify(result));
    expect(result).toBeDefined();
  });

  it(" getClassSchool ", async () => {
    const result = await service.getClassSchool(1);
    console.log("result=> " + JSON.stringify(result));
    expect(result).toBeDefined();
  });

  it(" getClassStudent ", async () => {
    const result = await service.getClassStudent(1);
    console.log("result=> " + JSON.stringify(result));
    expect(result).toBeDefined();
  });

  it(" getClassStudentSchool ", async () => {
    const result = await service.getClassStudentSchool(1);
    console.log("result=> " + JSON.stringify(result));
    expect(result).toBeDefined();
  });

  it(" getListClassStudentCount ", async () => {
    const result = await service.getListClassStudentCount(1);
    console.log("result=> " + JSON.stringify(result));
    expect(result).toBeDefined();
  });
});
