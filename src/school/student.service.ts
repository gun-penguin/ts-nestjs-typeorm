import { Injectable } from "@nestjs/common";
import { BaseService } from "../common/service/base.service";
import { StudentDto, StudentInputDto, StudentUpdateDto } from "./dto";
import { StudentRepository } from "./repository/student.repository";

@Injectable()
export class StudentService extends BaseService {
  constructor(private studentRepository: StudentRepository) {
    super();
  }

  async getStudent(id: number): Promise<StudentDto> {
    const info = await this.schoolDbNoTran(async (manager) => {
      return await this.studentRepository.getStudentById(manager, id);
    });

    return StudentDto.toDto(info);
  }

  async getStudentClass(id: number): Promise<StudentDto> {
    const info = await this.schoolDbNoTran(async (manager) => {
      return await this.studentRepository.getStudentClassById(manager, id);
    });

    return StudentDto.toDto(info);
  }

  async createStudent(input: StudentInputDto): Promise<boolean> {
    const classId = await this.schoolDbNoTran(async (manager) => {
      return await this.studentRepository.createStudent(manager, input);
    });

    return classId > 0 ? true : false;
  }

  async updateStudent(update: StudentUpdateDto): Promise<boolean> {
    const result = await this.schoolDbNoTran(async (manager) => {
      return await this.studentRepository.updateStudent(manager, update);
    });

    return result ? result : false;
  }
}
