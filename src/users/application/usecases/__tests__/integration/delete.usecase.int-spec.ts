/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-call */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import {
  PrismaClient,
  User,
} from '@/shared/infrastructure/database/generated/prisma';
import { UserEntity } from '@/users/domain/entities/user.entity';
import { setupPrismaTests } from '@/shared/infrastructure/database/prisma/testing/setup-prisma-tests';
import { Test, TestingModule } from '@nestjs/testing';
import { DatabaseModule } from '@/shared/infrastructure/database/database.module';
import { NotFoundError } from '@/shared/domain/errors/not-found-error';
import { UserDataBuilder } from '@/users/domain/testing/helping/user-data-builder';
import { UserPrismaRepository } from '@/users/infrastructure/database/prisma/repositories/user-prisma.repository';
import { DeleteUserUseCase } from '../../delete-user.usecase';

describe('DeleteUserUseCase Integration Tests', () => {
  const prismaService = new PrismaClient();
  let sut: DeleteUserUseCase.UseCase;
  let repository: UserPrismaRepository;
  let module: TestingModule;

  beforeAll(async () => {
    setupPrismaTests();
    module = await Test.createTestingModule({
      imports: [DatabaseModule.forTest(prismaService)],
    }).compile();
    repository = new UserPrismaRepository(prismaService as any);
  }, 20000);

  beforeEach(async () => {
    sut = new DeleteUserUseCase.UseCase(repository);
    await prismaService.user.deleteMany();
  });

  afterAll(async () => {
    await module.close();
  });

  it('Should throws an error when entity not found', async () => {
    await expect(() => sut.execute({ id: 'fakeId' })).rejects.toThrow(
      new NotFoundError(`UserModel not found using ID fakeId`),
    );
  });

  it('Should delete an user', async () => {
    const entity = new UserEntity(UserDataBuilder({}));
    const newUser = await prismaService.user.create({
      data: entity.toJSON(),
    });

    await sut.execute({ id: entity._id });

    const output = await prismaService.user.findUnique({
      where: {
        id: entity._id,
      },
    });
    expect(output).toBeNull();
    const models = await prismaService.user.findMany();
    expect(models).toHaveLength(0);
  });
});
