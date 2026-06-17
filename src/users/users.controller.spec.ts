/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';

describe('UsersController', () => {
  let controller: UsersController;
  let usersService: UsersService;

  const mockUsersService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UsersController],
      providers: [{ provide: UsersService, useValue: mockUsersService }],
    }).compile();

    controller = module.get<UsersController>(UsersController);
    usersService = module.get<UsersService>(UsersService);

    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create a user', async () => {
      const dto = {
        firstName: 'John',
        lastName: 'Doe',
        cpf: '12345678900',
        institutionalEmail: 'john@test.com',
        password: 'password123',
      };
      const expectedResult = { id: '1', ...dto };

      mockUsersService.create.mockResolvedValue(expectedResult);

      const result = await controller.create(dto);

      expect(result).toEqual(expectedResult);
      expect(mockUsersService.create).toHaveBeenCalledWith(dto);
    });
  });

  describe('findAll', () => {
    it('should return array of users', async () => {
      const expectedResult = [{ id: '1', firstName: 'John' }];

      mockUsersService.findAll.mockResolvedValue(expectedResult);

      const result = await controller.findAll();

      expect(result).toEqual(expectedResult);
    });
  });

  describe('findOne', () => {
    it('should return a user', async () => {
      const expectedResult = { id: '1', firstName: 'John' };

      mockUsersService.findOne.mockResolvedValue(expectedResult);

      const result = await controller.findOne('1');

      expect(result).toEqual(expectedResult);
      expect(mockUsersService.findOne).toHaveBeenCalledWith('1');
    });
  });

  describe('update', () => {
    it('should update a user', async () => {
      const dto = { firstName: 'Jane' };
      const expectedResult = { id: '1', firstName: 'Jane' };

      mockUsersService.update.mockResolvedValue(expectedResult);

      const result = await controller.update('1', dto);

      expect(result).toEqual(expectedResult);
      expect(mockUsersService.update).toHaveBeenCalledWith('1', dto);
    });
  });

  describe('remove', () => {
    it('should delete a user', async () => {
      const expectedResult = { id: '1' };

      mockUsersService.remove.mockResolvedValue(expectedResult);

      const result = await controller.remove('1');

      expect(result).toEqual(expectedResult);
      expect(mockUsersService.remove).toHaveBeenCalledWith('1');
    });
  });
});
