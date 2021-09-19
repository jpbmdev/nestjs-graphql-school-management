import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateLessonInput } from './lesson.input';
import { Repository } from 'typeorm';
import { Lesson } from './lesson.entity';
import { v4 as uudi } from 'uuid';

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
    const { name, startDate, endDate } = createLessonInput;
    const lesson = this.lessonRepository.create({
      id: uudi(),
      name,
      startDate,
      endDate,
    });
    return this.lessonRepository.save(lesson);
  }
}
