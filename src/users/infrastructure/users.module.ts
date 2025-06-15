import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { SignupUseCase } from '../application/usecases/sign-up.usecase';
import { UserInMemoryRepository } from './database/in-memory/repositories/user-in-memory.repository';
import { BCryptjsHashProvider } from './providers/hash-provider/bcryptjs-hash.provider';

@Module({
  controllers: [UsersController],
  providers: [
    UsersService,
    {
      provide: 'UserRepository',
      useClass: UserInMemoryRepository,
    },
    {
      provide: 'HashProvider',
      useClass: BCryptjsHashProvider,
    },
    {
      provide: SignupUseCase.UseCase,
      useClass: SignupUseCase.UseCase,
    },
  ],
})
export class UsersModule {}
