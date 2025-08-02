import { SigninUseCase } from '@/users/application/usecases/sign-in.usecase';
import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsEmail } from 'class-validator';

export class SigninDto implements SigninUseCase.Input {
  @ApiProperty({ description: 'Email do usuário' })
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'Senha do usuário' })
  @IsString()
  @IsNotEmpty()
  password: string;
}
