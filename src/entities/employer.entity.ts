import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, OneToMany } from 'typeorm';
import { Job } from './job.entity';

@Entity()
export class Employer extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  @Column()
  address: string;

  @OneToMany(() => Job, (job) => job.companyId)
  jobs: Job[];

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;
}