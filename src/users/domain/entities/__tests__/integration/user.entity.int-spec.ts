/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { UserDataBuilder } from '@/users/domain/testing/helping/user-data-builder';
import { UserEntity, UserProps } from '../../user.entity';
import { EntityValidationError } from '@/shared/domain/errors/validation-error';

describe('UserEntity integration tests', () => {
  describe('Constructor method', () => {
    it('Should thrown an error when creating a user with invalid name', () => {
      let props: UserProps = {
        ...UserDataBuilder({}),
        name: null,
      };

      expect(() => new UserEntity(props)).toThrowError(EntityValidationError);

      props = {
        ...UserDataBuilder({}),
        name: '',
      };

      expect(() => new UserEntity(props)).toThrowError(EntityValidationError);

      props = {
        ...UserDataBuilder({}),
        name: 'a'.repeat(256),
      };

      expect(() => new UserEntity(props)).toThrowError(EntityValidationError);

      props = {
        ...UserDataBuilder({}),
        name: 124 as any,
      };

      expect(() => new UserEntity(props)).toThrowError(EntityValidationError);
    });

    it('Should thrown an error when creating a user with invalid email', () => {
      let props: UserProps = {
        ...UserDataBuilder({}),
        email: null,
      };

      expect(() => new UserEntity(props)).toThrowError(EntityValidationError);

      props = {
        ...UserDataBuilder({}),
        email: '',
      };

      expect(() => new UserEntity(props)).toThrowError(EntityValidationError);

      props = {
        ...UserDataBuilder({}),
        email: 'a'.repeat(256),
      };

      expect(() => new UserEntity(props)).toThrowError(EntityValidationError);

      props = {
        ...UserDataBuilder({}),
        email: 124 as any,
      };

      expect(() => new UserEntity(props)).toThrowError(EntityValidationError);
    });

    it('Should thrown an error when creating a user with invalid password', () => {
      let props: UserProps = {
        ...UserDataBuilder({}),
        password: null,
      };

      expect(() => new UserEntity(props)).toThrowError(EntityValidationError);

      props = {
        ...UserDataBuilder({}),
        password: '',
      };

      expect(() => new UserEntity(props)).toThrowError(EntityValidationError);

      props = {
        ...UserDataBuilder({}),
        password: 'a'.repeat(101),
      };

      expect(() => new UserEntity(props)).toThrowError(EntityValidationError);

      props = {
        ...UserDataBuilder({}),
        password: 124 as any,
      };

      expect(() => new UserEntity(props)).toThrowError(EntityValidationError);
    });

    it('Should thrown an error when creating a user with invalid createdAt', () => {
      let props: UserProps = {
        ...UserDataBuilder({}),
        createdAt: '2023' as any,
      };
      expect(() => new UserEntity(props)).toThrowError(EntityValidationError);

      props = {
        ...UserDataBuilder({}),
        createdAt: 124 as any,
      };
      expect(() => new UserEntity(props)).toThrowError(EntityValidationError);
    });

    it('Should a valid user', () => {
      expect.assertions(0);

      const props: UserProps = {
        ...UserDataBuilder({}),
      };

      new UserEntity(props);
    });
  });

  describe('Update method', () => {
    it('Should a invalid user updating name', () => {
      const entity = new UserEntity(UserDataBuilder({}));

      expect(() => entity.update(null)).toThrowError(EntityValidationError);
      expect(() => entity.update('')).toThrowError(EntityValidationError);
      expect(() => entity.update('a'.repeat(256))).toThrowError(
        EntityValidationError,
      );
      expect(() => entity.update(124 as any)).toThrowError(
        EntityValidationError,
      );
    });

    it('Should a valid user', () => {
      expect.assertions(0);

      const entity = new UserEntity(UserDataBuilder({}));

      entity.update('other name');
    });
  });

  describe('UpdatePassword method', () => {
    it('Should thrown an error when updating a user password with invalid name', () => {
      const entity = new UserEntity(UserDataBuilder({}));

      expect(() => entity.updatePassword(null)).toThrowError(
        EntityValidationError,
      );
      expect(() => entity.updatePassword('')).toThrowError(
        EntityValidationError,
      );
      expect(() => entity.updatePassword('a'.repeat(101))).toThrowError(
        EntityValidationError,
      );
      expect(() => entity.updatePassword(124 as any)).toThrowError(
        EntityValidationError,
      );
    });

    it('Should a valid user', () => {
      expect.assertions(0);

      const entity = new UserEntity(UserDataBuilder({}));

      entity.updatePassword('other password');
    });
  });
});
