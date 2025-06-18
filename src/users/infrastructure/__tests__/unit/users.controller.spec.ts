/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { SignupUseCase } from '@/users/application/usecases/sign-up.usecase';
import { UsersController } from '../../users.controller';
import { UserOutput } from '@/users/application/dtos/user-output';
import { SignupDto } from '../../dtos/sign-up.dto';
import { SigninUseCase } from '@/users/application/usecases/sign-in.usecase';
import { SigninDto } from '../../dtos/sign-in.dto';
import { UpdateUserUseCase } from '@/users/application/usecases/update-user.usecase';
import { UpdateUserDto } from '../../dtos/update-user.dto';

describe('UsersController unit tests', () => {
  let sut: UsersController;
  let id: string;
  let props: UserOutput;

  beforeEach(() => {
    sut = new UsersController();

    id = '5da7d3a7-cae9-4811-b88e-8909a2b9555d';
    props = {
      id,
      name: 'John',
      email: 'a@a.com',
      password: '1234',
      createdAt: new Date(),
    };
  });

  it('should create a user', async () => {
    const output: SignupUseCase.Output = props;
    const mockSignupUseCase = {
      execute: jest.fn().mockReturnValue(Promise.resolve(output)),
    };

    sut['signupUseCase'] = mockSignupUseCase as any;

    const input: SignupDto = {
      name: 'John',
      email: 'a@a.com',
      password: '1234',
    };

    const result = await sut.create(input);

    expect(output).toMatchObject(result);
    expect(mockSignupUseCase.execute).toHaveBeenCalledWith(input);
  });

  it('should authenticate a user', async () => {
    const output: SigninUseCase.Output = props;
    const mockSigninUseCase = {
      execute: jest.fn().mockReturnValue(Promise.resolve(output)),
    };

    sut['signinUseCase'] = mockSigninUseCase as any;

    const input: SigninDto = {
      email: 'a@a.com',
      password: '1234',
    };

    const result = await sut.login(input);

    expect(output).toMatchObject(result);
    expect(mockSigninUseCase.execute).toHaveBeenCalledWith(input);
  });

  it('should update a user', async () => {
    const output: UpdateUserUseCase.Output = props;
    const mockUpdateUserUseCase = {
      execute: jest.fn().mockReturnValue(Promise.resolve(output)),
    };

    sut['updateUserUseCase'] = mockUpdateUserUseCase as any;

    const input: UpdateUserDto = {
      name: 'new name',
    };

    const result = await sut.update(id, input);

    expect(output).toMatchObject(result);
    expect(mockUpdateUserUseCase.execute).toHaveBeenCalledWith({
      id,
      ...input,
    });
  });
});
