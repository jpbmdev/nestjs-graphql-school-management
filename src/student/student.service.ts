import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { Student } from './student.entity';
import { v4 as uudi } from 'uuid';
import { CreateStudentInput } from './inputs/student.input';

@Injectable()
export class StudentService {
  constructor(
    @InjectRepository(Student) private studentRepository: Repository<Student>,
  ) {}

  public async getStudents(): Promise<Student[]> {
    return this.studentRepository.find();
  }

  public async getStudent(id: string): Promise<Student> {
    return this.studentRepository.findOne({ id });
  }

  public async createStudent(
    createStudentInput: CreateStudentInput,
  ): Promise<Student> {
    const { firstName, lastName } = createStudentInput;

    const student = this.studentRepository.create({
      id: uudi(),
      firstName,
      lastName,
    });

    return this.studentRepository.save(student);
  }

  public async getManyStudents(studentIds: string[]): Promise<Student[]> {
    return this.studentRepository.find({
      where: {
        id: {
          $in: studentIds,
        },
      },
    });
  }
}
