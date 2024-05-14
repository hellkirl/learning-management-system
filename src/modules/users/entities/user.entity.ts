import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn({ name: 'id' })
  id: number;

  @Column({ nullable: false, unique: false, length: 100 })
  name: string;

  @Column({ nullable: false, unique: true, length: 30 })
  email: string;

  @Column({ nullable: false, unique: false, length: 100 })
  password: string;
}
