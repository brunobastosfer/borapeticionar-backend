/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { OrganizationsController } from './organizations.controller';
import { OrganizationsService } from './organizations.service';

describe('OrganizationsController', () => {
  let controller: OrganizationsController;
  let organizationsService: OrganizationsService;

  const mockOrganizationsService = {
    create: jest.fn(),
    findByOwner: jest.fn(),
    findUserOrganizations: jest.fn(),
    findOne: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
    addMember: jest.fn(),
    removeMember: jest.fn(),
    getMembers: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrganizationsController],
      providers: [
        { provide: OrganizationsService, useValue: mockOrganizationsService },
      ],
    }).compile();

    controller = module.get<OrganizationsController>(OrganizationsController);
    organizationsService =
      module.get<OrganizationsService>(OrganizationsService);

    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create an organization', async () => {
      const req = { user: { id: 'user1' } };
      const dto = { name: 'My Office' };
      const expectedResult = { id: 'org1', ...dto };

      mockOrganizationsService.create.mockResolvedValue(expectedResult);

      const result = await controller.create(req, dto);

      expect(result).toEqual(expectedResult);
      expect(mockOrganizationsService.create).toHaveBeenCalledWith(
        'user1',
        dto,
      );
    });
  });

  describe('findByOwner', () => {
    it('should return organizations owned by user', async () => {
      const req = { user: { id: 'user1' } };
      const expectedResult = [{ id: 'org1', name: 'My Office' }];

      mockOrganizationsService.findByOwner.mockResolvedValue(expectedResult);

      const result = await controller.findByOwner(req);

      expect(result).toEqual(expectedResult);
    });
  });

  describe('findUserOrganizations', () => {
    it('should return user organizations', async () => {
      const req = { user: { id: 'user1' } };
      const expectedResult = [{ organizationId: 'org1' }];

      mockOrganizationsService.findUserOrganizations.mockResolvedValue(
        expectedResult,
      );

      const result = await controller.findUserOrganizations(req);

      expect(result).toEqual(expectedResult);
    });
  });

  describe('findOne', () => {
    it('should return an organization', async () => {
      const req = { user: { id: 'user1' } };
      const expectedResult = { id: 'org1', name: 'My Office' };

      mockOrganizationsService.findOne.mockResolvedValue(expectedResult);

      const result = await controller.findOne('org1', req);

      expect(result).toEqual(expectedResult);
    });
  });

  describe('update', () => {
    it('should update an organization', async () => {
      const req = { user: { id: 'user1' } };
      const dto = { name: 'Updated Office' };
      const expectedResult = { id: 'org1', ...dto };

      mockOrganizationsService.update.mockResolvedValue(expectedResult);

      const result = await controller.update('org1', req, dto);

      expect(result).toEqual(expectedResult);
    });
  });

  describe('remove', () => {
    it('should delete an organization', async () => {
      const req = { user: { id: 'user1' } };
      const expectedResult = { id: 'org1' };

      mockOrganizationsService.remove.mockResolvedValue(expectedResult);

      const result = await controller.remove('org1', req);

      expect(result).toEqual(expectedResult);
    });
  });

  describe('addMember', () => {
    it('should add a member', async () => {
      const req = { user: { id: 'user1' } };
      const dto = { userId: 'user2', role: 'member' };
      const expectedResult = { id: 'member1' };

      mockOrganizationsService.addMember.mockResolvedValue(expectedResult);

      const result = await controller.addMember('org1', req, dto);

      expect(result).toEqual(expectedResult);
    });
  });

  describe('removeMember', () => {
    it('should remove a member', async () => {
      const req = { user: { id: 'user1' } };
      const expectedResult = { id: 'member1' };

      mockOrganizationsService.removeMember.mockResolvedValue(expectedResult);

      const result = await controller.removeMember('org1', 'user2', req);

      expect(result).toEqual(expectedResult);
    });
  });

  describe('getMembers', () => {
    it('should return all members', async () => {
      const req = { user: { id: 'user1' } };
      const expectedResult = [{ userId: 'user1' }, { userId: 'user2' }];

      mockOrganizationsService.getMembers.mockResolvedValue(expectedResult);

      const result = await controller.getMembers('org1', req);

      expect(result).toEqual(expectedResult);
    });
  });
});
