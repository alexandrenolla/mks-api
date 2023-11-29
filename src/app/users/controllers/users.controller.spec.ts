import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from '../service/users.service';
import { CreateUserDto } from '../dtos/CreateUserDto.dto';
import { User } from '../user.entity';

describe('UsersController', () => {
  let userController: UsersController;
  let userService: UsersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [
        {
          provide: UsersService,
          useValue: {
            create: jest.fn(),
            save: jest.fn(),
            getAll: jest.fn(),
            getById: jest.fn(),
            update: jest.fn(),
            delete: jest.fn(),
          },
        },
      ],
    }).compile();

    userController = module.get<UsersController>(UsersController);
    userService = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(userController).toBeDefined();
    expect(userService).toBeDefined();
  });

  describe('create', () => {
    it('should create a new user with success', async () => {
      // Arrange
      const body: CreateUserDto = {
        name: 'Alexandre',
        email: 'alexandre.nolla@gmail.com'
      };
      const userEntityMock = { ...body } as User;
      jest.spyOn(userService, 'create').mockResolvedValue(userEntityMock);
      // Act
      const result = await userController.create(body);
      // Assert
      expect(result).toBeDefined();
      expect(userService.create).toHaveBeenCalledTimes(1);
    })
  })

  describe('getAll', () => {
    it('should get all users with success', async () => {
      // Arrange
      const usersData: User[] = [{ id: 1, name: 'User', email: 'user@email.com', createdAt: new Date(), updatedAt: new Date(), deletedAt: null }];
      jest.spyOn(userService, 'getAll').mockResolvedValue(usersData);
      // Act
      const result = await userController.getAll();
      // Assert
      expect(result).toBeDefined();
      expect(result).toMatchObject(usersData);
      expect(userService.getAll).toHaveBeenCalledTimes(1);
    });
  });

  describe('getById', () => {
    it('should get a user by ID with success', async () => {
      // Arrange
      const userId = 1;
      const userData: User = { id: userId, name: 'User', email: 'user@example.com', createdAt: new Date(), updatedAt: new Date(), deletedAt: null };
      jest.spyOn(userService, 'getById').mockResolvedValue(userData);
      // Act
      const result = await userController.getById(userId);
      // Assert
      expect(result).toBeDefined();
      expect(result).toEqual(userData);
      expect(userService.getById).toHaveBeenCalledWith(userId);
    });

    it('should throw an error for non-existing user', async () => {
      // Arrange
      const userId = 2;
      jest.spyOn(userService, 'getById').mockResolvedValue(null);
      // Act & Assert
      await expect(userController.getById(userId)).rejects.toThrow('User not found.');
      expect(userService.getById).toHaveBeenCalledWith(userId);
    });
  });

  describe('update', () => {
    it('should update a user with success', async () => {
      // Arrange
      const userId = 1;
      const userData: User = { id: userId, name: 'User', email: 'user@example.com', createdAt: new Date(), updatedAt: new Date(), deletedAt: null };
      const updatedUserData: User = { ...userData, name: 'UpdatedUser' };
      jest.spyOn(userService, 'update').mockResolvedValue(updatedUserData);
      // Act
      const result = await userController.update(userId, updatedUserData);
      // Assert
      expect(result).toBeDefined();
      expect(result).toEqual(updatedUserData);
      expect(userService.update).toHaveBeenCalledWith(userId, updatedUserData);
    });
  });

  describe('delete', () => {
    it('should delete a user with success', async () => {
      // Arrange
      const userId = 1;
      jest.spyOn(userService, 'getById').mockResolvedValue({} as User);
      jest.spyOn(userService, 'delete').mockResolvedValue(undefined);
      // Act
      await userController.delete(userId);
      // Assert
      expect(userService.getById).toHaveBeenCalledWith(userId);
      expect(userService.delete).toHaveBeenCalledWith(userId);
    });

    it('should throw an error for deleting a non-existing user', async () => {
      // Arrange
      const userId = 2; // Assumindo que ID 2 não existe.
      jest.spyOn(userService, 'getById').mockResolvedValue(null);
      // Act & Assert
      await expect(userController.delete(userId)).rejects.toThrow('User not found.');
      expect(userService.getById).toHaveBeenCalledWith(userId);
      expect(userService.delete).not.toHaveBeenCalled();
      expect(userService.delete).not.toHaveBeenCalled();
    });
  });
});
