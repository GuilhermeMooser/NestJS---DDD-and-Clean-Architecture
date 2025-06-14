import { UserInMemoryRepository } from '@/users/infrastructure/database/in-memory/repositories/user-in-memory.repository';
import { NotFoundError } from '@/shared/domain/errors/not-found-error';
import { UserDataBuilder } from '@/users/domain/testing/helping/user-data-builder';
import { UserEntity } from '@/users/domain/entities/user.entity';
import { DeleteUserUseCase } from '../../delete-user.usecase';

describe('DeleteUserUseCase unit tests', () => {
  let sut: DeleteUserUseCase.UseCase;
  let repository: UserInMemoryRepository;

  beforeEach(() => {
    repository = new UserInMemoryRepository();
    sut = new DeleteUserUseCase.UseCase(repository);
  });

  it('Should throws error when entity not found', async () => {
    await expect(() => sut.execute({ id: 'fakeId' })).rejects.toThrow(
      new NotFoundError('Entity not found'),
    );
  });

  it('Should delete a user', async () => {
    const spyDelete = jest.spyOn(repository, 'delete');
    const items = [new UserEntity(UserDataBuilder({}))];
    repository.items = items;

    const result = await sut.execute({ id: items[0]._id });

    expect(spyDelete).toHaveBeenCalledTimes(1);
    expect(result).toBeUndefined();
    expect(repository.items).toHaveLength(0);
  });
});
