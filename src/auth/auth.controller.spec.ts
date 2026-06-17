/* eslint-disable @typescript-eslint/no-unused-vars */
import { Test, TestingModule } from '@nestjs/testing';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

describe('AuthController', () => {
  let controller: AuthController;
  let authService: AuthService;

  const mockAuthService = {
    login: jest.fn(),
    refreshTokens: jest.fn(),
    logout: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [{ provide: AuthService, useValue: mockAuthService }],
    }).compile();

    controller = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);

    jest.clearAllMocks();
  });

  describe('login', () => {
    it('should call authService.login with correct parameters', async () => {
      const req = {
        user: { id: '1', institutionalEmail: 'test@test.com', role: 'USER' },
      };
      const userAgent = 'Mozilla/5.0';
      const ipAddress = '127.0.0.1';
      const expectedResult = { accessToken: 'token', refreshToken: 'refresh' };

      mockAuthService.login.mockResolvedValue(expectedResult);

      const result = await controller.login(req, userAgent, ipAddress);

      expect(result).toEqual(expectedResult);
      expect(mockAuthService.login).toHaveBeenCalledWith(
        req.user,
        userAgent,
        ipAddress,
      );
    });
  });

  describe('refresh', () => {
    it('should call authService.refreshTokens', async () => {
      const req = { user: { id: '1', refreshToken: 'token' } };
      const expectedResult = {
        accessToken: 'newToken',
        refreshToken: 'newRefresh',
      };

      mockAuthService.refreshTokens.mockResolvedValue(expectedResult);

      const result = await controller.refresh(req);

      expect(result).toEqual(expectedResult);
      expect(mockAuthService.refreshTokens).toHaveBeenCalledWith('1', 'token');
    });
  });

  describe('logout', () => {
    it('should call authService.logout', async () => {
      const req = { user: { id: '1' } };
      const dto = { refreshToken: 'token' };
      const expectedResult = { message: 'Logout realizado com sucesso' };

      mockAuthService.logout.mockResolvedValue(expectedResult);

      const result = await controller.logout(req, dto);

      expect(result).toEqual(expectedResult);
      expect(mockAuthService.logout).toHaveBeenCalledWith('1', 'token');
    });
  });
});
