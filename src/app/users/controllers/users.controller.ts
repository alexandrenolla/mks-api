import { Controller, Get, Post, Body, Param, Delete, Put, NotFoundException } from '@nestjs/common';
import { UsersService } from '../service/users.service';
import { CreateUserDto } from '../dtos/CreateUserDto.dto';
import { UpdateUserDto } from '../dtos/UpdateUserDto.dto';
import { UserDto } from '../dtos/UserDto.dto';

@Controller('api/users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}

    // CREATE
    @Post()
    async create(@Body() body: CreateUserDto): Promise<UserDto> {
        const createdUser = await this.usersService.create(body);
        return new UserDto(createdUser);
    }

    // READ ALL 
    @Get()
    async getAll(): Promise<UserDto[]> {
        return this.usersService.getAll();
    }

    // READ BY ID
    @Get(':id')
    async getById(@Param('id') id: number): Promise<UserDto> {
        try {
            const user = await this.usersService.getById(id);
            if (!user) {
                throw new NotFoundException('User not found.');
            } else {
                return user;
            }
        } catch (error) {
            // Status Code 404
            throw new NotFoundException('User not found.');
        }
    }

    // UPDATE BY ID
    @Put(':id')
    async update(@Param('id') id: number, @Body() body: UpdateUserDto): Promise<UserDto> {
        try {
            const updatedUser = await this.usersService.update(id, body);
            return updatedUser;
        } catch (error) {
            // Status Code 404
            throw new NotFoundException('User not found.');
        }
    }

    // DELETE BY ID
    @Delete(':id')
    async delete(@Param('id') id: number): Promise<void> {
        try {
            const movie = await this.usersService.getById(id);
            if (!movie) {
                throw new NotFoundException('User not found.');
            } else {
                await this.usersService.delete(id);
            }
        } catch (error) {
            // Status Code 404
            throw new NotFoundException('User not found.');
        }
    }
}
