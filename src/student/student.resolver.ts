import { Args, Mutation, Resolver, Query } from '@nestjs/graphql';
import { CreateStudentInput } from './student.input';
import { StudentService } from './student.service';
import { StudentType } from './student.type';

@Resolver(() => StudentType)
export class StudentResolver {
  constructor(private studentService: StudentService) {}

  @Query(() => StudentType)
  public async student(@Args('id') id: string) {
    return this.studentService.getStudent(id);
  }

  @Query(() => [StudentType])
  public async students() {
    return this.studentService.getStudents();
  }

  @Mutation(() => StudentType)
  public async createStudent(
    @Args('createStudentInput') createStudentInput: CreateStudentInput,
  ) {
    return this.studentService.createStudent(createStudentInput);
  }
}
