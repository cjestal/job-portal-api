import { Module } from '@nestjs/common';
import { JobPostingController } from './job-posting.controller';

@Module({
  controllers: [JobPostingController]
})
export class JobPostingModule {}
