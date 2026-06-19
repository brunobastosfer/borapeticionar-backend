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
    requestPasswordReset: jest.fn(),
    resetPassword: jest.fn(),
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
        user: {
          id: '1',
          institutionalEmail: 'test@test.com',
          role: 'USER',
          hasSeenTutorial: false,
        },
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
      const dto = { refreshToken: 'token' };
      const expectedResult = {
        accessToken: 'newToken',
        refreshToken: 'newRefresh',
      };

      mockAuthService.refreshTokens.mockResolvedValue(expectedResult);

      const result = await controller.refresh(dto);

      expect(result).toEqual(expectedResult);
      expect(mockAuthService.refreshTokens).toHaveBeenCalledWith('token');
    });
  });

  describe('forgotPassword', () => {
    it('should request password reset by institutional email', async () => {
      const dto = { institutionalEmail: 'test@test.com' };
      const expectedResult = {
        message:
          'Se o email informado existir, enviaremos as instrucoes de recuperacao.',
      };

      mockAuthService.requestPasswordReset.mockResolvedValue(expectedResult);

      const result = await controller.forgotPassword(dto);

      expect(result).toEqual(expectedResult);
      expect(mockAuthService.requestPasswordReset).toHaveBeenCalledWith(
        'test@test.com',
      );
    });
  });

  describe('resetPassword', () => {
    it('should reset password with token and password', async () => {
      const dto = { token: 'reset-token', password: 'newPassword123' };
      const expectedResult = { message: 'Senha redefinida com sucesso' };

      mockAuthService.resetPassword.mockResolvedValue(expectedResult);

      const result = await controller.resetPassword(dto);

      expect(result).toEqual(expectedResult);
      expect(mockAuthService.resetPassword).toHaveBeenCalledWith(
        'reset-token',
        'newPassword123',
      );
    });
  });

  describe('logout', () => {
    it('should call authService.logout', async () => {
      const dto = { refreshToken: 'token' };
      const expectedResult = { message: 'Logout realizado com sucesso' };

      mockAuthService.logout.mockResolvedValue(expectedResult);

      const result = await controller.logout(dto);

      expect(result).toEqual(expectedResult);
      expect(mockAuthService.logout).toHaveBeenCalledWith('token');
    });
  });
});
