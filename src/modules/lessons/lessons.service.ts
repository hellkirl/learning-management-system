import { Injectable } from '@nestjs/common';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { Lesson } from './entities/lesson.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEvaluationDto } from './dto/create-evaluations.dto';
import { Evaluation } from './entities/evaluation.entity';
import { User } from '../users/entities/user.entity';
import logger from '../../common/logger';

@Injectable()
export class LessonsService {
  constructor(
    @InjectRepository(Lesson)
    private readonly lessonRepository: Repository<Lesson>,
    @InjectRepository(Evaluation)
    private readonly evaluationRepository: Repository<Evaluation>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createLessonDto: CreateLessonDto) {
    try {
      return await this.lessonRepository.save(createLessonDto);
    } catch (err) {
      logger.error('[LessonsService][create]:', err);
    }
  }

  async findAll() {
    try {
      return await this.lessonRepository.find({
        relations: ['evaluations', 'evaluations.user'],
      });
    } catch (err) {
      logger.error('[LessonsService][findAll]:', err);
    }
  }

  async findOne(id: number) {
    try {
      return await this.lessonRepository.findOne({ where: { id } });
    } catch (err) {
      logger.error('[LessonsService][findOne]:', err);
    }
  }

  async remove(id: number) {
    try {
      const res = await this.lessonRepository.delete(id);
      if (res.affected > 0) {
        return;
      }
    } catch (err) {
      logger.error('[LessonsService][remove]:', err);
    }
  }

  async createEvaluation(
    lessonId: number,
    createEvaluationDto: CreateEvaluationDto,
  ) {
    const d = new Date();
    const lesson = await this.lessonRepository.findOne({
      where: { id: lessonId },
    });
    const user = await this.userRepository.findOne({
      where: { id: createEvaluationDto.userId },
    });

    try {
      const res = await this.evaluationRepository.save({
        lesson: lesson,
        score: createEvaluationDto.score,
        createdAt:
          d.toISOString().split('T')[0] + ' ' + d.toTimeString().split(' ')[0],
        user: user,
      });
      if (res) {
        return res;
      }
    } catch (err) {
      logger.error('[LessonsService][createEvaluation]:', err);
    }
  }
}
