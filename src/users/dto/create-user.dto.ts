import { IsEmail, MaxLength, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsEmail()
  email: string;

  @MinLength(6, {
    message: 'Password must be longer than or equal to 6 symbols',
  })
  @MaxLength(10, {
    message: 'Password is too long. Maximal length is 10 symbols',
  })
  password: string;
}
