import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateLessonInput } from './inputs/lesson.input';
import { Repository } from 'typeorm';
import { Lesson } from './lesson.entity';
import { v4 as uudi } from 'uuid';
import { STATUS_CODES } from 'http';

@Injectable()
export class LessonService {
  constructor(
    @InjectRepository(Lesson)
    private lessonRepository: Repository<Lesson>,
  ) {}

  public async getLesson(id: string): Promise<Lesson> {
    return this.lessonRepository.findOne({ id });
  }

  public async getLessons(): Promise<Lesson[]> {
    return this.lessonRepository.find();
  }

  public async createLesson(
    createLessonInput: CreateLessonInput,
  ): Promise<Lesson> {
    const { name, startDate, endDate, students } = createLessonInput;
    const lesson = this.lessonRepository.create({
      id: uudi(),
      name,
      startDate,
      endDate,
      students,
    });
    return this.lessonRepository.save(lesson);
  }

  public async assignStudentsToLesson(
    lessonId: string,
    studentIds: string[],
  ): Promise<Lesson> {
    const lesson = await this.lessonRepository.findOne({ id: lessonId });
    lesson.students = [...lesson.students, ...studentIds];
    return this.lessonRepository.save(lesson);
  }
}
