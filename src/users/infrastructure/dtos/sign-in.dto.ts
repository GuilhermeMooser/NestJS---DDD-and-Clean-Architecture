import { SigninUseCase } from '@/users/application/usecases/sign-in.usecase';
import { IsString, IsNotEmpty, IsEmail } from 'class-validator';

export class SigninDto implements SigninUseCase.Input {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
