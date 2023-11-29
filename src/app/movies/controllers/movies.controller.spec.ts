import { Test, TestingModule } from '@nestjs/testing';
import { MoviesController } from './movies.controller';
import { MoviesService } from '../movies.service';
import { CreateMovieDto } from '../dtos/CreateMovieDto.dto';
import { UpdateMovieDto } from '../dtos/UpdateMovieDto.dto';
import { MovieDto } from '../dtos/MovieDto.dto';
import { Movie } from '../movie.entity';

describe('MoviesController', () => {
  let controller: MoviesController;
  let moviesService: MoviesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MoviesController],
      providers: [
        {
          provide: MoviesService,
          useValue: {
            create: jest.fn(),
            getAll: jest.fn(),
            getById: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    controller = module.get<MoviesController>(MoviesController);
    moviesService = module.get<MoviesService>(MoviesService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should create a new movie with success', async () => {
      // Arrange
      const createMovieDto: CreateMovieDto = {
        title: 'Título',
        category: 'Ação',
        description: 'Um thriller',
        date: new Date(),
        trailer: 'http://exemplo.com/trailer',
      };
      const movieEntityMock = { ...createMovieDto, id: 1 };
      jest.spyOn(moviesService, 'create').mockResolvedValueOnce(movieEntityMock);

      // Act
      const result = await controller.create(createMovieDto);

      // Assert
      expect(result).toBeDefined();
      expect(result).toBeInstanceOf(MovieDto);
      expect(moviesService.create).toHaveBeenCalledWith(createMovieDto);
    });
  });
  
  describe('getAll', () => {
    it('should get all movies with success', async () => {
      // Arrange
      const moviesData: Movie[] = [{id: 1, title: 'Filme 1', category: 'Ação', description: 'descrição 1', date: new Date(), trailer: 'http://exemplo.com/trailer1' }];

      jest.spyOn(moviesService, 'getAll').mockResolvedValueOnce(moviesData);

      // Act
      const result = await controller.getAll();

      // Assert
      expect(result).toBeDefined();
      expect(result).toEqual(moviesData);
      expect(moviesService.getAll).toHaveBeenCalledTimes(1);
    });
  });

  describe('getById', () => {
    it('should get a movie by ID with success', async () => {
      // Arrange
      const movieId = 1;
      const movieData: Movie = { id: movieId, title: 'Filme 1', category: 'Ação', description: 'Descrição 1', date: new Date(), trailer: 'http://exemplo.com/trailer1' };
      jest.spyOn(moviesService, 'getById').mockResolvedValueOnce(movieData);

      // Act
      const result = await controller.getById(movieId);

      // Assert
      expect(result).toBeDefined();
      expect(result).toEqual(movieData);
      expect(moviesService.getById).toHaveBeenCalledWith(movieId);
    });

    it('should throw an error for non-existing movie', async () => {
      // Arrange
      const movieId = 2;
      jest.spyOn(moviesService, 'getById').mockResolvedValueOnce(null);

      // Act & Assert
      await expect(controller.getById(movieId)).rejects.toThrow('Movie not found.');
      expect(moviesService.getById).toHaveBeenCalledWith(movieId);
    });
  });

  describe('update', () => {
    it('should update a movie with success', async () => {
      // Arrange
      const movieId = 1;
      const updateMovieDto: UpdateMovieDto = { title: 'Titulo atualizado' };
      const updatedMovieData: Movie = { id: movieId, title: 'Titulo atualizado', category: 'Ação', description: 'Descrição 1', date: new Date(), trailer: 'http://exemplo.com/trailer1' };
      jest.spyOn(moviesService, 'update').mockResolvedValueOnce(updatedMovieData);

      // Act
      const result = await controller.update(movieId, updateMovieDto);

      // Assert
      expect(result).toBeDefined();
      expect(result).toEqual(updatedMovieData);
      expect(moviesService.update).toHaveBeenCalledWith(movieId, updateMovieDto);
    });
  });

  describe('delete', () => {
    it('should delete a movie with success', async () => {
      // Arrange
      const movieId = 1;
      jest.spyOn(moviesService, 'getById').mockResolvedValueOnce({} as Movie);
      jest.spyOn(moviesService, 'delete').mockResolvedValueOnce(undefined);

      // Act
      await controller.delete(movieId);

      // Assert
      expect(moviesService.getById).toHaveBeenCalledWith(movieId);
      expect(moviesService.delete).toHaveBeenCalledWith(movieId);
    });

    it('should throw an error for deleting a non-existing movie', async () => {
      // Arrange
      const movieId = 2;
      jest.spyOn(moviesService, 'getById').mockResolvedValueOnce(null);

      // Act & Assert
      await expect(controller.delete(movieId)).rejects.toThrow('Movie not found.');
      expect(moviesService.getById).toHaveBeenCalledWith(movieId);
      expect(moviesService.delete).not.toHaveBeenCalled();
    });
  });
});
