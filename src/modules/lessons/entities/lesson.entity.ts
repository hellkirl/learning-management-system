import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Evaluation } from './evaluation.entity';

@Entity('lessons')
export class Lesson {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ nullable: false, unique: true, length: 100 })
  name: string;

  @Column({ nullable: false, unique: false, length: 20 })
  code: string;

  @OneToMany(() => Evaluation, (evaluation) => evaluation.lesson)
  evaluations: Evaluation[];
}
