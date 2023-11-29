import { Test, TestingModule } from '@nestjs/testing';
import { MoviesService } from './movies.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Movie } from './movie.entity';
import { Repository } from 'typeorm';

describe('MoviesService', () => {
  let movieService: MoviesService;
  let movieRepository: Repository<Movie>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        MoviesService,
        {
          provide: getRepositoryToken(Movie),
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
            find: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    movieService = module.get<MoviesService>(MoviesService);
    movieRepository = module.get<Repository<Movie>>(getRepositoryToken(Movie));
  });

  it('should be defined', () => {
    expect(movieService).toBeDefined();
    expect(movieRepository).toBeDefined();
  });

  describe('create', () => {
    it('should save a new movie with success', async () => {
      // Arrange
      const createMovieDto = {
        title: 'Alien',
        category: 'Sci-Fi',
        description: 'Filme ruim',
        date: new Date(),
        trailer: 'http://exemplo.com/trailer',
      };
      const movieEntityMock = { ...createMovieDto, id: 1 } as Movie;
      jest.spyOn(movieRepository, 'create').mockReturnValueOnce(movieEntityMock);
      jest.spyOn(movieRepository, 'save').mockResolvedValueOnce(movieEntityMock);

      // Act
      const result = await movieService.create(createMovieDto);

      // Assert
      expect(result).toBeDefined();
      expect(movieRepository.create).toHaveBeenCalledWith(createMovieDto);
      expect(movieRepository.save).toHaveBeenCalledWith(movieEntityMock);
    });
  });

  describe('getAll', () => {
    it('should return an array of movies', async () => {
      // Arrange
      const moviesData: Movie[] = [
        { id: 1, title: 'Alien', category: 'Sci-Fi', description: 'Filme ruim', date: new Date(), trailer: 'http://exemplo.com/trailer' },
      ];
      jest.spyOn(movieRepository, 'find').mockResolvedValueOnce(moviesData);

      // Act
      const result = await movieService.getAll();

      // Assert
      expect(result).toBeDefined();
      expect(result).toEqual(moviesData);
      expect(movieRepository.find).toHaveBeenCalledTimes(1);
    });
  });


  describe('getById', () => {
    it('should return a movie by ID', async () => {
      // Arrange
      const movieId = 1;
      const movieData: Movie = { id: movieId, title: 'Alien', category: 'Sci-Fi', description: 'Filme ruim', date: new Date(), trailer: 'http://exemplo.com/trailer' };
      jest.spyOn(movieRepository, 'findOne').mockResolvedValueOnce(movieData);

      // Act
      const result = await movieService.getById(movieId);

      // Assert
      expect(result).toBeDefined();
      expect(result).toEqual(movieData);
      expect(movieRepository.findOne).toHaveBeenCalledWith({ where: { id: movieId } });
    });
  });

  describe('update', () => {
    it('should update a movie by ID', async () => {
      // Arrange
      const movieId = 1;
      const updateMovieDto = { title: 'Alien atualizado' };
      const updatedMovieData: Movie = { ...updateMovieDto, id: movieId, category: 'Sci-Fi', description: 'Filme ruim', date: new Date(), trailer: 'http://exemplo.com/trailer' };
      jest.spyOn(movieRepository, 'update').mockResolvedValueOnce(undefined);
      jest.spyOn(movieRepository, 'findOne').mockResolvedValueOnce(updatedMovieData);

      // Act
      const result = await movieService.update(movieId, updateMovieDto);

      // Assert
      expect(result).toBeDefined();
      expect(result).toEqual(updatedMovieData);
      expect(movieRepository.update).toHaveBeenCalledWith(movieId, updateMovieDto);
      expect(movieRepository.findOne).toHaveBeenCalledWith({ where: { id: movieId } });
    });
  });

  describe('delete', () => {
    it('should delete a movie by ID', async () => {
      // Arrange
      const movieId = 1;
      jest.spyOn(movieRepository, 'delete').mockResolvedValueOnce(undefined);

      // Act
      await movieService.delete(movieId);

      // Assert
      expect(movieRepository.delete).toHaveBeenCalledWith(movieId);
    });
  });
});
