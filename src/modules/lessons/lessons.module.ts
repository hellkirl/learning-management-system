import { Module } from '@nestjs/common';
import { LessonsService } from './lessons.service';
import { LessonsController } from './lessons.controller';
import { Evaluation } from './entities/evaluation.entity';
import { Lesson } from './entities/lesson.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersService } from '../users/users.service';
import { User } from '../users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Lesson, Evaluation])],
  controllers: [LessonsController],
  providers: [LessonsService, UsersService],
})
export class LessonsModule {}
