// import { Entity, Column, PrimaryGeneratedColumn, BaseEntity, OneToMany } from 'typeorm';
// import { Application } from './application.entity';

// @Entity()
// export class User extends BaseEntity {
//   @PrimaryGeneratedColumn()
//   id: number;

//   @Column()
//   name: string;

//   @Column()
//   email: string;

//   @Column()
//   phone: string;

//   @Column()
//   password: string;

//   @OneToMany(() => Application, (Application) => Application.user)
//   applications: Application[];

//   @Column()
//   createdAt: Date;

//   @Column()
//   updatedAt: Date;
// }