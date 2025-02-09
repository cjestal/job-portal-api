import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { EmployersModule } from './employers/employers.module';
import { JobsModule } from './jobs/jobs.module';
import { AuthModule } from './auth/auth.module';
import { ApplicationsModule } from './applications/applications.module';
import { JobPostingModule } from './job-posting/job-posting.module';

@Module({
  imports: [
    UsersModule,
    EmployersModule,
    JobsModule,
    AuthModule,
    ApplicationsModule,
    JobPostingModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
