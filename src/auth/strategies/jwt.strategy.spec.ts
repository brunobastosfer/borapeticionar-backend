import { Test, TestingModule } from '@nestjs/testing';
import { ConfigService } from '@nestjs/config';
import { JwtStrategy } from './jwt.strategy';
import { UnauthorizedException } from '@nestjs/common';

describe('JwtStrategy', () => {
  let strategy: JwtStrategy;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        JwtStrategy,
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn().mockReturnValue('test-secret'),
          },
        },
      ],
    }).compile();

    strategy = module.get<JwtStrategy>(JwtStrategy);
  });

  it('should be defined', () => {
    expect(strategy).toBeDefined();
  });

  it('should return user object when payload is valid', () => {
    const payload = { sub: '1', email: 'test@test.com', role: 'USER' };

    const result = strategy.validate(payload);

    expect(result).toEqual({ id: '1', email: 'test@test.com', role: 'USER' });
  });

  it('should throw UnauthorizedException when sub is missing', () => {
    const payload = { email: 'test@test.com', role: 'USER' };

    expect(() => strategy.validate(payload as any)).toThrow(
      UnauthorizedException,
    );
  });

  it('should throw UnauthorizedException when email is missing', () => {
    const payload = { sub: '1', role: 'USER' };

    expect(() => strategy.validate(payload as any)).toThrow(
      UnauthorizedException,
    );
  });
});
