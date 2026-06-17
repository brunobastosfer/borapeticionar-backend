import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { JwtRefreshStrategy } from './jwt-refresh.strategy';
import { UnauthorizedException } from '@nestjs/common';

describe('JwtRefreshStrategy', () => {
  let strategy: JwtRefreshStrategy;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        JwtRefreshStrategy,
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn().mockReturnValue('test-refresh-secret'),
          },
        },
      ],
    }).compile();

    strategy = module.get<JwtRefreshStrategy>(JwtRefreshStrategy);
  });

  it('should be defined', () => {
    expect(strategy).toBeDefined();
  });

  it('should return user object when payload and refreshToken are valid', () => {
    const payload = { sub: '1', email: 'test@test.com' };
    const req = { body: { refreshToken: 'valid-refresh-token' } };

    const result = strategy.validate(req as any, payload);

    expect(result).toEqual({
      id: '1',
      email: 'test@test.com',
      refreshToken: 'valid-refresh-token',
    });
  });

  it('should throw UnauthorizedException when refreshToken is missing', () => {
    const payload = { sub: '1', email: 'test@test.com' };
    const req = { body: {} };

    expect(() => strategy.validate(req as any, payload)).toThrow(
      UnauthorizedException,
    );
  });
});
