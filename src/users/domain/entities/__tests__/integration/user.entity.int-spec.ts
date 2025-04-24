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
  });
});
