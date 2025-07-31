/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { applyGlobalConfig } from '@/global-config';
import { HashProvider } from '@/shared/application/providers/hash-provider';
import { DatabaseModule } from '@/shared/infrastructure/database/database.module';
import { setupPrismaTests } from '@/shared/infrastructure/database/prisma/testing/setup-prisma-tests';
import { EnvConfigModule } from '@/shared/infrastructure/env-config/env-config.module';
import { UserEntity } from '@/users/domain/entities/user.entity';
import { UserRepository } from '@/users/domain/repositories/user.repository';
import { UserDataBuilder } from '@/users/domain/testing/helping/user-data-builder';
import { UsersModule } from '@/users/infrastructure/users.module';
import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { PrismaClient } from '@prisma/client';
import request from 'supertest';
import { SigninDto } from '../../dtos/sign-in.dto';
import { BCryptjsHashProvider } from '../../providers/hash-provider/bcryptjs-hash.provider';

describe('UsersController e2e tests', () => {
  let app: INestApplication;
  let module: TestingModule;
  let repository: UserRepository.Repository;
  let signInDto: SigninDto;
  let hashProvider: HashProvider;
  const prismaService = new PrismaClient();

  beforeAll(async () => {
    setupPrismaTests();
    module = await Test.createTestingModule({
      imports: [
        EnvConfigModule,
        UsersModule,
        DatabaseModule.forTest(prismaService),
      ],
    }).compile();

    app = module.createNestApplication();
    applyGlobalConfig(app);
    await app.init();
    repository = module.get<UserRepository.Repository>('UserRepository');
    hashProvider = new BCryptjsHashProvider();
  });

  beforeEach(async () => {
    signInDto = {
      email: 'a@a.com',
      password: 'TestPassword123',
    };
    await prismaService.user.deleteMany();
  });

  describe('POST /users/login', () => {
    it('should authenticate an user', async () => {
      const passwordHash = await hashProvider.generateHash(signInDto.password);
      const entity = new UserEntity({
        ...UserDataBuilder({ email: 'a@a.com', password: passwordHash }),
      });

      await repository.insert(entity);

      const res = await request(app.getHttpServer())
        .post('/users/login')
        .send(signInDto)
        .expect(200);

      expect(Object.keys(res.body)).toStrictEqual(['accessToken']);
      expect(typeof res.body.accessToken).toEqual('string');
    });

    it('should return a error with 422 code when request body is invalid', async () => {
      const res = await request(app.getHttpServer())
        .post('/users/login')
        .send({})
        .expect(422);

      expect(res.body.error).toBe('Unprocessable Entity');
      expect(res.body.message).toEqual([
        'email must be an email',
        'email should not be empty',
        'email must be a string',
        'password should not be empty',
        'password must be a string',
      ]);
    });

    it('should return a error with 422 code when request email field is invalid', async () => {
      delete signInDto.email;
      const res = await request(app.getHttpServer())
        .post('/users/login')
        .send({ signInDto })
        .expect(422);

      expect(res.body.error).toBe('Unprocessable Entity');
      expect(res.body.message).toEqual([
        'email must be an email',
        'email should not be empty',
        'email must be a string',
      ]);
    });

    it('should return a error with 422 code when request name password is invalid', async () => {
      delete signInDto.password;
      const res = await request(app.getHttpServer())
        .post('/users/login')
        .send({ signInDto })
        .expect(422);

      expect(res.body.error).toBe('Unprocessable Entity');
      expect(res.body.message).toEqual([
        'password should not be empty',
        'password must be a string',
      ]);
    });

    it('should return a error with 404 code when email not found', async () => {
      const res = await request(app.getHttpServer())
        .post('/users/login')
        .send({
          email: 'b@b.com',
          password: 'fake',
        })
        .expect(404);

      expect(res.body.error).toBe('Not Found');
      expect(res.body.message).toEqual(
        'UserModel not found using email b@b.com',
      );
    });

    it('should return a error with 400 code when password is incorrect', async () => {
      const passwordHash = await hashProvider.generateHash(signInDto.password);

      const entity = new UserEntity({
        ...UserDataBuilder({ email: 'a@a.com', password: passwordHash }),
      });

      await repository.insert(entity);
      await request(app.getHttpServer())
        .post('/users/login')
        .send({
          email: signInDto.email,
          password: 'fake',
        })
        .expect(400)
        .expect({
          statusCode: 409,
          error: 'Bad Request',
          message: 'Invalid credentials',
        });
    });
  });
});
