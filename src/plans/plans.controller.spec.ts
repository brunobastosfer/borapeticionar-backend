/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { PlansController } from './plans.controller';
import { PlansService } from './plans.service';

describe('PlansController', () => {
  let controller: PlansController;
  let plansService: PlansService;

  const mockPlansService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findAvailable: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
    subscribe: jest.fn(),
    getUsage: jest.fn(),
    linkUser: jest.fn(),
    unlinkUser: jest.fn(),
    getLinkedUsers: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PlansController],
      providers: [{ provide: PlansService, useValue: mockPlansService }],
    }).compile();

    controller = module.get<PlansController>(PlansController);
    plansService = module.get<PlansService>(PlansService);

    jest.clearAllMocks();
  });

  describe('findAll', () => {
    it('should return array of plans', async () => {
      const expectedResult = [{ id: '1', name: 'Gratuito' }];

      mockPlansService.findAll.mockResolvedValue(expectedResult);

      const result = await controller.findAll();

      expect(result).toEqual(expectedResult);
    });
  });

  describe('findAvailable', () => {
    it('should return available plans', async () => {
      const expectedResult = [{ id: '1', name: 'Gratuito', isAvailable: true }];

      mockPlansService.findAvailable.mockResolvedValue(expectedResult);

      const result = await controller.findAvailable();

      expect(result).toEqual(expectedResult);
    });
  });

  describe('findOne', () => {
    it('should return a plan', async () => {
      const expectedResult = { id: '1', name: 'Gratuito' };

      mockPlansService.findOne.mockResolvedValue(expectedResult);

      const result = await controller.findOne('1');

      expect(result).toEqual(expectedResult);
    });
  });

  describe('subscribe', () => {
    it('should subscribe user to plan', async () => {
      const req = { user: { id: 'user1' } };
      const expectedResult = { id: 'user1', planId: 'plan1' };

      mockPlansService.subscribe.mockResolvedValue(expectedResult);

      const result = await controller.subscribe('plan1', req);

      expect(result).toEqual(expectedResult);
      expect(mockPlansService.subscribe).toHaveBeenCalledWith('user1', 'plan1');
    });
  });

  describe('getUsage', () => {
    it('should return usage data', async () => {
      const req = { user: { id: 'user1' } };
      const expectedResult = { currentMonth: { used: 5, limit: 15 } };

      mockPlansService.getUsage.mockResolvedValue(expectedResult);

      const result = await controller.getUsage(req);

      expect(result).toEqual(expectedResult);
    });
  });

  describe('linkUser', () => {
    it('should link user to company', async () => {
      const req = { user: { id: 'company1' } };
      const expectedResult = { id: 'user1', linkedToId: 'company1' };

      mockPlansService.linkUser.mockResolvedValue(expectedResult);

      const result = await controller.linkUser(req, 'user1');

      expect(result).toEqual(expectedResult);
    });
  });

  describe('unlinkUser', () => {
    it('should unlink user from company', async () => {
      const req = { user: { id: 'company1' } };
      const expectedResult = { id: 'user1', linkedToId: null };

      mockPlansService.unlinkUser.mockResolvedValue(expectedResult);

      const result = await controller.unlinkUser(req, 'user1');

      expect(result).toEqual(expectedResult);
    });
  });

  describe('getLinkedUsers', () => {
    it('should return linked users', async () => {
      const req = { user: { id: 'company1' } };
      const expectedResult = [{ id: 'user1' }, { id: 'user2' }];

      mockPlansService.getLinkedUsers.mockResolvedValue(expectedResult);

      const result = await controller.getLinkedUsers(req);

      expect(result).toEqual(expectedResult);
    });
  });
});
