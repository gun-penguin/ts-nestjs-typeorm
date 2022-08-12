import { Test, TestingModule } from "@nestjs/testing";
import { ConfigModule } from "@nestjs/config";
import { CommonModule } from "../common/common.module";
import { StudentService } from "./student.service";
import { StudentRepository } from "./repository/student.repository";
import { StudentInputDto, StudentUpdateDto } from "./dto";

describe("StudentService", () => {
  let service: StudentService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [
        ConfigModule.forRoot({ isGlobal: true, envFilePath: ".env" }),
        CommonModule,
      ],
      providers: [StudentService, StudentRepository],
    }).compile();

    service = module.get<StudentService>(StudentService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  it(" getStudent ", async () => {
    const result = await service.getStudent(1);
    console.log("result=> " + JSON.stringify(result));
    expect(result).toBeDefined();
  });

  it(" getStudentClass ", async () => {
    const result = await service.getStudentClass(1);
    console.log("result=> " + JSON.stringify(result));
    expect(result).toBeDefined();
  });

  it(" createStudent ", async () => {
    const param = new StudentInputDto();
    param.classId = 1;
    param.name = "학생1";

    const result = await service.createStudent(param);
    console.log("result=>" + JSON.stringify(result));
    expect(result).toBeDefined();
  });

  it(" updateStudent ", async () => {
    const param = new StudentUpdateDto();
    param.id = 1;
    param.classId = 1;
    param.name = "학생2";

    const result = await service.updateStudent(param);
    console.log("result=>" + JSON.stringify(result));
    expect(result).toBeDefined();
  });
});
