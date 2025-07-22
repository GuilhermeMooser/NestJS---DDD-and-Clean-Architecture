/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-unsafe-call */
import { UserPresenter } from '../../user.presenter';
import { instanceToPlain } from 'class-transformer';

describe('UsersPresenter unit tests', () => {
  const createdAt = new Date();

  const props = {
    id: '12312a',
    name: 'test name',
    email: 'a@a.com',
    password: 'fake',
    createdAt: createdAt,
  };

  let sut: UserPresenter;

  beforeEach(() => {
    sut = new UserPresenter(props);
  });

  describe('constructor', () => {
    it('Should set values', () => {
      expect(sut.id).toEqual(props.id);
      expect(sut.name).toEqual(props.name);
      expect(sut.email).toEqual(props.email);
      expect(sut.createdAt).toEqual(props.createdAt);
    });
  });

  it('Should presenter data', () => {
    const output = instanceToPlain(sut);
    expect(output).toStrictEqual({
      id: '12312a',
      name: 'test name',
      email: 'a@a.com',
      createdAt: createdAt.toISOString(),
    });
  });
});
