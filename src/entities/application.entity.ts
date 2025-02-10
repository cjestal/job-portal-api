import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, ManyToOne } from 'typeorm';
import { Job } from './job.entity';
import { User } from './users.entity';

@Entity()
export class Application extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Job, (job) => job.id)
  job: Job;

  @ManyToOne(() => User, (user) => user.id)
  user: User;

  @Column()
  resume: string;

  @Column()
  coverLetter: string;

  @Column()
  status: string;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;
}