import { Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Employers')
@Controller('employers')
export class EmployersController {
  @Post()
  create(): string {
    return 'This action adds a new job posting';
  }

  @Get()
  findAll(): string {
    return 'This action returns all job postings';
  }

  @Get(':id')
  findOne(id: string): string {
    return `This action returns a job posting with id ${id}`;
  }

  @Put(':id')
  update(id: string): string {
    return `This action updates a job posting with id ${id}`;
  }

  @Delete(':id')
  remove(id: string): string {
    return `This action removes a job posting with id ${id}`;
  }
}
