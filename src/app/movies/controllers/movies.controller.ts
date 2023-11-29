import { Body, Controller, Get, Param, Post, Put, Delete, ValidationPipe, NotFoundException } from '@nestjs/common';
import { MoviesService } from '../movies.service';
import { CreateMovieDto } from '../dtos/CreateMovieDto.dto';
import { UpdateMovieDto } from '../dtos/UpdateMovieDto.dto';
import { MovieDto } from '../dtos/MovieDto.dto';

@Controller('api/movies')
export class MoviesController {
    constructor(private readonly moviesService: MoviesService) {}

    // CREATE
    @Post()
    async create(@Body(new ValidationPipe({ transform: true })) createMovieDto: CreateMovieDto): Promise<MovieDto> {
        const createdMovie = await this.moviesService.create(createMovieDto);
        return new MovieDto(createdMovie);
    }
    // READ ALL
    @Get()
    async getAll(): Promise<MovieDto[]> {
        const movies = await this.moviesService.getAll();
        return movies.map(movie => new MovieDto(movie));
    }

    // READ BY ID
    @Get(':id')
    async getById(@Param('id') id: number): Promise<MovieDto> {
        try {
            const movie = await this.moviesService.getById(id);
            if (!movie) {
                throw new NotFoundException('Movie not found.');
            } else {
                return new MovieDto(movie);
            }
        } catch (error) {
            // Status Code 404
            throw new NotFoundException('Movie not found.');
        }
    }


    // UPDATE BY ID
    @Put(':id')
    async update(@Param('id') id: number, @Body() updateMovieDto: UpdateMovieDto): Promise<MovieDto> {
        try {
            const updatedMovie = await this.moviesService.update(id, updateMovieDto);
            return new MovieDto(updatedMovie);
        } catch (error) {
            // Status Code 404
            throw new NotFoundException('Movie not found.');
        }
    }

    // DELETE BY ID
    @Delete(':id')
    async delete(@Param('id') id: number): Promise<void> {
        try {
            const movie = await this.moviesService.getById(id);
            if (!movie) {
                throw new NotFoundException('Movie not found.');
            } else {
                return this.moviesService.delete(id);
            }
        } catch (error) {
            // Status Code 404
            throw new NotFoundException('Movie not found.');
        }
    }
}