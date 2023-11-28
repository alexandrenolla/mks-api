import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { UsuariosService } from './usuarios.service';
import { Usuario } from './usuario.entity';

@Controller('usuarios')
export class UsuariosController {
    constructor(private readonly usuariosService: UsuariosService) {}

    // CREATE
    @Post()
    async create(@Body() usuario: Usuario): Promise<Usuario> {
        return await this.usuariosService.create(usuario);
    }

    // READ ALL 
    @Get()
    async getAll(): Promise<Usuario[]> {
        return await this.usuariosService.getAll();
    }

    // READ BY ID
    @Get(':id')
    async getById(@Param('id') id: number): Promise<Usuario> {
        // Validação para Usuário inexistente.
        const usuario = await this.usuariosService.getById(id);
        if (!usuario) {
            throw new Error('Usuario não encontrado.');
        } else {
            return usuario;
        }
    }

    // UPDATE BY ID
    @Put(':id')
    async update(@Param('id') id: number, @Body() usuario: Usuario): Promise<Usuario> {
        return this.usuariosService.update(id, usuario);
    }

    // DELETE BY ID
    @Delete(':id')
    async delete(@Param('id') id: number): Promise<void> {
        // Validação para Usuário inexistente.
        const usuario = await this.usuariosService.getById(id);
        if (!usuario) {
            throw new Error('Usuário não encontrado.')
        } else {
            return this.usuariosService.delete(id);
        }
    }
}
