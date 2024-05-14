import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Lesson } from './lesson.entity';

@Entity('evaluations')
export class Evaluation {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ nullable: false, unique: false, type: 'int' })
  score: number;

  @Column({ nullable: false, unique: false, type: 'date', name: 'created_at' })
  createdAt: Date;

  @ManyToOne(() => User)
  user: User;

  @ManyToOne(() => Lesson)
  lesson: Lesson;
}
