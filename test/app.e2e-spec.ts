import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from './../src/app.module';

describe('AuthController (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.setGlobalPrefix('api');
    app.useGlobalPipes(
      new ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
      }),
    );
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  describe('/api/auth/login (POST)', () => {
    it('should return 401 for invalid credentials', async () => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const server = app.getHttpServer();
      return request(server)
        .post('/api/auth/login')
        .send({
          institutionalEmail: 'invalid@test.com',
          password: 'wrongpassword',
        })
        .expect(401);
    });

    it('should return 400 for missing fields', async () => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const server = app.getHttpServer();
      return request(server).post('/api/auth/login').send({}).expect(400);
    });
  });

  describe('/api/users (POST)', () => {
    it('should return 400 for invalid email', async () => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const server = app.getHttpServer();
      return request(server)
        .post('/api/users')
        .send({
          firstName: 'Test',
          lastName: 'User',
          cpf: '12345678900',
          institutionalEmail: 'invalid-email',
          password: 'password123',
        })
        .expect(400);
    });

    it('should return 400 for short password', async () => {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
      const server = app.getHttpServer();
      return request(server)
        .post('/api/users')
        .send({
          firstName: 'Test',
          lastName: 'User',
          cpf: '12345678900',
          institutionalEmail: 'test@test.com',
          password: '123',
        })
        .expect(400);
    });
  });
});
