import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Usuario } from './usuario.entity';

@Injectable()
export class UsuariosService {
    constructor(
        @InjectRepository(Usuario)
        private usuarioRepository: Repository<Usuario>,
    ) {}

    // CREATE
    async create(usuario: Usuario): Promise<Usuario> {
        const novoUsuario = this.usuarioRepository.create(usuario);
        return await this.usuarioRepository.save(novoUsuario);
    }

    // READ ALL 
    async getAll(): Promise<Usuario[]> {
        return await this.usuarioRepository.find();
    }
    // READ BY ID
    async getById(id: number): Promise<Usuario> {
        return await this.usuarioRepository.findOne({ where : { id }});
    }
    
    // UPDATE BY ID
    async update(id: number, usuario: Usuario): Promise<Usuario> {
        await this.usuarioRepository.update(id, usuario);
        return await this.usuarioRepository.findOne({ where : { id }});
    }

    // DELETE BY ID
    async delete(id: number): Promise<void> {
        await this.usuarioRepository.delete(id);
    }
}
