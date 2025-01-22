import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { EmployersModule } from './employers/employers.module';
import { JobsModule } from './jobs/jobs.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [UsersModule, EmployersModule, JobsModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
