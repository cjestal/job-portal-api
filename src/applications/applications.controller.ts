import { Controller, Delete, Get, Post, Put } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Applications')
@Controller('applications')
export class ApplicationsController {
  @Post()
  create(): string {
    return 'This action adds a new application';
  }

  @Get()
  findAll(): string {
    return 'This action returns all applications';
  }

  @Get(':id')
  findOne(id: string): string {
    return `This action returns a application with id ${id}`;
  }

  @Put(':id')
  update(id: string): string {
    return `This action updates a application with id ${id}`;
  }

  @Delete(':id')
  remove(id: string): string {
    return `This action removes a application with id ${id}`;
  }
}
