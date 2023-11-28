import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './user.entity';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    // CREATE
    @Post()
    async create(@Body() user: User): Promise<User> {
        return await this.usersService.create(user);
    }

    // READ ALL 
    @Get()
    async getAll(): Promise<User[]> {
        return await this.usersService.getAll();
    }

    // READ BY ID
    @Get(':id')
    async getById(@Param('id') id: number): Promise<User> {
        // Validação para Usuário inexistente.
        const user = await this.usersService.getById(id);
        if (!user) {
            throw new Error('User not found.');
        } else {
            return user;
        }
    }

    // UPDATE BY ID
    @Put(':id')
    async update(@Param('id') id: number, @Body() user: User): Promise<User> {
        return this.usersService.update(id, user);
    }

    // DELETE BY ID
    @Delete(':id')
    async delete(@Param('id') id: number): Promise<void> {
        // Validação para Usuário inexistente.
        const user = await this.usersService.getById(id);
        if (!user) {
            throw new Error('User not found.')
        } else {
            return this.usersService.delete(id);
        }
    }
}
