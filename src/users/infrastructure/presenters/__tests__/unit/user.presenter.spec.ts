import { UserPresenter } from '../../user.presenter';

describe('UsersPresenter unit tests', () => {
  const createdAt = new Date();

  let props = {
    id: '12312a',
    name: 'test name',
    email: 'a@a.com',
    password: 'fake',
    createdAt: createdAt,
  };

  describe('constructor', () => {
    it('Should be defined', () => {
      const sut = new UserPresenter(props);
      expect(sut.id).toEqual(props.id);
      expect(sut.name).toEqual(props.name);
      expect(sut.email).toEqual(props.email);
      expect(sut.createdAt).toEqual(props.createdAt);
    });
  });
});
