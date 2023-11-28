import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) {}

    // CREATE
    async create(user: User): Promise<User> {
        const newUser = this.userRepository.create(user);
        return await this.userRepository.save(newUser);
    }

    // READ ALL 
    async getAll(): Promise<User[]> {
        return await this.userRepository.find();
    }
    // READ BY ID
    async getById(id: number): Promise<User> {
        return await this.userRepository.findOne({ where : { id }});
    }
    
    // UPDATE BY ID
    async update(id: number, user: User): Promise<User> {
        await this.userRepository.update(id, user);
        return await this.userRepository.findOne({ where : { id }});
    }

    // DELETE BY ID
    async delete(id: number): Promise<void> {
        await this.userRepository.delete(id);
    }
}
