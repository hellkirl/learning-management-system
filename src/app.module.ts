import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './modules/users/entities/user.entity';
import { Lesson } from './modules/lessons/entities/lesson.entity';
import { Evaluation } from './modules/lessons/entities/evaluation.entity';
import { UsersModule } from './modules/users/users.module';
import { LessonsModule } from './modules/lessons/lessons.module';
import { AuthModule } from './modules/auth/auth.module';
import config from './config/prod';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: config.dbHost,
      port: 5432,
      username: config.dbUser,
      password: config.dbPassword,
      database: config.dbName,
      entities: [User, Lesson, Evaluation],
      synchronize: true,
    }),
    UsersModule,
    LessonsModule,
    AuthModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
