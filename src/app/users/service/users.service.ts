import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../user.entity';
import { CreateUserDto } from '../dtos/CreateUserDto.dto';
import { UpdateUserDto } from '../dtos/UpdateUserDto.dto';
import { UserDto } from '../dtos/UserDto.dto';

@Injectable()
export class UsersService {
    constructor( @InjectRepository(User) private userRepository: Repository<User> ) {}

    // CREATE
    async create(user: CreateUserDto): Promise<User> {
        const newUser = this.userRepository.create(user);
        return await this.userRepository.save(newUser);
    }

    // READ ALL 
    async getAll(): Promise<UserDto[]> {
        return await this.userRepository.find();
    }
    
    // READ BY ID
    async getById(id: number): Promise<UserDto> {
        const user = await this.userRepository.findOne({ where : { id }});
        return new UserDto(user);
    }
    
    // UPDATE BY ID
    async update(id: number, user: UpdateUserDto): Promise<UserDto> {
        await this.userRepository.update(id, user);
        const updatedUser = await this.userRepository.findOne({ where : { id }});
        return new UserDto(updatedUser)
    }

    // DELETE BY ID
    async delete(id: number): Promise<void> {
        await this.userRepository.delete(id);
    }
}
