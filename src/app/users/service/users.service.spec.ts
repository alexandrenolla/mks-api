import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../user.entity';
import { Repository } from 'typeorm';
import { CreateUserDto } from '../dtos/CreateUserDto.dto';

describe('UsersService', () => {
  let userService: UsersService;
  let userRepository: Repository<User>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        { // Propriedade do construtor da classe, requerida pelo jest
          provide: getRepositoryToken(User),
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
            find: jest.fn(),
            findOne: jest.fn(),
            update: jest.fn(),
            delete: jest.fn()
          },
        },
      ],
    }).compile();

    userService = module.get<UsersService>(UsersService);
    userRepository = module.get<Repository<User>>(getRepositoryToken(User))
  });

  it('should be defined', () => {
    expect(userService).toBeDefined();
    expect(userRepository).toBeDefined();
  });

  describe('create', () => {
    it('should save a new user with success', async () => {
      // Arrange
      const data: CreateUserDto = {
        name: 'Alexandre',
        email: 'alexandre.nolla@gmail.com'
      };
      const userEntityMock = { ...data } as User;
      jest.spyOn(userRepository, 'create').mockReturnValueOnce(userEntityMock);
      jest.spyOn(userRepository, 'save').mockResolvedValueOnce(userEntityMock);
      // Act
      const result = await userService.create(data);
      // Assert
      expect(result).toBeDefined();
      expect(userRepository.create).toHaveBeenCalledTimes(1);
      expect(userRepository.save).toHaveBeenCalledTimes(1);
    });
  });

  describe('getAll', () => {
    it('should return an array of users', async () => {
      // Arrange
      const usersData: User[] = [{ id: 1, name: 'User', email: 'user@email.com', createdAt: new Date(), updatedAt: new Date(), deletedAt: null }];
      jest.spyOn(userRepository, 'find').mockResolvedValueOnce(usersData);
      // Act
      const result = await userService.getAll();
      // Assert
      expect(result).toBeDefined();
      expect(result).toEqual(usersData);
      expect(userRepository.find).toHaveBeenCalledTimes(1);
    });
  });

  describe('getById', () => {
    it('should return a user by ID', async () => {
      // Arrange
      const userId = 1;
      const userData: User = { id: userId, name: 'User', email: 'user@email.com', createdAt: new Date(), updatedAt: new Date(), deletedAt: null };
      jest.spyOn(userRepository, 'findOne').mockResolvedValueOnce(userData);
      // Act
      const result = await userService.getById(userId);
      // Assert
      expect(result).toBeDefined();
      expect(result).toEqual(userData);
      expect(userRepository.findOne).toHaveBeenCalledWith({ where: { id: userId } });
    });
  });

  describe('update', () => {
    it('should update a user by ID', async () => {
      // Arrange
      const userId = 1;
      const userData: User = { id: userId, name: 'User', email: 'user@email.com', createdAt: new Date(), updatedAt: new Date(), deletedAt: null };
      const updatedUserData: User = { ...userData, name: 'UpdatedUser' };
      jest.spyOn(userRepository, 'update').mockResolvedValueOnce(undefined);
      jest.spyOn(userRepository, 'findOne').mockResolvedValueOnce(updatedUserData);
      // Act
      const result = await userService.update(userId, updatedUserData);
      // Assert
      expect(result).toBeDefined();
      expect(result).toEqual(updatedUserData);
      expect(userRepository.update).toHaveBeenCalledWith(userId, updatedUserData);
      // Delay no mock
      setTimeout(async () => {
        expect(userRepository.findOne).toHaveBeenCalledWith({ where: { id: userId } });
      }, 500);
    });
  });

  describe('delete', () => {
    it('should delete a user by ID', async () => {
      // Arrange
      const userId = 1;
      jest.spyOn(userRepository, 'delete').mockResolvedValueOnce(undefined);
      // Act
      await userService.delete(userId);
      // Assert
      expect(userRepository.delete).toHaveBeenCalledWith(userId);
    });
  });
});