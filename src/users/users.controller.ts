/* eslint-disable prettier/prettier */
import { Controller, Delete, Get, Post, Put } from '@nestjs/common';

@Controller('users')
export class UsersController {
    @Post()
    create(): string {
        return 'This action adds a new user';
    }

    @Get()
    findAll(): string {
        return 'This action returns all users';
    }

    @Get(':id')
    findOne(id: string): string {
        return `This action returns a user with id ${id}`;
    }

    @Put(':id')
    update(id: string): string {
        return `This action updates a user with id ${id}`;
    }

    @Delete(':id')
    remove(id: string): string {
        return `This action removes a user with id ${id}`;
    }
}
