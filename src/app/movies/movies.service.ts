import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Movie } from './movie.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateMovieDto } from './dtos/CreateMovieDto.dto';
import { UpdateMovieDto } from './dtos/UpdateMovieDto.dto';

@Injectable()
export class MoviesService {
    constructor( @InjectRepository(Movie) private readonly movieRepository: Repository<Movie> ) {}

    // CREATE
    async create(createMovieDto: CreateMovieDto): Promise<Movie> {
        const newMovie = this.movieRepository.create(createMovieDto);
        return await this.movieRepository.save(newMovie);
    }

    // READ ALL
    async getAll(): Promise<Movie[]> {
        return await this.movieRepository.find();
    }

    // READ BY ID
    async getById(id: number): Promise<Movie> {
        return await this.movieRepository.findOne({ where : { id }});
    }

    // UPDATE BY ID
    async update(id: number, updateMovieDto: UpdateMovieDto): Promise<Movie> {
        await this.movieRepository.update(id, updateMovieDto);
        return await this.movieRepository.findOne({ where : { id }});
    }

    // DELETE BY ID
    async delete(id: number): Promise<void> {
        await this.movieRepository.delete(id);
    }
    
}